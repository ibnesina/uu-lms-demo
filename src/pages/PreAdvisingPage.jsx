import React, { useMemo, useState } from "react";
import { Check, X, GraduationCap } from "lucide-react";
import Panel from "../components/Panel.jsx";
import Badge from "../components/Badge.jsx";
import { COLORS } from "../theme.js";
import { ADVISING_REQUESTS, DEPARTMENTS } from "../data.js";

export default function PreAdvisingPage({ scopeDept }) {
  const [requests, setRequests] = useState(ADVISING_REQUESTS);
  const [deptFilter, setDeptFilter] = useState(scopeDept || "ALL");

  const setStatus = (id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const filtered = useMemo(() => {
    if (scopeDept) return requests.filter((r) => r.dept === scopeDept);
    return deptFilter === "ALL" ? requests : requests.filter((r) => r.dept === deptFilter);
  }, [requests, deptFilter, scopeDept]);

  const counts = useMemo(
    () => ({
      Pending: requests.filter((r) => r.status === "Pending").length,
      Approved: requests.filter((r) => r.status === "Approved").length,
      Rejected: requests.filter((r) => r.status === "Rejected").length,
    }),
    [requests]
  );

  const statusColor = { Pending: COLORS.warn, Approved: COLORS.good, Rejected: COLORS.bad };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 16 }}>
        {Object.entries(counts).map(([label, value]) => (
          <div key={label} style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.line}`, padding: "16px" }}>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>{label} requests</div>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: statusColor[label] }}>{value}</div>
          </div>
        ))}
      </div>

      <Panel
        eyebrow="Student Affairs / Advising"
        title="Pre-advising requests"
        right={
          !scopeDept && (
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12.5, color: COLORS.ink }}
            >
              <option value="ALL">All departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code}
                </option>
              ))}
            </select>
          )
        }
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: COLORS.slate, fontSize: 12.5 }}>
          <GraduationCap size={15} /> Prerequisite / credit checks run automatically — approve or reject to route to the registrar
        </div>
        <table style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <th style={{ padding: "8px 10px" }}>Student</th>
              <th style={{ padding: "8px 10px" }}>Dept</th>
              <th style={{ padding: "8px 10px" }}>Requested Course</th>
              <th style={{ padding: "8px 10px" }}>Credits</th>
              <th style={{ padding: "8px 10px" }}>Prerequisite</th>
              <th style={{ padding: "8px 10px" }}>Status</th>
              <th style={{ padding: "8px 10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <td style={{ padding: "10px 10px", fontWeight: 600, color: COLORS.ink }}>{r.student}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{r.dept}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{r.course}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>
                  {r.creditsUsed}/{r.creditsTotal}
                </td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={r.prereqMet ? COLORS.good : COLORS.bad}>{r.prereqMet ? "Met" : "Not met"}</Badge>
                </td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={statusColor[r.status]}>{r.status}</Badge>
                </td>
                <td style={{ padding: "10px 10px" }}>
                  {r.status === "Pending" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => setStatus(r.id, "Approved")}
                        title="Approve"
                        style={{ border: "none", background: `${COLORS.good}17`, color: COLORS.good, borderRadius: 7, padding: "6px 8px", cursor: "pointer" }}
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setStatus(r.id, "Rejected")}
                        title="Reject"
                        style={{ border: "none", background: `${COLORS.bad}17`, color: COLORS.bad, borderRadius: 7, padding: "6px 8px", cursor: "pointer" }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setStatus(r.id, "Pending")}
                      style={{ border: "none", background: "transparent", color: COLORS.slate, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
                    >
                      Reopen
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "16px 10px", color: COLORS.slate, textAlign: "center" }}>
                  No requests for this department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
