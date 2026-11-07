'use client';

import { useRouter } from 'next/navigation';

interface Group {
  label: string;
  options: { value: string; label: string; slug: string }[];
}

export function MobileCategorySelect({ groups, current }: { groups: Group[]; current: string | null }) {
  const router = useRouter();
  const value = groups.flatMap((g) => g.options).find((o) => o.slug === current)?.value ?? '';
  return (
    <div className="mcats">
      <label className="sr" htmlFor="mc">
        Category
      </label>
      <select id="mc" value={value} onChange={(e) => router.push(e.target.value || '/products')}>
        <option value="">All categories</option>
        {groups.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
