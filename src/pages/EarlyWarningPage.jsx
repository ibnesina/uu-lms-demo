import React, { useMemo, useState } from "react";
import { ShieldAlert, ArrowUpDown } from "lucide-react";
import Panel from "../components/Panel.jsx";
import Badge from "../components/Badge.jsx";
import { COLORS } from "../theme.js";
import { AT_RISK_STUDENTS, DEPARTMENTS } from "../data.js";

function riskColor(score) {
  if (score >= 75) return COLORS.bad;
  if (score >= 55) return COLORS.warn;
  return COLORS.good;
}

export default function EarlyWarningPage({ scopeDept }) {
  const [students, setStudents] = useState(AT_RISK_STUDENTS);
  const [deptFilter, setDeptFilter] = useState(scopeDept || "ALL");
  const [sortDesc, setSortDesc] = useState(true);

  const escalate = (id) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === "Escalated" ? "Flagged" : "Escalated" } : s)));
  };

  const rows = useMemo(() => {
    let list = scopeDept ? students.filter((s) => s.dept === scopeDept) : students;
    if (!scopeDept && deptFilter !== "ALL") list = list.filter((s) => s.dept === deptFilter);
    return [...list].sort((a, b) => (sortDesc ? b.riskScore - a.riskScore : a.riskScore - b.riskScore));
  }, [students, deptFilter, sortDesc, scopeDept]);

  return (
    <div>
      <Panel
        eyebrow="At-Risk Early-Warning System"
        title="Students flagged this week"
        right={
          !scopeDept && (
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
          )
        }
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: COLORS.slate, fontSize: 12.5 }}>
          <ShieldAlert size={15} /> Score combines attendance, engagement, and academic risk signals — escalate to route a student to their advisor
        </div>

        <table style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <th style={{ padding: "8px 10px" }}>Student</th>
              <th style={{ padding: "8px 10px" }}>Dept</th>
              <th style={{ padding: "8px 10px", cursor: "pointer" }} onClick={() => setSortDesc((v) => !v)}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  Risk score <ArrowUpDown size={11} />
                </span>
              </th>
              <th style={{ padding: "8px 10px" }}>Signals</th>
              <th style={{ padding: "8px 10px" }}>Advisor</th>
              <th style={{ padding: "8px 10px" }}>Status</th>
              <th style={{ padding: "8px 10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <td style={{ padding: "10px 10px", fontWeight: 600, color: COLORS.ink }}>{s.student}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{s.dept}</td>
                <td style={{ padding: "10px 10px" }}>
                  <span style={{ fontWeight: 700, color: riskColor(s.riskScore) }}>{s.riskScore}</span>
                </td>
                <td style={{ padding: "10px 10px", color: COLORS.slate, maxWidth: 280 }}>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {s.reasons.map((r, i) => (
                      <li key={i} style={{ fontSize: 12 }}>{r}</li>
                    ))}
                  </ul>
                </td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{s.advisor}</td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={s.status === "Escalated" ? COLORS.good : COLORS.warn}>{s.status}</Badge>
                </td>
                <td style={{ padding: "10px 10px" }}>
                  <button
                    onClick={() => escalate(s.id)}
                    style={{
                      border: "none",
                      borderRadius: 7,
                      padding: "6px 10px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      background: s.status === "Escalated" ? `${COLORS.slate}17` : `${COLORS.navy}`,
                      color: s.status === "Escalated" ? COLORS.slate : "#fff",
                    }}
                  >
                    {s.status === "Escalated" ? "Undo" : "Escalate"}
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "16px 10px", color: COLORS.slate, textAlign: "center" }}>
                  No flagged students for this department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
