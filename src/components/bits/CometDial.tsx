"use client";

interface CometDialProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  unit?: string;
  color?: string;
}

export default function CometDial({
  value,
  size = 72,
  strokeWidth = 6,
  label,
  unit = "%",
  color = "#111111",
}: CometDialProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--colors-hairline)"
            strokeWidth={strokeWidth}
          />
          {/* Progress comet arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--colors-ink)", lineHeight: 1 }}>
            {Math.round(value)}
            <span style={{ fontSize: "0.65rem", fontWeight: 500, color: "var(--colors-muted)" }}>{unit}</span>
          </span>
        </div>
      </div>
      {label && (
        <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--colors-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </span>
      )}
    </div>
  );
}
