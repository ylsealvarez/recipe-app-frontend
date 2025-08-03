/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const path = require('path')

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
        destination: 'http://localhost:8080/api/recipes/:path*'
      },
      {
        source: '/api/users/:path*',
        destination: 'http://localhost:8080/api/users/:path*'
      },
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:8080/api/auth/:path*'
      }
    ]
  }
}

module.exports = withBundleAnalyzer(nextConfig)