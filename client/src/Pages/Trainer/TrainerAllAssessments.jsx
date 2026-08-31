import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaClipboardList,
  FaEye,
  FaExternalLinkAlt,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaUsers,
  FaAward,
} from "react-icons/fa";

import { assessments as initialAssessments } from "../../Info/assessmentData";
import { sessions } from "../../Info/sessionData";

import "./TrainerAllAssessments.css";

function TrainerAllAssessments() {
  const loggedInTrainerId = 1;

  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [assessments] = useState(initialAssessments);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sessionFilter, setSessionFilter] = useState("All");

  const [selectedAssessment, setSelectedAssessment] = useState(null);

  // =====================================================
  // TRAINER ASSESSMENTS
  // =====================================================

  const trainerAssessments = assessments.filter(
    (assessment) => assessment.trainerId === loggedInTrainerId,
  );

  // =====================================================
  // TRAINER SESSIONS
  // =====================================================

  const trainerSessions = sessions.filter(
    (session) => session.trainerId === loggedInTrainerId,
  );

  // =====================================================
  // GET SESSION
  // =====================================================

  const getSession = (sessionId) => {
    return sessions.find((session) => session.id === sessionId);
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredAssessments = trainerAssessments.filter((assessment) => {
    const session = getSession(assessment.sessionId);

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      assessment.title?.toLowerCase().includes(search) ||
      assessment.description?.toLowerCase().includes(search) ||
      session?.title?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      assessment.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesSession =
      sessionFilter === "All" || assessment.sessionId === Number(sessionFilter);

    return matchesSearch && matchesStatus && matchesSession;
  });

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setSessionFilter("All");
  };

  const hasFilters =
    searchTerm !== "" || statusFilter !== "All" || sessionFilter !== "All";

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="trainer-all-assessments-page">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="all-assessments-header">
        <div className="all-assessments-header-left">
          <button
            className="back-to-assessments-btn"
            onClick={() => navigate("/trainer/assessments")}
          >
            <FaArrowLeft />
            <span>Back to Assessments</span>
          </button>

          <div className="all-assessments-heading">
            <div className="all-assessments-title-row">
              <div className="all-assessments-page-icon">
                <FaClipboardList />
              </div>

              <div>
                <h1>All Assessments</h1>

                <p>
                  Search, filter, and view all assessments created for your
                  trainees.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="assessment-count-box">
          <strong>{filteredAssessments.length}</strong>
          <span>of {trainerAssessments.length}</span>
        </div>
      </div>

      {/* =================================================
          SEARCH / FILTER SECTION
      ================================================= */}

      <div className="assessment-search-card">
        <div className="assessment-search-wrapper">
          <div className="assessment-search-box">
            <FaSearch />

            <input
              type="text"
              placeholder="Search assessments or sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="assessment-filter-row">
          {/* STATUS */}

          <div className="assessment-filter-group">
            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* SESSION */}

          <div className="assessment-filter-group">
            <label>Session</label>

            <select
              value={sessionFilter}
              onChange={(e) => setSessionFilter(e.target.value)}
            >
              <option value="All">All Sessions</option>

              {trainerSessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.title}
                </option>
              ))}
            </select>
          </div>

          {/* CLEAR */}

          {hasFilters && (
            <button
              className="clear-assessment-filters-btn"
              onClick={clearFilters}
            >
              <FaTimes />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* =================================================
          RESULTS HEADER
      ================================================= */}

      <div className="assessment-results-header">
        <div>
          <h2>Assessments</h2>
          <p>
            {filteredAssessments.length} assessment
            {filteredAssessments.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {filteredAssessments.length === 0 ? (
        <div className="all-assessments-empty">
          <div className="empty-assessment-icon">
            <FaClipboardList />
          </div>

          <h2>No assessments found</h2>

          <p>
            {hasFilters
              ? "Try changing your search or filters."
              : "You have not created any assessments yet."}
          </p>

          {hasFilters && (
            <button className="clear-empty-filter-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        /* =================================================
           ASSESSMENT LIST
        ================================================= */

        <div className="all-assessments-list">
          {filteredAssessments.map((assessment) => {
            const session = getSession(assessment.sessionId);

            return (
              <div className="all-assessment-card" key={assessment.id}>
                {/* CARD HEADER */}

                <div className="all-assessment-card-header">
                  <div className="all-assessment-card-title">
                    <div className="all-assessment-icon">
                      <FaClipboardList />
                    </div>

                    <div>
                      <h3>{assessment.title}</h3>

                      <p>{session ? session.title : "Session unavailable"}</p>
                    </div>
                  </div>

                  <span
                    className={`all-assessment-status ${assessment.status?.toLowerCase()}`}
                  >
                    {assessment.status}
                  </span>
                </div>

                {/* DESCRIPTION */}

                <div className="all-assessment-description">
                  {assessment.description || "No description provided."}
                </div>

                {/* INFORMATION */}

                <div className="all-assessment-info-grid">
                  <div className="assessment-info-item">
                    <div className="assessment-info-icon">
                      <FaCalendarAlt />
                    </div>

                    <div>
                      <span>Due Date</span>
                      <strong>{assessment.dueDate}</strong>
                    </div>
                  </div>

                  <div className="assessment-info-item">
                    <div className="assessment-info-icon">
                      <FaAward />
                    </div>

                    <div>
                      <span>Total Marks</span>
                      <strong>{assessment.totalMarks}</strong>
                    </div>
                  </div>

                  <div className="assessment-info-item">
                    <div className="assessment-info-icon">
                      <FaUsers />
                    </div>

                    <div>
                      <span>Trainees</span>
                      <strong>{assessment.performance?.length || 0}</strong>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="all-assessment-actions">
                  <button
                    className="all-view-btn"
                    onClick={() => setSelectedAssessment(assessment)}
                  >
                    <FaEye />
                    View Details
                  </button>

                  {assessment.quizLink && (
                    <a
                      href={assessment.quizLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="all-open-quiz-btn"
                    >
                      <FaExternalLinkAlt />
                      Open Quiz
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedAssessment && (
        <div
          className="all-assessment-modal-overlay"
          onClick={() => setSelectedAssessment(null)}
        >
          <div
            className="all-assessment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div className="all-modal-header">
              <div>
                <div className="modal-title-icon">
                  <FaClipboardList />
                </div>

                <div>
                  <h2>{selectedAssessment.title}</h2>

                  <p>
                    {getSession(selectedAssessment.sessionId)?.title ||
                      "Session unavailable"}
                  </p>
                </div>
              </div>

              <button
                className="all-modal-close-btn"
                onClick={() => setSelectedAssessment(null)}
              >
                <FaTimes />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="all-modal-body">
              {/* DESCRIPTION */}

              <div className="modal-description">
                <span>Description</span>

                <p>
                  {selectedAssessment.description || "No description provided."}
                </p>
              </div>

              {/* DETAILS */}

              <div className="all-modal-details">
                <div>
                  <span>Due Date</span>
                  <strong>{selectedAssessment.dueDate}</strong>
                </div>

                <div>
                  <span>Total Marks</span>
                  <strong>{selectedAssessment.totalMarks}</strong>
                </div>

                <div>
                  <span>Status</span>

                  <strong
                    className={`modal-assessment-status ${selectedAssessment.status?.toLowerCase()}`}
                  >
                    {selectedAssessment.status}
                  </strong>
                </div>

                <div>
                  <span>Trainees</span>
                  <strong>{selectedAssessment.performance?.length || 0}</strong>
                </div>
              </div>

              {/* QUIZ */}

              {selectedAssessment.quizLink && (
                <a
                  href={selectedAssessment.quizLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="all-modal-quiz-btn"
                >
                  <FaExternalLinkAlt />
                  Open Quiz
                </a>
              )}

              {/* PERFORMANCE */}

              <div className="all-performance-section">
                <div className="all-performance-header">
                  <div>
                    <h3>Trainee Performance</h3>

                    <p>View the current results for this assessment.</p>
                  </div>

                  <span>Total: {selectedAssessment.totalMarks}</span>
                </div>

                <div className="all-performance-table-wrapper">
                  <table className="all-performance-table">
                    <thead>
                      <tr>
                        <th>Trainee</th>
                        <th>Score</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedAssessment.performance?.length > 0 ? (
                        selectedAssessment.performance.map((result) => {
                          const percentage =
                            result.score !== null &&
                            result.score !== undefined &&
                            selectedAssessment.totalMarks > 0
                              ? (
                                  (result.score /
                                    selectedAssessment.totalMarks) *
                                  100
                                ).toFixed(1)
                              : null;

                          return (
                            <tr key={result.traineeId}>
                              <td>Trainee {result.traineeId}</td>

                              <td>
                                {result.score === null ||
                                result.score === undefined
                                  ? "-"
                                  : `${result.score} / ${selectedAssessment.totalMarks}`}
                              </td>

                              <td>
                                <span className="all-percentage">
                                  {percentage !== null ? `${percentage}%` : "-"}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="3" className="no-performance-data">
                            No trainee results recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerAllAssessments;
