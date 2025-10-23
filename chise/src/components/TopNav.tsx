"use client";

import { useEffect, useState, useId } from "react";

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const gradientId = useId();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 2);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "5rem",
        backgroundColor: isScrolled ? "rgba(255,255,255,0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: "none",
        transition:
          "background-color 200ms ease, backdrop-filter 200ms ease, -webkit-backdrop-filter 200ms ease, box-shadow 200ms ease",
        zIndex: 100,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      {/* left: hamburger */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flex: 1 }}>
        <button aria-label="Open menu" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--foreground)" }}>
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* center title */}
      <span
        style={{
          fontFamily: "var(--font-cormorant-garamond)",
          color: "var(--foreground)",
          fontSize: "1.5rem",
          lineHeight: "0.75",
          letterSpacing: "0.02em",
          fontWeight: "600",
          display: "block",
          textAlign: "center",
        }}
      >
        CHISE
        <br />
        MARKETPLACE
      </span>

      {/* right controls */}
      <div style={{ display: "flex", gap: "1.35rem", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
        {/* Create button */}
        <button
          style={{
            height: "2.25rem",
            borderRadius: "20px",
            background: "#111",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
          }}
        >
          Create
        </button>

        {/* Lightning icon */}
        <button aria-label="Lightning" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--foreground)" }}>
            {/* Feather 'zap' path for exact shape */}
            <path d="M13 2 L3 14 h7 l-1 8 10-12 h-7 l1-8 z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Bookmark icon */}
        <button aria-label="Bookmark" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--foreground)" }}>
            {/* Feather 'bookmark' path with no roundedness */}
            <path d="M19 21 L12 16 5 21 V5 A2 2 0 0 1 7 3 H17 A2 2 0 0 1 19 5 Z" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
          </svg>
        </button>

        {/* Avatar + Chevron grouped tighter */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Gradient avatar */}
          <svg width="1.75rem" height="1.75rem" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <radialGradient id={gradientId} cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#FFA3B1" />
                <stop offset="55%" stopColor="#FF7D8C" />
                <stop offset="100%" stopColor="#FF7B53" />
              </radialGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill={`url(#${gradientId})`} />
          </svg>

          {/* Chevron */}
          <button aria-label="Menu" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--foreground)" }}>
              <path d="M7 11l5 5 5-5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
