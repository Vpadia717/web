"use client";

import React from "react";

interface ShinyTextProps {
  children: React.ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  children,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        backgroundImage: disabled
          ? "none"
          : "linear-gradient(120deg, #111111 0%, #111111 35%, #9ca3af 50%, #111111 65%, #111111 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: disabled ? "inherit" : "transparent",
        animation: disabled ? "none" : `shine ${animationDuration} linear infinite`,
      }}
    >
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 100%;
          }
          100% {
            background-position: -100%;
          }
        }
      `}</style>
      {children}
    </span>
  );
}
