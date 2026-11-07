import type { MetadataRoute } from 'next';

import { categoryPath, getCatalog, productPath } from '@/lib/catalog';
import { siteConfig } from '@/lib/seo/metadata';
import blogService from '@/lib/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ categories, products }, blogPosts] = await Promise.all([getCatalog(), blogService.getAllPosts()]);

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

  const productRoutes: MetadataRoute.Sitemap = [
    ...['/products/indoor', '/products/outdoor'].map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...categories.map((c) => ({
      url: `${siteConfig.url}${categoryPath(c)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...products.map((p) => ({
      url: `${siteConfig.url}${productPath(p)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
