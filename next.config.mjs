/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
/*import withBundleAnalyzer from '@next/bundle-analyzer';
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})*/

const onVercel = process.env.ON_VERCEL === "true"

const remotePatterns = [
  {
    protocol: 'https',
    hostname: '**.cloudinary.com',
  },
  {
    protocol: 'https',
    hostname: '**.googleusercontent.com',
  },
  {
    protocol: 'https',
    hostname: '**.gstatic.com',
  },
  {
    protocol: 'https',
    hostname: '**.googleapis.com',
  },
]

let nextConfig = {}

if (onVercel) {
  nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: remotePatterns,
      deviceSizes: [320, 420, 768, 960],
    }
    //productionBrowserSourceMaps: true

  }
} else {
  nextConfig = {
    reactStrictMode: true,
    //productionBrowserSourceMaps: true,
    compress: true,
    output: 'export',
    images: {
      remotePatterns: remotePatterns,
      loader: 'custom',
      loaderFile: './cloudinary-image-loader.ts',
      deviceSizes: [320, 420, 768, 960],
    }
  }
}


export default withPlaiceholder(nextConfig);
//export default bundleAnalyzer(withPlaiceholder(nextConfig));
