import React, { useMemo, useState } from "react";
import { QrCode, Search, ArrowUpDown } from "lucide-react";
import Panel from "../components/Panel.jsx";
import Badge from "../components/Badge.jsx";
import { COLORS } from "../theme.js";
import { SESSIONS, DEPARTMENTS } from "../data.js";

function attendanceStatus(pct) {
  if (pct >= 80) return { label: "Good", color: COLORS.good };
  if (pct >= 65) return { label: "At Risk", color: COLORS.warn };
  return { label: "Critical", color: COLORS.bad };
}

export default function AttendancePage({ scopeDept }) {
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState(scopeDept || "ALL");
  const [sortDesc, setSortDesc] = useState(false);

  const rows = useMemo(() => {
    let list = scopeDept ? SESSIONS.filter((s) => s.dept === scopeDept) : SESSIONS;
    if (!scopeDept && deptFilter !== "ALL") list = list.filter((s) => s.dept === deptFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((s) => s.course.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q));
    }
    const withPct = list.map((s) => ({ ...s, pct: Math.round((s.present / s.total) * 100) }));
    return withPct.sort((a, b) => (sortDesc ? b.pct - a.pct : a.pct - b.pct));
  }, [query, deptFilter, sortDesc, scopeDept]);

  return (
    <div>
      <Panel
        eyebrow="Smart Attendance Ecosystem"
        title="Live session check-in"
        right={<Badge color={COLORS.good}>Session active</Badge>}
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: COLORS.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <QrCode size={30} color={COLORS.navy} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: COLORS.ink }}>
              DBA301 · Strategic Management — Section B
            </div>
            <div style={{ fontSize: 12.5, color: COLORS.slate, marginTop: 2 }}>
              QR check-in synced to mod_attendance · 42 of 45 students checked in
            </div>
          </div>
        </div>
      </Panel>

      <Panel
        eyebrow="Attendance Register"
        title="Recent sessions"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 9, top: 9, color: COLORS.slate }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search course or dept…"
                style={{ padding: "7px 10px 7px 28px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12.5, width: 190 }}
              />
            </div>
            {!scopeDept && (
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12.5, color: COLORS.ink }}
              >
                <option value="ALL">All departments</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.code} value={d.code}>{d.code}</option>
                ))}
              </select>
            )}
          </div>
        }
      >
        <table style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <th style={{ padding: "8px 10px" }}>Course</th>
              <th style={{ padding: "8px 10px" }}>Dept</th>
              <th style={{ padding: "8px 10px" }}>Date</th>
              <th style={{ padding: "8px 10px" }}>Present</th>
              <th style={{ padding: "8px 10px", cursor: "pointer" }} onClick={() => setSortDesc((v) => !v)}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>% <ArrowUpDown size={11} /></span>
              </th>
              <th style={{ padding: "8px 10px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => {
              const st = attendanceStatus(s.pct);
              return (
                <tr key={i} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                  <td style={{ padding: "10px 10px", fontWeight: 600, color: COLORS.ink }}>{s.course}</td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>{s.dept}</td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>{s.date}</td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>
                    {s.present}/{s.total}
                  </td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>{s.pct}%</td>
                  <td style={{ padding: "10px 10px" }}>
                    <Badge color={st.color}>{st.label}</Badge>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "16px 10px", color: COLORS.slate, textAlign: "center" }}>
                  No sessions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
