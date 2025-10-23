"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Inside layout.tsx

export default function BrandOnboardingLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sticky Sidebar */}
        <aside
          style={{
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
            height: "100vh",
            width: "250px",
            padding: "3rem 2rem",
            borderRight: "1px solid var(--theme-color)",
            
            background: "var(--background)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Back button */}
          <button
            aria-label="Go back"
            onClick={() => router.push('/')}
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid var(--theme-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--theme-color)",
              cursor: "pointer",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <h2
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
              fontWeight: 600,
              fontSize: "1.5rem",
              marginBottom: "1rem",
              color: "var(--theme-color)",

              
            }}
          >
            ONBOARDING
          </h2>
  
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              color: "var(--foreground)",
            }}
          >
            {[
              { href: "/brand-onboarding/assets", label: "Brand Assets" },
              { href: "/brand-onboarding/menu", label: "Menu Templates" },
              { href: "/brand-onboarding/supply-chain", label: "Supply Chain" },
              { href: "/brand-onboarding/restrictions", label: "Restrictions" },
              { href: "/brand-onboarding/review", label: "Review & Submit" }
            ].map((item) => {
              const pathname = usePathname();
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  style={{ 
                    color: isActive ? "var(--theme-color)" : "var(--foreground)",
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>
  
        {/* Main Content */}
        <main style={{ flex: 1, padding: "4rem 6rem", overflowY: "auto" }}>{children}</main>
      </div>
    );
  }
  