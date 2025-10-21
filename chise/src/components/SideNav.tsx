"use client";

import { useEffect, useState } from "react";

export default function SideNav() {
  // Letters and labels for navigation
  const navItems = [
    { letter: "G", label: "Globe" },
    { letter: "F", label: "File" },
    { letter: "W", label: "Window" },
    { letter: "S", label: "Settings" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

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
        left: 0,
        top: 0,
        height: "100dvh",
        width: "3rem",
        borderRight: "1px solid var(--theme-color)", // Use theme color for border
        backgroundColor: isScrolled ? "rgba(255,255,255,0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
        boxShadow: isScrolled ? "1px 0 6px rgba(0,0,0,0.06)" : "none",
        transition:
          "background-color 200ms ease, backdrop-filter 200ms ease, -webkit-backdrop-filter 200ms ease, box-shadow 200ms ease",
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            aria-label={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s, color 0.2s",
              opacity: 0.8,
              color: "var(--theme-color)",
              fontFamily: "var(--font-cormorant-garamond)",
              fontSize: "1.5rem",
              fontWeight: 600,
              width: "2rem",
              height: "2rem",
              borderRadius: "0.5rem",
              userSelect: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = "0.8";
            }}
          >
            {item.letter}
          </a>
        ))}
      </div>
    </nav>
  );
}

