export const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science & Engineering", students: 1560, attendance: 88 },
  { code: "BBA", name: "Business Administration", students: 2100, attendance: 82 },
  { code: "EEE", name: "Electrical & Electronic Engineering", students: 980, attendance: 85 },
  { code: "CE", name: "Civil Engineering", students: 860, attendance: 79 },
  { code: "LLB", name: "Law", students: 640, attendance: 91 },
  { code: "ENG", name: "English", students: 540, attendance: 87 },
  { code: "TEX", name: "Textile Engineering", students: 470, attendance: 83 },
  { code: "FDT", name: "Fashion Design & Technology", students: 390, attendance: 89 },
  { code: "BAN", name: "Bangla", students: 310, attendance: 90 },
  { code: "MATH", name: "Mathematics", students: 260, attendance: 84 },
  { code: "PHY", name: "Physics", students: 240, attendance: 81 },
  { code: "IS", name: "Islamic Studies", students: 300, attendance: 92 },
  { code: "EDU", name: "Education", students: 350, attendance: 86 },
  { code: "PE", name: "Physical Education", students: 210, attendance: 88 },
];

export const ATTENDANCE_TREND = [
  { week: "Wk 1", pct: 81 },
  { week: "Wk 2", pct: 79 },
  { week: "Wk 3", pct: 83 },
  { week: "Wk 4", pct: 84 },
  { week: "Wk 5", pct: 82 },
  { week: "Wk 6", pct: 86 },
  { week: "Wk 7", pct: 87 },
  { week: "Wk 8", pct: 88 },
];

export const ALERTS = [
  { dept: "Civil Engineering", msg: "Section A attendance below 75% for 3 consecutive sessions", level: "high" },
  { dept: "Business Administration", msg: "12 students have pending dues ahead of exam-eligibility check", level: "medium" },
  { dept: "Physics", msg: "Lab equipment readiness unverified — Room 214, projector flagged", level: "low" },
];

export const SESSIONS = [
  { course: "CSE301 · Data Structures", dept: "CSE", date: "22 Jul 2026", present: 42, total: 45 },
  { course: "CSE220 · Digital Logic Design", dept: "CSE", date: "20 Jul 2026", present: 39, total: 44 },
  { course: "BBA204 · Marketing Management", dept: "BBA", date: "22 Jul 2026", present: 58, total: 75 },
  { course: "BBA110 · Principles of Accounting", dept: "BBA", date: "21 Jul 2026", present: 61, total: 70 },
  { course: "EEE210 · Circuit Theory", dept: "EEE", date: "21 Jul 2026", present: 33, total: 40 },
  { course: "CE150 · Surveying", dept: "CE", date: "21 Jul 2026", present: 21, total: 38 },
  { course: "LLB110 · Legal Methods", dept: "LLB", date: "20 Jul 2026", present: 29, total: 32 },
  { course: "ENG101 · English I", dept: "ENG", date: "20 Jul 2026", present: 36, total: 42 },
  { course: "TEX205 · Yarn Technology", dept: "TEX", date: "20 Jul 2026", present: 27, total: 34 },
  { course: "FDT150 · Pattern Making", dept: "FDT", date: "19 Jul 2026", present: 24, total: 28 },
  { course: "BAN101 · Bangla Language", dept: "BAN", date: "19 Jul 2026", present: 30, total: 33 },
  { course: "MATH204 · Linear Algebra", dept: "MATH", date: "19 Jul 2026", present: 22, total: 27 },
  { course: "PHY101 · Physics I", dept: "PHY", date: "18 Jul 2026", present: 19, total: 26 },
  { course: "IS110 · Islamic Studies", dept: "IS", date: "18 Jul 2026", present: 28, total: 31 },
  { course: "EDU120 · Educational Psychology", dept: "EDU", date: "18 Jul 2026", present: 25, total: 30 },
  { course: "PE101 · Foundations of PE", dept: "PE", date: "17 Jul 2026", present: 20, total: 24 },
];

