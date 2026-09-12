import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { getToken } from "../../utils/Auth";
import "./TrainerTrainees.css";

function TrainerTrainees() {
  const [trainees, setTrainees] = useState([]);
  const [selectedTrainee, setSelectedTrainee] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH TRAINEES
  // =========================

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          setError("Authentication required. Please login again.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/trainer/trainees",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch trainees");
        }

        setTrainees(data);
      } catch (error) {
        console.error("Error fetching trainees:", error);
        setError(error.message || "Failed to load trainees.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <div className="trainer-trainees">
        <div className="trainees-header">
          <div>
            <h1>My Trainees</h1>
            <p>View all trainees in the system.</p>
          </div>

          <div className="trainee-count">
            <strong>...</strong>
            <span>Trainees</span>
          </div>
        </div>

        <div className="trainees-table-container">
          <p style={{ padding: "20px" }}>Loading trainees...</p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR STATE
  // =========================

  if (error) {
    return (
      <div className="trainer-trainees">
        <div className="trainees-header">
          <div>
            <h1>My Trainees</h1>
            <p>View all trainees in the system.</p>
          </div>

          <div className="trainee-count">
            <strong>0</strong>
            <span>Trainees</span>
          </div>
        </div>

        <div className="trainees-table-container">
          <p style={{ padding: "20px", color: "red" }}>{error}</p>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN PAGE
  // =========================

  return (
    <div className="trainer-trainees">
      {/* =========================
          HEADER
          ========================= */}

      <div className="trainees-header">
        <div>
          <h1>My Trainees</h1>
          <p>View all trainees in the system.</p>
        </div>

        <div className="trainee-count">
          <strong>{trainees.length}</strong>
          <span>Trainees</span>
        </div>
      </div>

      {/* =========================
          TRAINEES TABLE
          ========================= */}

      <div className="trainees-table-container">
        <table className="trainees-table">
          <thead>
            <tr>
              <th>Trainee</th>
              <th>Email</th>
              <th>Team</th>
              <th>Joining Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {trainees.length > 0 ? (
              trainees.map((trainee) => {
                return (
                  <tr key={trainee._id}>
                    {/* Trainee */}
                    <td>
                      <div className="trainee-name">
                        <div className="trainee-avatar">
                          {trainee.name?.charAt(0).toUpperCase()}
                        </div>

                        <span>{trainee.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td>{trainee.email}</td>

                    {/* Team */}
                    <td>Not assigned</td>

                    {/* Joining Date */}
                    <td>
                      {trainee.joiningDate
                        ? trainee.joiningDate
                        : trainee.createdAt
                          ? new Date(trainee.createdAt).toLocaleDateString()
                          : "Not available"}
                    </td>

                    {/* Action */}
                    <td>
                      <button
                        className="view-trainee-btn"
                        onClick={() =>
                          setSelectedTrainee({
                            ...trainee,
                            teamName: "Not assigned",
                          })
                        }
                      >
                        <FaEye />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  No trainees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
          TRAINEE DETAILS MODAL
          ========================= */}

      {selectedTrainee && (
        <div
          className="trainee-modal-overlay"
          onClick={() => setSelectedTrainee(null)}
        >
          <div
            className="trainee-details-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}

            <div className="trainee-details-header">
              <div className="trainee-details-profile">
                <div className="large-trainee-avatar">
                  {selectedTrainee.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2>{selectedTrainee.name}</h2>
                  <p>{selectedTrainee.email}</p>
                </div>
              </div>

              <button
                className="close-modal-btn"
                onClick={() => setSelectedTrainee(null)}
              >
                ×
              </button>
            </div>

            {/* Details */}

            <div className="trainee-details-body">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>

                <strong>{selectedTrainee.name}</strong>
              </div>

              <div className="detail-item">
                <span className="detail-label">Email</span>

                <strong>{selectedTrainee.email}</strong>
              </div>

              <div className="detail-item">
                <span className="detail-label">Team</span>

                <strong>{selectedTrainee.teamName}</strong>
              </div>

              <div className="detail-item">
                <span className="detail-label">Joining Date</span>

                <strong>
                  {selectedTrainee.joiningDate
                    ? selectedTrainee.joiningDate
                    : selectedTrainee.createdAt
                      ? new Date(selectedTrainee.createdAt).toLocaleDateString()
                      : "Not available"}
                </strong>
              </div>

              <div className="detail-item">
                <span className="detail-label">Status</span>

                <span
                  className={`details-status ${
                    selectedTrainee.status?.toLowerCase() || ""
                  }`}
                >
                  {selectedTrainee.status || "Active"}
                </span>
              </div>
            </div>

            {/* Footer */}

            <div className="trainee-details-footer">
              <button
                className="close-details-btn"
                onClick={() => setSelectedTrainee(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerTrainees;
