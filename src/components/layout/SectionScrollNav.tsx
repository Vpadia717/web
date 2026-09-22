"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SectionItem {
  id: string;
  label: string;
  number: string;
}

const SECTIONS: SectionItem[] = [
  { id: "hero", label: "Overview", number: "01" },
  { id: "device", label: "3D Prototype", number: "02" },
  { id: "features", label: "Biomarkers", number: "03" },
  { id: "dashboard", label: "Evaluation", number: "04" },
  { id: "performance", label: "Interventions", number: "05" },
  { id: "architecture", label: "Architecture", number: "06" },
  { id: "science", label: "Science", number: "07" },
];

export default function SectionScrollNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard Up / Down arrows to step section-by-section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "PageDown") {
        e.preventDefault();
        stepSection(1);
      } else if (e.key === "PageUp") {
        e.preventDefault();
        stepSection(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  const stepSection = (direction: number) => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    const nextIndex = Math.min(Math.max(0, currentIndex + direction), SECTIONS.length - 1);
    const targetEl = document.getElementById(SECTIONS[nextIndex].id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="section-scroll-nav"
      style={{
        position: "fixed",
        right: "1.25rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        background: "var(--colors-surface-glass)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--colors-hairline)",
        padding: "0.625rem 0.375rem",
        borderRadius: "var(--rounded-pill)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      {/* Up Quick Jump Button */}
      <button
        type="button"
        onClick={() => stepSection(-1)}
        aria-label="Previous section"
        style={{
          background: "none",
          border: "none",
          color: "var(--colors-muted)",
          cursor: "pointer",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <ChevronUp size={15} />
      </button>

      {/* Section Indicator Dots */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.25rem 0" }}>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <div
              key={sec.id}
              style={{ position: "relative", display: "flex", alignItems: "center" }}
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <button
                type="button"
                onClick={() => scrollToSection(sec.id)}
                aria-label={`Jump to ${sec.label}`}
                style={{
                  width: isActive ? 10 : 7,
                  height: isActive ? 22 : 7,
                  borderRadius: "9999px",
                  background: isActive ? "var(--colors-primary)" : "var(--colors-hairline)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: 0,
                }}
              />

              {/* Hover Tooltip Pill */}
              {(isHovered || isActive) && (
                <div
                  style={{
                    position: "absolute",
                    right: "1.5rem",
                    whiteSpace: "nowrap",
                    background: "var(--colors-ink)",
                    color: "#ffffff",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    pointerEvents: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    opacity: isHovered ? 1 : 0.85,
                    transition: "opacity 0.15s ease",
                  }}
                >
                  <span style={{ color: "#94a3b8", fontFamily: "var(--font-mono)" }}>{sec.number}</span>
                  <span>{sec.label}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Down Quick Jump Button */}
      <button
        type="button"
        onClick={() => stepSection(1)}
        aria-label="Next section"
        style={{
          background: "none",
          border: "none",
          color: "var(--colors-muted)",
          cursor: "pointer",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <ChevronDown size={15} />
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .section-scroll-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
