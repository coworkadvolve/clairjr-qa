import { defineArrayMember, defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(90) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required() }),
      ],
    }),
    defineField({ name: 'externalCoverImageUrl', title: 'External Cover Image URL', type: 'url' }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'Clair Lighting Team', validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Lighting Guides', 'Energy Efficiency', 'Design & Applications', 'Company News'] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } }),
    defineField({ name: 'featured', title: 'Feature on the homepage', type: 'boolean', initialValue: false }),
    defineField({
      name: 'body', title: 'Article Body', type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }, { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' }, { title: 'Quote', value: 'blockquote' },
          ],
          marks: { annotations: [defineArrayMember({ name: 'link', type: 'object', fields: [defineField({ name: 'href', title: 'URL', type: 'url' })] })] },
        }),
        defineArrayMember({
          type: 'image', options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', validation: (rule) => rule.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, validation: (rule) => rule.max(160) }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
  orderings: [{ title: 'Publish date, newest', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
