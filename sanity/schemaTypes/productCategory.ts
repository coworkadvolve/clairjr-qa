import { defineField, defineType } from 'sanity';

// One document per product category (34: 15 indoor, 19 outdoor).
export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'group',
      type: 'string',
      options: {
        list: [
          { title: 'Indoor Lights', value: 'indoor' },
          { title: 'Outdoor Lights', value: 'outdoor' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'icon',
      type: 'string',
      description: 'Key of the line icon used in the mega menu.',
    }),
    defineField({ name: 'order', type: 'number', description: 'Sort order inside its group.' }),
  ],
  orderings: [
    {
      title: 'Menu order',
      name: 'menuOrder',
      by: [
        { field: 'group', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: { select: { title: 'title', subtitle: 'group' } },
});
