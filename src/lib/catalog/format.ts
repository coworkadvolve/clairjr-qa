// Display rules ported from the client's reference prototype (prototype/index.html).
import type { CatalogFile, CatalogImage, Product, ProductSummary, Specifications } from './types';

/** Sanity image URL at a given width, served in a modern format. */
export function sized(img: CatalogImage | string | null | undefined, width: number): string {
  const url = typeof img === 'string' ? img : img?.url;
  if (!url) return '';
  if (!/cdn\.sanity\.io\/images/.test(url)) return url;
  return `${url}?w=${width}&fit=max&auto=format`;
}

/** Link that makes the browser save the file under its Clair name. */
export function downloadUrl(file: CatalogFile | null | undefined): string {
  if (!file?.url) return '';
  if (!/cdn\.sanity\.io/.test(file.url)) return file.url;
  return file.filename ? `${file.url}?dl=${encodeURIComponent(file.filename)}` : `${file.url}?dl=`;
}

export const fmtSize = (b?: number | null) =>
  !b ? '' : b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;

export const fileTag = (f?: CatalogFile | null) => (f?.ext || 'pdf').toUpperCase();

/** Short line used on product cards. */
export function blurb(p: Pick<ProductSummary, 'mounting' | 'optic' | 'power'>, fallback = ''): string {
  const bits = [p.mounting?.split(' (')[0], p.optic?.split(',')[0], p.power?.split(';')[0]].filter(Boolean);
  return bits.length ? `${bits.join('. ')}.` : fallback;
}

/** One-line summary under the product name. */
export function lede(p: Product, categoryDescription = ''): string {
  const s = p.specifications;
  const kind = p.kind || 'luminaire';
  const m0 = s.mounting ? s.mounting.split(' (')[0] : '';
  const lead = m0 && !kind.toLowerCase().includes(m0.split(',')[0].toLowerCase()) ? `${m0} ` : '';
  let line = `${lead}${kind}${s.optic ? ` with ${s.optic.charAt(0).toLowerCase()}${s.optic.slice(1)}` : ''}.`;
  if (!s.mounting && !s.optic && !p.kind) line = categoryDescription.split('. ')[0].replace(/\.$/, '') + '.';
  return line.charAt(0).toUpperCase() + line.slice(1);
}

const criKey = (s: Specifications) => {
  const m = String(s.cri || '').match(/(\d+)/);
  return m ? `${m[1]}+` : '90+';
};

/** The six key figures next to the gallery. */
export function keyFigures(s: Specifications): [string, string][] {
  const last: [string, string] = s.ugr
    ? [s.ugr.startsWith('Below 16') ? 'Below 16' : s.ugr, 'Glare rating']
    : s.ik
      ? [s.ik, 'Impact rating']
      : [(s.lifetime || 'L70 at 50,000 hours').replace(' at ', ' · ').replace(' hours', ' h'), 'Rated life'];
  return [
    [s.power ? s.power.split(' per')[0].split(';')[0] : 'On request', 'System power'],
    [s.efficacy ? s.efficacy.replace(' to ', '–') : 'On request', s.efficacy ? 'Lumens per watt' : 'Efficacy'],
    [s.beamAngle ? s.beamAngle.split(' (')[0] : 'Diffused', 'Beam angle'],
    [criKey(s), 'Colour rendering'],
    [s.ip || 'On request', 'Protection'],
    last,
  ];
}

export interface CctChips {
  rgb: boolean;
  text?: string;
  kelvins: string[];
  tunable: string | null;
  extra: string[];
}

export function cctChips(s: Specifications): CctChips | null {
  const t = s.cct || '';
  if (!t) return null;
  if (/RGB|colour changing|Amber|Red|Green|Blue/i.test(t) && !/\d{4} K/.test(t))
    return { rgb: true, text: t, kelvins: [], tunable: null, extra: [] };
  const kelvins = [...new Set(t.replace(/tunable white[^,;]*/gi, '').match(/\d{4} K/g) || [])];
  const tw = (t.match(/tunable white[^,;]*/i) || [null])[0];
  const tunable = tw ? tw.replace(/^t/, 'T').replace(/(\d{4}) to (\d{4}) K/, '$1–$2 K') : null;
  const extra = t.match(/\b(RGBW?W?|Amber|Red|Green|Blue)\b[^,;]*/g) || [];
  return { rgb: false, kelvins, tunable, extra };
}

export const kelvinColour = (k: string) =>
  +k.slice(0, 4) <= 3000 ? '#FFD7A1' : +k.slice(0, 4) <= 4000 ? '#FFF1D9' : '#E3EEFF';

export const FINISH_COLOURS: Record<string, string> = {
  Black: '#111',
  Grey: '#8a8a8a',
  'Dark grey': '#4a4a4a',
  White: '#fff',
  Silver: '#c4c4c4',
  Gold: '#c9a24a',
  Bronze: '#8c6239',
  Corten: '#8b4a2b',
  Champagne: '#d9c7a3',
  Brown: '#5a3b25',
};

export const DOC_GROUPS: [string, string][] = [
  ['lm79', 'Light output test reports'],
  ['tm30', 'Colour quality test reports'],
  ['ies', 'Photometric files'],
  ['lm80', 'Lifetime test report'],
  ['bim', '3D and BIM models'],
];

/* Category filters: mounting and optic chips, only where they split the category. */
export const MOUNT_OPTIONS = ['Pendant', 'Surface', 'Recessed', 'Track', 'Free-standing'] as const;
export const OPTIC_OPTIONS = ['Lens', 'Diffuser', 'Anti-glare'] as const;

export const mounts = (p: Pick<ProductSummary, 'mounting'>) => {
  const m = (p.mounting || '').toLowerCase();
  return MOUNT_OPTIONS.filter((x) => m.includes(x.toLowerCase())) as string[];
};

export const opticClass = (p: Pick<ProductSummary, 'optic'>) => {
  const o = (p.optic || '').toLowerCase();
  if (/louvre|anti-glare|honeycomb/.test(o)) return 'Anti-glare';
  if (/lens/.test(o)) return 'Lens';
  if (/diffuser|opal|prismatic|silicone/.test(o)) return 'Diffuser';
  return 'Other';
};

export function splittingFilters(products: ProductSummary[]) {
  const hasSpec = products.length > 5 && products.some((p) => p.mounting || p.optic);
  if (!hasSpec) return { mounting: [] as string[], optic: [] as string[] };
  const splits = (values: readonly string[], fn: (p: ProductSummary) => string[]) =>
    values.filter((v) => {
      const n = products.filter((p) => fn(p).includes(v)).length;
      return n > 0 && n < products.length;
    });
  return {
    mounting: splits(MOUNT_OPTIONS, mounts),
    optic: splits(OPTIC_OPTIONS, (p) => [opticClass(p)]),
  };
}
