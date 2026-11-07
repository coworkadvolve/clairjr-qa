import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Band } from '@/components/products/Band';
import { CategorySidebar, MobileCategories } from '@/components/products/CategorySidebar';
import { CategoryTiles } from '@/components/products/CategoryTiles';
import { LegacyRedirect } from '@/components/products/LegacyRedirect';
import { ProductIndexSearch } from '@/components/products/ProductIndexSearch';
import { getCatalog, groupLabel, type Group } from '@/lib/catalog';
import legacyProducts from '@/data/products.json';

export const dynamicParams = false;

const GROUPS: Group[] = ['indoor', 'outdoor'];
const LEDE: Record<Group, string> = {
  indoor: 'Luminaires for offices, retail, hospitality, healthcare, homes and industry.',
  outdoor: 'Luminaires for facades, landscapes, streets, water features and public spaces.',
};

// Old single-level product addresses (/products/<slug>) from the previous catalogue.
const LEGACY = (legacyProducts as { slug: string }[]).map((p) => p.slug).filter((s) => !GROUPS.includes(s as Group));

export function generateStaticParams() {
  return [...GROUPS, ...LEGACY].map((group) => ({ group }));
}

type Props = { params: Promise<{ group: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group } = await params;
  if (!GROUPS.includes(group as Group)) {
    return { title: 'Products', robots: { index: false, follow: true }, alternates: { canonical: '/products' } };
  }
  return {
    title: groupLabel(group),
    description: `${groupLabel(group)} from Clair Lighting. ${LEDE[group as Group]}`,
    alternates: { canonical: `/products/${group}` },
  };
}

export default async function GroupPage({ params }: Props) {
  const { group } = await params;

  if (!GROUPS.includes(group as Group)) {
    if (!LEGACY.includes(group)) notFound();
    return (
      <div className="cp">
        <LegacyRedirect to="/products" />
        <div className="shell">
          <div className="wrap">
            <p>
              This product has moved. <Link href="/products">See all products</Link>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const g = group as Group;
  const { categories, products } = await getCatalog();
  const pool = products.filter((p) => p.primary.group === g);

  return (
    <div className="cp">
      <Band
        title={groupLabel(g)}
        text={LEDE[g]}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: groupLabel(g) }]}
      />
      <div className="shell">
        <div className="wrap layout">
          <CategorySidebar categories={categories} total={products.length} />
          <div>
            <MobileCategories categories={categories} />
            <ProductIndexSearch products={pool}>
              <CategoryTiles categories={categories} group={g} total={pool.length} />
            </ProductIndexSearch>
          </div>
        </div>
      </div>
    </div>
  );
}
