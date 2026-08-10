export const routes = {
  home: '/',
  products: '/products',
  catalogue: '/catalogue',
  about: '/about',
  services: '/services',
  franchise: '/franchise',
  contact: '/contact',
  blog: '/blog',
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-of-service',
  cookiePolicy: '/cookie-policy',
  product: (slug: string) => `/products/${slug}`,
  blogPost: (slug: string) => `/blog/${slug}`,
} as const;

export function pathnameToNavKey(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/products')) return 'products';
  if (pathname.startsWith('/catalogue')) return 'catalogue';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/franchise')) return 'franchise';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/blog')) return 'blog';
  return 'home';
}

export const navItems = [
  { label: 'Home', href: routes.home, value: 'home' },
  { label: 'Products', href: routes.products, value: 'products' },
  { label: 'Catalogue', href: routes.catalogue, value: 'catalogue' },
  { label: 'About', href: routes.about, value: 'about' },
  { label: 'Services', href: routes.services, value: 'services' },
  { label: 'Blog', href: routes.blog, value: 'blog' },
  { label: 'Franchise', href: routes.franchise, value: 'franchise' },
  { label: 'Contact', href: routes.contact, value: 'contact' },
] as const;

export const footerQuickLinks = [
  { label: 'Home', href: routes.home },
  { label: 'Products', href: routes.products },
  { label: 'Catalogue', href: routes.catalogue },
  { label: 'About', href: routes.about },
  { label: 'Services', href: routes.services },
  { label: 'Blog', href: routes.blog },
  { label: 'Franchise', href: routes.franchise },
  { label: 'Contact', href: routes.contact },
] as const;
