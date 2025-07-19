/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig= {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')],
    prependData: `@use "main" as *`,
  }
}

module.exports = nextConfig