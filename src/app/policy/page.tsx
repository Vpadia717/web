import Link from "next/link";
import { ArrowLeft, Activity, ShieldCheck, CheckCircle2, AlertOctagon, Terminal, FileCode2, Lock } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "User Acceptable Use Policy & Research Governance | LongevityOS",
  description:
    "Clinical research data access rules, acceptable sensor usage standards, leakage prevention enforcement, and cryptographic telemetry integrity guidelines.",
};

export default function PolicyPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--colors-canvas)", color: "var(--colors-ink)" }}>
      {/* ─── Top Minimal Navigation ─── */}
      <header
        style={{
          borderBottom: "1px solid var(--colors-hairline)",
          background: "var(--colors-surface-glass)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            padding: "0.875rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "var(--colors-body)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Platform</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: "var(--colors-primary)",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={13} />
            </span>
            <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>LongevityOS</span>
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                background: "var(--colors-surface-soft)",
                padding: "1px 6px",
                borderRadius: "4px",
                color: "var(--colors-muted)",
              }}
            >
              POLICY
            </span>
          </div>
        </div>
      </header>

      {/* ─── Main Content Container (Cal.com Minimalist Document Layout) ─── */}
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "3.5rem 1.5rem 5rem 1.5rem" }}>
        {/* Document Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.75rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "3px 10px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "#f0fdf4",
                color: "#15803d",
                border: "1px solid #bbf7d0",
              }}
            >
              <ShieldCheck size={14} />
              <span>Institutional Research &amp; Clinical Data Standards</span>
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "var(--colors-ink)",
              margin: "0 0 0.75rem 0",
              lineHeight: 1.15,
            }}
          >
            User Policy &amp; Research Governance
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              fontSize: "0.8125rem",
              color: "var(--colors-muted)",
              borderBottom: "1px solid var(--colors-hairline)",
              paddingBottom: "1.25rem",
            }}
          >
            <span>Revision: September 2026</span>
            <span>Version 2.4.0</span>
            <span>Policy Code: ADNI-AUP-2026</span>
          </div>
        </div>

        {/* ─── Core Purpose Callout ─── */}
        <div
          style={{
            background: "var(--colors-surface-card)",
            border: "1px solid var(--colors-hairline)",
            borderRadius: "var(--rounded-lg)",
            padding: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--colors-ink)", margin: "0 0 0.5rem 0" }}>
            Integrity of Scientific Evidence &amp; Anti-Leakage Standard
          </h3>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--colors-body)", margin: 0 }}>
            This Acceptable Use Policy establishes strict operational boundaries for clinical researchers, trial
            participants, and algorithmic developers utilizing LongevityOS. Our primary objective is to maintain
            unimpeachable scientific truth, eliminate analytical data leakage, and safeguard human biometric sovereignty.
          </p>
        </div>

        {/* ─── Document Sections ─── */}
        <article
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.25rem",
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "var(--colors-body)",
          }}
        >
          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              1. Acceptable Sensor Operations &amp; Anti-Tampering
            </h2>
            <p>
              Users and clinical investigators must ensure that physical hardware terminals are operated in accordance with validated medical engineering specifications:
            </p>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <strong>Skin Contact Calibration:</strong> The fluoroelastomer sport band must maintain snug contact (approximately 15 mmHg pressure) to ensure the 4-wavelength optical PPG puck accurately transduces vascular waveforms.
              </li>
              <li>
                <strong>Hardware Modification Prohibited:</strong> Disassembling the Grade 5 Titanium unibody, bypassing the 5 ATM waterproof seals, or altering optical LED driver circuits voids trial eligibility.
              </li>
              <li>
                <strong>Simulated Data Transparency:</strong> Any synthetic cohort testing or benchmark demonstrations must explicitly declare synthetic provenance rather than masquerading as human patient trial records.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              2. Leakage-Free Data Protocol Enforcement
            </h2>
            <p>
              To prevent artificial metric inflation and uphold clinical publication standards:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "1rem 0" }}>
              {[
                { title: "Strict Pre-Partitioning", text: "Training, validation, and test cohorts must be partitioned BEFORE applying any robust scalers or normalization parameters." },
                { title: "Threshold Isolation", text: "Decision thresholds for classification heads must be fitted solely on validation curves without post-hoc cherry-picking." },
                { title: "Independent Target Derivation", text: "Biological age labels and intervention outcomes must be computed from separate clinical endpoints, never from continuous feature sets." },
              ].map((rule) => (
                <div
                  key={rule.title}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid var(--colors-hairline)",
                    borderRadius: "6px",
                    padding: "0.75rem 1rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: "3px" }} />
                  <div>
                    <span style={{ fontWeight: 700, color: "var(--colors-ink)", fontSize: "0.875rem", marginRight: "0.35rem" }}>
                      {rule.title}:
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--colors-muted)" }}>{rule.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              3. Prohibited Activities
            </h2>
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "var(--rounded-md)",
                padding: "1rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#991b1b", fontWeight: 700 }}>
                <AlertOctagon size={16} />
                <span>Zero-Tolerance Violations</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.8125rem", color: "#7f1d1d", lineHeight: 1.6 }}>
                <li>Attempting to deanonymize study participants through multi-domain biomarker correlation.</li>
                <li>Transmitting unencrypted raw arterial pulse waves over unsecured wireless interfaces.</li>
                <li>Manipulating on-device Ethos-U55 NPU tensor weights to falsely inflate model accuracy scores.</li>
                <li>Exporting clinical trial records without cryptographically signed Institutional Review Board authorization.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              4. Responsible Security Disclosure
            </h2>
            <p>
              We welcome independent academic security audits of our embedded firmware, BLE 5.4 wireless stack, and cryptographic coprocessors. Disclosures submitted through our coordinated vulnerability process receive prompt triage within 72 hours.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
