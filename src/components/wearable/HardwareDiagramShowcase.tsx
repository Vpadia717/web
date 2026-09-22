"use client";

import { useState } from "react";
import {
  Eye,
  Shield,
  Radio,
  Cpu,
  BatteryCharging,
  Layers,
  ArrowRight,
  Sparkles,
  Activity,
  CheckCircle2,
  Lock,
  Zap,
  CircuitBoard,
  Leaf,
  Recycle,
  Wifi,
  Waves,
  Microchip,
  Gauge,
  Boxes,
} from "lucide-react";
import SpotlightCard from "@/components/bits/SpotlightCard";
import BorderGlow from "@/components/bits/BorderGlow";
import ShinyText from "@/components/bits/ShinyText";
import DecryptedText from "@/components/bits/DecryptedText";
import StatusMark from "@/components/bits/StatusMark";
import CometDial from "@/components/bits/CometDial";
import CountUp from "@/components/bits/CountUp";
import PillNav from "@/components/bits/PillNav";

interface HardwareDiagramShowcaseProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
}

interface ComponentDetail {
  id: string;
  name: string;
  purpose: string;
  whyItMatters: string;
  specs: string[];
  icon: React.ReactNode;
  color: string;
  badge: string;
}

interface CircuitBlock {
  id: string;
  title: string;
  subsystem: string;
  chips: string;
  voltage: string;
  power: string;
  description: string;
  circuitRole: string;
  interfaces: string[];
  keyComponents: string[];
  icon: React.ReactNode;
  color: string;
}

interface EcoResource {
  id: string;
  material: string;
  application: string;
  origin: string;
  sustainabilityMetric: string;
  endOfLife: string;
  icon: React.ReactNode;
  color: string;
}

const HARDWARE_COMPONENTS: ComponentDetail[] = [
  {
    id: "display",
    name: "Curved Sapphire Micro-OLED",
    purpose: "Real-time vital display, cardiac telemetry HUD, and immediate arrhythmic haptic alerts.",
    whyItMatters: "Sunlight-readable 2,000-nit micro-OLED panel protected by 9 Mohs scratch-proof crystal. Delivers instantaneous bio-feedback without needing a connected smartphone.",
    specs: ["484×396 px (326 PPI)", "2,000 nits peak brightness", "9 Mohs sapphire hardness", "LTPO 60 Hz ProMotion"],
    icon: <Eye size={18} />,
    color: "#0284c7",
    badge: "LAYER 01 · USER INTERFACE",
  },
  {
    id: "chassis",
    name: "Grade-5 Titanium Armor",
    purpose: "Structural exoskeleton, 50m waterproof hermetic seal, and complete Faraday cage EMI isolation.",
    whyItMatters: "Ti-6Al-4V aerospace titanium alloy withstands 5 ATM water pressure, swimming, and mechanical shock while acting as a passive heat spreader for the NPU.",
    specs: ["31.8 g unibody weight", "5 ATM / 50 m ISO 22810", "±5 μm CNC tolerance", "Knurled digital crown with orange ring"],
    icon: <Shield size={18} />,
    color: "#64748b",
    badge: "LAYER 02 · STRUCTURAL CORE",
  },
  {
    id: "pcb",
    name: "TinyML Neural NPU Board",
    purpose: "Executes on-device cross-modality attention networks for real-time biological age and risk inference.",
    whyItMatters: "Dual Cortex-M55 + Ethos-U55 NPU computes complex temporal GRU models in 3.2 ms at only 0.85 mW, completely eliminating cloud data leakage for HIPAA/GDPR privacy.",
    specs: ["3.2 ms inference latency", "0.85 mW active compute", "16 MB low-leakage SRAM", "BLE 5.4 LE Audio + UWB"],
    icon: <Cpu size={18} />,
    color: "#0d9488",
    badge: "LAYER 03 · SILICON BRAIN",
  },
  {
    id: "battery",
    name: "Solid-State Ceramic Battery",
    purpose: "Supplies non-flammable 7-day multi-sensor power with magnetic Qi2 rapid induction recharging.",
    whyItMatters: "Solid-state lithium ceramic pouch eliminates volatile flammable liquid electrolytes, guaranteeing skin contact safety even during sleep or physical impact.",
    specs: ["420 mAh (1.61 Wh)", "7 days 24/7 continuous run", "Qi2 magnetic fast charge (25 min)", "-20°C to +60°C operating window"],
    icon: <BatteryCharging size={18} />,
    color: "#f59e0b",
    badge: "LAYER 04 · POWER SYSTEM",
  },
  {
    id: "sensors",
    name: "Multimodal Ceramic Sensor Puck",
    purpose: "Transduces continuous arterial pulse, SpO2, continuous interstitial glucose (CGM), and body heat-flux.",
    whyItMatters: "Curved zirconia ceramic dome houses 4-wavelength optical PPG LEDs, dual 316L medical stainless steel ECG leads, and interstitial micro-transducers with direct skin contact.",
    specs: ["4λ optical array (525/660/850/940nm)", "100 Hz PPG / 250 Hz ECG", "Enzymatic glucose transducer", "±0.05 °C dual heat-flux"],
    icon: <Radio size={18} />,
    color: "#10b981",
    badge: "LAYER 05 · TRANSDUCTION DOME",
  },
  {
    id: "straps",
    name: "Fluoroelastomer Bio-Belts & Clasp",
    purpose: "Maintains optimal 15 mmHg sensor-to-skin pressure and prevents motion-induced signal artifacts.",
    whyItMatters: "Medical FKM fluoroelastomer resists degradation from sweat and UV. Inner micro-channels disperse perspiration while the titanium buckle and dual keepers secure a customized fit.",
    specs: ["130–210 mm circumference fit", "15 mmHg controlled skin coupling", "Titanium pin-buckle + keepers", "Internal airflow sweat channels"],
    icon: <Layers size={18} />,
    color: "#8b5cf6",
    badge: "LAYER 06 · ERGONOMIC RETENTION",
  },
];

