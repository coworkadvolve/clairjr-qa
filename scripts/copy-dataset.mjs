/**
 * Copies the published content of one Sanity dataset into another (for example production ->
 * staging), re-uploading every image and file it references. The Free plan has no
 * server-side dataset copy, so this does it document by document.
 *
 * Skips the old product setup (types "product" and "category"); the Products import
 * fills those separately.
 *
 * Usage:
 *   npm i @sanity/client@6
 *   SANITY_PROJECT_ID=zo3u8ikx SANITY_TOKEN=<editor token> \
 *     node copy-dataset.mjs --from=production --to=staging [--dry-run]
 *
 * Never writes to "production".
 */
import { createClient } from '@sanity/client';

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.replace(/^--/, '').split(/=(.*)/s))
    .map(([k, v]) => [k, v ?? true]),
);
const FROM = args.from || 'production';
const TO = args.to;
const DRY = !!args['dry-run'];
if (!TO || TO === 'production' || TO === FROM) {
  console.error('Pass --to=<target dataset>. The target cannot be production or the source.');
  process.exit(1);
}

const base = { projectId: process.env.SANITY_PROJECT_ID, token: process.env.SANITY_TOKEN, apiVersion: '2024-10-01', useCdn: false };
const src = createClient({ ...base, dataset: FROM });
const dst = createClient({ ...base, dataset: TO });

const SKIP_TYPES = ['product', 'category', 'productCategory', 'sanity.imageAsset', 'sanity.fileAsset'];

async function main() {
  const docs = await src.fetch(`*[!(_id in path("drafts.**")) && !(_id in path("_.**")) && !(_type in $skip)]`, {
    skip: SKIP_TYPES,
  });
  console.log(`${docs.length} documents in "${FROM}"`);

  // Collect asset references anywhere in the documents.
  const refs = new Set();
  const walk = (v) => {
    if (Array.isArray(v)) return v.forEach(walk);
    if (v && typeof v === 'object') {
      if (typeof v._ref === 'string' && /^(image|file)-/.test(v._ref)) refs.add(v._ref);
      Object.values(v).forEach(walk);
    }
  };
  docs.forEach(walk);
  console.log(`${refs.size} images and files to copy`);

  const map = new Map();
  let i = 0;
  for (const id of refs) {
    i++;
    const a = await src.fetch(`*[_id == $id][0]{url, originalFilename, _type}`, { id });
    if (!a?.url) {
      console.warn(`  asset not found: ${id}`);
      continue;
    }
    if (DRY) {
      map.set(id, id);
      continue;
    }
    const res = await fetch(a.url);
    if (!res.ok) {
      console.warn(`  download failed ${res.status}: ${a.url}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const kind = a._type === 'sanity.imageAsset' ? 'image' : 'file';
    const up = await dst.assets.upload(kind, buf, { filename: a.originalFilename || id });
    map.set(id, up._id);
    if (i % 10 === 0) console.log(`  ${i}/${refs.size} assets`);
  }

  const remap = (v) => {
    if (Array.isArray(v)) return v.map(remap);
    if (v && typeof v === 'object') {
      const o = {};
      for (const [k, x] of Object.entries(v)) o[k] = k === '_ref' && map.has(x) ? map.get(x) : remap(x);
      return o;
    }
    return v;
  };

  if (DRY) {
    console.log('Dry run: nothing written.');
    return;
  }
  for (let j = 0; j < docs.length; j += 50) {
    const tx = dst.transaction();
    docs.slice(j, j + 50).forEach((d) => {
      const { _rev, _updatedAt, _createdAt, ...rest } = d; // eslint-disable-line @typescript-eslint/no-unused-vars
      tx.createOrReplace(remap(rest));
    });
    await tx.commit();
  }
  console.log(`Copied ${docs.length} documents and ${map.size} assets to "${TO}".`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
