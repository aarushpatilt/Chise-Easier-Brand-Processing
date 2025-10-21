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
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "0.9rem", opacity: 0.6 }}>@concert_crue</p>
          <h1 style={{ fontSize: "6rem", fontWeight: 600, marginTop: "0.5rem" }}>
            BRAND
          </h1>
          <p style={{ fontSize: "1rem", marginTop: "0.25rem" }}>
            25 Following
          </p>
          <p style={{ fontSize: "0.9rem", opacity: 0.6, marginTop: "1.5rem" }}>
            Brand Theme
          </p>
        </div>

        {/* Small Circle */}
        <div
          style={{
            backgroundColor: "#EA8686",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            alignSelf: "flex-start",
          }}
        />
      </div>

      {/* Color Circles */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4rem",
          justifyContent: "flex-start",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: "#B77474",
          }}
        />
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: "#B52C1E",
          }}
        />
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: "#222",
          }}
        />
      </div>
    </div>
  );
}
