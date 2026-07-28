import React, { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import LoginScreen from "./components/LoginScreen.jsx";
import Sidebar, { NAV } from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import AttendancePage from "./pages/AttendancePage.jsx";
import DepartmentsPage from "./pages/DepartmentsPage.jsx";
import VCSummaryPage from "./pages/VCSummaryPage.jsx";
import GuardianPage from "./pages/GuardianPage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import EarlyWarningPage from "./pages/EarlyWarningPage.jsx";
import TeacherWorkloadPage from "./pages/TeacherWorkloadPage.jsx";
import FacilityPage from "./pages/FacilityPage.jsx";
import GovernancePage from "./pages/GovernancePage.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";
import { COLORS } from "./theme.js";
import { ROLE_ACCESS } from "./data.js";

function RestrictedPanel({ role }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 14,
        padding: "40px 24px",
        textAlign: "center",
        color: COLORS.slate,
      }}
    >
      <ShieldAlert size={28} color={COLORS.warn} style={{ marginBottom: 10 }} />
      <div style={{ fontFamily: "Fraunces, serif", fontSize: 16, fontWeight: 600, color: COLORS.ink, marginBottom: 6 }}>
        Not available for this role
      </div>
      <div style={{ fontSize: 13, maxWidth: 380, margin: "0 auto" }}>
        The <b>{role}</b> role doesn't have visibility into this section — this is the same governance
        model shown on the Governance & Roles page. Switch back to <b>University Admin</b> in the top bar to view it.
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("overview");
  const [role, setRole] = useState("University Admin");
  const [scopeDept, setScopeDept] = useState("CSE");

  const allowedPages = ROLE_ACCESS[role];
  const effectiveScope = role === "University Admin" ? null : scopeDept;
  const pageTitle = useMemo(() => NAV.find((n) => n.key === page)?.label ?? "", [page]);

  const handleSetRole = (r) => {
    setRole(r);
    if (r !== "University Admin" && !ROLE_ACCESS[r].includes(page)) {
      setPage(ROLE_ACCESS[r][0]);
    }
  };

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  const isAllowed = allowedPages.includes(page);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex" }}>
      <Sidebar page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} allowedPages={allowedPages} />

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar
          title={pageTitle}
          role={role}
          setRole={handleSetRole}
          scopeDept={scopeDept}
          setScopeDept={setScopeDept}
        />

        <div style={{ padding: 22, overflowY: "auto" }}>
          {!isAllowed ? (
            <RestrictedPanel role={role} />
          ) : (
            <>
              {page === "overview" && <OverviewPage scopeDept={effectiveScope} />}
              {page === "vc" && <VCSummaryPage />}
              {page === "attendance" && <AttendancePage scopeDept={effectiveScope} />}
              {page === "departments" && <DepartmentsPage scopeDept={effectiveScope} />}
              {page === "earlywarning" && <EarlyWarningPage scopeDept={effectiveScope} />}
              {page === "teachers" && <TeacherWorkloadPage scopeDept={effectiveScope} />}
              {page === "facility" && <FacilityPage scopeDept={effectiveScope} />}
              {page === "guardian" && <GuardianPage scopeDept={effectiveScope} />}
              {page === "how" && <HowItWorksPage />}
              {page === "governance" && <GovernancePage role={role} />}
              {page === "roadmap" && <RoadmapPage />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
