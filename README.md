# Uttara University — Integrated LMS (Front-End Concept Preview)

A **front-end only** React demo built for the Brain Station 23 × Uttara University
LMS proposal. Nothing here talks to a real backend, but the interactions are
real — filters, sorting, escalation actions, and a live role-based access
demo all actually work against in-memory sample data.

## What's included

**Dashboards**
- Central Monitoring Dashboard — KPIs, attendance trend, compliance alerts
- VC Summary Dashboard — university-wide KPIs + enrolment chart (University Admin only)

**Academic Operations**
- Attendance Tracking — searchable, filterable, sortable session register
- Departments — expandable tree of all 14 UU departments → semesters
- Pre-Advising — approve/reject requests with live prerequisite checks
- Early-Warning System — risk-scored student list with an "Escalate to Advisor" action
- Teacher Workload — sortable faculty activity & engagement table

**Campus & Community**
- Facility Readiness — click equipment to cycle status, live readiness %, issue reporting
- Guardian Notification Portal — compose and send (demo) notifications, log updates live

**Platform**
- How It Works — animated diagrams of the platform layers and the ERP ↔ Middleware ↔
  Moodle ↔ Users data flow
- Governance & Roles — visualizes the 5-tier access hierarchy
- Roadmap — clickable implementation timeline

## The role-switcher (the "how it works" of access control)

The top bar has a **"Viewing as"** dropdown: University Admin, Dept Admin,
Program Coordinator, Course Teacher, Student. Switching roles:

- Locks sidebar sections that role shouldn't see (shown with a lock icon)
- Scopes dashboards, attendance, departments, etc. down to a single department
  for every role except University Admin
- Shows a "Not available for this role" panel if you navigate to a restricted
  section anyway

This is a live demonstration of the governance model in the proposal — not
just a description of it.

## Run it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Login with:

- **Username:** `admin`
- **Password:** `uu@2026`

## Project structure

```
uu-lms-demo/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── uu-logo.png         # Real UU logo, background removed
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx               # Login gate + role state + routing + access gating
│   ├── theme.js               # Brand colors, logo path, font import
│   ├── data.js                 # All sample/demo data + role access map
│   ├── index.css
│   ├── components/
│   │   ├── LoginScreen.jsx
│   │   ├── Sidebar.jsx        # Grouped nav with lock indicators
│   │   ├── Topbar.jsx         # Role + department switcher
│   │   ├── Panel.jsx
│   │   └── Badge.jsx
│   └── pages/
│       ├── OverviewPage.jsx
│       ├── AttendancePage.jsx
│       ├── DepartmentsPage.jsx
│       ├── VCSummaryPage.jsx
│       ├── GuardianPage.jsx
│       ├── HowItWorksPage.jsx
│       ├── PreAdvisingPage.jsx
│       ├── EarlyWarningPage.jsx
│       ├── TeacherWorkloadPage.jsx
│       ├── FacilityPage.jsx
│       ├── GovernancePage.jsx
│       └── RoadmapPage.jsx
```

## Notes

- The logo is bundled locally (`public/uu-logo.png`) so it always renders,
  no network dependency there. Google Fonts are still loaded from the
  internet at runtime.
- To build a static production bundle: `npm run build` (output in `dist/`).
