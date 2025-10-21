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
      <SideNav />

      {/* Landing section (normal flow, not fixed) */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          textAlign: "center",

        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            top: "4rem",
            left: "3rem",
            right: 0,
            width: "97vw",
            overflowX: "auto",
            whiteSpace: "nowrap",
            zIndex: 0,
            // Hide scroll bar for "overflowX: auto" containers in this section
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
            //
          }}
        >
          {/* Three duplicated images, smaller horizontal gap */}
          <img
            src="https://cdn.cosmos.so/b8550387-90b8-4287-84e8-072cb7f5501e?format=jpeg"
            alt="Background visual"
            style={{
              display: "inline-block",
              width: "auto",
              height: "90vh",
              objectFit: "cover",
              marginRight: "1rem",
              opacity: 1,
              verticalAlign: "top",
            }}
          />
           <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "35vw",
              minWidth: "320px",
              height: "90vh",
              marginRight: "1rem",
              opacity: 1,
              verticalAlign: "top",
              overflow: "hidden",
              borderTop: "1px solid var(--theme-color)",
              borderLeft: "1px solid var(--theme-color)",
              borderRight: "1px solid var(--theme-color)",
              borderBottom: "none",
              
            }}
          >
            <span
              style={{
                fontSize: "3rem",
                fontFamily: "var(--font-cormorant-garamond)",
                color: "var(--theme-color)",
                whiteSpace: "pre-line",
                textAlign: "left",
                fontWeight: 500,
                letterSpacing: "0.012em",
                lineHeight: 1.1,
                padding: "1.5rem",
              }}
            >
              {"CONNECTING\nBRANDS & ENTREPRENEURS\nTOGETHER"}
            </span>
          </div>
 
          <img
            src="https://cdn.cosmos.so/eb47bc04-f291-4606-a84a-ca9dacc35191?format=jpeg"
            alt="Background visual"
            style={{
              display: "inline-block",
              width: "auto",
              height: "90vh",
              objectFit: "cover",
              marginRight: "1rem",
              opacity: 1,
              verticalAlign: "top",
            }}
          />
          <img
            src="https://cdn.cosmos.so/d3bd5a7a-11bd-48b3-aa26-c1542c108d9f?format=jpeg"
            alt="Background visual"
            style={{
              display: "inline-block",
              width: "auto",
              height: "90vh",
              objectFit: "cover",
             
              opacity: 1,
              verticalAlign: "top",
            }}
          />
        </div>


        {/* Foreground text */}
        {/* <div
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
          }}
        >
          {"CONNECTING \nBRANDS & ENTREPRENEURS \nTOGETHER"}
        </div> */}
      </section>

      {/* add explore text here */}
      <section
        style={{
          position: "relative",
          borderTop: "1px solid var(--theme-color)",
          padding: "3rem 3rem 2rem 4rem",
        }}
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
      <section style={{ paddingLeft: "3rem", }}>
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
