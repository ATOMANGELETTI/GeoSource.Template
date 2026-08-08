"use client";

import type { FC, ReactNode } from "react";
import { Titlebar } from "@/components/ui/Titlebar";
import { useContextMenu } from "@/hooks/useContextMenu";
import ContentContextMenu from "@/components/ui/ContextMenu/ContentContextMenu";

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
 *
 * Right-clicking anywhere in the content area opens ContentContextMenu.
 */
const MainWindowLayout: FC<MainWindowLayoutProps> = ({ children }) => {
  const { menuState, handleContextMenu, close: closeMenu } = useContextMenu();

  return (
    <div className="app-root">
      <Titlebar title="Tauri Template" />

      <main
        className="content-area"
        onContextMenu={handleContextMenu}
      >
        {children}
      </main>

      {/* Content area right-click context menu — portal, renders into document.body */}
      <ContentContextMenu
        open={menuState.open}
        x={menuState.x}
        y={menuState.y}
        onClose={closeMenu}
      />
    </div>
  );
};

export default MainWindowLayout;
