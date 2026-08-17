import { useState } from "react";
import {
  FaPlus,
  FaEye,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaClipboardList,
} from "react-icons/fa";

import { assessments as initialAssessments } from "../../Info/assessmentData";
import { sessions } from "../../Info/sessionData";
import { trainees } from "../../Info/traineeData";

import "./TrainerAssessments.css";

function TrainerAssessments() {
  // Change this according to the logged-in trainer
  const loggedInTrainerId = 1;

  const [assessments, setAssessments] = useState(initialAssessments);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  // Total marks editing
  const [editingMarksId, setEditingMarksId] = useState(null);
  const [editedTotalMarks, setEditedTotalMarks] = useState("");

  // Result editing
  const [editingResult, setEditingResult] = useState(null);
  const [editedScore, setEditedScore] = useState("");

  // Add assessment form
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    sessionId: "",
    description: "",
    quizLink: "",
    dueDate: "",
    totalMarks: "",
  });

  // --------------------------------------------------
  // TRAINER'S SESSIONS
  // --------------------------------------------------

  const trainerSessions = sessions.filter(
    (session) => session.trainerId === loggedInTrainerId,
  );

  // --------------------------------------------------
  // TRAINER'S ASSESSMENTS
  // --------------------------------------------------

  const trainerAssessments = assessments.filter(
    (assessment) => assessment.trainerId === loggedInTrainerId,
  );

  // --------------------------------------------------
  // ADD ASSESSMENT
  // --------------------------------------------------

  const handleNewAssessmentChange = (e) => {
    const { name, value } = e.target;

    setNewAssessment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAssessment = (e) => {
    e.preventDefault();

    if (
      !newAssessment.title ||
      !newAssessment.sessionId ||
      !newAssessment.quizLink ||
      !newAssessment.dueDate ||
      !newAssessment.totalMarks
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const selectedSession = sessions.find(
      (session) => session.id === Number(newAssessment.sessionId),
    );

    if (!selectedSession) {
      alert("Please select a valid session.");
      return;
    }

    const newId =
      assessments.length > 0
        ? Math.max(...assessments.map((assessment) => assessment.id)) + 1
        : 1;

    const newAssessmentObject = {
      id: newId,
      title: newAssessment.title,
      sessionId: Number(newAssessment.sessionId),
      trainerId: loggedInTrainerId,
      description: newAssessment.description,
      quizLink: newAssessment.quizLink,
      dueDate: newAssessment.dueDate,
      totalMarks: Number(newAssessment.totalMarks),
      status: "Open",

      performance: (selectedSession.traineeIds || []).map((traineeId) => ({
        traineeId,
        score: null,
        totalMarks: Number(newAssessment.totalMarks),
      })),
    };

    setAssessments((prev) => [...prev, newAssessmentObject]);

    setNewAssessment({
      title: "",
      sessionId: "",
      description: "",
      quizLink: "",
      dueDate: "",
      totalMarks: "",
    });

    setShowAddForm(false);
  };

  // --------------------------------------------------
  // DELETE ASSESSMENT
  // --------------------------------------------------

  const handleDeleteAssessment = (assessmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assessment?",
    );

    if (!confirmDelete) return;

    setAssessments((prev) =>
      prev.filter((assessment) => assessment.id !== assessmentId),
    );

    if (selectedAssessment?.id === assessmentId) {
      setSelectedAssessment(null);
    }
  };

  // --------------------------------------------------
  // EDIT TOTAL MARKS
  // --------------------------------------------------

  const startEditingMarks = (assessment) => {
    setEditingMarksId(assessment.id);
    setEditedTotalMarks(assessment.totalMarks);
  };

  const handleSaveTotalMarks = (assessmentId) => {
    const newTotalMarks = Number(editedTotalMarks);

    if (!newTotalMarks || newTotalMarks <= 0) {
      alert("Total marks must be greater than 0.");
      return;
    }

    setAssessments((prev) =>
      prev.map((assessment) => {
        if (assessment.id !== assessmentId) {
          return assessment;
        }

        return {
          ...assessment,

          totalMarks: newTotalMarks,

          performance: assessment.performance.map((result) => ({
            ...result,
            totalMarks: newTotalMarks,
          })),
        };
      }),
    );

    // Update currently opened assessment too
    setSelectedAssessment((prev) => {
      if (!prev || prev.id !== assessmentId) {
        return prev;
      }

      return {
        ...prev,
        totalMarks: newTotalMarks,
        performance: prev.performance.map((result) => ({
          ...result,
          totalMarks: newTotalMarks,
        })),
      };
    });

    setEditingMarksId(null);
    setEditedTotalMarks("");
  };

  const cancelEditingMarks = () => {
    setEditingMarksId(null);
    setEditedTotalMarks("");
  };

  // --------------------------------------------------
  // EDIT TRAINEE RESULT
  // --------------------------------------------------

  const startEditingResult = (assessmentId, traineeId, currentScore) => {
    setEditingResult({
      assessmentId,
      traineeId,
    });

    setEditedScore(currentScore ?? "");
  };

  const handleSaveResult = (assessmentId, traineeId) => {
    const assessment = assessments.find((item) => item.id === assessmentId);

    if (!assessment) return;

    const score = Number(editedScore);

    if (editedScore === "" || Number.isNaN(score)) {
      alert("Please enter a valid score.");
      return;
    }

    if (score < 0 || score > assessment.totalMarks) {
      alert(`Score must be between 0 and ${assessment.totalMarks}.`);
      return;
    }

    setAssessments((prev) =>
      prev.map((item) => {
        if (item.id !== assessmentId) {
          return item;
        }

        return {
          ...item,

          performance: item.performance.map((result) =>
            result.traineeId === traineeId
              ? {
                  ...result,
                  score,
                }
              : result,
          ),
        };
      }),
    );

    setSelectedAssessment((prev) => {
      if (!prev || prev.id !== assessmentId) {
        return prev;
      }

      return {
        ...prev,

        performance: prev.performance.map((result) =>
          result.traineeId === traineeId
            ? {
                ...result,
                score,
              }
            : result,
        ),
      };
    });

    setEditingResult(null);
    setEditedScore("");
  };

  const cancelEditingResult = () => {
    setEditingResult(null);
    setEditedScore("");
  };

  // --------------------------------------------------
  // GET SESSION
  // --------------------------------------------------

  const getSession = (sessionId) => {
    return sessions.find((session) => session.id === sessionId);
  };

  // --------------------------------------------------
  // GET TRAINEE
  // --------------------------------------------------

  const getTrainee = (traineeId) => {
    return trainees.find((trainee) => trainee.id === traineeId);
  };

  // --------------------------------------------------
  // PERCENTAGE
  // --------------------------------------------------

  const calculatePercentage = (score, totalMarks) => {
    if (score === null || score === undefined) {
      return "-";
    }

    return `${((score / totalMarks) * 100).toFixed(1)}%`;
  };

  return (
    <div className="trainer-assessments-page">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="assessment-page-header">
        <div>
          <h1>Assessments</h1>

          <p>
            Create assessments, share quizzes, and track trainee performance.
          </p>
        </div>

        <button
          className="add-assessment-btn"
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          <FaPlus />
          Add Assessment
        </button>
      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="assessment-layout">
        {/* ================================================= */}
        {/* LEFT SIDE - ADD ASSESSMENT */}
        {/* ================================================= */}

        <div className="assessment-left-column">
          {showAddForm && (
            <div className="add-assessment-card">
              <div className="card-header">
                <div>
                  <h2>Add Assessment</h2>
                  <p>Create a new assessment for your trainees.</p>
                </div>

                <button
                  className="close-form-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleAddAssessment}>
                <div className="form-group">
                  <label>
                    Assessment Title <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. React Fundamentals Quiz"
                    value={newAssessment.title}
                    onChange={handleNewAssessmentChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Session <span>*</span>
                  </label>

                  <select
                    name="sessionId"
                    value={newAssessment.sessionId}
                    onChange={handleNewAssessmentChange}
                  >
                    <option value="">Select Session</option>

                    {trainerSessions.map((session) => (
                      <option key={session.id} value={session.id}>
                        {session.title} - {session.date}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    placeholder="Describe what the assessment covers..."
                    value={newAssessment.description}
                    onChange={handleNewAssessmentChange}
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Quiz Link <span>*</span>
                  </label>

                  <input
                    type="url"
                    name="quizLink"
                    placeholder="https://example.com/quiz"
                    value={newAssessment.quizLink}
                    onChange={handleNewAssessmentChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Due Date <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="dueDate"
                      value={newAssessment.dueDate}
                      onChange={handleNewAssessmentChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Total Marks <span>*</span>
                    </label>

                    <input
                      type="number"
                      name="totalMarks"
                      min="1"
                      placeholder="20"
                      value={newAssessment.totalMarks}
                      onChange={handleNewAssessmentChange}
                    />
                  </div>
                </div>

                <button type="submit" className="save-assessment-btn">
                  <FaSave />
                  Save Assessment
                </button>
              </form>
            </div>
          )}

          {/* Empty left state */}
          {!showAddForm && (
            <div className="assessment-info-card">
              <FaClipboardList />

              <h2>Create an Assessment</h2>

              <p>
                Add a quiz for your trainees and manually record their results.
              </p>

              <button
                className="secondary-add-btn"
                onClick={() => setShowAddForm(true)}
              >
                <FaPlus />
                Add Assessment
              </button>
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE - ASSESSMENT LIST */}
        {/* ================================================= */}

        <div className="assessment-right-column">
          <div className="section-title">
            <h2>Your Assessments</h2>

            <span>
              {trainerAssessments.length} Assessment
              {trainerAssessments.length !== 1 ? "s" : ""}
            </span>
          </div>

          {trainerAssessments.length === 0 ? (
            <div className="empty-assessments">
              <FaClipboardList />

              <h3>No assessments yet</h3>

              <p>Create your first assessment using the button on the left.</p>
            </div>
          ) : (
            <div className="assessment-list">
              {trainerAssessments.map((assessment) => {
                const session = getSession(assessment.sessionId);

                return (
                  <div className="assessment-card" key={assessment.id}>
                    <div className="assessment-card-top">
                      <div className="assessment-icon">
                        <FaClipboardList />
                      </div>

                      <div className="assessment-title-area">
                        <h3>{assessment.title}</h3>

                        <p>{session ? session.title : "Session unavailable"}</p>
                      </div>

                      <span
                        className={`assessment-status ${assessment.status.toLowerCase()}`}
                      >
                        {assessment.status}
                      </span>
                    </div>

                    <div className="assessment-description">
                      {assessment.description || "No description provided."}
                    </div>

                    <div className="assessment-meta">
                      <div>
                        <span>Due Date</span>
                        <strong>{assessment.dueDate}</strong>
                      </div>

                      <div>
                        <span>Total Marks</span>
                        <strong>{assessment.totalMarks}</strong>
                      </div>

                      <div>
                        <span>Trainees</span>
                        <strong>{assessment.performance.length}</strong>
                      </div>
                    </div>

                    {/* TOTAL MARKS EDIT */}

                    {editingMarksId === assessment.id ? (
                      <div className="marks-edit-box">
                        <label>Total Marks</label>

                        <input
                          type="number"
                          min="1"
                          value={editedTotalMarks}
                          onChange={(e) => setEditedTotalMarks(e.target.value)}
                        />

                        <div className="marks-edit-actions">
                          <button
                            className="save-marks-btn"
                            onClick={() => handleSaveTotalMarks(assessment.id)}
                          >
                            <FaSave />
                            Save Changes
                          </button>

                          <button
                            className="cancel-marks-btn"
                            onClick={cancelEditingMarks}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="edit-total-marks-btn"
                        onClick={() => startEditingMarks(assessment)}
                      >
                        <FaEdit />
                        Edit Total Marks
                      </button>
                    )}

                    <div className="assessment-actions">
                      <button
                        className="view-assessment-btn"
                        onClick={() => setSelectedAssessment(assessment)}
                      >
                        <FaEye />
                        View
                      </button>

                      <a
                        className="open-quiz-btn"
                        href={assessment.quizLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                        Open Quiz
                      </a>

                      <button
                        className="delete-assessment-btn"
                        onClick={() => handleDeleteAssessment(assessment.id)}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* VIEW ASSESSMENT MODAL */}
      {/* ================================================= */}

      {selectedAssessment && (
        <div
          className="assessment-modal-overlay"
          onClick={() => setSelectedAssessment(null)}
        >
          <div
            className="assessment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>{selectedAssessment.title}</h2>

                <p>
                  {getSession(selectedAssessment.sessionId)?.title || "Session"}
                </p>
              </div>

              <button
                className="modal-close-btn"
                onClick={() => setSelectedAssessment(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              {/* DETAILS */}

              <div className="assessment-details">
                <div className="detail-item">
                  <span>Description</span>

                  <strong>
                    {selectedAssessment.description ||
                      "No description provided."}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Due Date</span>

                  <strong>{selectedAssessment.dueDate}</strong>
                </div>

                <div className="detail-item">
                  <span>Total Marks</span>

                  <strong>{selectedAssessment.totalMarks}</strong>
                </div>

                <div className="detail-item">
                  <span>Status</span>

                  <strong
                    className={`modal-status ${selectedAssessment.status.toLowerCase()}`}
                  >
                    {selectedAssessment.status}
                  </strong>
                </div>
              </div>

              {/* QUIZ LINK */}

              <a
                href={selectedAssessment.quizLink}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-quiz-link"
              >
                <FaExternalLinkAlt />
                Open Quiz
              </a>

              {/* PERFORMANCE */}

              <div className="performance-section">
                <div className="performance-header">
                  <div>
                    <h3>Trainee Performance</h3>

                    <p>
                      Manually record results after reviewing quiz submissions.
                    </p>
                  </div>

                  <span>Total: {selectedAssessment.totalMarks}</span>
                </div>

                <div className="performance-table-container">
                  <table className="performance-table">
                    <thead>
                      <tr>
                        <th>Trainee</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedAssessment.performance.map((result) => {
                        const trainee = getTrainee(result.traineeId);

                        const isEditing =
                          editingResult?.assessmentId ===
                            selectedAssessment.id &&
                          editingResult?.traineeId === result.traineeId;

                        return (
                          <tr key={result.traineeId}>
                            <td>
                              <strong>
                                {trainee
                                  ? trainee.name
                                  : `Trainee ${result.traineeId}`}
                              </strong>
                            </td>

                            <td>
                              {isEditing ? (
                                <input
                                  className="score-input"
                                  type="number"
                                  min="0"
                                  max={selectedAssessment.totalMarks}
                                  value={editedScore}
                                  onChange={(e) =>
                                    setEditedScore(e.target.value)
                                  }
                                />
                              ) : (
                                <span>
                                  {result.score === null
                                    ? "-"
                                    : `${result.score} / ${selectedAssessment.totalMarks}`}
                                </span>
                              )}
                            </td>

                            <td>
                              <span className="percentage-value">
                                {calculatePercentage(
                                  result.score,
                                  selectedAssessment.totalMarks,
                                )}
                              </span>
                            </td>

                            <td>
                              {isEditing ? (
                                <div className="result-edit-actions">
                                  <button
                                    className="save-result-btn"
                                    onClick={() =>
                                      handleSaveResult(
                                        selectedAssessment.id,
                                        result.traineeId,
                                      )
                                    }
                                  >
                                    <FaSave />
                                    Save
                                  </button>

                                  <button
                                    className="cancel-result-btn"
                                    onClick={cancelEditingResult}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="edit-result-btn"
                                  onClick={() =>
                                    startEditingResult(
                                      selectedAssessment.id,
                                      result.traineeId,
                                      result.score,
                                    )
                                  }
                                >
                                  <FaEdit />
                                  {result.score === null
                                    ? "Add Result"
                                    : "Edit"}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
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

export default TrainerAssessments;
