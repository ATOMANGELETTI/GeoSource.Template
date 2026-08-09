"use client";

import type { FC, ReactNode } from "react";

interface SplashScreenLayoutProps {
  children?: ReactNode;
}

/**
 * Splash screen layout — fully self-contained CSS for packaged Tauri builds.
 *
 * All critical Nord theme CSS custom properties, @font-face declarations,
 * reset rules, and animation keyframes are embedded as an inline <style> block.
 * This ensures the splashscreen renders correctly on first paint in production
 * packaged builds (NSIS/MSI) without depending on the async external CSS chunk
 * (_next/static/chunks/*.css) loading before WebView2 first paints the window.
 */
const SplashScreenLayout: FC<SplashScreenLayoutProps> = ({ children }) => {
  return (
    <>
      <style>{`
        /* ── Font Faces ────────────────────────────────────────────────── */
        @font-face {
          font-family: "Terminus";
          src: url("/fonts/Terminus/TerminessNerdFont-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: block;
        }
        @font-face {
          font-family: "Terminus";
          src: url("/fonts/Terminus/TerminessNerdFont-Bold.ttf") format("truetype");
          font-weight: 700;
          font-style: normal;
          font-display: block;
        }
        @font-face {
          font-family: "FiraCode";
          src: url("/fonts/FiraCode/FiraCodeNerdFont-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: block;
        }
        @font-face {
          font-family: "Ubuntu";
          src: url("/fonts/Ubuntu/UbuntuNerdFont-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: block;
        }

        /* ── Nord Theme Tokens ─────────────────────────────────────────── */
        :root,
        [data-theme="polar-night"] {
          --bg-app:            #2e3440;
          --bg-surface:        #3b4252;
          --bg-elevated:       #434c5e;
          --border-default:    #4c566a;
          --text-primary:      #eceff4;
          --text-secondary:    #d8dee9;
          --text-muted:        #4c566a;
          --accent-primary:    #88c0d0;
          --accent-secondary:  #81a1c1;
          --font-terminus:     "Terminus", "Consolas", monospace;
          --transition-fast:   100ms ease;
          --transition-default:150ms ease;
        }
        [data-theme="snow-storm"] {
          --bg-app:            #eceff4;
          --bg-surface:        #e5e9f0;
          --bg-elevated:       #d8dee9;
          --border-default:    #c5cbd5;
          --text-primary:      #2e3440;
          --text-secondary:    #3b4252;
          --text-muted:        #4c566a;
          --accent-primary:    #5e81ac;
          --accent-secondary:  #81a1c1;
        }
        [data-theme="frost"] {
          --bg-app:            #1e2631;
          --bg-surface:        #2b3848;
          --bg-elevated:       #36475b;
          --border-default:    #435870;
          --text-primary:      #e0f2f1;
          --text-secondary:    #8fbcbb;
          --text-muted:        #5e81ac;
          --accent-primary:    #88c0d0;
          --accent-secondary:  #8fbcbb;
        }
        [data-theme="aurora"] {
          --bg-app:            #2b2638;
          --bg-surface:        #373147;
          --bg-elevated:       #463e59;
          --border-default:    #5c5275;
          --text-primary:      #f3edfc;
          --text-secondary:    #d8dee9;
          --text-muted:        #b48ead;
          --accent-primary:    #b48ead;
          --accent-secondary:  #a3be8c;
        }

        /* ── Base Reset ────────────────────────────────────────────────── */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body {
          font-family: "Terminus", "Consolas", monospace;
          background: transparent !important;
          background-color: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          width: 100vw !important;
          height: 100vh !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          user-select: none;
          -webkit-user-select: none;
        }
        #__next, main {
          background: transparent !important;
          background-color: transparent !important;
          overflow: hidden !important;
          width: 100vw !important;
          height: 100vh !important;
        }

        /* ── Shimmer Animation ─────────────────────────────────────────── */
        @keyframes splashShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "transparent",
          fontFamily: '"Terminus", "Consolas", monospace',
          overflow: "hidden",
          margin: 0,
          padding: "12px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SplashScreenLayout;
