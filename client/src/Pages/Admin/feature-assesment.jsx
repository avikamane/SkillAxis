import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaClipboardCheck,
} from "react-icons/fa";

import { assesmentData } from "../../Info/assesmentData";
import "./feature-assesment.css";

function FeatureAssesment() {
  const [assessments, setAssessments] = useState(assesmentData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    trainer: "",
    date: "",
    duration: "",
    questions: "",
    status: "Upcoming",
  });

  const filteredAssessments = assessments.filter((assessment) => {
    const searchText = `
      ${assessment.title}
      ${assessment.course}
      ${assessment.trainer}
      ${assessment.status}
    `.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || assessment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openCreateModal = () => {
    setModalType("create");

    setFormData({
      title: "",
      course: "",
      trainer: "",
      date: "",
      duration: "",
      questions: "",
      status: "Upcoming",
    });

    setShowModal(true);
  };

  const openEditModal = (assessment) => {
    setModalType("edit");
    setSelectedAssessment(assessment);

    setFormData({
      title: assessment.title,
      course: assessment.course,
      trainer: assessment.trainer,
      date: assessment.date,
      duration: assessment.duration,
      questions: assessment.questions,
      status: assessment.status,
    });

    setShowModal(true);   
  };

  const handleView = (assessment) => {
    setModalType("view");
    setSelectedAssessment(assessment);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assessment?"
    );

    if (!confirmDelete) return;

    setAssessments((previous) =>
      previous.filter((assessment) => assessment.id !== id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.course ||
      !formData.trainer ||
      !formData.date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (modalType === "create") {
      const newAssessment = {
        id: Date.now(),
        ...formData,
      };

      setAssessments((previous) => [...previous, newAssessment]);
    } else {
      setAssessments((previous) =>
        previous.map((assessment) =>
          assessment.id === selectedAssessment.id
            ? {
                ...assessment,
                ...formData,
              }
            : assessment
        )
      );
    }

    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAssessment(null);
  };

  return (
    <div className="assessment-page">

      {/* HEADER */}
      <div className="assessment-header">
        <div>
          <h1>Assessment Management</h1>
          <p>Manage and monitor assessments for all training programs</p>
        </div>

        <button
          className="create-assessment-btn"
          onClick={openCreateModal}
        >
          <FaPlus />
          Create Assessment
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="assessment-summary">

        <div className="assessment-card total">
          <div>
            <span>Total Assessments</span>
            <strong>{assessments.length}</strong>
            <small>All assessments</small>
          </div>

          <FaClipboardCheck />
        </div>

        <div className="assessment-card active">
          <div>
            <span>Active</span>
            <strong>
              {assessments.filter((a) => a.status === "Active").length}
            </strong>
            <small>Currently running</small>
          </div>

          <FaClipboardCheck />
        </div>

        <div className="assessment-card upcoming">
          <div>
            <span>Upcoming</span>
            <strong>
              {assessments.filter((a) => a.status === "Upcoming").length}
            </strong>
            <small>Scheduled assessments</small>
          </div>

          <FaClipboardCheck />
        </div>

        <div className="assessment-card completed">
          <div>
            <span>Completed</span>
            <strong>
              {assessments.filter((a) => a.status === "Completed").length}
            </strong>
            <small>Finished assessments</small>
          </div>

          <FaClipboardCheck />
        </div>

      </div>

      {/* FILTER BAR */}
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

        <div className="assessment-filters">
          <button
            className={statusFilter === "All" ? "active-filter" : ""}
            onClick={() => setStatusFilter("All")}
          >
            All
          </button>

          <button
            className={statusFilter === "Active" ? "active-filter" : ""}
            onClick={() => setStatusFilter("Active")}
          >
            Active
          </button>

          <button
            className={statusFilter === "Upcoming" ? "active-filter" : ""}
            onClick={() => setStatusFilter("Upcoming")}
          >
            Upcoming
          </button>

          <button
            className={statusFilter === "Completed" ? "active-filter" : ""}
            onClick={() => setStatusFilter("Completed")}
          >
            Completed
          </button>
        </div>

      </div>

      {/* TABLE */}
      <div className="assessment-table-container">

        <table className="assessment-table">

          <thead>
            <tr>
              <th>Assessment</th>
              <th>Course</th>
              <th>Trainer</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Questions</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredAssessments.length > 0 ? (
              filteredAssessments.map((assessment) => (
                <tr key={assessment.id}>

                  <td>
                    <div className="assessment-name">
                      <div className="assessment-icon">
                        <FaClipboardCheck />
                      </div>

                      <strong>{assessment.title}</strong>
                    </div>
                  </td>

                  <td>{assessment.course}</td>

                  <td>{assessment.trainer}</td>

                  <td>{assessment.date}</td>

                  <td>{assessment.duration}</td>

                  <td>{assessment.questions}</td>

                  <td>
                    <span
                      className={`assessment-status ${assessment.status.toLowerCase()}`}
                    >
                      {assessment.status}
                    </span>
                  </td>

                  <td>
                    <div className="assessment-actions">

                      <button
                        className="view-assessment"
                        title="View"
                        onClick={() => handleView(assessment)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="edit-assessment"
                        title="Edit"
                        onClick={() => openEditModal(assessment)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-assessment"
                        title="Delete"
                        onClick={() => handleDelete(assessment.id)}
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
                  colSpan="8"
                  className="no-assessments"
                >
                  No assessments found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="assessment-pagination">

        <button
          onClick={() => alert("Previous page")}
        >
          &lt;
        </button>

        <button className="active-page">
          1
        </button>

        <button
          onClick={() => alert("Next page")}
        >
          &gt;
        </button>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="assessment-modal-overlay">

          <div className="assessment-modal">

            <div className="assessment-modal-header">

              <h2>
                {modalType === "create"
                  ? "Create Assessment"
                  : modalType === "edit"
                  ? "Edit Assessment"
                  : "Assessment Details"}
              </h2>

              <button onClick={closeModal}>
                <FaTimes />
              </button>

            </div>

            {modalType === "view" ? (
              <div className="assessment-details">

                <h3>{selectedAssessment?.title}</h3>

                <p>
                  <strong>Course:</strong>{" "}
                  {selectedAssessment?.course}
                </p>

                <p>
                  <strong>Trainer:</strong>{" "}
                  {selectedAssessment?.trainer}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {selectedAssessment?.date}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {selectedAssessment?.duration}
                </p>

                <p>
                  <strong>Questions:</strong>{" "}
                  {selectedAssessment?.questions}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedAssessment?.status}
                </p>

                <button
                  className="modal-close-btn"
                  onClick={closeModal}
                >
                  Close
                </button>

              </div>
            ) : (
              <form
                className="assessment-form"
                onSubmit={handleSubmit}
              >

                <label>
                  Assessment Name *
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter assessment name"
                  />
                </label>

                <label>
                  Course *
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        course: e.target.value,
                      })
                    }
                    placeholder="Enter course"
                  />
                </label>

                <label>
                  Trainer *
                  <input
                    type="text"
                    value={formData.trainer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        trainer: e.target.value,
                      })
                    }
                    placeholder="Enter trainer name"
                  />
                </label>

                <div className="form-row">

                  <label>
                    Date *
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date: e.target.value,
                        })
                      }
                      placeholder="20 Aug 2026"
                    />
                  </label>

                  <label>
                    Duration
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: e.target.value,
                        })
                      }
                      placeholder="60 min"
                    />
                  </label>

                </div>

                <div className="form-row">

                  <label>
                    Questions
                    <input
                      type="number"
                      value={formData.questions}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          questions: e.target.value,
                        })
                      }
                      placeholder="30"
                    />
                  </label>

                  <label>
                    Status
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option>Upcoming</option>
                      <option>Active</option>
                      <option>Completed</option>
                    </select>
                  </label>

                </div>

                <div className="modal-buttons">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-assessment-btn"
                  >
                    {modalType === "create"
                      ? "Create Assessment"
                      : "Save Changes"}
                  </button>

                </div>

              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default FeatureAssesment;