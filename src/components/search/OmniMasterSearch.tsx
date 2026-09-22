"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  CircuitBoard,
  Layers,
  Cpu,
  Dna,
  Activity,
  Brain,
  Shield,
  Zap,
  Radio,
  BatteryCharging,
  Eye,
  CheckCircle2,
  Lock,
  Waves,
  Heart,
  Droplet,
  Moon,
  ChevronRight,
  Compass,
  Wifi,
} from "lucide-react";

export interface SearchItem {
  id: string;
  title: string;
  category: "routes" | "hardware" | "circuits" | "biomarkers" | "protocols" | "models";
  categoryLabel: string;
  description: string;
  targetId: string;
  keywords: string[];
  icon: React.ReactNode;
  badge?: string;
  url?: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  // ─── 1. Routes & Major Sections ───
  {
    id: "route-hero",
    title: "Overview & Real-Time Longevity AI",
    category: "routes",
    categoryLabel: "Navigation Routes",
    description: "Multi-modal AI overview, core platform stats (93.1% accuracy, 97.8% AUC), and mission statement.",
    targetId: "hero",
    keywords: ["overview", "hero", "accuracy", "roc", "auc", "home", "stats"],
    icon: <Sparkles size={16} color="#2563eb" />,
    badge: "Section 01",
  },
  {
    id: "route-device",
    title: "3D Wearable Device & Watch Reveal",
    category: "routes",
    categoryLabel: "Navigation Routes",
    description: "Standalone 3D Apple Watch launch presentation with 360° studio turntable, retina dial, and band customizer.",
    targetId: "device",
    keywords: ["3d", "wearable", "device", "watch", "apple", "prototype", "bands", "titanium"],
    icon: <Layers size={16} color="#10b981" />,
    badge: "Section 02",
  },
  {
    id: "route-features",
    title: "Multimodal Biomarkers Stream",
    category: "routes",
    categoryLabel: "Navigation Routes",
    description: "Minimalist 3-pillar breakdown of 42 harmonized wearable, molecular, and cognitive biomarkers.",
    targetId: "features",
    keywords: ["biomarkers", "multimodal", "features", "hrv", "glucose", "cgm", "plasma", "senescence"],
    icon: <Dna size={16} color="#8b5cf6" />,
    badge: "Section 03",
  },
  {
    id: "route-dashboard",
    title: "Model Performance & Held-Out Test",
    category: "routes",
    categoryLabel: "Navigation Routes",
    description: "Leakage-free cross-validation metrics, training convergence loss curves, and ablation benchmarks.",
    targetId: "dashboard",
    keywords: ["evaluation", "metrics", "dashboard", "loss", "training", "ablation", "models"],
    icon: <CheckCircle2 size={16} color="#f59e0b" />,
    badge: "Section 04",
  },
  {
    id: "route-performance",
    title: "Intervention Arms & Ablation",
    category: "routes",
    categoryLabel: "Navigation Routes",
    description: "5 randomized longevity protocols: Senolytics, NAD+ precursors, mTOR inhibitors, and combinations.",
    targetId: "performance",
    keywords: ["interventions", "senolytic", "nad", "nmn", "mtor", "rapamycin", "arms", "protocols"],
    icon: <Activity size={16} color="#ec4899" />,
    badge: "Section 05",
  },
  {
    id: "route-architecture",
    title: "Cross-Modality Neural Architecture",
    category: "routes",
    categoryLabel: "Navigation Routes",
    description: "4-stage pipeline: Input alignment, cross-modality attention, temporal GRU, and ARM Ethos-U55 NPU execution.",
    targetId: "architecture",
    keywords: ["architecture", "neural", "attention", "gru", "ethos", "npu", "cortex", "tinyml"],
    icon: <Brain size={16} color="#0d9488" />,
    badge: "Section 06",
  },
  {
    id: "route-circuits",
    title: "AURA-1 Bio-Chronos Circuit Schematics",
    category: "routes",
    categoryLabel: "Navigation Routes",
    description: "Complete electronic hardware architecture: PMIC, analog front-end, BLE 5.4, UWB, and circular materials.",
    targetId: "hardware-diagram-showcase",
    keywords: ["circuits", "schematic", "hardware", "chips", "pmic", "afe", "npu", "recycled", "eco"],
    icon: <CircuitBoard size={16} color="#0284c7" />,
    badge: "Hardware",
  },
  {
    id: "route-privacy",
    title: "User Privacy Policy & Data Governance",
    category: "routes",
    categoryLabel: "Legal & Compliance",
    description: "100% on-device TinyML zero-cloud privacy guarantee, HIPAA/GDPR standards, and local cryptographic enclave.",
    targetId: "",
    url: "/privacy",
    keywords: ["privacy", "policy", "gdpr", "hipaa", "security", "data", "confidentiality", "legal"],
    icon: <Lock size={16} color="#059669" />,
    badge: "/privacy",
  },
  {
    id: "route-terms",
    title: "Terms & Conditions of Operation",
    category: "routes",
    categoryLabel: "Legal & Compliance",
    description: "Investigational device disclosures, clinical trial usage agreement, and research governance boundaries.",
    targetId: "",
    url: "/terms",
    keywords: ["terms", "conditions", "disclaimer", "investigational", "fda", "legal", "liability", "agreement"],
    icon: <Shield size={16} color="#d97706" />,
    badge: "/terms",
  },
  {
    id: "route-policy",
    title: "Acceptable Use Policy & Research Standards",
    category: "routes",
    categoryLabel: "Legal & Compliance",
    description: "Clinical research integrity rules, sensor anti-tampering standards, and leakage-free analytical protocols.",
    targetId: "",
    url: "/policy",
    keywords: ["policy", "acceptable use", "research", "governance", "tampering", "leakage", "aup"],
    icon: <CheckCircle2 size={16} color="#2563eb" />,
    badge: "/policy",
  },