const CIRCUIT_BLOCKS: CircuitBlock[] = [
  {
    id: "pmic",
    title: "Power Management & Qi2 Charging",
    subsystem: "Subsystem A: Energy Conversion & Regulation",
    chips: "MAX77654 Multi-Output Micro-PMIC + BQ51013B Qi2 Receiver",
    voltage: "3.7V Battery -> 0.8V VDD_CORE, 1.2V VDD_MCU, 1.8V VDD_MEM, 3.3V VDD_ANA",
    power: "Quiescent current < 1.2 μA in deep sleep",
    description: "Converts magnetic flux from the Qi2 induction coil into rectified DC, manages CC/CV charging of the solid-state lithium-ceramic pouch, and synthesizes 4 ultra-clean voltage rails.",
    circuitRole: "Uses ultra-low dropout (LDO) regulators with 85 dB Power Supply Rejection Ratio (PSRR @ 10 kHz) to shield sensitive physiological microvolt biosignals from digital clock noise.",
    interfaces: ["I2C Control Bus (400 kHz)", "Qi2 Resonant LC Tank", "1-Wire Battery Fuel Gauge"],
    keyComponents: ["Qi2 Induction Planar Coil", "Synchronous Buck Converters", "Low-Noise LDO Linear Regulators", "Solid-State Overvoltage Protection IC"],
    icon: <Zap size={18} />,
    color: "#f59e0b",
  },
  {
    id: "afe",
    title: "Physiological Analog Front-End (AFE)",
    subsystem: "Subsystem B: Biosignal Transduction & Conditioning",
    chips: "MAX86176 Dual-Wavelength PPG + Medical ECG Front-End",
    voltage: "3.3V Analog VDD (Ultra-filtered rail)",
    power: "0.22 mW continuous capture at 100 Hz",
    description: "Drives 4-wavelength emitter LEDs in synchronized 25 μs pulses, cancels ambient solar interference up to 100 μA, and amplifies epidermal microvolt potentials for cardiac rhythm detection.",
    circuitRole: "Contains a programmable transimpedance amplifier (TIA) with dynamic feedback resistance (10 kΩ–1 MΩ) feeding a 24-bit Sigma-Delta ADC with 110 dB Signal-to-Noise Ratio (SNR).",
    interfaces: ["SPI High-Speed Interface (16 MHz)", "Differential Lead Inputs", "GPIO Data-Ready Interrupts"],
    keyComponents: ["Transimpedance Amplifier (TIA)", "Ambient Light Cancellation DAC", "24-bit Sigma-Delta ADC", "Right-Leg-Drive (RLD) Circuit"],
    icon: <Activity size={18} />,
    color: "#10b981",
  },
  {
    id: "npu",
    title: "Neural Engine & Host Microcontroller",
    subsystem: "Subsystem C: On-Device Compute & Intelligence",
    chips: "Dual ARM Cortex-M55 (160 MHz) + ARM Ethos-U55 NPU (128 MACs)",
    voltage: "0.8V Core / 1.2V Logic",
    power: "0.85 mW during active 3.2 ms inference",
    description: "The silicon brain of AURA-1. Cortex-M55 handles FreeRTOS task scheduling and sensor fusion DMA, while Ethos-U55 computes on-device INT8 cross-modality attention networks.",
    circuitRole: "Processes multidimensional temporal GRU models entirely locally in SRAM without transmitting raw patient biometrics to external cloud servers, guaranteeing HIPAA/GDPR compliance.",
    interfaces: ["AXI5 Memory Bus", "Dedicated NPU DMA Channels", "Hardware Cryptographic Accelerator"],
    keyComponents: ["Ethos-U55 128 MAC MicroNPU", "Cortex-M55 with Helium SIMD", "16 MB Low-Leakage Retention SRAM", "AES-256-GCM Secure Element"],
    icon: <Cpu size={18} />,
    color: "#0d9488",
  },
  {
    id: "rf",
    title: "Wireless RF & Precision Ranging",
    subsystem: "Subsystem D: Encrypted Telemetry & Positioning",
    chips: "Nordic nRF5340 Dual-Core BLE 5.4 + DW3000 Ultra-Wideband (UWB)",
    voltage: "1.8V VDD_RF",
    power: "4.8 mA TX @ 0 dBm (BLE) / Instantaneous pulse UWB",
    description: "Transmits end-to-end encrypted telemetry packets to clinical terminals and smartphone applications. UWB provides centimeter-level positioning for localized clinical workflows.",
    circuitRole: "Features a 50Ω balanced-to-unbalanced (balun) matching network paired with an omnidirectional ceramic patch antenna integrated into the watch bezel.",
    interfaces: ["2.4 GHz RF Matching Network", "UWB Channelling (Channel 5/9)", "SWD Debugging"],
    keyComponents: ["BLE 5.4 Long-Range PHY", "UWB Transceiver (802.15.4z)", "Pi-Filter Matching Network", "Ceramic Chip Antenna"],
    icon: <Wifi size={18} />,
    color: "#3b82f6",
  },
  {
    id: "sensors-bus",
    title: "Peripheral Motion & Environmental Hub",
    subsystem: "Subsystem E: Kinematic & Environmental Telemetry",
    chips: "Bosch BMI270 6-Axis IMU + BMP581 High-Precision Barometer",
    voltage: "1.8V VDD_IO",
    power: "14.5 μA continuous motion tracking",
    description: "Monitors 3D user acceleration, angular velocity, micro-tremors, and atmospheric elevation. Provides real-time motion compensation to remove optical PPG motion artifacts.",
    circuitRole: "On-chip 2 KB FIFO buffer stores kinematic trajectories and triggers low-power step, fall, and gesture interrupts, keeping the main processor asleep until required.",
    interfaces: ["I3C / SPI Shared Peripheral Bus", "Motion Interrupt Lines (INT1/INT2)"],
    keyComponents: ["3-Axis 16-bit Accelerometer", "3-Axis Gyroscope", "MEMS Piezoresistive Barometer", "Dual Heat-Flux NTC Thermistors"],
    icon: <Gauge size={18} />,
    color: "#8b5cf6",
  },
  {
    id: "display-haptic",
    title: "Display Controller & Taptic Actuator",
    subsystem: "Subsystem F: Human-Machine Interface & Bio-Feedback",
    chips: "SSD1317 OLED Driver + TI DRV2605L Haptic Driver",
    voltage: "1.8V Logic / 12V OLED Booster",
    power: "Dynamic 15–45 mW depending on OLED APL (Average Picture Level)",
    description: "Drives the 484×396 curved Retina Micro-OLED via a 2-lane MIPI-DSI interface. DRV2605L drives the Linear Resonant Actuator (LRA) for realistic tactile dial clicks and cardiac alerts.",
    circuitRole: "Provides instantaneous bio-feedback waveforms without waking the host processor, using internal display RAM and hardware auto-resonance frequency tracking for the LRA motor.",
    interfaces: ["MIPI DSI 2-Lane (500 Mbps/lane)", "I2C Haptic Control", "Capacitive Touch I2C"],
    keyComponents: ["Curved Micro-OLED Panel", "Charge-Pump Step-Up Booster", "Linear Resonant Actuator (LRA)", "Capacitive Touch Controller"],
    icon: <Eye size={18} />,
    color: "#ec4899",
  },
];

