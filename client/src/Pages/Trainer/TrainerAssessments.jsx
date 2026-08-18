import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaEye,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaClipboardList,
  FaBookOpen,
  FaFilePdf,
  FaVideo,
  FaLink,
  FaFileAlt,
} from "react-icons/fa";

import { assessments as initialAssessments } from "../../Info/assessmentData";
import { sessions } from "../../Info/sessionData";
import { trainees } from "../../Info/traineeData";
import { resources as initialResources } from "../../Info/resourceData";

import "./TrainerAssessments.css";

function TrainerAssessments() {
  // ==================================================
  // LOGGED-IN TRAINER
  // ==================================================

  const loggedInTrainerId = 1;
  const navigate = useNavigate();

  // ==================================================
  // ASSESSMENTS
  // ==================================================

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

  // ==================================================
  // RESOURCES
  // ==================================================

  const [resources, setResources] = useState(initialResources);

  const [showResourceForm, setShowResourceForm] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState(null);

  const [newResource, setNewResource] = useState({
    title: "",
    sessionId: "",
    description: "",
    type: "Link",
    link: "",
    file: null,
  });

  // ==================================================
  // TRAINER SESSIONS
  // ==================================================

  const trainerSessions = sessions.filter(
    (session) => session.trainerId === loggedInTrainerId,
  );

  // ==================================================
  // TRAINER ASSESSMENTS
  // ==================================================

  const trainerAssessments = assessments.filter(
    (assessment) => assessment.trainerId === loggedInTrainerId,
  );

  // Only show latest 3 on the main page
  const recentAssessments = trainerAssessments.slice(0, 3);

  // ==================================================
  // TRAINER RESOURCES
  // ==================================================

  const trainerResources = resources.filter(
    (resource) => resource.trainerId === loggedInTrainerId,
  );

  // ==================================================
  // ADD ASSESSMENT
  // ==================================================

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

  // ==================================================
  // DELETE ASSESSMENT
  // ==================================================

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

  // ==================================================
  // EDIT TOTAL MARKS
  // ==================================================

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

  // ==================================================
  // EDIT TRAINEE RESULT
  // ==================================================

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

  // ==================================================
  // GET SESSION
  // ==================================================

  const getSession = (sessionId) => {
    return sessions.find((session) => session.id === sessionId);
  };

  // ==================================================
  // GET TRAINEE
  // ==================================================

  const getTrainee = (traineeId) => {
    return trainees.find((trainee) => trainee.id === traineeId);
  };

  // ==================================================
  // PERCENTAGE
  // ==================================================

  const calculatePercentage = (score, totalMarks) => {
    if (score === null || score === undefined) {
      return "-";
    }

    return `${((score / totalMarks) * 100).toFixed(1)}%`;
  };

  // ==================================================
  // RESOURCE HANDLING
  // ==================================================

  const handleResourceChange = (e) => {
    const { name, value } = e.target;

    setNewResource((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "type" && {
        file: null,
      }),
    }));
  };

  // ==================================================
  // RESOURCE FILE UPLOAD
  // ==================================================

  const handleResourceFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    let isValidFile = false;

    if (newResource.type === "PDF") {
      isValidFile = file.type === "application/pdf";
    }

    if (newResource.type === "Word") {
      isValidFile =
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    if (!isValidFile) {
      alert(
        newResource.type === "PDF"
          ? "Please select a PDF file."
          : "Please select a Word document (.doc or .docx).",
      );

      e.target.value = "";
      return;
    }

    setNewResource((prev) => ({
      ...prev,
      file,
    }));
  };

  // ==================================================
  // SAVE RESOURCE
  // ==================================================

  const handleSaveResource = (e) => {
    e.preventDefault();

    if (!newResource.title || !newResource.sessionId) {
      alert("Please fill all required fields.");
      return;
    }

    if (
      (newResource.type === "PDF" || newResource.type === "Word") &&
      !newResource.file &&
      editingResourceId === null
    ) {
      alert(
        newResource.type === "PDF"
          ? "Please upload a PDF file."
          : "Please upload a Word document.",
      );
      return;
    }

    if (
      (newResource.type === "Link" || newResource.type === "Video") &&
      !newResource.link
    ) {
      alert("Please enter a resource link.");
      return;
    }

    let resourceLink = newResource.link || "";
    let fileName = newResource.file?.name || "";

    if (
      (newResource.type === "PDF" || newResource.type === "Word") &&
      newResource.file
    ) {
      resourceLink = URL.createObjectURL(newResource.file);
    }

    // EDIT
    if (editingResourceId !== null) {
      setResources((prev) =>
        prev.map((resource) =>
          resource.id === editingResourceId
            ? {
                ...resource,
                title: newResource.title,
                sessionId: Number(newResource.sessionId),
                description: newResource.description,
                type: newResource.type,
                link: newResource.file ? resourceLink : resource.link,
                fileName: fileName || resource.fileName || "",
              }
            : resource,
        ),
      );

      setEditingResourceId(null);
    }

    // ADD
    else {
      const newId =
        resources.length > 0
          ? Math.max(...resources.map((resource) => resource.id)) + 1
          : 1;

      const newResourceObject = {
        id: newId,
        title: newResource.title,
        sessionId: Number(newResource.sessionId),
        trainerId: loggedInTrainerId,
        description: newResource.description,
        type: newResource.type,
        link: resourceLink,
        fileName,
      };

      setResources((prev) => [...prev, newResourceObject]);
    }

    setNewResource({
      title: "",
      sessionId: "",
      description: "",
      type: "Link",
      link: "",
      file: null,
    });

    setShowResourceForm(false);
  };

  // ==================================================
  // EDIT RESOURCE
  // ==================================================

  const handleEditResource = (resource) => {
    setNewResource({
      title: resource.title,
      sessionId: String(resource.sessionId),
      description: resource.description || "",
      type: resource.type || "Link",
      link: resource.link || "",
      file: null,
    });

    setEditingResourceId(resource.id);
    setShowResourceForm(true);
  };

  // ==================================================
  // DELETE RESOURCE
  // ==================================================

  const handleDeleteResource = (resourceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?",
    );

    if (!confirmDelete) return;

    setResources((prev) =>
      prev.filter((resource) => resource.id !== resourceId),
    );
  };

  // ==================================================
  // CANCEL RESOURCE FORM
  // ==================================================

  const cancelResourceForm = () => {
    setShowResourceForm(false);
    setEditingResourceId(null);

    setNewResource({
      title: "",
      sessionId: "",
      description: "",
      type: "Link",
      link: "",
      file: null,
    });
  };

  // ==================================================
  // RESOURCE ICON
  // ==================================================

  const getResourceIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FaFilePdf />;

      case "Word":
        return <FaFileAlt />;

      case "Video":
        return <FaVideo />;

      case "Link":
      default:
        return <FaLink />;
    }
  };

  // ==================================================
  // RENDER
  // ==================================================

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
      </div>

      {/* ================================================= */}
      {/* MAIN LAYOUT */}
      {/* ================================================= */}

      <div className="assessment-layout">
        {/* ================================================= */}
        {/* LEFT COLUMN */}
        {/* ================================================= */}

        <div className="assessment-left-column">
          {/* ================================================= */}
          {/* ADD ASSESSMENT */}
          {/* ================================================= */}

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

          {/* ================================================= */}
          {/* EMPTY ADD ASSESSMENT CARD */}
          {/* ================================================= */}

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

          {/* ================================================= */}
          {/* RESOURCES */}
          {/* ================================================= */}

          <div className="resources-card">
            <div className="resources-header">
              <div className="resources-heading">
                <div className="resources-main-icon">
                  <FaBookOpen />
                </div>

                <div>
                  <h2>Resources</h2>

                  <p>Add learning materials for your sessions.</p>
                </div>
              </div>

              <button
                className="add-resource-icon-btn"
                onClick={() => {
                  if (showResourceForm) {
                    cancelResourceForm();
                  } else {
                    setShowResourceForm(true);
                  }
                }}
                title="Add Resource"
              >
                {showResourceForm ? <FaTimes /> : <FaPlus />}
              </button>
            </div>

            {/* RESOURCE FORM */}

            {showResourceForm && (
              <form className="resource-form" onSubmit={handleSaveResource}>
                <div className="resource-form-title">
                  <h3>
                    {editingResourceId !== null
                      ? "Edit Resource"
                      : "Add Resource"}
                  </h3>
                </div>

                <div className="form-group">
                  <label>
                    Resource Title <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. React Hooks Notes"
                    value={newResource.title}
                    onChange={handleResourceChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Session <span>*</span>
                  </label>

                  <select
                    name="sessionId"
                    value={newResource.sessionId}
                    onChange={handleResourceChange}
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
                  <label>Resource Type</label>

                  <select
                    name="type"
                    value={newResource.type}
                    onChange={handleResourceChange}
                  >
                    <option value="Link">Link</option>

                    <option value="PDF">PDF</option>

                    <option value="Word">Word Document</option>

                    <option value="Video">Video</option>
                  </select>
                </div>

                {newResource.type === "PDF" || newResource.type === "Word" ? (
                  <div className="form-group">
                    <label>
                      Upload{" "}
                      {newResource.type === "PDF" ? "PDF" : "Word Document"}
                      <span>*</span>
                    </label>

                    <input
                      type="file"
                      accept={
                        newResource.type === "PDF"
                          ? ".pdf,application/pdf"
                          : ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      }
                      onChange={handleResourceFileChange}
                    />

                    {newResource.file && (
                      <p className="selected-file-name">
                        Selected: {newResource.file.name}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="form-group">
                    <label>
                      Resource Link <span>*</span>
                    </label>

                    <input
                      type="url"
                      name="link"
                      placeholder="https://example.com/resource"
                      value={newResource.link}
                      onChange={handleResourceChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    placeholder="Briefly describe this resource..."
                    value={newResource.description}
                    onChange={handleResourceChange}
                    rows="3"
                  />
                </div>

                <div className="resource-form-actions">
                  <button
                    type="button"
                    className="cancel-resource-btn"
                    onClick={cancelResourceForm}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-resource-btn">
                    <FaSave />

                    {editingResourceId !== null
                      ? "Save Changes"
                      : "Add Resource"}
                  </button>
                </div>
              </form>
            )}

            {/* RESOURCE LIST */}

            {!showResourceForm && trainerResources.length > 0 && (
              <>
                <div className="resource-list">
                  {trainerResources.slice(0, 3).map((resource) => {
                    const session = getSession(resource.sessionId);

                    return (
                      <div className="resource-item" key={resource.id}>
                        <div className="resource-item-icon">
                          {getResourceIcon(resource.type)}
                        </div>

                        <div className="resource-item-content">
                          <h3>{resource.title}</h3>

                          <p className="resource-session">
                            {session ? session.title : "Session unavailable"}
                          </p>

                          {resource.description && (
                            <p className="resource-description">
                              {resource.description}
                            </p>
                          )}

                          {resource.fileName && (
                            <p className="resource-file-name">
                              📄 {resource.fileName}
                            </p>
                          )}

                          <span className="resource-type">{resource.type}</span>
                        </div>

                        <div className="resource-item-actions">
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-view-btn"
                            title="Open Resource"
                          >
                            <FaExternalLinkAlt />
                          </a>

                          <button
                            className="resource-edit-btn"
                            onClick={() => handleEditResource(resource)}
                            title="Edit Resource"
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="resource-delete-btn"
                            onClick={() => handleDeleteResource(resource.id)}
                            title="Delete Resource"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* VIEW MORE RESOURCES */}

                {trainerResources.length > 3 && (
                  <button
                    className="view-more-resources-btn"
                    onClick={() => navigate("/trainer/resources")}
                  >
                    View More
                    <FaExternalLinkAlt />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT COLUMN - ASSESSMENTS */}
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
            <>
              {/* ONLY SHOW 3 ON MAIN PAGE */}

              <div className="assessment-list">
                {recentAssessments.map((assessment) => {
                  const session = getSession(assessment.sessionId);

                  return (
                    <div className="assessment-card" key={assessment.id}>
                      <div className="assessment-card-top">
                        <div className="assessment-icon">
                          <FaClipboardList />
                        </div>

                        <div className="assessment-title-area">
                          <h3>{assessment.title}</h3>

                          <p>
                            {session ? session.title : "Session unavailable"}
                          </p>
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

                      {/* TOTAL MARKS */}

                      {editingMarksId === assessment.id ? (
                        <div className="marks-edit-box">
                          <label>Total Marks</label>

                          <input
                            type="number"
                            min="1"
                            value={editedTotalMarks}
                            onChange={(e) =>
                              setEditedTotalMarks(e.target.value)
                            }
                          />

                          <div className="marks-edit-actions">
                            <button
                              className="save-marks-btn"
                              onClick={() =>
                                handleSaveTotalMarks(assessment.id)
                              }
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

                      {/* ACTIONS */}

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

              {/* ================================================= */}
              {/* VIEW MORE ASSESSMENTS */}
              {/* ================================================= */}

              {trainerAssessments.length > 3 && (
                <button
                  className="view-more-assessments-btn"
                  onClick={() => navigate("/trainer/assessments/all")}
                >
                  View More Assessments
                  <FaExternalLinkAlt />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* ASSESSMENT MODAL */}
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

              <a
                href={selectedAssessment.quizLink}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-quiz-link"
              >
                <FaExternalLinkAlt />
                Open Quiz
              </a>

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
