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

export type AboutPageIcon = 'zap' | 'award' | 'heart' | 'target' | 'eye' | 'globe';

export interface AboutPageValue {
  icon: AboutPageIcon;
  title: string;
  description: string;
}

export interface AboutPageContent {
  pageTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyImage: string;
  missionVisionTitle: string;
  missionVisionSubtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  valuesTitle: string;
  valuesSubtitle: string;
  values: AboutPageValue[];
  certificationsTitle: string;
  certificationsSubtitle: string;
  certifications: string[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
}

export const defaultAboutPage: AboutPageContent = {
  pageTitle: 'About Clair',
  heroSubtitle:
    'Pioneering intelligent lighting solutions since 2006, illuminating spaces with innovation and sustainability.',
  storyTitle: 'Our Story',
  storyParagraphs: [
    'Founded in 2006, Clair Lighting Solutions emerged from a vision to transform the lighting industry through eco-friendly and intelligent illumination systems. What began as a small enterprise has evolved into a trusted partner for over 500 corporate clients across diverse industries.',
    'Our journey has been marked by continuous innovation, unwavering commitment to quality, and a dedication to sustainable practices. Today, we stand as industry leaders, having completed over 50,000 installations that combine cutting-edge technology with energy efficiency.',
    "With ISO 9001 certification and a team of expert engineers, we continue to push the boundaries of what's possible in lighting design, delivering solutions that enhance productivity, reduce energy consumption, and create inspiring environments.",
  ],
  storyImage: '',
  missionVisionTitle: 'Mission & Vision',
  missionVisionSubtitle: 'Guided by our core values and commitment to excellence',
  missionTitle: 'Our Mission',
  missionText:
    'To deliver world-class, energy-efficient lighting solutions that enhance productivity, reduce environmental impact, and create inspiring spaces for businesses and communities worldwide.',
  visionTitle: 'Our Vision',
  visionText:
    'To be the global leader in sustainable lighting innovation, setting new standards for quality, efficiency, and intelligent design in commercial and industrial illumination.',
  valuesTitle: 'Core Values',
  valuesSubtitle: 'The principles that drive everything we do',
  values: [
    {
      icon: 'zap',
      title: 'Innovation',
      description: 'Continuously advancing lighting technology through research and development',
    },
    {
      icon: 'award',
      title: 'Excellence',
      description: 'Maintaining the highest standards in product quality and customer service',
    },
    {
      icon: 'heart',
      title: 'Sustainability',
      description: 'Committed to eco-friendly solutions that protect our planet',
    },
  ],
  certificationsTitle: 'Certifications & Standards',
  certificationsSubtitle: 'Recognized for quality and compliance',
  certifications: ['ISO 9001:2015', 'CE Certified', 'RoHS Compliant', 'Energy Star'],
  ctaTitle: 'Join Our Journey',
  ctaText:
    'Partner with us to transform your lighting infrastructure with cutting-edge, sustainable solutions.',
  ctaPrimaryLabel: 'Get Started',
  ctaSecondaryLabel: 'View All Products',
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
