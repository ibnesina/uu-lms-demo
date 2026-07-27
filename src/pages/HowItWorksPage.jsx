import React, { useState } from "react";
import { Layers, ArrowRight } from "lucide-react";
import Panel from "../components/Panel.jsx";
import { COLORS } from "../theme.js";
import { LAYERS, FLOW_NODES } from "../data.js";

/* Layer stack with an animated flow of dots between each block */
function LayerStack() {
  const [activeKey, setActiveKey] = useState(LAYERS[0].key);
  const active = LAYERS.find((l) => l.key === activeKey);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "stretch", gap: 0, marginBottom: 18 }}>
        {LAYERS.map((layer, i) => (
          <React.Fragment key={layer.key}>
            <button
              onClick={() => setActiveKey(layer.key)}
              style={{
                flex: 1,
                textAlign: "left",
                border: `1.5px solid ${activeKey === layer.key ? COLORS.navy : COLORS.line}`,
                background: activeKey === layer.key ? COLORS.navy : COLORS.card,
                color: activeKey === layer.key ? "#fff" : COLORS.ink,
                borderRadius: 12,
                padding: "14px 14px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: activeKey === layer.key ? COLORS.goldSoft : COLORS.goldDeep,
                  marginBottom: 4,
                }}
              >
                {layer.tag}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{layer.title}</div>
            </button>
            {i < LAYERS.length - 1 && (
              <div
                style={{
                  width: 34,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ height: 2, width: "100%", background: COLORS.line }} />
                <span className="uu-flow-dot" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          background: COLORS.bg,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 12,
          padding: "16px 18px",
          fontSize: 13.5,
          color: COLORS.slate,
          lineHeight: 1.5,
        }}
      >
        <b style={{ color: COLORS.ink }}>{active.title}:</b> {active.desc}
      </div>

      <style>{`
        .uu-flow-dot {
          position: absolute;
          top: 50%;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${COLORS.gold};
          transform: translateY(-50%);
          animation: uu-flow 1.8s linear infinite;
          box-shadow: 0 0 6px ${COLORS.gold};
        }
        @keyframes uu-flow {
          0% { left: -8px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* Data-flow architecture diagram with animated sync dots along connectors */
function FlowDiagram() {
  const nodeW = 190;
  const nodeH = 76;
  const get = (key) => FLOW_NODES.find((n) => n.key === key);
  const erp = get("erp");
  const gw = get("gateway");
  const moodle = get("moodle");
  const users = get("users");

  const centerRight = (n) => ({ x: n.x + nodeW, y: n.y + nodeH / 2 });
  const centerLeft = (n) => ({ x: n.x, y: n.y + nodeH / 2 });
  const centerBottom = (n) => ({ x: n.x + nodeW / 2, y: n.y + nodeH });
  const centerTop = (n) => ({ x: n.x + nodeW / 2, y: n.y });

  const p1 = centerRight(erp);
  const p2 = centerLeft(gw);
  const p3 = centerRight(gw);
  const p4 = centerLeft(moodle);
  const p5 = centerBottom(moodle);
  const p6 = centerTop(users);

  const NodeBox = ({ n, accent }) => (
    <g>
      <rect
        x={n.x}
        y={n.y}
        width={nodeW}
        height={nodeH}
        rx={12}
        fill={accent ? COLORS.navy : "#fff"}
        stroke={accent ? COLORS.navy : COLORS.line}
        strokeWidth={1.5}
      />
      <text x={n.x + 16} y={n.y + 30} fontSize="13.5" fontWeight="700" fill={accent ? "#fff" : COLORS.ink}>
        {n.title}
      </text>
      <text x={n.x + 16} y={n.y + 50} fontSize="11" fill={accent ? COLORS.goldSoft : COLORS.slate}>
        {n.sub}
      </text>
    </g>
  );

  const Connector = ({ from, to, id }) => (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={COLORS.line} strokeWidth={2} />
      <circle r={4.5} fill={COLORS.gold}>
        <animateMotion
          path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle r={4.5} fill={COLORS.navyMid} opacity={0.85}>
        <animateMotion
          path={`M ${to.x} ${to.y} L ${from.x} ${from.y}`}
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );

  return (
    <svg viewBox="0 0 900 380" width="100%" height="380" role="img" aria-label="Data flow architecture diagram">
      <Connector from={p1} to={p2} />
      <Connector from={p3} to={p4} />
      <Connector from={p5} to={p6} />

      <NodeBox n={erp} />
      <NodeBox n={gw} accent />
      <NodeBox n={moodle} />
      <NodeBox n={users} />

      <text x={(p1.x + p2.x) / 2} y={p1.y - 10} fontSize="10.5" fill={COLORS.slate} textAnchor="middle">
        two-way sync
      </text>
      <text x={(p3.x + p4.x) / 2} y={p3.y - 10} fontSize="10.5" fill={COLORS.slate} textAnchor="middle">
        courses · attendance · resources
      </text>
      <text x={p5.x + 12} y={(p5.y + p6.y) / 2} fontSize="10.5" fill={COLORS.slate}>
        single sign-on
      </text>
    </svg>
  );
}

export default function HowItWorksPage() {
  return (
    <div>
      <Panel eyebrow="The Proposed Solution" title="One platform, four layers" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: COLORS.slate, fontSize: 12.5 }}>
          <Layers size={15} /> Click a layer to see what it covers
        </div>
        <LayerStack />
      </Panel>

      <Panel eyebrow="Architecture at a Glance" title="How data moves through the platform">
        <div style={{ marginBottom: 10, fontSize: 12.5, color: COLORS.slate, display: "flex", alignItems: "center", gap: 6 }}>
          Enrolment, fees, and results sync automatically — no duplicate data entry anywhere
          <ArrowRight size={13} />
        </div>
        <FlowDiagram />
      </Panel>
    </div>
  );
}
