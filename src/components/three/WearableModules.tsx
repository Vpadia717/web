"use client";

import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface ComponentMetadata {
  id: string;
  name: string;
  category: string;
  material: string;
  specs: { label: string; value: string }[];
  description: string;
  clinicalUse: string;
}

export const MODULE_SPECS: Record<string, ComponentMetadata> = {
  display: {
    id: "display",
    name: "Curved Sapphire Retina Display",
    category: "User Interface & Bio-Telemetry",
    material: "Curved Micro-OLED + Anti-Reflective Sapphire Crystal",
    specs: [
      { label: "Resolution", value: "484 × 396 px (326 PPI)" },
      { label: "Refresh Rate", value: "60 Hz ProMotion Always-On" },
      { label: "Peak Brightness", value: "2,000 nits (Sunlight Readable)" },
      { label: "Surface Hardness", value: "9 Mohs Scale (Diamond-Hard)" },
    ],
    description: "Curved edge-to-edge touch micro-OLED panel protected by 9 Mohs sapphire crystal. Displays real-time cardiac waveforms, biological age, and live longevity activity rings.",
    clinicalUse: "Provides immediate bio-feedback, arrhythmic event alerts, and daily biological age acceleration scores to the user.",
  },
  chassis: {
    id: "chassis",
    name: "Aerospace Grade-5 Titanium Unibody",
    category: "Structural Core & Enclosure",
    material: "Ti-6Al-4V Grade 5 Aerospace Titanium (CNC Sculpted)",
    specs: [
      { label: "Weight", value: "32.4 g (Ultra-Lightweight)" },
      { label: "Water Rating", value: "50 m (5 ATM ISO 22810)" },
      { label: "Finish", value: "Satin Brushed Titanium + Mirror Chamfers" },
      { label: "Controls", value: "Digital Crown with Haptic Feedback + Action Button" },
    ],
    description: "Iconic squircle unibody case precision-milled from aerospace titanium. Provides complete hermetic sealing for diving, sports, and 24/7 continuous wear.",
    clinicalUse: "Ensures waterproof 24/7 all-weather wearability in sweat, swimming, and sleep without skin irritation or signal degradation.",
  },
  sensors: {
    id: "sensors",
    name: "Multimodal Bio-Sensor Array Puck",
    category: "Physiological Transducers",
    material: "Biocompatible Zirconia Ceramic + Surgical 316L Stainless Steel",
    specs: [
      { label: "Optical Cluster", value: "4λ (525nm Green, 660nm Red, 940nm Infrared)" },
      { label: "ECG / EDA Electrodes", value: "Dual 316L surgical steel differential leads" },
      { label: "Continuous Glucose", value: "Interstitial enzymatic micro-transducer" },
      { label: "Skin Thermometry", value: "Dual-sensor heat flux (±0.05 °C)" },
    ],
    description: "Ceramic back dome housing 4 optical emitter windows with pulsing LED lenses, central dual photodiode receptors, and stainless steel ECG electrodes.",
    clinicalUse: "Transduces continuous arterial pulse waves, blood oxygenation, microvascular compliance, and autonomic nervous system tone.",
  },
  pcb: {
    id: "pcb",
    name: "Neural Core Processing Unit (TinyML NPU)",
    category: "Embedded AI & Edge Compute",
    material: "8-Layer High-Density Interconnect (HDI) Rigid-Flex PCB",
    specs: [
      { label: "Neural Engine", value: "Dual Cortex-M55 + Ethos-U55 NPU" },
      { label: "Inference Latency", value: "3.2 ms cross-modality attention" },
      { label: "Local Memory", value: "16 MB Low-Leakage SRAM" },
      { label: "Wireless Stack", value: "BLE 5.4 LE Audio + Ultra-Wideband" },
    ],
    description: "Ultra-low-power silicon board running on-device cross-modality temporal GRU neural networks for continuous biological age, resilience, and early health anomaly detection.",
    clinicalUse: "Executes continuous on-device inference without sending raw unencrypted biometric data to the cloud, guaranteeing clinical HIPAA/GDPR privacy.",
  },
  battery: {
    id: "battery",
    name: "Solid-State Lithium-Ceramic Battery",
    category: "Power & Energy Harvesting",
    material: "Solid-State Lithium Ceramic Pouch + Copper Qi2 Induction Coil",
    specs: [
      { label: "Capacity", value: "420 mAh (1.61 Wh)" },
      { label: "Battery Life", value: "7 Days continuous 24/7 monitoring" },
      { label: "Fast Recharge", value: "Magnetic Qi2 (80% in 25 min)" },
      { label: "Operating Range", value: "-20 °C to +60 °C (Zero Fire Risk)" },
    ],
    description: "Non-flammable solid-state ceramic battery engineered to resist thermal degradation and provide consistent multi-day power with wireless inductive energy transfer.",
    clinicalUse: "Eliminates flammable liquid electrolytes for complete skin safety during sleep and maintains unbroken longitudinal data collection.",
  },
  straps: {
    id: "straps",
    name: "Fluoroelastomer Ocean Sport Band",
    category: "Ergonomics & Skin Coupling",
    material: "FKM High-Performance Fluoroelastomer + Grade-5 Titanium Buckle",
    specs: [
      { label: "Wrist Ergonomics", value: "130 – 210 mm circumference fit" },
      { label: "Geometry", value: "Molded tubular ridges with aerodynamic flex" },
      { label: "Buckle", value: "Sculpted titanium frame + spring-loaded prong" },
      { label: "Contact Pressure", value: "Optimal 15 mmHg optical coupling" },
    ],
    description: "Sculpted fluoroelastomer band with tubular air channels and titanium buckle, providing flexible comfort and consistent sensor skin pressure without capillary occlusion.",
    clinicalUse: "Maintains uninterrupted sensor-to-skin contact without motion artifacts or arterial compression during vigorous movement and sleep.",
  },
};

