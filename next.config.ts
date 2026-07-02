import type { NextConfig } from "next"; 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**', // This safely allows TMDB's image paths
      },
    ],
  },
};

export default nextConfig;