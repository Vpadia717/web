"use client";

import { useState } from "react";
import { MODULE_SPECS } from "@/components/three/WearableModules";
import { STUDENT_PARTS_DATA } from "./wearableStudentData";
import {
  Cpu,
  Eye,
  Shield,
  BatteryCharging,
  Radio,
  Sparkles,
  Layers,
  Info,
  GraduationCap,
  Microscope,
  Zap,
  Lightbulb,
  CheckCircle2,
  Compass,
} from "lucide-react";

interface ComponentSpecsDrawerProps {
  activeModuleId: string;
  onAssemble: () => void;
  onExplode: () => void;
  progress: number;
  onSelectPreset?: (preset: "studio" | "front" | "sensors" | "exploded") => void;
}

export default function ComponentSpecsDrawer({
  activeModuleId,
  onAssemble,
  onExplode,
  progress,
  onSelectPreset,
}: ComponentSpecsDrawerProps) {
  const [viewMode, setViewMode] = useState<"student" | "engineer">("student");

  const isAll = activeModuleId === "all";
  const spec = MODULE_SPECS[activeModuleId] || MODULE_SPECS.display;
  const studentData = STUDENT_PARTS_DATA[activeModuleId] || STUDENT_PARTS_DATA.all;

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "display":
        return <Eye size={16} color="#0284c7" />;
      case "chassis":
        return <Shield size={16} color="#475569" />;
      case "sensors":
        return <Radio size={16} color="#10b981" />;
      case "pcb":
        return <Cpu size={16} color="#8b5cf6" />;
      case "battery":
        return <BatteryCharging size={16} color="#f59e0b" />;
      case "straps":
        return <Layers size={16} color="#ea580c" />;
      default:
        return <Sparkles size={16} color="#2563eb" />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* ─── Top Control Row: Part Tag & Mode Switcher ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          {/* Module Part Number Chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              background: studentData.accentBg,
              border: `1px solid ${studentData.borderTint}`,
              borderRadius: "var(--rounded-pill)",
              padding: "3px 10px",
              fontSize: "0.6875rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: studentData.themeColor,
              whiteSpace: "nowrap",
            }}
          >
            {getModuleIcon(activeModuleId)}
            <span>{studentData.moduleNumber}</span>
          </div>

          {/* Student vs Engineer Mode Toggle */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--colors-surface-card)",
              border: "1px solid var(--colors-hairline)",
              borderRadius: "var(--rounded-pill)",
              padding: "2px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode("student")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                border: "none",
                borderRadius: "var(--rounded-pill)",
                padding: "3px 8px",
                fontSize: "0.6875rem",
                fontWeight: viewMode === "student" ? 700 : 500,
                color: viewMode === "student" ? "#ffffff" : "var(--colors-muted)",
                background: viewMode === "student" ? "var(--colors-primary)" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
              title="Easy visual explanations & fun analogies for students"
            >
              <GraduationCap size={13} />
              <span>Student Guide</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("engineer")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                border: "none",
                borderRadius: "var(--rounded-pill)",
                padding: "3px 8px",
                fontSize: "0.6875rem",
                fontWeight: viewMode === "engineer" ? 700 : 500,
                color: viewMode === "engineer" ? "#ffffff" : "var(--colors-muted)",
                background: viewMode === "engineer" ? "var(--colors-ink)" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
              title="Deep technical and medical engineering specifications"
            >
              <Microscope size={13} />
              <span>Pro Specs</span>
            </button>
          </div>
        </div>

        {/* ─── Mode 1: Student Guide (Visual, Clear, Engaging) ─── */}
        {viewMode === "student" ? (
          <div>
            {/* Main Student Title */}
            <h3
              style={{
                fontSize: "1.1875rem",
                fontWeight: 700,
                color: "var(--colors-ink)",
                letterSpacing: "-0.02em",
                margin: "0 0 0.375rem 0",
                lineHeight: 1.3,
              }}
            >
              {studentData.studentTitle}
            </h3>

            {/* Fun Kid-Friendly Analogy Quote */}
            <div
              style={{
                background: studentData.accentBg,
                border: `1px solid ${studentData.borderTint}`,
                borderRadius: "var(--rounded-md)",
                padding: "0.625rem 0.75rem",
                marginBottom: "0.875rem",
                fontSize: "0.8125rem",
                color: "var(--colors-ink)",
                fontWeight: 600,
                lineHeight: 1.4,
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <Sparkles size={16} color={studentData.themeColor} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>{studentData.analogy}</div>
            </div>

            {/* Simple Words Explanation */}
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--colors-body)",
                lineHeight: 1.5,
                margin: "0 0 0.875rem 0",
              }}
            >
              {studentData.simpleExplanation}
            </p>

            {/* Superpower Highlight */}
            <div
              style={{
                background: "var(--colors-surface-card)",
                border: "1px solid var(--colors-hairline)",
                borderRadius: "var(--rounded-md)",
                padding: "0.5rem 0.75rem",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Zap size={15} color="#f59e0b" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "0.75rem", color: "var(--colors-ink)", fontWeight: 600, lineHeight: 1.35 }}>
                <span style={{ color: "var(--colors-muted)", fontWeight: 500 }}>Superpower: </span>
                {studentData.superpower}
              </div>
            </div>

            {/* 3-Step Visual Cartoon Flow: How It Works */}
            <div style={{ marginBottom: "0.875rem" }}>
              <div
                style={{
                  fontSize: "0.6875rem",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: "var(--colors-muted)",
                  marginBottom: "0.45rem",
                }}
              >
                How It Works (Step-by-Step)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {studentData.steps.map((st) => (
                  <div
                    key={st.step}
                    style={{
                      background: "var(--colors-surface-card)",
                      border: "1px solid var(--colors-hairline)",
                      borderRadius: "6px",
                      padding: "0.45rem 0.65rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: studentData.accentBg,
                        border: `1px solid ${studentData.borderTint}`,
                        color: studentData.themeColor,
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      {st.step}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--colors-ink)", marginRight: "0.35rem" }}>
                        {st.title}:
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--colors-body)", lineHeight: 1.35 }}>
                        {st.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* "Did You Know?" Science Trivia Card */}
            <div
              style={{
                background: "rgba(245, 158, 11, 0.10)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                borderRadius: "var(--rounded-md)",
                padding: "0.625rem 0.75rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <Lightbulb size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "0.75rem", color: "var(--colors-ink)", lineHeight: 1.45 }}>
                <span style={{ fontWeight: 700, color: "#f59e0b" }}>Did You Know? </span>
                {studentData.funFact}
              </div>
            </div>
          </div>
        ) : (
          /* ─── Mode 2: Pro Engineering Specs (Clinical & Technical) ─── */
          <div>
            <div style={{ marginBottom: "0.375rem" }}>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--colors-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {isAll ? "System Architecture" : spec?.category}
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.1875rem",
                fontWeight: 700,
                color: "var(--colors-ink)",
                letterSpacing: "-0.02em",
                margin: "0 0 0.5rem 0",
              }}
            >
              {isAll ? "AURA-1 Bio-Chronos™ System" : spec?.name}
            </h3>

            <p style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.5, margin: "0 0 0.875rem 0" }}>
              {isAll
                ? "Medical-grade wearable platform combining all 6 sub-assemblies. Continuous longitudinal tracking of 42 cardiovascular, metabolic, and sleep biomarkers with on-device TinyML."
                : spec?.description}
            </p>

            {/* Clinical / Practical Utility Callout */}
            <div
              style={{
                background: "rgba(37, 99, 235, 0.10)",
                border: "1px solid rgba(37, 99, 235, 0.25)",
                borderRadius: "var(--rounded-md)",
                padding: "0.625rem 0.75rem",
                marginBottom: "0.875rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "flex-start",
              }}
            >
              <Info size={16} color="var(--colors-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "0.75rem", color: "var(--colors-ink)", lineHeight: 1.45 }}>
                <span style={{ fontWeight: 700, color: "var(--colors-primary)" }}>Clinical Utility: </span>
                {isAll
                  ? "Empowers non-invasive, continuous biological age estimation and early therapeutic intervention monitoring for geroscience trials."
                  : spec?.clinicalUse}
              </div>
            </div>

            {/* Technical Specs List */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
                background: "var(--colors-canvas)",
                border: "1px solid var(--colors-hairline)",
                borderRadius: "var(--rounded-md)",
                padding: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              {isAll ? (
                <>
                  <div>
                    <div style={{ fontSize: "0.625rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>Total Weight</div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>38.2 grams</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.625rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>Sensors</div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>16 Transducers</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.625rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>Battery Life</div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>7 Days (24/7)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.625rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>Water Rating</div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>5 ATM (50m)</div>
                  </div>
                </>
              ) : (
                spec?.specs.map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: "0.625rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>{item.value}</div>
                  </div>
                ))
              )}
            </div>

            {/* Material & Certification */}
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--colors-muted)",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {isAll ? "Enclosure: Grade 5 Titanium + Zirconia Ceramic base" : `Material: ${spec?.material}`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ─── Bottom Interactive Action Buttons ─── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--colors-hairline)",
        }}
      >
        {/* Fly to Camera Preset if available */}
        {activeModuleId === "sensors" && onSelectPreset && (
          <button
            type="button"
            onClick={() => onSelectPreset("sensors")}
            className="btn btn-secondary btn-sm"
            style={{ width: "100%", fontSize: "0.75rem", gap: "0.375rem", justifyContent: "center" }}
          >
            <Compass size={13} color="#10b981" />
            <span>Turn Watch to Inspect Ceramic Back</span>
          </button>
        )}

        {activeModuleId === "display" && onSelectPreset && (
          <button
            type="button"
            onClick={() => onSelectPreset("front")}
            className="btn btn-secondary btn-sm"
            style={{ width: "100%", fontSize: "0.75rem", gap: "0.375rem", justifyContent: "center" }}
          >
            <Compass size={13} color="#0284c7" />
            <span>Fly Camera to Retina OLED Dial</span>
          </button>
        )}

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={onAssemble}
            className={`btn ${progress > 0.8 ? "btn-primary" : "btn-secondary"}`}
            style={{ flex: 1, fontSize: "0.8125rem", height: 36, whiteSpace: "nowrap" }}
          >
            Assemble Watch
          </button>
          <button
            type="button"
            onClick={onExplode}
            className={`btn ${progress < 0.2 ? "btn-primary" : "btn-secondary"}`}
            style={{ flex: 1, fontSize: "0.8125rem", height: 36, whiteSpace: "nowrap" }}
          >
            Explode CAD Layers
          </button>
        </div>
      </div>
    </div>
  );
}
