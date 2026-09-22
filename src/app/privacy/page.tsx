import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Database, EyeOff, KeyRound, FileCheck, Activity } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "User Privacy Policy & Biometric Data Governance | LongevityOS",
  description:
    "Official privacy policy for the AURA-1 Bio-Chronos wearable platform and ADNI Longevity Consortium. Complete zero-cloud TinyML privacy, HIPAA compliance, and on-device data sovereignty.",
};

export default function PrivacyPage() {
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
              LEGAL
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
                background: "#ecfdf5",
                color: "#059669",
                border: "1px solid #a7f3d0",
              }}
            >
              <ShieldCheck size={14} />
              <span>HIPAA &amp; GDPR Compliant · Edge-TinyML Privacy</span>
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
            User Privacy Policy &amp; Data Governance
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
            <span>Effective Date: September 2026</span>
            <span>Version 2.4.0</span>
            <span>Document ID: ADNI-PRIV-2026</span>
          </div>
        </div>

        {/* ─── Executive Summary Highlight Card ─── */}
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "var(--rounded-lg)",
            padding: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Lock size={18} color="#2563eb" />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e40af", margin: 0 }}>
              The Zero-Cloud On-Device Privacy Guarantee
            </h3>
          </div>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#1e3a8a", margin: 0 }}>
            The AURA-1 Bio-Chronos™ hardware system processes high-frequency physiological signals (raw photoplethysmography,
            electrocardiography, and skin thermometry) <strong>exclusively on-device</strong> utilizing dual ARM Cortex-M55 and Ethos-U55
            neural micro-processing units. <strong>Raw waveform biometrics never leave the hardware terminal.</strong> Only
            provably aggregated, differential-privacy calibrated biological age embeddings are generated.
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
              1. Categories of Biometric &amp; Clinical Information Collected
            </h2>
            <p>
              When operating the AURA-1 Bio-Chronos™ wearable hardware and the LongevityOS platform, the system captures telemetry strictly categorized under approved institutional geroscience trial protocols:
            </p>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <strong>Physiological Waveforms:</strong> Optical arterial pulse curves (4-wavelength PPG at 100 Hz), single-lead differential electrocardiography (ECG at 250 Hz), continuous dermal thermometry (±0.05 °C resolution), and 6-axis kinematic accelerometry.
              </li>
              <li>
                <strong>Molecular &amp; Assay Data:</strong> Optional cohort-linked multi-omics tables, including circulating senescent burden indices (p16INK4a, p21), inflammatory cytokines (IL-6, TNF-α, hs-CRP), and metabolomic NAD+ reserve proxies.
              </li>
              <li>
                <strong>Clinical Cognitive Assessments:</strong> ADNI Executive Composite Scores, memory benchmarks, and functional isometric grip dynamometry.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              2. On-Device TinyML Processing Architecture
            </h2>
            <p>
              Unlike traditional commercial fitness trackers that stream continuous raw biometric streams to remote servers, LongevityOS enforces localized execution:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
                margin: "1.25rem 0",
              }}
            >
              <div
                style={{
                  background: "var(--colors-surface-card)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem" }}>
                  <EyeOff size={16} color="#059669" />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>No Cloud Waveforms</span>
                </div>
                <p style={{ fontSize: "0.8125rem", margin: 0, color: "var(--colors-muted)" }}>
                  Continuous sensor streams are buffered in volatile on-chip SRAM and overwritten every 10 seconds.
                </p>
              </div>

              <div
                style={{
                  background: "var(--colors-surface-card)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem" }}>
                  <KeyRound size={16} color="#2563eb" />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>AES-256-GCM Secure Enclave</span>
                </div>
                <p style={{ fontSize: "0.8125rem", margin: 0, color: "var(--colors-muted)" }}>
                  Stored biological baseline summaries are encrypted using dedicated hardware cryptographic coprocessors.
                </p>
              </div>

              <div
                style={{
                  background: "var(--colors-surface-card)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem" }}>
                  <Database size={16} color="#8b5cf6" />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--colors-ink)" }}>Differential Privacy (ε=0.5)</span>
                </div>
                <p style={{ fontSize: "0.8125rem", margin: 0, color: "var(--colors-muted)" }}>
                  Aggregated research outputs inject calibrated Laplacian noise to mathematically prevent cohort re-identification.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              3. HIPAA, GDPR &amp; Clinical Regulatory Compliance
            </h2>
            <p>
              The ADNI Longevity Consortium complies with the Health Insurance Portability and Accountability Act (HIPAA), the Health Information Technology for Economic and Clinical Health Act (HITECH), and the General Data Protection Regulation (GDPR, Regulation EU 2016/679):
            </p>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <strong>Zero Commercial Monetization:</strong> Biometric telemetry is never sold, licensed, or utilized for targeted advertising or third-party profiling.
              </li>
              <li>
                <strong>Investigational Consent Boundaries:</strong> All participants retain right of withdrawal. Upon study termination, local cryptographic keys are erased, rendering historical embeddings permanently irrecoverable.
              </li>
              <li>
                <strong>Audit Logs:</strong> Cryptographic access logs record all local export interactions for review by Institutional Review Boards (IRBs).
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              4. User Rights &amp; Data Sovereignty
            </h2>
            <p>
              Under applicable health data protection statutes, users retain total control over their physiological records:
            </p>
            <ol style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><strong>Right to Complete Export:</strong> Download all local model inferences and calibration curves in standardized FHIR/JSON formats.</li>
              <li><strong>Right to Hardware Sanitization:</strong> Perform a hardware-level factory purge via the physical Digital Crown + Side Action Button holding combination (10 seconds).</li>
              <li><strong>Right to Restrict Processing:</strong> Disable optical photoplethysmography or continuous glucose estimation at any time while retaining standard chronometer functionality.</li>
            </ol>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              5. Security Vulnerability Disclosure &amp; Inquiries
            </h2>
            <p>
              For data governance inquiries, IRB compliance verification, or responsible vulnerability disclosures, contact the ADNI Longevity Data Protection Officer:
            </p>
            <div
              style={{
                background: "var(--colors-surface-soft)",
                border: "1px solid var(--colors-hairline)",
                borderRadius: "var(--rounded-md)",
                padding: "1rem 1.25rem",
                fontSize: "0.875rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              <div>ADNI Longevity Consortium — Office of Data Protection</div>
              <div>Email: privacy@adni-longevity.org</div>
              <div>PGP Fingerprint: 4E92 B3A1 07FD 8C29 55EE  19F4 B291 A004 8831 2C40</div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
