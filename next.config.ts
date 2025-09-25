import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  images: {
    remotePatterns: [
      new URL('https://assets.science.nasa.gov/**')
    ]
  }
}

export default nextConfig
