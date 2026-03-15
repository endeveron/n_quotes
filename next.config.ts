import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/hls-proxy/:path*',
  //       destination: `${process.env.ASSETS_URL}/:path*`,
  //     },
  //   ];
  // },
  images: {
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
