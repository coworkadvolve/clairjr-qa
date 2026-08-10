import { siteConfig } from '@/lib/seo/metadata';
import type { SiteSettings } from '@/lib/content-types';
import type { Category, Product } from '@/lib/data';
import type { BlogPost } from '@/lib/blog';

export function organizationJsonLd(settings?: SiteSettings) {
  const primaryPhone = settings?.phones[0]?.number ?? siteConfig.phone;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.companyName ?? siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    email: settings?.primaryEmail ?? siteConfig.email,
    telephone: primaryPhone,
    foundingDate: '2006',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.address.line1 ?? siteConfig.address.streetAddress,
      addressLocality: settings?.address.city ?? siteConfig.address.addressLocality,
      postalCode: settings?.address.postalCode ?? siteConfig.address.postalCode,
      addressCountry: settings?.address.country ?? siteConfig.address.addressCountry,
    },
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.shortName,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessJsonLd(settings?: SiteSettings) {
  const primaryPhone = settings?.phones[0]?.number ?? siteConfig.phone;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings?.companyName ?? siteConfig.name,
    image: siteConfig.ogImage,
    url: siteConfig.url,
    telephone: primaryPhone,
    email: settings?.primaryEmail ?? siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.address.line1 ?? siteConfig.address.streetAddress,
      addressLocality: settings?.address.city ?? siteConfig.address.addressLocality,
      postalCode: settings?.address.postalCode ?? siteConfig.address.postalCode,
      addressCountry: settings?.address.country ?? siteConfig.address.addressCountry,
    },
    priceRange: '$$',
  };
}

export function productJsonLd(product: Product, category?: Category | null) {
  const image = product.image_url.startsWith('http')
    ? product.image_url
    : `${siteConfig.url}${product.image_url.startsWith('/') ? product.image_url : `/${product.image_url.replace(/^\.\//, '')}`}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.description,
    image,
    url: `${siteConfig.url}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: siteConfig.shortName,
    },
    ...(category
      ? {
          category: category.name,
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: siteConfig.ogImage } },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    ...(post.coverImageUrl ? { image: post.coverImageUrl.startsWith('http') ? post.coverImageUrl : `${siteConfig.url}${post.coverImageUrl}` } : {}),
    keywords: post.tags.join(', '),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
