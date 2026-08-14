import { useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
} from "react-icons/fa";

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

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTrainer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (confirmDelete) {
      setTrainers(trainers.filter((trainer) => trainer.id !== id));
    }
  };

  return (
    <div className="trainers-page">
      {/* PAGE HEADER */}
      <div className="trainers-header">
        <div>
          <h1>Trainer Management</h1>
          <p>Manage and monitor all trainers</p>
        </div>
      </div>

      {/* ACTION BAR */}
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
            onClick={() => setTrainers([])}
          >
            <FaTrash />
            Delete Trainer
          </button>

          <button className="add-trainer-btn">
            <FaPlus />
            Add Trainer
          </button>
        </div>
      </div>

      {/* TRAINER TABLE */}
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
                  <td>
                    <div className="trainer-name">
                      <div className="trainer-avatar">
                        {trainer.initials}
                      </div>

                      <span>{trainer.name}</span>
                    </div>
                  </td>

                  <td>{trainer.email}</td>

                  <td>{trainer.team}</td>

                  <td>
                    <div className="action-icons">
                      <button
                        className="view-btn"
                        title="View Trainer"
                      >
                        <FaEye />
                      </button>

                      <button
                        className="delete-btn"
                        title="Delete Trainer"
                        onClick={() => deleteTrainer(trainer.id)}
                      >
                        <FaTrash />
                      </button>

                      <button
                        className="edit-btn"
                        title="Edit Trainer"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-trainers">
                  No trainers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="trainer-pagination">
        <button>&lt;</button>
        <button className="active-page">1</button>
        <button>&gt;</button>
      </div>
    </div>
  );
}

export default Trainers;