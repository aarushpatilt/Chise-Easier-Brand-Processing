"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Inside layout.tsx

export default function BrandOnboardingLayout({ children }: { children: React.ReactNode }) {
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
            borderRight: "1px solid #eee",
            background: "#fafafa",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
              fontWeight: 500,
              fontSize: "1.25rem",
              marginBottom: "1rem",
              color: "var(--theme-color)",
              
              
            }}
          >
            Onboarding
          </h2>
  
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontFamily: "var(--font-cormorant-garamond)",
              color: "var(--foreground)",
            }}
          >
            <a href="/brand-onboarding/assets" style={{ color: "#3A32FF" }}>• Brand Assets</a>
            <a href="/brand-onboarding/menu">• Menu Templates</a>
            <a href="/brand-onboarding/supply-chain">• Supply Chain</a>
            <a href="/brand-onboarding/restrictions">• Restrictions</a>
            <a href="/brand-onboarding/review">• Review & Submit</a>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main style={{ flex: 1, padding: "4rem 6rem", overflowY: "auto" }}>{children}</main>
      </div>
    );
  }
  