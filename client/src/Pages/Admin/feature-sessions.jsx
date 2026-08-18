
import { useState } from "react";

import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClock,
  FaPlayCircle,
} from "react-icons/fa";

import { sessions as sessionData } from "../../Info/sessionData";

import "./feature-sessions.css";


function FeatureSession() {

  /* =========================================
     SESSION DATA
     ========================================= */

  const [sessions, setSessions] = useState(sessionData);


  /* =========================================
     SEARCH + FILTER
     ========================================= */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");


  /* =========================================
     MODALS
     ========================================= */

  const [showModal, setShowModal] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedSession, setSelectedSession] = useState(null);

  const [editMode, setEditMode] = useState(false);


  /* =========================================
     FORM
     ========================================= */

  const emptyForm = {
    title: "",
    trainerId: "",
    traineeIds: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    status: "Upcoming",
  };

  const [formData, setFormData] = useState(emptyForm);


  /* =========================================
     FORMAT DATE
     ========================================= */

  const formatDate = (date) => {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}-${parts[1]}-${parts[0].slice(-2)}`;
  };


  /* =========================================
     CONVERT EXISTING DATE TO CALENDAR FORMAT
     ========================================= */

  const convertToCalendarDate = (date) => {

    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return "";

    let year = parts[2];

    if (year.length === 2) {
      year = `20${year}`;
    }

    return `${year}-${parts[1]}-${parts[0]}`;
  };


  /* =========================================
     FILTER SESSIONS
     ========================================= */

  const filteredSessions = sessions.filter((session) => {

    const searchValue = search.toLowerCase();

    const matchesSearch =
      session.title.toLowerCase().includes(searchValue) ||
      String(session.trainerId).includes(searchValue) ||
      String(session.id).includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  /* =========================================
     OPEN CREATE MODAL
     ========================================= */

  const handleAddSession = () => {

    setFormData(emptyForm);

    setEditMode(false);

    setSelectedSession(null);

    setShowModal(true);
  };


  /* =========================================
     HANDLE INPUT
     ========================================= */

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =========================================
     SAVE SESSION
     ========================================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.trainerId ||
      !formData.traineeIds.trim() ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.description.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }


    const traineeIds = formData.traineeIds
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !isNaN(id));


    if (traineeIds.length === 0) {
      alert("Please enter valid trainee IDs.");
      return;
    }


    /* =====================================
       EDIT EXISTING SESSION
       ===================================== */

    if (editMode && selectedSession) {

      const updatedSession = {
        ...selectedSession,

        title: formData.title.trim(),

        trainerId: Number(formData.trainerId),

        traineeIds,

        date: formatDate(formData.date),

        startTime: formData.startTime,

        endTime: formData.endTime,

        description: formData.description.trim(),

        status: formData.status,
      };


      setSessions((prev) =>
        prev.map((session) =>
          session.id === selectedSession.id
            ? updatedSession
            : session
        )
      );


      alert("Session updated successfully!");

    }


    /* =====================================
       CREATE NEW SESSION
       ===================================== */

    else {

      const newId =
        sessions.length > 0
          ? Math.max(...sessions.map((session) => session.id)) + 1
          : 1;


      const newSession = {

        id: newId,

        title: formData.title.trim(),

        trainerId: Number(formData.trainerId),

        traineeIds,

        date: formatDate(formData.date),

        startTime: formData.startTime,

        endTime: formData.endTime,

        description: formData.description.trim(),

        status: formData.status,
      };


      setSessions((prev) => [
        ...prev,
        newSession,
      ]);


      alert("Session created successfully!");
    }


    setShowModal(false);

    setEditMode(false);

    setSelectedSession(null);

    setFormData(emptyForm);
  };


  /* =========================================
     VIEW SESSION
     ========================================= */

  const handleView = (session) => {

    setSelectedSession(session);

    setShowView(true);
  };


  /* =========================================
     EDIT SESSION
     ========================================= */

  const handleEdit = (session) => {

    setSelectedSession(session);

    setEditMode(true);

    setFormData({
      title: session.title,

      trainerId: String(session.trainerId),

      traineeIds: session.traineeIds.join(","),

      date: convertToCalendarDate(session.date),

      startTime: session.startTime,

      endTime: session.endTime,

      description: session.description,

      status: session.status,
    });

    setShowModal(true);
  };


  /* =========================================
     DELETE SESSION
     ========================================= */

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );

    if (!confirmDelete) return;


    setSessions((prev) =>
      prev.filter((session) => session.id !== id)
    );


    if (
      selectedSession &&
      selectedSession.id === id
    ) {
      setSelectedSession(null);
      setShowView(false);
    }


    alert("Session deleted successfully!");
  };


  /* =========================================
     CLOSE MODAL
     ========================================= */

  const closeModal = () => {

    setShowModal(false);

    setEditMode(false);

    setSelectedSession(null);

    setFormData(emptyForm);
  };


  /* =========================================
     STATUS CLASS
     ========================================= */

  const getStatusClass = (status) => {

    if (status === "Completed") {
      return "completed";
    }

    if (status === "Upcoming") {
      return "upcoming";
    }

    return "";
  };


  /* =========================================
     RETURN JSX
     ========================================= */

  return (

    <div className="sessions-page">


      {/* =====================================
          PAGE HEADER
          ===================================== */}

      <div className="sessions-page-header">

        <div>

          <h1>Session Management</h1>

          <p>
            Create sessions and assign trainers and trainees
          </p>

        </div>


        <button
          className="add-session-btn"
          onClick={handleAddSession}
        >

          <FaPlus />

          Create Session

        </button>

      </div>


      {/* =====================================
          STAT CARDS
          ===================================== */}

      <div className="session-stats">


        <div className="session-stat-card">

          <div className="session-stat-icon">
            <FaCalendarAlt />
          </div>

          <div>

            <span>Total Sessions</span>

            <strong>
              {sessions.length}
            </strong>

          </div>

        </div>


        <div className="session-stat-card">

          <div className="session-stat-icon">
            <FaClock />
          </div>

          <div>

            <span>Upcoming</span>

            <strong>
              {
                sessions.filter(
                  (session) =>
                    session.status === "Upcoming"
                ).length
              }
            </strong>

          </div>

        </div>


        <div className="session-stat-card">

          <div className="session-stat-icon">
            <FaPlayCircle />
          </div>

          <div>

            <span>Completed</span>

            <strong>
              {
                sessions.filter(
                  (session) =>
                    session.status === "Completed"
                ).length
              }
            </strong>

          </div>

        </div>


        <div className="session-stat-card">

          <div className="session-stat-icon">
            <FaUserGraduate />
          </div>

          <div>

            <span>Assigned Trainees</span>

            <strong>
              {
                new Set(
                  sessions.flatMap(
                    (session) =>
                      session.traineeIds
                  )
                ).size
              }
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================
          TOOLBAR
          ===================================== */}

      <div className="sessions-toolbar">


        <div className="session-search">

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


        <select
          className="session-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="All">
            All Status
          </option>

          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

      </div>


      {/* =====================================
          SESSION TABLE
          ===================================== */}

      <div className="sessions-section">


        <div className="sessions-section-header">

          <div>

            <h2>Sessions</h2>

            <p>
              Manage scheduled training sessions
            </p>

          </div>


          <span className="session-count">

            {filteredSessions.length} sessions

          </span>

        </div>


        <div className="sessions-table-container">

          <table className="sessions-table">

            <thead>

              <tr>

                <th>Session</th>

                <th>Trainer</th>

                <th>Trainees</th>

                <th>Date</th>

                <th>Time</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>


              {filteredSessions.length > 0 ? (

                filteredSessions.map((session) => (

                  <tr key={session.id}>


                    {/* SESSION */}

                    <td>

                      <div className="session-title-cell">

                        <div className="session-mini-icon">
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


                    {/* TRAINER */}

                    <td>

                      <span className="trainer-assigned">

                        <FaChalkboardTeacher />

                        Trainer #{session.trainerId}

                      </span>

                    </td>


                    {/* TRAINEES */}

                    <td>

                      <span className="trainee-assigned">

                        <FaUserGraduate />

                        {session.traineeIds.length} Trainees

                      </span>

                    </td>


                    {/* DATE */}

                    <td>
                      {session.date}
                    </td>


                    {/* TIME */}

                    <td>

                      <span className="session-time">

                        {session.startTime}
                        {" - "}
                        {session.endTime}

                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`session-status ${getStatusClass(
                          session.status
                        )}`}
                      >

                        {session.status}

                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td>

                      <div className="session-actions">


                        <button
                          className="session-view-btn"
                          title="View Session"
                          onClick={() =>
                            handleView(session)
                          }
                        >

                          <FaEye />

                        </button>


                        <button
                          className="session-edit-btn"
                          title="Edit Session"
                          onClick={() =>
                            handleEdit(session)
                          }
                        >

                          <FaEdit />

                        </button>


                        <button
                          className="session-delete-btn"
                          title="Delete Session"
                          onClick={() =>
                            handleDelete(session.id)
                          }
                        >

                          <FaTrash />

                        </button>


                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="no-sessions"
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
          CREATE / EDIT MODAL
          ===================================== */}

      {showModal && (

        <div
          className="session-modal-overlay"
          onClick={closeModal}
        >


          <div
            className="session-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* MODAL HEADER */}

            <div className="session-modal-header">

              <div>

                <h2>

                  {editMode
                    ? "Edit Session"
                    : "Create Session"}

                </h2>

                <p>

                  {editMode
                    ? "Update session details"
                    : "Assign trainer and trainees"}

                </p>

              </div>


              <button
                className="session-close-btn"
                onClick={closeModal}
              >

                <FaTimes />

              </button>

            </div>


            {/* FORM */}

            <form
              className="session-form"
              onSubmit={handleSubmit}
            >


              <div className="session-form-grid">


                {/* TITLE */}

                <div className="session-field full-width">

                  <label>
                    Session Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter session title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                {/* TRAINER */}

                <div className="session-field">

                  <label>
                    Trainer ID *
                  </label>

                  <input
                    type="number"
                    name="trainerId"
                    placeholder="Enter trainer ID"
                    value={formData.trainerId}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />

                </div>


                {/* TRAINEES */}

                <div className="session-field">

                  <label>
                    Trainee IDs *
                  </label>

                  <input
                    type="text"
                    name="traineeIds"
                    placeholder="1,2,3,4"
                    value={formData.traineeIds}
                    onChange={handleInputChange}
                    required
                  />

                  <small>
                    Enter multiple trainee IDs separated by commas.
                  </small>

                </div>


                {/* DATE */}

                <div className="session-field">

                  <label>
                    Date *
                  </label>

                  <div className="session-date-input">

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />

                    <FaCalendarAlt className="date-calendar-icon" />

                  </div>

                </div>


                {/* STATUS */}

                <div className="session-field">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >

                    <option value="Upcoming">
                      Upcoming
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                </div>


                {/* START TIME */}

                <div className="session-field">

                  <label>
                    Start Time *
                  </label>

                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                {/* END TIME */}

                <div className="session-field">

                  <label>
                    End Time *
                  </label>

                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                {/* DESCRIPTION */}

                <div className="session-field full-width">

                  <label>
                    Description *
                  </label>

                  <textarea
                    name="description"
                    placeholder="Enter session description..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5"
                    required
                  />

                </div>


              </div>


              {/* FOOTER */}

              <div className="session-modal-footer">

                <button
                  type="button"
                  className="session-cancel-btn"
                  onClick={closeModal}
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="session-save-btn"
                >

                  <FaPlus />

                  {editMode
                    ? "Update Session"
                    : "Create Session"}

                </button>

              </div>


            </form>

          </div>

        </div>

      )}


      {/* =====================================
          VIEW SESSION MODAL
          ===================================== */}

      {showView && selectedSession && (

        <div
          className="session-modal-overlay"
          onClick={() => {
            setShowView(false);
            setSelectedSession(null);
          }}
        >


          <div
            className="session-modal view-session-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="session-modal-header">

              <div>

                <h2>
                  {selectedSession.title}
                </h2>

                <p>
                  Session Details
                </p>

              </div>


              <button
                className="session-close-btn"
                onClick={() => {
                  setShowView(false);
                  setSelectedSession(null);
                }}
              >

                <FaTimes />

              </button>

            </div>


            {/* DETAILS */}

            <div className="session-details">


              {/* DESCRIPTION */}

              <div className="session-description-box">

                <span>
                  Description
                </span>

                <p>
                  {selectedSession.description}
                </p>

              </div>


              {/* DETAILS GRID */}

              <div className="session-detail-grid">


                <div className="session-detail-card">

                  <span>
                    Session ID
                  </span>

                  <strong>
                    #{selectedSession.id}
                  </strong>

                </div>


                <div className="session-detail-card">

                  <span>
                    Trainer
                  </span>

                  <strong>
                    Trainer #{selectedSession.trainerId}
                  </strong>

                </div>


                <div className="session-detail-card">

                  <span>
                    Date
                  </span>

                  <strong>
                    {selectedSession.date}
                  </strong>

                </div>


                <div className="session-detail-card">

                  <span>
                    Start Time
                  </span>

                  <strong>
                    {selectedSession.startTime}
                  </strong>

                </div>


                <div className="session-detail-card">

                  <span>
                    End Time
                  </span>

                  <strong>
                    {selectedSession.endTime}
                  </strong>

                </div>


                <div className="session-detail-card">

                  <span>
                    Status
                  </span>

                  <strong
                    className={`session-status ${getStatusClass(
                      selectedSession.status
                    )}`}
                  >

                    {selectedSession.status}

                  </strong>

                </div>

              </div>


              {/* TRAINEES */}

              <div className="assigned-trainees">

                <h3>
                  Assigned Trainees
                </h3>


                <div className="trainee-id-list">

                  {selectedSession.traineeIds.map(
                    (traineeId) => (

                      <span key={traineeId}>

                        Trainee #{traineeId}

                      </span>

                    )
                  )}

                </div>

              </div>

            </div>


            {/* FOOTER */}

            <div className="session-modal-footer">

              <button
                className="session-cancel-btn"
                onClick={() => {
                  setShowView(false);
                  setSelectedSession(null);
                }}
              >

                Close

              </button>


              <button
                className="session-save-btn"
                onClick={() => {

                  setShowView(false);

                  handleEdit(selectedSession);

                }}
              >

                <FaEdit />

                Edit Session

              </button>

            </div>


          </div>

        </div>

      )}

    </div>
  );
}


export default FeatureSession;

