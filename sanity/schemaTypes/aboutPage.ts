import { defineField, defineType } from 'sanity';

const iconOptions = [
  { title: 'Innovation (Zap)', value: 'zap' },
  { title: 'Excellence (Award)', value: 'award' },
  { title: 'Sustainability (Heart)', value: 'heart' },
  { title: 'Mission (Target)', value: 'target' },
  { title: 'Vision (Eye)', value: 'eye' },
  { title: 'Global (Globe)', value: 'globe' },
  { title: 'Quality (Shield check)', value: 'shieldCheck' },
  { title: 'Lighting (Lightbulb)', value: 'lightbulb' },
  { title: 'Eco (Leaf)', value: 'leaf' },
  { title: 'Performance (Trending up)', value: 'trendingUp' },
  { title: 'Cable', value: 'cable' },
  { title: 'Solar (Sun)', value: 'sun' },
];

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      initialValue: 'Since 2006',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'storyTitle',
      title: 'Our story heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Our story paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'storyImage',
      title: 'Our story image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'externalStoryImageUrl',
      title: 'Or external story image URL',
      type: 'url',
    }),
    defineField({
      name: 'storyBadgeTitle',
      title: 'Story badge title',
      type: 'string',
      initialValue: 'ISO',
    }),
    defineField({
      name: 'storyBadgeText',
      title: 'Story badge text',
      type: 'string',
      initialValue: 'Quality Certified',
    }),
    defineField({
      name: 'solutionsTitle',
      title: 'Solutions section title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solutionsSubtitle',
      title: 'Solutions section subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: iconOptions },
              initialValue: 'lightbulb',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'externalImageUrl',
              title: 'Or external image URL',
              type: 'url',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'missionVisionTitle',
      title: 'Mission & vision section title',
      type: 'string',
    }),
    defineField({
      name: 'missionVisionSubtitle',
      title: 'Mission & vision section subtitle',
      type: 'string',
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionText',
      title: 'Mission text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vision title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visionText',
      title: 'Vision text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Core values section title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'valuesSubtitle',
      title: 'Core values section subtitle',
      type: 'string',
    }),
    defineField({
      name: 'values',
      title: 'Core values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: iconOptions },
              initialValue: 'award',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'leadersTitle',
      title: 'People section title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadersText',
      title: 'People section text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'leaders',
      title: 'People behind Clair',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'externalPhotoUrl',
              title: 'Or external photo URL',
              type: 'url',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'photo' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'leadersNote',
      title: 'People photo note',
      type: 'string',
    }),
    defineField({
      name: 'certificationsTitle',
      title: 'Certifications section title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'certificationsSubtitle',
      title: 'Certifications section subtitle',
      type: 'string',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Call-to-action title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Call-to-action text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary button label',
      type: 'string',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Secondary button label',
      type: 'string',
      initialValue: 'View All Products',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});
