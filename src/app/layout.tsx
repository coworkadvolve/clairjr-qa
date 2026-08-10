import type { Metadata, Viewport } from 'next';
import { Barlow } from 'next/font/google';

import { defaultMetadata } from '@/lib/seo/metadata';

import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: '/logo/favicon-orange.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={barlow.variable}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
