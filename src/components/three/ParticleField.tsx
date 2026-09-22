"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MinimalWaveDots() {
  const pointsRef = useRef<THREE.Points>(null);
  const rows = 35;
  const cols = 35;
  const count = rows * cols;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pos[idx * 3] = (c - cols / 2) * 0.45;
        pos[idx * 3 + 1] = -1.2;
        pos[idx * 3 + 2] = (r - rows / 2) * 0.45;
        idx++;
      }
    }
    return pos;
  }, [rows, cols, count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const array = posAttr.array as Float32Array;
      const t = state.clock.elapsedTime * 1.5;

      for (let i = 0; i < count; i++) {
        const x = array[i * 3];
        const z = array[i * 3 + 2];
        array[i * 3 + 1] = -1.2 + Math.sin(x * 0.5 + t) * Math.cos(z * 0.5 + t) * 0.35;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#cbd5e1"
        size={0.035}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 6], fov: 50 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <MinimalWaveDots />
    </Canvas>
  );
}