/**
 * Creates a rounded squircle shape for Apple-style watch casing & glass.
 */
function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);
  return shape;
}

/* ─── 1. Sapphire Curved Display & Live High-Definition Watchface ─── */
export function SapphireDisplayModule({ wireframe = false }: { wireframe?: boolean }) {
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);

  // Initialize off-screen 1024x1024 canvas for crisp Apple Watchface UI
  const watchfaceTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    canvasRef.current = canvas;
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    textureRef.current = tex;
    return tex;
  }, []);

  // Animate watchface UI every frame: Real-time clock, Activity rings, ECG heartbeat wave
  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime;
    const canvas = canvasRef.current;
    const tex = textureRef.current;
    if (!canvas || !tex) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const t = timeRef.current;

    // Background: Deep Pitch Black OLED
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle edge dial ticks (60 seconds)
    ctx.save();
    ctx.translate(512, 512);
    for (let i = 0; i < 60; i++) {
      ctx.rotate((Math.PI * 2) / 60);
      ctx.fillStyle = i % 5 === 0 ? "#475569" : "#1e293b";
      ctx.fillRect(-2, -490, 4, i % 5 === 0 ? 24 : 12);
    }
    ctx.restore();

    // Top Header: Date & Battery
    ctx.font = "600 36px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "left";
    ctx.fillText("WED 24", 120, 180);

    ctx.textAlign = "right";
    ctx.fillStyle = "#10b981";
    ctx.fillText("88% PWR", 904, 180);

    // Big Bold Digital Time
    ctx.font = "800 160px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("10:42", 512, 360);

    // ─── 3 Concentric Activity / Longevity Rings ───
    const cx = 512;
    const cy = 600;

    // Outer Ring: Cellular Resilience (Pink / Red)
    ctx.lineWidth = 28;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(244, 63, 94, 0.2)";
    ctx.beginPath();
    ctx.arc(cx, cy, 150, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(cx, cy, 150, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.55);
    ctx.stroke();

    // Middle Ring: Cardiovascular Reserve (Emerald)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
    ctx.beginPath();
    ctx.arc(cx, cy, 115, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(cx, cy, 115, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.8);
    ctx.stroke();

    // Inner Ring: Metabolic Glycemia (Cyan)
    ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
    ctx.beginPath();
    ctx.arc(cx, cy, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#06b6d4";
    ctx.beginPath();
    ctx.arc(cx, cy, 80, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.4);
    ctx.stroke();

    // Real-Time Animated ECG Waveform Strip across lower watchface
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let x = 140; x <= 884; x += 6) {
      const progress = ((x - 140) / 744 + t * 0.7) % 1;
      let yOffset = 0;
      if (progress > 0.42 && progress < 0.46) yOffset = -22;
      else if (progress >= 0.46 && progress < 0.48) yOffset = 18;
      else if (progress >= 0.48 && progress < 0.52) yOffset = -85; // R peak
      else if (progress >= 0.52 && progress < 0.55) yOffset = 28;
      else if (progress >= 0.55 && progress < 0.62) yOffset = -24;
      const y = 840 + yOffset;
      if (x === 140) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Bottom Complications
    ctx.font = "600 38px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillStyle = "#ef4444";
    ctx.textAlign = "left";
    ctx.fillText("HR 68 BPM", 140, 930);

    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "right";
    ctx.fillText("BioAge: -3.6y", 884, 930);

    tex.needsUpdate = true;
  });

  const screenShape = useMemo(() => createRoundedRectShape(1.82, 2.22, 0.42), []);
  const screenGeom = useMemo(
    () =>
      new THREE.ExtrudeGeometry(screenShape, {
        depth: 0.04,
        bevelEnabled: true,
        bevelSegments: 8,
        bevelSize: 0.06,
        bevelThickness: 0.06,
      }),
    [screenShape]
  );

  return (
    <group position={[0, 0.16, 0]}>
      {/* Curved Edge-to-Edge Sapphire Crystal Lens (Refractive, Ultra-Clear) */}
      <mesh geometry={screenGeom} position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          opacity={0.88}
          transparent
          roughness={0.03}
          ior={1.77}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          reflectivity={0.9}
          wireframe={wireframe}
        />
      </mesh>

      {/* Active High-Definition OLED Screen with CanvasTexture */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.76, 2.16]} />
        <meshStandardMaterial
          map={watchfaceTexture || undefined}
          emissive="#ffffff"
          emissiveMap={watchfaceTexture || undefined}
          emissiveIntensity={1.3}
          roughness={0.12}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  );
}

