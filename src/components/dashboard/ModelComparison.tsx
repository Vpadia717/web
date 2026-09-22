"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { Sparkles, Trophy } from "lucide-react";

interface ModelData {
  model: string;
  accuracy: number;
  f1: number;
  roc_auc: number;
  avg_precision: number;
}

const SHORT_NAMES: Record<string, string> = {
  "Wearable-only": "Wearable",
  "Molecular-only": "Molecular",
  "Clinical-only": "Clinical",
  "Wearable+Molecular": "Wear + Mol",
  "All-tabular-logistic": "Tabular Base",
  "Multimodal Attention + GRU": "Attention + GRU",
};

export default function ModelComparison() {
  const [data, setData] = useState<ModelData[]>([]);
  const [metricMode, setMetricMode] = useState<"dual" | "accuracy" | "roc_auc">("dual");

  useEffect(() => {
    fetch("/data/model_comparison.json")
      .then((r) => r.json())
      .then((raw: ModelData[]) => {
        const formatted = raw.map((d) => ({
          ...d,
          displayName: SHORT_NAMES[d.model] || d.model,
          accuracyPct: Number((d.accuracy * 100).toFixed(1)),
          rocAucPct: Number((d.roc_auc * 100).toFixed(1)),
          f1Pct: Number((d.f1 * 100).toFixed(1)),
        }));
        setData(formatted);
      })
      .catch(console.error);
  }, []);

  if (!data.length) return null;

  return (
    <div className="cal-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {/* ─── Header ─── */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--colors-ink)" }}>
                Ablation &amp; Architectural Comparison
              </h3>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                  padding: "2px 6px",
                  borderRadius: "9999px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <Trophy size={11} />
                <span>+16.3% Lift</span>
              </span>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--colors-muted)", margin: "0.25rem 0 0" }}>
              Held-out test performance across single-modality vs cross-modality attention
            </p>
          </div>

          {/* Metric Selector Pills */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--colors-surface-soft)",
              border: "1px solid var(--colors-hairline)",
              borderRadius: "var(--rounded-pill)",
              padding: "2px",
            }}
          >
            <button
              type="button"
              onClick={() => setMetricMode("dual")}
              className={`nav-pill-btn ${metricMode === "dual" ? "active" : ""}`}
              style={{ fontSize: "0.6875rem", padding: "3px 8px" }}
            >
              Accuracy &amp; AUC
            </button>
            <button
              type="button"
              onClick={() => setMetricMode("accuracy")}
              className={`nav-pill-btn ${metricMode === "accuracy" ? "active" : ""}`}
              style={{ fontSize: "0.6875rem", padding: "3px 8px" }}
            >
              Accuracy
            </button>
            <button
              type="button"
              onClick={() => setMetricMode("roc_auc")}
              className={`nav-pill-btn ${metricMode === "roc_auc" ? "active" : ""}`}
              style={{ fontSize: "0.6875rem", padding: "3px 8px" }}
            >
              ROC AUC
            </button>
          </div>
        </div>
      </div>

      {/* ─── Recharts Bar Chart ─── */}
      <div style={{ width: "100%", height: 310, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, bottom: 35, left: -10 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="displayName"
              stroke="#64748b"
              fontSize={11}
              fontWeight={500}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              dy={5}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              domain={[0.5, 1.0]}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid var(--colors-hairline)",
                borderRadius: "8px",
                color: "#111111",
                fontSize: "0.8125rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                padding: "8px 12px",
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(val: any, name: any) => [`${(Number(val) * 100).toFixed(1)}%`, name]}
              labelFormatter={(lbl) => `Model: ${lbl}`}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: "0.75rem", paddingBottom: "0.75rem" }}
            />

            {(metricMode === "dual" || metricMode === "accuracy") && (
              <Bar dataKey="accuracy" name="Accuracy" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => {
                  const isWinner = index === data.length - 1;
                  return (
                    <Cell
                      key={`cell-acc-${index}`}
                      fill={isWinner ? "#111827" : "#94a3b8"}
                    />
                  );
                })}
              </Bar>
            )}

            {(metricMode === "dual" || metricMode === "roc_auc") && (
              <Bar dataKey="roc_auc" name="ROC AUC" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => {
                  const isWinner = index === data.length - 1;
                  return (
                    <Cell
                      key={`cell-auc-${index}`}
                      fill={isWinner ? "#2563eb" : "#60a5fa"}
                    />
                  );
                })}
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ─── Bottom Key Takeaway Callout ─── */}
      <div
        style={{
          marginTop: "0.75rem",
          padding: "0.625rem 0.875rem",
          background: "var(--colors-surface-soft)",
          borderRadius: "6px",
          border: "1px solid var(--colors-hairline)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--colors-muted)",
        }}
      >
        <span>
          <strong style={{ color: "var(--colors-ink)" }}>Finding: </strong>
          Combining optical PPG with molecular proteome exceeds single modalities by &gt;16% accuracy.
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "#2563eb" }}>
          AUC: 97.8%
        </span>
      </div>
    </div>
  );
}
