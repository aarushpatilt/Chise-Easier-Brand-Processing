"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
          />
        ))}
        {Array.from({ length: capacity - items.length }).map((_, idx) => (
          <GridPlaceholder key={`ph-${idx}`} />
        ))}
      </div>
    </div>
  );
}

function GridCell({
  url,
  interactive,
  useScreenshot,
}: {
  url: string;
  interactive: boolean;
  useScreenshot: boolean;
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
      }}
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
