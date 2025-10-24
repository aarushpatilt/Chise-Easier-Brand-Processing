"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BrandSheet from "./BrandSheet";

type ViewGridProps = {
  urls: string[];
  cols?: number; // default 3
  rows?: number; // default 4
  gapPx?: number; // spacing between cells (px)
  interactive?: boolean; // allow iframe interaction
  useScreenshot?: boolean; // ✅ new toggle
};

export default function ViewGrid({
  urls,
  cols = 3,
  rows = 4,
  gapPx = 15,
  interactive = false,
  useScreenshot = false, // ✅ default off
}: ViewGridProps) {
  const capacity = cols * rows;
  const items = useMemo(() => urls.slice(0, capacity), [urls, capacity]);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);


  return (
    <div
      style={{
        width: "100%",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: `${gapPx}px`,
        }}
      >
        {items.map((url, idx) => (
          <GridCell
            key={idx}
            url={url}
            interactive={interactive}
            useScreenshot={useScreenshot} // ✅ pass toggle down
            onOpen={setActiveUrl}
          />
        ))}
        {Array.from({ length: capacity - items.length }).map((_, idx) => (
          <GridPlaceholder key={`ph-${idx}`} />
        ))}
      </div>

      {activeUrl && (
        <FullscreenOverlay
          url={activeUrl}
          onClose={() => setActiveUrl(null)}
        />
      )}
    </div>
  );
}

