"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MediaItem = {
  id: string;
  file: File;
  url: string;
  kind: "image" | "video" | "audio";
};

function MediaPreview({ item, index, total, onRemove, onMove }: { item: MediaItem; index: number; total: number; onRemove: (id: string) => void; onMove: (id: string, delta: number) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0rem", alignSelf: "center", width: "100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          display: "block",
          alignSelf: "stretch",
          borderRadius: 0,
          overflow: "hidden",
          background: "transparent",
          border: 0,
          position: "relative",
        }}
      >
        {item.kind === "image" && (
          <img src={item.url} alt={item.file.name} style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }} />
        )}
        {item.kind === "video" && (
          <video src={item.url} controls style={{ width: "100%", height: "auto", display: "block", background: "#000", margin: "0 auto" }} />
        )}
        {item.kind === "audio" && (
          <div style={{ padding: "1rem", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px" }}>
            <audio src={item.url} controls style={{ width: "100%" }} />
          </div>
        )}

        {/* Hover chips - bottom right */}
        {(item.kind === "image" || item.kind === "video") && (
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              opacity: hovered ? 1 : 0,
              transition: "opacity 160ms ease",
            }}
          >
            <div
              style={{
                background: "rgba(17,17,17,0.85)",
                color: "#fff",
                padding: "0.32rem 0.6rem",
                borderRadius: "12px",
                fontSize: "0.8rem",
                maxWidth: "52vw",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={item.file.name}
            >
              {item.file.name}
            </div>

            {/* Move up */}
            <button
              aria-label="Move up"
              onClick={(e) => { e.stopPropagation(); onMove(item.id, -1); }}
              disabled={index === 0}
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#111",
                border: 0,
                width: 32,
                height: 32,
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: index === 0 ? "not-allowed" : "pointer",
                opacity: index === 0 ? 0.4 : 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 15l6-6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Move down */}
            <button
              aria-label="Move down"
              onClick={(e) => { e.stopPropagation(); onMove(item.id, 1); }}
              disabled={index === total - 1}
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#111",
                border: 0,
                width: 32,
                height: 32,
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: index === total - 1 ? "not-allowed" : "pointer",
                opacity: index === total - 1 ? 0.4 : 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 9l-6 6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Remove */}
            <button
              aria-label="Remove"
              onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
              style={{
                background: "rgba(17,17,17,0.9)",
                color: "#fff",
                border: 0,
                width: 32,
                height: 32,
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreateProjectPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  const inputVideoRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const onFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const next: MediaItem[] = [];
    for (const file of Array.from(files)) {
      const type = file.type;
      let kind: MediaItem["kind"] | null = null;
      if (type.startsWith("image/")) kind = "image";
      else if (type.startsWith("video/")) kind = "video";
      else if (type.startsWith("audio/")) kind = "audio";
      if (!kind) continue;
      next.push({ id: `${Date.now()}-${file.name}-${Math.random()}`, file, url: URL.createObjectURL(file), kind });
    }
    if (next.length) setItems((prev) => [...prev, ...next]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onFiles(e.dataTransfer.files);
  }, [onFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const hasItems = items.length > 0;

  const dropZoneStyle = useMemo(() => ({
    border: isDragging ? "2px dashed var(--theme-color)" : "1px dashed rgba(0,0,0,0.18)",
    background: isDragging ? "rgba(58, 50, 255, 0.08)" : "rgba(255,255,255,0.6)",
  }), [isDragging]);

  return (
    <main
      style={{
        display: "flex",
        gap: "1.5rem",
        marginLeft: "0.5rem",
        marginTop: "1rem",
        marginRight: "2rem",

        
        minHeight: "100vh",
      }}
    >
      {/* Floating controls (Back + Save) independent of page layout */}
      <div
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 20000,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            pointerEvents: "auto",
            background: "rgba(255,255,255,0.0)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "0",
            borderRadius: "9999px",
          }}
        >
          <button
            aria-label="Back"
            onClick={() => router.back()}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "#111" }}>
              <path d="M13 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Save"
            onClick={() => alert("Saved (mock)")}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "#111" }}>
              <path d="M19 21 l-7-5 -7 5 V5 a2 2 0 0 1 2-2 h10 a2 2 0 0 1 2 2 z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      {/* Left: Preview column */}
      <section
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "3rem",
        }}
      >
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            background: "rgba(0,0,0,0.035)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: "24px",
            padding: hasItems ? "0" : "2rem 1.25rem",
            minHeight: "60vh",
          }}
        >
          <div
            style={{
              maxWidth: "none",
              width: "100%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {!hasItems && (
              <div
                style={{
                  borderRadius: "20px",
                  padding: "2rem",
                  textAlign: "center",
                  color: "#111",
                  cursor: "pointer",
                  width: "100%",
                  ...dropZoneStyle,
                }}
                onClick={() => inputImageRef.current?.click()}
              >
                <p style={{ margin: 0, fontWeight: 600 }}>Drop files here to start</p>
                <p style={{ marginTop: "0.25rem", opacity: 0.6, fontSize: "0.9rem" }}>Images, videos, or audio</p>
              </div>
            )}

            {items.map((m, idx) => (
              <MediaPreview
                key={m.id}
                item={m}
                index={idx}
                total={items.length}
                onRemove={(id) => setItems((prev) => prev.filter((x) => x.id !== id))}
                onMove={(id, delta) => setItems((prev) => {
                  const i = prev.findIndex((x) => x.id === id);
                  if (i < 0) return prev;
                  const ni = Math.max(0, Math.min(prev.length - 1, i + delta));
                  if (ni === i) return prev;
                  const next = prev.slice();
                  const [sp] = next.splice(i, 1);
                  next.splice(ni, 0, sp);
                  return next;
                })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Right: Tools limited to Image and Video/Audio */}
      <aside
        style={{
          width: "360px",
          display: "flex",
          flexDirection: "column",
     
          height: "95vh",
          position: "sticky",
          top: "0rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "20px",
            color: "#111",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 32px rgba(0,0,0,0.12)",
            minWidth: 0,
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#111" }}>Create project</h3>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#555", marginTop: "0.35rem", marginBottom: "0.75rem" }}>
            Add media to your project. Only Image and Video/Audio are enabled.
          </p>

          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
            <div style={{ background: "rgba(0,0,0,0.05)", color: "#111", borderRadius: "20px", padding: "0.24rem 0.7rem", fontWeight: 500, fontSize: "0.7rem", display: "flex", alignItems: "center", minHeight: "1.2rem" }}>Image</div>
            <div style={{ background: "rgba(0,0,0,0.05)", color: "#111", borderRadius: "20px", padding: "0.24rem 0.7rem", fontWeight: 500, fontSize: "0.7rem", display: "flex", alignItems: "center", minHeight: "1.2rem" }}>Video/Audio</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.25rem" }}>
            <button
              onClick={() => inputImageRef.current?.click()}
              style={{ height: "44px", borderRadius: "12px", background: "var(--theme-color)", color: "#fff", fontWeight: 600, border: 0, cursor: "pointer" }}
            >
              Upload Image
            </button>
            <input ref={inputImageRef} type="file" accept="image/*" multiple onChange={(e) => onFiles(e.target.files)} style={{ display: "none" }} />

            <button
              onClick={() => inputVideoRef.current?.click()}
              style={{ height: "44px", borderRadius: "12px", background: "#111", color: "#fff", fontWeight: 600, border: 0, cursor: "pointer" }}
            >
              Upload Video / Audio
            </button>
            <input ref={inputVideoRef} type="file" accept="video/*,audio/*" multiple onChange={(e) => onFiles(e.target.files)} style={{ display: "none" }} />
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.11)", margin: "1.2rem 0", width: "100%" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "auto" }}>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <Link
                href="/"
                style={{
                  flex: 1,
                  textDecoration: "none",
                  color: "#111",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 0.9rem", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.0)", borderRadius: "14px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e5e5e5" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#111", fontSize: "0.9rem" }}>Cancel</span>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => alert("This is a front-end mock. Persisting is not wired yet.")}
                style={{ flex: 1, background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 0.9rem", background: "var(--theme-color)", border: "1px solid rgba(0,0,0,0.0)", borderRadius: "14px", color: "#fff" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.9rem" }}>Publish</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}


