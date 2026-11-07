const IMAGE = `{"url": asset->url, "lqip": asset->metadata.lqip, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}`;
const FILE = `{"url": asset->url, "bytes": asset->size, "filename": asset->originalFilename, "ext": asset->extension}`;

export const CATEGORIES_QUERY = `*[_type == "productCategory" && defined(slug.current)] | order(group asc, order asc) {
  "slug": slug.current, title, group, description, icon, "order": coalesce(order, 0)
}`;

export const SUMMARIES_QUERY = `*[_type == "product" && defined(slug.current) && count(categories) > 0] | order(name asc) {
  "slug": slug.current, name, kind,
  "categories": categories[]->slug.current,
  "primary": categories[0]->{"slug": slug.current, title, group},
  "photo": photos[0]${IMAGE},
  "mounting": specifications.mounting,
  "optic": specifications.optic,
  "power": specifications.power
}`;

export const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  "slug": slug.current, name, kind,
  "categories": categories[]->slug.current,
  "primary": categories[0]->{"slug": slug.current, title, group},
  "allCategories": categories[]->{"slug": slug.current, title, group},
  "photo": photos[0]${IMAGE},
  "mounting": specifications.mounting,
  "optic": specifications.optic,
  "power": specifications.power,
  features, specifications, specificationGroups, iconStrip, versions, moreVersionsInCatalogue,
  finishes, lightDistribution, colourTemperatures,
  "photos": photos[]${IMAGE},
  "dimensionDrawings": dimensionDrawings[]${IMAGE},
  "cataloguePages": cataloguePages[]${IMAGE},
  "catalogue": catalogue${FILE},
  "datasheet": datasheet${FILE},
  "documents": documents[]{type, label, "file": file${FILE}}
}`;
