import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import { COLORS, UU_LOGO } from "../theme.js";

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === "admin" && password === "uu@2026") {
      setError("");
      onLogin();
    } else {
      setError("Incorrect username or password. Try the demo credentials below.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(1100px 600px at 15% -10%, ${COLORS.navyMid} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)`,
        padding: 24,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 26 }}>
        <img src={UU_LOGO} alt="Uttara University" style={{ height: 82, objectFit: "contain", marginBottom: 14 }} />
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 21, fontWeight: 600, color: "#fff", textAlign: "center" }}>
          Integrated LMS
        </div>
        <div style={{ fontSize: 12.5, color: COLORS.goldSoft, marginTop: 4, textAlign: "center" }}>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: COLORS.card,
          borderRadius: 18,
          padding: "34px 34px",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.45)",
          border: `1px solid ${COLORS.goldSoft}`,
        }}
      >
        <form onSubmit={submit}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink, display: "block", marginBottom: 6 }}>
            Username
          </label>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <User size={16} style={{ position: "absolute", left: 12, top: 12, color: COLORS.slate }} />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                borderRadius: 10,
                border: `1px solid ${COLORS.line}`,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <label style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink, display: "block", marginBottom: 6 }}>
            Password
          </label>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <Lock size={16} style={{ position: "absolute", left: 12, top: 12, color: COLORS.slate }} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                borderRadius: 10,
                border: `1px solid ${COLORS.line}`,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && <div style={{ fontSize: 12.5, color: COLORS.bad, marginBottom: 8 }}>{error}</div>}

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: 10,
              padding: "11px 0",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(135deg, ${COLORS.navyMid}, ${COLORS.navy})`,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14.5,
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>

        <div
          style={{
            marginTop: 18,
            padding: "12px 14px",
            borderRadius: 10,
            background: COLORS.bg,
            fontSize: 12,
            color: COLORS.slate,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Demo login: <b style={{ color: COLORS.ink }}>Username: admin</b> ·{" "}
          <b style={{ color: COLORS.ink }}>Password: uu@2026</b>
        </div>
      </div>
    </div>
  );
}
