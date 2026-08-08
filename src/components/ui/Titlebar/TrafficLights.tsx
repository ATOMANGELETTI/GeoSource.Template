"use client";

import type { FC } from "react";
import { X, Minus, Square } from "lucide-react";
import styles from "@/app/styles/modules/trafficLights.module.css";

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
    <div className={styles.trafficLights}>
      {/* Close — Red */}
      <button
        id="titlebar-close"
        aria-label="Close window"
        onClick={onClose}
        className={`${styles.trafficBtn} ${styles.close}`}
      >
        <X
          size={7}
          strokeWidth={2.5}
          className={styles.trafficIcon}
        />
      </button>

      {/* Minimize — Yellow */}
      <button
        id="titlebar-minimize"
        aria-label="Minimize window"
        onClick={onMinimize}
        className={`${styles.trafficBtn} ${styles.minimize}`}
      >
        <Minus
          size={7}
          strokeWidth={2.5}
          className={styles.trafficIcon}
        />
      </button>

      {/* Maximize — Green */}
      <button
        id="titlebar-maximize"
        aria-label="Maximize window"
        onClick={onMaximize}
        className={`${styles.trafficBtn} ${styles.maximize}`}
      >
        <Square
          size={6}
          strokeWidth={2.5}
          className={styles.trafficIcon}
        />
      </button>
    </div>
  );
};

export default TrafficLights;
