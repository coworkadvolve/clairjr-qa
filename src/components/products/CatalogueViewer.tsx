'use client';

import { useCallback, useEffect, useState } from 'react';

import { sized } from '@/lib/catalog/format';
import type { CatalogImage } from '@/lib/catalog/types';

/** Catalogue pages as thumbnails that open full screen, with previous / next and keyboard support. */
export function CatalogueViewer({ pages }: { pages: CatalogImage[] }) {
  const [k, setK] = useState<number | null>(null);
  const n = pages.length;
  const show = useCallback((i: number) => setK(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (k === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setK(null);
      if (e.key === 'ArrowRight') show(k + 1);
      if (e.key === 'ArrowLeft') show(k - 1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [k, show]);

  return (
    <>
      <div className="catpages">
        {pages.map((p, i) => (
          <button key={i} type="button" aria-label={`Open catalogue page ${i + 1}`} onClick={() => show(i)}>
            <img src={sized(p, 360)} alt="" loading="lazy" />
            <span>{i + 1}</span>
          </button>
        ))}
      </div>
      {k !== null && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={`Catalogue page ${k + 1} of ${n}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setK(null);
          }}
        >
          <button type="button" className="lb-x" aria-label="Close" onClick={() => setK(null)}>
            ×
          </button>
          <button type="button" className="lb-p" aria-label="Previous page" onClick={() => show(k - 1)}>
            ‹
          </button>
          <img src={sized(pages[k], 1600)} alt={`Catalogue page ${k + 1}`} />
          <button type="button" className="lb-n" aria-label="Next page" onClick={() => show(k + 1)}>
            ›
          </button>
          <span className="lb-c">
            Page {k + 1} of {n}
          </span>
        </div>
      )}
    </>
  );
}
