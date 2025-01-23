/** @type {import('next').NextConfig} */

const path = require("path");
const withImages = require("next-images");

module.exports = withImages({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss")],
    prependData: '@import "main.scss";',
  },
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: "https",
        hostname: "devdemo04.manisland.com",
      }
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
  swcMinify: false
});
