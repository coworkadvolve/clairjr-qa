export interface SiteSettingsPhone {
  label?: string;
  number: string;
  tel: string;
}

export interface SiteSettingsAddress {
  line1: string;
  line2?: string | null;
  city: string;
  postalCode: string;
  country: string;
}

export interface SiteSettings {
  companyName: string;
  headerTagline: string;
  primaryEmail: string;
  secondaryEmail?: string | null;
  phones: SiteSettingsPhone[];
  formRecipientEmail: string;
  address: SiteSettingsAddress;
  businessHours: string[];
  locations: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  display_order: number;
}

export interface Catalogue {
  id: string;
  title: string;
  description: string;
  filePath: string;
  fileName: string;
  coverImage: string;
  viewUrl?: string;
  display_order: number;
}

export type AboutPageIcon =
  | 'zap'
  | 'award'
  | 'heart'
  | 'target'
  | 'eye'
  | 'globe'
  | 'shieldCheck'
  | 'lightbulb'
  | 'leaf'
  | 'trendingUp'
  | 'cable'
  | 'sun';

export interface AboutPageStat {
  value: string;
  label: string;
}

export interface AboutPageSolution {
  icon: AboutPageIcon;
  title: string;
  description: string;
  image?: string;
}

export interface AboutPageValue {
  icon: AboutPageIcon;
  title: string;
  description: string;
}

