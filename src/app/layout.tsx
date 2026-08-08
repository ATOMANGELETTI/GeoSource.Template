import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppProviders from "@/providers/AppProviders";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "GeoSource Template",
  description: "GeoSource Tauri Template Desktop Application",
};

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Root Next.js app layout.
 * Sets HTML attributes, loads global styles, and wraps with providers.
 * The `dark` class enables Tailwind dark mode.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Prevent context menu in production (Tauri desktop convention) */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
