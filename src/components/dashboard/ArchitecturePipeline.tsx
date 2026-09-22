"use client";

import { useState } from "react";
import {
  Brain,
  Cpu,
  Layers,
  Zap,
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  GitBranch,
  Terminal,
} from "lucide-react";

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  subtitle: string;
  tensorShape: string;
  formula: string;
  summary: string;
  hardwareTarget: string;
  latency: string;
  memory: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  specs: string[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "ingestion",
    step: "01",
    name: "Multimodal Alignment",
    subtitle: "Input Preprocessing & Imputation",
    tensorShape: "X ∈ ℝ^{Batch × 42 × 16}",
    formula: "X_t = Normalize(Interp(S_raw, Δt))",
    summary: "Harmonizes 16 high-frequency wearable sensor channels, 18 blood plasma molecular assays, and 8 clinical cognitive metrics into a unified, zero-leakage temporal tensor.",
    hardwareTarget: "ARM Cortex-M55 (CMSIS-DSP Vector SIMD)",
    latency: "0.4 ms",
    memory: "36 KB SRAM",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: <Layers size={18} color="#2563eb" />,
    specs: [
      "42 input features across 3 physiological domains",
      "Cubic-spline temporal alignment (100 Hz to discrete epochs)",
      "Z-score normalization with validation-locked baselines",
    ],
  },
  {
    id: "attention",
    step: "02",
    name: "Cross-Modality Attention",
    subtitle: "Dynamic Feature Inter-Weighting",
    tensorShape: "A ∈ ℝ^{Batch × 42 × 42}",
    formula: "Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V",
    summary: "Dynamically calculates cross-attention weights between disparate modalities, learning non-linear relationships such as coupling nocturnal glucose spikes with resting HRV drops.",
    hardwareTarget: "ARM Ethos-U55 NPU (128 MAC Vector Core)",
    latency: "1.4 ms",
    memory: "54 KB SRAM",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    icon: <Cpu size={18} color="#0d9488" />,
    specs: [
      "Multi-Head Cross Attention (4 heads, d_k = 64)",
      "Learns inter-modality coupling weights dynamically",
      "Replaces rigid tabular assumptions with soft routing",
    ],
  },
  {
    id: "temporal",
    step: "03",
    name: "Temporal Recurrent Memory",
    subtitle: "Longitudinal Trajectory Tracking",
    tensorShape: "H ∈ ℝ^{Batch × 128}",
    formula: "h_t = (1 - z_t) ⊙ h_{t-1} + z_t ⊙ h̃_t",
    summary: "Gated Recurrent Units (GRU) process sequential attention representations over 16 time steps, capturing circadian rhythms, therapeutic response decay, and chronic baseline drift.",
    hardwareTarget: "ARM Ethos-U55 NPU (INT8 Recurrent Units)",
    latency: "1.1 ms",
    memory: "38 KB SRAM",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: <Brain size={18} color="#8b5cf6" />,
    specs: [
      "Bidirectional GRU with 128 hidden state dimension",
      "16-step temporal history window (7-day context)",
      "Preserves long-term memory with minimal compute state",
    ],
  },
  {
    id: "output",
    step: "04",
    name: "Edge Longevity Decoders",
    subtitle: "Multi-Task Clinical Inferences",
    tensorShape: "Y ∈ ℝ^{Batch × 4}",
    formula: "Y = [ΔBioAge, Resilience, Response, Anomaly]",
    summary: "Simultaneously outputs Biological Age Acceleration (Δ years), Microvascular Autonomic Resilience Index (0–1), Senolytic Intervention Response, and Sub-Clinical Anomaly Risk.",
    hardwareTarget: "ARM Cortex-M55 (Fixed-point Regression)",
    latency: "0.3 ms",
    memory: "14 KB SRAM",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: <CheckCircle2 size={18} color="#10b981" />,
    specs: [
      "Head 1: Biological Age Delta (MAE: ±0.84 years)",
      "Head 2: Autonomic Resilience Index (ROC AUC: 97.8%)",
      "Head 3: Senolytic / NAD+ Intervention Efficacy (+16.3% lift)",
    ],
  },
];

