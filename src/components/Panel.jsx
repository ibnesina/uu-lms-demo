import React from "react";
import { COLORS } from "../theme.js";

export default function Panel({ title, eyebrow, right, children, style }) {
  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 14,
        border: `1px solid ${COLORS.line}`,
        boxShadow: "0 1px 2px rgba(17,24,39,0.04)",
        padding: 22,
        ...style,
      }}
    >
      {(title || right) && (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            {eyebrow && (
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: COLORS.goldDeep,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {eyebrow}
              </div>
            )}
            {title && (
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 18, fontWeight: 600, color: COLORS.ink }}>
                {title}
              </div>
            )}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
