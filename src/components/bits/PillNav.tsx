"use client";

import { motion } from "framer-motion";
import React from "react";

export interface PillNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface PillNavProps {
  items: PillNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  layoutId?: string;
}

export default function PillNav({
  items,
  activeId,
  onChange,
  className = "",
  layoutId = "pillActiveBubble",
}: PillNavProps) {
  return (
    <div
      className={`nav-pill-group ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        position: "relative",
      }}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            style={{
              position: "relative",
              zIndex: 1,
              background: "transparent",
              border: "none",
              padding: "6px 14px",
              borderRadius: "9999px",
              fontSize: "0.8125rem",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--colors-ink)" : "var(--colors-muted)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              transition: "color 0.15s ease",
            }}
          >
            {item.icon}
            <span>{item.label}</span>
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "var(--colors-canvas)",
                  borderRadius: "9999px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
                  zIndex: -1,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
