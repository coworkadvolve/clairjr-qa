import type { CategoryRef, Group } from './types';

export const groupLabel = (g: Group | string) => (g === 'indoor' ? 'Indoor Lights' : 'Outdoor Lights');
export const groupPath = (g: Group | string) => `/products/${g}`;
export const categoryPath = (c: Pick<CategoryRef, 'group' | 'slug'>) => `/products/${c.group}/${c.slug}`;
/** A product's own address always uses its primary (first) category. */
export const productPath = (p: { slug: string; primary: Pick<CategoryRef, 'group' | 'slug'> }) =>
  `/products/${p.primary.group}/${p.primary.slug}/${p.slug}`;
