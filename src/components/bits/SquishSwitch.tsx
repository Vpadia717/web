"use client";

import { motion } from "framer-motion";

interface SquishSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function SquishSwitch({ checked, onChange, label }: SquishSwitchProps) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 40,
          height: 22,
          backgroundColor: checked ? "var(--colors-primary)" : "var(--colors-hairline)",
          borderRadius: 9999,
          padding: 2,
          display: "flex",
          alignItems: "center",
          transition: "background-color 0.2s ease",
        }}
      >
        <motion.div
          animate={{
            x: checked ? 18 : 0,
            scaleX: [1, 1.25, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 700, damping: 30 },
            scaleX: { duration: 0.2, ease: "easeInOut" },
          }}
          style={{
            width: 18,
            height: 18,
            backgroundColor: "#ffffff",
            borderRadius: 9999,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
      {label && (
        <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--colors-body)" }}>
          {label}
        </span>
      )}
    </label>
  );
}
