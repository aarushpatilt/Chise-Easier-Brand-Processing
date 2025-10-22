"use client";

import { useEffect, useState } from "react";

export default function TopNav() {
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
        top: 0,
        left: 0,
        width: "100%",
        height: "4rem",
        backgroundColor: isScrolled ? "rgba(255,255,255,0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: "none",
        transition:
          "background-color 200ms ease, backdrop-filter 200ms ease, -webkit-backdrop-filter 200ms ease, box-shadow 200ms ease",
        zIndex: 100,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-cormorant-garamond)",
          color: "var(--foreground)",
          fontSize: "1.5rem",
          lineHeight: "0.75",
          letterSpacing: "0.02em",
          fontWeight: "600",
          display: "block", // 👈 make it block-level
          textAlign: "center", // 👈 center the text
        }}
      >
        CHISE
        <br />
        MARKETPLACE
      </span>
    </nav>
  );
}
