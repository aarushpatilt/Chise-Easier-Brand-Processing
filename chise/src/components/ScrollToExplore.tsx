"use client";

type ScrollToExploreProps = {
  targetId?: string;
  label?: string;
};

export default function ScrollToExplore({ targetId = "explore", label = "explore brands" }: ScrollToExploreProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) {
      window.location.hash = `#${targetId}`;
      return;
    }

    // Account for fixed top nav (~4rem) and a small breathing offset
    const topOffsetPx = 72; // prevents overshoot under fixed nav

    const startY = window.pageYOffset;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - topOffsetPx;
    const distance = targetY - startY;
    const durationMs = 900; // slower animation

    let startTime: number | null = null;
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", alignSelf: "flex-start", marginTop: "3rem" }}>
      <a
        href={`#${targetId}`}
        aria-label="Scroll to explore section"
        onClick={handleClick}
        style={{
          height: "44px",
          padding: "0 18px",
          borderRadius: "9999px",
          background: "linear-gradient(90deg, #0a2070 0%, #0e2aa2 45%, #0b38dc 100%)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 4px 16px rgba(10,32,112,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: "#ffffff",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "0.95rem",
        }}
      >
        <span>Explore Brands</span>
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
  );
}


