import type { MetadataRoute } from 'next';

import dataService from '@/lib/data';
import { siteConfig } from '@/lib/seo/metadata';
import blogService from '@/lib/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogPosts] = await Promise.all([dataService.getProducts(), blogService.getAllPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/products',
    '/catalogue',
    '/about',
    '/services',
    '/franchise',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/blog',
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
