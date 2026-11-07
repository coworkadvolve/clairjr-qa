'use client';

import { useMemo, useState } from 'react';

import { mounts, opticClass } from '@/lib/catalog/format';
import type { ProductSummary } from '@/lib/catalog/types';

import { ProductCard } from './ProductCard';
import { SearchBox } from './SearchBox';

interface Props {
  title: string;
  products: ProductSummary[];
  filters: { mounting: string[]; optic: string[] };
  fallbackBlurb: string;
}

/**
 * Category product list with mounting / optic chips and search.
 * Within a filter group any match counts; across groups all must match.
 */
export function CategoryBrowser({ title, products, filters, fallbackBlurb }: Props) {
  const [m, setM] = useState<Set<string>>(new Set());
  const [o, setO] = useState<Set<string>>(new Set());
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!needle || p.name.toLowerCase().includes(needle) || (p.kind || '').toLowerCase().includes(needle)) &&
        (!m.size || mounts(p).some((x) => m.has(x))) &&
        (!o.size || o.has(opticClass(p))),
    );
  }, [products, m, o, q]);

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, v: string) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    setter(next);
  };
  const clear = () => {
    setM(new Set());
    setO(new Set());
    setQ('');
  };
  const hasChips = filters.mounting.length + filters.optic.length > 0;

  return (
    <>
      <div className="bar">
        <h2>{title}</h2>
        <span className="count" aria-live="polite">
          {list.length === products.length
            ? `${list.length} ${list.length === 1 ? 'product' : 'products'}`
            : `${list.length} of ${products.length} products`}
        </span>
      </div>
      {hasChips && (
        <div className="chips" role="group" aria-label="Filter products">
          {filters.mounting.map((v) => (
            <button key={`m-${v}`} type="button" className="chip" aria-pressed={m.has(v)} onClick={() => toggle(m, setM, v)}>
              {v}
            </button>
          ))}
          {filters.optic.map((v) => (
            <button key={`o-${v}`} type="button" className="chip" aria-pressed={o.has(v)} onClick={() => toggle(o, setO, v)}>
              {v}
            </button>
          ))}
        </div>
      )}
      {products.length > 8 && (
        <div style={{ margin: '0 0 18px' }}>
          <SearchBox value={q} onChange={setQ} placeholder={`Search ${title.toLowerCase()}`} />
        </div>
      )}
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} fallbackBlurb={fallbackBlurb} />
        ))}
      </div>
      {!list.length && (
        <p className="empty">
          No products match these filters.{' '}
          <button type="button" onClick={clear}>
            Clear all filters
          </button>
        </p>
      )}
    </>
  );
}
