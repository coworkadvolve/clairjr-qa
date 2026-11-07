import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Band } from '@/components/products/Band';
import { CategoryBrowser } from '@/components/products/CategoryBrowser';
import { CategorySidebar, MobileCategories } from '@/components/products/CategorySidebar';
import { firstSentence, getCatalog, getCategory, groupLabel, groupPath } from '@/lib/catalog';
import { splittingFilters } from '@/lib/catalog/format';
import { breadcrumbJsonLd, JsonLd } from '@/lib/seo/jsonld';
import { siteConfig } from '@/lib/seo/metadata';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { categories } = await getCatalog();
  // A static export needs at least one path; an empty catalogue renders a 404 instead of failing the build.
  if (!categories.length) return [{ group: 'indoor', category: 'none' }];
  return categories.map((c) => ({ group: c.group, category: c.slug }));
}

type Props = { params: Promise<{ group: string; category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, category } = await params;
  const data = await getCategory(group, category);
  if (!data) return {};
  const c = data.category;
  return {
    title: `${c.title} | ${groupLabel(c.group)}`,
    description: `${c.description} ${c.count} products with specifications, photometric files and datasheets.`.trim(),
    alternates: { canonical: `/products/${c.group}/${c.slug}` },
    openGraph: c.preview ? { images: [{ url: `${c.preview.url}?w=1200&h=630&fit=fill&bg=ffffff` }] } : undefined,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { group, category } = await params;
  const data = await getCategory(group, category);
  if (!data) notFound();
  const { categories, products: all } = await getCatalog();
  const { category: c, products } = data;

  return (
    <div className="cp">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: siteConfig.url },
          { name: 'Products', url: `${siteConfig.url}/products` },
          { name: groupLabel(c.group), url: `${siteConfig.url}${groupPath(c.group)}` },
          { name: c.title, url: `${siteConfig.url}/products/${c.group}/${c.slug}` },
        ])}
      />
      <Band
        title={c.title}
        text={c.description}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: groupLabel(c.group), href: groupPath(c.group) },
          { label: c.title },
        ]}
      />
      <div className="shell">
        <div className="wrap layout">
          <CategorySidebar categories={categories} total={all.length} current={c.slug} />
          <div>
            <MobileCategories categories={categories} current={c.slug} />
            <CategoryBrowser
              title={c.title}
              products={products}
              filters={splittingFilters(products)}
              fallbackBlurb={firstSentence(c.description)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
