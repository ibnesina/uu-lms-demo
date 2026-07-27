import React from "react";
import { Bell } from "lucide-react";
import { COLORS } from "../theme.js";
import { ROLES, DEPARTMENTS } from "../data.js";

export default function Topbar({ title, role, setRole, scopeDept, setScopeDept }) {
  const needsDept = role !== "University Admin";
  const selectStyle = {
    padding: "6px 10px",
    borderRadius: 8,
    border: `1px solid ${COLORS.line}`,
    fontSize: 12.5,
    color: COLORS.ink,
    background: COLORS.bg,
  };

  return (
    <div
      style={{
        minHeight: 62,
        background: COLORS.card,
        borderBottom: `1px solid ${COLORS.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 22px",
        flexShrink: 0,
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      <div style={{ fontFamily: "Fraunces, serif", fontSize: 17, fontWeight: 600, color: COLORS.ink }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11.5, color: COLORS.slate }}>Viewing as</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={selectStyle}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        {needsDept && (
          <select value={scopeDept} onChange={(e) => setScopeDept(e.target.value)} style={selectStyle}>
            {DEPARTMENTS.map((d) => (
              <option key={d.code} value={d.code}>{d.code}</option>
            ))}
          </select>
        )}
        <Bell size={17} color={COLORS.slate} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: COLORS.navy,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12.5,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 12.5, color: COLORS.ink, fontWeight: 600 }}>Admin</div>
        </div>
      </div>
    </div>
  );
}