  // ─── 2. Hardware Sub-Assemblies ───
  {
    id: "hw-display",
    title: "Curved Sapphire Micro-OLED Display",
    category: "hardware",
    categoryLabel: "Hardware Sub-Assemblies",
    description: "2,000-nit sunlight readable Retina micro-OLED panel protected by 9 Mohs scratch-proof sapphire crystal.",
    targetId: "device",
    keywords: ["display", "screen", "oled", "retina", "sapphire", "crystal", "glass"],
    icon: <Eye size={16} color="#0284c7" />,
    badge: "Layer 01",
  },
  {
    id: "hw-chassis",
    title: "Aerospace Grade-5 Titanium Armor",
    category: "hardware",
    categoryLabel: "Hardware Sub-Assemblies",
    description: "Ti-6Al-4V unibody case with knurled Digital Crown, orange accent ring, and 50m waterproof sealing.",
    targetId: "device",
    keywords: ["chassis", "titanium", "case", "armor", "crown", "unibody", "waterproof"],
    icon: <Shield size={16} color="#64748b" />,
    badge: "Layer 02",
  },
  {
    id: "hw-pcb",
    title: "TinyML Neural NPU Board",
    category: "hardware",
    categoryLabel: "Hardware Sub-Assemblies",
    description: "Dual ARM Cortex-M55 + Ethos-U55 NPU computing on-device attention models in 3.2 ms at 0.85 mW.",
    targetId: "device",
    keywords: ["pcb", "npu", "tinyml", "ethos", "cortex", "silicon", "m55", "u55"],
    icon: <Cpu size={16} color="#0d9488" />,
    badge: "Layer 03",
  },
  {
    id: "hw-battery",
    title: "Solid-State Lithium-Ceramic Battery",
    category: "hardware",
    categoryLabel: "Hardware Sub-Assemblies",
    description: "420 mAh non-flammable solid-state pouch cell with magnetic Qi2 rapid wireless charging (25 min).",
    targetId: "device",
    keywords: ["battery", "solid state", "power", "ceramic", "qi2", "charging"],
    icon: <BatteryCharging size={16} color="#f59e0b" />,
    badge: "Layer 04",
  },
  {
    id: "hw-sensors",
    title: "Multimodal Ceramic Sensor Puck",
    category: "hardware",
    categoryLabel: "Hardware Sub-Assemblies",
    description: "Zirconia ceramic dome with 4λ optical LEDs (525/660/850/940nm) and dual 316L surgical steel ECG leads.",
    targetId: "device",
    keywords: ["sensors", "puck", "ppg", "ecg", "optical", "ceramic", "zirconia"],
    icon: <Radio size={16} color="#10b981" />,
    badge: "Layer 05",
  },
  {
    id: "hw-band",
    title: "Bio-Circular Fluoroelastomer Sport Band",
    category: "hardware",
    categoryLabel: "Hardware Sub-Assemblies",
    description: "Sculpted bio-FKM polymer strap engineered to maintain optimal 15 mmHg optical coupling pressure.",
    targetId: "device",
    keywords: ["band", "straps", "fkm", "fluoroelastomer", "belts", "sport"],
    icon: <Layers size={16} color="#8b5cf6" />,
    badge: "Layer 06",
  },

