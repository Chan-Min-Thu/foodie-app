/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'msquarefdc.sgp1.digitaloceanspaces.com' || "media.istockphoto.com"
      },
    ],
  },
}

module.exports = nextConfig
