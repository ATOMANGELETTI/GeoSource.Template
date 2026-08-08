"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type FC,
} from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import styles from "@/app/styles/modules/ContextMenu.module.css";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ContextMenuItem {
  /** Unique key for React list rendering */
  key: string;
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Display label */
  label: string;
  /** Keyboard shortcut label (display-only) */
  shortcut?: string;
  /** Click handler */
  onClick?: () => void | Promise<void>;
  /** Renders red destructive styling */
  danger?: boolean;
  /** Grays out and disables the item */
  disabled?: boolean;
}

export interface ContextMenuDivider {
  key: string;
  divider: true;
}

export interface ContextMenuSection {
  key: string;
  section: string;
}

export type ContextMenuEntry = ContextMenuItem | ContextMenuDivider | ContextMenuSection;

export interface ContextMenuProps {
  /** Cursor X position (clientX) */
  x: number;
  /** Cursor Y position (clientY) */
  y: number;
  /** Menu item definitions */
  items: ContextMenuEntry[];
  /** Called when the menu should close */
  onClose: () => void;
  /** Optional custom transform origin hint (defaults to auto-detected) */
  transformOrigin?: string;
}

// ─────────────────────────────────────────────
// Type Guards
// ─────────────────────────────────────────────

function isDivider(entry: ContextMenuEntry): entry is ContextMenuDivider {
  return "divider" in entry && entry.divider === true;
}

function isSection(entry: ContextMenuEntry): entry is ContextMenuSection {
  return "section" in entry;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Generic portal-based context menu.
 *
 * - Renders via `ReactDOM.createPortal` into `document.body`
 * - Auto-flips position to avoid viewport overflow (right edge → left, bottom → top)
 * - Closes on: outside click, Escape (via `useContextMenu` hook), item click
 * - Entry animation: scale(0.95) + fade → scale(1), 100ms ease-out
 */
const ContextMenu: FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-flip: measure card size after mount and adjust position
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { width, height } = card.getBoundingClientRect();

    const MARGIN = 8;
    let left = x;
    let top = y;

    if (left + width + MARGIN > vw) left = Math.max(MARGIN, x - width);
    if (top + height + MARGIN > vh) top = Math.max(MARGIN, y - height);

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    // Set transform-origin based on which corner the menu opens from
    const originX = left < x ? "right" : "left";
    const originY = top < y ? "bottom" : "top";
    card.style.transformOrigin = `${originY} ${originX}`;
  }, [x, y]);

  // Outside-click handler (mousedown so it fires before the next contextmenu)
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Small delay so this handler doesn't catch the original right-click
    const id = window.setTimeout(() => {
      document.addEventListener("mousedown", handleMouseDown, { capture: true });
    }, 50);

    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handleMouseDown, { capture: true });
    };
  }, [onClose]);

  // Close on scroll (position would be stale)
  useEffect(() => {
    const close = () => onClose();
    window.addEventListener("scroll", close, { capture: true, passive: true });
    window.addEventListener("wheel", close, { capture: true, passive: true });
    return () => {
      window.removeEventListener("scroll", close, { capture: true });
      window.removeEventListener("wheel", close, { capture: true });
    };
  }, [onClose]);

  const handleItemClick = useCallback(
    (item: ContextMenuItem) => {
      if (item.disabled) return;
      onClose();
      void item.onClick?.();
    },
    [onClose],
  );

  const menu = (
    <div className={styles.overlay}>
      <div
        ref={cardRef}
        className={styles.menuCard}
        role="menu"
        aria-label="Context menu"
        style={{ left: x, top: y }}
      >
        <div className={styles.menuList} role="group">
          {items.map((entry) => {
            // ── Divider ──
            if (isDivider(entry)) {
              return <div key={entry.key} className={styles.divider} role="separator" />;
            }

            // ── Section label ──
            if (isSection(entry)) {
              return (
                <div key={entry.key} className={styles.menuSection}>
                  {entry.section}
                </div>
              );
            }

            // ── Regular item ──
            const Icon = entry.icon as LucideIcon | undefined;
            const itemClass = [
              styles.menuItem,
              entry.danger ? styles.menuItemDanger : "",
              entry.disabled ? styles.menuItemDisabled : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={entry.key}
                type="button"
                role="menuitem"
                className={itemClass}
                disabled={entry.disabled}
                onClick={() => handleItemClick(entry)}
                tabIndex={entry.disabled ? -1 : 0}
              >
                <span className={styles.menuItemContent}>
                  {Icon && <Icon className={styles.icon} aria-hidden="true" />}
                  <span>{entry.label}</span>
                </span>
                {entry.shortcut && (
                  <span className={styles.shortcut} aria-label={`Shortcut: ${entry.shortcut}`}>
                    {entry.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Only render in browser (no SSR)
  if (typeof document === "undefined") return null;
  return createPortal(menu, document.body);
};

export default ContextMenu;

// ─────────────────────────────────────────────
// Conditional render wrapper (only renders when open=true)
// ─────────────────────────────────────────────

interface ContextMenuGateProps extends ContextMenuProps {
  open: boolean;
}

/**
 * Convenience wrapper — renders `ContextMenu` only when `open` is true.
 * Eliminates the need for inline `{open && <ContextMenu ... />}` at call sites.
 */
export const ContextMenuGate: FC<ContextMenuGateProps> = ({ open, ...props }) => {
  if (!open) return null;
  return <ContextMenu {...props} />;
};
