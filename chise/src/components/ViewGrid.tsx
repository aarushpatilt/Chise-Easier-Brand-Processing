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
  gapPx = 16,
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
        margin: "0 auto",
        padding: "1rem",
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
        borderRadius: "15px",
        overflow: "hidden",
        background: "transparent",
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
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
          borderRadius: 8,
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          fontSize: "0.75rem",
          maxWidth: "90%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
        title={url}
      >
        {prettyUrl(url)}
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
  const screenshotUrl = useMemo(() => {
    const encoded = encodeURIComponent(url);
    return `https://s0.wp.com/mshots/v1/${encoded}?w=1600`;
  }, [url]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255, 255, 255, 0.35)",
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.3s ease",
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
        }}
      >
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
          {/* LEFT: Image */}
          <div
            style={{
              aspectRatio: "16 / 10",
              height: "75%",
              width: "auto",
              borderRadius: "0px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              display: "flex",
              marginLeft: "0rem",
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

          {/* RIGHT: Sidebar */}
          <aside
            style={{
              width: "30%",
              height: "95%",
              background: "#fff",
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
            {/* bottom buttons row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              {/* left add button */}
              <button
                aria-label="Add"
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "9999px",
                  background: "rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* right controls */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {/* settings */}
                <button
                  aria-label="Settings"
                  style={{
                    height: "35px",
                    width: "35px",
                    borderRadius: "9999px",
                    background: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#111",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6h6M14 6h6M10 6v12M4 18h6M14 18h6M14 18v-8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* X button to close the fullscreen overlay */}
                <button
                  aria-label="Close"
                  onClick={onClose}
                  style={{
                    height: "35px",
                    width: "35px",
                    borderRadius: "9999px",
                    background: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#111",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "#111",
                marginTop: "1rem",
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
                  borderRadius: "15px",
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
                  borderRadius: "15px",
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
                  borderRadius: "15px",
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
        <div style={{ width: "100%" }}>
          <BrandSheet />
        </div>
      </div>
    </div>,
    document.body
  );
}
