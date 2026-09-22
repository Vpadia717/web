"use client";

import React, { useRef, useState } from "react";

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
}

export default function BorderGlow({
  children,
  className = "",
  glowColor = "rgba(14, 165, 233, 0.4)",
  borderRadius = "var(--rounded-lg)",
  style = {},
  onClick,
  id,
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border-glow-wrapper ${className}`}
      style={{
        position: "relative",
        borderRadius,
        padding: "1px",
        background: isHovered
          ? `radial-gradient(280px circle at ${cursor.x}px ${cursor.y}px, ${glowColor}, rgba(0,0,0,0.06))`
          : "var(--colors-hairline)",
        transition: "background 0.15s ease",
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
          background: "var(--colors-canvas)",
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
