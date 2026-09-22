"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PillNav, { PillNavItem } from "@/components/bits/PillNav";
import WakeSlider from "@/components/bits/WakeSlider";
import SquishSwitch from "@/components/bits/SquishSwitch";
import ComponentSpecsDrawer from "./ComponentSpecsDrawer";
import BiometricTelemetryHUD from "./BiometricTelemetryHUD";
import HardwareDiagramShowcase from "./HardwareDiagramShowcase";
import { Eye, Shield, Radio, Cpu, BatteryCharging, Layers, Box, RotateCcw, Palette } from "lucide-react";

// Dynamically import 3D canvas with SSR disabled
const WearableAssemblyScene = dynamic(
  () => import("@/components/three/WearableAssemblyScene"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "460px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--colors-muted)",
          fontSize: "0.875rem",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "2.5px solid #e5e7eb",
            borderTopColor: "#111111",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <span>Loading Apple-Grade 3D Watch Experience...</span>
      </div>
    ),
  }
);

const NAV_ITEMS: PillNavItem[] = [
  { id: "all", label: "Complete Watch", icon: <Box size={14} /> },
  { id: "display", label: "01 Display", icon: <Eye size={14} /> },
  { id: "chassis", label: "02 Armor", icon: <Shield size={14} /> },
  { id: "sensors", label: "03 Sensors", icon: <Radio size={14} /> },
  { id: "pcb", label: "04 AI Brain", icon: <Cpu size={14} /> },
  { id: "battery", label: "05 Battery", icon: <BatteryCharging size={14} /> },
  { id: "straps", label: "06 Sport Band", icon: <Layers size={14} /> },
];

const BAND_PALETTES = [
  { id: "midnight", label: "Midnight Black", color: "#1e2229", border: "#334155" },
  { id: "starlight", label: "Starlight Gray", color: "#d6cfc7", border: "#cbd5e1" },
  { id: "alpine", label: "Alpine White", color: "#f1f5f9", border: "#94a3b8" },
  { id: "ocean", label: "Pacific Blue", color: "#0284c7", border: "#0369a1" },
  { id: "ultra", label: "Ultra Orange", color: "#f97316", border: "#ea580c" },
];

