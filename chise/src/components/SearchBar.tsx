export default function SearchBar() {
    const navItems = [
        { letter: "Explore", label: "Explore", href: "/explore"},
        { letter: "Brands", label: "Brands", href: "/brand-onboarding/assets"},
        { letter: "Dashboard", label: "Dashboard", href: "/dashboard"},
        { letter: "Settings", label: "Settings", href: "/settings"},
      ];
    return (
      <div
        style={{
          width: "100%",
          borderRadius: "24px",
          background: "rgba(58, 50, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.20)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: "0px solid rgba(58, 50, 255, 0.30)",
          display: "flex",               // 👈 added
          flexDirection: "column",       // 👈 added
          justifyContent: "space-between",
          padding: "12px 16px",
          overflow: "hidden",
        }}
      >
        {/* search input */}
        <input
          type="text"
          placeholder="Search..."
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            width: "100%",
            height: "30px", // 👈 smaller height
            fontSize: "0.8rem",
            color: "white",
          }}
        />
  
        {/* bottom buttons row */}
        <div
          style={{
            display: "flex", // 👈 needed for row layout
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          {/* left add button */}
          <button
            aria-label="Add"
            style={{
              height: "25px",
              width: "25px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
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

          {/* middle nav bubbles */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {navItems.map((item) => (
              <a
                href={item.href}
                key={item.label}
                aria-label={item.label}
                style={{
                  height: "25px",
                  padding: "0 10px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>


  
          {/* right controls */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginLeft: "auto" }}>
            {/* settings */}
            <button
              aria-label="Settings"
              style={{
                height: "25px",
                width: "25px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
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
  
            {/* upload */}
            <button
              aria-label="Upload"
              style={{
                height: "25px",
                width: "25px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M12 5l-5 5M12 5l5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }  
