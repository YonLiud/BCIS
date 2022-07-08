/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // allow yonchukku.dev to serve images
  images: {
    domains: ['yonchukku.dev', "www.yonchukku.dev", "vitalrp.co.uk"],
  }
}

module.exports = nextConfig
