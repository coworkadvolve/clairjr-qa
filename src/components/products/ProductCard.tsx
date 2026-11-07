import Link from 'next/link';

import { blurb, sized } from '@/lib/catalog/format';
import { productPath } from '@/lib/catalog/paths';
import type { ProductSummary } from '@/lib/catalog/types';

import { QuoteButton } from './QuoteButton';

export function ProductCard({ product, fallbackBlurb = '' }: { product: ProductSummary; fallbackBlurb?: string }) {
  const href = productPath(product);
  return (
    <article className="card">
      <Link className="ph" href={href} aria-label={product.name}>
        {product.photo ? (
          <img
            src={sized(product.photo, 400)}
            alt=""
            loading="lazy"
            width={400}
            height={400}
            style={product.photo.lqip ? { backgroundImage: `url(${product.photo.lqip})`, backgroundSize: 'cover' } : undefined}
          />
        ) : (
          <span className="gl-ph">No photo</span>
        )}
      </Link>
      <div className="bd">
        <span className="tag">{product.primary.title}</span>
        <h3>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p>{blurb(product, fallbackBlurb)}</p>
        <div className="act">
          <Link className="more" href={href}>
            View Details
          </Link>
          <QuoteButton productName={product.name} />
        </div>
      </div>
    </article>
  );
}
