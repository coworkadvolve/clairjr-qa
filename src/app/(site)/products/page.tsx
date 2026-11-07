import type { Metadata } from 'next';

import { Band } from '@/components/products/Band';
import { CategorySidebar, MobileCategories } from '@/components/products/CategorySidebar';
import { CategoryTiles } from '@/components/products/CategoryTiles';
import { ProductIndexSearch } from '@/components/products/ProductIndexSearch';
import { getCatalog } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Indoor and outdoor LED luminaires from Clair Lighting: linear, panel, architectural, downlights, facade, landscape, street and underwater lights. Specifications, photometric files and datasheets for every product.',
  alternates: { canonical: '/products' },
};

export default async function ProductsIndex() {
  const { categories, products } = await getCatalog();
  const count = (g: string) => products.filter((p) => p.primary.group === g).length;

  return (
    <div className="cp">
      <Band
        title="Our Products"
        text="Explore our range of lighting solutions engineered for performance, efficiency and reliability across all applications."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />
      <div className="shell">
        <div className="wrap layout">
          <CategorySidebar categories={categories} total={products.length} />
          <div>
            <MobileCategories categories={categories} />
            <ProductIndexSearch products={products}>
              <CategoryTiles categories={categories} group="indoor" total={count('indoor')} />
              <CategoryTiles categories={categories} group="outdoor" total={count('outdoor')} />
            </ProductIndexSearch>
          </div>
        </div>
      </div>
    </div>
  );
}
