"use client";

import { useEffect, useState, useRef, type FC } from "react";
import { useConfigStore } from "@/lib/store/configStore";
import { closeSplashAndShowMain } from "@/lib/config";
import { logInfo, logWarn, logError } from "@/lib/logger";

const MIN_SPLASH_TIME_MS = 7000; // Mandatory 7 seconds minimum duration

export const SplashScreen: FC = () => {
  const appInfo = useConfigStore((state) => state.appInfo);
  const loadAll = useConfigStore((state) => state.loadAll);

  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("Initializing Core Engine...");

  const startTimeRef = useRef<number>(0);
  const isAppLoadedRef = useRef<boolean>(false);
  const minTimeElapsedRef = useRef<boolean>(false);
  const loggedMilestonesRef = useRef<Record<number, boolean>>({});

  // Trigger store configuration load on mount
  useEffect(() => {
    logInfo("SplashScreen component mounted.");

    loadAll()
      .then(() => {
        isAppLoadedRef.current = true;
        logInfo("SplashScreen: Config store loaded successfully.");
      })
      .catch((err) => {
        logWarn("SplashScreen: Config store load notice:", String(err));
        isAppLoadedRef.current = true;
      });

    // Safety fallback: Ensure isAppLoadedRef is set to true after 3 seconds max
    const safetyTimer = setTimeout(() => {
      isAppLoadedRef.current = true;
    }, 3000);

    return () => clearTimeout(safetyTimer);
  }, [loadAll]);

  // Progress timer logic (7 seconds minimum + app loaded gate)
  useEffect(() => {
    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / MIN_SPLASH_TIME_MS) * 100));

      if (elapsed >= MIN_SPLASH_TIME_MS) {
        minTimeElapsedRef.current = true;
      }

      let currentMsg = "Preparing workspace environment...";
      // Update status messages during startup sequence
      if (calculatedProgress < 25) {
        currentMsg = "Loading application configuration & bindings...";
      } else if (calculatedProgress < 55) {
        currentMsg = "Initializing GIS spatial pipelines...";
      } else if (calculatedProgress < 85) {
        currentMsg = "Mounting user interface subsystems...";
      } else if (calculatedProgress < 100) {
        currentMsg = "Preparing workspace environment...";
      } else {
        currentMsg = "System ready — Launching GeoSource Template...";
      }
      setStatusText(currentMsg);

      // Milestone logging
      const milestoneKey = Math.floor(calculatedProgress / 25) * 25;
      if (!loggedMilestonesRef.current[milestoneKey]) {
        loggedMilestonesRef.current[milestoneKey] = true;
        logInfo(`SplashScreen milestone reached: ${calculatedProgress}% (${currentMsg})`);
      }

      if (minTimeElapsedRef.current) {
        if (isAppLoadedRef.current) {
          setProgress(100);
          clearInterval(interval);
          logInfo("SplashScreen sequence complete (100%). Requesting close_splash_and_show_main.");

          // Short delay to allow 100% progress state to visually render smoothly
          setTimeout(() => {
            closeSplashAndShowMain()
              .then(() => {
                logInfo("closeSplashAndShowMain IPC call succeeded.");
              })
              .catch((err) => {
                logError("Failed to signal close splash:", String(err));
              });
          }, 300);
        } else {
          // If 7s has elapsed but app initialization is still ongoing, stay at 98%
          setProgress(98);
          setStatusText("Finalizing background services...");
        }
      } else {
        setProgress(calculatedProgress);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "14px",
        backgroundColor: "var(--splash-bg, #2e3440)",
        color: "var(--splash-text-primary, #eceff4)",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        border: "1px solid var(--splash-border, #4c566a)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        padding: "40px 36px 44px 36px",
        userSelect: "none",
        fontFamily: 'var(--splash-font, "Terminus", "Consolas", monospace)',
      }}
    >
      {/* Background ambient glow effect */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "360px",
          height: "200px",
          background:
            "radial-gradient(circle, var(--splash-accent-primary, #88c0d0) 0%, rgba(0,0,0,0) 70%)",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />

      {/* Main Content Area above loading bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginTop: "16px",
          zIndex: 1,
        }}
      >
        {/* Animated Brand Emblem */}
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "18px",
            background: "var(--splash-surface, #3b4252)",
            border: "1px solid var(--splash-border, #4c566a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            position: "relative",
          }}
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--splash-accent-primary, #88c0d0)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8" />
            <path d="M3.6 15h16.8" />
            <path d="M11.5 3a17 17 0 0 0 0 18" />
            <path d="M12.5 3a17 17 0 0 1 0 18" />
          </svg>
        </div>

        {/* Header Text */}
        <h1
          style={{
            margin: "0 0 8px 0",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: "var(--splash-text-primary, #eceff4)",
          }}
        >
          GeoSource Template
        </h1>

        {/* Subtitle / Version tag */}
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--splash-accent-primary, #88c0d0)",
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          GeoSpatial Desktop Platform • v{appInfo?.version || "0.1.0"} ({appInfo?.codename || "Melody"})
        </div>
      </div>

      {/* Status Text & Percentage directly above bottom loading bar */}
      <div
        style={{
          width: "100%",
          padding: "0 4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: "var(--splash-text-secondary, #d8dee9)",
          zIndex: 1,
          marginBottom: "12px",
        }}
      >
        <span>{statusText}</span>
        <span
          style={{
            fontWeight: 700,
            color: "var(--splash-accent-primary, #88c0d0)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {progress}%
        </span>
      </div>

      {/* Loading Bar at the exact bottom edge of the window */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "6px",
          backgroundColor: "var(--splash-elevated, #434c5e)",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* Animated Progress Bar Fill */}
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, var(--splash-accent-secondary, #81a1c1), var(--splash-accent-primary, #88c0d0))",
            transition: "width 0.15s linear",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Continuous Shimmer Flow Animation */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
              animation: "splashShimmer 1.6s infinite linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
