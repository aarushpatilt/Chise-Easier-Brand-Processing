import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import ViewGrid from "@/components/ViewGrid";
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Home() {
  return (
    <>
      <TopNav />
      {/* <SideNav /> */}
      
      

      {/* Landing section (normal flow, not fixed) */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          textAlign: "left",

        }}
      >
        {/* Row: left text column, right images column */}
        <div style={{ display: "flex", width: "100vw", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          {/* Left column: heading + subheading */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingLeft: "2rem", paddingTop: "10rem", flex: "0 0 45vw", maxWidth: "45vw" }}>
            {/* Foreground text */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                fontFamily: "var(--font-cormorant-garamond)",
                color: "var(--theme-color)",
                fontSize: "4rem",
                fontWeight: 400,
                whiteSpace: "pre-line",
                lineHeight: 0.75,
                letterSpacing: "0.001em",
                textAlign: "left",
              }}
            >
              {"CONNECTING \nBRANDS & ENTREPRENEURS \nTOGETHER"}
            </div>

            {/* subheading explaining the application */}
            <p
              style={{
                fontSize: "1rem",
                color: "var(--foreground)",
                textAlign: "left",
                fontWeight: 600,
                marginTop: "1rem",
              }}
            >
              Expanding retail for brands. Simplifying store ownership for entrepreneurs.
            </p>

            {/* Down arrow to scroll to explore section */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", alignSelf: "center", marginTop: "3rem" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--foreground)", fontWeight: 400, letterSpacing: "0.02em" }}>
                explore brands
              </span>
              <a
                href="#explore"
                aria-label="Scroll to explore section"
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
          </div>

          {/* Right column: images row */}
          <div
            style={{
              flex: "1 1 auto",
              overflowX: "auto",
              display: "flex",
              gap: "1rem",
              paddingTop: "6rem",
              paddingRight: "1rem",
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
                height: "90vh",
                objectFit: "cover",
                opacity: 1,
              }}
            />
            <img
              src="https://cdn.cosmos.so/eb47bc04-f291-4606-a84a-ca9dacc35191?format=jpeg"
              alt="Background visual"
              style={{
                width: "auto",
                height: "90vh",
                objectFit: "cover",
                opacity: 1,
              }}
            />
            <img
              src="https://cdn.cosmos.so/d3bd5a7a-11bd-48b3-aa26-c1542c108d9f?format=jpeg"
              alt="Background visual"
              style={{
                width: "auto",
                height: "90vh",
                objectFit: "cover",
                opacity: 1,
              }}
            />
          </div>
        </div>
      </section>

      {/* add explore text here */}
      <section
        style={{
          position: "relative",
          borderTop: "1px solid var(--theme-color)",
          padding: "3rem 3rem 2rem 2rem",
        }}
        id="explore"
      >

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant-garamond)",
            color: "var(--theme-color)",
            fontWeight: 400,
            fontSize: "4rem",
            letterSpacing: "0.01em",
            lineHeight: 0.9,

          }}
        >
          EXPLORE BRANDS
        </h1>

        {/* Subtitle */}
        <p
          style={{

            fontSize: "1rem",
            color: "var(--foreground)",
          
          }}
        >
          The latest collection of brands.
        </p>




      </section>

      {/* ViewGrid below landing section */}
      <section style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
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

            "https://hyperbolic.studiofreight.com/",
            "https://getmocha.com/",
            "https://www.nardove.com/",
          ]} />
      </section>

      {/* Fixed Search Bar */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          width: "100vw",
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
