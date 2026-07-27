import React, { useMemo, useState } from "react";
import { ArrowUpDown, Users2 } from "lucide-react";
import Panel from "../components/Panel.jsx";
import Badge from "../components/Badge.jsx";
import { COLORS } from "../theme.js";
import { TEACHERS } from "../data.js";

export default function TeacherWorkloadPage({ scopeDept }) {
  const [sortKey, setSortKey] = useState("weeklyHours");
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    let list = scopeDept ? TEACHERS.filter((t) => t.dept === scopeDept) : TEACHERS;
    return [...list].sort((a, b) => (sortDesc ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));
  }, [sortKey, sortDesc, scopeDept]);

  const sortBy = (key) => {
    if (key === sortKey) setSortDesc((v) => !v);
    else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  const Th = ({ label, k }) => (
    <th style={{ padding: "8px 10px", cursor: "pointer" }} onClick={() => sortBy(k)}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {label} <ArrowUpDown size={11} />
      </span>
    </th>
  );

  return (
    <Panel eyebrow="Teacher / Faculty Management" title="Activity & workload — dept-wise, always current">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: COLORS.slate, fontSize: 12.5 }}>
        <Users2 size={15} /> Supports annual review — not a grading tool. Click a column header to sort.
      </div>
      <table style={{ fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <th style={{ padding: "8px 10px" }}>Teacher</th>
            <th style={{ padding: "8px 10px" }}>Dept</th>
            <Th label="Courses" k="courses" />
            <Th label="Weekly hrs" k="weeklyHours" />
            <Th label="Engagement" k="engagement" />
            <th style={{ padding: "8px 10px" }}>Last active</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.name} style={{ borderTop: `1px solid ${COLORS.line}` }}>
              <td style={{ padding: "10px 10px", fontWeight: 600, color: COLORS.ink }}>{t.name}</td>
              <td style={{ padding: "10px 10px", color: COLORS.slate }}>{t.dept}</td>
              <td style={{ padding: "10px 10px", color: COLORS.slate }}>{t.courses}</td>
              <td style={{ padding: "10px 10px", color: COLORS.slate }}>{t.weeklyHours}h</td>
              <td style={{ padding: "10px 10px" }}>
                <Badge color={t.engagement >= 85 ? COLORS.good : t.engagement >= 70 ? COLORS.warn : COLORS.bad}>
                  {t.engagement}%
                </Badge>
              </td>
              <td style={{ padding: "10px 10px", color: COLORS.slate }}>{t.lastActive}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: "16px 10px", color: COLORS.slate, textAlign: "center" }}>
                No faculty records for this department.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Panel>
  );
}
