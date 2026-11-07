
import fs from 'node:fs';
import path from 'node:path';

import { sanityFetch } from '@/sanity/client';
import { projectId } from '@/sanity/env';

import { CATEGORIES_QUERY, PRODUCT_QUERY, SUMMARIES_QUERY } from './queries';
import type { CatalogImage, Category, CategoryRef, Group, Product, ProductSummary } from './types';

export * from './types';
export { productPath, categoryPath, groupPath, groupLabel } from './paths';

interface Catalog {
  categories: Category[];
  products: ProductSummary[];
}

/* ------------------------------------------------------------------ */
/* Local fixture (development only)                                    */
/* Set CATALOG_FIXTURE_DIR to the client's package folder to preview   */
/* pages before the Sanity import has run. Never used in production.   */
/* ------------------------------------------------------------------ */

const FIXTURE_DIR = process.env.CATALOG_FIXTURE_DIR;

interface FixtureProduct {
  slug: string;
  name: string;
  group: Group;
  categories: string[];
  kind?: string;
  features?: string[];
  specifications?: Record<string, string>;
  specificationGroups?: Product['specificationGroups'];
  iconStrip?: Product['iconStrip'];
  versions?: Product['versions'];
  moreVersionsInCatalogue?: boolean;
  finishes?: string[];
  lightDistribution?: string[];
  colourTemperatures?: string[];
  photos?: string[];
  dimensionDrawings?: string[];
  catalogue?: string | null;
  datasheet?: string | null;
  documents?: { type: string; label: string; localPath: string; bytes: number; file: string }[];
}

function fixtureRead<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(FIXTURE_DIR as string, file), 'utf8')) as T;
}
const fxImg = (p?: string | null): CatalogImage | null => (p ? { url: `/dev-media/${p}` } : null);
const fxFile = (p?: string | null, bytes?: number) =>
  p ? { url: `/dev-media/${p}`, bytes: bytes ?? null, filename: path.basename(p), ext: path.extname(p).slice(1) } : null;

function fixtureCatalog(): { catalog: Catalog; full: Map<string, Product> } {
  const cats = fixtureRead<{ slug: string; title: string; group: Group; description: string; icon: string; order: number }[]>(
    'data/categories.json',
  );
  const prods = fixtureRead<FixtureProduct[]>('data/products.json');
  const ref = new Map<string, CategoryRef>(cats.map((c) => [c.slug, { slug: c.slug, title: c.title, group: c.group }]));
  const full = new Map<string, Product>();
  const products: ProductSummary[] = prods.map((p) => {
    const s = p.specifications ?? {};
    const summary: ProductSummary = {
      slug: p.slug,
      name: p.name,
      kind: p.kind ?? null,
      primary: ref.get(p.categories[0]) as CategoryRef,
      categories: p.categories,
      photo: fxImg(p.photos?.[0]),
      mounting: s.mounting ?? null,
      optic: s.optic ?? null,
      power: s.power ?? null,
    };
    full.set(p.slug, {
      ...summary,
      features: p.features ?? [],
      specifications: s,
      specificationGroups: p.specificationGroups ?? [],
      iconStrip: p.iconStrip ?? [],
      versions: p.versions ?? [],
      moreVersionsInCatalogue: !!p.moreVersionsInCatalogue,
      finishes: p.finishes ?? [],
      lightDistribution: p.lightDistribution ?? [],
      colourTemperatures: p.colourTemperatures ?? [],
      photos: (p.photos ?? []).map((x) => fxImg(x) as CatalogImage),
      dimensionDrawings: (p.dimensionDrawings ?? []).map((x) => fxImg(x) as CatalogImage),
      cataloguePages: [],
      catalogue: fxFile(p.catalogue),
      datasheet: fxFile(p.datasheet),
      documents: (p.documents ?? []).map((d) => ({ type: d.type, label: d.label, file: fxFile(d.localPath, d.bytes) })),
      allCategories: p.categories.map((c) => ref.get(c) as CategoryRef),
    });
    return summary;
  });
  return { catalog: { categories: withCounts(cats, products), products }, full };
}

