import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external device / network access (e.g. Radmin VPN / local network IP) for Next.js dev server & HMR
  allowedDevOrigins: [
    "26.71.190.20",
    "26.71.190.20:3000",
    "localhost",
    "localhost:3000",
  ],
};

export default nextConfig;