  // ─── 3. Circuit Subsystems ───
  {
    id: "cir-pmic",
    title: "PMIC & Qi2 Resonant Charging (Subsystem A)",
    category: "circuits",
    categoryLabel: "Circuit Subsystems",
    description: "MAX77654 micro-PMIC delivering 4 voltage rails with 85dB PSRR linear LDOs for noise-free analog sensing.",
    targetId: "hardware-diagram-showcase",
    keywords: ["pmic", "power", "voltage", "ldo", "charging", "max77654", "rails"],
    icon: <Zap size={16} color="#f59e0b" />,
    badge: "3.3V Rail",
  },
  {
    id: "cir-afe",
    title: "Physiological AFE Front-End (Subsystem B)",
    category: "circuits",
    categoryLabel: "Circuit Subsystems",
    description: "MAX86176 dual-wavelength optical PPG & ECG front-end with 24-bit Sigma-Delta ADC and 100μA ambient cancel.",
    targetId: "hardware-diagram-showcase",
    keywords: ["afe", "max86176", "adc", "ppg", "ecg", "tia", "photodiode", "transimpedance"],
    icon: <Activity size={16} color="#10b981" />,
    badge: "24-bit ΣΔ",
  },
  {
    id: "cir-npu",
    title: "Cortex-M55 & Ethos-U55 NPU (Subsystem C)",
    category: "circuits",
    categoryLabel: "Circuit Subsystems",
    description: "Silicon intelligence executing INT8 quantized neural attention models locally with zero cloud leakage.",
    targetId: "hardware-diagram-showcase",
    keywords: ["npu", "ethos", "cortex", "m55", "compute", "tinyml", "local ai"],
    icon: <Cpu size={16} color="#0d9488" />,
    badge: "3.2 ms",
  },
  {
    id: "cir-rf",
    title: "BLE 5.4 & UWB Precision Ranging (Subsystem D)",
    category: "circuits",
    categoryLabel: "Circuit Subsystems",
    description: "Nordic nRF5340 dual-core BLE 5.4 radio paired with DW3000 UWB for micro-centimeter indoor positioning.",
    targetId: "hardware-diagram-showcase",
    keywords: ["ble", "bluetooth", "uwb", "wireless", "rf", "ranging", "dw3000", "nrf5340"],
    icon: <Wifi size={16} color="#3b82f6" />,
    badge: "BLE 5.4",
  },

  // ─── 4. Key Multimodal Biomarkers ───
  {
    id: "bio-hrv",
    title: "Heart Rate Variability (HRV RMSSD / SDNN)",
    category: "biomarkers",
    categoryLabel: "Multimodal Biomarkers",
    description: "Autonomic nervous system parasympathetic tone derived continuously at 100 Hz from optical PPG pulse waves.",
    targetId: "features",
    keywords: ["hrv", "rmssd", "sdnn", "autonomic", "vagal", "heart rate", "cardiac"],
    icon: <Heart size={16} color="#2563eb" />,
    badge: "Wearable",
  },
  {
    id: "bio-cgm",
    title: "Continuous Glucose Monitoring (CGM Mean & TIR)",
    category: "biomarkers",
    categoryLabel: "Multimodal Biomarkers",
    description: "Sub-dermal interstitial enzymatic glucose micro-transducer measuring glycemic volatility and Time-in-Range.",
    targetId: "features",
    keywords: ["cgm", "glucose", "glycemia", "diabetes", "metabolic", "time in range"],
    icon: <Droplet size={16} color="#2563eb" />,
    badge: "Wearable",
  },
  {
    id: "bio-senescence",
    title: "Cellular Senescence Burden Index",
    category: "biomarkers",
    categoryLabel: "Multimodal Biomarkers",
    description: "High-plex proteomic quantification of circulating p16INK4a, p21, and senescence-associated secretory phenotype (SASP).",
    targetId: "features",
    keywords: ["senescence", "p16", "p21", "sasp", "aging", "cellular", "proteomics"],
    icon: <Dna size={16} color="#10b981" />,
    badge: "Molecular",
  },
  {
    id: "bio-inflammaging",
    title: "Inflammaging Index (IL-6, TNF-α, hs-CRP)",
    category: "biomarkers",
    categoryLabel: "Multimodal Biomarkers",
    description: "Chronic systemic age-related inflammation score predicting cardiovascular and metabolic disease escalation.",
    targetId: "features",
    keywords: ["inflammaging", "inflammation", "il6", "tnf", "crp", "cytokines"],
    icon: <Waves size={16} color="#10b981" />,
    badge: "Molecular",
  },
  {
    id: "bio-nad",
    title: "NAD+ Metabolomic Reserve",
    category: "biomarkers",
    categoryLabel: "Multimodal Biomarkers",
    description: "Nicotinamide adenine dinucleotide cellular energy proxy measuring mitochondrial efficiency and repair potential.",
    targetId: "features",
    keywords: ["nad", "metabolite", "mitochondria", "energy", "sirtuins", "nmn"],
    icon: <Zap size={16} color="#10b981" />,
    badge: "Molecular",
  },
  {
    id: "bio-cognitive",
    title: "ADNI Cognitive Composite Score",
    category: "biomarkers",
    categoryLabel: "Multimodal Biomarkers",
    description: "Longitudinal executive memory and processing speed benchmark harmonized against the ADNI clinical trial cohort.",
    targetId: "features",
    keywords: ["cognitive", "memory", "adni", "alzheimer", "mci", "neuro"],
    icon: <Brain size={16} color="#f59e0b" />,
    badge: "Clinical",
  },
  {
    id: "bio-frailty",
    title: "Multi-Domain Frailty & Grip Dynamometry",
    category: "biomarkers",
    categoryLabel: "Multimodal Biomarkers",
    description: "Physical functional capacity score combining isometric handgrip dynamometry with daily accelerometry step cadence.",
    targetId: "features",
    keywords: ["frailty", "grip", "dynamometry", "functional", "strength", "mobility"],
    icon: <Activity size={16} color="#f59e0b" />,
    badge: "Clinical",
  },

