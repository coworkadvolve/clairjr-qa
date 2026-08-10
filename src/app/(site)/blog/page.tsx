import { BlogCard } from '@/components/BlogCard';
import blogService from '@/lib/blog';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.blog;

export default async function BlogPage() {
  const posts = await blogService.getAllPosts();
  return (
    <main>
      <section className="bg-neutral-950 py-12 text-white md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-brand-orange">Clair Insights</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-[3.5rem]">Ideas and guidance for better lighting decisions</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">Explore practical guides, energy-saving advice and applications from the Clair Lighting team.</p>
        </div>
      </section>
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {posts.length ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
              <h2 className="text-2xl font-bold text-neutral-900">Articles are coming soon</h2>
              <p className="mt-3 text-neutral-600">We’re preparing useful lighting guides and industry insights.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
