"use client";

import { useEffect, useState } from "react";
import CountUp from "@/components/bits/CountUp";
import { CheckCircle2, Target, Award, ShieldCheck } from "lucide-react";

interface Metrics {
  accuracy: number;
  f1: number;
  roc_auc: number;
  average_precision: number;
  brier_score: number;
}

export default function MetricsHero() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetch("/data/metrics.json")
      .then((r) => r.json())
      .then(setMetrics)
      .catch(console.error);
  }, []);

  if (!metrics) {
    return (
      <div className="grid-4" id="metrics-hero">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card" style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "var(--colors-muted)" }}>Loading metrics...</span>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      value: metrics.accuracy * 100,
      label: "Held-out Accuracy",
      suffix: "%",
      decimals: 1,
      icon: <CheckCircle2 size={16} color="var(--colors-success)" />,
      badge: "Target: 85-94%",
    },
    {
      value: metrics.f1 * 100,
      label: "Macro F1 Score",
      suffix: "%",
      decimals: 1,
      icon: <Target size={16} color="#2563eb" />,
      badge: "Balanced Threshold",
    },
    {
      value: metrics.roc_auc * 100,
      label: "ROC Area Under Curve",
      suffix: "%",
      decimals: 1,
      icon: <Award size={16} color="#8b5cf6" />,
      badge: "Cross-Modal",
    },
    {
      value: metrics.brier_score,
      label: "Brier Calibration",
      suffix: "",
      decimals: 3,
      icon: <ShieldCheck size={16} color="#10b981" />,
      badge: "Strictly Leakage-Free",
    },
  ];

  return (
    <div className="grid-4" id="metrics-hero">
      {stats.map((s) => (
        <div key={s.label} className="stat-card" style={{ textAlign: "left", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "6px",
                backgroundColor: "var(--colors-canvas)",
                border: "1px solid var(--colors-hairline)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {s.icon}
            </span>
            <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)" }}>
              {s.badge}
            </span>
          </div>

          <div className="stat-value">
            <CountUp
              to={s.value}
              decimals={s.decimals}
              suffix={s.suffix}
              duration={1.8}
            />
          </div>

          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
