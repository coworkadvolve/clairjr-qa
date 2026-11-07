export type Group = 'indoor' | 'outdoor';

export interface CatalogImage {
  /** Base URL of the image (Sanity CDN). Size with `sized()`. */
  url: string;
  lqip?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface CatalogFile {
  url: string;
  bytes: number | null;
  filename: string | null;
  ext: string | null;
}

export interface Specifications {
  power?: string;
  optionalPower?: string;
  efficacy?: string;
  beamAngle?: string;
  optic?: string;
  distribution?: string;
  cri?: string;
  cct?: string;
  sdcm?: string;
  lifetime?: string;
  inputVoltage?: string;
  powerFactor?: string;
  thd?: string;
  ugr?: string;
  ip?: string;
  ik?: string;
  body?: string;
  mounting?: string;
  dimensions?: string;
  control?: string;
  application?: string;
  note?: string;
}

export interface LabelValue {
  label: string;
  value: string;
}

export interface SpecGroup {
  heading: string;
  rows: LabelValue[];
}

export interface Version {
  name?: string;
  mounting?: string;
  power?: string;
  dimensions?: string;
  efficacy?: string;
}

export interface ProductDocument {
  type: 'lm79' | 'tm30' | 'ies' | 'lm80' | 'bim' | string;
  label: string;
  file: CatalogFile | null;
}

export interface CategoryRef {
  slug: string;
  title: string;
  group: Group;
}

export interface Category extends CategoryRef {
  description: string;
  icon: string | null;
  order: number;
  count: number;
  preview: CatalogImage | null;
}

/** Light record used for cards, filters, menus and search. */
export interface ProductSummary {
  slug: string;
  name: string;
  kind: string | null;
  primary: CategoryRef;
  categories: string[];
  photo: CatalogImage | null;
  mounting: string | null;
  optic: string | null;
  power: string | null;
}

export interface Product extends ProductSummary {
  features: string[];
  specifications: Specifications;
  specificationGroups: SpecGroup[];
  iconStrip: LabelValue[];
  versions: Version[];
  moreVersionsInCatalogue: boolean;
  finishes: string[];
  lightDistribution: string[];
  colourTemperatures: string[];
  photos: CatalogImage[];
  dimensionDrawings: CatalogImage[];
  cataloguePages: CatalogImage[];
  catalogue: CatalogFile | null;
  datasheet: CatalogFile | null;
  documents: ProductDocument[];
  allCategories: CategoryRef[];
}
