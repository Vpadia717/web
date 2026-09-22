"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Activity,
  Heart,
  Dna,
  Brain,
  Search,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

interface RawFeature {
  name: string;
  label: string;
  desc: string;
  icon?: string;
}

interface FeaturesData {
  wearable: RawFeature[];
  molecular: RawFeature[];
  clinical: RawFeature[];
}

type ModalityKey = "all" | "wearable" | "molecular" | "clinical";

const MODALITY_META = {
  wearable: {
    id: "wearable",
    name: "Wearable Physiological",
    count: 16,
    cadence: "100 Hz Continuous",
    sensor: "4λ Optical PPG · Interstitial · ECG",
    accent: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: <Activity size={18} color="#2563eb" />,
    summary: "Autonomic, cardiovascular, glucose, and circadian metrics streaming directly from the wrist sensor puck.",
  },
  molecular: {
    id: "molecular",
    name: "Molecular & Proteomic",
    count: 18,
    cadence: "Blood Plasma Assay",
    sensor: "High-Throughput Proteomics & Metabolomics",
    accent: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: <Dna size={18} color="#10b981" />,
    summary: "Circulating cytokines, cellular senescence burdens, and NAD+/mTOR metabolic signaling pathways.",
  },
  clinical: {
    id: "clinical",
    name: "Clinical & Cognitive",
    count: 8,
    cadence: "Standardized Evaluation",
    sensor: "ADNI Cognitive Battery · Functional Tests",
    accent: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: <Brain size={18} color="#f59e0b" />,
    summary: "Validated longitudinal neurocognitive scores, multi-domain frailty indices, and physical dynamometry.",
  },
};

