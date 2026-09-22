"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";

export default function GlobalShortcuts() {
  const { toggleTheme } = useTheme();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      const target = document.activeElement;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        (target as HTMLElement)?.isContentEditable;

      if (isInput) return;

      // 1. Toggle Theme on 'd' or 'D' or 't' or 'T'
      if (e.key.toLowerCase() === "d" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // 2. Open Shortcuts Modal on '?' (Shift + /)
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setIsHelpOpen((prev) => !prev);
        return;
      }

      // 3. Jump to Sections 1-7
      const sectionMap: Record<string, string> = {
        "1": "hero",
        "2": "device",
        "3": "features",
        "4": "dashboard",
        "5": "performance",
        "6": "architecture",
        "7": "science",
      };

      if (sectionMap[e.key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const el = document.getElementById(sectionMap[e.key]);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      // 4. 3D Shortcuts: Space (Orbit), X (X-Ray), A (Assemble), E (Explode)
      if (e.code === "Space" && !e.ctrlKey && !e.metaKey) {
        // Prevent default scrolling when toggling 3D orbit
        const deviceEl = document.getElementById("device");
        const rect = deviceEl?.getBoundingClientRect();
        const isInDeviceView = rect && rect.top <= window.innerHeight && rect.bottom >= 0;
        if (isInDeviceView) {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("longevity-3d-toggle-orbit"));
        }
      } else if (e.key.toLowerCase() === "x" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("longevity-3d-toggle-xray"));
      } else if (e.key.toLowerCase() === "a" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("longevity-3d-assemble"));
      } else if (e.key.toLowerCase() === "e" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("longevity-3d-explode"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return <KeyboardShortcutsModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />;
}
