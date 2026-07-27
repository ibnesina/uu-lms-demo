import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Panel from "../components/Panel.jsx";
import { COLORS } from "../theme.js";
import { DEPARTMENTS, SEMESTERS } from "../data.js";

export default function DepartmentsPage({ scopeDept }) {
  const [open, setOpen] = useState(scopeDept || "CSE");

  useEffect(() => {
    if (scopeDept) setOpen(scopeDept);
  }, [scopeDept]);

  const visible = scopeDept ? DEPARTMENTS.filter((d) => d.code === scopeDept) : DEPARTMENTS;

  return (
    <Panel eyebrow="Native Capability" title="Department / category structure">
      <div style={{ fontSize: 12.5, color: COLORS.slate, marginBottom: 14 }}>
        {scopeDept
          ? "Your role is scoped to this department — no visibility into other branches."
          : "Uttara University → Department → Semester. Each department admin sees only their own branch."}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {visible.map((d) => {
          const isOpen = open === d.code;
          return (
            <div key={d.code} style={{ border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
              <button
                onClick={() => setOpen(isOpen ? "" : d.code)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 14px",
                  background: isOpen ? COLORS.bg : COLORS.card,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {isOpen ? <ChevronDown size={15} color={COLORS.slate} /> : <ChevronRight size={15} color={COLORS.slate} />}
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: COLORS.ink }}>{d.name}</span>
                  <span style={{ fontSize: 11.5, color: COLORS.slate }}>({d.code})</span>
                </div>
                <div style={{ fontSize: 12.5, color: COLORS.slate }}>{d.students.toLocaleString()} students</div>
              </button>
              {isOpen && (
                <div style={{ padding: "10px 14px 16px 38px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SEMESTERS.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 12,
                        padding: "5px 10px",
                        borderRadius: 8,
                        background: COLORS.card,
                        border: `1px solid ${COLORS.line}`,
                        color: COLORS.slate,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