/* ─── 2. Aerospace Grade-5 Titanium Unibody Case ─── */
export function TitaniumChassisModule({ wireframe = false }: { wireframe?: boolean }) {
  const caseShape = useMemo(() => createRoundedRectShape(2.0, 2.4, 0.46), []);
  const caseGeom = useMemo(
    () =>
      new THREE.ExtrudeGeometry(caseShape, {
        depth: 0.38,
        bevelEnabled: true,
        bevelSegments: 10,
        bevelSize: 0.09,
        bevelThickness: 0.09,
      }),
    [caseShape]
  );

  // Knurled Crown ridges
  const crownNotches = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      return {
        x: Math.cos(angle) * 0.16,
        y: Math.sin(angle) * 0.16,
      };
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Titanium Unibody Squircle Frame */}
      <mesh geometry={caseGeom} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#d1d5db"
          metalness={0.94}
          roughness={0.22}
          clearcoat={0.5}
          clearcoatRoughness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* ─── Digital Crown with Knurling & Orange Ring (Apple Watch Ultra Style) ─── */}
      <group position={[1.08, 0.04, -0.38]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.18, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.96} roughness={0.15} wireframe={wireframe} />
        </mesh>
        {/* Knurled Grooves */}
        {crownNotches.map((notch, idx) => (
          <mesh key={idx} position={[notch.x, 0, notch.y]}>
            <boxGeometry args={[0.015, 0.18, 0.015]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Crown Orange Center Ring */}
        <mesh position={[0, 0.095, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.015, 24]} />
          <meshStandardMaterial color="#f97316" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* ─── Side Push Button (Right Lower) ─── */}
      <mesh position={[1.06, -0.05, 0.42]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.07, 0.38, 8, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.94} roughness={0.2} wireframe={wireframe} />
      </mesh>

      {/* ─── Precision Dual Speaker Slots (Left Side) ─── */}
      <group position={[-1.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh position={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.03, 0.32, 6, 12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.03, 0.32, 6, 12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </group>

      {/* ─── Barometer & Acoustic Mic Hole ─── */}
      <mesh position={[-1.07, -0.08, 0.58]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 16]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
    </group>
  );
}

/* ─── 3. Multimodal Ceramic Bio-Sensor Array Puck (Back of Watch) ─── */
export function BioSensorPuckModule({ wireframe = false }: { wireframe?: boolean }) {
  const sensorGlowRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sensorGlowRef.current) {
      const pulse = 2.0 + Math.sin(state.clock.elapsedTime * 6) * 1.2;
      sensorGlowRef.current.children.forEach((child) => {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (m && m.emissiveIntensity !== undefined) {
          m.emissiveIntensity = pulse;
        }
      });
    }
  });

  return (
    <group position={[0, -0.22, 0]}>
      {/* Zirconia Ceramic Sensor Dome */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.9, 0.16, 40]} />
        <meshPhysicalMaterial
          color="#0f172a"
          metalness={0.3}
          roughness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.04}
          wireframe={wireframe}
        />
      </mesh>

      {/* Optical Sensor Ring Lens */}
      <mesh position={[0, -0.085, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.02, 40]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.88}
          roughness={0.04}
          ior={1.54}
          wireframe={wireframe}
        />
      </mesh>

      {/* Pulsing 4-Wavelength Optical Lenses */}
      <group ref={sensorGlowRef} position={[0, -0.095, 0]}>
        {/* 525nm Green LEDs */}
        <mesh position={[-0.26, 0, -0.26]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.5} />
        </mesh>
        <mesh position={[-0.26, 0, 0.26]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.5} />
        </mesh>

        {/* 660nm Red LED */}
        <mesh position={[0.26, 0, -0.26]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} />
        </mesh>

        {/* 940nm Infrared LED */}
        <mesh position={[0.26, 0, 0.26]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2.5} />
        </mesh>

        {/* Central Dual Photodiode Receptor Window */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.22, 0.02, 0.32]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* Curved 316L Surgical Stainless Steel ECG Ring Electrodes */}
      <mesh position={[-0.6, -0.08, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.025, 24]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.96} roughness={0.1} />
      </mesh>
      <mesh position={[0.6, -0.08, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.025, 24]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.96} roughness={0.1} />
      </mesh>
    </group>
  );
}

