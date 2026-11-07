import Link from 'next/link';

import { categoryPath, groupLabel } from '@/lib/catalog/paths';
import type { Category } from '@/lib/catalog/types';

import { MobileCategorySelect } from './MobileCategorySelect';

interface Props {
  categories: Category[];
  total: number;
  current?: string | null;
}

/** "Filter by Category" sidebar on desktop; a drop-down on mobile. */
export function CategorySidebar({ categories, total, current = null }: Props) {
  return (
    <aside className="side" aria-label="Product categories">
      <h4>Filter by Category</h4>
      <Link href="/products" className={!current ? 'on' : ''}>
        All Products <span className="ct">{total}</span>
      </Link>
      {(['indoor', 'outdoor'] as const).map((g) => (
        <div key={g}>
          <h5>{groupLabel(g)}</h5>
          {categories
            .filter((c) => c.group === g)
            .map((c) => (
              <Link key={c.slug} href={categoryPath(c)} className={current === c.slug ? 'on' : ''}>
                {c.title} <span className="ct">{c.count}</span>
              </Link>
            ))}
        </div>
      ))}
    </aside>
  );
}

export function MobileCategories({ categories, current = null }: Omit<Props, 'total'>) {
  return (
    <MobileCategorySelect
      current={current}
      groups={(['indoor', 'outdoor'] as const).map((g) => ({
        label: groupLabel(g),
        options: categories.filter((c) => c.group === g).map((c) => ({ value: categoryPath(c), label: c.title, slug: c.slug })),
      }))}
    />
  );
}
