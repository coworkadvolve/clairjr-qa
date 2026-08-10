import { notFound } from 'next/navigation';

import { ProductDetailPage } from '@/views/ProductDetailPage';
import dataService from '@/lib/data';
import { resolveProductDisplayImage } from '@/lib/imageUtils';
import {
  breadcrumbJsonLd,
  JsonLd,
  productJsonLd,
} from '@/lib/seo/jsonld';
import { createProductMetadata, siteConfig } from '@/lib/seo/metadata';

// export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await dataService.getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await dataService.getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return createProductMetadata({
    ...product,
    image_url: resolveProductDisplayImage(product),
  });
}

export default async function Page({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await dataService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categories = await dataService.getCategories();
  const category = categories.find((c) => c.id === product.category_id) ?? null;
  const resolvedProduct = {
    ...product,
    image_url: resolveProductDisplayImage(product),
  };

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(resolvedProduct, category),
          breadcrumbJsonLd([
            { name: 'Home', url: siteConfig.url },
            { name: 'Products', url: `${siteConfig.url}/products` },
            { name: product.name, url: `${siteConfig.url}/products/${product.slug}` },
          ]),
        ]}
      />
      <ProductDetailPage product={resolvedProduct} category={category} />
    </>
  );
}
