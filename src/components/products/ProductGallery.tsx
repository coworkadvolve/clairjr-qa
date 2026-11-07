'use client';

import { useState } from 'react';

import { sized } from '@/lib/catalog/format';
import type { CatalogImage } from '@/lib/catalog/types';

export function ProductGallery({ photos, name }: { photos: CatalogImage[]; name: string }) {
  const [i, setI] = useState(0);
  const main = photos[i];
  return (
    <div className="gal">
      <div className="main">
        {main ? (
          <img
            src={sized(main, 1200)}
            alt={name}
            width={main.width ?? 1200}
            height={main.height ?? 1200}
            fetchPriority="high"
            style={main.lqip ? { backgroundImage: `url(${main.lqip})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' } : undefined}
          />
        ) : (
          <span className="gl-ph">No photo</span>
        )}
      </div>
      {photos.length > 1 && (
        <div className="thumbs">
          {photos.map((ph, k) => (
            <button key={k} type="button" aria-current={k === i} aria-label={`Image ${k + 1}`} onClick={() => setI(k)}>
              <img src={sized(ph, 160)} alt="" loading="lazy" width={72} height={72} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
