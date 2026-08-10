import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import { footerQuickLinks, routes } from '@/lib/routes';
import type { SiteSettings } from '@/lib/content-types';

interface FooterProps {
  siteSettings: SiteSettings;
}

export function Footer({ siteSettings }: FooterProps) {
  const { address } = siteSettings;

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <img
              src="/logo/clair-white-png.png"
              alt="Clair Lighting Solutions"
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-sm mb-6 leading-relaxed">
              Leading provider of eco-friendly and intelligent lighting solutions since 2006.
              Illuminating spaces with innovation and sustainability.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-orange transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-orange transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-brand-orange transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerQuickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-brand-orange transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={routes.products} className="text-white hover:text-brand-orange transition-colors">
                  Commercial Lighting
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-white hover:text-brand-orange transition-colors">
                  Industrial Lighting
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-white hover:text-brand-orange transition-colors">
                  Office Lighting
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-white hover:text-brand-orange transition-colors">
                  General Lighting
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-white hover:text-brand-orange transition-colors">
                  Decorative Lighting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-brand-orange" />
                <span>
                  {address.line1}
                  {address.line2 ? <>, {address.line2}</> : null}
                  <br />
                  {address.city}, {address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-brand-orange" />
                <div className="space-y-1">
                  {siteSettings.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="block hover:text-brand-orange transition-colors"
                    >
                      {phone.number}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-brand-orange" />
                <a href={`mailto:${siteSettings.primaryEmail}`} className="hover:text-brand-orange transition-colors">
                  {siteSettings.primaryEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Our Locations</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {siteSettings.locations.map((location) => (
                <div key={location} className="flex items-center gap-2">
                  <MapPin size={14} className="text-brand-orange flex-shrink-0" />
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href={routes.privacyPolicy} className="text-neutral-300 hover:text-brand-orange transition-colors">
                Privacy Policy
              </Link>
              <Link href={routes.termsOfService} className="text-neutral-300 hover:text-brand-orange transition-colors">
                Terms of Service
              </Link>
              <Link href={routes.cookiePolicy} className="text-neutral-300 hover:text-brand-orange transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