export default function ArchitecturePipeline() {
  const [activeStageId, setActiveStageId] = useState<string>("attention");

  const activeStage = PIPELINE_STAGES.find((s) => s.id === activeStageId) || PIPELINE_STAGES[1];

  return (
    <div
      style={{
        background: "var(--colors-surface-card)",
        border: "1px solid var(--colors-hairline)",
        borderRadius: "var(--rounded-xl)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
      id="neural-architecture-minimal"
    >
      {/* ─── Minimal Header & Performance Bar ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--colors-hairline)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "6px",
              backgroundColor: "#f1f5f9",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cpu size={16} color="#0f172a" />
          </div>
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--colors-ink)", margin: 0 }}>
              Cross-Modality Attention &amp; TinyML Pipeline
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--colors-muted)" }}>
              4-Stage Sequential Processing · On-Device Embedded Execution
            </span>
          </div>
        </div>

        {/* 4 Minimal Metric Chips (No Emojis) */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            { label: "LATENCY", val: "3.2 ms", icon: <Clock size={12} color="#0284c7" /> },
            { label: "POWER", val: "0.85 mW", icon: <Zap size={12} color="#f59e0b" /> },
            { label: "SRAM", val: "142 KB", icon: <Layers size={12} color="#8b5cf6" /> },
            { label: "TARGET", val: "Ethos-U55", icon: <ShieldCheck size={12} color="#10b981" /> },
          ].map((chip) => (
            <div
              key={chip.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "var(--colors-surface-soft)",
                border: "1px solid var(--colors-hairline)",
                padding: "3px 8px",
                borderRadius: "var(--rounded-pill)",
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              {chip.icon}
              <span style={{ color: "var(--colors-muted)" }}>{chip.label}:</span>
              <strong style={{ color: "var(--colors-ink)" }}>{chip.val}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 4-Stage Horizontal Pipeline Flow ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.875rem",
        }}
      >
        {PIPELINE_STAGES.map((stg) => {
          const isSelected = activeStageId === stg.id;

          return (
            <div
              key={stg.id}
              onClick={() => setActiveStageId(stg.id)}
              style={{
                background: isSelected ? "#ffffff" : "var(--colors-canvas)",
                border: isSelected ? `2px solid ${stg.color}` : "1px solid var(--colors-hairline)",
                borderRadius: "var(--rounded-lg)",
                padding: "1.125rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: isSelected ? "0 8px 20px rgba(0,0,0,0.06)" : "var(--shadow-subtle)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.625rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "6px",
                      backgroundColor: stg.bg,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stg.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontFamily: "var(--font-mono)",
                      color: stg.color,
                      fontWeight: 700,
                    }}
                  >
                    STAGE {stg.step}
                  </span>
                </div>

                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.25rem" }}>
                  {stg.name}
                </div>

                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", lineHeight: 1.4 }}>
                  {stg.subtitle}
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--colors-hairline)",
                  paddingTop: "0.5rem",
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  color: isSelected ? stg.color : "var(--colors-muted)",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{stg.latency}</span>
                <span>{isSelected ? "Inspecting" : "Inspect →"}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Compact Active Stage Inspector (Minimal Detail Row) ─── */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-lg)",
          padding: "1.25rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "1.5rem",
          alignItems: "center",
        }}
        className="pipeline-inspector-grid"
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                color: activeStage.color,
                background: activeStage.bg,
                padding: "2px 8px",
                borderRadius: "4px",
                border: `1px solid ${activeStage.border}`,
              }}
            >
              STAGE {activeStage.step} SPECS
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--colors-muted)", fontFamily: "var(--font-mono)" }}>
              {activeStage.hardwareTarget}
            </span>
          </div>

          <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.375rem" }}>
            {activeStage.name}
          </h4>

          <p style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.5, margin: "0 0 0.75rem 0" }}>
            {activeStage.summary}
          </p>

          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              background: "var(--colors-surface-soft)",
              padding: "6px 10px",
              borderRadius: "4px",
              color: "var(--colors-ink)",
              border: "1px solid var(--colors-hairline)",
              display: "inline-block",
            }}
          >
            Mathematical Formulation: <strong>{activeStage.formula}</strong>
          </div>
        </div>

        {/* Right Architectural Specifications */}
        <div
          style={{
            background: "var(--colors-surface-soft)",
            border: "1px solid var(--colors-hairline)",
            borderRadius: "var(--rounded-md)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderBottom: "1px solid var(--colors-hairline)", paddingBottom: "0.375rem" }}>
            <span style={{ color: "var(--colors-muted)" }}>Tensor Representation:</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--colors-ink)" }}>{activeStage.tensorShape}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderBottom: "1px solid var(--colors-hairline)", paddingBottom: "0.375rem" }}>
            <span style={{ color: "var(--colors-muted)" }}>Execution Latency:</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--colors-ink)" }}>{activeStage.latency}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderBottom: "1px solid var(--colors-hairline)", paddingBottom: "0.375rem" }}>
            <span style={{ color: "var(--colors-muted)" }}>SRAM Retention:</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--colors-ink)" }}>{activeStage.memory}</span>
          </div>

          <div style={{ marginTop: "0.25rem" }}>
            <span style={{ fontSize: "0.6875rem", color: "var(--colors-muted)", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>
              Key Sub-Operations:
            </span>
            {activeStage.specs.map((sp, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "var(--colors-ink)" }}>
                <CheckCircle2 size={12} color="var(--colors-success)" style={{ flexShrink: 0 }} />
                <span>{sp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pipeline-inspector-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #neural-architecture-minimal {
            padding: 1rem !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
