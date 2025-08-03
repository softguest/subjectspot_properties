/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
            domains: ['res.cloudinary.com'], // ← this is required for Cloudinary-hosted images
        },
}

module.exports = nextConfig