/* ─── 4. Neural Core PCB (TinyML Ethos-U55 NPU) ─── */
export function NeuralPcbModule({ wireframe = false }: { wireframe?: boolean }) {
  const pcbShape = useMemo(() => createRoundedRectShape(1.68, 2.08, 0.36), []);
  const pcbGeom = useMemo(
    () =>
      new THREE.ExtrudeGeometry(pcbShape, {
        depth: 0.04,
        bevelEnabled: false,
      }),
    [pcbShape]
  );

  return (
    <group position={[0, -0.04, 0]}>
      <mesh geometry={pcbGeom} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#042f2e" roughness={0.35} metalness={0.25} wireframe={wireframe} />
      </mesh>

      {/* Central ADNI Ethos-U55 NPU Chip */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.62, 0.035, 0.62]} />
        <meshStandardMaterial color="#18181b" roughness={0.2} metalness={0.85} wireframe={wireframe} />
      </mesh>

      {/* Glowing Silicon Die Core */}
      <mesh position={[0, 0.055, 0]}>
        <boxGeometry args={[0.32, 0.01, 0.32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={2.4} />
      </mesh>

      {/* SMT Capacitors & Flash Chips */}
      <mesh position={[-0.48, 0.03, -0.52]}>
        <boxGeometry args={[0.34, 0.025, 0.44]} />
        <meshStandardMaterial color="#27272a" roughness={0.3} />
      </mesh>
      <mesh position={[0.48, 0.03, -0.52]}>
        <boxGeometry args={[0.36, 0.025, 0.36]} />
        <meshStandardMaterial color="#27272a" roughness={0.3} />
      </mesh>
      <mesh position={[-0.45, 0.03, 0.55]}>
        <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  );
}

/* ─── 5. Solid-State Lithium-Ceramic Battery & Qi2 Inductive Coil ─── */
export function SolidStateBatteryModule({ wireframe = false }: { wireframe?: boolean }) {
  const battShape = useMemo(() => createRoundedRectShape(1.58, 1.98, 0.32), []);
  const battGeom = useMemo(
    () =>
      new THREE.ExtrudeGeometry(battShape, {
        depth: 0.08,
        bevelEnabled: false,
      }),
    [battShape]
  );

  return (
    <group position={[0, -0.12, 0]}>
      <mesh geometry={battGeom} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial
          color="#334155"
          metalness={0.88}
          roughness={0.25}
          clearcoat={0.5}
          wireframe={wireframe}
        />
      </mesh>

      {/* Copper Wireless Charging Coils */}
      <mesh position={[0, -0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.54, 0.028, 12, 40]} />
        <meshStandardMaterial color="#b45309" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.024, 12, 40]} />
        <meshStandardMaterial color="#b45309" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  );
}

