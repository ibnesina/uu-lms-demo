import React, { useState } from "react";
import { BookOpen, CalendarDays, GraduationCap } from "lucide-react";
import Panel from "../components/Panel.jsx";
import Badge from "../components/Badge.jsx";
import { COLORS } from "../theme.js";
import {
  PRE_ADVISING_COURSE_DEMAND,
  PRE_ADVISING_COURSES,
  PRE_ADVISING_DEPT_PROGRESS,
  PRE_ADVISING_SEMESTERS,
  PRE_ADVISING_STUDENT_REQUESTS,
  PRE_ADVISING_TERM,
} from "../data.js";

const tabButton = (active) => ({
  border: `1px solid ${active ? COLORS.navy : COLORS.line}`,
  background: active ? COLORS.navy : COLORS.card,
  color: active ? "#fff" : COLORS.ink,
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 12.5,
  fontWeight: 700,
  cursor: "pointer",
});

const actionButton = (color, filled = false) => ({
  border: `1px solid ${color}33`,
  background: filled ? color : `${color}17`,
  color: filled ? "#fff" : color,
  borderRadius: 8,
  padding: "7px 10px",
  fontSize: 12.5,
  fontWeight: 700,
  cursor: "pointer",
});

const fieldStyle = {
  padding: "8px 10px",
  borderRadius: 8,
  border: `1px solid ${COLORS.line}`,
  fontSize: 12.5,
  color: COLORS.ink,
  background: "#fff",
};

