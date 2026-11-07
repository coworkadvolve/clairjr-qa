import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Band } from '@/components/products/Band';
import { CatalogueViewer } from '@/components/products/CatalogueViewer';
import { DistributionIcon, StripIcon } from '@/components/products/icons';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductGallery } from '@/components/products/ProductGallery';
import { QuoteButton } from '@/components/products/QuoteButton';
import { categoryPath, getCatalog, getProduct, groupLabel, groupPath, productPath } from '@/lib/catalog';
import {
  cctChips,
  DOC_GROUPS,
  downloadUrl,
  fileTag,
  FINISH_COLOURS,
  fmtSize,
  keyFigures,
  kelvinColour,
  lede,
} from '@/lib/catalog/format';
import { breadcrumbJsonLd, JsonLd } from '@/lib/seo/jsonld';
import { siteConfig } from '@/lib/seo/metadata';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { products } = await getCatalog();
  // A static export needs at least one path; an empty catalogue renders a 404 instead of failing the build.
  if (!products.length) return [{ group: 'indoor', category: 'none', product: 'none' }];
  return products.map((p) => ({ group: p.primary.group, category: p.primary.slug, product: p.slug }));
}

type Props = { params: Promise<{ group: string; category: string; product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  const s = p.specifications;
  const figures = [s.power, s.efficacy && `${s.efficacy} lm/W`, s.ip, s.cri && `CRI ${s.cri.replace(/ or above/, '+')}`]
    .filter(Boolean)
    .join(', ');
  const description = `${p.name}: ${lede(p)}${figures ? ` ${figures}.` : ''} Datasheet, specifications and downloads from Clair Lighting.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: productPath(p) },
    openGraph: {
      title: `${p.name} | Clair Lighting`,
      description,
      images: p.photos[0] ? [{ url: `${p.photos[0].url}?w=1200&h=630&fit=fill&bg=ffffff` }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { product: slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const { categories, products } = await getCatalog();
  const cat = categories.find((c) => c.slug === p.primary.slug);
  const s = p.specifications;
  const keys = keyFigures(s);
  const cc = cctChips(s);
  const also = p.allCategories.filter((c) => c.slug !== p.primary.slug);

  // "More products from the same category", rotated so neighbours come first.
  const siblings = products.filter((q) => q.categories.includes(p.primary.slug));
  const i0 = siblings.findIndex((q) => q.slug === p.slug);
  const rel = siblings.filter((q) => q.slug !== p.slug);
  const start = Math.max(0, i0 - 1);
  const more = rel.slice(start).concat(rel.slice(0, start)).slice(0, 4);

  const docGroups = DOC_GROUPS.map(([type, heading]) => [heading, p.documents.filter((d) => d.type === type)] as const).filter(
    ([, list]) => list.length,
  );
  const hasDownloads = p.datasheet || p.catalogue || docGroups.length;
  const url = `${siteConfig.url}${productPath(p)}`;

  return (
    <div className="cp">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.name,
            description: lede(p),
            url,
            image: p.photos.slice(0, 3).map((x) => `${x.url}?w=1200&auto=format`),
            category: p.primary.title,
            brand: { '@type': 'Brand', name: 'Clair' },
            manufacturer: { '@type': 'Organization', name: 'Clair Electronics Limited' },
            additionalProperty: [
              ['Power', s.power],
              ['Efficacy', s.efficacy && `${s.efficacy} lm/W`],
              ['Colour temperature', s.cct],
              ['Colour rendering', s.cri],
              ['Ingress protection', s.ip],
              ['Beam angle', s.beamAngle],
            ]
              .filter(([, v]) => v)
              .map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
          },
          breadcrumbJsonLd([
            { name: 'Home', url: siteConfig.url },
            { name: 'Products', url: `${siteConfig.url}/products` },
            { name: groupLabel(p.primary.group), url: `${siteConfig.url}${groupPath(p.primary.group)}` },
            { name: p.primary.title, url: `${siteConfig.url}${categoryPath(p.primary)}` },
            { name: p.name, url },
          ]),
        ]}
      />
      <Band
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: p.primary.title, href: categoryPath(p.primary) },
          { label: p.name },
        ]}
      />
      <div className="shell">
        <div className="wrap">
          {/* 1-4: gallery, summary, key figures, options, buttons */}
          <section className="pd">
            <ProductGallery photos={p.photos} name={p.name} />
            <div>
              <Link className="tag" href={categoryPath(p.primary)} style={{ textDecoration: 'none' }}>
                {p.primary.title}
              </Link>{' '}
              {also.map((c) => (
                <Link key={c.slug} className="tag" href={categoryPath(c)}>
                  {c.title}
                </Link>
              ))}
              <h1>{p.name}</h1>
              <p className="lede">{lede(p, cat?.description)}</p>
              <div className="keys">
                {keys.map(([value, label]) => (
                  <div key={label}>
                    <b>{value}</b>
                    <small>{label}</small>
                  </div>
                ))}
              </div>

              {p.finishes.length > 0 && (
                <div className="opt-row">
                  <span className="opt-h">Finishes</span>
                  <div className="fins">
                    {p.finishes.map((f) => (
                      <span key={f} className="fin">
                        <i style={{ background: FINISH_COLOURS[f] || '#fff' }} />
                        {f}
                      </span>
                    ))}
                    <span className="fin-note">Custom RAL on request</span>
                  </div>
                </div>
              )}
              {p.lightDistribution.length > 0 && (
                <div className="opt-row">
                  <span className="opt-h">Light distribution</span>
                  <div className="dists">
                    {p.lightDistribution.map((d) => (
                      <figure key={d}>
                        <DistributionIcon kind={d} />
                        <figcaption>{d}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
              {cc && (
                <div className="opt-row">
                  <span className="opt-h">{cc.rgb ? 'Colour' : 'Colour temperature'}</span>
                  <div className="ccts">
                    {cc.rgb ? (
                      <span className="cct tw">{cc.text}</span>
                    ) : (
                      <>
                        {cc.kelvins.map((k) => (
                          <span key={k} className="cct" style={{ ['--k' as string]: kelvinColour(k) }}>
                            {k}
                          </span>
                        ))}
                        {cc.tunable && <span className="cct tw">{cc.tunable}</span>}
                        {cc.extra.map((e) => (
                          <span key={e} className="cct tw">
                            {e}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="btns" style={{ marginTop: 20 }}>
                <QuoteButton productName={p.name} className="btn" label="Get a Quote" />
                {p.datasheet ? (
                  <a className="btn alt" href={downloadUrl(p.datasheet)}>
                    Download datasheet
                  </a>
                ) : (
                  <a className="btn alt" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Datasheet request: ${p.name}`)}`}>
                    Request datasheet
                  </a>
                )}
                {p.catalogue && (
                  <a className="btn alt" href={downloadUrl(p.catalogue)}>
                    Download catalogue
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* 5: icon strip */}
          {p.iconStrip.length > 0 && (
            <section className="specs icons-wrap">
              <div className="icons">
                {p.iconStrip.map((x) => (
                  <div key={x.label} className="ico">
                    <StripIcon label={x.label} />
                    <b>{x.value}</b>
                    <small>{x.label}</small>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6: description */}
          {p.features.length > 0 && (
            <section className="specs">
              <h2>Description</h2>
              <ul className="feat cols">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
                <li>Custom sizes, power and RAL finishes on request</li>
              </ul>
            </section>
          )}

          {/* 7: dimensions */}
          {p.dimensionDrawings.length > 0 && (
            <section className="specs" id="dgsec">
              <h2>Dimensions</h2>
              <div id="dgs">
                {p.dimensionDrawings.map((d, i) => (
                  <div key={i} className="diagram">
                    <img src={`${d.url}${d.url.includes('cdn.sanity.io') ? '?w=1400&fit=max&auto=format' : ''}`} alt={`Dimension drawing of ${p.name}`} loading="lazy" />
                  </div>
                ))}
              </div>
              <p className="note">All dimensions in millimetres.</p>
            </section>
          )}

          {/* 8: versions */}
          {p.versions.length > 1 && (
            <section className="specs">
              <h2>Versions</h2>
              <div className="vt-wrap">
                <table className="vt">
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Mounting</th>
                      <th>Power</th>
                      {p.versions.some((v) => v.dimensions) && <th>Size</th>}
                      {p.versions.some((v) => v.efficacy) && <th>Efficacy (lm/W)</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {p.versions.map((v, i) => (
                      <tr key={i}>
                        <td>{v.name || 'Standard'}</td>
                        <td>{v.mounting}</td>
                        <td>{v.power}</td>
                        {p.versions.some((x) => x.dimensions) && <td>{v.dimensions}</td>}
                        {p.versions.some((x) => x.efficacy) && <td>{v.efficacy}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {p.moreVersionsInCatalogue && <p className="note">Further sizes and powers are listed in the catalogue.</p>}
            </section>
          )}

          {/* 9: technical specifications */}
          {p.specificationGroups.length > 0 && (
            <section className="specs">
              <h2>Technical specifications</h2>
              <div className="specs-grid">
                {p.specificationGroups.map((g) => (
                  <div key={g.heading}>
                    <h3>{g.heading}</h3>
                    <dl>
                      {(g.rows || []).map((r) => (
                        <div key={r.label}>
                          <dt>{r.label}</dt>
                          <dd>{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <p className="note">
                {p.primary.slug === 'linear-lights' ? 'Values are for the standard 1200 mm version unless stated. ' : ''}
                Sizes, power and finishes can be customised.
              </p>
            </section>
          )}

          {/* 10: catalogue pages */}
          {p.cataloguePages.length > 0 && (
            <section className="specs" id="catsec">
              <div className="sec-h">
                <h2>Catalogue</h2>
                <span>{p.cataloguePages.length} pages</span>
              </div>
              <CatalogueViewer pages={p.cataloguePages} />
            </section>
          )}

          {/* 11: downloads */}
          {hasDownloads ? (
            <section className="specs">
              <h2>Downloads</h2>
              {(p.datasheet || p.catalogue) && (
                <div className="dl-grp">
                  <h3>Product documents</h3>
                  {p.datasheet && (
                    <div className="dl-row">
                      <span className="dl-ic">PDF</span>
                      <span className="dl-t">
                        Technical datasheet<small>{fmtSize(p.datasheet.bytes)}</small>
                      </span>
                      <a className="dl-b" href={downloadUrl(p.datasheet)}>
                        Download
                      </a>
                    </div>
                  )}
                  {p.catalogue && (
                    <div className="dl-row">
                      <span className="dl-ic">PDF</span>
                      <span className="dl-t">
                        Product catalogue
                        <small>
                          {p.cataloguePages.length ? `${p.cataloguePages.length} pages · ` : ''}
                          {fmtSize(p.catalogue.bytes)}
                        </small>
                      </span>
                      <a className="dl-b" href={downloadUrl(p.catalogue)}>
                        Download
                      </a>
                    </div>
                  )}
                </div>
              )}
              {docGroups.map(([heading, list]) => (
                <div key={heading} className="dl-grp">
                  <h3>{heading}</h3>
                  {list.map((d, i) => (
                    <div key={i} className="dl-row">
                      <span className="dl-ic">{fileTag(d.file)}</span>
                      <span className="dl-t">
                        {d.label}
                        <small>{fmtSize(d.file?.bytes)}</small>
                      </span>
                      <a className="dl-b" href={downloadUrl(d.file)}>
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ) : null}

          {/* 12: more from the category */}
          {more.length > 0 && (
            <section className="rel">
              <h2>More {p.primary.title.toLowerCase()}</h2>
              <div className="grid">
                {more.map((q) => (
                  <ProductCard key={q.slug} product={q} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
