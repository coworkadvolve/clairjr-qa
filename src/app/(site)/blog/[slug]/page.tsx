import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

import { BlogBody } from '@/components/BlogBody';
import { formatBlogDate } from '@/components/BlogCard';
import blogService from '@/lib/blog';
import { routes } from '@/lib/routes';
import { createPageMetadata, siteConfig } from '@/lib/seo/metadata';
import { blogPostingJsonLd, breadcrumbJsonLd, JsonLd } from '@/lib/seo/jsonld';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await blogService.getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogService.getPostBySlug(slug);
  if (!post) return createPageMetadata({ title: 'Article not found', description: 'The requested article could not be found.', path: `/blog/${slug}`, noIndex: true });
  return createPageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: routes.blogPost(post.slug),
    image: post.coverImageUrl || undefined,
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await blogService.getPostBySlug(slug);
  if (!post) notFound();
  const posts = await blogService.getAllPosts();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return (
    <main className="bg-white">
      <JsonLd data={[
        blogPostingJsonLd(post),
        breadcrumbJsonLd([
          { name: 'Home', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}${routes.blogPost(post.slug)}` },
        ]),
      ]} />
      <article className="overflow-hidden">
        <header className="bg-[#0d0805] py-10 text-white md:py-14 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <Link href={routes.blog} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition hover:text-brand-orange"><ArrowLeft size={16} /> All articles</Link>
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange">{post.category}</p>
                <h1 className="text-balance text-4xl font-bold leading-[1.04] sm:text-5xl md:text-[3.5rem]">{post.title}</h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-400">{post.excerpt}</p>
                <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-400">
                  <span className="font-medium text-white">{post.author}</span><span className="text-neutral-700">/</span><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time><span className="flex items-center gap-1.5"><Clock size={15} /> {post.readingTime} min read</span>
                </div>
              </div>
              {post.coverImageUrl && (
                <figure>
                  <img src={post.coverImageUrl} alt={post.coverImageAlt} className="h-auto w-full rounded-[15px] object-contain" />
                  <figcaption className="mt-3 text-xs leading-5 text-neutral-500">{post.coverImageAlt}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </header>
        <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl"><BlogBody body={post.body} /></div>
          {post.tags.length > 0 && (
            <div className="mx-auto mt-16 flex max-w-3xl flex-wrap gap-2 border-t border-neutral-200 pt-8">
              {post.tags.map((tag) => <span key={tag} className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-600">{tag}</span>)}
            </div>
          )}
        </div>
        {(previousPost || nextPost) && (
          <nav aria-label="More articles" className="grid border-y border-neutral-200 md:grid-cols-2">
            <div className="border-b border-neutral-200 p-8 md:border-b-0 md:border-r md:p-12 lg:pl-[max(3rem,calc((100vw-72rem)/2))]">
              {previousPost && <Link href={routes.blogPost(previousPost.slug)} className="group block"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange"><ArrowLeft size={14} /> Previous</span><span className="mt-4 block max-w-lg text-xl font-semibold text-neutral-900 transition group-hover:text-brand-orange">{previousPost.title}</span></Link>}
            </div>
            <div className="p-8 text-left md:p-12 md:text-right lg:pr-[max(3rem,calc((100vw-72rem)/2))]">
              {nextPost && <Link href={routes.blogPost(nextPost.slug)} className="group block"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange md:justify-end">Next <ArrowRight size={14} /></span><span className="mt-4 block text-xl font-semibold text-neutral-900 transition group-hover:text-brand-orange">{nextPost.title}</span></Link>}
            </div>
          </nav>
        )}
      </article>
    </main>
  );
}
