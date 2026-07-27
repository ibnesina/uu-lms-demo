import React, { useState } from "react";
import { Check } from "lucide-react";
import Panel from "../components/Panel.jsx";
import { COLORS } from "../theme.js";
import { ROADMAP } from "../data.js";

export default function RoadmapPage() {
  const [completed, setCompleted] = useState([]);

  const toggle = (step) => {
    setCompleted((prev) => (prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]));
  };

  return (
    <Panel eyebrow="Getting There" title="Implementation roadmap">
      <div style={{ fontSize: 12.5, color: COLORS.slate, marginBottom: 20 }}>
        Recommended: pilot with 1–2 departments before university-wide rollout. Click a stage to mark it complete.
      </div>

      <div style={{ position: "relative", paddingLeft: 26 }}>
        <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 2, background: COLORS.line }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {ROADMAP.map((r) => {
            const done = completed.includes(r.step);
            return (
              <div key={r.step} style={{ position: "relative" }}>
                <button
                  onClick={() => toggle(r.step)}
                  style={{
                    position: "absolute",
                    left: -26,
                    top: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${done ? COLORS.good : COLORS.navy}`,
                    background: done ? COLORS.good : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  title="Toggle complete"
                >
                  {done && <Check size={13} color="#fff" />}
                </button>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.goldDeep, letterSpacing: "0.05em" }}>
                  STEP {r.step}
                </div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, fontWeight: 600, color: COLORS.ink, margin: "2px 0 4px" }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 13, color: COLORS.slate }}>{r.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
