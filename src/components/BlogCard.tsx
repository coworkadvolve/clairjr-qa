import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

import type { BlogPost } from '@/lib/blog';
import { routes } from '@/lib/routes';

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={routes.blogPost(post.slug)} className="block aspect-[16/10] overflow-hidden bg-neutral-100">
        {post.coverImageUrl ? (
          <img src={post.coverImageUrl} alt={post.coverImageAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-2xl font-bold text-white">Clair Insights</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wider">
          <span className="text-brand-orange">{post.category}</span>
          <span className="text-neutral-300">•</span>
          <time className="text-neutral-500" dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
        </div>
        <h3 className="mb-3 text-2xl font-bold leading-tight text-neutral-900">
          <Link href={routes.blogPost(post.slug)} className="transition-colors hover:text-brand-orange">{post.title}</Link>
        </h3>
        <p className="mb-6 line-clamp-3 flex-1 leading-relaxed text-neutral-600">{post.excerpt}</p>
        <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="flex items-center gap-1.5 text-sm text-neutral-500"><Clock size={15} /> {post.readingTime} min read</span>
          <Link href={routes.blogPost(post.slug)} className="flex items-center gap-2 font-semibold text-brand-orange">Read article <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </div>
    </article>
  );
}
