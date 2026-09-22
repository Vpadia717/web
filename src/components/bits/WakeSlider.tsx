"use client";

import React from "react";

interface WakeSliderProps {
  value: number; // 0 to 1
  onChange: (val: number) => void;
  label?: string;
  minLabel?: string;
  maxLabel?: string;
}

export default function WakeSlider({
  value,
  onChange,
  label = "Assembly State",
  minLabel = "Exploded",
  maxLabel = "Assembled",
}: WakeSliderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--colors-ink)" }}>
          {label}
        </span>
        <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--colors-body)" }}>
          {Math.round(value * 100)}%
        </span>
      </div>

      <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            width: "100%",
            height: "6px",
            borderRadius: "9999px",
            appearance: "none",
            backgroundColor: "var(--colors-surface-strong)",
            outline: "none",
            cursor: "pointer",
            accentColor: "var(--colors-primary)",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--colors-muted)" }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