const ECO_RESOURCES: EcoResource[] = [
  {
    id: "titanium",
    material: "100% Recycled Aerospace Titanium (Ti-6Al-4V)",
    application: "Watch unibody case, digital crown, push button, and band buckle",
    origin: "Reclaimed manufacturing scrap from certified aerospace machining, vacuum-arc remelted",
    sustainabilityMetric: "78% lower carbon footprint than virgin titanium ore mining; zero toxic cyanide leaching",
    endOfLife: "100% infinitely recyclable in closed-loop metallurgical metallurgy without structural degradation",
    icon: <Shield size={18} />,
    color: "#64748b",
  },
  {
    id: "fkm",
    material: "Bio-Circular Fluoroelastomer (Bio-FKM)",
    application: "Ocean Sport Band, sensor hermetic O-rings, and lug gasket dampers",
    origin: "65% bio-based carbon derived from certified European pine wood rosin and industrial microalgae lipids",
    sustainabilityMetric: "42% reduction in petroleum feedstocks; free of harmful halogenated PFAS plasticizers",
    endOfLife: "Thermal depolymerization into high-purity monomer feedstocks for remanufacturing",
    icon: <Leaf size={18} />,
    color: "#10b981",
  },
  {
    id: "battery-mat",
    material: "Recycled Lithium-Ceramic Solid-State Cell",
    application: "Non-flammable solid-state 420 mAh energy storage pouch",
    origin: "Hydro-metallurgically recycled lithium cobalt oxide (LCO) and inorganic ceramic garnet electrolyte",
    sustainabilityMetric: "Zero flammable liquid solvents; eliminated toxic dendrite short-circuit combustion risk",
    endOfLife: "Direct mechanical hydrometallurgical recovery with 96% critical metal yield",
    icon: <BatteryCharging size={18} />,
    color: "#f59e0b",
  },
  {
    id: "gold-tin",
    material: "100% Recycled Gold Plating & Lead-Free Solder",
    application: "PCB microvia plating, sensor wire bonding, and SAC305 SMT component solder joints",
    origin: "Closed-loop certified recycled electronic gold (E-waste) and conflict-free refined tin",
    sustainabilityMetric: "Eliminates artisanal mercury/cyanide river extraction; 100% RoHS & REACH compliant",
    endOfLife: "Pyrometallurgical precious metal reclamation via standard e-scrap hydrometallurgy",
    icon: <Recycle size={18} />,
    color: "#eab308",
  },
  {
    id: "rare-earth",
    material: "100% Recycled Rare Earth Elements (NdFeB)",
    application: "Taptic Engine LRA motor, Qi2 inductive alignment ring, and speaker transducers",
    origin: "Recycled Neodymium-Iron-Boron magnets salvaged from industrial turbine and EV motors",
    sustainabilityMetric: "90% reduction in radioactive thorium and heavy-metal tailings associated with rare-earth mining",
    endOfLife: "Hydrogen decrepitation processing for direct magnet-to-magnet re-sintering",
    icon: <CircuitBoard size={18} />,
    color: "#8b5cf6",
  },
  {
    id: "packaging",
    material: "100% Plastic-Free Biodegradable Packaging",
    application: "Packaging cradle, presentation box, and transport sleeve",
    origin: "Unbleached fast-growing bamboo fibers and repurposed sugarcane bagasse agricultural waste",
    sustainabilityMetric: "Zero plastic film; printed with non-toxic VOC-free organic soy inks",
    endOfLife: "Certified 100% home-compostable in soil within 90 days without chemical residues",
    icon: <Boxes size={18} />,
    color: "#059669",
  },
];

