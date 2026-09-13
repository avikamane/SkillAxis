import { useState, useEffect } from "react";
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
import { getToken } from "../../utils/Auth";
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
    password: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(emptyForm);
  useEffect(() => {
  fetchTrainees();
}, []);

const fetchTrainees = async () => {
  try {
    const token = getToken();

    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || "Failed to fetch trainees");
      return;
    }

    const traineeUsers = data
      .filter((user) => user.role === "Trainee")
      .map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      }));

    setTrainees(traineeUsers);
  } catch (error) {
    console.error("Failed to connect to server:", error);
  }
};

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

const handleAddTrainee = async (e) => {
  e.preventDefault();

  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.password.trim()
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const token = getToken();

    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: "Trainee",
        status: formData.status,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add trainee.");
      return;
    }

    alert("Trainee added successfully!");

    await fetchTrainees();

    setFormData(emptyForm);
    setShowAdd(false);
  } catch (error) {
    console.error("Add trainee error:", error);
    alert("Unable to connect to the server.");
  }
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

  const handleUpdateTrainee = async (e) => {
  e.preventDefault();

  if (!formData.name.trim() || !formData.email.trim()) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const token = getToken();

    const response = await fetch(
      `http://localhost:5000/api/users/${selectedTrainee.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          status: formData.status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update trainee.");
      return;
    }

    alert("Trainee updated successfully!");

    await fetchTrainees();

    setShowEdit(false);
    setSelectedTrainee(null);
    setFormData(emptyForm);
  } catch (error) {
    console.error("Update trainee error:", error);
    alert("Unable to connect to the server.");
  }
};
  /* ===============================
     DELETE TRAINEE
     =============================== */

 const deleteTrainee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this trainee?"
  );

  if (!confirmDelete) return;

  try {
    const token = getToken();

    const response = await fetch(
      `http://localhost:5000/api/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete trainee.");
      return;
    }

    alert("Trainee deleted successfully!");

    await fetchTrainees();

    if (selectedTrainee && selectedTrainee.id === id) {
      setShowView(false);
      setSelectedTrainee(null);
    }
  } catch (error) {
    console.error("Delete trainee error:", error);
    alert("Unable to connect to the server.");
  }
};

  /* ===============================
     DELETE ALL
     =============================== */

 const deleteAllTrainees = async () => {
  if (trainees.length === 0) {
    alert("There are no trainees to delete.");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete all trainees?"
  );

  if (!confirmDelete) return;

  try {
    const token = getToken();

    // Delete every trainee from the database
    await Promise.all(
      trainees.map((trainee) =>
        fetch(`http://localhost:5000/api/users/${trainee.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    );

    alert("All trainees deleted successfully!");

    // Refresh the trainee list
    await fetchTrainees();

    setSelectedTrainee(null);
    setShowView(false);
  } catch (error) {
    console.error("Delete all trainees error:", error);
    alert("Unable to connect to the server.");
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
    Password *
  </label>

  <input
    type="password"
    name="password"
    placeholder="Enter temporary password"
    value={formData.password}
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