export default function FeatureCards() {
  const [features, setFeatures] = useState<FeaturesData | null>(null);
  const [activeTab, setActiveTab] = useState<ModalityKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/data/features.json")
      .then((r) => r.json())
      .then(setFeatures)
      .catch(console.error);
  }, []);

  const flattenedList = useMemo(() => {
    if (!features) return [];
    const list: (RawFeature & { modality: "wearable" | "molecular" | "clinical" })[] = [];
    (features.wearable || []).forEach((f) => list.push({ ...f, modality: "wearable" }));
    (features.molecular || []).forEach((f) => list.push({ ...f, modality: "molecular" }));
    (features.clinical || []).forEach((f) => list.push({ ...f, modality: "clinical" }));
    return list;
  }, [features]);

  const displayedList = useMemo(() => {
    return flattenedList.filter((item) => {
      const matchTab = activeTab === "all" || item.modality === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [flattenedList, activeTab, searchQuery]);

  if (!features) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--colors-muted)", fontSize: "0.875rem" }}>
        Loading biomarker specifications...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} id="multimodal-biomarkers-minimal">
      {/* ─── 3 Minimalist Hero Pillars ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {(["wearable", "molecular", "clinical"] as const).map((key) => {
          const meta = MODALITY_META[key];
          const isSelected = activeTab === key;

          return (
            <div
              key={key}
              onClick={() => setActiveTab(activeTab === key ? "all" : key)}
              style={{
                background: isSelected ? "#ffffff" : "var(--colors-surface-card)",
                border: isSelected ? `2px solid ${meta.accent}` : "1px solid var(--colors-hairline)",
                borderRadius: "var(--rounded-lg)",
                padding: "1.25rem",
                cursor: "pointer",
                transition: "all 0.18s ease",
                boxShadow: isSelected ? "0 8px 24px rgba(0,0,0,0.06)" : "var(--shadow-subtle)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.75rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "6px",
                        backgroundColor: meta.bg,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {meta.icon}
                    </div>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--colors-ink)" }}>
                      {meta.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: meta.accent,
                    }}
                  >
                    {meta.count} FEATURES
                  </span>
                </div>

                <p style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.45, margin: 0 }}>
                  {meta.summary}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--colors-hairline)",
                  paddingTop: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.6875rem",
                  color: "var(--colors-muted)",
                }}
              >
                <span>{meta.cadence}</span>
                <span style={{ color: isSelected ? meta.accent : "var(--colors-muted)", fontWeight: 600 }}>
                  {isSelected ? "Active Filter" : "Filter by Modality"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Sleek Minimal Filter & Search Rail ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          paddingBottom: "0.5rem",
        }}
      >
        {/* Segmented Filter Pills */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--colors-surface-card)",
            border: "1px solid var(--colors-hairline)",
            borderRadius: "var(--rounded-pill)",
            padding: "3px",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`nav-pill-btn ${activeTab === "all" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", padding: "4px 12px" }}
          >
            All Modalities (42)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wearable")}
            className={`nav-pill-btn ${activeTab === "wearable" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", padding: "4px 12px" }}
          >
            Wearable (16)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("molecular")}
            className={`nav-pill-btn ${activeTab === "molecular" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", padding: "4px 12px" }}
          >
            Molecular (18)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("clinical")}
            className={`nav-pill-btn ${activeTab === "clinical" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", padding: "4px 12px" }}
          >
            Clinical (8)
          </button>
        </div>

        {/* Minimal Search Field */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#ffffff",
            border: "1px solid var(--colors-hairline)",
            borderRadius: "var(--rounded-pill)",
            padding: "0.375rem 0.875rem",
            minWidth: "220px",
          }}
        >
          <Search size={14} color="var(--colors-muted)" />
          <input
            type="text"
            placeholder="Search biomarkers (e.g., HRV, NAD+, Glucose)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "0.8125rem",
              color: "var(--colors-ink)",
              width: "100%",
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--colors-muted)",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* ─── Minimalist High-Density Biomarker Stream List ─── */}
      <div
        style={{
          background: "var(--colors-surface-card)",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-lg)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 2fr 1fr",
            gap: "1rem",
            padding: "0.75rem 1.25rem",
            background: "var(--colors-surface-soft)",
            borderBottom: "1px solid var(--colors-hairline)",
            fontSize: "0.6875rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            color: "var(--colors-muted)",
            textTransform: "uppercase",
          }}
          className="biomarker-table-header"
        >
          <span>Biomarker &amp; Code</span>
          <span>Physiological / Clinical Significance</span>
          <span style={{ textAlign: "right" }}>Modality Domain</span>
        </div>

        <div style={{ maxHeight: "420px", overflowY: "auto" }}>
          {displayedList.map((item, index) => {
            const meta = MODALITY_META[item.modality];

            return (
              <div
                key={item.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 2fr 1fr",
                  gap: "1rem",
                  alignItems: "center",
                  padding: "0.75rem 1.25rem",
                  borderBottom: index < displayedList.length - 1 ? "1px solid var(--colors-hairline)" : "none",
                  background: index % 2 === 0 ? "transparent" : "var(--colors-canvas)",
                  transition: "background 0.12s ease",
                }}
                className="biomarker-table-row"
              >
                {/* Name & ID with Vector Icon (No emojis) */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "6px",
                      backgroundColor: meta.bg,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.modality === "wearable" ? (
                      <Activity size={13} color="#2563eb" />
                    ) : item.modality === "molecular" ? (
                      <Dna size={13} color="#10b981" />
                    ) : (
                      <Brain size={13} color="#f59e0b" />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--colors-ink)" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)" }}>
                      {item.name}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.4 }}>
                  {item.desc}
                </div>

                {/* Modality Tag */}
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: "9999px",
                      backgroundColor: meta.bg,
                      color: meta.accent,
                      border: `1px solid ${meta.border}`,
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {meta.name.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}

          {displayedList.length === 0 && (
            <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--colors-muted)", fontSize: "0.8125rem" }}>
              No biomarkers matched &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .biomarker-table-header {
            display: none !important;
          }
          .biomarker-table-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
