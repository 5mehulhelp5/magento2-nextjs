/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  async rewrites() {
    const rewrites = [];
    
    if (process.env.GRAPHQL_URL) {
      rewrites.push({
        source: "/graphql",
        destination: process.env.GRAPHQL_URL,
      });
    }
    
    return rewrites;
  },
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL || "",
    FBPIXEL_TRACK_ID: process.env.FBPIXEL_TRACK_ID || "",
    ENABLE_FACEBOOK_TRACKING: process.env.ENABLE_FACEBOOK_TRACKING || "",
    PAYPAL_RETURN_URL: process.env.PAYPAL_RETURN_URL || "",
    PAYPAL_CANCEL_URL: process.env.PAYPAL_CANCEL_URL || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daisyui.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "wedocommerce.wedowebapps.com",
      },
    ],
  },
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "graphql-tag/loader",
        },
      ],
    });

    return config;
  },
  // Note: Turbopack doesn't support custom loaders for GraphQL files yet
  // Use webpack for dev mode: npm run dev -- --webpack
  // Or use Turbopack with raw-loader as a workaround
  turbopack: {},
};

const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

module.exports = withPWA(nextConfig);
