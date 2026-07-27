import React from "react";

export default function Badge({ children, color }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color: color,
        background: color + "17",
        border: `1px solid ${color}33`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
