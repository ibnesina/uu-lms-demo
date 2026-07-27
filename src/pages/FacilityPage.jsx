import React, { useMemo, useState } from "react";
import { Projector, CheckCircle2, AlertCircle, Clock3, MessageSquarePlus } from "lucide-react";
import Panel from "../components/Panel.jsx";
import Badge from "../components/Badge.jsx";
import { COLORS } from "../theme.js";
import { ROOMS, DEPARTMENTS } from "../data.js";

const STATUS_CYCLE = ["ok", "pending", "issue"];
const STATUS_META = {
  ok: { label: "Working", color: COLORS.good, Icon: CheckCircle2 },
  pending: { label: "Checking", color: COLORS.warn, Icon: Clock3 },
  issue: { label: "Faulty", color: COLORS.bad, Icon: AlertCircle },
};

export default function FacilityPage({ scopeDept }) {
  const [rooms, setRooms] = useState(ROOMS);
  const [note, setNote] = useState("");
  const [reports, setReports] = useState([]);

  const visibleRooms = scopeDept ? rooms.filter((r) => r.dept === scopeDept) : rooms;

  const cycleStatus = (roomIdx, itemIdx) => {
    setRooms((prev) =>
      prev.map((r, ri) =>
        ri !== roomIdx
          ? r
          : {
              ...r,
              equipment: r.equipment.map((eq, ei) => {
                if (ei !== itemIdx) return eq;
                const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(eq.status) + 1) % STATUS_CYCLE.length];
                return { ...eq, status: next };
              }),
            }
      )
    );
  };

  const readiness = (room) => {
    const ok = room.equipment.filter((e) => e.status === "ok").length;
    return Math.round((ok / room.equipment.length) * 100);
  };

  const submitReport = () => {
    if (!note.trim()) return;
    setReports((prev) => [{ note, time: "Just now" }, ...prev]);
    setNote("");
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 16 }}>
        {visibleRooms.map((room, ri) => {
          const realRoomIdx = rooms.indexOf(room);
          const pct = readiness(room);
          const pctColor = pct === 100 ? COLORS.good : pct >= 50 ? COLORS.warn : COLORS.bad;
          return (
            <Panel key={room.room} eyebrow={DEPARTMENTS.find((d) => d.code === room.dept)?.name ?? room.dept} title={room.room}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: COLORS.slate }}>Last checked {room.lastChecked}</div>
                <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 18, color: pctColor }}>{pct}% ready</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {room.equipment.map((eq, ei) => {
                  const meta = STATUS_META[eq.status];
                  const Icon = meta.Icon;
                  return (
                    <button
                      key={eq.name}
                      onClick={() => cycleStatus(realRoomIdx, ei)}
                      title="Click to update status"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "9px 12px",
                        borderRadius: 9,
                        border: `1px solid ${COLORS.line}`,
                        background: COLORS.bg,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.ink, fontWeight: 600 }}>
                        <Projector size={14} color={COLORS.slate} /> {eq.name}
                      </span>
                      <Badge color={meta.color}>
                        <Icon size={12} /> {meta.label}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel eyebrow="Admin / Facilities" title="Report an issue">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: COLORS.slate, fontSize: 12.5 }}>
          <MessageSquarePlus size={15} /> A teacher flags it → auto-ticket → tracked to resolution
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Room 214 projector bulb needs replacing"
            style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }}
          />
          <button
            onClick={submitReport}
            style={{ border: "none", borderRadius: 8, padding: "9px 16px", background: COLORS.navy, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
          >
            Submit
          </button>
        </div>
        {reports.length > 0 && (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {reports.map((r, i) => (
              <div key={i} style={{ fontSize: 12.5, color: COLORS.slate, padding: "8px 12px", background: COLORS.bg, borderRadius: 8 }}>
                <b style={{ color: COLORS.ink }}>Ticket #{reports.length - i}</b> · {r.note} <span style={{ color: COLORS.slate }}>· {r.time}</span>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
