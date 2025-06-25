import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // your other config options
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  // other PWA options
};

export default withPWA(pwaConfig)(nextConfig);