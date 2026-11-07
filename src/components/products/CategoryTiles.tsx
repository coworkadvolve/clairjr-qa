import Link from 'next/link';

import { sized } from '@/lib/catalog/format';
import { categoryPath, groupLabel, groupPath } from '@/lib/catalog/paths';
import type { Category, Group } from '@/lib/catalog/types';

export function CategoryTiles({ categories, group, total }: { categories: Category[]; group: Group; total: number }) {
  const list = categories.filter((c) => c.group === group);
  return (
    <section>
      <div className="grp-h">
        <h2>
          <Link href={groupPath(group)} style={{ textDecoration: 'none' }}>
            {groupLabel(group)}
          </Link>
        </h2>
        <span>
          {list.length} categories · {total} products
        </span>
      </div>
      <div className="tiles">
        {list.map((c) => (
          <Link key={c.slug} className="tile" href={categoryPath(c)}>
            <span className="ic">
              {c.preview ? <img src={sized(c.preview, 160)} alt="" loading="lazy" /> : <span className="gl-ph">—</span>}
            </span>
            <span>
              <b>{c.title}</b>
              <small>
                {c.count} {c.count === 1 ? 'product' : 'products'}
              </small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