const SIGNAL_STAGES = [
  {
    step: "01",
    title: "Optical & Electrical Excitation",
    desc: "AFE drives 525nm, 660nm, and 940nm LEDs in synchronized 25 μs bursts at 100 Hz. Differential ECG electrodes contact skin.",
    circuitDetail: "Current Source: 8-bit programmable (0-100 mA) · LED Rise Time < 500 ns",
    icon: <Zap size={16} color="#f59e0b" />,
  },
  {
    step: "02",
    title: "Tissue Transduction & Capture",
    desc: "Light scatters through microvascular capillary beds (Beer-Lambert modulation). Epidermal cardiac voltages detected.",
    circuitDetail: "PIN Photodiodes produce nanoamp (nA) currents proportional to arterial pulsatility",
    icon: <Activity size={16} color="#10b981" />,
  },
  {
    step: "03",
    title: "Analog Front-End (AFE) Conditioning",
    desc: "Transimpedance amplifier converts current to voltage. Ambient sunlight DC is canceled by DAC feedback loop.",
    circuitDetail: "24-bit Sigma-Delta ADC · 110 dB SNR · Dynamic Ambient Cancellation up to 100 μA",
    icon: <Waves size={16} color="#0284c7" />,
  },
  {
    step: "04",
    title: "DMA Buffering & Motion Damping",
    desc: "Raw digital frames stream via DMA directly into SRAM. 6-axis IMU data filters out running and walking artifacts.",
    circuitDetail: "Helium Vector SIMD Butterworth bandpass filtering (0.5-4.5 Hz cardiac band)",
    icon: <Microchip size={16} color="#0d9488" />,
  },
  {
    step: "05",
    title: "Ethos-U55 TinyML Neural Inference",
    desc: "Cross-modality attention network runs across 16 physiological channels in 3.2 ms to calculate real-time biological age.",
    circuitDetail: "128 MAC units/cycle · INT8 quantized weights · 0.85 mW total energy budget",
    icon: <Cpu size={16} color="#8b5cf6" />,
  },
  {
    step: "06",
    title: "Display HUD & Secure Sync",
    desc: "Immediate vital update on curved OLED display and AES-256 encrypted BLE 5.4 telemetry transmission.",
    circuitDetail: "Frame-buffer blit via 2-lane MIPI DSI · AES-256-GCM hardware encryption",
    icon: <Lock size={16} color="#ec4899" />,
  },
];

