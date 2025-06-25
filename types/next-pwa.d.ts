declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    // Add other PWA options as needed
  }

  function withPWA(options?: PWAOptions): (nextConfig: NextConfig) => NextConfig;
  
  export default withPWA;
}