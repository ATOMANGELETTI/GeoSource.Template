"use client";

import type { FC, ReactNode } from "react";

interface TrayMenuLayoutProps {
  children?: ReactNode;
}

/**
 * Tray menu layout enforcing transparent HTML/body backgrounds for frameless window popup.
 */
const TrayMenuLayout: FC<TrayMenuLayoutProps> = ({ children }) => {
  return (
    <>
      <style>{`
        html, body, #__next, main {
          background: transparent !important;
          background-color: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          width: 100vw !important;
          height: 100vh !important;
        }
      `}</style>
      {children}
    </>
  );
};

export default TrayMenuLayout;