function GridCell({
  url,
  interactive,
  useScreenshot,
  onOpen,
}: {
  url: string;
  interactive: boolean;
  useScreenshot: boolean;
  onOpen: (url: string) => void;
}) {
  const [showImageFallback, setShowImageFallback] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const screenshotUrl = useMemo(() => {
    const encoded = encodeURIComponent(url);
    return `https://s0.wp.com/mshots/v1/${encoded}?w=1200`;
  }, [url]);

  useEffect(() => {
    if (useScreenshot) return; // ✅ skip iframe fallback logic if using screenshots
    timeoutRef.current = window.setTimeout(() => {
      if (!iframeLoaded) setShowImageFallback(true);
    }, 3500);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [url, iframeLoaded, useScreenshot]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        borderRadius: "20px",
        overflow: "hidden",
        background: "transparent",
        // boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        border: "0.5px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
      }}
      onClick={() => onOpen(url)}
    >
      {/* ✅ Choose between screenshot or live iframe */}
      {useScreenshot ? (
        <img
          src={screenshotUrl}
          alt={url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          loading="lazy"
        />
      ) : !showImageFallback ? (
        <iframe
          src={url}
          title={url}
          onLoad={() => {
            setIframeLoaded(true);
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          referrerPolicy="no-referrer"
          style={{
            width: "100%",
            height: "100%",
            border: "0",
            pointerEvents: interactive ? "auto" : "none",
          }}
        />
      ) : (
        <img
          src={screenshotUrl}
          alt={url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          loading="lazy"
        />
      )}

      <div
        style={{
          position: "absolute",
          left: 8,
          bottom: 8,
          padding: "4px 8px",
          borderRadius: "20px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          fontSize: "0.75rem",
          maxWidth: "90%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
        title={url}
      >
        {(() => {
          try {
            const u = new URL(url);
            let hostname = u.hostname.replace(/^www\./, "");
            // Remove anything after the first '.' (including the dot itself)
            const base = hostname.split(".")[0];
            return base;
          } catch {
            return url;
          }
        })()}
      </div>
    </div>
  );
}

function GridPlaceholder() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        borderRadius: "16px",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        border: "1px dashed rgba(255,255,255,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.9rem",
      }}
    >
      Empty
    </div>
  );
}

function prettyUrl(raw: string): string {
  try {
    const u = new URL(raw);
    return `${u.hostname}${u.pathname.replace(/\/$/, "")}` || raw;
  } catch {
    return raw;
  }
}

function FullscreenOverlay({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [useWhiteIcons, setUseWhiteIcons] = useState(false);
  const screenshotUrl = useMemo(() => {
    const encoded = encodeURIComponent(url);
    return `https://s0.wp.com/mshots/v1/${encoded}?w=1600`;
  }, [url]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const host = useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }, [url]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      onClose();
    }, 300);
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pickBgColor = (): string | null => {
      const host = controlsRef.current;
      if (!host) return null;
      const rect = host.getBoundingClientRect();
      const sampleX = Math.max(0, Math.floor(rect.left + 18));
      const sampleY = Math.max(0, Math.floor(rect.top + 18));
      const prevPointer = host.style.pointerEvents;
      host.style.pointerEvents = "none";
      const el = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;
      host.style.pointerEvents = prevPointer;
      let cur: HTMLElement | null = el;
      while (cur && cur !== document.body) {
        const cs = window.getComputedStyle(cur);
        const bg = cs.backgroundColor;
        if (bg && bg !== "transparent") return bg;
        cur = cur.parentElement as HTMLElement | null;
      }
      return null;
    };

    const toRgb = (s: string): [number, number, number, number] | null => {
      const m = s.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d*\.?\d+))?\)/i);
      if (!m) return null;
      const r = Number(m[1]);
      const g = Number(m[2]);
      const b = Number(m[3]);
      const a = m[4] !== undefined ? Number(m[4]) : 1;
      return [r, g, b, a];
    };

    const luminance = (r: number, g: number, b: number): number => {
      const srgb = [r, g, b].map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const bg = pickBgColor();
      if (!bg) return;
      const rgba = toRgb(bg);
      if (!rgba) return;
      const lum = luminance(rgba[0], rgba[1], rgba[2]);
      setUseWhiteIcons(lum < 0.5);
    };
    const request = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const sc = scrollRef.current;
    window.addEventListener("resize", request);
    window.addEventListener("scroll", request, { passive: true });
    if (sc) sc.addEventListener("scroll", request, { passive: true } as AddEventListenerOptions);
    request();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", request);
      window.removeEventListener("scroll", request as any);
      if (sc) sc.removeEventListener("scroll", request as any);
    };
  }, []);

  const handlePortfolioScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const container = scrollRef.current;
    const target = portfolioRef.current;
    if (!container || !target) return;

    const startY = container.scrollTop;
    const targetY =
      target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 16; // small offset
    const distance = targetY - startY;
    const durationMs = 900;

    let startTime: number | null = null;
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeInOutCubic(progress);
      container.scrollTo({ top: startY + distance * eased });
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 260ms ease, background 0.3s ease",
        animation: isClosing ? "none" : "overlayFadeIn 260ms ease-out both",
        opacity: isClosing ? 0 : 1,
        willChange: "opacity",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflowY: "auto",
          animation: isClosing ? "none" : "panelSlideIn 320ms ease-out both",
          transition: "opacity 260ms ease, transform 260ms ease",
          opacity: isClosing ? 0 : 1,
          transform: isClosing ? "translateY(8px)" : "translateY(0)",
          willChange: "transform, opacity",
        }}
        ref={scrollRef}
      >
        {/* Sticky top-left floating widget */}
        <div
          style={{
            position: "sticky",
            top: 12,
            zIndex: 20000,
            height: 0,
            pointerEvents: "none",
            alignSelf: "stretch",
            marginLeft: "1rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 12,
              display: "flex",
              gap: "8px",
              pointerEvents: "auto",
              background: "rgba(255,255,255,0.0)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "0",
              borderRadius: "9999px",
            }}
            ref={controlsRef}
          >
            {/* Back chevron */}
            <button
              aria-label="Back"
              onClick={handleClose}
              style={{
                height: "35px",
                width: "35px",
                borderRadius: "9999px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: useWhiteIcons ? "#111111"  : "#ffffff", transition: "color 150ms ease" }}>
                <path d="M13 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Save / bookmark */}
            <button
              aria-label="Save"
              style={{
                height: "35px",
                width: "35px",
                borderRadius: "9999px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: useWhiteIcons ? "#111111"  : "#ffffff", transition: "color 150ms ease" }}>
                <path d="M19 21 l-7-5 -7 5 V5 a2 2 0 0 1 2-2 h10 a2 2 0 0 1 2 2 z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Message icon */}
            <button
              aria-label="Message"
              style={{
                height: "35px",
                width: "35px",
                borderRadius: "9999px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: useWhiteIcons ? "#111111"  : "#ffffff", transition: "color 150ms ease" }}>
                <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        {/* Top row: media + sidebar */}
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* left side bar spacer */}
          <div style={{ width: "0rem", height: "100%" }} />
          {/* LEFT: Media + CTA column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            {/* Media box */}
            <div
              style={{
                aspectRatio: "16 / 10",
                height: "75%",
                width: "auto",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#fff",
                // boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                display: "flex",
                marginLeft: "2rem",
                marginRight: "2rem",
                marginTop: "2rem",
                position: "relative",

              }}
            >
              <img
                src={screenshotUrl}
                alt={url}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* CTA button below image */}
            <a
              href="#portfolio"
              onClick={handlePortfolioScroll}
              style={{
                height: "44px",
                padding: "0 18px",
                borderRadius: "9999px",
                background: "var(--theme-color)",
    
            
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.95rem",
                alignSelf: "center",
                marginTop: "1rem"
              }}
            >
              <span>Brand Identity Portfolio</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* RIGHT: Sidebar */}
          <aside
            style={{
              width: "40%",
              height: "95%",
              background: "rgba(255,255,255,0.1)",
             
              borderRadius: "20px",
              color: "#111",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 32px rgba(0,0,0,0.12)",
              minWidth: 0,
              marginRight: "1rem",
            }}
          >

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "#111",
                marginTop: "0rem",
                textDecoration: "underline",
              }}
            >
              {host}
            </a>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "#555",
                marginBottom: "1rem",
              }}
            >
              Sample post describing the project. Thanks to partners and friends
              for support. Visit the website for more details.
            </p>

            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0rem" }}>
              <div
                style={{
                  background: "rgba(var(--foreground-rgb, 0,0,0), 0.05)",
                  color: "var(--foreground)",
                  borderRadius: "20px",
                  padding: "0.24rem 0.7rem",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  minHeight: "1.2rem",
                }}
              >
                Pop-Up
              </div>
              <div
                style={{
                  background: "rgba(var(--foreground-rgb, 0,0,0), 0.05)",
                  color: "var(--foreground)",
                  borderRadius: "20px",
                  padding: "0.24rem 0.7rem",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  minHeight: "1.2rem",
                }}
              >
                $1,000
              </div>
              <div
                style={{
                  background: "rgba(var(--foreground-rgb, 0,0,0), 0.05)",
                  color: "var(--foreground)",
                  borderRadius: "20px",
                  padding: "0.24rem 0.7rem",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.12rem",
                  minHeight: "1.2rem",
                }}
              >
                4.9
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "#f6c425", marginLeft: "0.08rem" }}
                  aria-label="star"
                >
                  <path d="M12 17.25l-6.16 3.73 1.64-7.04L2 9.51l7.19-.61L12 2.5l2.81 6.4 7.19.61-5.48 4.43 1.64 7.04z" />
                </svg>
              </div>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid rgba(0,0,0,0.11)",
                margin: "1.2rem 0",
                width: "100%",
              }}
            />
            {/* 
            <h4 style={{ marginBottom: "0.75rem", fontSize: "0.95rem", color: "#222" }}>
              06 Connections
            </h4> */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "0rem", justifyContent: "flex-end", flex: 1 }}>
              {["Start Applicaiton"].map((name, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.7rem 0.9rem",
                    background: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.0)",
                    borderRadius: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "none",
                      backgroundImage: "url('https://cdn.cosmos.so/ce8cf745-50c1-4e89-99a7-9ac7dbd0a5ca?format=jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#111", fontSize: "0.9rem" }}>{name}</span>
                    <span style={{ fontSize: "0.8rem", color: "#444", opacity: 0.75 }}>
                    
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Bottom: brand sheet */}
        <div id="portfolio" ref={portfolioRef} style={{ width: "100%", scrollMarginTop: 16 }}>
          <BrandSheet brandId={1} />
        </div>
      </div>
    </div>,
    document.body
  );
}
