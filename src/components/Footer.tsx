import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
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
              <a
                href="https://www.facebook.com/clair.electronics/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/clair.electronics/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/clairelectronics"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://in.pinterest.com/marketingclairelec/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@clair.officialindia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
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
