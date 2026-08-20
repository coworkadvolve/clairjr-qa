import type { Metadata } from 'next';

import { siteUrl } from '@/sanity/env';

const defaultTitle = 'Clair Electronics Limited - Intelligent Lighting Solutions';
const defaultDescription =
  'Clair Electronics - Leading provider of eco-friendly, energy-efficient LED lighting solutions for commercial, industrial, and architectural applications since 2006. ISO 9001 certified with 50,000+ installations worldwide.';

export const siteConfig = {
  name: 'Clair Electronics Limited',
  shortName: 'Clair Lighting',
  title: defaultTitle,
  description: defaultDescription,
  url: siteUrl,
  ogImage: `${siteUrl}/logo/clair-white-png.png`,
  email: 'admin@clairjg.com',
  phone: '+91-11-49843647-9',
  address: {
    streetAddress: 'Plot No. 58, sector 155',
    addressLocality: 'Noida',
    postalCode: '201310',
    addressCountry: 'IN',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    'LED lighting',
    'commercial lighting',
    'industrial lighting',
    'energy efficient lighting',
    'Clair Electronics',
    'lighting solutions India',
    'office lighting',
    'warehouse lighting',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.shortName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image?.startsWith('http') ? image : image ? `${siteConfig.url}${image}` : siteConfig.ogImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function createProductMetadata(product: {
  name: string;
  slug: string;
  short_description: string | null;
  description: string;
  image_url: string;
}): Metadata {
  const description =
    product.short_description ||
    product.description.slice(0, 160) + (product.description.length > 160 ? '...' : '');

  const image =
    product.image_url.startsWith('http') || product.image_url.startsWith('/')
      ? product.image_url
      : `/${product.image_url.replace(/^\.\//, '')}`;

  return createPageMetadata({
    title: product.name,
    description,
    path: `/products/${product.slug}`,
    image,
  });
}

export const pageMetadata = {
  home: createPageMetadata({
    title: 'Intelligent Lighting Solutions',
    description: siteConfig.description,
    path: '/',
  }),
  products: createPageMetadata({
    title: 'Our Products',
    description:
      'Explore Clair Lighting\'s comprehensive range of LED lighting solutions for commercial, industrial, office, and architectural applications.',
    path: '/products',
  }),
  catalogue: createPageMetadata({
    title: 'Download Catalogues',
    description:
      'Download Clair Lighting product catalogues and company brochures. Complete specifications, technical data, and application guides.',
    path: '/catalogue',
  }),
  about: createPageMetadata({
    title: 'About Us',
    description:
      'Learn about Clair Electronics — ISO 9001 certified LED lighting manufacturer since 2006, serving 50,000+ installations worldwide.',
    path: '/about',
  }),
  services: createPageMetadata({
    title: 'Our Services',
    description:
      'Clair Lighting offers lighting design consultation, installation support, energy audits, and maintenance services for commercial and industrial projects.',
    path: '/services',
  }),
  franchise: createPageMetadata({
    title: 'Franchise Opportunities',
    description:
      'Partner with Clair Lighting as a franchisee. Join India\'s trusted LED lighting brand with comprehensive support and proven products.',
    path: '/franchise',
  }),
  contact: createPageMetadata({
    title: 'Contact Us',
    description:
      'Contact Clair Lighting for quotes, technical support, and lighting consultations. Noida HQ with offices across India and international locations.',
    path: '/contact',
  }),
  blog: createPageMetadata({
    title: 'Lighting Insights & Guides',
    description: 'Practical LED lighting guides, energy-efficiency advice and design insights from the Clair Lighting team.',
    path: '/blog',
  }),
  privacyPolicy: createPageMetadata({
    title: 'Privacy Policy',
    description:
      'Learn how Clair Electronics collects, uses, and protects your personal information when you use our website and submit inquiries.',
    path: '/privacy-policy',
  }),
  termsOfService: createPageMetadata({
    title: 'Terms of Service',
    description:
      'Terms and conditions governing your use of the Clair Lighting website, product information, catalogues, and online forms.',
    path: '/terms-of-service',
  }),
  cookiePolicy: createPageMetadata({
    title: 'Cookie Policy',
    description:
      'Information about cookies and similar technologies used on the Clair Lighting website, including form and content delivery services.',
    path: '/cookie-policy',
  }),
};