function StatCard({ label, value, color = COLORS.navy }) {
  return (
    <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.line}`, padding: 16 }}>
      <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color }}>{value}</div>
    </div>
  );
}

function StatsGrid({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 16 }}>
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function AdminView({ terms, setTerms, selectedSemester, setSelectedSemester }) {
  const [newSemester, setNewSemester] = useState("");
  const term = terms.find((item) => item.semester === selectedSemester) ?? terms[0];
  const pending = term.totalStudents - term.submitted;
  const updateTerm = (patch) => setTerms((prev) => prev.map((item) => (item.semester === term.semester ? { ...item, ...patch } : item)));
  const addSemester = () => {
    const value = newSemester.trim();
    if (!value || terms.some((item) => item.semester.toLowerCase() === value.toLowerCase())) return;
    setTerms((prev) => [...prev, { semester: value, status: "Closed", startDate: "01 Sep 2028", endDate: "15 Sep 2028", totalStudents: 0, submitted: 0 }]);
    setSelectedSemester(value);
    setNewSemester("");
  };
  const deleteSemester = () => {
    if (terms.length === 1) return;
    const remaining = terms.filter((item) => item.semester !== term.semester);
    setTerms(remaining);
    setSelectedSemester(remaining[0].semester);
  };

  return (
    <div>
      <StatsGrid
        stats={[
          { label: "Total Students", value: term.totalStudents },
          { label: "Submitted", value: term.submitted, color: COLORS.good },
          { label: "Pending", value: pending, color: COLORS.warn },
        ]}
      />
      <Panel
        eyebrow="University Admin"
        title="Pre-advising semester control"
        right={<Badge color={term.status === "Open" ? COLORS.good : COLORS.bad}>{term.status}</Badge>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 5 }}>Semester</div>
            <select
              value={term.semester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={{ width: "100%", ...fieldStyle }}
            >
              {terms.map((item) => (
                <option key={item.semester}>{item.semester}</option>
              ))}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 5 }}>Start Date</div>
            <input value={term.startDate} onChange={(e) => updateTerm({ startDate: e.target.value })} style={{ width: "100%", ...fieldStyle }} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 5 }}>End Date</div>
            <input value={term.endDate} onChange={(e) => updateTerm({ endDate: e.target.value })} style={{ width: "100%", ...fieldStyle }} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 5 }}>Total Students</div>
            <input
              type="number"
              value={term.totalStudents}
              onChange={(e) => updateTerm({ totalStudents: Number(e.target.value) || 0 })}
              style={{ width: "100%", ...fieldStyle }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => updateTerm({ status: "Open" })} style={actionButton(COLORS.good, term.status === "Open")}>
            Open Pre-Advising
          </button>
          <button onClick={() => updateTerm({ status: "Closed" })} style={actionButton(COLORS.bad, term.status === "Closed")}>
            Close Pre-Advising
          </button>
          <button onClick={deleteSemester} style={actionButton(COLORS.bad)}>Delete Semester</button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <input value={newSemester} onChange={(e) => setNewSemester(e.target.value)} placeholder="e.g. Summer 2028" style={{ minWidth: 190, ...fieldStyle }} />
          <button onClick={addSemester} style={actionButton(COLORS.navy, true)}>Add Semester</button>
        </div>
      </Panel>
    </div>
  );
}

function DepartmentView({ scopeDept }) {
  const deptCode = scopeDept || "CSE";
  const progress = PRE_ADVISING_DEPT_PROGRESS.find((item) => item.dept === deptCode) ?? PRE_ADVISING_DEPT_PROGRESS[0];
  const pending = progress.totalStudents - progress.submitted;
  const completion = Math.round((progress.submitted / progress.totalStudents) * 100);
  const [demandRows, setDemandRows] = useState(PRE_ADVISING_COURSE_DEMAND);
  const [newDemand, setNewDemand] = useState({ course: "", students: "" });
  const demand = demandRows.filter((item) => item.dept === progress.dept);
  const addDemand = () => {
    if (!newDemand.course.trim()) return;
    setDemandRows((prev) => [...prev, { dept: progress.dept, course: newDemand.course.trim(), students: Number(newDemand.students) || 0 }]);
    setNewDemand({ course: "", students: "" });
  };
  const updateDemand = (course, students) => {
    setDemandRows((prev) => prev.map((item) => (item.dept === progress.dept && item.course === course ? { ...item, students } : item)));
  };
  const deleteDemand = (course) => {
    setDemandRows((prev) => prev.filter((item) => !(item.dept === progress.dept && item.course === course)));
  };

  return (
    <div>
      <StatsGrid
        stats={[
          { label: "Total Students", value: progress.totalStudents },
          { label: "Submitted", value: progress.submitted, color: COLORS.good },
          { label: "Pending", value: pending, color: COLORS.warn },
          { label: "Completion", value: `${completion}%`, color: completion >= 70 ? COLORS.good : COLORS.warn },
        ]}
      />
      <Panel eyebrow="Department Admin" title={`${progress.dept} course demand summary`}>
        <table style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <th style={{ padding: "8px 10px" }}>Course</th>
              <th style={{ padding: "8px 10px" }}>Students Selected</th>
              <th style={{ padding: "8px 10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {demand.map((row) => (
              <tr key={row.course} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <td style={{ padding: "10px 10px", fontWeight: 600, color: COLORS.ink }}>{row.course}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>
                  <input type="number" value={row.students} onChange={(e) => updateDemand(row.course, Number(e.target.value) || 0)} style={{ width: 90, ...fieldStyle }} />
                </td>
                <td style={{ padding: "10px 10px" }}>
                  <button onClick={() => deleteDemand(row.course)} style={actionButton(COLORS.bad)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <input
            value={newDemand.course}
            onChange={(e) => setNewDemand((prev) => ({ ...prev, course: e.target.value }))}
            placeholder="Course demand item"
            style={{ minWidth: 240, ...fieldStyle }}
          />
          <input
            type="number"
            value={newDemand.students}
            onChange={(e) => setNewDemand((prev) => ({ ...prev, students: e.target.value }))}
            placeholder="Students"
            style={{ width: 110, ...fieldStyle }}
          />
          <button onClick={addDemand} style={actionButton(COLORS.navy, true)}>Add Demand</button>
        </div>
      </Panel>
    </div>
  );
}

function CoordinatorView({ scopeDept, currentTerm }) {
  const deptCode = scopeDept || "CSE";
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState(PRE_ADVISING_COURSES);
  const [requests, setRequests] = useState(PRE_ADVISING_STUDENT_REQUESTS);
  const [newCourse, setNewCourse] = useState({ code: "", name: "", credit: 3 });
  const [newRequest, setNewRequest] = useState({ studentId: "", studentName: "", selectedCourses: "" });
  const deptCourses = courses.filter((course) => course.dept === deptCode);
  const deptRequests = requests.filter((request) => request.dept === deptCode);

  const setCourseStatus = (code, status) => {
    setCourses((prev) => prev.map((course) => (course.code === code ? { ...course, status } : course)));
  };

  const approveRequest = (studentId) => {
    setRequests((prev) => prev.map((request) => (request.studentId === studentId ? { ...request, status: "Approved" } : request)));
  };
  const updateCourse = (code, patch) => {
    setCourses((prev) => prev.map((course) => (course.code === code ? { ...course, ...patch } : course)));
  };
  const addCourse = () => {
    if (!newCourse.code.trim() || !newCourse.name.trim()) return;
    setCourses((prev) => [
      ...prev,
      { code: newCourse.code.trim(), name: newCourse.name.trim(), credit: Number(newCourse.credit) || 3, semester: currentTerm.semester, dept: deptCode, status: "Enabled", sections: [] },
    ]);
    setNewCourse({ code: "", name: "", credit: 3 });
  };
  const deleteCourse = (code) => setCourses((prev) => prev.filter((course) => course.code !== code));
  const addRequest = () => {
    if (!newRequest.studentId.trim() || !newRequest.studentName.trim()) return;
    setRequests((prev) => [
      ...prev,
      {
        studentId: newRequest.studentId.trim(),
        studentName: newRequest.studentName.trim(),
        dept: deptCode,
        selectedCourses: newRequest.selectedCourses.split(",").map((item) => item.trim()).filter(Boolean),
        status: "Submitted",
      },
    ]);
    setNewRequest({ studentId: "", studentName: "", selectedCourses: "" });
  };
  const deleteRequest = (studentId) => setRequests((prev) => prev.filter((request) => request.studentId !== studentId));

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setActiveTab("courses")} style={tabButton(activeTab === "courses")}>Offered Courses</button>
        <button onClick={() => setActiveTab("requests")} style={tabButton(activeTab === "requests")}>Student Requests</button>
      </div>
      {activeTab === "courses" ? (
        <Panel eyebrow="Program Coordinator" title="Offered courses">
          <table style={{ fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                <th style={{ padding: "8px 10px" }}>Course Code</th>
                <th style={{ padding: "8px 10px" }}>Course Name</th>
                <th style={{ padding: "8px 10px" }}>Credit</th>
                <th style={{ padding: "8px 10px" }}>Semester</th>
                <th style={{ padding: "8px 10px" }}>Status</th>
                <th style={{ padding: "8px 10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {deptCourses.map((course) => (
                <tr key={course.code} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                  <td style={{ padding: "10px 10px", fontWeight: 700, color: COLORS.ink }}>{course.code}</td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>
                    <input value={course.name} onChange={(e) => updateCourse(course.code, { name: e.target.value })} style={{ width: "100%", minWidth: 150, ...fieldStyle }} />
                  </td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>
                    <input type="number" value={course.credit} onChange={(e) => updateCourse(course.code, { credit: Number(e.target.value) || 0 })} style={{ width: 70, ...fieldStyle }} />
                  </td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>{course.semester}</td>
                  <td style={{ padding: "10px 10px" }}>
                    <Badge color={course.status === "Enabled" ? COLORS.good : COLORS.bad}>{course.status}</Badge>
                  </td>
                  <td style={{ padding: "10px 10px" }}>
                    <button
                      onClick={() => setCourseStatus(course.code, course.status === "Enabled" ? "Disabled" : "Enabled")}
                      style={actionButton(course.status === "Enabled" ? COLORS.bad : COLORS.good)}
                    >
                      {course.status === "Enabled" ? "Disable" : "Enable"}
                    </button>
                    <button onClick={() => deleteCourse(course.code)} style={{ ...actionButton(COLORS.bad), marginLeft: 6 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
            <input value={newCourse.code} onChange={(e) => setNewCourse((prev) => ({ ...prev, code: e.target.value }))} placeholder="Course code" style={{ width: 120, ...fieldStyle }} />
            <input value={newCourse.name} onChange={(e) => setNewCourse((prev) => ({ ...prev, name: e.target.value }))} placeholder="Course name" style={{ minWidth: 190, ...fieldStyle }} />
            <input type="number" value={newCourse.credit} onChange={(e) => setNewCourse((prev) => ({ ...prev, credit: e.target.value }))} style={{ width: 80, ...fieldStyle }} />
            <button onClick={addCourse} style={actionButton(COLORS.navy, true)}>Add Course</button>
          </div>
        </Panel>
      ) : (
        <Panel eyebrow="Program Coordinator" title="Student requests">
          <table style={{ fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                <th style={{ padding: "8px 10px" }}>Student ID</th>
                <th style={{ padding: "8px 10px" }}>Student Name</th>
                <th style={{ padding: "8px 10px" }}>Selected Courses</th>
                <th style={{ padding: "8px 10px" }}>Status</th>
                <th style={{ padding: "8px 10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {deptRequests.map((request) => (
                <tr key={request.studentId} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                  <td style={{ padding: "10px 10px", fontWeight: 700, color: COLORS.ink }}>{request.studentId}</td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>{request.studentName}</td>
                  <td style={{ padding: "10px 10px", color: COLORS.slate }}>{request.selectedCourses.join(", ")}</td>
                  <td style={{ padding: "10px 10px" }}>
                    <Badge color={request.status === "Approved" ? COLORS.good : COLORS.warn}>{request.status}</Badge>
                  </td>
                  <td style={{ padding: "10px 10px" }}>
                    <button
                      disabled={request.status === "Approved"}
                      onClick={() => approveRequest(request.studentId)}
                      style={{ ...actionButton(COLORS.good), opacity: request.status === "Approved" ? 0.5 : 1 }}
                    >
                      Approve
                    </button>
                    <button onClick={() => deleteRequest(request.studentId)} style={{ ...actionButton(COLORS.bad), marginLeft: 6 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
            <input value={newRequest.studentId} onChange={(e) => setNewRequest((prev) => ({ ...prev, studentId: e.target.value }))} placeholder="Student ID" style={{ width: 140, ...fieldStyle }} />
            <input value={newRequest.studentName} onChange={(e) => setNewRequest((prev) => ({ ...prev, studentName: e.target.value }))} placeholder="Student name" style={{ minWidth: 170, ...fieldStyle }} />
            <input value={newRequest.selectedCourses} onChange={(e) => setNewRequest((prev) => ({ ...prev, selectedCourses: e.target.value }))} placeholder="Courses, comma-separated" style={{ minWidth: 230, ...fieldStyle }} />
            <button onClick={addRequest} style={actionButton(COLORS.navy, true)}>Add Request</button>
          </div>
        </Panel>
      )}
    </div>
  );
}

function TeacherView({ scopeDept }) {
  const deptCode = scopeDept || "CSE";
  const rows = PRE_ADVISING_COURSES
    .filter((course) => course.dept === deptCode)
    .flatMap((course) =>
      course.sections.map((section) => ({
        course: `${course.code} · ${course.name}`,
        section: section.section,
        requestedStudents: section.requestedStudents,
      }))
    );

  return (
    <Panel eyebrow="Course Teacher" title="Expected students">
      <table style={{ fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <th style={{ padding: "8px 10px" }}>Course</th>
            <th style={{ padding: "8px 10px" }}>Section</th>
            <th style={{ padding: "8px 10px" }}>Requested Students</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.course}-${row.section}`} style={{ borderTop: `1px solid ${COLORS.line}` }}>
              <td style={{ padding: "10px 10px", fontWeight: 600, color: COLORS.ink }}>{row.course}</td>
              <td style={{ padding: "10px 10px", color: COLORS.slate }}>{row.section}</td>
              <td style={{ padding: "10px 10px", color: COLORS.slate }}>{row.requestedStudents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

function StudentView() {
  const [semester, setSemester] = useState(PRE_ADVISING_SEMESTERS[0].semester);
  const [activeCourseCode, setActiveCourseCode] = useState(PRE_ADVISING_SEMESTERS[0].courses[0].code);
  const [activeTeacherName, setActiveTeacherName] = useState(PRE_ADVISING_SEMESTERS[0].courses[0].teachers[0].name);
  const [activeSlotKey, setActiveSlotKey] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const semesterPlan = PRE_ADVISING_SEMESTERS.find((item) => item.semester === semester) ?? PRE_ADVISING_SEMESTERS[0];
  const activeCourse = semesterPlan.courses.find((course) => course.code === activeCourseCode) ?? semesterPlan.courses[0];
  const activeTeacher = activeCourse.teachers.find((teacher) => teacher.name === activeTeacherName) ?? activeCourse.teachers[0];
  const availableSlots = activeTeacher.slots.filter((slot) => slot.seats > 0);
  const activeSlot = availableSlots.find((slot) => `${slot.section}-${slot.time}` === activeSlotKey) ?? availableSlots[0];
  const totalCredits = selectedRows.reduce((sum, row) => sum + row.credit, 0);

  const chooseSemester = (value) => {
    const plan = PRE_ADVISING_SEMESTERS.find((item) => item.semester === value) ?? PRE_ADVISING_SEMESTERS[0];
    const firstCourse = plan.courses[0];
    const firstTeacher = firstCourse.teachers[0];
    setSemester(value);
    setActiveCourseCode(firstCourse.code);
    setActiveTeacherName(firstTeacher.name);
    setActiveSlotKey("");
    setMessage("");
  };

  const chooseCourse = (course) => {
    setActiveCourseCode(course.code);
    setActiveTeacherName(course.teachers[0].name);
    setActiveSlotKey("");
    setMessage("");
  };

  const chooseTeacher = (teacher) => {
    setActiveTeacherName(teacher.name);
    setActiveSlotKey("");
    setMessage("");
  };

  const addPreferredSlot = () => {
    if (!activeSlot) {
      setMessage("This teacher has no available time slot.");
      return;
    }
    setSelectedRows((prev) => {
      const withoutExisting = prev.filter((row) => row.code !== activeCourse.code);
      return [
        ...withoutExisting,
        {
          code: activeCourse.code,
          name: activeCourse.name,
          credit: activeCourse.credit,
          teacher: activeTeacher.name,
          slot: activeSlot,
          approvalStatus: activeSlot.approvalStatus,
          assignmentStatus: activeSlot.approvalStatus === "Group Approved" ? "Assigned" : "Pending Approval",
        },
      ];
    });
    setMessage("");
  };

  const removeCourse = (code) => {
    if (submitted) return;
    setSelectedRows((prev) => prev.filter((row) => row.code !== code));
  };
  const changeCourse = (row) => {
    if (submitted) return;
    setActiveCourseCode(row.code);
    setActiveTeacherName(row.teacher);
    setActiveSlotKey(`${row.slot.section}-${row.slot.time}`);
    setMessage("Update the teacher or slot, then click Add Preferred Slot.");
  };
  const clearDraft = () => {
    if (submitted) return;
    setSelectedRows([]);
    setMessage("");
  };

  const submit = () => {
    if (selectedRows.length === 0) {
      setMessage("Select at least one course before submitting.");
      return;
    }
    setSubmitted(true);
    setMessage("Pre-advising submitted successfully.");
  };

  return (
    <div>
      <Panel
        eyebrow="Student Pre-Advising"
        title="Step 1: Choose semester"
        right={<Badge color={submitted ? COLORS.good : COLORS.warn}>{submitted ? "Submitted" : "Draft"}</Badge>}
        style={{ marginBottom: 16 }}
      >
        <select
          disabled={submitted}
          value={semester}
          onChange={(e) => chooseSemester(e.target.value)}
          style={{ width: "100%", maxWidth: 260, padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, color: COLORS.ink }}
        >
          {PRE_ADVISING_SEMESTERS.map((item) => (
            <option key={item.semester}>{item.semester}</option>
          ))}
        </select>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 0.9fr) minmax(320px, 1.4fr)", gap: 16, marginBottom: 16 }}>
        <Panel eyebrow="Suggested Courses" title="Step 2: Choose course">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {semesterPlan.courses.map((course) => {
            const added = selectedRows.some((row) => row.code === course.code);
            const active = activeCourse.code === course.code;
            return (
              <button
                key={course.code}
                disabled={submitted}
                onClick={() => chooseCourse(course)}
                style={{
                  textAlign: "left",
                  border: `1px solid ${active ? COLORS.navy : added ? COLORS.good : COLORS.line}`,
                  background: active ? `${COLORS.navy}0D` : added ? `${COLORS.good}0D` : COLORS.card,
                  borderRadius: 10,
                  padding: 14,
                  cursor: submitted ? "default" : "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.navy, fontWeight: 800, fontSize: 13 }}>
                  <BookOpen size={15} /> {course.code}
                </div>
                <div style={{ fontWeight: 700, color: COLORS.ink, marginTop: 7 }}>{course.name}</div>
                <div style={{ color: COLORS.slate, fontSize: 12.5, marginTop: 4 }}>{course.credit} Credits</div>
              </button>
            );
          })}
          </div>
        </Panel>

        <Panel eyebrow="Teacher & Time Slot" title="Step 3: Choose teacher, then time slot">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(150px, 0.8fr) minmax(220px, 1.2fr)", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {activeCourse.teachers.map((teacher) => {
                const available = teacher.slots.some((slot) => slot.seats > 0);
                const active = activeTeacher.name === teacher.name;
                return (
                  <button
                    key={teacher.name}
                    disabled={submitted}
                    onClick={() => chooseTeacher(teacher)}
                    style={{
                      textAlign: "left",
                      border: `1px solid ${active ? COLORS.navy : COLORS.line}`,
                      background: active ? `${COLORS.navy}0D` : COLORS.card,
                      borderRadius: 9,
                      padding: 11,
                      cursor: submitted ? "default" : "pointer",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: COLORS.ink }}>{teacher.name}</div>
                    <div style={{ color: available ? COLORS.good : COLORS.bad, fontSize: 12, marginTop: 3 }}>
                      {available ? "Slots available" : "No slots available"}
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {activeTeacher.slots.map((slot) => {
                const slotKey = `${slot.section}-${slot.time}`;
                const unavailable = slot.seats <= 0;
                const active = (activeSlotKey || (activeSlot && `${activeSlot.section}-${activeSlot.time}`)) === slotKey;
                return (
                  <label
                    key={slotKey}
                    style={{
                      border: `1px solid ${active ? COLORS.navy : COLORS.line}`,
                      borderRadius: 9,
                      padding: 11,
                      opacity: unavailable ? 0.55 : 1,
                      background: active ? `${COLORS.navy}0D` : COLORS.card,
                    }}
                  >
                    <input
                      type="radio"
                      name="student-timeslot"
                      value={slotKey}
                      disabled={submitted || unavailable}
                      checked={!unavailable && active}
                      onChange={(e) => setActiveSlotKey(e.target.value)}
                      style={{ marginRight: 7 }}
                    />
                    <span style={{ fontWeight: 800, color: COLORS.ink }}>Section {slot.section}</span>
                    <div style={{ color: COLORS.slate, fontSize: 12.5, marginTop: 5 }}>{slot.days} · {slot.time}</div>
                    <div style={{ color: COLORS.slate, fontSize: 12.5 }}>Seats: {slot.seats}</div>
                    <div style={{ marginTop: 6 }}>
                      <Badge color={slot.approvalStatus === "Group Approved" ? COLORS.good : COLORS.warn}>{slot.approvalStatus}</Badge>
                    </div>
                  </label>
                );
              })}
              <button disabled={submitted} onClick={addPreferredSlot} style={{ ...actionButton(COLORS.navy, true), opacity: submitted ? 0.55 : 1 }}>
                Add Preferred Slot
              </button>
            </div>
          </div>
        </Panel>
      </div>

      <Panel
        eyebrow="Selected Courses"
        title="Step 4: Review, submit, and wait for assignment"
        right={<Badge color={COLORS.navy}>{totalCredits} Credits</Badge>}
      >
        <table style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: COLORS.slate, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <th style={{ padding: "8px 10px" }}>Course</th>
              <th style={{ padding: "8px 10px" }}>Teacher</th>
              <th style={{ padding: "8px 10px" }}>Section</th>
              <th style={{ padding: "8px 10px" }}>Time</th>
              <th style={{ padding: "8px 10px" }}>Approval</th>
              <th style={{ padding: "8px 10px" }}>Assignment</th>
              <th style={{ padding: "8px 10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedRows.map((row) => (
              <tr key={row.code} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <td style={{ padding: "10px 10px", fontWeight: 700, color: COLORS.ink }}>{row.code} · {row.name}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{row.teacher}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{row.slot.section}</td>
                <td style={{ padding: "10px 10px", color: COLORS.slate }}>{row.slot.days} · {row.slot.time}</td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={row.approvalStatus === "Group Approved" ? COLORS.good : COLORS.warn}>{row.approvalStatus}</Badge>
                </td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={row.assignmentStatus === "Assigned" ? COLORS.good : COLORS.warn}>
                    {row.assignmentStatus === "Assigned" ? `Assigned Section ${row.slot.section}` : row.assignmentStatus}
                  </Badge>
                </td>
                <td style={{ padding: "10px 10px" }}>
                  <button disabled={submitted} onClick={() => changeCourse(row)} style={{ ...actionButton(COLORS.navy), opacity: submitted ? 0.5 : 1 }}>
                    Change
                  </button>
                  <button disabled={submitted} onClick={() => removeCourse(row.code)} style={{ ...actionButton(COLORS.bad), marginLeft: 6, opacity: submitted ? 0.5 : 1 }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {selectedRows.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "16px 10px", color: COLORS.slate, textAlign: "center" }}>
                  No courses selected yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <button disabled={submitted} onClick={submit} style={{ ...actionButton(COLORS.navy, true), opacity: submitted ? 0.55 : 1 }}>
            Submit Pre-Advising
          </button>
          <button disabled={submitted || selectedRows.length === 0} onClick={clearDraft} style={{ ...actionButton(COLORS.bad), opacity: submitted || selectedRows.length === 0 ? 0.55 : 1 }}>
            Clear Draft
          </button>
          {message && <span style={{ fontSize: 12.5, color: submitted ? COLORS.good : COLORS.bad }}>{message}</span>}
        </div>
      </Panel>
    </div>
  );
}

export default function PreAdvisingPage({ role, scopeDept }) {
  const [terms, setTerms] = useState([
    PRE_ADVISING_TERM,
    { semester: "Spring 2028", status: "Closed", startDate: "01 Jan 2028", endDate: "15 Jan 2028", totalStudents: 980, submitted: 0 },
  ]);
  const [selectedSemester, setSelectedSemester] = useState(PRE_ADVISING_TERM.semester);
  const currentTerm = terms.find((item) => item.semester === selectedSemester) ?? terms[0];
  const roleViews = {
    "University Admin": (
      <AdminView
        terms={terms}
        setTerms={setTerms}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
      />
    ),
    "Dept Admin": <DepartmentView scopeDept={scopeDept} />,
    "Program Coordinator": <CoordinatorView scopeDept={scopeDept} currentTerm={currentTerm} />,
    "Course Teacher": <TeacherView scopeDept={scopeDept} />,
    Student: <StudentView />,
  };

  return (
    <div>
      <Panel
        eyebrow="Academic Operations"
        title="Pre-Advising"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 7, color: COLORS.slate, fontSize: 12.5 }}>
            <CalendarDays size={14} /> {currentTerm.semester}
          </div>
        }
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.slate, fontSize: 12.5 }}>
          <GraduationCap size={15} /> Demo workflow based on mock data. Each role sees only the controls relevant to that role.
        </div>
      </Panel>
      {roleViews[role] ?? <DepartmentView scopeDept={scopeDept} />}
    </div>
  );
}
