/**
 * Imports the client's Products package (34 categories, 403 products, photos, drawings,
 * catalogue pages, catalogues, datasheets and downloadable documents) into Sanity.
 *
 * Adapted from the client's scripts/import-to-sanity.mjs. Additions: grouped specifications,
 * icon strip, distribution, catalogue page images (taken from prototype/m/<slug>.json),
 * --skip-existing to resume, and --remove-old to delete the previous product setup.
 *
 * Usage:
 *   npm i @sanity/client@6
 *   SANITY_PROJECT_ID=zo3u8ikx SANITY_DATASET=staging SANITY_TOKEN=<editor token> \
 *     node import-products.mjs --package=<path to clair-products-developer-package> \
 *       [--dry-run] [--only=<slug>] [--concurrency=4] [--skip-existing] [--remove-old]
 *       [--max-seconds=N]   stop starting new products after N seconds (run again with --skip-existing to continue)
 *
 * Writing to the production dataset additionally requires --allow-production.
 * Safe to re-run: documents use fixed ids (category-<slug>, product-<slug>) and Sanity
 * de-duplicates identical files.
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.replace(/^--/, '').split(/=(.*)/s))
    .map(([k, v]) => [k, v ?? true]),
);
const DRY = !!args['dry-run'];
const ROOT = path.resolve(args.package || '.');
const DATASET = process.env.SANITY_DATASET || 'staging';

if (!fs.existsSync(path.join(ROOT, 'data/products.json'))) {
  console.error(`No data/products.json under ${ROOT}. Pass --package=<package folder>.`);
  process.exit(1);
}
if (DATASET === 'production' && !args['allow-production']) {
  console.error('Refusing to write to the production dataset without --allow-production.');
  process.exit(1);
}
if (!DRY && (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_TOKEN)) {
  console.error('Set SANITY_PROJECT_ID and SANITY_TOKEN.');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'dry-run',
  dataset: DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-10-01',
  useCdn: false,
});

const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const categories = read('data/categories.json');
const products = read('data/products.json');

const key = (i) => 'k' + i.toString(36).padStart(4, '0');
const keyed = (arr, type, map = (x) => x) =>
  (arr || []).map((x, i) => ({ _key: key(i), ...(type ? { _type: type } : {}), ...map(x) }));

let missing = 0;
const cache = new Map();
async function upload(kind, rel, filename) {
  if (!rel) return null;
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.warn('  missing file', rel);
    missing++;
    return null;
  }
  if (cache.has(abs)) return cache.get(abs);
  if (DRY) return { _type: 'reference', _ref: 'dry-' + path.basename(rel) };
  const asset = await withRetry(() =>
    client.assets.upload(kind, fs.createReadStream(abs), { filename: filename || path.basename(rel) }),
  );
  const ref = { _type: 'reference', _ref: asset._id };
  cache.set(abs, ref);
  return ref;
}

async function uploadBuffer(kind, buf, filename) {
  if (DRY) return { _type: 'reference', _ref: 'dry-' + filename };
  const asset = await withRetry(() => client.assets.upload(kind, buf, { filename }));
  return { _type: 'reference', _ref: asset._id };
}

async function withRetry(fn, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i >= tries) throw e;
      const wait = 1500 * i;
      console.warn(`  retry ${i} in ${wait} ms: ${e.message}`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

/** Catalogue pages are already rendered as images inside the prototype's media files. */
function cataloguePages(slug) {
  const f = path.join(ROOT, 'prototype/m', `${slug}.json`);
  if (!fs.existsSync(f)) return [];
  const m = JSON.parse(fs.readFileSync(f, 'utf8'));
  return (m.c || [])
    .map((u, i) => {
      const hit = /^data:image\/(\w+);base64,(.+)$/s.exec(u);
      if (!hit) return null;
      const ext = hit[1] === 'jpeg' ? 'jpg' : hit[1];
      return { buf: Buffer.from(hit[2], 'base64'), filename: `${slug}-catalogue-page-${i + 1}.${ext}` };
    })
    .filter(Boolean);
}

