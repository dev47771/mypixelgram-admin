import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'avavatar.ru',
            pathname: '/**',
         },
      ],
   },
}

export default nextConfig
