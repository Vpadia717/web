"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import SectionScrollNav from "@/components/layout/SectionScrollNav";
import Footer from "@/components/layout/Footer";
import MetricsHero from "@/components/dashboard/MetricsHero";
import TrainingLoss from "@/components/dashboard/TrainingLoss";
import ModelComparison from "@/components/dashboard/ModelComparison";
import FeatureCards from "@/components/dashboard/FeatureCards";
import ArchitecturePipeline from "@/components/dashboard/ArchitecturePipeline";
import WearablePrototypeViewer from "@/components/wearable/WearablePrototypeViewer";
import ShinyText from "@/components/bits/ShinyText";
import CountUp from "@/components/bits/CountUp";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Dna,
  Layers,
  FileCheck,
  Brain,
  Sliders,
  CheckCircle2,
  Lock,
} from "lucide-react";

/* 3D background subtle particle field */
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
});

export default function Home() {
  const interventionArms = [
    { label: "Control", desc: "Vehicle baseline", icon: <ShieldCheck size={22} color="#2563eb" /> },
    { label: "Senolytic", desc: "Dasatinib + Quercetin", icon: <Sparkles size={22} color="#ec4899" /> },
    { label: "NAD+ Precursor", desc: "NMN supplementation", icon: <Zap size={22} color="#f59e0b" /> },
    { label: "mTOR Inhibitor", desc: "Rapamycin protocol", icon: <Dna size={22} color="#10b981" /> },
    { label: "Combination", desc: "Multi-target synergy", icon: <Layers size={22} color="#8b5cf6" /> },
  ];

  return (
    <>
      <Navbar />
      <SectionScrollNav />

      {/* ═══════════ HERO SECTION (Cal.com 7-5 Layout) ═══════════ */}
      <section className="hero" id="hero">
        <ParticleField />
        <div className="hero-inner">
          <div className="hero-content">
            <div style={{ marginBottom: "1.25rem" }}>
              <span className="badge-pill accent">
                <Activity size={14} />
                <span>Multimodal Longevity AI &amp; Hardware Prototype</span>
              </span>
            </div>

            <h1>
              <ShinyText>Real-Time Longevity</ShinyText>
              <br />
              Monitoring with Wearable AI
            </h1>

            <p className="hero-description">
              Multi-modal integration of 16 optical and bio-electrochemical sensors with on-device
              TinyML attention neural networks for real-time biological age and longevity intervention tracking.
            </p>

            <div className="hero-cta">
              <a href="#device" className="btn btn-primary" id="cta-explore">
                Explore 3D Prototype <ArrowRight size={16} />
              </a>
              <a href="#dashboard" className="btn btn-secondary" id="cta-science">
                Model Evaluation
              </a>
            </div>

            {/* Core Summary Stats */}
            <div className="hero-stats">
              <div>
                <div className="stat-value">
                  <CountUp to={93.1} decimals={1} suffix="%" />
                </div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div>
                <div className="stat-value">
                  <CountUp to={97.8} decimals={1} suffix="%" />
                </div>
                <div className="stat-label">ROC AUC</div>
              </div>
              <div>
                <div className="stat-value">
                  <CountUp to={42} />
                </div>
                <div className="stat-label">Biomarkers</div>
              </div>
              <div>
                <div className="stat-value">
                  <CountUp to={800} />
                </div>
                <div className="stat-label">Cohort Size</div>
              </div>
            </div>
          </div>

          {/* Right Hero Preview Card */}
          <div
            style={{
              background: "var(--colors-surface-card)",
              border: "1px solid var(--colors-hairline)",
              borderRadius: "var(--rounded-xl)",
              padding: "1.75rem",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--colors-primary)",
                    color: "#ffffff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Activity size={13} />
                </span>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--colors-ink)" }}>
                  Hardware Status
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  background: "#ecfdf5",
                  color: "#059669",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  border: "1px solid #a7f3d0",
                  fontWeight: 600,
                }}
              >
                6 SUB-ASSEMBLIES
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {[
                { label: "Display", val: "Curved Sapphire OLED" },
                { label: "Chassis", val: "Grade 5 Titanium" },
                { label: "Optics", val: "4λ PPG + CGM Puck" },
                { label: "Silicon", val: "TinyML Ethos-U55 NPU" },
                { label: "Power", val: "Solid-State Ceramic" },
                { label: "Straps", val: "Fluoroelastomer FKM" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "var(--colors-canvas)",
                    padding: "0.625rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--colors-hairline)",
                  }}
                >
                  <div style={{ fontSize: "0.6875rem", color: "var(--colors-muted)", textTransform: "uppercase" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--colors-ink)" }}>
                    {item.val}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--colors-body)" }}>
              <Sliders size={15} color="var(--colors-brand-accent)" />
              <span>Interactive 3D Assembly &amp; Exploded View available below.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WEARABLE DEVICE 3D PROTOTYPE (CENTERPIECE) ═══════════ */}
      <section className="section" id="device">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <span className="badge-pill" style={{ marginBottom: "0.5rem" }}>
              <Layers size={13} />
              <span>Interactive Hardware Prototype</span>
            </span>
            <h2 className="section-title">The Wearable Device</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>
              Showcase each internal module independently, or assemble them smoothly into one unified bio-band with real-time sensor telemetry.
            </p>
          </div>
        </div>

        {/* 3D Hardware Prototype & Assembly Canvas */}
        <WearablePrototypeViewer />
      </section>

      <div className="divider" />

      {/* ═══════════ MULTIMODAL BIOMARKERS ═══════════ */}
      <section className="section" id="features">
        <span className="badge-pill" style={{ marginBottom: "0.5rem" }}>
          <Dna size={13} />
          <span>Biological Dimensions</span>
        </span>
        <h2 className="section-title">Multimodal Biomarkers</h2>
        <p className="section-subtitle">
          42 quantitative biomarkers harmonized across physiological, molecular, and clinical domains.
        </p>
        <FeatureCards />
      </section>

      <div className="divider" />

      {/* ═══════════ DASHBOARD & EVALUATION ═══════════ */}
      <section className="section" id="dashboard">
        <span className="badge-pill" style={{ marginBottom: "0.5rem" }}>
          <CheckCircle2 size={13} />
          <span>Validation Standards</span>
        </span>
        <h2 className="section-title">Model Performance &amp; Evaluation</h2>
        <p className="section-subtitle">
          Held-out test metrics from the leakage-free evaluation pipeline — decision thresholds selected strictly from validation data.
        </p>

        <MetricsHero />

        <div style={{ marginTop: "2rem" }} className="grid-2">
          <TrainingLoss />
          <ModelComparison />
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ INTERVENTIONS & VALIDATION ═══════════ */}
      <section className="section" id="performance">
        <span className="badge-pill" style={{ marginBottom: "0.5rem" }}>
          <Sparkles size={13} />
          <span>Intervention Arms</span>
        </span>
        <h2 className="section-title">Ablation &amp; Longevity Arms</h2>
        <p className="section-subtitle">
          Cross-modality attention out-performs all single-modality baselines across 5 randomized intervention arms.
        </p>

        {/* Stats Row */}
        <div className="grid-3">
          <div className="stat-card">
            <div className="stat-value" style={{ color: "#2563eb" }}>16</div>
            <div className="stat-label">Training Epochs</div>
            <p style={{ fontSize: "0.8125rem", color: "var(--colors-muted)", marginTop: "0.5rem" }}>
              Early stopping convergence (patience=6)
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: "#10b981" }}>5</div>
            <div className="stat-label">CV Folds</div>
            <p style={{ fontSize: "0.8125rem", color: "var(--colors-muted)", marginTop: "0.5rem" }}>
              Stratified cross-validation baseline
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: "#f59e0b" }}>4</div>
            <div className="stat-label">Output Heads</div>
            <p style={{ fontSize: "0.8125rem", color: "var(--colors-muted)", marginTop: "0.5rem" }}>
              Response · Bio-Age · Resilience · Healthspan
            </p>
          </div>
        </div>

        {/* Intervention Arms Grid */}
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--colors-ink)", marginBottom: "1rem" }}>
            Intervention Protocols
          </h3>
          <div className="grid-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {interventionArms.map((arm, i) => (
              <div
                key={arm.label}
                className="cal-card"
                style={{ textAlign: "center", padding: "1.5rem 1rem" }}
                id={`arm-${i}`}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--colors-canvas)",
                    border: "1px solid var(--colors-hairline)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  {arm.icon}
                </div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--colors-ink)", marginBottom: "0.25rem" }}>
                  {arm.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)" }}>
                  {arm.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ NEURAL ARCHITECTURE ═══════════ */}
      <section className="section" id="architecture">
        <span className="badge-pill" style={{ marginBottom: "0.5rem" }}>
          <Brain size={13} />
          <span>Cross-Modality Pipeline</span>
        </span>
        <h2 className="section-title">Neural Architecture</h2>
        <p className="section-subtitle">
          Cross-modality attention coupled with temporal GRU memory — hover each stage to inspect dimension representations.
        </p>
        <ArchitecturePipeline />
      </section>

      <div className="divider" />

      {/* ═══════════ SCIENTIFIC METHODOLOGY ═══════════ */}
      <section className="section" id="science">
        <span className="badge-pill" style={{ marginBottom: "0.5rem" }}>
          <Lock size={13} />
          <span>Verification Integrity</span>
        </span>
        <h2 className="section-title">Scientific Methodology</h2>
        <p className="section-subtitle">
          Methodological guardrails eliminating data leakage and ensuring evidence boundary transparency.
        </p>

        <div className="grid-2">
          {/* Card 1: Leakage Prevention */}
          <div className="cal-card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <ShieldCheck size={20} color="#10b981" />
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>Leakage Prevention</h3>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                "Train/validation/test split partitioned BEFORE any normalization",
                "Robust scalers fitted strictly on training cohort data",
                "Classification thresholds determined from validation data only",
                "Target labels calculated independently of time-series features",
                "No polynomial interaction terms that amplify information bleed",
              ].map((item) => (
                <li key={item} style={{ fontSize: "0.875rem", color: "var(--colors-body)", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Evidence Boundaries */}
          <div className="cal-card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <FileCheck size={20} color="#2563eb" />
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>Evidence Boundaries</h3>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                "Demonstration environment uses deterministic synthetic data",
                "85–94% is the model target envelope, never artificially inflated",
                "Real clinical metrics reported truthfully without calibration overrides",
                "Dataset audit decouples physical file presence from usability",
                "Production mode strictly requires longitudinal tables with metadata",
              ].map((item) => (
                <li key={item} style={{ fontSize: "0.875rem", color: "var(--colors-body)", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ADNI Alzheimer's MRI Extension */}
        <div className="cal-card" style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Brain size={20} color="#ec4899" />
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>Alzheimer&apos;s Neuroimaging Pipeline (ADNI V2)</h3>
          </div>
          <div className="grid-3" style={{ marginBottom: "1rem" }}>
            <div>
              <div className="stat-value" style={{ fontSize: "1.875rem", color: "#ec4899" }}>
                <CountUp to={40} />
              </div>
              <div className="stat-label">MRI Biomarkers</div>
            </div>
            <div>
              <div className="stat-value" style={{ fontSize: "1.875rem", color: "#ec4899" }}>
                <CountUp to={8} />
              </div>
              <div className="stat-label">Classifiers</div>
            </div>
            <div>
              <div className="stat-value" style={{ fontSize: "1.875rem", color: "#ec4899" }}>
                <CountUp to={3} />
              </div>
              <div className="stat-label">Classes (CN / MCI / AD)</div>
            </div>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--colors-body)", margin: 0, lineHeight: 1.6 }}>
            Integrated neurocognitive classification module with ADNI-validated ground truth, leakage-free cross-validation, and 30 publication-quality analytical figures at 300 DPI.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
