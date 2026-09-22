"use client";

interface StatusMarkProps {
  status?: "active" | "warning" | "error" | "calibrating";
  size?: number;
  label?: string;
  showRipple?: boolean;
}

export default function StatusMark({
  status = "active",
  size = 8,
  label,
  showRipple = true,
}: StatusMarkProps) {
  const colorMap = {
    active: "#10b981", // emerald
    warning: "#f59e0b", // amber
    error: "#ef4444", // red
    calibrating: "#3b82f6", // blue
  };

  const currentColor = colorMap[status];

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          width: size,
          height: size,
        }}
      >
        {showRipple && (
          <span
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: currentColor,
              opacity: 0.75,
              animation: "statusPing 2s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
        )}
        <span
          style={{
            position: "relative",
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: currentColor,
          }}
        />
        <style jsx>{`
          @keyframes statusPing {
            75%, 100% {
              transform: scale(2.4);
              opacity: 0;
            }
          }
        `}</style>
      </span>
      {label && (
        <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--colors-body)" }}>
          {label}
        </span>
      )}
    </span>
  );
}