export const NOTIFICATIONS = [
  { student: "Nusrat Jahan", dept: "BBA · 5th Sem", type: "Absence Alert", channel: "SMS", date: "22 Jul 2026", status: "Delivered" },
  { student: "Rafiul Islam", dept: "CSE · 3rd Sem", type: "Engagement Reminder", channel: "App", date: "21 Jul 2026", status: "Delivered" },
  { student: "Tania Akhter", dept: "Civil Eng. · 7th Sem", type: "Fee Due Notice", channel: "SMS", date: "20 Jul 2026", status: "Pending" },
  { student: "Shakil Ahmed", dept: "EEE · 4th Sem", type: "Absence Alert", channel: "App + SMS", date: "19 Jul 2026", status: "Delivered" },
  { student: "Farzana Rahman", dept: "Law · 2nd Sem", type: "Engagement Reminder", channel: "App", date: "19 Jul 2026", status: "Delivered" },
];

export const SEMESTERS = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

export const PRE_ADVISING_TERM = {
  semester: "Fall 2027",
  status: "Open",
  startDate: "01 Sep 2027",
  endDate: "15 Sep 2027",
  totalStudents: 1280,
  submitted: 824,
};

export const PRE_ADVISING_DEPT_PROGRESS = [
  { dept: "CSE", totalStudents: 320, submitted: 246 },
  { dept: "BBA", totalStudents: 280, submitted: 190 },
  { dept: "EEE", totalStudents: 180, submitted: 128 },
  { dept: "CE", totalStudents: 160, submitted: 94 },
  { dept: "LLB", totalStudents: 140, submitted: 98 },
  { dept: "ENG", totalStudents: 120, submitted: 68 },
];

export const PRE_ADVISING_COURSE_DEMAND = [
  { dept: "CSE", course: "CSE411 · Artificial Intelligence", students: 118 },
  { dept: "CSE", course: "CSE413 · Compiler", students: 96 },
  { dept: "CSE", course: "CSE421 · Data Mining", students: 132 },
  { dept: "BBA", course: "BBA415 · Strategic Finance", students: 88 },
  { dept: "EEE", course: "EEE430 · Control Systems", students: 72 },
  { dept: "CE", course: "CE420 · Transportation Engineering", students: 54 },
];

export const PRE_ADVISING_COURSES = [
  {
    code: "CSE411",
    name: "Artificial Intelligence",
    credit: 3,
    semester: "Fall 2027",
    dept: "CSE",
    status: "Enabled",
    sections: [
      { section: "A", teacher: "Dr. Rahman", days: "Sun-Tue", time: "9:00 AM - 10:20 AM", seats: 18, requestedStudents: 42 },
      { section: "B", teacher: "Dr. Ahmed", days: "Mon-Wed", time: "11:00 AM - 12:20 PM", seats: 25, requestedStudents: 36 },
      { section: "C", teacher: "Dr. Hasan", days: "Tue-Thu", time: "2:00 PM - 3:20 PM", seats: 10, requestedStudents: 40 },
    ],
  },
  {
    code: "CSE413",
    name: "Compiler",
    credit: 3,
    semester: "Fall 2027",
    dept: "CSE",
    status: "Enabled",
    sections: [
      { section: "A", teacher: "Dr. Ahmed", days: "Sun-Tue", time: "10:30 AM - 11:50 AM", seats: 22, requestedStudents: 34 },
      { section: "B", teacher: "Dr. Hasan", days: "Mon-Wed", time: "12:30 PM - 1:50 PM", seats: 20, requestedStudents: 31 },
    ],
  },
  {
    code: "CSE421",
    name: "Data Mining",
    credit: 3,
    semester: "Fall 2027",
    dept: "CSE",
    status: "Enabled",
    sections: [
      { section: "A", teacher: "Dr. Rahman", days: "Sun-Tue", time: "12:30 PM - 1:50 PM", seats: 16, requestedStudents: 48 },
      { section: "B", teacher: "Dr. Hasan", days: "Tue-Thu", time: "3:30 PM - 4:50 PM", seats: 18, requestedStudents: 44 },
      { section: "C", teacher: "Dr. Ahmed", days: "Mon-Wed", time: "9:00 AM - 10:20 AM", seats: 21, requestedStudents: 40 },
    ],
  },
  {
    code: "HUM321",
    name: "Economics",
    credit: 3,
    semester: "Fall 2027",
    dept: "CSE",
    status: "Enabled",
    sections: [
      { section: "A", teacher: "Ms. Nabila Chowdhury", days: "Sun-Tue", time: "2:00 PM - 3:20 PM", seats: 30, requestedStudents: 52 },
      { section: "B", teacher: "Mr. Saif Islam", days: "Mon-Wed", time: "11:00 AM - 12:20 PM", seats: 28, requestedStudents: 46 },
    ],
  },
];

