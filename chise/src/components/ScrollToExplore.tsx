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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", alignSelf: "center", marginTop: "3rem" }}>
      <span style={{ fontSize: "0.9rem", color: "var(--foreground)", fontWeight: 400, letterSpacing: "0.02em" }}>
        {label}
      </span>
      <a
        href={`#${targetId}`}
        aria-label="Scroll to explore section"
        onClick={handleClick}
        style={{
          height: "44px",
          width: "44px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--theme-color)",
          textDecoration: "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M12 19l5-5M12 19l-5-5"
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


