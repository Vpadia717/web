"use client";

import Link from "next/link";
import { Activity, ShieldCheck, CheckCircle2, Lock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-dark" id="footer">
      <div className="footer-inner">
        {/* ─── Top Brand & Status Row ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
            paddingBottom: "2.5rem",
            marginBottom: "2.5rem",
            borderBottom: "1px solid #222222",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                color: "#111111",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Activity size={16} />
            </span>
            <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "1.125rem", letterSpacing: "-0.02em" }}>
              LongevityOS
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                background: "#1f1f23",
                color: "#a1a1aa",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid #333338",
                fontWeight: 600,
              }}
            >
              v2.4
            </span>
          </div>

          {/* Cal.com-Style Real-Time Status Capsule */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "var(--rounded-pill)",
              padding: "4px 14px",
              fontSize: "0.75rem",
              color: "#d4d4d8",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
              }}
            />
            <span style={{ fontWeight: 500 }}>All Systems Operational</span>
            <span style={{ color: "#52525b" }}>·</span>
            <span style={{ color: "#a1a1aa" }}>Edge-TinyML Privacy</span>
            <span style={{ color: "#52525b" }}>·</span>
            <span style={{ color: "#a1a1aa" }}>HIPAA Verified</span>
          </div>
        </div>

        {/* ─── 4-Column Navigation Grid ─── */}
        <div className="footer-grid">
          {/* Column 1: Hardware & Device */}
          <div className="footer-col">
            <h4>Hardware &amp; Terminal</h4>
            <ul>
              <li><a href="#device">AURA-1 Bio-Chronos™</a></li>
              <li><a href="#device">3D Interactive Prototype</a></li>
              <li><a href="#hardware-diagram-showcase">Circuit Architecture (6 Subsystems)</a></li>
              <li><a href="#hardware-diagram-showcase">100% Recycled &amp; Bio-FKM Materials</a></li>
              <li><a href="#device">Live Sensor Telemetry HUD</a></li>
            </ul>
          </div>

          {/* Column 2: AI & Biomarkers */}
          <div className="footer-col">
            <h4>Models &amp; Intelligence</h4>
            <ul>
              <li><a href="#features">42 Multimodal Biomarkers</a></li>
              <li><a href="#architecture">Cross-Modality Attention Pipeline</a></li>
              <li><a href="#dashboard">Leakage-Free Validation (97.8% AUC)</a></li>
              <li><a href="#performance">5 Randomized Intervention Arms</a></li>
              <li><a href="#science">ADNI Neuroimaging V2 Pipeline</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Governance (Dedicated Routes) */}
          <div className="footer-col">
            <h4>Legal &amp; Governance</h4>
            <ul>
              <li>
                <Link href="/privacy" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <span>User Privacy Policy</span>
                  <ArrowUpRight size={12} color="#71717a" />
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <span>Terms &amp; Conditions</span>
                  <ArrowUpRight size={12} color="#71717a" />
                </Link>
              </li>
              <li>
                <Link href="/policy" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <span>Acceptable Use Policy</span>
                  <ArrowUpRight size={12} color="#71717a" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <span>Zero-Cloud Privacy Guarantee</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <span>Investigational Device Disclaimer</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Scientific Rigor */}
          <div className="footer-col">
            <h4>Scientific Rigor</h4>
            <ul>
              <li><a href="#science">Evidence Integrity Boundaries</a></li>
              <li><a href="#science">Data Leakage Prevention</a></li>
              <li><a href="#dashboard">Deterministic Cohort Verification</a></li>
              <li><a href="#dashboard">Early Stopping Convergence</a></li>
              <li><a href="#science">Open Science Standards</a></li>
            </ul>
          </div>
        </div>

        {/* ─── Scientific Verification Callout Card ─── */}
        <div
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "var(--rounded-lg)",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "0.8125rem", color: "#a1a1aa", margin: 0, lineHeight: 1.55 }}>
            <strong style={{ color: "#ffffff" }}>Scientific Verification Standard:</strong> Evaluation metrics reflect held-out test cohorts with decision thresholds derived strictly from validation data. Real clinical ingestion mode activates automatically upon dataset audit verification.
          </p>
        </div>

        {/* ─── Footer Bottom Strip ─── */}
        <div className="footer-bottom">
          <div>
            © {currentYear} ADNI Longevity Consortium. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ color: "#a1a1aa", textDecoration: "none", transition: "color 0.15s ease" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "#a1a1aa", textDecoration: "none", transition: "color 0.15s ease" }}>
              Terms of Service
            </Link>
            <Link href="/policy" style={{ color: "#a1a1aa", textDecoration: "none", transition: "color 0.15s ease" }}>
              Acceptable Use
            </Link>
            <a href="#hero" style={{ color: "#a1a1aa", textDecoration: "none", transition: "color 0.15s ease" }}>
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
