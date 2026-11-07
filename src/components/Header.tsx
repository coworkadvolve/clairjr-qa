'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './Button';
import { headerNavItems as navItems, pathnameToNavKey, routes } from '@/lib/routes';
import type { SiteSettings } from '@/lib/content-types';
import type { Menu as ProductMenu } from '@/lib/catalog';

interface HeaderProps {
  siteSettings: SiteSettings;
  productMenu?: ProductMenu | null;
}

type MenuCategory = ProductMenu['groups'][number]['categories'][number];

const groupTitle = (g: string) => (g === 'indoor' ? 'Indoor Lights' : 'Outdoor Lights');
const catHref = (g: string, slug: string) => `/products/${g}/${slug}`;

export function Header({ siteSettings, productMenu }: HeaderProps) {
  const primaryPhone = siteSettings.phones[0];
  const pathname = usePathname();
  const currentPage = pathnameToNavKey(pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const firstCategory = productMenu?.groups[0]?.categories[0];
  const [preview, setPreview] = useState<{ group: string; cat: MenuCategory } | null>(
    firstCategory ? { group: productMenu!.groups[0].group, cat: firstCategory } : null,
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMega = !!productMenu && productMenu.total > 0;

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setMegaOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const closeMegaSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [megaOpen]);

  useEffect(() => {
    setMegaOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="bg-brand-orange border-b border-brand-orange sticky top-0 z-50 shadow-sm">
        <div className="bg-neutral-800 text-white py-2">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-6">
                {primaryPhone && (
                  <a href={`tel:${primaryPhone.tel}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <Phone size={14} />
                    <span className="hidden md:inline">{primaryPhone.number}</span>
                  </a>
                )}
                <a href={`mailto:${siteSettings.primaryEmail}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                  <Mail size={14} />
                  <span className="hidden md:inline">{siteSettings.primaryEmail}</span>
                </a>
              </div>
              <div className="text-xs text-white/80">
                {siteSettings.headerTagline}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between h-20">
              <Link
                href={routes.home}
                onClick={handleNavClick}
                className="flex items-center gap-3 group"
              >
                <img
                  src="/logo/clair-white-png.png"
                  alt="Clair Lighting Solutions"
                  className="h-12 w-auto"
                />
              </Link>

              <nav className="hidden lg:flex items-center gap-8 self-stretch">
                {navItems.map((item) =>
                  item.value === 'products' && hasMega ? (
                    <div
                      key={item.value}
                      className="flex items-center self-stretch"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMegaSoon}
                    >
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="products-mega"
                        onClick={() => setMegaOpen((o) => !o)}
                        className={`font-medium transition-colors relative py-2 uppercase flex items-center gap-1 ${
                          currentPage === item.value || megaOpen ? 'text-white' : 'text-white/90 hover:text-white'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                        {(currentPage === item.value || megaOpen) && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <Link
                      key={item.value}
                      href={item.href}
                      onClick={handleNavClick}
                      className={`font-medium transition-colors relative py-2 uppercase ${
                        currentPage === item.value
                          ? 'text-white'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {currentPage === item.value && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                      )}
                    </Link>
                  ),
                )}
              </nav>

              <div className="hidden lg:flex items-center gap-4">
                <Link href={routes.contact} onClick={handleNavClick}>
                  <Button variant="primary" size="md">
                    Get a Quote
                  </Button>
                </Link>
              </div>

              <button
                className="lg:hidden p-2 text-white hover:text-white/80 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {hasMega && (
            <div className="cp-mega hidden lg:block" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
              <div id="products-mega" className={`mega${megaOpen ? ' open' : ''}`} role="region" aria-label="Products menu">
                <div className="wrap">
                  <div className="mega-grid">
                    {productMenu!.groups.map((g) => (
                      <div key={g.group}>
                        <h3>
                          <Link href={`/products/${g.group}`} onClick={handleNavClick}>
                            {groupTitle(g.group)}
                          </Link>
                        </h3>
                        <ul>
                          {g.categories.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={catHref(g.group, c.slug)}
                                onClick={handleNavClick}
                                onMouseEnter={() => setPreview({ group: g.group, cat: c })}
                                onFocus={() => setPreview({ group: g.group, cat: c })}
                                className={preview?.cat.slug === c.slug ? 'hot' : ''}
                              >
                                <span>{c.title}</span>
                                <span className="ct">{c.count}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {preview && (
                      <div className="preview">
                        <div className="art">
                          {preview.cat.preview ? (
                            <img
                              src={
                                preview.cat.preview.includes('cdn.sanity.io')
                                  ? `${preview.cat.preview}?w=320&fit=max&auto=format`
                                  : preview.cat.preview
                              }
                              alt=""
                            />
                          ) : null}
                        </div>
                        <h4>{preview.cat.title}</h4>
                        <p>{preview.cat.blurb}</p>
                        <Link className="go" href={catHref(preview.group, preview.cat.slug)} onClick={handleNavClick}>
                          View all {preview.cat.count} {preview.cat.count === 1 ? 'product' : 'products'}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-white z-40 border-t border-neutral-200 animate-fade-in overflow-y-auto">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navItems.map((item) =>
              item.value === 'products' && hasMega ? (
                <details key={item.value} className="group/p">
                  <summary
                    className={`list-none cursor-pointer flex items-center justify-between px-4 py-3 font-medium transition-colors border-l-4 uppercase [&::-webkit-details-marker]:hidden ${
                      currentPage === item.value
                        ? 'border-brand-orange text-brand-orange bg-orange-50'
                        : 'border-transparent text-neutral-700 hover:border-brand-orange hover:text-brand-orange'
                    }`}
                  >
                    {item.label}
                    <span className="text-brand-orange text-xl leading-none group-open/p:hidden">+</span>
                    <span className="text-brand-orange text-xl leading-none hidden group-open/p:inline">−</span>
                  </summary>
                  <div className="pl-4">
                    {productMenu!.groups.map((g) => (
                      <details key={g.group} className="group/g border-b border-neutral-100">
                        <summary className="list-none cursor-pointer flex items-center justify-between px-4 py-3 text-neutral-800 font-medium [&::-webkit-details-marker]:hidden">
                          {groupTitle(g.group)}
                          <span className="text-brand-orange text-xl leading-none group-open/g:hidden">+</span>
                          <span className="text-brand-orange text-xl leading-none hidden group-open/g:inline">−</span>
                        </summary>
                        <div className="pl-4 pb-2">
                          <Link
                            href={`/products/${g.group}`}
                            onClick={handleNavClick}
                            className="flex justify-between px-4 py-2.5 text-neutral-800 font-medium"
                          >
                            <span>All {groupTitle(g.group).toLowerCase()}</span>
                            <span className="text-neutral-400 text-sm">{g.total}</span>
                          </Link>
                          {g.categories.map((c) => (
                            <Link
                              key={c.slug}
                              href={catHref(g.group, c.slug)}
                              onClick={handleNavClick}
                              className="flex justify-between gap-4 px-4 py-2.5 text-neutral-600 hover:text-brand-orange"
                            >
                              <span>{c.title}</span>
                              <span className="text-neutral-400 text-sm">{c.count}</span>
                            </Link>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.value}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-left px-4 py-3 font-medium transition-colors border-l-4 uppercase ${
                    currentPage === item.value
                      ? 'border-brand-orange text-brand-orange bg-orange-50'
                      : 'border-transparent text-neutral-700 hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="px-4 pt-4">
              <Link href={routes.contact} onClick={handleNavClick} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
