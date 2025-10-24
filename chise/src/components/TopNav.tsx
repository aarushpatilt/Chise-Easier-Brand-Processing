"use client";

import { useEffect, useState, useId, useRef } from "react";

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const gradientId = useId();
  const categories = [
    "Clothing",
    "Drinks",
    "Makeup",
    "Fashion",
    "Electronics",
    "Home",
    "Accessories",
    "Beauty",
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const categoriesContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 2);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const el = categoryRefs.current[selectedCategory];
      const container = categoriesContainerRef.current;
      if (!el || !container) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [selectedCategory]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "auto",
        backgroundColor: isScrolled ? "var(--background)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: "none",
        transition:
          "background-color 200ms ease, backdrop-filter 200ms ease, -webkit-backdrop-filter 200ms ease, box-shadow 200ms ease",
        zIndex: 100,
        display: "block",
        paddingLeft: "3rem",
        paddingRight: "3rem",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", minHeight: "5rem" }}>
      {/* left: brand + tabs */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-cormorant-garamond)",
            color: "var(--theme-color)",
            fontSize: "1.5rem",
            lineHeight: 1,
            letterSpacing: "0.02em",
            fontWeight: 700,
          }}
        >
          CHISE
        </span>

        <h1
          style={{
            color: "var(--foreground)",
            fontWeight: 500,
            fontSize: "0.9rem",
            letterSpacing: "0.01em",
            lineHeight: 0.9,
            marginTop: 0,
          }}
        >
          Brands
        </h1>
        <h1
          style={{
            color: "var(--foreground)",
            fontWeight: 500,
            fontSize: "0.9rem",
            opacity: 0.5,
            letterSpacing: "0.01em",
            lineHeight: 0.9,
            marginTop: 0,
          }}
        >
          Partners
        </h1>

        
      </div>
      {/* center: search */}
      <div
        style={{
          flex: 1,
          maxWidth: "40rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "34rem",
            borderRadius: "24px",
            background: "rgba(58, 50, 255, 0.18)",
            // boxShadow: "0 8px 24px rgba(31,38,135,0.18)",
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            border: "0px solid rgba(58, 50, 255, 0.25)",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "#fff", opacity: 0.9 }}>
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
              height: "28px",
              fontSize: "0.9rem",
              color: "#fff",
            }}
          />
        </div>
      </div>

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
      </div>

      {/* categories row */}
      <div
        style={{
          display: "flex",
          gap: "3.5rem",
          flexWrap: "wrap",
          alignItems: "center",
          position: "relative",
          paddingBottom: "1rem",
          marginTop: "2rem",
        
        }}
        ref={categoriesContainerRef}
      >
        {categories.map((label) => {
          const isSelected = selectedCategory === label;
          return (
            <button
              key={label}
              aria-label={label}
              aria-pressed={isSelected}
              onClick={() => setSelectedCategory(label)}
              ref={(el) => {
                categoryRefs.current[label] = el;
              }}
              style={{
                height: "auto",
                padding: 0,
                borderRadius: 0,
                background: "transparent",
                border: 0,
                color: "#111",
                opacity: isSelected ? 1 : 0.5,
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: `${indicator.left}px`,
            width: `${indicator.width}px`,
            height: "3px",
            background: "#111",
            borderRadius: "2px",
            transition: "left 220ms ease, width 220ms ease",
          }}
          aria-hidden
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "calc(50% - 50vw)",
            width: "100vw",
            height: "0px",
            background: "rgba(0,0,0,0.08)",
          }}
          aria-hidden
        />
      </div>
    </nav>
  );
}
