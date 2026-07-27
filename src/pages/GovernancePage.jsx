import React from "react";
import { ShieldCheck, ArrowDown } from "lucide-react";
import Panel from "../components/Panel.jsx";
import { COLORS } from "../theme.js";
import { ROLE_HIERARCHY, ROLE_ACCESS } from "../data.js";

export default function GovernancePage({ role }) {
  return (
    <div>
      <Panel eyebrow="Governance Model" title="Hierarchical role & access control" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, color: COLORS.slate, marginBottom: 16 }}>
          Each layer sees only its own scope of data — no plugin required beyond native category-manager
          roles. Try it: switch roles from the dropdown in the top bar and watch the sidebar unlock or
          restrict sections live.
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 0 }}>
          {ROLE_HIERARCHY.map((r, i) => {
            const isActive = r.role === role;
            return (
              <React.Fragment key={r.role}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: `1.5px solid ${isActive ? COLORS.navy : COLORS.line}`,
                    background: isActive ? `${COLORS.navy}0D` : COLORS.card,
                    marginLeft: i * 22,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <ShieldCheck size={16} color={isActive ? COLORS.navy : COLORS.slate} />
                    <span style={{ fontWeight: 700, fontSize: 13.5, color: COLORS.ink }}>{r.role}</span>
                    {isActive && (
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: "#fff",
                          background: COLORS.navy,
                          padding: "2px 8px",
                          borderRadius: 999,
                          letterSpacing: "0.04em",
                        }}
                      >
                        CURRENT ROLE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12.5, color: COLORS.slate }}>{r.scope}</div>
                </div>
                {i < ROLE_HIERARCHY.length - 1 && (
                  <div style={{ display: "flex", justifyContent: "center", marginLeft: i * 22 + 20, padding: "4px 0" }}>
                    <ArrowDown size={14} color={COLORS.line} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Panel>

      <Panel eyebrow="Live Permission Map" title={`What "${role}" can see`}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(ROLE_ACCESS).map(([r, pages]) => (
            <div
              key={r}
              style={{
                flex: "1 1 200px",
                border: `1.5px solid ${r === role ? COLORS.navy : COLORS.line}`,
                borderRadius: 12,
                padding: "12px 14px",
                background: r === role ? `${COLORS.navy}0D` : COLORS.card,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>{r}</div>
              <div style={{ fontSize: 11.5, color: COLORS.slate }}>{pages.length} of 12 sections visible</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
