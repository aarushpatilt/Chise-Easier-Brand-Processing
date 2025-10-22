"use client";

import React from "react";

export default function BrandSheet() {
    return (
        <div
            style={{
                backgroundColor: "#fafafa",
                color: "#111",
                minHeight: "100vh",
                padding: "2rem",

                display: "flex",
                flexDirection: "column",

            }}
        >
            {/* Top Section */}
            <div style={{ display: "flex" }}>
                <div>
                    <h1 style={{ fontSize: "6rem", fontWeight: 500, fontFamily: "var(--font-cormorant-garamond)", color: "var(--theme-color)", margin: "0rem", padding: "0rem", lineHeight: "1" }}>
                        BRAND
                    </h1>
                    <p style={{ fontSize: "1rem", margin: "0rem", padding: "0rem", fontWeight: 500 }}>
                        All information about the brand
                    </p>
                </div>

                {/* Small Circle */}
            </div>
            <div
                style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "var(--theme-color)",
                    margin: "2rem 0"
                }}
            />



            {/* Color Circles */}
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "flex-start", width: "100%" }}>
                <p style={{ fontSize: "2rem", margin: "0rem", padding: "0rem", fontWeight: 500, flexShrink: 0, fontFamily: "var(--font-cormorant-garamond)" }}>
                    COLOR PALETTE
                </p>
                

                <div
                    style={{
                        display: "flex",
                        alignItems: "top",
                        gap: "4rem",
                        marginTop: "0rem",
                        justifyContent: "flex-end",
                        width: "100%",
                        alignSelf: "flex-end",
                    }}
                >
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            backgroundColor: "#B77474",
                        }}
                    />
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            backgroundColor: "#B52C1E",
                        }}
                    />
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            backgroundColor: "#222",
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "var(--theme-color)",
                    margin: "2rem 0"
                }}
            />

            <div style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "flex-start", width: "100%" }}>
                <p style={{ fontSize: "2rem", margin: "0rem", padding: "0rem", fontWeight: 500, flexShrink: 0, fontFamily: "var(--font-cormorant-garamond)" }}>
                    TYPOGRAPHY
                </p>
                

                <div
                    style={{
                        display: "flex",
                        alignItems: "top",
                        gap: "4rem",
                        marginTop: "0rem",
                        justifyContent: "flex-end",
                        width: "100%",
                        alignSelf: "flex-end",
                    }}
                >
                    
                </div>
            </div>
        </div>
    );
}
