import Link from "next/link";
import { ArrowLeft, Activity, AlertTriangle, ShieldCheck, Scale, FileText, CheckCircle2 } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions & Clinical Investigational Disclaimer | LongevityOS",
  description:
    "Official Terms and Conditions, Investigational Device Exemption disclosures, and research usage agreement for LongevityOS and AURA-1 Bio-Chronos.",
};

export default function TermsPage() {
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
                background: "#fef3c7",
                color: "#b45309",
                border: "1px solid #fde68a",
              }}
            >
              <Scale size={14} />
              <span>Geroscience Research &amp; Clinical Trial Usage Agreement</span>
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
            Terms &amp; Conditions of Operation
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
            <span>Last Updated: September 2026</span>
            <span>Version 2.4.0</span>
            <span>Document ID: ADNI-TERMS-2026</span>
          </div>
        </div>

        {/* ─── Important Medical & Investigational Device Disclaimer ─── */}
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "var(--rounded-lg)",
            padding: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <AlertTriangle size={18} color="#d97706" />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#92400e", margin: 0 }}>
              FDA Investigational Device &amp; Non-Diagnostic Disclosure
            </h3>
          </div>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#78350f", margin: 0 }}>
            The AURA-1 Bio-Chronos™ hardware system and LongevityOS software models are classified as an
            <strong> Investigational Bio-Telemetry Platform</strong> intended solely for geroscience research trials and
            longitudinal physiological benchmarking. <strong>This device does not provide primary clinical diagnosis, cure,
            mitigation, or treatment of acute cardiovascular or neurological medical conditions.</strong> Users must never substitute
            model estimates for licensed physician consultations or emergency medical services.
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
              1. Acceptance &amp; Eligibility
            </h2>
            <p>
              By accessing, commissioning, or pairing the AURA-1 Bio-Chronos™ terminal with LongevityOS, you acknowledge that you are at least 18 years of age, or an enrolled participant in an accredited Institutional Review Board (IRB) approved clinical trial, and agree to be legally bound by these terms.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              2. Permitted Research &amp; Clinical Use
            </h2>
            <p>
              LongevityOS provides multi-modal biological age decoders and longevity intervention tracking:
            </p>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <strong>Clinical Cohorts:</strong> Authorized investigators may ingest multi-domain biomarker tables (wearable PPG/ECG, plasma proteomics, cognitive benchmarks) to measure therapeutic responses to senolytic, NAD+, or mTOR protocols.
              </li>
              <li>
                <strong>Algorithm Testing:</strong> Researchers may evaluate model ROC AUC, early-stopping convergence, and cross-modality attention matrices under the open academic evaluation framework.
              </li>
              <li>
                <strong>Prohibited Uses:</strong> Reverse engineering firmware cryptographic keys, side-channel differential power analysis attacks on the Cortex-M55 processor, or deploying the system in critical life-support apparatus is strictly forbidden.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              3. Intellectual Property Rights
            </h2>
            <p>
              All proprietary algorithms, including the Cross-Modality Attention + Temporal GRU neural architectures, TinyML quantization weights, CAD geometry of the titanium squircle case, and ceramic transducer layouts, are the intellectual property of the ADNI Longevity Consortium and its affiliated research institutions.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              4. Hardware Warranty &amp; Operational Tolerances
            </h2>
            <p>
              The AURA-1 Bio-Chronos™ watch is engineered with Grade 5 Titanium (Ti-6Al-4V) and Zirconia Ceramic:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                margin: "1rem 0",
              }}
            >
              <div
                style={{
                  background: "var(--colors-surface-card)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "0.875rem",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>Water Resistance</div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--colors-ink)" }}>50 m (ISO 22810:2010)</div>
                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", marginTop: "0.25rem" }}>Shallow swimming &amp; sports</div>
              </div>

              <div
                style={{
                  background: "var(--colors-surface-card)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "0.875rem",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>Operating Temperature</div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--colors-ink)" }}>-20 °C to +60 °C</div>
                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", marginTop: "0.25rem" }}>Solid-state ceramic cell</div>
              </div>

              <div
                style={{
                  background: "var(--colors-surface-card)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "0.875rem",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>Optical Coupling</div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--colors-ink)" }}>15 mmHg Nominal</div>
                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", marginTop: "0.25rem" }}>Fluoroelastomer sport band</div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, the ADNI Longevity Consortium, its researchers, software contributors, and clinical partners shall not be liable for any direct, indirect, incidental, or consequential damages resulting from algorithmic interpretations, sensor calibration variances, or decisions made on the basis of biological age estimations.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.75rem" }}>
              6. Governing Law &amp; Arbitration
            </h2>
            <p>
              These Terms of Operation shall be governed by and construed in accordance with the laws of the State of California and United States Federal healthcare statutes, without regard to conflict of law principles.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