export default function HardwareDiagramShowcase({
  activeModuleId,
  onSelectModule,
}: HardwareDiagramShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>("circuit");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>("pmic");

  const selectedOrHovered = hoveredId || (activeModuleId !== "all" ? activeModuleId : "sensors");
  const activeDetail = HARDWARE_COMPONENTS.find((c) => c.id === selectedOrHovered) || HARDWARE_COMPONENTS[4];
  const activeCircuit = CIRCUIT_BLOCKS.find((c) => c.id === selectedCircuitId) || CIRCUIT_BLOCKS[0];

  const NAV_ITEMS = [
    { id: "circuit", label: "Circuit Architecture", icon: <CircuitBoard size={14} /> },
    { id: "modules", label: "Sub-Assemblies", icon: <Layers size={14} /> },
    { id: "eco", label: "Recycled & Bio Materials", icon: <Leaf size={14} /> },
  ];

  return (
    <div
      style={{
        background: "var(--colors-surface-card)",
        border: "1px solid var(--colors-hairline)",
        borderRadius: "var(--rounded-xl)",
        padding: "1.75rem",
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
      }}
      id="hardware-diagram-showcase"
    >
      {/* ─── Header & Device Identity with React Bits (ShinyText & DecryptedText) ─── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="badge-pill accent" style={{ margin: 0 }}>
              <Sparkles size={13} />
              <span>Official Hardware Architecture</span>
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                background: "#f0fdf4",
                color: "#15803d",
                padding: "3px 8px",
                borderRadius: "9999px",
                border: "1px solid #bbf7d0",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <StatusMark status="active" size={6} showRipple={true} />
              <DecryptedText text="FDA CLASS II INVESTIGATIONAL" speed={25} />
            </span>
          </div>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--colors-ink)", letterSpacing: "-0.02em", margin: "0.25rem 0" }}>
            <ShinyText>AURA-1 Bio-Chronos™</ShinyText> Hardware System
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--colors-muted)", maxWidth: "720px", margin: "0.25rem 0 0 0", lineHeight: 1.5 }}>
            Comprehensive engineering breakdown of the AURA-1 Bio-Chronos wearable: mechanical architecture, low-noise analog signal circuits, on-device TinyML compute engines, and 100% circular recycled resources.
          </p>
        </div>

        {/* React Bits: PillNav for smooth layout-animated tab switching */}
        <PillNav
          items={NAV_ITEMS}
          activeId={activeTab}
          onChange={setActiveTab}
          layoutId="hardwareTabNavBubble"
        />
      </div>

      {/* ─── React Bits: Quick Hardware Metrics Strip with CountUp ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "0.75rem",
          padding: "0.875rem 1.25rem",
          background: "var(--colors-canvas)",
          border: "1px solid var(--colors-hairline)",
          borderRadius: "var(--rounded-lg)",
        }}
      >
        {[
          { label: "SENSOR CHANNELS", val: 42, suffix: " Ch", icon: <Radio size={14} color="#0284c7" /> },
          { label: "AFE RESOLUTION", val: 24, suffix: "-bit ΣΔ", icon: <Waves size={14} color="#10b981" /> },
          { label: "NPU LATENCY", val: 3.2, suffix: " ms", decimals: 1, icon: <Cpu size={14} color="#8b5cf6" /> },
          { label: "POWER BUDGET", val: 0.85, suffix: " mW", decimals: 2, icon: <Zap size={14} color="#f59e0b" /> },
          { label: "CIRCULAR ALLOY", val: 100, suffix: "% Ti", icon: <Shield size={14} color="#64748b" /> },
        ].map((stat, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "6px",
                backgroundColor: "#ffffff",
                border: "1px solid var(--colors-hairline)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: "0.625rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)", fontWeight: 600 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--colors-ink)" }}>
                <CountUp to={stat.val} decimals={stat.decimals || 0} suffix={stat.suffix} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── TAB 1: CIRCUIT ARCHITECTURE & SCHEMATICS (Enhanced with SpotlightCard & BorderGlow) ─── */}
      {activeTab === "circuit" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Circuit Interactive Block Matrix using React Bits: SpotlightCard */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {CIRCUIT_BLOCKS.map((block) => {
              const isSelected = selectedCircuitId === block.id;

              return (
                <SpotlightCard
                  key={block.id}
                  onClick={() => setSelectedCircuitId(block.id)}
                  spotlightColor={`${block.color}15`}
                  style={{
                    background: isSelected ? "#ffffff" : "var(--colors-canvas)",
                    border: isSelected ? `2px solid ${block.color}` : "1px solid var(--colors-hairline)",
                    borderRadius: "var(--rounded-lg)",
                    padding: "1.25rem",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxShadow: isSelected ? "0 8px 24px rgba(0,0,0,0.08)" : "var(--shadow-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          backgroundColor: `${block.color}15`,
                          color: block.color,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {block.icon}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <StatusMark status="active" size={6} showRipple={isSelected} />
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontFamily: "var(--font-mono)",
                            color: block.color,
                            fontWeight: 700,
                          }}
                        >
                          {block.voltage.split("->")[0].trim()}
                        </span>
                      </div>
                    </div>

                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.25rem" }}>
                      {block.title}
                    </h4>
                    <span style={{ fontSize: "0.6875rem", color: "var(--colors-muted)", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                      {block.subsystem}
                    </span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.45, marginBottom: "0.75rem" }}>
                      {block.description}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--colors-hairline)", paddingTop: "0.5rem", display: "flex", justifyContent: "space-between", fontSize: "0.6875rem", color: "var(--colors-muted)" }}>
                    <span>IC: {block.chips.split("+")[0].trim()}</span>
                    <span style={{ fontWeight: 600, color: "var(--colors-ink)" }}>{block.power}</span>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Deep Circuit Inspection Panel Wrapped in React Bits: BorderGlow */}
          <BorderGlow
            glowColor={`${activeCircuit.color}35`}
            borderRadius="var(--rounded-lg)"
          >
            <div
              style={{
                padding: "1.5rem",
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: "1.5rem",
                alignItems: "stretch",
              }}
              className="diagram-deepdive-grid"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: activeCircuit.color,
                        color: "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {activeCircuit.icon}
                    </span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: activeCircuit.color, textTransform: "uppercase" }}>
                      Selected Circuit Subsystem
                    </span>
                  </div>
                  <StatusMark status="active" size={7} label="ACTIVE POWER RAIL" showRipple={true} />
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.25rem" }}>
                  {activeCircuit.title}
                </h3>
                <div style={{ fontSize: "0.8125rem", fontFamily: "var(--font-mono)", color: "var(--colors-brand-accent)", marginBottom: "0.75rem" }}>
                  <DecryptedText text={activeCircuit.chips} speed={25} maxIterations={8} />
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--colors-body)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {activeCircuit.circuitRole}
                </p>

                {/* Voltage & Power Rail Specs */}
                <div style={{ background: "var(--colors-surface-soft)", padding: "0.875rem", borderRadius: "var(--rounded-md)", border: "1px solid var(--colors-hairline)", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--colors-ink)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Zap size={13} color="#f59e0b" />
                    <span>Voltage Distribution Rails:</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)" }}>
                    {activeCircuit.voltage}
                  </div>
                </div>

                {/* React Bits: CometDial Telemetry Gauge Cluster */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", paddingTop: "0.5rem" }}>
                  <CometDial value={98} unit="%" label="PSRR Efficiency" color="#10b981" size={58} strokeWidth={5} />
                  <CometDial value={100} unit="Hz" label="AFE Cadence" color="#0284c7" size={58} strokeWidth={5} />
                  <CometDial value={85} unit="%" label="Thermal Headroom" color="#f59e0b" size={58} strokeWidth={5} />
                </div>
              </div>

              {/* Circuit Topology & Key Hardware Components */}
              <div
                style={{
                  background: "var(--colors-surface-soft)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--colors-ink)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                    Key Circuit Topology Components:
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.4rem" }}>
                    {activeCircuit.keyComponents.map((comp, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--colors-ink)" }}>
                        <CheckCircle2 size={13} color="var(--colors-success)" style={{ flexShrink: 0 }} />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--colors-ink)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                    Inter-Subsystem Bus Interfaces:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {activeCircuit.interfaces.map((bus, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-mono)",
                          background: "var(--colors-surface-card)",
                          border: "1px solid var(--colors-hairline)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          color: "var(--colors-muted)",
                          fontWeight: 600,
                        }}
                      >
                        {bus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>
      )}

      {/* ─── TAB 2: EXPLODED SUB-ASSEMBLIES (SpotlightCard Integration) ─── */}
      {activeTab === "modules" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* 6-Part Modular Component Matrix using SpotlightCard */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {HARDWARE_COMPONENTS.map((item) => {
              const isSelected = activeModuleId === item.id;
              const isHovered = hoveredId === item.id;

              return (
                <SpotlightCard
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  spotlightColor={`${item.color}15`}
                  style={{
                    background: isSelected || isHovered ? "#ffffff" : "var(--colors-canvas)",
                    border: isSelected
                      ? `2px solid ${item.color}`
                      : isHovered
                      ? "1px solid #cbd5e1"
                      : "1px solid var(--colors-hairline)",
                    borderRadius: "var(--rounded-lg)",
                    padding: "1.25rem",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxShadow: isSelected || isHovered ? "0 8px 24px rgba(0,0,0,0.06)" : "var(--shadow-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </div>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-mono)",
                          color: "var(--colors-muted)",
                          fontWeight: 600,
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.375rem" }}>
                      {item.name}
                    </h4>

                    <p style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.45, marginBottom: "0.75rem" }}>
                      {item.purpose}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.5rem" }}>
                    {item.specs.slice(0, 2).map((sp) => (
                      <span
                        key={sp}
                        style={{
                          fontSize: "0.6875rem",
                          background: "var(--colors-surface-soft)",
                          border: "1px solid var(--colors-hairline)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          color: "var(--colors-muted)",
                          fontWeight: 500,
                        }}
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Active Deep-Dive Inspector Box */}
          <BorderGlow glowColor={`${activeDetail.color}35`} borderRadius="var(--rounded-lg)">
            <div
              style={{
                padding: "1.5rem",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "1.5rem",
                alignItems: "center",
              }}
              className="diagram-deepdive-grid"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: activeDetail.color,
                      color: "#ffffff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {activeDetail.icon}
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: activeDetail.color, textTransform: "uppercase" }}>
                    Focused Sub-Assembly
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.5rem" }}>
                  {activeDetail.name}
                </h3>

                <p style={{ fontSize: "0.875rem", color: "var(--colors-body)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {activeDetail.whyItMatters}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => onSelectModule(activeDetail.id)}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Focus in 3D Canvas
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectModule("all")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Reset 3D View
                  </button>
                </div>
              </div>

              {/* Specs Table */}
              <div
                style={{
                  background: "var(--colors-surface-soft)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-md)",
                  padding: "1.25rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                {activeDetail.specs.map((spec, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CheckCircle2 size={14} color="var(--colors-success)" style={{ flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ fontSize: "0.8125rem", color: "var(--colors-ink)", fontWeight: 500 }}>
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      )}

      {/* ─── TAB 3: RECYCLED & BIODEGRADABLE RESOURCES (SpotlightCard Integration) ─── */}
      {activeTab === "eco" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--rounded-lg)", padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Leaf size={18} color="#15803d" />
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#14532d", margin: 0 }}>
                100% Circular Lifecycle &amp; Sustainable Resources
              </h4>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#166534", margin: 0, lineHeight: 1.5 }}>
              AURA-1 Bio-Chronos is engineered according to strict circular economy principles. Every material—from the aerospace titanium armor to the solid-state ceramic battery and bio-based fluoroelastomer—is designed for non-toxic biological skin compatibility, zero virgin ore mining, and closed-loop recyclability.
            </p>
          </div>

          {/* Eco Materials Grid using SpotlightCard */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {ECO_RESOURCES.map((eco) => (
              <SpotlightCard
                key={eco.id}
                spotlightColor={`${eco.color}15`}
                style={{
                  background: "var(--colors-surface-card)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-lg)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "6px",
                        backgroundColor: `${eco.color}15`,
                        color: eco.color,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {eco.icon}
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: eco.color, textTransform: "uppercase" }}>
                      {eco.material.split("(")[0].trim()}
                    </span>
                  </div>

                  <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--colors-ink)", marginBottom: "0.25rem" }}>
                    {eco.material}
                  </h4>
                  <div style={{ fontSize: "0.75rem", color: "var(--colors-muted)", marginBottom: "0.75rem" }}>
                    <strong>Application:</strong> {eco.application}
                  </div>

                  <p style={{ fontSize: "0.8125rem", color: "var(--colors-body)", lineHeight: 1.45, marginBottom: "0.5rem" }}>
                    <strong>Origin:</strong> {eco.origin}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid var(--colors-hairline)", paddingTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.6875rem", color: "var(--colors-muted)" }}>
                  <div><strong>Impact:</strong> {eco.sustainabilityMetric}</div>
                  <div style={{ color: "var(--colors-success)", fontWeight: 600 }}><strong>End of Life:</strong> {eco.endOfLife}</div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      {/* ─── 6-Stage Signal Pathway Architecture Flow ─── */}
      <div style={{ borderTop: "1px solid var(--colors-hairline)", paddingTop: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Activity size={16} color="var(--colors-brand-accent)" />
            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--colors-ink)", margin: 0 }}>
              Complete End-to-End Operating Process: Photons to Local AI Inference
            </h4>
          </div>
          <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--colors-muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <StatusMark status="active" size={5} />
            <span>100 HZ SAMPLING · 3.2 MS INFERENCE · ZERO LATENCY</span>
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
            position: "relative",
          }}
        >
          {SIGNAL_STAGES.map((stg, i) => (
            <SpotlightCard
              key={stg.step}
              spotlightColor="rgba(0,0,0,0.04)"
              style={{
                background: "var(--colors-canvas)",
                border: "1px solid var(--colors-hairline)",
                borderRadius: "var(--rounded-md)",
                padding: "1.1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {stg.icon}
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--colors-muted)" }}>
                    STAGE {stg.step}
                  </span>
                </div>
                {i < SIGNAL_STAGES.length - 1 && (
                  <ArrowRight size={14} color="var(--colors-muted)" className="signal-arrow" />
                )}
              </div>

              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--colors-ink)" }}>
                {stg.title}
              </div>

              <p style={{ fontSize: "0.78125rem", color: "var(--colors-body)", lineHeight: 1.45, margin: 0 }}>
                {stg.desc}
              </p>

              <div
                style={{
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  background: "var(--colors-surface-soft)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "var(--colors-brand-accent)",
                  marginTop: "auto",
                }}
              >
                {stg.circuitDetail}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .diagram-deepdive-grid {
            grid-template-columns: 1fr !important;
          }
          .signal-arrow {
            display: none;
          }
        }
        @media (max-width: 640px) {
          #hardware-diagram-showcase {
            padding: 1rem !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
