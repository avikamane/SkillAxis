import { useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import { trainees as traineeData } from "../../Info/traineeData";
import "./feature-trainee.css";

function FeatureTrainee() {
  const [search, setSearch] = useState("");
  const [trainees, setTrainees] = useState(traineeData);

  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedTrainee, setSelectedTrainee] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(emptyForm);

  /* ===============================
     SEARCH
     =============================== */

  const filteredTrainees = trainees.filter(
    (trainee) =>
      trainee.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      trainee.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  /* ===============================
     FORM CHANGE
     =============================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     ADD TRAINEE
     =============================== */

  const openAddModal = () => {
    setFormData(emptyForm);
    setShowAdd(true);
  };

  const handleAddTrainee = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill all required fields.");
      return;
    }

    const newTrainee = {
      id:
        trainees.length > 0
          ? Math.max(...trainees.map((trainee) => trainee.id)) + 1
          : 1,

      name: formData.name,
      email: formData.email,
      status: formData.status,
    };

    setTrainees((currentTrainees) => [
      ...currentTrainees,
      newTrainee,
    ]);

    setShowAdd(false);
    setFormData(emptyForm);

    alert("Trainee added successfully!");
  };

  /* ===============================
     VIEW TRAINEE
     =============================== */

  const handleView = (trainee) => {
    setSelectedTrainee(trainee);
    setShowView(true);
  };

  /* ===============================
     EDIT TRAINEE
     =============================== */

  const handleEdit = (trainee) => {
    setSelectedTrainee(trainee);

    setFormData({
      name: trainee.name,
      email: trainee.email,
      status: trainee.status,
    });

    setShowEdit(true);
  };

  const handleUpdateTrainee = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill all required fields.");
      return;
    }

    setTrainees((currentTrainees) =>
      currentTrainees.map((trainee) =>
        trainee.id === selectedTrainee.id
          ? {
              ...trainee,
              name: formData.name,
              email: formData.email,
              status: formData.status,
            }
          : trainee
      )
    );

    setShowEdit(false);
    setSelectedTrainee(null);

    alert("Trainee updated successfully!");
  };

  /* ===============================
     DELETE TRAINEE
     =============================== */

  const deleteTrainee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainee?"
    );

    if (!confirmDelete) return;

    setTrainees((currentTrainees) =>
      currentTrainees.filter(
        (trainee) => trainee.id !== id
      )
    );

    if (
      selectedTrainee &&
      selectedTrainee.id === id
    ) {
      setShowView(false);
      setSelectedTrainee(null);
    }

    alert("Trainee deleted successfully!");
  };

  /* ===============================
     DELETE ALL
     =============================== */

  const deleteAllTrainees = () => {
    if (trainees.length === 0) {
      alert("There are no trainees to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all trainees?"
    );

    if (confirmDelete) {
      setTrainees([]);
      alert("All trainees deleted successfully!");
    }
  };

  /* ===============================
     CLOSE MODALS
     =============================== */

  const closeView = () => {
    setShowView(false);
    setSelectedTrainee(null);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setSelectedTrainee(null);
    setFormData(emptyForm);
  };

  const closeAdd = () => {
    setShowAdd(false);
    setFormData(emptyForm);
  };

  /* ===============================
     RETURN
     =============================== */

  return (
    <div className="trainees-page">

      {/* PAGE HEADER */}

      <div className="trainees-header">
        <div>
          <h1>Trainee Management</h1>
          <p>Manage and monitor all trainees</p>
        </div>
      </div>

      {/* ACTION BAR */}

      <div className="trainee-actions">

        <div className="trainee-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search trainees..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="trainee-buttons">

          <button
            className="delete-all-trainee-btn"
            onClick={deleteAllTrainees}
          >
            <FaTrash />
            Delete Trainee
          </button>

          <button
            className="add-trainee-btn"
            onClick={openAddModal}
          >
            <FaPlus />
            Add Trainee
          </button>

        </div>
      </div>

      {/* TABLE */}

      <div className="trainee-table-container">

        <table className="trainee-table">

          <thead>
            <tr>
              <th>Trainee</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredTrainees.length > 0 ? (

              filteredTrainees.map((trainee) => (

                <tr key={trainee.id}>

                  <td>
                    <div className="trainee-name">

                      <div className="trainee-avatar">
                        {trainee.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>

                      <span>{trainee.name}</span>

                    </div>
                  </td>

                  <td>{trainee.email}</td>

                  <td>

                    <span
                      className={
                        trainee.status === "Active"
                          ? "trainee-status active"
                          : "trainee-status inactive"
                      }
                    >
                      {trainee.status}
                    </span>

                  </td>

                  <td>

                    <div className="trainee-action-icons">

                      <button
                        className="trainee-view-btn"
                        title="View Trainee"
                        onClick={() =>
                          handleView(trainee)
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        className="trainee-delete-btn"
                        title="Delete Trainee"
                        onClick={() =>
                          deleteTrainee(trainee.id)
                        }
                      >
                        <FaTrash />
                      </button>

                      <button
                        className="trainee-edit-btn"
                        title="Edit Trainee"
                        onClick={() =>
                          handleEdit(trainee)
                        }
                      >
                        <FaEdit />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="no-trainees"
                >
                  No trainees found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="trainee-pagination">

        <button>&lt;</button>

        <button className="active-trainee-page">
          1
        </button>

        <button>&gt;</button>

      </div>

      {/* ==========================================
          ADD TRAINEE MODAL
          ========================================== */}

      {showAdd && (

        <div
          className="trainee-modal-overlay"
          onClick={closeAdd}
        >

          <div
            className="trainee-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="trainee-modal-header">

              <div>
                <h2>Add Trainee</h2>
                <p>Add a new trainee to the system</p>
              </div>

              <button
                className="trainee-modal-close"
                onClick={closeAdd}
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={handleAddTrainee}
              className="trainee-modal-form"
            >

              <div className="trainee-form-field">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter trainee name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="trainee-form-field">

                <label>
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

              <div className="trainee-form-field">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

              <div className="trainee-modal-footer">

                <button
                  type="button"
                  className="trainee-cancel-btn"
                  onClick={closeAdd}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="trainee-save-btn"
                >
                  <FaPlus />
                  Add Trainee
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ==========================================
          VIEW TRAINEE MODAL
          ========================================== */}

      {showView && selectedTrainee && (

        <div
          className="trainee-modal-overlay"
          onClick={closeView}
        >

          <div
            className="trainee-modal trainee-view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="trainee-modal-header">

              <div>
                <h2>
                  {selectedTrainee.name}
                </h2>

                <p>
                  Trainee Details
                </p>
              </div>

              <button
                className="trainee-modal-close"
                onClick={closeView}
              >
                <FaTimes />
              </button>

            </div>

            <div className="trainee-view-details">

              <div className="trainee-view-avatar">
                {selectedTrainee.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </div>

              <div className="trainee-detail-row">
                <span>Name</span>
                <strong>
                  {selectedTrainee.name}
                </strong>
              </div>

              <div className="trainee-detail-row">
                <span>Email</span>
                <strong>
                  {selectedTrainee.email}
                </strong>
              </div>

              <div className="trainee-detail-row">
                <span>Status</span>

                <strong
                  className={
                    selectedTrainee.status === "Active"
                      ? "trainee-status active"
                      : "trainee-status inactive"
                  }
                >
                  {selectedTrainee.status}
                </strong>
              </div>

              <div className="trainee-detail-row">
                <span>Trainee ID</span>
                <strong>
                  #{selectedTrainee.id}
                </strong>
              </div>

            </div>

            <div className="trainee-modal-footer">

              <button
                className="trainee-cancel-btn"
                onClick={closeView}
              >
                <FaTimes />
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          EDIT TRAINEE MODAL
          ========================================== */}

      {showEdit && selectedTrainee && (

        <div
          className="trainee-modal-overlay"
          onClick={closeEdit}
        >

          <div
            className="trainee-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="trainee-modal-header">

              <div>
                <h2>Edit Trainee</h2>
                <p>
                  Update trainee information
                </p>
              </div>

              <button
                className="trainee-modal-close"
                onClick={closeEdit}
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={handleUpdateTrainee}
              className="trainee-modal-form"
            >

              <div className="trainee-form-field">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="trainee-form-field">

                <label>
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

              <div className="trainee-form-field">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

              <div className="trainee-modal-footer">

                <button
                  type="button"
                  className="trainee-cancel-btn"
                  onClick={closeEdit}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="trainee-save-btn"
                >
                  <FaSave />
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default FeatureTrainee;