  // ─── 5. Clinical Protocols & AI Models ───
  {
    id: "proto-senolytic",
    title: "Senolytic Therapy (Dasatinib + Quercetin)",
    category: "protocols",
    categoryLabel: "Clinical Protocols",
    description: "2-day intermittent targeted senescent cell ablation showing immediate -2.1 year biological age deceleration.",
    targetId: "performance",
    keywords: ["senolytic", "dasatinib", "quercetin", "senolytics", "protocol", "treatment"],
    icon: <Sparkles size={16} color="#ec4899" />,
    badge: "Intervention",
  },
  {
    id: "proto-nmn",
    title: "NAD+ Precursor Protocol (NMN Supplementation)",
    category: "protocols",
    categoryLabel: "Clinical Protocols",
    description: "Oral NMN metabolic replenishment targeting mitochondrial electron transport and sirtuin activation.",
    targetId: "performance",
    keywords: ["nmn", "nad", "precursor", "supplement", "metabolism"],
    icon: <Zap size={16} color="#f59e0b" />,
    badge: "Intervention",
  },
  {
    id: "model-attention",
    title: "Multimodal Attention + GRU (Champion Model)",
    category: "models",
    categoryLabel: "AI Models & Evaluation",
    description: "State-of-the-art dual-stage neural network achieving 93.1% Accuracy and 97.8% ROC AUC with +16.3% lift.",
    targetId: "dashboard",
    keywords: ["model", "attention", "gru", "neural", "accuracy", "auc", "roc"],
    icon: <CheckCircle2 size={16} color="#10b981" />,
    badge: "97.8% AUC",
  },
];

