"use client";

import type { FC } from "react";
import { X, Minus, Square } from "lucide-react";

interface TrafficLightsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

/**
 * macOS-style traffic light window control buttons.
 * Renders close (red), minimize (yellow), maximize (green) dots.
 * Icons appear on hover for clarity.
 */
const TrafficLights: FC<TrafficLightsProps> = ({
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <div
      className="traffic-lights"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--traffic-gap)",
        paddingLeft: "14px",
        // Prevent drag from this region
        WebkitAppRegion: "no-drag",
      } as React.CSSProperties}
    >
      {/* Close — Red */}
      <button
        id="titlebar-close"
        aria-label="Close window"
        onClick={onClose}
        className="traffic-btn traffic-btn--close"
        style={{
          width: "var(--traffic-size)",
          height: "var(--traffic-size)",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          backgroundColor: "var(--traffic-close)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: 0,
          transition: "filter var(--transition-fast), opacity var(--transition-fast)",
          position: "relative",
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
        }}
      >
        <X
          size={7}
          strokeWidth={2.5}
          style={{
            color: "rgba(0,0,0,0.55)",
            opacity: 0,
            transition: "opacity var(--transition-fast)",
          }}
          className="traffic-icon"
        />
      </button>

      {/* Minimize — Yellow */}
      <button
        id="titlebar-minimize"
        aria-label="Minimize window"
        onClick={onMinimize}
        className="traffic-btn traffic-btn--minimize"
        style={{
          width: "var(--traffic-size)",
          height: "var(--traffic-size)",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          backgroundColor: "var(--traffic-minimize)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: 0,
          transition: "filter var(--transition-fast), opacity var(--transition-fast)",
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
        }}
      >
        <Minus
          size={7}
          strokeWidth={2.5}
          style={{
            color: "rgba(0,0,0,0.55)",
            opacity: 0,
            transition: "opacity var(--transition-fast)",
          }}
          className="traffic-icon"
        />
      </button>

      {/* Maximize — Green */}
      <button
        id="titlebar-maximize"
        aria-label="Maximize window"
        onClick={onMaximize}
        className="traffic-btn traffic-btn--maximize"
        style={{
          width: "var(--traffic-size)",
          height: "var(--traffic-size)",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          backgroundColor: "var(--traffic-maximize)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: 0,
          transition: "filter var(--transition-fast), opacity var(--transition-fast)",
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
        }}
      >
        <Square
          size={6}
          strokeWidth={2.5}
          style={{
            color: "rgba(0,0,0,0.55)",
            opacity: 0,
            transition: "opacity var(--transition-fast)",
          }}
          className="traffic-icon"
        />
      </button>
    </div>
  );
};

export default TrafficLights;
