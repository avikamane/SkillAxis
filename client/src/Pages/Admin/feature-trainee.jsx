import { useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
} from "react-icons/fa";

import { trainees as traineeData } from "../../Info/traineeData";
import "./feature-trainee.css";

function FeatureTrainee() {
  const [search, setSearch] = useState("");
  const [trainees, setTrainees] = useState(traineeData);

  const filteredTrainees = trainees.filter((trainee) =>
    trainee.name.toLowerCase().includes(search.toLowerCase()) ||
    trainee.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTrainee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainee?"
    );

    if (confirmDelete) {
      setTrainees((currentTrainees) =>
        currentTrainees.filter((trainee) => trainee.id !== id)
      );
    }
  };

  const deleteAllTrainees = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all trainees?"
    );

    if (confirmDelete) {
      setTrainees([]);
    }
  };

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

        {/* SEARCH */}
        <div className="trainee-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search trainees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <div className="trainee-buttons">

          <button
            className="delete-all-trainee-btn"
            onClick={deleteAllTrainees}
          >
            <FaTrash />
            Delete Trainee
          </button>

          <button className="add-trainee-btn">
            <FaPlus />
            Add Trainee
          </button>

        </div>
      </div>

      {/* TRAINEE TABLE */}
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

                  {/* TRAINEE */}
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

                  {/* EMAIL */}
                  <td>{trainee.email}</td>

                  {/* STATUS */}
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

                  {/* ACTION */}
                  <td>
                    <div className="trainee-action-icons">

                      <button
                        className="trainee-view-btn"
                        title="View Trainee"
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

    </div>
  );
}

export default FeatureTrainee;