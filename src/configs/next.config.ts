import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Tauri — outputs to `dist/` which Tauri serves
  output: "export",
  distDir: "dist",
  trailingSlash: true,
  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint during builds
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
