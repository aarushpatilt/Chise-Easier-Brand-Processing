"use client";
import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import ViewGrid from "@/components/ViewGrid";
import ScrollToExplore from "@/components/ScrollToExplore";
import { Cormorant_Garamond } from "next/font/google";
import { useEffect, useRef } from "react";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Home() {
  const exploreRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targets = [exploreRef.current, gridRef.current].filter(Boolean) as Element[];
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("reveal--in");
            el.classList.remove("reveal--out");
          } else {
            el.classList.add("reveal--out");
            el.classList.remove("reveal--in");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <TopNav />
      {/* <SideNav /> */}
      
      {/*
      // Landing section (normal flow, not fixed)
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          textAlign: "left",
          paddingTop: "1rem",

        }}
      >
        // Row: left text column, right images column
        <div style={{ display: "flex", width: "100vw", height: "130vh", alignItems: "flex-start", justifyContent: "space-between", gap: "5rem" }}>
          // Left column: heading + subheading
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingLeft: "2rem", paddingTop: "15rem", flex: "0 0 45vw", maxWidth: "45vw" }}>
            // Foreground text
            <div
              style={{
                position: "relative",
                zIndex: 2,
                fontFamily: "var(--font-cormorant-garamond)",
                color: "var(--theme-color)",
                fontSize: "4rem",
                fontWeight: 500,
                whiteSpace: "pre-line",
                lineHeight: 0.75,
                letterSpacing: "0.001em",
                textAlign: "left",
              }}
            >
              {"CONNECTING \nBRANDS & ENTREPRENEURS \nTOGETHER"}
            </div>

            // subheading explaining the application
            <p
              style={{
                fontSize: "1rem",
                color: "var(--foreground)",
                textAlign: "left",
                fontWeight: 500,

                marginTop: "1rem",
              }}
            >
              Expanding retail for brands & <br /> Simplifying store ownership for entrepreneurs.
            </p>

            <ScrollToExplore />
          </div>

          // Right column: images row
          <div
            style={{
              flex: "1 1 auto",
              overflowX: "auto",
              display: "flex",
              gap: "1rem",
              paddingTop: "6rem",
              paddingRight: "1rem",
              borderRadius: "20px",
              // Hide scroll bar for "overflowX: auto" containers in this section
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
            }}
          >
            <img
              src="https://cdn.cosmos.so/b8550387-90b8-4287-84e8-072cb7f5501e?format=jpeg"
              alt="Background visual"
              style={{
                width: "auto",
                height: "100vh",
                objectFit: "cover",
                opacity: 1,
                borderRadius: "20px",
              }}
            />
            <img
              src="https://cdn.cosmos.so/eb47bc04-f291-4606-a84a-ca9dacc35191?format=jpeg"
              alt="Background visual"
              style={{
                width: "auto",
                height: "100vh",
                objectFit: "cover",
                opacity: 1,
                borderRadius: "20px",
              }}
            />
            <img
              src="https://cdn.cosmos.so/d3bd5a7a-11bd-48b3-aa26-c1542c108d9f?format=jpeg"
              alt="Background visual"
              style={{
                width: "auto",
                height: "100vh",
                objectFit: "cover",
                opacity: 1,
                borderRadius: "20px",
              }}
            />
          </div>
        </div>
      </section>
      */}

      {/* add explore text here */}
      <section
        style={{
          position: "relative",
          borderTop: "0px solid var(--theme-color)",
          padding: "0rem 3rem 2rem 2rem",
          marginTop: "5rem",
        }}
        id="explore"
      >

        {/* Title */}
        <h1
          ref={exploreRef}
          className="reveal reveal--out"
          style={{
            // fontFamily: "var(--font-cormorant-garamond)",
            color: "var(--foreground)",
            fontWeight: 500,
            fontSize: "2rem",
            letterSpacing: "0.01em",
            lineHeight: 0.9,
            marginTop: "1rem",
   
          }}
        >
          BRANDS
        </h1>

        {/* Subtitle */}
        {/* <p
          style={{

            fontSize: "1rem",
            color: "var(--foreground)",
          
          }}
        >
          The latest collection of brands.
        </p> */}




      </section>

      {/* ViewGrid below landing section */}
      <section ref={gridRef} className="reveal reveal--out" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        <ViewGrid
          interactive={false}
          useScreenshot={true}
          urls={[
            "https://webdesigninspiration.io",
            "https://maximsiebert.com",
            "https://orchestra.org",

            "https://devouringdetails.com/",
            "https://www.adaline.ai/",
            "https://johannadarrieta.com/",

            "https://uncoverlab.co",
            "https://getmocha.com/",
            "https://www.nardove.com/",
          ]} />
      </section>

      {/* Fixed Search Bar */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          width: "50vw",
          left: "51vw",

        
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <SearchBar />
      </div>
    </>
  );
}