/* ─── 6. Apple Watch Ocean / Sport Band (Clean Sculpted Studio Arc) ─── */
export function FluoroelastomerStrapModule({
  wireframe = false,
  bandColor = "#1e2229",
}: {
  wireframe?: boolean;
  bandColor?: string;
}) {
  // Pre-calculate 8 adjustment holes on bottom strap
  const strapHoles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      z: 0.65 + i * 0.22,
    }));
  }, []);

  return (
    <group>
      {/* ─── TOP STRAP (Curving smoothly back from top lug) ─── */}
      <group position={[0, -0.1, -1.25]}>
        {/* Titanium Lug Connector */}
        <mesh position={[0, 0.02, -0.06]}>
          <boxGeometry args={[1.72, 0.18, 0.14]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.94} roughness={0.2} />
        </mesh>

        {/* Main Band Arc Segment 1 */}
        <mesh position={[0, -0.18, -0.7]} rotation={[-Math.PI / 7, 0, 0]} castShadow>
          <boxGeometry args={[1.68, 0.14, 1.2]} />
          <meshPhysicalMaterial
            color={bandColor}
            roughness={0.65}
            metalness={0.06}
            clearcoat={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Main Band Arc Segment 2 (Curving downward) */}
        <mesh position={[0, -0.65, -1.5]} rotation={[-Math.PI / 3.2, 0, 0]} castShadow>
          <boxGeometry args={[1.64, 0.14, 1.1]} />
          <meshPhysicalMaterial
            color={bandColor}
            roughness={0.65}
            metalness={0.06}
            clearcoat={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Titanium Buckle Loop & Prong */}
        <group position={[0, -1.15, -1.82]} rotation={[-Math.PI / 2.8, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.82, 0.22, 0.28]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.96} roughness={0.14} />
          </mesh>
          <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 6, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.96} roughness={0.1} />
          </mesh>
          {/* Dual Keeper Loops */}
          <mesh position={[0, -0.16, 0.35]}>
            <boxGeometry args={[1.74, 0.2, 0.18]} />
            <meshStandardMaterial color={bandColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.28, 0.68]}>
            <boxGeometry args={[1.74, 0.2, 0.18]} />
            <meshStandardMaterial color={bandColor} roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* ─── BOTTOM STRAP (Curving smoothly back from bottom lug with eyelets) ─── */}
      <group position={[0, -0.1, 1.25]}>
        {/* Titanium Lug Connector */}
        <mesh position={[0, 0.02, 0.06]}>
          <boxGeometry args={[1.72, 0.18, 0.14]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.94} roughness={0.2} />
        </mesh>

        {/* Main Band Arc Segment 1 */}
        <mesh position={[0, -0.18, 0.7]} rotation={[Math.PI / 7, 0, 0]} castShadow>
          <boxGeometry args={[1.68, 0.14, 1.2]} />
          <meshPhysicalMaterial
            color={bandColor}
            roughness={0.65}
            metalness={0.06}
            clearcoat={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Main Band Arc Segment 2 with adjustment holes */}
        <group position={[0, -0.65, 1.5]} rotation={[Math.PI / 3.2, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.64, 0.14, 1.2]} />
            <meshPhysicalMaterial
              color={bandColor}
              roughness={0.65}
              metalness={0.06}
              clearcoat={0.25}
              wireframe={wireframe}
            />
          </mesh>
          {/* Adjustment Holes */}
          {strapHoles.map((hole, i) => (
            <mesh key={i} position={[0, 0.075, -0.45 + (i / 7) * 0.9]}>
              <cylinderGeometry args={[0.045, 0.045, 0.02, 12]} />
              <meshStandardMaterial color="#09090b" roughness={0.9} />
            </mesh>
          ))}
        </group>

        {/* Tapered Band Tail */}
        <mesh position={[0, -1.18, 2.05]} rotation={[Math.PI / 2.6, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.12, 0.85]} />
          <meshPhysicalMaterial
            color={bandColor}
            roughness={0.65}
            metalness={0.06}
            clearcoat={0.25}
            wireframe={wireframe}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ─── 7. Apple Keynote Studio Pedestal & Contact Shadow ─── */
export function StudioPedestalModule({ isDark = false }: { isDark?: boolean }) {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Soft Contact Radial Drop Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.1, 2.9, 64]} />
        <meshBasicMaterial color="#000000" transparent opacity={isDark ? 0.4 : 0.16} />
      </mesh>
      {/* Inner Contact Core Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[1.4, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={isDark ? 0.3 : 0.12} />
      </mesh>
      {/* Circular Display Pedestal with Chamfer */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.44, 64]} />
        <meshStandardMaterial
          color={isDark ? "#141417" : "#ffffff"}
          roughness={isDark ? 0.3 : 0.15}
          metalness={isDark ? 0.6 : 0.05}
        />
      </mesh>
      {/* Subtle Metallic Edge Ring on Pedestal */}
      <mesh position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.18, 3.22, 64]} />
        <meshStandardMaterial
          color={isDark ? "#38bdf8" : "#cbd5e1"}
          metalness={isDark ? 0.9 : 0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
