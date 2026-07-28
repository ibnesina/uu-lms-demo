import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import Panel from "../components/Panel.jsx";
import Badge from "../components/Badge.jsx";
import { COLORS } from "../theme.js";
import { NOTIFICATIONS, DEPARTMENTS } from "../data.js";

const TYPES = ["Absence Alert", "Engagement Reminder", "Fee Due Notice"];
const CHANNELS = ["SMS", "App", "App + SMS"];

export default function GuardianPage({ scopeDept }) {
  const [log, setLog] = useState(NOTIFICATIONS);
  const [type, setType] = useState(TYPES[0]);
  const [dept, setDept] = useState(scopeDept || DEPARTMENTS[0].code);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [justSent, setJustSent] = useState(false);

  const effectiveDept = scopeDept || dept;

  const send = () => {
    const deptName = DEPARTMENTS.find((d) => d.code === effectiveDept)?.name ?? effectiveDept;
    const entry = {
      student: "All guardians",
      dept: `${deptName} · broadcast`,
      type,
      channel,
      date: "Today",
      status: "Delivered",
    };
    setLog((prev) => [entry, ...prev]);
    setJustSent(true);
    setTimeout(() => setJustSent(false), 2500);
  };

  const selectStyle = {
    padding: "9px 12px",
    borderRadius: 8,
    border: `1px solid ${COLORS.line}`,
    fontSize: 13,
    color: COLORS.ink,
    background: "#fff",
  };

  return (
    <div>
      <Panel eyebrow="Guardian Notification Portal" title="Compose notification" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <select value={type} onChange={(e) => setType(e.target.value)} style={selectStyle}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select value={effectiveDept} onChange={(e) => setDept(e.target.value)} disabled={!!scopeDept} style={selectStyle}>
            {DEPARTMENTS.map((d) => (
              <option key={d.code} value={d.code}>{d.name}</option>
            ))}
          </select>
          <select value={channel} onChange={(e) => setChannel(e.target.value)} style={selectStyle}>
            {CHANNELS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button
            onClick={send}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              borderRadius: 8,
              border: "none",
              background: COLORS.navy,
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <Send size={14} /> Send to guardians
          </button>
          {justSent && (
            <span style={{ fontSize: 12.5, color: COLORS.good, display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle2 size={14} /> Added to the log below — demo only, no real message sent
            </span>
          )}
        </div>
      </Panel>

      <Panel eyebrow="Sent Log" title="Recent guardian notifications">
        <table style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <th style={{ padding: "8px 10px" }}>Student</th>
              <th style={{ padding: "8px 10px" }}>Dept / Sem</th>
              <th style={{ padding: "8px 10px" }}>Type</th>
              <th style={{ padding: "8px 10px" }}>Channel</th>
              <th style={{ padding: "8px 10px" }}>Date</th>
              <th style={{ padding: "8px 10px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {log.map((n, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <td style={{ padding: "10px 10px", fontWeight: 600, color: COLORS.ink }}>{n.student}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{n.dept}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{n.type}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{n.channel}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{n.date}</td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={n.status === "Delivered" ? COLORS.good : COLORS.warn}>{n.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
