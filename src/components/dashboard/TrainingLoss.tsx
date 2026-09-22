"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

interface HistoryPoint {
  epoch: number;
  train_loss: number;
  val_loss: number;
  val_accuracy: number;
  val_auc: number;
}

export default function TrainingLoss() {
  const [data, setData] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    fetch("/data/training_history.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data.length) return null;

  return (
    <div className="cal-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--colors-ink)" }}>
            Training &amp; Validation Convergence
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--colors-muted)" }}>
            Cross-entropy loss per epoch (early stopping patience=6)
          </p>
        </div>
        <span
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            background: "var(--colors-canvas)",
            border: "1px solid var(--colors-hairline)",
            padding: "2px 8px",
            borderRadius: "9999px",
            color: "var(--colors-body)",
          }}
        >
          16 Epochs
        </span>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="epoch"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                color: "#111111",
                fontSize: "0.8125rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.8125rem", color: "#6b7280", paddingTop: "0.5rem" }}
            />
            <Line
              type="monotone"
              dataKey="train_loss"
              stroke="#111111"
              strokeWidth={2}
              dot={false}
              name="Train Loss"
            />
            <Line
              type="monotone"
              dataKey="val_loss"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              name="Val Loss"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
