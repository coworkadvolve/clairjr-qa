/**
 * Seed categories and products from bundled JSON into Sanity.
 *
 * Usage (PowerShell):
 *   Add SANITY_API_WRITE_TOKEN and NEXT_PUBLIC_SANITY_* vars to your .env file, then:
 *   npm run seed:sanity
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@sanity/client';

config({ path: resolve(process.cwd(), '.env') });

import categoriesData from '../src/data/categories.json';
import productsData from '../src/data/products.json';
import siteSettingsData from '../src/data/siteSettings.json';
import aboutPageData from '../src/data/aboutPage.json';
import testimonialsData from '../src/data/testimonials.json';
import cataloguesData from '../src/data/catalogues.json';
import blogPostsData from '../src/data/blogPosts.json';

type JsonCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
};

type JsonProduct = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  specifications: Record<string, unknown>;
  features: string[];
  applications: string[];
  image_url: string;
  gallery_images: string[];
  datasheet_url: string | null;
  is_featured: boolean;
  display_order: number;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env');
  process.exit(1);
}

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in .env');
  process.exit(1);
}

console.log(`Connecting to Sanity project=${projectId} dataset=${dataset}`);

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
});

function safeDocId(prefix: string, slug: string) {
  return `${prefix}-${slug.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
}

function arrayKey(prefix: string, index: number, suffix = '') {
  const safeSuffix = suffix.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 24);
  return `${prefix}_${index}_${safeSuffix || Math.random().toString(36).slice(2, 8)}`;
}

function toSanitySpecifications(specs: Record<string, unknown>) {
  const entries: Array<{ _key: string; key: string; value: string }> = [];
  const models: Array<{ _key: string } & Record<string, string | null>> = [];
  let entryIndex = 0;

  for (const [key, value] of Object.entries(specs)) {
    if (key === 'models' && Array.isArray(value)) {
      value.forEach((model, index) => {
        if (typeof model !== 'object' || model == null) return;

        const code =
          typeof (model as Record<string, unknown>).code === 'string'
            ? (model as Record<string, unknown>).code as string
            : '';

        const row: { _key: string } & Record<string, string | null> = {
          _key: arrayKey('model', index, code),
        };

        for (const [modelKey, modelValue] of Object.entries(model as Record<string, unknown>)) {
          row[modelKey] = modelValue == null ? null : String(modelValue);
        }

        models.push(row);
      });
      continue;
    }

    if (value != null && typeof value !== 'object') {
      entries.push({
        _key: arrayKey('spec', entryIndex++, key),
        key,
        value: String(value),
      });
    }
  }

  return { entries, models };
}

function httpsGalleryUrls(urls: string[]) {
  return urls.filter((url) => /^https:\/\//i.test(url.trim()));
}

async function seed() {
  console.log('Upserting site settings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...siteSettingsData,
  });

  console.log('Upserting about page...');
  const aboutPage = aboutPageData as {
    pageTitle: string;
    heroSubtitle: string;
    storyTitle: string;
    storyParagraphs: string[];
    missionVisionTitle: string;
    missionVisionSubtitle: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    valuesTitle: string;
    valuesSubtitle: string;
    values: Array<{ icon: string; title: string; description: string }>;
    certificationsTitle: string;
    certificationsSubtitle: string;
    certifications: string[];
    ctaTitle: string;
    ctaText: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
  };

  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    pageTitle: aboutPage.pageTitle,
    heroSubtitle: aboutPage.heroSubtitle,
    storyTitle: aboutPage.storyTitle,
    storyParagraphs: aboutPage.storyParagraphs,
    missionVisionTitle: aboutPage.missionVisionTitle,
    missionVisionSubtitle: aboutPage.missionVisionSubtitle,
    missionTitle: aboutPage.missionTitle,
    missionText: aboutPage.missionText,
    visionTitle: aboutPage.visionTitle,
    visionText: aboutPage.visionText,
    valuesTitle: aboutPage.valuesTitle,
    valuesSubtitle: aboutPage.valuesSubtitle,
    values: aboutPage.values.map((value, index) => ({
      _key: arrayKey('value', index, value.title),
      icon: value.icon,
      title: value.title,
      description: value.description,
    })),
    certificationsTitle: aboutPage.certificationsTitle,
    certificationsSubtitle: aboutPage.certificationsSubtitle,
    certifications: aboutPage.certifications,
    ctaTitle: aboutPage.ctaTitle,
    ctaText: aboutPage.ctaText,
    ctaPrimaryLabel: aboutPage.ctaPrimaryLabel,
    ctaSecondaryLabel: aboutPage.ctaSecondaryLabel,
  });

  const testimonials = testimonialsData as Array<{
    id: string;
    name: string;
    title: string;
    company: string;
    content: string;
    rating: number;
    display_order: number;
  }>;

  console.log(`Upserting ${testimonials.length} testimonials...`);
  {
    const trx = client.transaction();
    for (const item of testimonials) {
      trx.createOrReplace({
        _id: safeDocId('testimonial', item.id),
        _type: 'testimonial',
        name: item.name,
        title: item.title,
        company: item.company,
        content: item.content,
        rating: item.rating,
        displayOrder: item.display_order,
      });
    }
    await trx.commit();
  }

  const catalogues = cataloguesData as Array<{
    id: string;
    title: string;
    description: string;
    filePath: string;
    fileName: string;
    coverImage: string;
    viewUrl?: string;
    display_order: number;
  }>;

  console.log(`Upserting ${catalogues.length} catalogues...`);
  {
    const trx = client.transaction();
    for (const item of catalogues) {
      trx.createOrReplace({
        _id: safeDocId('catalogue', item.id),
        _type: 'catalogue',
        title: item.title,
        slug: { _type: 'slug', current: item.id },
        description: item.description,
        fileName: item.fileName,
        displayOrder: item.display_order,
        ...(item.viewUrl ? { viewUrl: item.viewUrl } : {}),
        externalFileUrl: item.filePath,
        externalCoverUrl: item.coverImage,
      });
    }
    await trx.commit();
  }

  const categories = categoriesData as JsonCategory[];
  const products = productsData as JsonProduct[];
  const categoryIdMap = new Map<string, string>();

  console.log(`Upserting ${categories.length} categories...`);
  {
    const trx = client.transaction();
    for (const category of categories) {
      const docId = safeDocId('category', category.slug);
      categoryIdMap.set(category.id, docId);
      trx.createOrReplace({
        _id: docId,
        _type: 'category',
        name: category.name,
        slug: { _type: 'slug', current: category.slug },
        description: category.description,
        displayOrder: category.display_order,
      });
    }
    await trx.commit();
  }

  console.log(`Upserting ${products.length} products...`);
  const batchSize = 25;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const trx = client.transaction();

    for (const product of batch) {
      const categoryRef = categoryIdMap.get(product.category_id);
      if (!categoryRef) {
        console.warn(`Skipping ${product.slug}: unknown category_id ${product.category_id}`);
        continue;
      }

      const galleryImageUrls = httpsGalleryUrls(product.gallery_images);
      const externalImageUrl = /^https:\/\//i.test(product.image_url) ? product.image_url : undefined;

      trx.createOrReplace({
        _id: safeDocId('product', product.slug),
        _type: 'product',
        name: product.name,
        slug: { _type: 'slug', current: product.slug },
        category: { _type: 'reference', _ref: categoryRef },
        description: product.description,
        shortDescription: product.short_description || undefined,
        specifications: toSanitySpecifications(product.specifications),
        features: product.features || [],
        applications: product.applications || [],
        ...(externalImageUrl ? { externalImageUrl } : {}),
        ...(galleryImageUrls.length > 0 ? { galleryImageUrls } : {}),
        ...(product.datasheet_url ? { datasheetUrl: product.datasheet_url } : {}),
        isFeatured: product.is_featured,
        displayOrder: product.display_order,
      });
    }

    const result = await trx.commit();
    console.log(
      `  committed ${Math.min(i + batchSize, products.length)} / ${products.length} (${result.results.length} ops)`,
    );
  }

  const blogPosts = blogPostsData as Array<{
    id: string; title: string; slug: string; excerpt: string; coverImageUrl: string;
    coverImageAlt: string; author: string; publishedAt: string; category: string;
    tags: string[]; featured: boolean; body: Array<Record<string, unknown>>;
  }>;

  console.log(`Upserting ${blogPosts.length} blog posts...`);
  {
    const trx = client.transaction();
    for (const post of blogPosts) {
      trx.createOrReplace({
        _id: safeDocId('blog', post.slug),
        _type: 'blogPost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        ...(post.coverImageUrl.startsWith('https://') ? { externalCoverImageUrl: post.coverImageUrl } : {}),
        author: post.author,
        publishedAt: post.publishedAt,
        category: post.category,
        tags: post.tags,
        featured: post.featured,
        body: post.body,
      });
    }
    await trx.commit();
  }

  console.log('Done. Open /studio and publish any draft documents if needed.');
}

seed().catch((error: { statusCode?: number; message?: string }) => {
  if (error?.statusCode === 401) {
    console.error(
      'Sanity rejected the write token (401 Unauthorized).\n' +
        'Create a new API token at https://sanity.io/manage/project/' +
        projectId +
        '/api with Editor (or Admin) permissions,\n' +
        'then update SANITY_API_WRITE_TOKEN in .env and run again.',
    );
  } else {
    console.error(error);
  }
  process.exit(1);
});
