import type {
  AboutPageContent,
  AboutPageIcon,
  Catalogue,
  SiteSettings,
  Testimonial,
} from '@/lib/content-types';
import { defaultAboutPage, defaultSiteSettings } from '@/lib/content-types';
import { urlForImage } from './image';

type SanitySiteSettingsRow = {
  companyName?: string;
  headerTagline?: string;
  primaryEmail?: string;
  secondaryEmail?: string | null;
  phones?: Array<{ label?: string; number?: string; tel?: string }>;
  formRecipientEmail?: string;
  address?: {
    line1?: string;
    line2?: string | null;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  businessHours?: string[];
  locations?: string[];
};

type SanityTestimonialRow = {
  _id: string;
  name?: string;
  title?: string;
  company?: string;
  content?: string;
  rating?: number;
  displayOrder?: number;
};

type SanityCatalogueRow = {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  fileName?: string;
  viewUrl?: string;
  displayOrder?: number;
  coverImage?: unknown;
  externalCoverUrl?: string;
  fileUrl?: string;
  externalFileUrl?: string;
};

type SanityAboutPageRow = {
  eyebrow?: string;
  pageTitle?: string;
  heroSubtitle?: string;
  stats?: Array<{ value?: string; label?: string }>;
  storyTitle?: string;
  storyParagraphs?: string[];
  storyImage?: unknown;
  externalStoryImageUrl?: string;
  storyBadgeTitle?: string;
  storyBadgeText?: string;
  solutionsTitle?: string;
  solutionsSubtitle?: string;
  solutions?: Array<{
    icon?: string;
    title?: string;
    description?: string;
    image?: unknown;
    imageUrl?: string;
    externalImageUrl?: string;
  }>;
  tortekEyebrow?: string;
  tortekTitle?: string;
  tortekParagraphs?: string[];
  tortekImage?: unknown;
  externalTortekImageUrl?: string;
  tortekCtaLabel?: string;
  missionVisionTitle?: string;
  missionVisionSubtitle?: string;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  valuesTitle?: string;
  valuesSubtitle?: string;
  values?: Array<{ icon?: string; title?: string; description?: string }>;
  leadersTitle?: string;
  leadersText?: string;
  leaders?: Array<{
    name?: string;
    role?: string;
    photo?: unknown;
    photoUrl?: string;
    externalPhotoUrl?: string;
    description?: string;
  }>;
  leadersNote?: string;
  certificationsTitle?: string;
  certificationsSubtitle?: string;
  certifications?: string[];
  ctaTitle?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
};

const aboutPageIcons = new Set<AboutPageIcon>([
  'zap',
  'award',
  'heart',
  'target',
  'eye',
  'globe',
  'shieldCheck',
  'lightbulb',
  'leaf',
  'trendingUp',
  'cable',
  'sun',
]);

function resolveStoryImage(storyImage: unknown, externalStoryImageUrl?: string): string {
  const external = externalStoryImageUrl?.trim();
  if (external) return external;

  if (storyImage && typeof storyImage === 'object') {
    try {
      return urlForImage(storyImage as never).width(1200).quality(85).url();
    } catch {
      // fall through
    }
  }

  return defaultAboutPage.storyImage;
}

function resolveAboutImage(image: unknown, imageUrl?: string, externalImageUrl?: string): string {
  const external = externalImageUrl?.trim();
  if (external) return external;

  const directUrl = imageUrl?.trim();
  if (directUrl) return directUrl;

  if (image && typeof image === 'object') {
    try {
      return urlForImage(image as never).width(900).quality(85).url();
    } catch {
      // fall through
    }
  }

  return '';
}

function parseAboutPageIcon(icon?: string): AboutPageIcon {
  if (icon && aboutPageIcons.has(icon as AboutPageIcon)) {
    return icon as AboutPageIcon;
  }
  return 'award';
}

function resolveCoverImage(coverImage: unknown, externalCoverUrl?: string): string {
  if (coverImage && typeof coverImage === 'object') {
    try {
      return urlForImage(coverImage as never).width(800).quality(85).url();
    } catch {
      // fall through
    }
  }

  const external = externalCoverUrl?.trim();
  if (external) return external;

  return '/catalogue/product-catalogue thumb.png';
}

function resolveFilePath(fileUrl?: string, externalFileUrl?: string): string {
  const external = externalFileUrl?.trim();
  if (external) return external;

  const file = fileUrl?.trim();
  if (file) return file;

  return '#';
}

export function mapSiteSettingsRow(row: SanitySiteSettingsRow | null): SiteSettings {
  if (!row) return defaultSiteSettings;

  return {
    companyName: row.companyName || defaultSiteSettings.companyName,
    headerTagline: row.headerTagline || defaultSiteSettings.headerTagline,
    primaryEmail: row.primaryEmail || defaultSiteSettings.primaryEmail,
    secondaryEmail: row.secondaryEmail ?? defaultSiteSettings.secondaryEmail,
    phones:
      row.phones && row.phones.length > 0
        ? row.phones
            .filter((phone) => phone.number && phone.tel)
            .map((phone) => ({
              label: phone.label,
              number: phone.number!,
              tel: phone.tel!,
            }))
        : defaultSiteSettings.phones,
    formRecipientEmail: row.formRecipientEmail || defaultSiteSettings.formRecipientEmail,
    address: {
      line1: row.address?.line1 || defaultSiteSettings.address.line1,
      line2: row.address?.line2 ?? defaultSiteSettings.address.line2,
      city: row.address?.city || defaultSiteSettings.address.city,
      postalCode: row.address?.postalCode || defaultSiteSettings.address.postalCode,
      country: row.address?.country || defaultSiteSettings.address.country,
    },
    businessHours:
      row.businessHours && row.businessHours.length > 0
        ? row.businessHours
        : defaultSiteSettings.businessHours,
    locations:
      row.locations && row.locations.length > 0
        ? row.locations
        : defaultSiteSettings.locations,
  };
}

export function mapTestimonialRow(row: SanityTestimonialRow): Testimonial {
  return {
    id: row._id,
    name: row.name || '',
    title: row.title || '',
    company: row.company || '',
    content: row.content || '',
    rating: Math.min(5, Math.max(1, row.rating ?? 5)),
    display_order: row.displayOrder ?? 0,
  };
}

export function mapCatalogueRow(row: SanityCatalogueRow): Catalogue {
  const slug = row.slug || row._id;

  return {
    id: slug,
    title: row.title || '',
    description: row.description || '',
    filePath: resolveFilePath(row.fileUrl, row.externalFileUrl),
    fileName: row.fileName || `${row.title || 'catalogue'}.pdf`,
    coverImage: resolveCoverImage(row.coverImage, row.externalCoverUrl),
    viewUrl: row.viewUrl || undefined,
    display_order: row.displayOrder ?? 0,
  };
}

export function mapAboutPageRow(row: SanityAboutPageRow | null): AboutPageContent {
  if (!row) return defaultAboutPage;

  return {
    eyebrow: row.eyebrow || defaultAboutPage.eyebrow,
    pageTitle: row.pageTitle || defaultAboutPage.pageTitle,
    heroSubtitle: row.heroSubtitle || defaultAboutPage.heroSubtitle,
    stats:
      row.stats && row.stats.length > 0
        ? row.stats
            .filter((stat) => stat.value && stat.label)
            .map((stat) => ({
              value: stat.value!,
              label: stat.label!,
            }))
        : defaultAboutPage.stats,
    storyTitle: row.storyTitle || defaultAboutPage.storyTitle,
    storyParagraphs:
      row.storyParagraphs && row.storyParagraphs.length > 0
        ? row.storyParagraphs
        : defaultAboutPage.storyParagraphs,
    storyImage: resolveStoryImage(row.storyImage, row.externalStoryImageUrl),
    storyBadgeTitle: row.storyBadgeTitle || defaultAboutPage.storyBadgeTitle,
    storyBadgeText: row.storyBadgeText || defaultAboutPage.storyBadgeText,
    solutionsTitle: row.solutionsTitle || defaultAboutPage.solutionsTitle,
    solutionsSubtitle: row.solutionsSubtitle || defaultAboutPage.solutionsSubtitle,
    solutions:
      row.solutions && row.solutions.length > 0
        ? row.solutions.map((solution, index) => ({
            icon: parseAboutPageIcon(solution.icon),
            title: solution.title || '',
            description: solution.description || '',
            image:
              resolveAboutImage(solution.image, solution.imageUrl, solution.externalImageUrl) ||
              defaultAboutPage.solutions[index]?.image ||
              '',
          }))
        : defaultAboutPage.solutions,
    tortekEyebrow: row.tortekEyebrow || defaultAboutPage.tortekEyebrow,
    tortekTitle: row.tortekTitle || defaultAboutPage.tortekTitle,
    tortekParagraphs:
      row.tortekParagraphs && row.tortekParagraphs.length > 0
        ? row.tortekParagraphs
        : defaultAboutPage.tortekParagraphs,
    tortekImage:
      resolveAboutImage(row.tortekImage, undefined, row.externalTortekImageUrl) ||
      defaultAboutPage.tortekImage,
    tortekCtaLabel: row.tortekCtaLabel || defaultAboutPage.tortekCtaLabel,
    missionVisionTitle: row.missionVisionTitle || defaultAboutPage.missionVisionTitle,
    missionVisionSubtitle:
      row.missionVisionSubtitle || defaultAboutPage.missionVisionSubtitle,
    missionTitle: row.missionTitle || defaultAboutPage.missionTitle,
    missionText: row.missionText || defaultAboutPage.missionText,
    visionTitle: row.visionTitle || defaultAboutPage.visionTitle,
    visionText: row.visionText || defaultAboutPage.visionText,
    valuesTitle: row.valuesTitle || defaultAboutPage.valuesTitle,
    valuesSubtitle: row.valuesSubtitle || defaultAboutPage.valuesSubtitle,
    values:
      row.values && row.values.length > 0
        ? row.values.map((value) => ({
            icon: parseAboutPageIcon(value.icon),
            title: value.title || '',
            description: value.description || '',
          }))
        : defaultAboutPage.values,
    leadersTitle: row.leadersTitle || defaultAboutPage.leadersTitle,
    leadersText: row.leadersText || defaultAboutPage.leadersText,
    leaders:
      row.leaders && row.leaders.length > 0
        ? row.leaders.map((leader, index) => ({
            name: leader.name || '',
            role: leader.role || '',
            image:
              resolveAboutImage(leader.photo, leader.photoUrl, leader.externalPhotoUrl) ||
              defaultAboutPage.leaders[index]?.image ||
              '',
            description: leader.description || '',
          }))
        : defaultAboutPage.leaders,
    leadersNote: row.leadersNote || defaultAboutPage.leadersNote,
    certificationsTitle: row.certificationsTitle || defaultAboutPage.certificationsTitle,
    certificationsSubtitle:
      row.certificationsSubtitle || defaultAboutPage.certificationsSubtitle,
    certifications:
      row.certifications && row.certifications.length > 0
        ? row.certifications
        : defaultAboutPage.certifications,
    ctaTitle: row.ctaTitle || defaultAboutPage.ctaTitle,
    ctaText: row.ctaText || defaultAboutPage.ctaText,
    ctaPrimaryLabel: row.ctaPrimaryLabel || defaultAboutPage.ctaPrimaryLabel,
    ctaSecondaryLabel: row.ctaSecondaryLabel || defaultAboutPage.ctaSecondaryLabel,
  };
}
