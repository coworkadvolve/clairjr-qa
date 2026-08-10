import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(
          S.document().schemaType('aboutPage').documentId('aboutPage'),
        ),
      S.divider(),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('catalogue').title('Catalogues'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('product').title('Products'),
    ]);