/* ------------------------------------------------------------------ */

function withCounts(
  cats: { slug: string; title: string; group: Group; description?: string | null; icon?: string | null; order?: number | null }[],
  products: ProductSummary[],
): Category[] {
  return cats
    .map((c) => {
      const members = products.filter((p) => p.categories.includes(c.slug));
      return {
        slug: c.slug,
        title: c.title,
        group: c.group,
        description: c.description ?? '',
        icon: c.icon ?? null,
        order: c.order ?? 0,
        count: members.length,
        preview: members.find((p) => p.photo)?.photo ?? null,
      };
    })
    .sort((a, b) => (a.group === b.group ? a.order - b.order : a.group === 'indoor' ? -1 : 1));
}

let catalogPromise: Promise<Catalog> | null = null;
let fixture: ReturnType<typeof fixtureCatalog> | null = null;

export function getCatalog(): Promise<Catalog> {
  if (!catalogPromise) {
    catalogPromise = (async () => {
      if (FIXTURE_DIR) {
        fixture = fixture ?? fixtureCatalog();
        return fixture.catalog;
      }
      if (!projectId) return { categories: [], products: [] };
      const [cats, products] = await Promise.all([
        sanityFetch<Parameters<typeof withCounts>[0]>(CATEGORIES_QUERY),
        sanityFetch<ProductSummary[]>(SUMMARIES_QUERY),
      ]);
      const valid = products.filter((p) => p.primary && p.primary.slug);
      return { categories: withCounts(cats, valid), products: valid };
    })();
  }
  return catalogPromise;
}

const productCache = new Map<string, Promise<Product | null>>();

export function getProduct(slug: string): Promise<Product | null> {
  if (!productCache.has(slug)) {
    productCache.set(
      slug,
      (async () => {
        if (FIXTURE_DIR) {
          fixture = fixture ?? fixtureCatalog();
          return fixture.full.get(slug) ?? null;
        }
        const p = await sanityFetch<Product | null>(PRODUCT_QUERY, { slug });
        if (!p) return null;
        return {
          ...p,
          features: p.features ?? [],
          specifications: p.specifications ?? {},
          specificationGroups: p.specificationGroups ?? [],
          iconStrip: p.iconStrip ?? [],
          versions: p.versions ?? [],
          finishes: p.finishes ?? [],
          lightDistribution: p.lightDistribution ?? [],
          colourTemperatures: p.colourTemperatures ?? [],
          photos: (p.photos ?? []).filter((x) => x?.url),
          dimensionDrawings: (p.dimensionDrawings ?? []).filter((x) => x?.url),
          cataloguePages: (p.cataloguePages ?? []).filter((x) => x?.url),
          documents: (p.documents ?? []).filter((d) => d.file?.url),
          catalogue: p.catalogue?.url ? p.catalogue : null,
          datasheet: p.datasheet?.url ? p.datasheet : null,
          allCategories: (p.allCategories ?? []).filter(Boolean),
        };
      })(),
    );
  }
  return productCache.get(slug) as Promise<Product | null>;
}

export async function getCategory(group: string, slug: string) {
  const { categories, products } = await getCatalog();
  const category = categories.find((c) => c.slug === slug && c.group === group) ?? null;
  if (!category) return null;
  return { category, products: products.filter((p) => p.categories.includes(slug)) };
}

/** Compact menu data for the header (server-rendered on every page). */
export async function getMenu() {
  const { categories, products } = await getCatalog();
  return {
    total: products.length,
    groups: (['indoor', 'outdoor'] as Group[]).map((g) => ({
      group: g,
      total: products.filter((p) => p.primary.group === g).length,
      categories: categories
        .filter((c) => c.group === g)
        .map((c) => ({
          slug: c.slug,
          title: c.title,
          count: c.count,
          blurb: firstSentence(c.description),
          preview: c.preview?.url ?? null,
        })),
    })),
  };
}

export type Menu = Awaited<ReturnType<typeof getMenu>>;

export function firstSentence(text: string) {
  const s = (text || '').split('. ')[0].replace(/\.$/, '');
  return s ? `${s}.` : '';
}
