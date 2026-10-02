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
  tortekEyebrow: string;
  tortekTitle: string;
  tortekParagraphs: string[];
  tortekImage: string;
  tortekCtaLabel: string;
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
  ecosystemTitle: string;
  ecosystemText: string;
  ecosystemImage: string;
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
      image: '/about/led-lighting.webp',
    },
    {
      icon: 'sun',
      title: 'Solar Solutions',
      description:
        'Cleaner energy solutions for homes, commercial facilities, industries and infrastructure projects.',
      image: '/about/solar-solutions.webp',
    },
    {
      icon: 'cable',
      title: 'Tortek by Clair',
      description:
        'Wires and cables that support safe, reliable connections across powered environments.',
      image: '/about/tortek-wires-and-cables.webp',
    },
  ],
  tortekEyebrow: 'Wires & Cables',
  tortekTitle: 'Tortek by Clair — Wires & Cables',
  tortekParagraphs: [
    'With Tortek by Clair, Clair enters the wires and cables segment and strengthens its ability to serve the complete electrical needs of modern spaces.',
    'Wires and cables are the connections behind every powered environment. They may remain unseen after installation, but their role is essential to safety, reliability and long-term performance.',
    'Tortek by Clair brings wires and cables into Clair’s growing portfolio, helping the brand support homes, commercial spaces, industries, infrastructure projects and channel partners with greater depth.',
    'From wires and solar to LEDs, Clair is building solutions for every part of how modern spaces are powered.',
  ],
  tortekImage: '/about/tortek-wires-and-cables.webp',
  tortekCtaLabel: 'Enquire About Tortek',
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
      name: 'Doulat Jain',
      role: 'Chairman',
      image: '/about/leaders/daulat-jain.png',
      description: `Doulat Jain brings a story of perseverance, enterprise and self-made growth to the J.G. Group.

His journey has been shaped by simplicity, humility and a strong determination to build independently. In 1984, he made a decisive shift towards self-sufficiency, entering government tenders for paper and stainless steel products and developing his business with limited initial resources.

Through practical thinking, resilience and a strong understanding of opportunity, Doulat Jain gradually expanded his work into paper import-export and later diversified across multiple sectors. His efforts contributed to the wider growth of the J.G. Group, with business presence across Chennai, Delhi, Dubai, Hong Kong and Nigeria.

At J.G. Group, Doulat Jain represents discipline, courage and practical entrepreneurship. His journey reflects the belief that businesses are not built only through capital, but through persistence, sharp decision-making and the ability to keep moving forward through constraints.

Beyond business, he has remained committed to community development, education and holistic health. His support for initiatives such as the Prajna Institute of Yoga and Allied Sciences reflects his belief in creating value beyond enterprise.`,
    },
    {
      name: 'Mahesh Jain',
      role: 'MD',
      image: '/about/leaders/mahesh-jain.png',
      description: `Mahesh Jain brings decades of business experience, ethical leadership and long-term vision to Clair.

Born into a family of entrepreneurs with a legacy of more than a century, he has played an important role in the growth and diversification of the J.G. Group. Since taking charge of the family’s business operations in Delhi in 1985, he has helped expand the group across finance, investments, hospitality, real estate, electrical and electronics.

His leadership has also contributed to the group’s global presence, including business expansion into Nigeria, Hong Kong and Dubai.

At Clair, Mahesh Jain brings discipline, trust and continuity. His approach is rooted in building businesses that customers, partners, dealers and project teams can rely on.

Beyond business, he has actively supported education, community development, holistic health and social responsibility through initiatives connected with JITO and the Prajna Institute of Yoga and Allied Sciences.`,
    },
    {
      name: 'Tanush Jain',
      role: 'Director',
      image: '/about/leaders/tanush-jain.png',
      description: `Tanush Jain represents the next generation of leadership at Clair and the J.G. Group.

With an academic background in Economics, Applied Analytics and Business Finance from the University of Southern California, he brings a modern, data-led and strategic perspective to the business.

As Director at Clair, Tanush works across strategy, operations, product expansion and market growth. His role is central to Clair’s next phase as the brand grows from LED lighting into a wider electrical solutions ecosystem.

His approach combines global exposure with a practical understanding of Indian manufacturing, distribution, project requirements and customer expectations.

Together, Mahesh Jain and Tanush Jain bring two important strengths to Clair: the stability of legacy and the ambition to build for the future.`,
    },
    {
      name: 'Avinash Goel',
      role: 'CEO',
      image: '/about/leaders/avinash-goel.jpg',
      description:
        "Avinash Goel brings deep expertise in lighting, product development, manufacturing and business operations to Clair.\n\nAt Clair, he leads the business with a strong understanding of how lighting products are developed, manufactured, positioned and brought to market. His experience across product strategy, quality, sourcing, supply chain, channel management and project execution allows Clair to approach the business from both a technical and commercial perspective.\n\nHe works closely across product development and operations, ensuring that Clair’s solutions are built around real market requirements, consistent quality and practical application. His understanding of customers, projects and evolving lighting needs also helps Clair develop products that are relevant, reliable and ready for the demands of the market.\n\nFor Clair, this translates into stronger products, sharper execution and a deeper understanding of what customers and partners need. Avinash’s leadership adds technical depth and operational discipline to the way Clair continues to grow.",
    },
  ],
  leadersNote: '',
  ecosystemTitle: 'Clair. Your Complete Electrical Ecosystem.',
  ecosystemText:
    'From LED lighting and solar solutions to wires and cables through Tortek by Clair, we are building an electrical solutions brand for the spaces India lives, works and grows in.',
  ecosystemImage: '/about/electrical-ecosystem.webp',
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
