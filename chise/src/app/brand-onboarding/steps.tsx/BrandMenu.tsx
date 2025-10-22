"use client";

import React, { useState } from "react";

export default function BrandMenu() {
  const [formData, setFormData] = useState({
    menuList: "",
    menuListNotes: "",
    ingredientInfo: "",
    ingredientInfoNotes: "",
    customizationRules: "",
    customizationRulesNotes: "",
    seasonalItems: "",
    seasonalItemsNotes: "",
    printableTemplates: "",
    printableTemplatesNotes: "",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0].name });
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const fields = [
    {
      label: "MENU LIST",
      name: "menuList",
      note: "Item names, descriptions, and prices (PDF or spreadsheet).",
    },
    {
      label: "INGREDIENT / ALLERGEN INFO",
      name: "ingredientInfo",
      note: "Ingredient lists, allergen disclosures, or sourcing details.",
    },
    {
      label: "CUSTOMIZATION RULES",
      name: "customizationRules",
      note: "Specify restrictions like 'can’t change bean origin or base ingredients'.",
    },
    {
      label: "SEASONAL / SIGNATURE ITEMS",
      name: "seasonalItems",
      note: "Highlight limited-time or core menu items for operators.",
    },
    {
      label: "PRINTABLE / EDITABLE TEMPLATES",
      name: "printableTemplates",
      note: "PDF, Canva, or Figma menu layouts for branding.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        minHeight: "100vh",
        padding: "4rem 8vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
          letterSpacing: "0.03em",
          fontFamily: "var(--font-cormorant-garamond)",
          fontWeight: 600,
          color: "var(--theme-color)",
          marginBottom: "0rem",
          paddingBottom: "0rem",
          lineHeight: "1",
        }}
      >
        MENU TEMPLATES
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "3rem", fontWeight: 500 }}>
        Structured menu or product information so operators can replicate your offering.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        {fields.map(({ label, name, note }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <label style={{ fontSize: "1rem", color: "var(--foreground)", fontWeight: 500 }}>
              {label}
            </label>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            />

            {/* Hidden file input */}
            <input
              type="file"
              name={name}
              id={name}
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />

            {/* Custom upload button */}
            <label
              htmlFor={name}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "0.8rem 1rem",
                backgroundColor: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "background 0.2s ease, border 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(58,50,255,0.05)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
            >
              <span style={{ color: "#333" }}>
                {(formData as any)[name] ? (formData as any)[name] : "Upload file..."}
              </span>
              <span style={{ color: "#3A32FF", fontWeight: 400 }}>Browse</span>
            </label>

            <span style={{ fontSize: "0.75rem", color: "#777" }}>{note}</span>

            {/* Notes */}
            <textarea
              name={`${name}Notes`}
              placeholder="Additional notes..."
              value={(formData as any)[`${name}Notes`]}
              onChange={handleNotesChange}
              style={{
                marginTop: "0.4rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "0.7rem 1rem",
                fontSize: "0.95rem",
                minHeight: "4rem",
                resize: "vertical",
              }}
            />
          </div>
        ))}

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.9rem",
            color: "#999",
            fontStyle: "italic",
          }}
        >
          *Menu templates and files are shared with operators only after brand partnership
          approval.
        </p>

        <button
          type="submit"
          style={{
            alignSelf: "center",
            marginTop: "2rem",
            padding: "0.8rem 2rem",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "#3A32FF",
            color: "white",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Submit Menu Templates
        </button>
      </form>
    </div>
  );
}
