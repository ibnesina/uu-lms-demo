import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Panel from "../components/Panel.jsx";
import { COLORS } from "../theme.js";
import { DEPARTMENTS } from "../data.js";

export default function VCSummaryPage() {
  const totalStudents = DEPARTMENTS.reduce((s, d) => s + d.students, 0);
  const kpis = [
    { label: "Total Enrolment", value: totalStudents.toLocaleString() },
    { label: "Overall Pass Rate", value: "91.4%" },
    { label: "Faculty Members", value: "450+" },
    { label: "At-Risk Students Flagged", value: "68" },
  ];
  const deptChart = DEPARTMENTS.map((d) => ({ code: d.code, students: d.students }));

  return (
    <div>
      <Panel
        eyebrow="Vice-Chancellor Summary"
        title="University at a glance"
        right={<div style={{ fontSize: 12, color: COLORS.slate }}>Last synced: today, 8:00 AM</div>}
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {kpis.map((k) => (
            <div key={k.label} style={{ background: COLORS.bg, borderRadius: 12, padding: "16px 14px" }}>
              <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: COLORS.navy }}>{k.value}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel eyebrow="Drill-down" title="Enrolment by department">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={deptChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.line} vertical={false} />
            <XAxis dataKey="code" tick={{ fontSize: 11.5, fill: COLORS.slate }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11.5, fill: COLORS.slate }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.line}`, fontSize: 12 }} />
            <Bar dataKey="students" fill={COLORS.navy} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
