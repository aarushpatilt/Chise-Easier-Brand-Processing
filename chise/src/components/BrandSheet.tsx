"use client";

import React from "react";

export default function BrandSheet({ brandId }: { brandId: number }) {
    const listOfImageLinks: { [key: number]: string[] } = {
        1: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/3a82d5224690693.680fc514c8446.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/6c3405224690693.680fc514c6645.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/1d5206224690693.680fc514c7447.jpg"
        ],
        2: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/3a82d5224690693.680fc514c8446.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/6c3405224690693.680fc514c6645.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/1d5206224690693.680fc514c7447.jpg"
        ]
    };

    const images = listOfImageLinks[brandId] || [];

    return (
        <div
            style={{
                backgroundColor: "var(--background)",
                color: "#111",
                minHeight: "100vh",
                marginLeft: "1rem",
                marginRight: "1rem",
                borderRadius: "20px",
                border: "0px solid var(--theme-color)",
                padding: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "0",
                overflow: "hidden" // Ensure child images don't overflow the rounded corners
            }}
        >
            {images.length > 0 ? (
                images.map((imgUrl, idx) => (
                    <img
                        key={idx}
                        src={imgUrl}
                        alt={`Brand ${brandId} image ${idx + 1}`}
                        style={{
                            width: "100%",
                            height: "100vh",
                            objectFit: "cover",
                            borderRadius: 0,
                            boxShadow: "none",
                            background: "#fff",
                            margin: 0,
                            display: "block"
                        }}
                    />
                ))
            ) : (
                <span style={{ color: "#aaa", fontStyle: "italic" }}>No images found for this brand.</span>
            )}
        </div>
    );
}