async function importProduct(p, i, total) {
  console.log(`[${i}/${total}] ${p.name}`);
  const photos = [];
  for (const [k, f] of p.photos.entries()) {
    const a = await upload('image', f, `${p.slug}-${path.basename(f)}`);
    if (a) photos.push({ _type: 'image', _key: key(k), asset: a });
  }
  const drawings = [];
  for (const [k, f] of p.dimensionDrawings.entries()) {
    const a = await upload('image', f, `${p.slug}-dimensions-${path.basename(f)}`);
    if (a) drawings.push({ _type: 'image', _key: key(k), asset: a });
  }
  const pages = [];
  for (const [k, pg] of cataloguePages(p.slug).entries()) {
    pages.push({ _type: 'image', _key: key(k), asset: await uploadBuffer('image', pg.buf, pg.filename) });
  }
  const docs = [];
  for (const [k, d] of p.documents.entries()) {
    const a = await upload('file', d.localPath, d.file || path.basename(d.localPath));
    if (a) docs.push({ _type: 'productDocument', _key: key(k), type: d.type, label: d.label, file: { _type: 'file', asset: a } });
  }
  const cat = await upload('file', p.catalogue, `Clair ${p.name} catalogue.pdf`);
  const ds = await upload('file', p.datasheet, `Clair ${p.name} datasheet.pdf`);

  const doc = {
    _id: 'product-' + p.slug,
    _type: 'product',
    name: p.name,
    slug: { _type: 'slug', current: p.slug },
    categories: p.categories.map((c, k) => ({ _type: 'reference', _key: key(k), _ref: 'category-' + c })),
    kind: p.kind,
    features: p.features,
    finishes: p.finishes,
    lightDistribution: p.lightDistribution,
    colourTemperatures: p.colourTemperatures,
    specifications: p.specifications,
    specificationGroups: keyed(p.specificationGroups, 'specGroup', (g) => ({
      heading: g.heading,
      rows: keyed(g.rows, 'labelValue'),
    })),
    iconStrip: keyed(p.iconStrip, 'labelValue'),
    versions: keyed(p.versions, 'version'),
    moreVersionsInCatalogue: !!p.moreVersionsInCatalogue,
    photos,
    dimensionDrawings: drawings,
    cataloguePages: pages,
    documents: docs,
    ...(cat && { catalogue: { _type: 'file', asset: cat } }),
    ...(ds && { datasheet: { _type: 'file', asset: ds } }),
  };
  if (!DRY) await withRetry(() => client.createOrReplace(doc));
}

async function removeOld() {
  // The previous catalogue: documents of type "category", and "product" documents without the new categories field.
  const ids = await client.fetch(`*[_type == "category" || (_type == "product" && !defined(categories))]._id`);
  console.log(`Removing ${ids.length} documents from the previous product setup in "${DATASET}"`);
  if (DRY || !ids.length) return;
  for (let i = 0; i < ids.length; i += 50) {
    const tx = client.transaction();
    ids.slice(i, i + 50).forEach((id) => tx.delete(id));
    await tx.commit();
  }
}

async function main() {
  console.log(`${DRY ? 'DRY RUN: ' : ''}package ${ROOT} -> dataset "${DATASET}"`);
  if (args['remove-old']) await removeOld();

  const tx = client.transaction();
  categories.forEach((c, i) =>
    tx.createOrReplace({
      _id: 'category-' + c.slug,
      _type: 'productCategory',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      group: c.group,
      description: c.description,
      icon: c.icon,
      order: c.order ?? i,
    }),
  );
  if (!DRY) await tx.commit();
  console.log(`${categories.length} categories`);

  let queue = products.filter((p) => !args.only || p.slug === args.only);
  if (args['skip-existing'] && !DRY) {
    const done = new Set(await client.fetch(`*[_type == "product" && count(photos) > 0].slug.current`));
    queue = queue.filter((p) => !done.has(p.slug));
    console.log(`Skipping ${done.size} products already imported`);
  }
  const total = queue.length;
  let n = 0;
  const failed = [];
  const started = Date.now();
  const budget = Number(args['max-seconds'] || 0) * 1000;
  const worker = async () => {
    while (queue.length) {
      if (budget && Date.now() - started > budget) return;
      const p = queue.shift();
      try {
        await importProduct(p, ++n, total);
      } catch (e) {
        console.error(`  FAILED ${p.slug}: ${e.message}`);
        failed.push(p.slug);
      }
    }
  };
  await Promise.all(Array.from({ length: Number(args.concurrency || 4) }, worker));
  console.log(`Done. ${n - failed.length} imported this run, ${failed.length} failed, ${missing} missing files, ${queue.length} left.`);
  if (failed.length) console.log(`Re-run with --skip-existing to retry: ${failed.join(', ')}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
