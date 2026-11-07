import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import contentService from '@/lib/content';
import { getMenu } from '@/lib/catalog';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';

import '@/styles/products.css';

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, productMenu] = await Promise.all([
    contentService.getSiteSettings(),
    getMenu().catch((error) => {
      console.error('Product menu could not be loaded:', error);
      return null;
    }),
  ]);

  return (
    <SiteSettingsProvider value={siteSettings}>
      <JsonLd data={[organizationJsonLd(siteSettings), websiteJsonLd()]} />
      <Header siteSettings={siteSettings} productMenu={productMenu} />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} productMenu={productMenu} />
    </SiteSettingsProvider>
  );
}
