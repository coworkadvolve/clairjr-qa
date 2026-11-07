import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const productsByGroup = (S: StructureBuilder, group: 'indoor' | 'outdoor', title: string) =>
  S.listItem()
    .title(title)
    .id(`products-${group}`)
    .child(
      S.documentTypeList('productCategory')
        .title(`${title}: categories`)
        .filter('_type == "productCategory" && group == $group')
        .params({ group })
        .defaultOrdering([{ field: 'order', direction: 'asc' }])
        .child((categoryId) =>
          S.documentList()
            .title('Products')
            .schemaType('product')
            .filter('_type == "product" && $categoryId in categories[]._ref')
            .params({ categoryId })
            .defaultOrdering([{ field: 'name', direction: 'asc' }]),
        ),
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.divider(),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('catalogue').title('Catalogues'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.divider(),
      productsByGroup(S, 'indoor', 'Indoor Lights'),
      productsByGroup(S, 'outdoor', 'Outdoor Lights'),
      S.documentTypeListItem('product').title('All products'),
      S.documentTypeListItem('productCategory').title('All product categories'),
    ]);
