import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/seo/metadata';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#F27823',
    icons: [
      {
        src: '/logo/favicon-orange.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
