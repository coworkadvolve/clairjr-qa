import { defineArrayMember, defineField, defineType } from 'sanity';

const DOC_TYPES = [
  { title: 'Light output test report (LM-79)', value: 'lm79' },
  { title: 'Colour quality test report (TM-30)', value: 'tm30' },
  { title: 'Photometric file (IES / LDT)', value: 'ies' },
  { title: 'LED lifetime test report (LM-80)', value: 'lm80' },
  { title: '3D model (Revit)', value: 'bim' },
];

const labelValue = defineArrayMember({
  type: 'object',
  name: 'labelValue',
  fields: [
    { name: 'label', type: 'string' },
    { name: 'value', type: 'string' },
  ],
  preview: { select: { title: 'label', subtitle: 'value' } },
});

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'specs', title: 'Specifications' },
    { name: 'media', title: 'Media' },
    { name: 'files', title: 'Downloads' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'main',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'main',
      description:
        'First entry is the primary category (used in the page address). A product may appear in several.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'productCategory' }] })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      group: 'main',
      description: 'Plain noun used in the one-line summary, e.g. "bollard", "inground uplight".',
    }),
    defineField({ name: 'features', type: 'array', group: 'main', of: [{ type: 'string' }] }),
    defineField({ name: 'finishes', type: 'array', group: 'main', of: [{ type: 'string' }] }),
    defineField({
      name: 'lightDistribution',
      type: 'array',
      group: 'main',
      of: [{ type: 'string' }],
      description: 'e.g. Direct, Direct-indirect, Indirect (uplight), Up and down',
    }),
    defineField({ name: 'colourTemperatures', type: 'array', group: 'main', of: [{ type: 'string' }] }),

    // Flat values: used for key figures, filters, search and structured data.
    defineField({
      name: 'specifications',
      type: 'object',
      group: 'specs',
      fields: [
        { name: 'power', title: 'Power', type: 'string' },
        { name: 'optionalPower', title: 'Optional power', type: 'string' },
        { name: 'efficacy', title: 'Efficacy (lm/W)', type: 'string' },
        { name: 'beamAngle', title: 'Beam angle', type: 'string' },
        { name: 'optic', title: 'Optic', type: 'string' },
        { name: 'distribution', title: 'Distribution', type: 'string' },
        { name: 'cri', title: 'Colour rendering', type: 'string' },
        { name: 'cct', title: 'Colour temperature', type: 'string' },
        { name: 'sdcm', title: 'Colour consistency', type: 'string' },
        { name: 'lifetime', title: 'Lifetime', type: 'string' },
        { name: 'inputVoltage', title: 'Input voltage', type: 'string' },
        { name: 'powerFactor', title: 'Power factor', type: 'string' },
        { name: 'thd', title: 'Total harmonic distortion', type: 'string' },
        { name: 'ugr', title: 'Glare rating', type: 'string' },
        { name: 'ip', title: 'Protection rating', type: 'string' },
        { name: 'ik', title: 'Impact rating', type: 'string' },
        { name: 'body', title: 'Body and finish', type: 'string' },
        { name: 'mounting', title: 'Mounting', type: 'string' },
        { name: 'dimensions', title: 'Dimensions', type: 'string' },
        { name: 'control', title: 'Control', type: 'string' },
        { name: 'application', title: 'Application', type: 'string' },
        { name: 'note', title: 'Note', type: 'string' },
      ],
    }),
    // Grouped and labelled exactly as the product page shows them.
    defineField({
      name: 'specificationGroups',
      title: 'Technical specifications (as shown on the page)',
      type: 'array',
      group: 'specs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'specGroup',
          fields: [
            { name: 'heading', type: 'string' },
            { name: 'rows', type: 'array', of: [labelValue] },
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
    }),
    defineField({
      name: 'iconStrip',
      title: 'Icon strip',
      type: 'array',
      group: 'specs',
      description: 'Input, protection, control, application, colour rendering.',
      of: [labelValue],
    }),
    defineField({
      name: 'versions',
      type: 'array',
      group: 'specs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'version',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'mounting', type: 'string' },
            { name: 'power', type: 'string' },
            { name: 'dimensions', type: 'string' },
            { name: 'efficacy', type: 'string' },
          ],
          preview: { select: { title: 'name', subtitle: 'power' } },
        }),
      ],
    }),
    defineField({
      name: 'moreVersionsInCatalogue',
      type: 'boolean',
      group: 'specs',
      initialValue: false,
    }),

    defineField({
      name: 'photos',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'dimensionDrawings', type: 'array', group: 'media', of: [{ type: 'image' }] }),
    defineField({
      name: 'cataloguePages',
      title: 'Catalogue pages (images)',
      type: 'array',
      group: 'media',
      description: 'Shown as thumbnails that open full screen.',
      of: [{ type: 'image' }],
    }),

    defineField({ name: 'catalogue', type: 'file', group: 'files', options: { accept: 'application/pdf' } }),
    defineField({
      name: 'datasheet',
      type: 'file',
      group: 'files',
      options: { accept: 'application/pdf' },
      description: 'Clair A4 datasheet. Regenerate and replace when the specifications change.',
    }),
    defineField({
      name: 'documents',
      type: 'array',
      group: 'files',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'productDocument',
          fields: [
            { name: 'type', type: 'string', options: { list: DOC_TYPES } },
            { name: 'label', type: 'string' },
            { name: 'file', type: 'file' },
          ],
          preview: { select: { title: 'label', subtitle: 'type' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'kind', media: 'photos.0' } },
});
