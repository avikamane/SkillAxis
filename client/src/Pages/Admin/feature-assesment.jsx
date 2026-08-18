import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaClipboardList,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

import { assessments } from "../../Info/assessmentData";

import "./feature-assesment.css";

function FeatureAssesment() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showView, setShowView] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  /* =========================================
     FILTER ASSESSMENTS
     ========================================= */

  const filteredAssessments = assessments.filter((assessment) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      assessment.title.toLowerCase().includes(searchText) ||
      assessment.description.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      assessment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================================
     PERFORMANCE
     ========================================= */

  const getPerformance = (assessment) => {
    const performance = assessment.performance || [];

    const completed = performance.filter(
      (trainee) => trainee.score !== null
    ).length;

    const notCompleted = performance.filter(
      (trainee) => trainee.score === null
    ).length;

    return {
      completed,
      notCompleted,
      total: performance.length,
    };
  };

  /* =========================================
     STATUS CLASS
     ========================================= */

  const getStatusClass = (status) => {
    if (status === "Open") return "status-open";
    if (status === "Upcoming") return "status-upcoming";
    if (status === "Completed") return "status-completed";

    return "";
  };

  /* =========================================
     VIEW ASSESSMENT
     ========================================= */

  const handleView = (assessment) => {
    setSelectedAssessment(assessment);
    setShowView(true);
  };

  /* =========================================
     CLOSE MODAL
     ========================================= */

  const closeView = () => {
    setShowView(false);
    setSelectedAssessment(null);
  };

  /* =========================================
     OPEN QUIZ
     ========================================= */

  const handleOpenQuiz = () => {
    if (!selectedAssessment?.quizLink) {
      alert("Assessment link is not available.");
      return;
    }

    window.open(
      selectedAssessment.quizLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================
     STATS
     ========================================= */

  const totalAssessments = assessments.length;

  const openAssessments = assessments.filter(
    (item) => item.status === "Open"
  ).length;

  const upcomingAssessments = assessments.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const completedAssessments = assessments.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <div className="assessment-page">

      {/* =========================================
          HEADER
          ========================================= */}

      <div className="assessment-page-header">
        <div>
          <h1>Assessments</h1>
          <p>
            Monitor assessments and trainee performance
          </p>
        </div>
      </div>

      {/* =========================================
          STAT CARDS
          ========================================= */}

      <div className="assessment-stats">

        <div className="assessment-stat-card">
          <div className="assessment-stat-icon">
            <FaClipboardList />
          </div>

          <div>
            <span>Total Assessments</span>
            <strong>{totalAssessments}</strong>
          </div>
        </div>

        <div className="assessment-stat-card">
          <div className="assessment-stat-icon">
            <FaClock />
          </div>

          <div>
            <span>Open</span>
            <strong>{openAssessments}</strong>
          </div>
        </div>

        <div className="assessment-stat-card">
          <div className="assessment-stat-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <span>Upcoming</span>
            <strong>{upcomingAssessments}</strong>
          </div>
        </div>

        <div className="assessment-stat-card">
          <div className="assessment-stat-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedAssessments}</strong>
          </div>
        </div>

      </div>

      {/* =========================================
          SEARCH + FILTER
          ========================================= */}

      <div className="assessment-toolbar">

        <div className="assessment-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search assessments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="assessment-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      {/* =========================================
          ASSESSMENT TABLE
          ========================================= */}

      <div className="assessment-section">

        <div className="assessment-section-header">

          <div>
            <h2>Assessment Overview</h2>
            <p>
              View assessment completion and trainee performance
            </p>
          </div>

          <span className="assessment-count">
            {filteredAssessments.length} assessments
          </span>

        </div>

        <div className="assessment-table-container">

          <table className="assessment-table">

            <thead>
              <tr>
                <th>Assessment</th>
                <th>Session</th>
                <th>Trainer</th>
                <th>Due Date</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Completed</th>
                <th>Not Completed</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredAssessments.length > 0 ? (

                filteredAssessments.map((assessment) => {

                  const performance =
                    getPerformance(assessment);

                  return (
                    <tr key={assessment.id}>

                      {/* ASSESSMENT */}

                      <td>
                        <div className="assessment-title-cell">

                          <div className="assessment-mini-icon">
                            <FaClipboardList />
                          </div>

                          <div>
                            <strong>
                              {assessment.title}
                            </strong>

                            <small>
                              Assessment #{assessment.id}
                            </small>
                          </div>

                        </div>
                      </td>

                      {/* SESSION */}

                      <td>
                        Session #{assessment.sessionId}
                      </td>

                      {/* TRAINER */}

                      <td>
                        Trainer #{assessment.trainerId}
                      </td>

                      {/* DATE */}

                      <td>
                        {assessment.dueDate}
                      </td>

                      {/* MARKS */}

                      <td>
                        <strong>
                          {assessment.totalMarks}
                        </strong>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`assessment-status ${getStatusClass(
                            assessment.status
                          )}`}
                        >
                          {assessment.status}
                        </span>
                      </td>

                      {/* COMPLETED */}

                      <td>
                        <span className="completion completed">
                          <FaCheckCircle />
                          {performance.completed}
                        </span>
                      </td>

                      {/* NOT COMPLETED */}

                      <td>
                        <span className="completion not-completed">
                          <FaTimesCircle />
                          {performance.notCompleted}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td>
                        <button
                          className="action-view"
                          title="View Assessment"
                          onClick={() =>
                            handleView(assessment)
                          }
                        >
                          <FaEye />
                        </button>
                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>
                  <td
                    colSpan="9"
                    className="assessment-empty"
                  >
                    No assessments found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =========================================
          VIEW ASSESSMENT MODAL
          ========================================= */}

      {showView && selectedAssessment && (

        <div
          className="assessment-modal-overlay"
          onClick={closeView}
        >

          <div
            className="assessment-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="assessment-modal-header">

              <div>
                <h2>
                  {selectedAssessment.title}
                </h2>

                <p>
                  Assessment Performance
                </p>
              </div>

              <button
                className="assessment-close-btn"
                onClick={closeView}
              >
                <FaTimes />
              </button>

            </div>

            {/* DETAILS */}

            <div className="assessment-details">

              <div className="assessment-description-box">
                <span>Description</span>

                <p>
                  {selectedAssessment.description}
                </p>
              </div>

              <div className="assessment-detail-grid">

                <div className="assessment-detail-card">
                  <span>Session</span>
                  <strong>
                    #{selectedAssessment.sessionId}
                  </strong>
                </div>

                <div className="assessment-detail-card">
                  <span>Trainer</span>
                  <strong>
                    #{selectedAssessment.trainerId}
                  </strong>
                </div>

                <div className="assessment-detail-card">
                  <span>Due Date</span>
                  <strong>
                    {selectedAssessment.dueDate}
                  </strong>
                </div>

                <div className="assessment-detail-card">
                  <span>Total Marks</span>
                  <strong>
                    {selectedAssessment.totalMarks}
                  </strong>
                </div>

                <div className="assessment-detail-card">
                  <span>Status</span>

                  <strong
                    className={`assessment-status ${getStatusClass(
                      selectedAssessment.status
                    )}`}
                  >
                    {selectedAssessment.status}
                  </strong>
                </div>

              </div>

              {/* TRAINEE PERFORMANCE */}

              <div className="performance-section">

                <h3>
                  Trainee Performance
                </h3>

                {selectedAssessment.performance &&
                selectedAssessment.performance.length > 0 ? (

                  <div className="performance-list">

                    {selectedAssessment.performance.map(
                      (trainee) => {

                        const completed =
                          trainee.score !== null;

                        return (
                          <div
                            className="performance-row"
                            key={trainee.traineeId}
                          >

                            <div className="trainee-performance-name">

                              <div className="trainee-performance-avatar">
                                T
                              </div>

                              <span>
                                Trainee #{trainee.traineeId}
                              </span>

                            </div>

                            <div className="trainee-performance-result">

                              {completed ? (
                                <>
                                  <strong>
                                    {trainee.score}/
                                    {
                                      selectedAssessment.totalMarks
                                    }
                                  </strong>

                                  <span className="completed-label">
                                    <FaCheckCircle />
                                    Completed
                                  </span>
                                </>
                              ) : (
                                <span className="not-completed-label">
                                  <FaTimesCircle />
                                  Not Completed
                                </span>
                              )}

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                ) : (

                  <p className="no-performance">
                    No trainee performance available yet.
                  </p>

                )}

              </div>

            </div>

            {/* FOOTER */}

            <div className="assessment-modal-footer">

              <button
                className="assessment-cancel-btn"
                onClick={closeView}
              >
                Close
              </button>

              <button
                className="assessment-open-btn"
                onClick={handleOpenQuiz}
              >
                <FaExternalLinkAlt />
                Open Assessment
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default FeatureAssesment;