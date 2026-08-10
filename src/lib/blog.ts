import blogPostsData from '@/data/blogPosts.json';
import { sanityFetch } from '@/sanity/client';
import { isSanityProductsEnabled } from '@/sanity/env';
import { urlForImage } from '@/sanity/image';
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/queries';

export type BlogSpan = {
  _key?: string;
  _type?: 'span';
  text?: string;
  marks?: string[];
};

export type BlogBodyBlock = {
  _key?: string;
  _type: 'block' | 'image';
  style?: string;
  children?: BlogSpan[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  asset?: unknown;
  alt?: string;
  caption?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string | null;
  coverImageAlt: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featured: boolean;
  body: BlogBodyBlock[];
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
};

type SanityBlogPost = Omit<BlogPost, 'id' | 'coverImageUrl' | 'readingTime'> & {
  _id: string;
  coverImage?: unknown;
  externalCoverImageUrl?: string;
};

function bodyText(body: BlogBodyBlock[]) {
  return body.flatMap((block) => block.children || []).map((child) => child.text || '').join(' ');
}

export function calculateReadingTime(body: BlogBodyBlock[]) {
  const words = bodyText(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function sanityImageUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null;
  try {
    return urlForImage(image as never).width(1400).quality(88).url();
  } catch {
    return null;
  }
}

function normalize(row: SanityBlogPost | (typeof blogPostsData)[number]): BlogPost {
  const sanityRow = row as SanityBlogPost;
  const localRow = row as (typeof blogPostsData)[number];
  const body = (row.body || []) as BlogBodyBlock[];
  return {
    id: sanityRow._id || localRow.id,
    title: row.title || '',
    slug: row.slug || '',
    excerpt: row.excerpt || '',
    coverImageUrl: sanityImageUrl(sanityRow.coverImage) || sanityRow.externalCoverImageUrl || localRow.coverImageUrl || null,
    coverImageAlt: row.coverImageAlt || row.title || 'Blog cover image',
    author: row.author || 'Clair Lighting Team',
    publishedAt: row.publishedAt,
    category: row.category || 'Lighting Guides',
    tags: row.tags || [],
    featured: row.featured ?? false,
    body,
    seoTitle: sanityRow.seoTitle,
    seoDescription: sanityRow.seoDescription,
    readingTime: calculateReadingTime(body),
  };
}

const localPosts = () => blogPostsData.map(normalize).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

async function allPosts(): Promise<BlogPost[]> {
  if (isSanityProductsEnabled()) {
    try {
      const rows = await sanityFetch<SanityBlogPost[]>(blogPostsQuery);
      if (rows.length > 0) return rows.map(normalize);
    } catch (error) {
      console.error('Sanity blog fetch failed, falling back to local JSON:', error);
    }
  }
  return localPosts();
}

export const blogService = {
  getAllPosts: allPosts,
  async getHomepagePosts(): Promise<BlogPost[]> {
    const posts = await allPosts();
    const featured = posts.filter((post) => post.featured);
    return (featured.length >= 3 ? featured : posts).slice(0, 3);
  },
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (isSanityProductsEnabled()) {
      try {
        const row = await sanityFetch<SanityBlogPost | null>(blogPostBySlugQuery, { slug });
        if (row) return normalize(row);
      } catch (error) {
        console.error('Sanity blog post fetch failed, falling back to local JSON:', error);
      }
    }
    return localPosts().find((post) => post.slug === slug) || null;
  },
};

export default blogService;