export interface AboutPageLeader {
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface AboutPageContent {
  eyebrow: string;
  pageTitle: string;
  heroSubtitle: string;
  stats: AboutPageStat[];
  storyTitle: string;
  storyParagraphs: string[];
  storyImage: string;
  storyBadgeTitle: string;
  storyBadgeText: string;
  solutionsTitle: string;
  solutionsSubtitle: string;
  solutions: AboutPageSolution[];
  missionVisionTitle: string;
  missionVisionSubtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  valuesTitle: string;
  valuesSubtitle: string;
  values: AboutPageValue[];
  leadersTitle: string;
  leadersText: string;
  leaders: AboutPageLeader[];
  leadersNote: string;
  certificationsTitle: string;
  certificationsSubtitle: string;
  certifications: string[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
}

export const defaultAboutPage: AboutPageContent = {
  eyebrow: 'Since 2006',
  pageTitle: 'About Clair',
  heroSubtitle:
    'Clair Electronics builds reliable, energy-efficient lighting and electrical solutions for homes, businesses, industries, institutions and infrastructure projects.',
  stats: [
    { value: '2006', label: 'Founded with LED lighting' },
    { value: '50K+', label: 'Installations completed' },
    { value: '500+', label: 'Corporate clients served' },
    { value: '100+', label: 'Years of J.G. Group legacy' },
  ],
  storyTitle: 'From focused LED lighting to a complete electrical ecosystem.',
  storyParagraphs: [
    'Clair began with a clear belief: modern spaces need electrical solutions that are reliable, efficient and built for everyday performance.',
    'What started as a focused LED lighting business has grown into a wider electrical solutions brand serving homes, commercial spaces, industries, institutions and infrastructure projects.',
    'Today, Clair brings LED lighting, solar solutions and Tortek by Clair wires & cables together into one practical ecosystem for how a modern space is powered.',
  ],
  storyImage: '/about/our-story.webp',
  storyBadgeTitle: 'ISO',
  storyBadgeText: 'Quality Certified',
  solutionsTitle: 'Solutions for Modern Spaces',
  solutionsSubtitle:
    'Lighting, solar, wires and cables brought together for the complete journey of a powered space.',
  solutions: [
    {
      icon: 'lightbulb',
      title: 'LED Lighting',
      description:
        'Indoor, outdoor, commercial, industrial and specialty lighting solutions built around each application.',
    },
    {
      icon: 'sun',
      title: 'Solar Solutions',
      description:
        'Cleaner energy solutions for homes, commercial facilities, industries and infrastructure projects.',
    },
    {
      icon: 'cable',
      title: 'Tortek by Clair',
      description:
        'Wires and cables that support safe, reliable connections across powered environments.',
    },
  ],
  missionVisionTitle: '',
  missionVisionSubtitle: '',
  missionTitle: 'Our Mission',
  missionText:
    'To deliver reliable, energy-efficient and application-led electrical solutions that support the way homes, businesses, industries and communities function every day.',
  visionTitle: 'Our Vision',
  visionText:
    'To become a trusted electrical solutions brand that brings together lighting, wiring, solar and future-ready technologies for modern spaces.',
  valuesTitle: 'Values That Shape Clair',
  valuesSubtitle: 'The principles behind every product, process and partnership.',
  values: [
    {
      icon: 'shieldCheck',
      title: 'Quality',
      description: 'Dependable products that perform consistently across real applications.',
    },
    {
      icon: 'lightbulb',
      title: 'Innovation',
      description: 'Continuous improvement in products, processes and solutions.',
    },
    {
      icon: 'leaf',
      title: 'Sustainability',
      description: 'Energy-efficient solutions that support responsible long-term use.',
    },
    {
      icon: 'eye',
      title: 'Trust',
      description: 'Reliable products, transparent processes and dependable service.',
    },
    {
      icon: 'trendingUp',
      title: 'Performance',
      description: 'Solutions designed to support spaces beyond the first installation.',
    },
  ],
  leadersTitle: 'People Behind Clair',
  leadersText:
    "Clair's leadership brings together legacy business values, next-generation strategy and operational execution to support the brand's growth across lighting, solar and wires & cables.",
  leaders: [
    {
      name: 'Mahesh Jain',
      role: 'Legacy Leadership',
      image:
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
      description:
        'Brings decades of business experience, ethical leadership and long-term vision rooted in the J.G. Group legacy.',
    },
    {
      name: 'Tanush Jain',
      role: 'Director',
      image:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
      description:
        "Brings next-generation strategy, market understanding and a product-led view of Clair's expansion.",
    },
    {
      name: 'Avinash Goel',
      role: 'Chief Executive Officer',
      image:
        'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80',
      description:
        'Leads execution, operational alignment, channel expansion and delivery discipline across the business.',
    },
  ],
  leadersNote: 'Leadership visuals are representative and can be replaced with approved portraits.',
  certificationsTitle: 'Certifications & Standards',
  certificationsSubtitle:
    "Clair's commitment to quality is supported by recognised certifications, compliance standards and energy-efficient product development.",
  certifications: ['ISO 9001:2015', 'CE Certified', 'RoHS Compliant', 'Energy-Efficient Solutions'],
  ctaTitle: "Explore Clair's complete electrical ecosystem.",
  ctaText:
    'Lighting, solar, wires and cables for homes, businesses, industries and infrastructure projects.',
  ctaPrimaryLabel: 'Request a Quote',
  ctaSecondaryLabel: 'View Products',
};

export const defaultSiteSettings: SiteSettings = {
  companyName: 'Clair Electronics Limited',
  headerTagline: 'Since 2006 | Trusted Lighting Solutions',
  primaryEmail: 'admin@clairjg.com',
  secondaryEmail: null,
  phones: [
    { label: 'Main', number: '+91-11-49843647-9', tel: '+911149843647' },
    { label: 'Mobile', number: '+91-9315401501', tel: '+919315401501' },
  ],
  formRecipientEmail: 'crm@clair.online',
  address: {
    line1: 'Plot No. 58, sector 155',
    line2: null,
    city: 'Noida - 201310',
    postalCode: '201310',
    country: 'India',
  },
  businessHours: [
    'Monday - Friday: 9:00 AM - 6:00 PM IST',
    'Saturday: 10:00 AM - 2:00 PM IST',
    'Sunday: Closed',
  ],
  locations: [
    'Delhi', 'Chennai', 'Kolkata', 'Patna', 'Lucknow', 'Noida',
    'Ahmedabad', 'Bangalore', 'Ludhiana', 'Chandigarh', 'Dubai', 'London', 'Singapore',
  ],
};
