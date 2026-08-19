import { useMemo, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCalendarAlt,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaDownload,
  FaCertificate,
  FaUsers,
  FaChalkboardTeacher,
  FaBuilding,
  FaBook,
  FaBell,
  FaToggleOn,
  FaToggleOff,
  FaTimes,
} from "react-icons/fa";

import { sessions } from "../../Info/sessionData";
import { assessments } from "../../Info/assessmentData";

import "./feature-report.css";

function FeatureReports() {
  const [search, setSearch] = useState("");
  const [activeReport, setActiveReport] = useState(null);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  /* =========================================
     HARD-CODED REPORT DATA
     ========================================= */

  const learningData = {
    completionRate: 78,
    averageTime: "4.2 days",
    passRate: 82,
    activeLearners: 24,
    dropoutPoint: "JavaScript Basics",
  };

  const complianceData = {
    complianceRate: 91,
    expiring30: 3,
    expiring60: 7,
    expiring90: 12,
  };

  const resourceData = {
    trainingSpend: "₹2,450",
    instructorUtilization: 76,
    classroomOccupancy: 68,
  };

  const coursePerformance = [
    {
      name: "React JS",
      learners: 28,
      rating: 4.8,
      percentage: 92,
    },
    {
      name: "JavaScript",
      learners: 25,
      rating: 4.6,
      percentage: 84,
    },
    {
      name: "Node.js",
      learners: 21,
      rating: 4.5,
      percentage: 76,
    },
    {
      name: "MongoDB",
      learners: 18,
      rating: 4.3,
      percentage: 68,
    },
    {
      name: "HTML & CSS",
      learners: 15,
      rating: 4.2,
      percentage: 58,
    },
  ];

  /* =========================================
     SESSION CALCULATIONS
     ========================================= */

  const totalSessions = sessions.length;

  const completedSessions = sessions.filter(
    (session) => session.status === "Completed"
  ).length;

  const upcomingSessions = sessions.filter(
    (session) => session.status === "Upcoming"
  ).length;

  /* =========================================
     ASSESSMENT CALCULATIONS
     ========================================= */

  const totalAssessments = assessments.length;

  const openAssessments = assessments.filter(
    (assessment) => assessment.status === "Open"
  ).length;

  const upcomingAssessments = assessments.filter(
    (assessment) => assessment.status === "Upcoming"
  ).length;

  /* =========================================
     SESSION SEARCH
     ========================================= */

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const text = `
        ${session.title}
        ${session.date}
        ${session.status}
        ${session.trainerId}
      `.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [search]);

  /* =========================================
     STATUS
     ========================================= */

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "report-status completed";
    }

    if (status === "Upcoming") {
      return "report-status upcoming";
    }

    if (status === "Open") {
      return "report-status open";
    }

    return "report-status";
  };

  /* =========================================
     TRAINER REPORT
     ========================================= */

  const trainerReports = useMemo(() => {
    const trainerMap = {};

    sessions.forEach((session) => {
      const trainer = `Trainer #${session.trainerId}`;

      if (!trainerMap[trainer]) {
        trainerMap[trainer] = {
          total: 0,
          completed: 0,
          upcoming: 0,
        };
      }

      trainerMap[trainer].total++;

      if (session.status === "Completed") {
        trainerMap[trainer].completed++;
      }

      if (session.status === "Upcoming") {
        trainerMap[trainer].upcoming++;
      }
    });

    return Object.entries(trainerMap).map(
      ([trainer, data]) => ({
        trainer,
        ...data,
      })
    );
  }, []);

  /* =========================================
     EXPORT REPORT
     ========================================= */

  const handleExport = () => {
    const reportText = `
SKILLAXIS TRAINING REPORT
=========================

LEARNING & TRAINING
Course Completion Rate: ${learningData.completionRate}%
Average Time-to-Complete: ${learningData.averageTime}
Assessment Pass Rate: ${learningData.passRate}%
Active Learners: ${learningData.activeLearners}
Drop-out Point: ${learningData.dropoutPoint}

COMPLIANCE & CERTIFICATIONS
Compliance Rate: ${complianceData.complianceRate}%
Expiring within 30 days: ${complianceData.expiring30}
Expiring within 60 days: ${complianceData.expiring60}
Expiring within 90 days: ${complianceData.expiring90}

RESOURCE & FINANCIAL
Training Spend Per Employee: ${resourceData.trainingSpend}
Instructor Utilization: ${resourceData.instructorUtilization}%
Classroom Occupancy: ${resourceData.classroomOccupancy}%

SESSION SUMMARY
Total Sessions: ${totalSessions}
Completed Sessions: ${completedSessions}
Upcoming Sessions: ${upcomingSessions}

ASSESSMENT SUMMARY
Total Assessments: ${totalAssessments}
Open Assessments: ${openAssessments}
Upcoming Assessments: ${upcomingAssessments}
`;

    const blob = new Blob([reportText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "SkillAxis-Training-Report.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  /* =========================================
     REMINDER
     ========================================= */

  const handleReminderToggle = () => {
    setRemindersEnabled((previous) => !previous);
  };

  return (
    <div className="reports-page">

      {/* =====================================
          HEADER
          ===================================== */}

      <div className="reports-header">

        <div>
          <h1>Reports & Analytics</h1>

          <p>
            Monitor training performance, compliance,
            resources and learner activity
          </p>
        </div>

        <button
          className="export-report-btn"
          onClick={handleExport}
        >
          <FaDownload />
          Export Report
        </button>

      </div>

      {/* =====================================
          TOP KPI CARDS
          ===================================== */}

      <div className="reports-kpi-grid">

        <div className="kpi-card">
          <div className="kpi-icon">
            <FaChartLine />
          </div>

          <div>
            <span>Course Completion</span>
            <strong>{learningData.completionRate}%</strong>
            <small>of enrolled learners</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <FaClock />
          </div>

          <div>
            <span>Avg. Time-to-Complete</span>
            <strong>{learningData.averageTime}</strong>
            <small>training duration</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Assessment Pass Rate</span>
            <strong>{learningData.passRate}%</strong>
            <small>first attempt</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <FaUsers />
          </div>

          <div>
            <span>Active Learners</span>
            <strong>{learningData.activeLearners}</strong>
            <small>currently active</small>
          </div>
        </div>

      </div>

      {/* =====================================
          LEARNING & TRAINING
          ===================================== */}

      <div className="reports-section">

        <div className="reports-section-header">
          <div>
            <h2>Learning & Training</h2>
            <p>
              Track learner progress and training effectiveness
            </p>
          </div>

          <FaChartLine />
        </div>

        <div className="learning-grid">

          <div className="learning-card">

            <div className="learning-card-top">
              <div className="learning-icon">
                <FaCheckCircle />
              </div>

              <span>Course Completion Rate</span>
            </div>

            <strong>{learningData.completionRate}%</strong>

            <div className="metric-progress">
              <div
                style={{
                  width: `${learningData.completionRate}%`,
                }}
              />
            </div>

            <small>
              Percentage of enrolled learners who finish
              their course
            </small>

          </div>

          <div className="learning-card">

            <div className="learning-card-top">
              <div className="learning-icon">
                <FaClock />
              </div>

              <span>Average Time-to-Complete</span>
            </div>

            <strong>{learningData.averageTime}</strong>

            <small>
              Average time users take to complete a
              training module
            </small>

          </div>

          <div className="learning-card">

            <div className="learning-card-top">
              <div className="learning-icon">
                <FaClipboardList />
              </div>

              <span>Assessment Pass Rate</span>
            </div>

            <strong>{learningData.passRate}%</strong>

            <div className="metric-progress">
              <div
                style={{
                  width: `${learningData.passRate}%`,
                }}
              />
            </div>

            <small>
              Learners passing assessments on first attempt
            </small>

          </div>

          <div className="learning-card">

            <div className="learning-card-top">
              <div className="learning-icon">
                <FaUsers />
              </div>

              <span>Active Learners</span>
            </div>

            <strong>{learningData.activeLearners}</strong>

            <small>
              Unique learners currently active in training
            </small>

          </div>

        </div>

        {/* DROP OUT */}

        <div className="dropout-box">

          <div className="dropout-icon">
            <FaChartLine />
          </div>

          <div>
            <span>Drop-out Point</span>

            <strong>
              {learningData.dropoutPoint}
            </strong>

            <small>
              Module with the highest learner drop-off
            </small>
          </div>

        </div>

      </div>

      {/* =====================================
          COMPLIANCE
          ===================================== */}

      <div className="reports-section">

        <div className="reports-section-header">

          <div>
            <h2>Compliance & Certifications</h2>

            <p>
              Monitor mandatory training and certification
              expiry
            </p>
          </div>

          <FaCertificate />

        </div>

        <div className="compliance-grid">

          <div className="compliance-main">

            <div className="compliance-circle">
              <div>
                <strong>
                  {complianceData.complianceRate}%
                </strong>

                <span>Compliant</span>
              </div>
            </div>

            <div>
              <h3>Compliance Rate</h3>

              <p>
                Percentage of staff meeting mandatory
                training requirements.
              </p>
            </div>

          </div>

          <div className="expiry-list">

            <h3>Upcoming Expirations</h3>

            <div className="expiry-row">
              <span>Within 30 days</span>
              <strong>{complianceData.expiring30}</strong>
            </div>

            <div className="expiry-row">
              <span>Within 60 days</span>
              <strong>{complianceData.expiring60}</strong>
            </div>

            <div className="expiry-row">
              <span>Within 90 days</span>
              <strong>{complianceData.expiring90}</strong>
            </div>

          </div>

          <div className="audit-card">

            <div className="audit-icon">
              <FaDownload />
            </div>

            <div>
              <h3>Audit Trail</h3>

              <p>
                Export historical training records for
                compliance audits.
              </p>

              <button onClick={handleExport}>
                <FaDownload />
                Export Records
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================
          RESOURCE & FINANCIAL
          ===================================== */}

      <div className="reports-section">

        <div className="reports-section-header">

          <div>
            <h2>Resource & Financial Management</h2>

            <p>
              Monitor training costs and resource utilization
            </p>
          </div>

          <FaBuilding />

        </div>

        <div className="resource-grid">

          <div className="resource-card">

            <div className="resource-icon">
              ₹
            </div>

            <span>Training Spend Per Employee</span>

            <strong>
              {resourceData.trainingSpend}
            </strong>

            <small>
              Total training budget per learner
            </small>

          </div>

          <div className="resource-card">

            <div className="resource-icon">
              <FaChalkboardTeacher />
            </div>

            <span>Instructor Utilization</span>

            <strong>
              {resourceData.instructorUtilization}%
            </strong>

            <div className="metric-progress">
              <div
                style={{
                  width: `${resourceData.instructorUtilization}%`,
                }}
              />
            </div>

            <small>
              Available teaching hours actively booked
            </small>

          </div>

          <div className="resource-card">

            <div className="resource-icon">
              <FaBuilding />
            </div>

            <span>Classroom Occupancy</span>

            <strong>
              {resourceData.classroomOccupancy}%
            </strong>

            <div className="metric-progress">
              <div
                style={{
                  width: `${resourceData.classroomOccupancy}%`,
                }}
              />
            </div>

            <small>
              Physical or virtual room fill rate
            </small>

          </div>

        </div>

      </div>

      {/* =====================================
          COURSE CATALOG PERFORMANCE
          ===================================== */}

      <div className="reports-section">

        <div className="reports-section-header">

          <div>
            <h2>Course Catalog Performance</h2>

            <p>
              Most popular and highest-rated courses
            </p>
          </div>

          <FaBook />

        </div>

        <div className="course-performance">

          {coursePerformance.map((course, index) => (

            <div
              className="course-performance-row"
              key={course.name}
            >

              <div className="course-rank">
                #{index + 1}
              </div>

              <div className="course-info">
                <strong>{course.name}</strong>

                <span>
                  {course.learners} learners
                </span>
              </div>

              <div className="course-bar-container">

                <div className="course-bar-track">
                  <div
                    className="course-bar"
                    style={{
                      width: `${course.percentage}%`,
                    }}
                  />
                </div>

                <strong>
                  {course.percentage}%
                </strong>

              </div>

              <div className="course-rating">
                ★ {course.rating}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =====================================
          AUTOMATED REMINDERS
          ===================================== */}

      <div className="reports-section">

        <div className="reports-section-header">

          <div>
            <h2>Automated Reminders</h2>

            <p>
              Manage reminders for learners with overdue
              training
            </p>
          </div>

          <FaBell />

        </div>

        <div className="reminder-card">

          <div className="reminder-icon">
            <FaBell />
          </div>

          <div className="reminder-content">

            <h3>Overdue Training Reminders</h3>

            <p>
              Automatically notify learners when their
              training modules become overdue.
            </p>

            <div className="reminder-options">

              <span>Reminder schedule:</span>

              <strong>
                Every 3 days
              </strong>

            </div>

          </div>

          <button
            className="reminder-toggle"
            onClick={handleReminderToggle}
          >
            {remindersEnabled ? (
              <>
                <FaToggleOn />
                Enabled
              </>
            ) : (
              <>
                <FaToggleOff />
                Disabled
              </>
            )}
          </button>

        </div>

      </div>

      {/* =====================================
          SESSION REPORT
          ===================================== */}

      <div className="reports-section">

        <div className="reports-section-header">

          <div>
            <h2>Session Report</h2>

            <p>
              Detailed session activity
            </p>
          </div>

          <div className="reports-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        <div className="reports-table-container">

          <table className="reports-table">

            <thead>
              <tr>
                <th>Session</th>
                <th>Trainer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Trainees</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredSessions.length > 0 ? (

                filteredSessions.map((session) => (

                  <tr key={session.id}>

                    <td>

                      <div className="report-session-name">

                        <div className="session-report-icon">
                          <FaCalendarAlt />
                        </div>

                        <div>
                          <strong>
                            {session.title}
                          </strong>

                          <small>
                            Session #{session.id}
                          </small>
                        </div>

                      </div>

                    </td>

                    <td>
                      Trainer #{session.trainerId}
                    </td>

                    <td>
                      {session.date}
                    </td>

                    <td>
                      {session.startTime} -{" "}
                      {session.endTime}
                    </td>

                    <td>
                      <span className="trainee-number">
                        {session.traineeIds.length}
                      </span>
                    </td>

                    <td>
                      <span
                        className={getStatusClass(
                          session.status
                        )}
                      >
                        {session.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="report-view-btn"
                        title="View Report"
                        onClick={() =>
                          setActiveReport(session)
                        }
                      >
                        <FaEye />
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="reports-empty"
                  >
                    No sessions found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================
          VIEW SESSION MODAL
          ===================================== */}

      {activeReport && (

        <div
          className="report-modal-overlay"
          onClick={() =>
            setActiveReport(null)
          }
        >

          <div
            className="report-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="report-modal-header">

              <div>
                <h2>
                  {activeReport.title}
                </h2>

                <p>
                  Session Report
                </p>
              </div>

              <button
                onClick={() =>
                  setActiveReport(null)
                }
              >
                <FaTimes />
              </button>

            </div>

            <div className="report-modal-body">

              <div className="report-detail">
                <span>Date</span>

                <strong>
                  {activeReport.date}
                </strong>
              </div>

              <div className="report-detail">
                <span>Time</span>

                <strong>
                  {activeReport.startTime} -{" "}
                  {activeReport.endTime}
                </strong>
              </div>

              <div className="report-detail">
                <span>Trainer</span>

                <strong>
                  Trainer #{activeReport.trainerId}
                </strong>
              </div>

              <div className="report-detail">
                <span>Status</span>

                <strong>
                  {activeReport.status}
                </strong>
              </div>

              <div className="report-detail full">
                <span>Description</span>

                <p>
                  {activeReport.description}
                </p>
              </div>

              <div className="report-detail full">
                <span>Assigned Trainees</span>

                <strong>
                  {activeReport.traineeIds.length} trainees
                </strong>
              </div>

            </div>

            <div className="report-modal-footer">

              <button
                onClick={() =>
                  setActiveReport(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default FeatureReports;