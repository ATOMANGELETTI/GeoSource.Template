"use client";

import type { FC, ReactNode } from "react";
import { Titlebar } from "@/components/ui/Titlebar";

interface MainWindowLayoutProps {
  children?: ReactNode;
}

/**
 * Main window layout.
 * Composes the custom titlebar and a scrollable content area
 * filling the remaining viewport height.
 *
 * Structure:
 *   <div.app-root>           ← flex column, h-screen
 *     <Titlebar />           ← fixed 32px, drag region
 *     <main.content-area>   ← flex: 1, overflow: auto
 *       {children}
 *     </main>
 *   </div>
 */
const MainWindowLayout: FC<MainWindowLayoutProps> = ({ children }) => {
  return (
    <div className="app-root">
      <Titlebar title="Tauri Template" />
      <main className="content-area">{children}</main>
    </div>
  );
};

export default MainWindowLayout;
