'use client';

import { useMemo, useState, type ReactNode } from 'react';

import type { ProductSummary } from '@/lib/catalog/types';

import { ProductCard } from './ProductCard';
import { SearchBox } from './SearchBox';

/**
 * Product search across every category, run in the browser over a compact index
 * built at deploy time. With an empty query the category tiles (children) show.
 */
export function ProductIndexSearch({ products, children }: { products: ProductSummary[]; children: ReactNode }) {
  const [q, setQ] = useState('');
  const index = useMemo(
    () =>
      products.map((p) => ({
        p,
        text: [p.name, p.kind, p.primary.title, p.mounting, p.optic, p.power].filter(Boolean).join(' ').toLowerCase(),
      })),
    [products],
  );
  const needle = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!needle) return [];
    const words = needle.split(/\s+/);
    return index.filter((x) => words.every((w) => x.text.includes(w))).map((x) => x.p);
  }, [index, needle]);

  return (
    <>
      <div className="idx-search">
        <SearchBox value={q} onChange={setQ} placeholder="Search all products" />
      </div>
      {needle ? (
        <section className="results" aria-live="polite">
          <p className="count">
            {hits.length} {hits.length === 1 ? 'product matches' : 'products match'} “{q.trim()}”
          </p>
          <div className="grid">
            {hits.slice(0, 60).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          {hits.length > 60 && <p className="note">Showing the first 60. Add another word to narrow the search.</p>}
        </section>
      ) : (
        children
      )}
    </>
  );
}