export default function WearablePrototypeViewer() {
  const [progress, setProgress] = useState<number>(1.0); // Starts fully assembled
  const [activeModule, setActiveModule] = useState<string>("all");
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true); // Starts with subtle Apple keynote orbit
  const [cameraPreset, setCameraPreset] = useState<"studio" | "front" | "sensors" | "exploded">("studio");
  const [bandColor, setBandColor] = useState<string>("#1e2229");

  const handleSelectModule = (id: string) => {
    setActiveModule(id);
    if (id === "sensors") {
      setCameraPreset("sensors");
      setAutoRotate(false);
      setProgress(1.0);
    } else if (id === "display") {
      setCameraPreset("front");
      setAutoRotate(false);
      setProgress(1.0);
    } else if (id === "all") {
      setCameraPreset("studio");
      setAutoRotate(true);
      setProgress(1.0);
    } else {
      setProgress(0.35);
      setCameraPreset("exploded");
      setAutoRotate(false);
    }
  };

  const handleSelectPreset = (preset: "studio" | "front" | "sensors" | "exploded") => {
    setCameraPreset(preset);
    if (preset === "studio") {
      setProgress(1.0);
      setAutoRotate(true);
      setActiveModule("all");
    } else if (preset === "front") {
      setProgress(1.0);
      setAutoRotate(false);
      setActiveModule("display");
    } else if (preset === "sensors") {
      setProgress(1.0);
      setAutoRotate(false);
      setActiveModule("sensors");
    } else if (preset === "exploded") {
      setProgress(0.0);
      setAutoRotate(false);
    }
  };

  const handleAssemble = () => {
    setProgress(1.0);
    setActiveModule("all");
    setCameraPreset("studio");
    setAutoRotate(true);
  };

  const handleExplode = () => {
    setProgress(0.0);
    setCameraPreset("exploded");
    setAutoRotate(false);
  };

  // Sync with global 3D keyboard shortcuts
  useEffect(() => {
    const onToggleOrbit = () => setAutoRotate((prev) => !prev);
    const onToggleXray = () => setWireframe((prev) => !prev);
    const onAssemble = () => handleAssemble();
    const onExplode = () => handleExplode();

    window.addEventListener("longevity-3d-toggle-orbit", onToggleOrbit);
    window.addEventListener("longevity-3d-toggle-xray", onToggleXray);
    window.addEventListener("longevity-3d-assemble", onAssemble);
    window.addEventListener("longevity-3d-explode", onExplode);

    return () => {
      window.removeEventListener("longevity-3d-toggle-orbit", onToggleOrbit);
      window.removeEventListener("longevity-3d-toggle-xray", onToggleXray);
      window.removeEventListener("longevity-3d-assemble", onAssemble);
      window.removeEventListener("longevity-3d-explode", onExplode);
    };
  }, []);

  return (
    <div
      className="prototype-container"
      style={{
        background: "var(--colors-surface-card)",
        border: "1px solid var(--colors-hairline)",
        borderRadius: "var(--rounded-xl)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1.5rem",
      }}
    >
      {/* ─── Top Control Bar ─── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--colors-hairline)",
        }}
      >
        {/* Experience Mode Selector: Apple Product Reveal Modes */}
        <div
          className="experience-mode-selector"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--colors-surface-card)",
            border: "1px solid var(--colors-hairline)",
            borderRadius: "var(--rounded-pill)",
            padding: "3px",
            boxShadow: "var(--shadow-subtle)",
            maxWidth: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <button
            type="button"
            onClick={() => handleSelectPreset("studio")}
            className={`nav-pill-btn ${cameraPreset === "studio" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", gap: "0.375rem" }}
          >
            <RotateCcw size={14} color="#10b981" />
            <span>360° Studio Launch</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset("front")}
            className={`nav-pill-btn ${cameraPreset === "front" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", gap: "0.375rem" }}
          >
            <Eye size={14} color="#2563eb" />
            <span>Retina Dial Face</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset("sensors")}
            className={`nav-pill-btn ${cameraPreset === "sensors" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", gap: "0.375rem" }}
          >
            <Radio size={14} color="#06b6d4" />
            <span>Ceramic Sensor Puck</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset("exploded")}
            className={`nav-pill-btn ${cameraPreset === "exploded" ? "active" : ""}`}
            style={{ fontSize: "0.8125rem", gap: "0.375rem" }}
          >
            <Layers size={14} color="#8b5cf6" />
            <span>Exploded Inspection</span>
          </button>
        </div>

        {/* Right Settings: Apple Band Finishes & Toggles */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          {/* Apple Watch Band Colorways */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "0.75rem",
              color: "var(--colors-muted)",
              background: "var(--colors-surface-card)",
              padding: "4px 10px",
              borderRadius: "var(--rounded-pill)",
              border: "1px solid var(--colors-hairline)",
            }}
          >
            <Palette size={13} color="#64748b" />
            <span style={{ fontWeight: 500 }}>Band:</span>
            {BAND_PALETTES.map((band) => {
              const isSelected = bandColor === band.color;
              return (
                <button
                  key={band.id}
                  type="button"
                  onClick={() => setBandColor(band.color)}
                  title={band.label}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: band.color,
                    border: isSelected ? "2.5px solid #0f172a" : "1px solid rgba(0,0,0,0.18)",
                    cursor: "pointer",
                    padding: 0,
                    outline: isSelected ? "2px solid #38bdf8" : "none",
                    outlineOffset: "1px",
                    transform: isSelected ? "scale(1.15)" : "scale(1)",
                    transition: "transform 0.15s ease, outline 0.15s ease",
                  }}
                />
              );
            })}
          </div>

          <SquishSwitch
            checked={wireframe}
            onChange={setWireframe}
            label="X-Ray Mode"
          />
          <SquishSwitch
            checked={autoRotate}
            onChange={setAutoRotate}
            label="Auto Orbit"
          />
        </div>
      </div>

      {/* ─── Second Nav Bar: Individual Module Isolator ─── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <PillNav
          items={NAV_ITEMS}
          activeId={activeModule}
          onChange={handleSelectModule}
        />
        <span style={{ fontSize: "0.75rem", color: "var(--colors-muted)" }}>
          {cameraPreset === "studio"
            ? "Apple Launch Turntable · Ti-6Al-4V Grade-5 Titanium"
            : cameraPreset === "front"
            ? "OLED Retina Always-On · 2,000 Nits Sunlight Peak"
            : cameraPreset === "sensors"
            ? "Zirconia Ceramic Back Dome · 4λ Optical Transducers"
            : "Drag freely in 3D to inspect internal modules"}
        </span>
      </div>

      {/* ─── Main 3D Canvas + Technical Specs Split View ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "1.5rem",
          minHeight: "580px",
        }}
        className="prototype-stage-grid"
      >
        {/* 3D Viewport with Floating Controls */}
        <div
          style={{
            position: "relative",
            background: "var(--colors-surface-soft)",
            borderRadius: "var(--rounded-lg)",
            border: "1px solid var(--colors-hairline)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 3D Scene Canvas */}
          <div style={{ flex: 1, width: "100%", height: "100%", minHeight: "460px", position: "relative" }}>
            <WearableAssemblyScene
              progress={progress}
              activeModule={activeModule}
              onSelectModule={handleSelectModule}
              wireframe={wireframe}
              autoRotate={autoRotate}
              bandColor={bandColor}
              cameraPreset={cameraPreset}
            />

            {/* Top Overlay Badge */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                fontSize: "0.75rem",
                color: "var(--colors-ink)",
                background: "var(--colors-surface-glass)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "4px 12px",
                borderRadius: "var(--rounded-pill)",
                border: "1px solid var(--colors-hairline)",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontWeight: 600 }}>
                {cameraPreset === "studio"
                  ? "Apple Product Reveal · 360° Studio Orbit"
                  : cameraPreset === "front"
                  ? "Retina Display & Real-Time Cardiac Telemetry"
                  : cameraPreset === "sensors"
                  ? "Ceramic Dome & 4-Wavelength Optical Cluster"
                  : "Exploded Sub-Assembly View"}
              </span>
            </div>

            {/* Orbit Hint */}
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                fontSize: "0.6875rem",
                color: "var(--colors-muted)",
                background: "var(--colors-surface-glass)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid var(--colors-hairline)",
                pointerEvents: "none",
              }}
            >
              Drag to rotate · Scroll to zoom
            </div>
          </div>

          {/* Bottom Scrub Slider inside Viewport */}
          <div
            style={{
              padding: "1rem 1.5rem",
              background: "var(--colors-surface-card)",
              borderTop: "1px solid var(--colors-hairline)",
            }}
          >
            <WakeSlider
              value={progress}
              onChange={(val) => {
                setProgress(val);
                if (val < 0.5) setCameraPreset("exploded");
              }}
              label="Hardware Sub-Assembly Scrub"
              minLabel="Exploded (6 Modules)"
              maxLabel="Unified Smartwatch (Ready to Wear)"
            />
          </div>
        </div>

        {/* Right Panel: Technical Specs Drawer */}
        <div
          style={{
            background: "var(--colors-surface-soft)",
            border: "1px solid var(--colors-hairline)",
            borderRadius: "var(--rounded-lg)",
            padding: "1.25rem",
          }}
        >
          <ComponentSpecsDrawer
            activeModuleId={activeModule}
            onAssemble={handleAssemble}
            onExplode={handleExplode}
            progress={progress}
            onSelectPreset={handleSelectPreset}
          />
        </div>
      </div>

      {/* ─── Live Biometric Telemetry Stream HUD ─── */}
      <div style={{ paddingTop: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--colors-ink)" }}>
            Live Sensor Telemetry Simulation
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--colors-muted)" }}>
            Continuous 100 Hz Bio-Stream
          </span>
        </div>
        <BiometricTelemetryHUD />
      </div>

      {/* ─── Hardware Architecture & Diagram Showcase (What is used for what) ─── */}
      <HardwareDiagramShowcase
        activeModuleId={activeModule}
        onSelectModule={handleSelectModule}
      />

      <style jsx global>{`
        @media (max-width: 900px) {
          .prototype-stage-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .prototype-container {
            padding: 0.875rem !important;
            gap: 1rem !important;
          }
          .experience-mode-selector {
            width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            justify-content: flex-start !important;
            scrollbar-width: none !important;
          }
          .experience-mode-selector::-webkit-scrollbar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
