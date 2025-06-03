// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Cache JS/CSS/images and all pages
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/your-domain\.com\/_next\/.*/,
      handler: 'NetworkFirst',
      options: { cacheName: 'nextjs-pages' },
    },
    {
      urlPattern: /^https:\/\/your-domain\.com\/.*\.(png|jpg|jpeg|svg|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    {
      urlPattern: /.*/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'others' },
    },
  ],
})

module.exports = withPWA({
  // your existing Next.js config here
  reactStrictMode: true,
})
