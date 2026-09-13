import { useState, useEffect } from "react";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
  FaTimes,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";
import { getToken } from "../../utils/Auth";

import "./feature-trainer.css";

function Trainers() {
  const [search, setSearch] = useState("");

  const [trainers, setTrainers] = useState([
    {
      id: 1,
      initials: "TP",
      name: "Trisha Pandey",
      email: "tri@gmail.com",
      team: "Web dev",
    },
    {
      id: 2,
      initials: "VK",
      name: "Vaishnavi Kutal",
      email: "vai@gmail.com",
      team: "Web dev",
    },
    {
      id: 3,
      initials: "AM",
      name: "Avika Mane",
      email: "avi@gmail.com",
      team: "Web dev",
    },
    {
      id: 4,
      initials: "RV",
      name: "Rahul Varma",
      email: "rah@gmail.com",
      team: "App dev",
    },
    {
      id: 5,
      initials: "AP",
      name: "Amit Patil",
      email: "amit@gmail.com",
      team: "App dev",
    },
    {
      id: 6,
      initials: "SJ",
      name: "Sneha Joshi",
      email: "sne@gmail.com",
      team: "App dev",
    },
  ]);
  useEffect(() => {
  fetchTrainers();
}, []);

const fetchTrainers = async () => {
  try {
    const token = getToken();

    const response = await fetch(
      "http://localhost:5000/api/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        data.message || "Failed to fetch trainers"
      );
      return;
    }

    const trainerUsers = data
      .filter((user) => user.role === "Trainer")
      .map((user) => ({
        id: user._id,
        initials: user.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .substring(0, 2)
          .toUpperCase(),
        name: user.name,
        email: user.email,
        team: "Web dev",
      }));

    setTrainers(trainerUsers);
  } catch (error) {
    console.error(
      "Failed to connect to server:",
      error
    );
  }
};

  /* ================================
     MODAL STATES
     ================================ */

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedTrainer, setSelectedTrainer] = useState(null);

  /* ================================
     NEW TRAINER FORM
     ================================ */

  const [newTrainer, setNewTrainer] = useState({
  name: "",
  email: "",
  password: "",
});
  /* ================================
     FILTER
     ================================ */

  const filteredTrainers = trainers.filter((trainer) => {
    const value = search.toLowerCase();

    return (
      trainer.name.toLowerCase().includes(value) ||
      trainer.email.toLowerCase().includes(value) ||
      trainer.team.toLowerCase().includes(value)
    );
  });

  /* ================================
     DELETE TRAINER
     ================================ */

 const deleteTrainer = async (id) => {
  const trainer = trainers.find((item) => item.id === id);

  if (!trainer) return;

  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${trainer.name}?`
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
      alert(data.message || "Failed to delete trainer.");
      return;
    }

    alert("Trainer deleted successfully!");

    await fetchTrainers();

    if (selectedTrainer && selectedTrainer.id === id) {
      setShowViewModal(false);
      setShowEditModal(false);
      setSelectedTrainer(null);
    }
  } catch (error) {
    console.error("Delete trainer error:", error);
    alert("Unable to connect to the server.");
  }
};

  /* ================================
     DELETE ALL
     ================================ */

 const deleteAllTrainers = async () => {
  if (trainers.length === 0) {
    alert("No trainers available.");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete all trainers?"
  );

  if (!confirmDelete) return;

  try {
    const token = getToken();

    await Promise.all(
      trainers.map((trainer) =>
        fetch(`http://localhost:5000/api/users/${trainer.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    );

    alert("All trainers deleted successfully!");

    await fetchTrainers();

    setSelectedTrainer(null);
    setShowViewModal(false);
    setShowEditModal(false);
  } catch (error) {
    console.error("Delete all trainers error:", error);
    alert("Unable to connect to the server.");
  }
};

  /* ================================
     VIEW TRAINER
     ================================ */

  const viewTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setShowViewModal(true);
  };

  /* ================================
     EDIT TRAINER
     ================================ */

  const editTrainer = (trainer) => {
    setSelectedTrainer({
      ...trainer,
    });

    setShowEditModal(true);
  };

  /* ================================
     EDIT CHANGE
     ================================ */

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setSelectedTrainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================================
     SAVE EDIT
     ================================ */

  const saveEdit = async (e) => {
  e.preventDefault();

  if (
    !selectedTrainer.name.trim() ||
    !selectedTrainer.email.trim() ||
    !selectedTrainer.team.trim()
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const token = getToken();

    const response = await fetch(
      `http://localhost:5000/api/users/${selectedTrainer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedTrainer.name.trim(),
          email: selectedTrainer.email.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update trainer.");
      return;
    }

    alert("Trainer updated successfully!");

    await fetchTrainers();

    setShowEditModal(false);
    setSelectedTrainer(null);
  } catch (error) {
    console.error("Update trainer error:", error);
    alert("Unable to connect to the server.");
  }
};
  /* ================================
     ADD TRAINER
     ================================ */

  const handleNewTrainerChange = (e) => {
    const { name, value } = e.target;

    setNewTrainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTrainer = async (e) => {
  e.preventDefault();

  if (
    !newTrainer.name.trim() ||
    !newTrainer.email.trim() ||
    !newTrainer.password.trim()
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const token = getToken();

    const response = await fetch(
      "http://localhost:5000/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newTrainer.name.trim(),
          email: newTrainer.email.trim(),
          password: newTrainer.password,
          role: "Trainer",
          status: "Active",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add trainer.");
      return;
    }

    alert("Trainer added successfully!");

    await fetchTrainers();

    setNewTrainer({
      name: "",
      email: "",
      password: "",
    });

    setShowAddModal(false);
  } catch (error) {
    console.error("Add trainer error:", error);
    alert("Unable to connect to the server.");
  }
};

  /* ================================
     CLOSE MODALS
     ================================ */

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedTrainer(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedTrainer(null);
  };

  return (
    <div className="trainers-page">

      {/* =================================
          PAGE HEADER
          ================================= */}

      <div className="trainers-header">
        <div>
          <h1>Trainer Management</h1>
          <p>Manage and monitor all trainers</p>
        </div>
      </div>

      {/* =================================
          ACTION BAR
          ================================= */}

      <div className="trainer-actions">

        <div className="trainer-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search trainers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="trainer-buttons">

          <button
            className="delete-all-btn"
            onClick={deleteAllTrainers}
          >
            <FaTrash />
            Delete Trainer
          </button>

          <button
            className="add-trainer-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            Add Trainer
          </button>

        </div>
      </div>

      {/* =================================
          TRAINER TABLE
          ================================= */}

      <div className="trainer-table-container">

        <table className="trainer-table">

          <thead>
            <tr>
              <th>Trainer</th>
              <th>Email</th>
              <th>Team</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredTrainers.length > 0 ? (

              filteredTrainers.map((trainer) => (

                <tr key={trainer.id}>

                  {/* TRAINER */}

                  <td>
                    <div className="trainer-name">

                      <div className="trainer-avatar">
                        {trainer.initials}
                      </div>

                      <span>{trainer.name}</span>

                    </div>
                  </td>

                  {/* EMAIL */}

                  <td>
                    <div className="trainer-email">
                      <FaEnvelope />
                      {trainer.email}
                    </div>
                  </td>

                  {/* TEAM */}

                  <td>
                    <span className="trainer-team">
                      {trainer.team}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="action-icons">

                      <button
                        className="view-btn"
                        title="View Trainer"
                        onClick={() => viewTrainer(trainer)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="delete-btn"
                        title="Delete Trainer"
                        onClick={() =>
                          deleteTrainer(trainer.id)
                        }
                      >
                        <FaTrash />
                      </button>

                      <button
                        className="edit-btn"
                        title="Edit Trainer"
                        onClick={() =>
                          editTrainer(trainer)
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
                  className="no-trainers"
                >
                  <FaUsers />
                  <span>No trainers found</span>
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* =================================
          PAGINATION
          ================================= */}

      <div className="trainer-pagination">

        <button
          disabled
          title="Previous Page"
        >
          &lt;
        </button>

        <button className="active-page">
          1
        </button>

        <button
          disabled
          title="Next Page"
        >
          &gt;
        </button>

      </div>

      {/* =================================
          ADD TRAINER MODAL
          ================================= */}

      {showAddModal && (

        <div
          className="trainer-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >

          <div
            className="trainer-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="trainer-modal-header">

              <div>
                <h2>Add Trainer</h2>
                <p>Add a new trainer to the system</p>
              </div>

              <button
                className="trainer-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={addTrainer}>

              <div className="trainer-form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter trainer name"
                  value={newTrainer.name}
                  onChange={handleNewTrainerChange}
                />

              </div>

              <div className="trainer-form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={newTrainer.email}
                  onChange={handleNewTrainerChange}
                />

              </div>

              <div className="trainer-form-group">

              

                <label>Password</label>

<input
  type="password"
  name="password"
  placeholder="Enter temporary password"
  value={newTrainer.password}
  onChange={handleNewTrainerChange}
/>
              </div>

              <div className="trainer-modal-actions">

                <button
                  type="button"
                  className="trainer-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  <FaTimes />
                  Cancel
                </button>

                {/* ONLY THIS BUTTON IS CHANGED */}

                <button
                  type="submit"
                  className="trainer-save-btn"
                  style={{
                    backgroundColor: "#1677e8",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "7px",
                    height: "40px",
                    padding: "0 18px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    cursor: "pointer",
                  }}
                >
                  <FaPlus />
                  Add Trainer
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =================================
          VIEW TRAINER MODAL
          ================================= */}

      {showViewModal && selectedTrainer && (

        <div
          className="trainer-modal-overlay"
          onClick={closeViewModal}
        >

          <div
            className="trainer-modal trainer-view-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="trainer-modal-header">

              <div>
                <h2>Trainer Details</h2>
                <p>View trainer information</p>
              </div>

              <button
                className="trainer-modal-close"
                onClick={closeViewModal}
              >
                <FaTimes />
              </button>

            </div>

            <div className="trainer-profile-preview">

              <div className="trainer-large-avatar">
                {selectedTrainer.initials}
              </div>

              <div>
                <h2>{selectedTrainer.name}</h2>
                <span>{selectedTrainer.team}</span>
              </div>

            </div>

            <div className="trainer-detail-grid">

              <div className="trainer-detail-item">
                <label>Email</label>
                <strong>{selectedTrainer.email}</strong>
              </div>

              <div className="trainer-detail-item">
                <label>Team</label>
                <strong>{selectedTrainer.team}</strong>
              </div>

              <div className="trainer-detail-item">
                <label>Trainer ID</label>
                <strong>#{selectedTrainer.id}</strong>
              </div>

            </div>

            <div className="trainer-modal-actions">

              <button
                className="trainer-cancel-btn"
                onClick={closeViewModal}
              >
                <FaTimes />
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =================================
          EDIT TRAINER MODAL
          ================================= */}

      {showEditModal && selectedTrainer && (

        <div
          className="trainer-modal-overlay"
          onClick={closeEditModal}
        >

          <div
            className="trainer-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="trainer-modal-header">

              <div>
                <h2>Edit Trainer</h2>
                <p>Update trainer information</p>
              </div>

              <button
                className="trainer-modal-close"
                onClick={closeEditModal}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={saveEdit}>

              <div className="trainer-form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={selectedTrainer.name}
                  onChange={handleEditChange}
                />

              </div>

              <div className="trainer-form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={selectedTrainer.email}
                  onChange={handleEditChange}
                />

              </div>

              <div className="trainer-form-group">

                <label>Password</label>

                <input
                  type="text"
                  name="password"
                  value={selectedTrainer.password}
                  onChange={handleEditChange}
                />

              </div>

              <div className="trainer-modal-actions">

                <button
                  type="button"
                  className="trainer-cancel-btn"
                  onClick={closeEditModal}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="trainer-save-btn"
                >
                  <FaEdit />
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

export default Trainers;