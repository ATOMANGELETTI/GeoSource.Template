"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ContextMenuState {
  open: boolean;
  x: number;
  y: number;
}

export interface UseContextMenuReturn {
  menuState: ContextMenuState;
  handleContextMenu: (e: React.MouseEvent) => void;
  close: () => void;
}

/**
 * Tracks right-click position and open/close state for a custom context menu.
 *
 * Usage:
 *   const { menuState, handleContextMenu, close } = useContextMenu();
 *   <div onContextMenu={handleContextMenu}>...</div>
 *   {menuState.open && <ContextMenu x={menuState.x} y={menuState.y} onClose={close} ... />}
 */
export function useContextMenu(): UseContextMenuReturn {
  const [menuState, setMenuState] = useState<ContextMenuState>({
    open: false,
    x: 0,
    y: 0,
  });

  // Keep a stable ref so the Escape listener can read the latest open state
  // without needing to be re-registered whenever it changes.
  const openRef = useRef(false);
  useEffect(() => {
    openRef.current = menuState.open;
  }, [menuState.open]);

  const close = useCallback(() => {
    setMenuState((prev) => ({ ...prev, open: false }));
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuState({ open: true, x: e.clientX, y: e.clientY });
  }, []);

  // Global Escape key handler — dismisses any open menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) {
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [close]);

  return { menuState, handleContextMenu, close };
}
