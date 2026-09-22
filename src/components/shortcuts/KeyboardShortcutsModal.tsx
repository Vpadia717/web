"use client";

import React, { useEffect } from "react";
import { X, Command, SunMoon, Search, Compass, Eye, Shield, Layers, Activity } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutEntry {
  key: string;
  desc: string;
  category: "general" | "navigation" | "3d";
}

const SHORTCUTS: ShortcutEntry[] = [
  // General
  { key: "D", desc: "Toggle Dark / Light Mode (Animated Transmission)", category: "general" },
  { key: "⌘K / Ctrl+K", desc: "Open Omni Master Wild Search", category: "general" },
  { key: "?", desc: "Open / Close this Keyboard Shortcuts Guide", category: "general" },
  { key: "ESC", desc: "Dismiss open modals, search, or mobile drawer", category: "general" },

  // Navigation Numbers
  { key: "1", desc: "Jump to Overview & Mission", category: "navigation" },
  { key: "2", desc: "Jump to 3D Wearable Prototype", category: "navigation" },
  { key: "3", desc: "Jump to Multimodal Biomarkers", category: "navigation" },
  { key: "4", desc: "Jump to Model Performance & Evaluation", category: "navigation" },
  { key: "5", desc: "Jump to Intervention Protocols & Ablation", category: "navigation" },
  { key: "6", desc: "Jump to Neural Architecture Pipeline", category: "navigation" },
  { key: "7", desc: "Jump to Scientific Methodology & Evidence", category: "navigation" },

  // 3D Terminal Controls
  { key: "Space", desc: "Pause / Resume 3D Keynote Auto-Orbit", category: "3d" },
  { key: "X", desc: "Toggle 3D X-Ray Wireframe Mode", category: "3d" },
  { key: "A", desc: "Assemble Watch to Ready-to-Wear State", category: "3d" },
  { key: "E", desc: "Explode 3D Watch into 6 Sub-Assemblies", category: "3d" },
];

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.15s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "var(--colors-canvas)",
          color: "var(--colors-ink)",
          borderRadius: "var(--rounded-xl)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--colors-hairline)",
          overflow: "hidden",
          animation: "scaleIn 0.15s ease-out",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--colors-hairline)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Command size={18} color="var(--colors-brand-accent)" />
            <span style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Keyboard Shortcuts Guide
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortcuts"
            style={{
              background: "var(--colors-surface-soft)",
              border: "1px solid var(--colors-hairline)",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--colors-muted)",
              cursor: "pointer",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Shortcuts Body List */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            maxHeight: "70vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* General Section */}
          <div>
            <div style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              System &amp; Controls
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {SHORTCUTS.filter((s) => s.category === "general").map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.45rem 0", borderBottom: "1px solid var(--colors-hairline-soft)" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--colors-body)" }}>{item.desc}</span>
                  <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, background: "var(--colors-surface-soft)", border: "1px solid var(--colors-hairline)", padding: "2px 8px", borderRadius: "4px", color: "var(--colors-ink)" }}>
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <div style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Quick Section Jumps
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {SHORTCUTS.filter((s) => s.category === "navigation").map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.45rem 0", borderBottom: "1px solid var(--colors-hairline-soft)" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--colors-body)" }}>{item.desc}</span>
                  <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, background: "var(--colors-surface-soft)", border: "1px solid var(--colors-hairline)", padding: "2px 8px", borderRadius: "4px", color: "var(--colors-ink)" }}>
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Hardware Section */}
          <div>
            <div style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              3D Interactive Watch Controls
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {SHORTCUTS.filter((s) => s.category === "3d").map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.45rem 0", borderBottom: "1px solid var(--colors-hairline-soft)" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--colors-body)" }}>{item.desc}</span>
                  <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, background: "var(--colors-surface-soft)", border: "1px solid var(--colors-hairline)", padding: "2px 8px", borderRadius: "4px", color: "var(--colors-ink)" }}>
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--colors-surface-soft)",
            borderTop: "1px solid var(--colors-hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "var(--colors-muted)",
          }}
        >
          <span>Press any key while browsing to trigger action</span>
          <span>Press <kbd style={{ background: "var(--colors-canvas)", padding: "1px 5px", borderRadius: "3px", border: "1px solid var(--colors-hairline)" }}>ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
}