interface OmniMasterSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OmniMasterSearch({ isOpen, onClose }: OmniMasterSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setActiveFilter("all");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter items matching wild query terms across all keywords & titles
  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    return SEARCH_DATABASE.filter((item) => {
      const matchesFilter = activeFilter === "all" || item.category === activeFilter;
      if (!matchesFilter) return false;
      if (!q) return true;

      const tokens = q.split(/\s+/);
      const searchBlob = `${item.title} ${item.description} ${item.categoryLabel} ${item.keywords.join(" ")}`.toLowerCase();
      return tokens.every((token) => searchBlob.includes(token));
    });
  }, [query, activeFilter]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults.length, activeFilter]);

  // Keyboard navigation: Arrows, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Auto-scroll selected item into view in list
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(".omni-item-selected");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.url) {
      window.location.href = item.url;
      return;
    }
    setTimeout(() => {
      const target = document.getElementById(item.targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Momentary highlight pulse
        target.style.transition = "outline 0.3s ease";
        target.style.outline = "2px solid #2563eb";
        setTimeout(() => {
          target.style.outline = "none";
        }, 1800);
      }
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div
      className="omni-search-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "5rem 1rem 2rem 1rem",
        animation: "fadeIn 0.15s ease-out",
      }}
    >
      <div
        className="omni-search-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "680px",
          background: "#ffffff",
          borderRadius: "var(--rounded-xl)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "scaleIn 0.15s ease-out",
        }}
      >
        {/* ─── Search Bar Input ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--colors-hairline)",
            background: "#ffffff",
          }}
        >
          <Search size={18} color="var(--colors-muted)" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Omni search across all 42 biomarkers, hardware modules, circuits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--colors-ink)",
              fontFamily: "var(--font-sans)",
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{
                border: "none",
                background: "var(--colors-surface-soft)",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--colors-muted)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <X size={12} />
            </button>
          )}
          <kbd
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-mono)",
              background: "var(--colors-surface-soft)",
              border: "1px solid var(--colors-hairline)",
              padding: "2px 6px",
              borderRadius: "4px",
              color: "var(--colors-muted)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* ─── Filter Pills ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.625rem 1.25rem",
            background: "var(--colors-surface-soft)",
            borderBottom: "1px solid var(--colors-hairline)",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[
            { id: "all", label: "All Items" },
            { id: "routes", label: "Sections" },
            { id: "hardware", label: "Hardware" },
            { id: "circuits", label: "Circuits" },
            { id: "biomarkers", label: "Biomarkers" },
            { id: "protocols", label: "Protocols" },
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setActiveFilter(flt.id)}
              style={{
                border: "none",
                background: activeFilter === flt.id ? "#ffffff" : "transparent",
                color: activeFilter === flt.id ? "var(--colors-ink)" : "var(--colors-muted)",
                fontWeight: activeFilter === flt.id ? 600 : 500,
                fontSize: "0.75rem",
                padding: "3px 10px",
                borderRadius: "9999px",
                cursor: "pointer",
                boxShadow: activeFilter === flt.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                whiteSpace: "nowrap",
                transition: "all 0.12s ease",
              }}
            >
              {flt.label}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "var(--colors-muted)", whiteSpace: "nowrap" }}>
            {filteredResults.length} match{filteredResults.length === 1 ? "" : "es"}
          </span>
        </div>

        {/* ─── Results Scroll Container ─── */}
        <div
          ref={listRef}
          style={{
            maxHeight: "360px",
            overflowY: "auto",
            padding: "0.5rem",
          }}
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={isSelected ? "omni-item-selected" : ""}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--rounded-md)",
                    background: isSelected ? "#f1f5f9" : "transparent",
                    cursor: "pointer",
                    transition: "background 0.1s ease",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      backgroundColor: "#ffffff",
                      border: "1px solid var(--colors-hairline)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.15rem" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--colors-ink)" }}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            fontSize: "0.625rem",
                            fontFamily: "var(--font-mono)",
                            background: "var(--colors-surface-soft)",
                            border: "1px solid var(--colors-hairline)",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            color: "var(--colors-muted)",
                            fontWeight: 600,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--colors-muted)",
                        lineHeight: 1.35,
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight size={14} color={isSelected ? "var(--colors-ink)" : "var(--colors-muted)"} />
                </div>
              );
            })
          ) : (
            <div style={{ padding: "3rem 1rem", textAlign: "center", color: "var(--colors-muted)", fontSize: "0.875rem" }}>
              No matches found for &ldquo;{query}&rdquo;. Try searching for <em>HRV</em>, <em>PMIC</em>, <em>NPU</em>, or <em>Senolytic</em>.
            </div>
          )}
        </div>

        {/* ─── Footer Shortcut Keys ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.625rem 1.25rem",
            background: "var(--colors-surface-soft)",
            borderTop: "1px solid var(--colors-hairline)",
            fontSize: "0.6875rem",
            color: "var(--colors-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span><kbd style={{ background: "#ffffff", padding: "1px 5px", borderRadius: "3px", border: "1px solid var(--colors-hairline)" }}>↑↓</kbd> to navigate</span>
            <span><kbd style={{ background: "#ffffff", padding: "1px 5px", borderRadius: "3px", border: "1px solid var(--colors-hairline)" }}>↵</kbd> to jump</span>
            <span><kbd style={{ background: "#ffffff", padding: "1px 5px", borderRadius: "3px", border: "1px solid var(--colors-hairline)" }}>ESC</kbd> to dismiss</span>
          </div>
          <span style={{ fontWeight: 600, color: "var(--colors-brand-accent)" }}>
            Omni Route System
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.97); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 640px) {
          .omni-search-backdrop {
            padding: 1rem !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}
