"use client";

import { X, Activity, Dna, Brain, CheckCircle2, Shield, Zap, Sparkles, Clock, Target } from "lucide-react";

export interface BiomarkerItem {
  name: string;
  label: string;
  desc: string;
  icon?: string;
  modality: "wearable" | "molecular" | "clinical";
}

interface BiomarkerDetailModalProps {
  biomarker: BiomarkerItem | null;
  onClose: () => void;
}

export default function BiomarkerDetailModal({ biomarker, onClose }: BiomarkerDetailModalProps) {
  if (!biomarker) return null;

  const getModalityTheme = () => {
    switch (biomarker.modality) {
      case "wearable":
        return {
          label: "Wearable Physiological Stream",
          color: "#2563eb",
          bg: "#eff6ff",
          border: "#bfdbfe",
          icon: <Activity size={18} color="#2563eb" />,
          sampling: "Continuous 100 Hz On-Device",
          transducer: "4λ Optical PPG + Bio-electrochemical Puck",
        };
      case "molecular":
        return {
          label: "Molecular & Proteomic Panel",
          color: "#10b981",
          bg: "#ecfdf5",
          border: "#a7f3d0",
          icon: <Dna size={18} color="#10b981" />,
          sampling: "Longitudinal Blood Plasma Assay",
          transducer: "High-Throughput LC-MS Mass Spectrometry",
        };
      case "clinical":
        return {
          label: "Clinical & Neurocognitive Domain",
          color: "#f59e0b",
          bg: "#fffbeb",
          border: "#fde68a",
          icon: <Brain size={18} color="#f59e0b" />,
          sampling: "Standardized Multi-Domain Protocol",
          transducer: "ADNI Cognitive Battery & Dynamometry",
        };
    }
  };

  const theme = getModalityTheme();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "var(--rounded-xl)",
          border: "1px solid var(--colors-hairline)",
          maxWidth: "560px",
          width: "100%",
          padding: "2rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          position: "relative",
          animation: "modalFadeIn 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "var(--colors-surface-soft)",
            border: "1px solid var(--colors-hairline)",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--colors-body)",
            transition: "background 0.15s ease",
          }}
          aria-label="Close details"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "9999px",
              backgroundColor: theme.bg,
              border: `1px solid ${theme.border}`,
              color: theme.color,
              fontSize: "0.75rem",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            {theme.icon}
            <span>{theme.label}</span>
          </span>
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)" }}>
            ID: {biomarker.name}
          </span>
        </div>

        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.5rem" }}>
          {biomarker.label}
        </h3>

        <p style={{ fontSize: "0.9375rem", color: "var(--colors-body)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {biomarker.desc}
        </p>

        {/* Key Dimensions Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: "var(--colors-surface-soft)",
              border: "1px solid var(--colors-hairline)",
              borderRadius: "var(--rounded-md)",
              padding: "0.875rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.6875rem", color: "var(--colors-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
              <Clock size={12} />
              <span>Sampling Frequency</span>
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--colors-ink)" }}>
              {theme.sampling}
            </div>
          </div>

          <div
            style={{
              background: "var(--colors-surface-soft)",
              border: "1px solid var(--colors-hairline)",
              borderRadius: "var(--rounded-md)",
              padding: "0.875rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.6875rem", color: "var(--colors-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
              <Target size={12} />
              <span>Transduction Mode</span>
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--colors-ink)" }}>
              {theme.transducer}
            </div>
          </div>
        </div>

        {/* Clinical Rationale Callout */}
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "var(--rounded-md)",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
            <Sparkles size={14} color="#6366f1" />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--colors-ink)" }}>
              Longevity Intervention Sensitivity
            </span>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.5, margin: 0 }}>
            Dynamically responsive to Senolytic protocols (D+Q), NAD+ precursors (NMN), and mTOR inhibition. Cross-modality attention integrates this metric with 41 companion features to compute biological age acceleration.
          </p>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary btn-sm"
            style={{ width: "100%" }}
          >
            Done
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
