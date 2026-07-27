import React from "react";
import { AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Panel from "../components/Panel.jsx";
import { COLORS } from "../theme.js";
import { DEPARTMENTS, ATTENDANCE_TREND, ALERTS } from "../data.js";

export default function OverviewPage({ scopeDept }) {
  const scoped = scopeDept ? DEPARTMENTS.filter((d) => d.code === scopeDept) : DEPARTMENTS;
  const scopedNames = scoped.map((d) => d.name);

  const totalStudents = scoped.reduce((s, d) => s + d.students, 0);
  const avgAttendance = Math.round(scoped.reduce((s, d) => s + d.attendance, 0) / scoped.length);
  const kpis = [
    { label: scopeDept ? "Department Students" : "Total Students", value: totalStudents.toLocaleString() },
    { label: "Active Courses", value: scopeDept ? Math.max(6, Math.round(scoped[0].students / 40)) : "312" },
    { label: "Avg. Attendance", value: avgAttendance + "%" },
    { label: "Departments", value: scoped.length },
    { label: "Pending Dues (students)", value: scopeDept ? Math.round(scoped[0].students * 0.03) : "184" },
  ];

  const deptChart = scoped.slice(0, 8).map((d) => ({ code: d.code, attendance: d.attendance }));
  const visibleAlerts = scopeDept ? ALERTS.filter((a) => scopedNames.includes(a.dept)) : ALERTS;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 20 }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.line}`, padding: "18px 16px" }}>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 600, color: COLORS.navy }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        <Panel eyebrow="Central Monitoring" title="University-wide attendance trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ATTENDANCE_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.line} vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.line}`, fontSize: 12 }} />
              <Line type="monotone" dataKey="pct" stroke={COLORS.navy} strokeWidth={2.5} dot={{ r: 3, fill: COLORS.navy }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel eyebrow="Compliance" title="Alerts">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {visibleAlerts.length === 0 && (
              <div style={{ fontSize: 12.5, color: COLORS.slate }}>No open alerts for this department.</div>
            )}
            {visibleAlerts.map((a, i) => {
              const c = a.level === "high" ? COLORS.bad : a.level === "medium" ? COLORS.warn : COLORS.good;
              return (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <AlertTriangle size={16} style={{ color: c, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.ink }}>{a.dept}</div>
                    <div style={{ fontSize: 12.5, color: COLORS.slate, lineHeight: 1.4 }}>{a.msg}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel eyebrow="Central Monitoring" title="Attendance by department">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={deptChart} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.line} vertical={false} />
            <XAxis dataKey="code" tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.line}`, fontSize: 12 }} />
            <Bar dataKey="attendance" fill={COLORS.gold} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
