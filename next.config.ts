/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const path = require('path')

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')],
    prependData: `@use "variables" as *`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.allrecipes.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/recipes/:path*',
        destination: `${API_BASE}/api/recipes/:path*`
      },
      {
        source: '/api/users/:path*',
        destination: `${API_BASE}/api/users/:path*`
      },
      {
        source: '/api/auth/:path*',
        destination: `${API_BASE}/api/auth/:path*`
      }
    ]
  }
}

module.exports = withBundleAnalyzer(nextConfig)