export const PRE_ADVISING_SEMESTERS = [
  {
    semester: "Fall 2027",
    courses: [
      {
        code: "CSE411",
        name: "Artificial Intelligence",
        credit: 3,
        teachers: [
          {
            name: "Dr. Rahman",
            slots: [
              { section: "A", days: "Sun-Tue", time: "9:00 AM - 10:20 AM", seats: 18, approvalStatus: "Group Approved" },
              { section: "D", days: "Thu", time: "4:00 PM - 6:40 PM", seats: 0, approvalStatus: "Pending Approval" },
            ],
          },
          {
            name: "Dr. Ahmed",
            slots: [
              { section: "B", days: "Mon-Wed", time: "11:00 AM - 12:20 PM", seats: 25, approvalStatus: "Pending Approval" },
            ],
          },
          {
            name: "Dr. Hasan",
            slots: [
              { section: "C", days: "Tue-Thu", time: "2:00 PM - 3:20 PM", seats: 10, approvalStatus: "Group Approved" },
            ],
          },
        ],
      },
      {
        code: "CSE413",
        name: "Compiler",
        credit: 3,
        teachers: [
          {
            name: "Dr. Ahmed",
            slots: [
              { section: "A", days: "Sun-Tue", time: "10:30 AM - 11:50 AM", seats: 22, approvalStatus: "Group Approved" },
            ],
          },
          {
            name: "Dr. Hasan",
            slots: [
              { section: "B", days: "Mon-Wed", time: "12:30 PM - 1:50 PM", seats: 20, approvalStatus: "Pending Approval" },
            ],
          },
        ],
      },
      {
        code: "CSE421",
        name: "Data Mining",
        credit: 3,
        teachers: [
          {
            name: "Dr. Rahman",
            slots: [
              { section: "A", days: "Sun-Tue", time: "12:30 PM - 1:50 PM", seats: 16, approvalStatus: "Pending Approval" },
            ],
          },
          {
            name: "Dr. Hasan",
            slots: [
              { section: "B", days: "Tue-Thu", time: "3:30 PM - 4:50 PM", seats: 18, approvalStatus: "Group Approved" },
            ],
          },
          {
            name: "Dr. Ahmed",
            slots: [
              { section: "C", days: "Mon-Wed", time: "9:00 AM - 10:20 AM", seats: 21, approvalStatus: "Group Approved" },
            ],
          },
        ],
      },
      {
        code: "HUM321",
        name: "Economics",
        credit: 3,
        teachers: [
          {
            name: "Ms. Nabila Chowdhury",
            slots: [
              { section: "A", days: "Sun-Tue", time: "2:00 PM - 3:20 PM", seats: 30, approvalStatus: "Group Approved" },
            ],
          },
          {
            name: "Mr. Saif Islam",
            slots: [
              { section: "B", days: "Mon-Wed", time: "11:00 AM - 12:20 PM", seats: 28, approvalStatus: "Pending Approval" },
            ],
          },
        ],
      },
    ],
  },
  {
    semester: "Summer 2028",
    courses: [
      {
        code: "CSE415",
        name: "Computer Vision",
        credit: 3,
        teachers: [
          {
            name: "Dr. Rahman",
            slots: [
              { section: "A", days: "Sun-Tue", time: "10:30 AM - 11:50 AM", seats: 14, approvalStatus: "Pending Approval" },
            ],
          },
          {
            name: "Dr. Ahmed",
            slots: [
              { section: "B", days: "Mon-Wed", time: "2:00 PM - 3:20 PM", seats: 19, approvalStatus: "Group Approved" },
            ],
          },
        ],
      },
      {
        code: "CSE425",
        name: "Distributed Systems",
        credit: 3,
        teachers: [
          {
            name: "Dr. Hasan",
            slots: [
              { section: "A", days: "Tue-Thu", time: "12:30 PM - 1:50 PM", seats: 17, approvalStatus: "Group Approved" },
            ],
          },
        ],
      },
    ],
  },
];

