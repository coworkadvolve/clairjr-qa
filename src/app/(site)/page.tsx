import { HomePage, type FeaturedProduct } from '@/views/HomePage';
import contentService from '@/lib/content';
import { getCatalog, productPath } from '@/lib/catalog';
import { blurb, sized } from '@/lib/catalog/format';
import { pageMetadata } from '@/lib/seo/metadata';
import blogService from '@/lib/blog';

export const metadata = pageMetadata.home;

/** One product with a photo from each of the largest categories, alternating indoor and outdoor. */
async function getFeaturedProducts(limit = 8): Promise<FeaturedProduct[]> {
  const { categories, products } = await getCatalog();
  const byGroup = (g: string) =>
    categories.filter((c) => c.group === g).sort((a, b) => b.count - a.count);
  const indoor = byGroup('indoor');
  const outdoor = byGroup('outdoor');
  const order = indoor.flatMap((c, i) => [c, outdoor[i]]).filter(Boolean);
  const picked: FeaturedProduct[] = [];
  for (const c of order) {
    const p = products.find((x) => x.primary.slug === c.slug && x.photo);
    if (!p) continue;
    picked.push({
      id: p.slug,
      name: p.name,
      slug: p.slug,
      href: productPath(p),
      category: c.title,
      short_description: blurb(p, c.description.split('. ')[0]),
      image_url: sized(p.photo, 600),
    });
    if (picked.length === limit) break;
  }
  return picked;
}

export default async function Page() {
  const [featuredProducts, testimonials, catalogues, blogPosts] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    contentService.getTestimonials(),
    contentService.getCatalogues(),
    blogService.getHomepagePosts(),
  ]);

  return (
    <HomePage
      initialProducts={featuredProducts}
      testimonials={testimonials}
      catalogues={catalogues}
      blogPosts={blogPosts}
    />
  );
}
