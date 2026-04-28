import WithPWA from "@ducanh2912/next-pwa";

const withPWA = WithPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

/**
 * @type {import('next').NextConfig}
 */
const config = withPWA({
  reactStrictMode: true,
  turbopack: {},
});

export default config;