export const PRE_ADVISING_STUDENT_REQUESTS = [
  { studentId: "2023-1-60-014", studentName: "Rafiul Islam", dept: "CSE", selectedCourses: ["CSE411 - A", "CSE421 - B", "HUM321 - A"], status: "Submitted" },
  { studentId: "2023-1-60-021", studentName: "Nusrat Jahan", dept: "CSE", selectedCourses: ["CSE413 - A", "CSE421 - C"], status: "Submitted" },
  { studentId: "2023-1-60-037", studentName: "Mahin Chowdhury", dept: "CSE", selectedCourses: ["CSE411 - B", "HUM321 - B"], status: "Approved" },
  { studentId: "2023-1-60-044", studentName: "Israt Zahan", dept: "CSE", selectedCourses: ["CSE413 - B", "CSE421 - A"], status: "Submitted" },
];

// At-Risk Early-Warning System (Slide 9-10)
export const AT_RISK_STUDENTS = [
  {
    id: 1,
    student: "Arif Mahmud",
    dept: "CE",
    riskScore: 88,
    reasons: ["Attendance at 58% this semester", "2 pending fee installments", "No LMS login in 9 days"],
    advisor: "Dr. Salma Rahman",
    status: "Flagged",
  },
  {
    id: 2,
    student: "Farhana Akter",
    dept: "BBA",
    riskScore: 74,
    reasons: ["Attendance at 66%", "Missed 2 assignment deadlines"],
    advisor: "Mr. Kamal Hasan",
    status: "Flagged",
  },
  {
    id: 3,
    student: "Jubayer Ahmed",
    dept: "EEE",
    riskScore: 52,
    reasons: ["Attendance dipped 12% in 3 weeks"],
    advisor: "Dr. Nasrin Sultana",
    status: "Flagged",
  },
  {
    id: 4,
    student: "Priya Sarkar",
    dept: "CSE",
    riskScore: 81,
    reasons: ["Attendance at 61%", "Fee due before exam eligibility", "Advisor session missed"],
    advisor: "Dr. Imran Kabir",
    status: "Flagged",
  },
  {
    id: 5,
    student: "Sabbir Rahman",
    dept: "ENG",
    riskScore: 45,
    reasons: ["Low engagement on resource hub"],
    advisor: "Ms. Farhana Yasmin",
    status: "Flagged",
  },
];

// Facility & Equipment Readiness (Admin/Facilities walkthrough, slide 15)
export const ROOMS = [
  {
    room: "Room 214",
    dept: "CSE",
    equipment: [
      { name: "Projector", status: "issue" },
      { name: "Microphone", status: "ok" },
      { name: "AC", status: "ok" },
      { name: "Internet", status: "ok" },
    ],
    lastChecked: "22 Jul 2026",
  },
  {
    room: "Room 108",
    dept: "BBA",
    equipment: [
      { name: "Projector", status: "ok" },
      { name: "Microphone", status: "ok" },
      { name: "AC", status: "issue" },
      { name: "Internet", status: "ok" },
    ],
    lastChecked: "21 Jul 2026",
  },
  {
    room: "Lab 3",
    dept: "EEE",
    equipment: [
      { name: "Projector", status: "ok" },
      { name: "Workbenches", status: "ok" },
      { name: "AC", status: "ok" },
      { name: "Internet", status: "issue" },
    ],
    lastChecked: "20 Jul 2026",
  },
  {
    room: "Room 302",
    dept: "CE",
    equipment: [
      { name: "Projector", status: "ok" },
      { name: "Microphone", status: "ok" },
      { name: "AC", status: "ok" },
      { name: "Internet", status: "ok" },
    ],
    lastChecked: "19 Jul 2026",
  },
];

// Role → which nav sections are visible (Governance model, Slide 20).
// Every role except University Admin is also scoped to a single department.
export const ROLE_ACCESS = {
  "University Admin": [
    "overview", "vc", "attendance", "departments", "preadvising",
    "earlywarning", "teachers", "facility", "guardian", "how", "governance", "roadmap",
  ],
  "Dept Admin": [
    "overview", "attendance", "departments", "preadvising",
    "earlywarning", "teachers", "facility", "guardian", "how", "governance", "roadmap",
  ],
  "Program Coordinator": ["overview", "attendance", "departments", "preadvising", "how", "governance"],
  "Course Teacher": ["attendance", "departments", "preadvising", "how", "governance"],
  "Student": ["departments", "preadvising", "how", "governance"],
};

