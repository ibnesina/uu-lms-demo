Develop a new feature called **Pre-Advising** in the existing React-based University Management Demo System.

## Important Instructions

- This is a demo-only feature.
- Reuse the existing project structure, layouts, tables, cards, modals, forms and styling.
- Do not introduce any new architecture, libraries, or complex state management.
- Use mock/static JSON data.
- Do not modify existing modules unless required for navigation.
- Keep the implementation simple, clean and consistent with the current system.

The system already has the following roles:

- University Admin
- Department Admin
- Program Coordinator
- Course Teacher
- Student

Implement the following role-wise functionality.

--------------------------------------------------
1. University Admin
--------------------------------------------------

Add a new menu:

Academic
└── Pre-Advising

Features:

- Select Semester
- Open Pre-Advising
- Close Pre-Advising
- View overall progress

Fields

- Semester
- Status (Open / Closed)
- Start Date
- End Date

Statistics Cards

- Total Students
- Submitted
- Pending

--------------------------------------------------
2. Department Admin
--------------------------------------------------

Department Admin can only monitor departmental progress.

Dashboard Cards

- Total Students
- Submitted
- Pending
- Completion Percentage

Also display Course Demand Summary.

Example

Course | Students Selected

No editing is required.

--------------------------------------------------
3. Program Coordinator
--------------------------------------------------

Add a menu

Pre-Advising
    ├── Offered Courses
    └── Student Requests

### Offered Courses

Display a table

Columns

- Course Code
- Course Name
- Credit
- Semester
- Status

Actions

- Enable
- Disable

Use mock data.

### Student Requests

Display all submitted requests.

Columns

- Student ID
- Student Name
- Selected Courses
- Status

Status

- Submitted
- Approved

Coordinator can only:

- View
- Approve

No rejection workflow is needed.

--------------------------------------------------
4. Course Teacher
--------------------------------------------------

Course Teachers have read-only access.

Menu

Expected Students

Display

- Course
- Section
- Requested Students

No actions are required.

--------------------------------------------------
5. Student
--------------------------------------------------

This is the main feature.

Add a new menu

Pre-Advising

--------------------------------------------------
Student Flow
--------------------------------------------------

Step 1

Display the current semester.

Example

Fall 2027

Display eligible courses.

Example

CSE411
Artificial Intelligence
3 Credits

CSE413
Compiler
3 Credits

CSE421
Data Mining
3 Credits

HUM321
Economics
3 Credits

Use mock data.

--------------------------------------------------
Step 2
--------------------------------------------------

When a student clicks a course, open a modal (or side drawer) showing all available sections.

Display

- Section
- Teacher
- Days
- Time
- Available Seats

Example

Section A
Teacher: Dr. Rahman
Sun-Tue
9:00 AM - 10:20 AM
Seats: 18

Section B
Teacher: Dr. Ahmed
Mon-Wed
11:00 AM - 12:20 PM
Seats: 25

Section C
Teacher: Dr. Hasan
Tue-Thu
2:00 PM - 3:20 PM
Seats: 10

Student selects one preferred section.

Click

Add Course

The selected course should be added to the student's selected list.

--------------------------------------------------
Step 3
--------------------------------------------------

The student repeats the same process for all desired courses.

Display a table below.

Columns

- Course
- Teacher
- Section
- Time

Also display

Total Credits

Allow removing a selected course before submission.

--------------------------------------------------
Step 4
--------------------------------------------------

Student clicks

Submit Pre-Advising

Show a success message.

Status becomes

Submitted

After submission, disable further editing.

--------------------------------------------------
Demo Assumptions
--------------------------------------------------

For this demo:

- Eligible courses are already filtered.
- Prerequisites are assumed to be satisfied.
- Seat availability is display only.
- No schedule conflict checking.
- No waitlist.
- No automatic section allocation.
- No backend API.
- No database.
- No notifications.
- No email.
- No advanced validations.

The workflow is simply:

Student
→ Select Course
→ Choose Preferred Section
→ Add Course
→ Repeat
→ Submit Pre-Advising

--------------------------------------------------
Mock Data
--------------------------------------------------

Semester

Fall 2027

Courses

- CSE411
- CSE413
- CSE421
- HUM321

Each course should have 2–3 sections with different teachers and schedules.

--------------------------------------------------
Expected Demo Flow
--------------------------------------------------

University Admin
→ Opens Pre-Advising

Department Admin
→ Monitors departmental progress and demand

Program Coordinator
→ Manages offered courses
→ Reviews submitted requests
→ Approves requests

Course Teacher
→ Views expected student count for assigned sections

Student
→ Opens Pre-Advising
→ Views eligible courses
→ Selects a course
→ Chooses a preferred section
→ Adds the course
→ Repeats for remaining courses
→ Reviews selected courses
→ Submits Pre-Advising

The implementation should look complete for demonstration purposes while remaining lightweight, simple, and fully based on mock data.