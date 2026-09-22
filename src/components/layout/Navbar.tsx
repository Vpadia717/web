"use client";

import { useState, useEffect } from "react";
import { Activity, Menu, X, Search, Sun, Moon } from "lucide-react";
import OmniMasterSearch from "@/components/search/OmniMasterSearch";
import { useTheme } from "@/components/providers/ThemeProvider";
import KeyboardShortcutsModal from "@/components/shortcuts/KeyboardShortcutsModal";

const NAV_LINKS = [
  { href: "#hero", label: "Overview" },
  { href: "#device", label: "Prototype" },
  { href: "#features", label: "Biomarkers" },
  { href: "#dashboard", label: "Evaluation" },
  { href: "#performance", label: "Interventions" },
  { href: "#architecture", label: "Architecture" },
  { href: "#science", label: "Science" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      // / shortcut when not inside input
      if (
        e.key === "/" &&
        !isSearchOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="navbar-inner">
          {/* Logo & Version Tag */}
          <a href="#hero" className="navbar-logo">
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "var(--colors-primary)",
                color: "var(--colors-on-primary)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Activity size={16} />
            </span>
            <span style={{ fontWeight: 700, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>LongevityOS</span>
            <span
              style={{
                fontSize: "0.6875rem",
                background: "var(--colors-surface-soft)",
                color: "var(--colors-muted)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid var(--colors-hairline)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              v2.4
            </span>
          </a>

          {/* Desktop Links + Search + Theme + CTA */}
          <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleLinkClick} id={`nav-${link.label.toLowerCase()}`}>
                  {link.label}
                </a>
              </li>
            ))}

            {/* Omni Master Search Trigger in Navbar */}
            <li>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsSearchOpen(true);
                }}
                className="omni-search-nav-btn"
                aria-label="Open Master Search"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--colors-surface-soft)",
                  border: "1px solid var(--colors-hairline)",
                  borderRadius: "var(--rounded-pill)",
                  padding: "5px 11px",
                  fontSize: "0.75rem",
                  color: "var(--colors-muted)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <Search size={13} color="var(--colors-muted)" style={{ flexShrink: 0 }} />
                <span className="search-nav-text">Search...</span>
                <kbd
                  style={{
                    fontSize: "0.625rem",
                    fontFamily: "var(--font-mono)",
                    background: "var(--colors-canvas)",
                    border: "1px solid var(--colors-hairline)",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    color: "var(--colors-ink)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    lineHeight: "1.1",
                    flexShrink: 0,
                  }}
                >
                  {isMac ? "⌘K" : "Ctrl K"}
                </kbd>
              </button>
            </li>

            {/* Dark / Light Mode Animated Transmission Switcher */}
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Dark/Light Mode"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode (D)`}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--rounded-pill)",
                  background: "var(--colors-surface-soft)",
                  border: "1px solid var(--colors-hairline)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--colors-ink)",
                  transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  flexShrink: 0,
                }}
                className="theme-toggle-btn"
              >
                {theme === "dark" ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#64748b" />}
              </button>
            </li>

            {/* Keyboard Shortcuts Trigger Button */}
            <li>
              <button
                type="button"
                onClick={() => setIsShortcutsOpen(true)}
                aria-label="Keyboard Shortcuts"
                title="Keyboard Shortcuts (?)"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "var(--rounded-pill)",
                  background: "var(--colors-surface-soft)",
                  border: "1px solid var(--colors-hairline)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--colors-muted)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  flexShrink: 0,
                }}
              >
                ?
              </button>
            </li>

            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
              <a
                href="#device"
                className="btn btn-primary btn-sm"
                onClick={handleLinkClick}
                style={{ fontSize: "0.8125rem", whiteSpace: "nowrap", padding: "0 1rem" }}
              >
                Explore 3D
              </a>
            </li>
          </ul>

          {/* Right Mobile Actions: 1-Tap Theme + 1-Tap Search + Hamburger Menu */}
          <div className="mobile-actions-group" style={{ display: "none", alignItems: "center", gap: "0.375rem" }}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title="Toggle Theme"
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--rounded-md)",
                background: "var(--colors-surface-soft)",
                border: "1px solid var(--colors-hairline)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--colors-ink)",
                cursor: "pointer",
              }}
            >
              {theme === "dark" ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#64748b" />}
            </button>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--rounded-md)",
                background: "var(--colors-surface-soft)",
                border: "1px solid var(--colors-hairline)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--colors-ink)",
                cursor: "pointer",
              }}
            >
              <Search size={17} />
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--rounded-md)",
                background: "var(--colors-surface-soft)",
                border: "1px solid var(--colors-hairline)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--colors-ink)",
                cursor: "pointer",
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Global Omni Command Palette Modal */}
      <OmniMasterSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />

      <style jsx global>{`
        @media (max-width: 1200px) and (min-width: 1025px) {
          .navbar-links {
            gap: 0.85rem !important;
          }
          .navbar-links a {
            font-size: 0.8125rem !important;
          }
          .search-nav-text {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .mobile-actions-group {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
          .navbar-links {
            display: none !important;
          }
          .navbar-links.open {
            display: flex !important;
            flex-direction: column !important;
            position: absolute !important;
            top: 64px !important;
            left: 0 !important;
            right: 0 !important;
            background: #ffffff !important;
            padding: 1.25rem 1.5rem 1.75rem 1.5rem !important;
            border-bottom: 1px solid var(--colors-hairline) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
            gap: 1rem !important;
            align-items: stretch !important;
          }
          .navbar-links.open li {
            width: 100% !important;
          }
          .navbar-links.open a,
          .navbar-links.open button {
            width: 100% !important;
            text-align: left !important;
            justifyContent: flex-start !important;
          }
          .navbar-links.open a.btn-primary {
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
}