export const ROLES = Object.keys(ROLE_ACCESS);

// Teacher Activity & Workload (Teacher Management walkthrough, slide 16)
export const TEACHERS = [
  { name: "Dr. Imran Kabir", dept: "CSE", courses: 4, weeklyHours: 16, engagement: 92, lastActive: "Today" },
  { name: "Ms. Farhana Yasmin", dept: "ENG", courses: 3, weeklyHours: 12, engagement: 88, lastActive: "Today" },
  { name: "Dr. Salma Rahman", dept: "CE", courses: 5, weeklyHours: 18, engagement: 74, lastActive: "2 days ago" },
  { name: "Mr. Kamal Hasan", dept: "BBA", courses: 6, weeklyHours: 20, engagement: 69, lastActive: "3 days ago" },
  { name: "Dr. Nasrin Sultana", dept: "EEE", courses: 3, weeklyHours: 11, engagement: 95, lastActive: "Today" },
  { name: "Prof. Aminul Islam", dept: "LLB", courses: 4, weeklyHours: 14, engagement: 81, lastActive: "Yesterday" },
  { name: "Ms. Ruma Begum", dept: "TEX", courses: 2, weeklyHours: 8, engagement: 90, lastActive: "Today" },
];

// "How it works" — platform layers (Slide 3 of the proposal deck)
export const LAYERS = [
  {
    key: "core",
    title: "Moodle Core",
    tag: "Foundation",
    desc: "Course structure, roles, resources, cohorts, and the mobile app — the proven LMS foundation UU is already licensed for.",
  },
  {
    key: "plugins",
    title: "Curated Plugins",
    tag: "Open source",
    desc: "Attendance, analytics, reporting, and SSO plugins from the open-source Moodle ecosystem — no custom code required.",
  },
  {
    key: "custom",
    title: "BS23 Custom Layer",
    tag: "Built for UU",
    desc: "Monitoring dashboards, pre-advising, guardian portal, and the early-warning system — purpose-built for Uttara University.",
  },
  {
    key: "erp",
    title: "ERP Bridge",
    tag: "Integration",
    desc: "Two-way sync for enrolment, fees, and results between Moodle and UU's existing ERP system — no duplicate data entry.",
  },
];

// Governance model (Slide 20)
export const ROLE_HIERARCHY = [
  { role: "University Admin", scope: "Full visibility across all departments" },
  { role: "Dept Admin", scope: "Scoped to one department's category (e.g. CSE)" },
  { role: "Program Coordinator", scope: "Scoped to one program within the department" },
  { role: "Course Teacher", scope: "Scoped to their own courses only" },
  { role: "Student", scope: "Own enrolments and records only" },
];

// Implementation roadmap (Slide 21)
export const ROADMAP = [
  { step: "01", title: "Discovery", desc: "Confirm ERP integration points, finalize department scope" },
  { step: "02", title: "Core LMS Setup", desc: "Categories, roles, cohorts, base plugins configured" },
  { step: "03", title: "ERP Integration", desc: "Middleware build: enrolment, fees, results sync, SSO" },
  { step: "04", title: "Custom Modules", desc: "Pre-advising, dashboards, guardian portal, early-warning system" },
  { step: "05", title: "UAT", desc: "Pilot departments test end-to-end with real data" },
  { step: "06", title: "Go-Live", desc: "Phased rollout across all 14 departments" },
];

// "How it works" — data flow nodes (Slide 4 of the proposal deck)
export const FLOW_NODES = [
  { key: "erp", title: "ERP System", sub: "Admissions · Fees · Results", x: 60, y: 60 },
  { key: "gateway", title: "Middleware / API Gateway", sub: "Two-way sync, built by BS23", x: 340, y: 60 },
  { key: "moodle", title: "Moodle Core + Plugins", sub: "Courses · Attendance · Resources", x: 620, y: 60 },
  { key: "users", title: "Users", sub: "Admins · Teachers · Students · Guardians", x: 620, y: 260 },
];
