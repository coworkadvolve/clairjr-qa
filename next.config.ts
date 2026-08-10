import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['next-sanity'],
  experimental: {
    optimizePackageImports: ['sanity', '@sanity/vision', 'lucide-react'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
