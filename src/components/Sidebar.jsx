import React from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  Building2,
  Presentation,
  MessageSquareHeart,
  Workflow,
  LogOut,
  GraduationCap,
  ShieldAlert,
  Users2,
  Wrench,
  ShieldCheck,
  Map,
  Lock,
} from "lucide-react";
import { COLORS, UU_LOGO } from "../theme.js";

export const NAV_GROUPS = [
  {
    label: "Dashboards",
    items: [
      { key: "overview", label: "Central Monitoring", icon: LayoutDashboard },
      { key: "vc", label: "Executive Summary", icon: Presentation },
    ],
  },
  {
    label: "Academic Operations",
    items: [
      { key: "attendance", label: "Attendance Tracking", icon: ClipboardCheck },
      { key: "departments", label: "Departments", icon: Building2 },
      { key: "preadvising", label: "Pre-Advising", icon: GraduationCap },
      { key: "earlywarning", label: "Early-Warning", icon: ShieldAlert },
      { key: "teachers", label: "Teacher Workload", icon: Users2 },
    ],
  },
  {
    label: "Campus & Community",
    items: [
      { key: "facility", label: "Facility Readiness", icon: Wrench },
    ],
  },
  {
    label: "Platform",
    items: [
      { key: "how", label: "How It Works", icon: Workflow },
      { key: "governance", label: "Governance & Roles", icon: ShieldCheck },
    ],
  },
];

export const NAV = NAV_GROUPS.flatMap((g) => g.items);

export default function Sidebar({ page, setPage, onLogout, allowedPages }) {
  return (
    <div
      style={{
        width: 250,
        background: `linear-gradient(180deg, ${COLORS.navy}, ${COLORS.navyDeep})`,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "22px 14px",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 20px 8px" }}>
        <img src={UU_LOGO} alt="Uttara University" style={{ height: 42, objectFit: "contain" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div
              style={{
                fontSize: 10.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 700,
                padding: "0 12px 6px",
              }}
            >
              {group.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {group.items.map((n) => {
                const Icon = n.icon;
                const active = page === n.key;
                const allowed = allowedPages.includes(n.key);
                return (
                  <button
                    key={n.key}
                    onClick={() => setPage(n.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "9px 12px",
                      borderRadius: 9,
                      border: "none",
                      background: active ? "rgba(242,185,12,0.18)" : "transparent",
                      color: active ? COLORS.goldSoft : allowed ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.38)",
                      fontWeight: active ? 700 : 500,
                      fontSize: 13.5,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icon size={16} />
                      {n.label}
                    </span>
                    {!allowed && <Lock size={12} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 14, marginTop: 8 }}>
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 9,
            border: "none",
            background: "transparent",
            color: "rgba(255,255,255,0.72)",
            fontSize: 13.5,
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
          }}
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </div>
  );
}
