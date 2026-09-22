"use client";

import PulseHeart from "@/components/bits/PulseHeart";
import CometDial from "@/components/bits/CometDial";
import StatusMark from "@/components/bits/StatusMark";
import CountUp from "@/components/bits/CountUp";
import DecryptedText from "@/components/bits/DecryptedText";
import { Activity, Thermometer, Droplet, Zap, Wifi } from "lucide-react";

export default function BiometricTelemetryHUD() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "0.75rem",
        width: "100%",
      }}
    >
      {/* 1. Heart Rate & Pulse */}
      <div
        style={{
          background: "var(--colors-canvas)",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-md)",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 600 }}>
            Heart Rate
          </span>
          <PulseHeart bpm={72} size={15} color="#ec4899" />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--colors-ink)" }}>
            <CountUp to={72} duration={2} />
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--colors-muted)" }}>BPM</span>
        </div>
        <div style={{ fontSize: "0.6875rem", color: "var(--colors-success)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <StatusMark status="active" size={5} />
          <span>HRV: 68 ms</span>
        </div>
      </div>

      {/* 2. Blood Oxygen SpO2 */}
      <div
        style={{
          background: "var(--colors-canvas)",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-md)",
          padding: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ fontSize: "0.7rem", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 600 }}>
            SpO₂ Oxygen
          </span>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--colors-ink)" }}>
            <CountUp to={98.4} decimals={1} duration={2} suffix="%" />
          </div>
          <span style={{ fontSize: "0.6875rem", color: "var(--colors-muted)" }}>Optical 660nm</span>
        </div>
        <CometDial value={98} size={42} strokeWidth={4} color="#0284c7" />
      </div>

      {/* 3. Interstitial Glucose (CGM) */}
      <div
        style={{
          background: "var(--colors-canvas)",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-md)",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 600 }}>
            CGM Glucose
          </span>
          <Droplet size={14} color="#f59e0b" />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--colors-ink)" }}>
            <CountUp to={94} duration={2.2} />
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--colors-muted)" }}>mg/dL</span>
        </div>
        <span style={{ fontSize: "0.6875rem", color: "var(--colors-success)" }}>Optimal eAG</span>
      </div>

      {/* 4. Skin Core Temperature */}
      <div
        style={{
          background: "var(--colors-canvas)",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-md)",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 600 }}>
            Skin Temp
          </span>
          <Thermometer size={14} color="#8b5cf6" />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--colors-ink)" }}>
            <CountUp to={36.6} decimals={1} duration={1.8} />
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--colors-muted)" }}>°C</span>
        </div>
        <span style={{ fontSize: "0.6875rem", color: "var(--colors-muted)" }}>Thermocouple</span>
      </div>

      {/* 5. Battery & Telemetry Stream */}
      <div
        style={{
          background: "var(--colors-canvas)",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-md)",
          padding: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ fontSize: "0.7rem", color: "var(--colors-muted)", textTransform: "uppercase", fontWeight: 600 }}>
            Battery Reserve
          </span>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--colors-ink)" }}>
            <CountUp to={88} duration={2} suffix="%" />
          </div>
          <span style={{ fontSize: "0.6875rem", color: "var(--colors-muted)", fontFamily: "var(--font-mono)" }}>
            <DecryptedText text="BLE_5.4" speed={60} />
          </span>
        </div>
        <CometDial value={88} size={42} strokeWidth={4} color="#10b981" />
      </div>
    </div>
  );
}
