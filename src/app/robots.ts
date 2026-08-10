import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/seo/metadata';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
