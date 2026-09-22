"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  SapphireDisplayModule,
  TitaniumChassisModule,
  BioSensorPuckModule,
  NeuralPcbModule,
  SolidStateBatteryModule,
  FluoroelastomerStrapModule,
  StudioPedestalModule,
} from "./WearableModules";
import { useTheme } from "@/components/providers/ThemeProvider";

interface AssemblySceneProps {
  progress: number; // 0.0 (fully exploded) to 1.0 (fully assembled)
  activeModule: string; // "all" | "display" | "chassis" | "sensors" | "pcb" | "battery" | "straps"
  onSelectModule: (id: string) => void;
  wireframe?: boolean;
  autoRotate?: boolean;
  bandColor?: string;
  cameraPreset?: "studio" | "front" | "sensors" | "exploded";
  isDark?: boolean;
}

function CameraRig({ preset = "studio" }: { preset?: "studio" | "front" | "sensors" | "exploded" }) {
  useFrame((state) => {
    const lerpFactor = 0.06;
    let targetPos: [number, number, number] = [2.2, 2.4, 5.8];
    if (preset === "front") {
      targetPos = [0, 0.4, 4.8];
    } else if (preset === "sensors") {
      targetPos = [0, -3.2, 4.6];
    } else if (preset === "exploded") {
      targetPos = [2.6, 1.6, 7.6];
    }
    state.camera.position.lerp(new THREE.Vector3(...targetPos), lerpFactor);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function AssemblyRig({
  progress,
  activeModule,
  onSelectModule,
  wireframe = false,
  autoRotate = true,
  bandColor = "#1e2229",
  cameraPreset = "studio",
  isDark = false,
}: AssemblySceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const displayRef = useRef<THREE.Group>(null);
  const chassisRef = useRef<THREE.Group>(null);
  const pcbRef = useRef<THREE.Group>(null);
  const batteryRef = useRef<THREE.Group>(null);
  const sensorsRef = useRef<THREE.Group>(null);
  const strapsRef = useRef<THREE.Group>(null);

  const getBadgeStyle = (moduleId: string) => {
    const isActive = activeModule === moduleId;
    return {
      background: isActive
        ? "var(--colors-primary)"
        : isDark
        ? "rgba(24, 24, 27, 0.92)"
        : "rgba(255, 255, 255, 0.94)",
      color: isActive ? "#ffffff" : isDark ? "#f8fafc" : "#111111",
      border: isActive
        ? "1px solid var(--colors-primary)"
        : isDark
        ? "1px solid rgba(255, 255, 255, 0.16)"
        : "1px solid rgba(0, 0, 0, 0.12)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      padding: "5px 12px",
      borderRadius: "9999px",
      fontSize: "11px",
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap" as const,
      boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.5)" : "0 4px 14px rgba(0,0,0,0.08)",
      transition: "all 0.15s ease",
    };
  };

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.35;
    }

    // If viewing sensors specifically, rotate watch around X to show back puck
    if (groupRef.current && cameraPreset === "sensors" && !autoRotate) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.PI * 0.85, 0.08);
    } else if (groupRef.current && cameraPreset !== "sensors" && !autoRotate) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.08);
    }

    const lerpFactor = 0.08;

    // 1. Display interpolation (Moves up +Y in exploded view)
    if (displayRef.current) {
      const targetY = THREE.MathUtils.lerp(2.2, 0.08, progress);
      displayRef.current.position.y = THREE.MathUtils.lerp(displayRef.current.position.y, targetY, lerpFactor);

      const isTarget = activeModule === "all" || activeModule === "display";
      displayRef.current.scale.setScalar(
        THREE.MathUtils.lerp(displayRef.current.scale.x, isTarget ? 1 : 0.45, lerpFactor)
      );
    }

    // 2. Chassis interpolation (Core anchor)
    if (chassisRef.current) {
      const targetY = THREE.MathUtils.lerp(0.9, 0, progress);
      chassisRef.current.position.y = THREE.MathUtils.lerp(chassisRef.current.position.y, targetY, lerpFactor);

      const isTarget = activeModule === "all" || activeModule === "chassis";
      chassisRef.current.scale.setScalar(
        THREE.MathUtils.lerp(chassisRef.current.scale.x, isTarget ? 1 : 0.45, lerpFactor)
      );
    }

    // 3. PCB interpolation (Moves down -Y)
    if (pcbRef.current) {
      const targetY = THREE.MathUtils.lerp(-0.5, -0.02, progress);
      pcbRef.current.position.y = THREE.MathUtils.lerp(pcbRef.current.position.y, targetY, lerpFactor);

      const isTarget = activeModule === "all" || activeModule === "pcb";
      pcbRef.current.scale.setScalar(
        THREE.MathUtils.lerp(pcbRef.current.scale.x, isTarget ? 1 : 0.45, lerpFactor)
      );
    }

    // 4. Battery interpolation (Moves down -Y below PCB)
    if (batteryRef.current) {
      const targetY = THREE.MathUtils.lerp(-1.4, -0.06, progress);
      batteryRef.current.position.y = THREE.MathUtils.lerp(batteryRef.current.position.y, targetY, lerpFactor);

      const isTarget = activeModule === "all" || activeModule === "battery";
      batteryRef.current.scale.setScalar(
        THREE.MathUtils.lerp(batteryRef.current.scale.x, isTarget ? 1 : 0.45, lerpFactor)
      );
    }

    // 5. Sensors puck interpolation (Moves down -Y to base)
    if (sensorsRef.current) {
      const targetY = THREE.MathUtils.lerp(-2.3, -0.15, progress);
      sensorsRef.current.position.y = THREE.MathUtils.lerp(sensorsRef.current.position.y, targetY, lerpFactor);

      const isTarget = activeModule === "all" || activeModule === "sensors";
      sensorsRef.current.scale.setScalar(
        THREE.MathUtils.lerp(sensorsRef.current.scale.x, isTarget ? 1 : 0.45, lerpFactor)
      );
    }

    // 6. Straps interpolation (Spreads outwards along Z in exploded view)
    if (strapsRef.current) {
      const spreadZ = THREE.MathUtils.lerp(1.8, 1.0, progress);
      strapsRef.current.scale.z = spreadZ;

      const isTarget = activeModule === "all" || activeModule === "straps";
      strapsRef.current.scale.x = THREE.MathUtils.lerp(strapsRef.current.scale.x, isTarget ? 1 : 0.45, lerpFactor);
      strapsRef.current.scale.y = THREE.MathUtils.lerp(strapsRef.current.scale.y, isTarget ? 1 : 0.45, lerpFactor);
      strapsRef.current.scale.z = THREE.MathUtils.lerp(strapsRef.current.scale.z, isTarget ? 1 : 0.45, lerpFactor);
    }
  });

  return (
    <group ref={groupRef}>
      {/* ─── Apple Keynote Studio Pedestal & Grounding Drop Shadow ─── */}
      <StudioPedestalModule isDark={isDark} />

      {/* 1. Curved Sapphire Retina Display */}
      <group ref={displayRef} onClick={(e) => { e.stopPropagation(); onSelectModule("display"); }}>
        <SapphireDisplayModule wireframe={wireframe} />
        {progress < 0.75 && (
          <Html position={[1.5, 0, 0]} distanceFactor={8}>
            <button
              onClick={() => onSelectModule("display")}
              style={getBadgeStyle("display")}
            >
              1. Sapphire Bio-OLED
            </button>
          </Html>
        )}
      </group>

      {/* 2. Titanium Unibody Chassis */}
      <group ref={chassisRef} onClick={(e) => { e.stopPropagation(); onSelectModule("chassis"); }}>
        <TitaniumChassisModule wireframe={wireframe} />
        {progress < 0.75 && (
          <Html position={[-1.7, 0, 0]} distanceFactor={8}>
            <button
              onClick={() => onSelectModule("chassis")}
              style={getBadgeStyle("chassis")}
            >
              2. Titanium Unibody Armor
            </button>
          </Html>
        )}
      </group>

      {/* 3. TinyML NPU Board */}
      <group ref={pcbRef} onClick={(e) => { e.stopPropagation(); onSelectModule("pcb"); }}>
        <NeuralPcbModule wireframe={wireframe} />
        {progress < 0.75 && (
          <Html position={[1.5, 0, 0]} distanceFactor={8}>
            <button
              onClick={() => onSelectModule("pcb")}
              style={getBadgeStyle("pcb")}
            >
              3. Ethos-U55 TinyML NPU
            </button>
          </Html>
        )}
      </group>

      {/* 4. Solid-State Ceramic Battery */}
      <group ref={batteryRef} onClick={(e) => { e.stopPropagation(); onSelectModule("battery"); }}>
        <SolidStateBatteryModule wireframe={wireframe} />
        {progress < 0.75 && (
          <Html position={[-1.7, 0, 0]} distanceFactor={8}>
            <button
              onClick={() => onSelectModule("battery")}
              style={getBadgeStyle("battery")}
            >
              4. Solid-State Battery &amp; Qi2
            </button>
          </Html>
        )}
      </group>

      {/* 5. Multimodal Ceramic Bio-Sensor Array Puck */}
      <group ref={sensorsRef} onClick={(e) => { e.stopPropagation(); onSelectModule("sensors"); }}>
        <BioSensorPuckModule wireframe={wireframe} />
        {progress < 0.75 && (
          <Html position={[1.5, 0, 0]} distanceFactor={8}>
            <button
              onClick={() => onSelectModule("sensors")}
              style={getBadgeStyle("sensors")}
            >
              5. 4λ Sensor Array Puck
            </button>
          </Html>
        )}
      </group>

      {/* 6. Sculpted Fluoroelastomer Sport Band */}
      <group ref={strapsRef} onClick={(e) => { e.stopPropagation(); onSelectModule("straps"); }}>
        <FluoroelastomerStrapModule wireframe={wireframe} bandColor={bandColor} />
      </group>
    </group>
  );
}

export default function WearableAssemblyScene(props: AssemblySceneProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Canvas
      camera={{ position: [2.2, 2.4, 5.8], fov: 40 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* Studio Lighting Rig for Apple Product Photography */}
      <ambientLight intensity={isDark ? 0.75 : 0.9} />
      <directionalLight position={[6, 9, 6]} intensity={isDark ? 1.8 : 1.6} castShadow />
      <directionalLight position={[-6, -4, -6]} intensity={0.6} color={isDark ? "#38bdf8" : "#94a3b8"} />
      <directionalLight position={[0, -5, 4]} intensity={0.4} color={isDark ? "#1e293b" : "#e2e8f0"} />
      <pointLight position={[0, 4, 2]} intensity={0.8} />

      <CameraRig preset={props.cameraPreset} />
      <AssemblyRig {...props} isDark={isDark} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3.0}
        maxDistance={12}
        dampingFactor={0.06}
      />
    </Canvas>
  );
}
