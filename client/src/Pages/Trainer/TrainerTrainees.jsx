import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { trainees } from "../../Info/traineeData";
import { teams } from "../../Info/teamData";
import "./TrainerTrainees.css";
function TrainerTrainees() {
  // Temporary ID for the logged-in trainer
  // Later this will come from authentication
  const loggedInTrainerId = 1;

  const [selectedTrainee, setSelectedTrainee] = useState(null);

  // Teams assigned to this trainer
  const trainerTeams = teams.filter(
    (team) => team.trainerId === loggedInTrainerId,
  );

  // Get trainee IDs from trainer's teams
  const traineeIds = [
    ...new Set(trainerTeams.flatMap((team) => team.traineeIds)),
  ];

  // Get actual trainee data
  const trainerTrainees = trainees.filter((trainee) =>
    traineeIds.includes(trainee.id),
  );

  return (
    <div className="trainer-trainees">
      {/* =========================
          HEADER
          ========================= */}

      <div className="trainees-header">
        <div>
          <h1>My Trainees</h1>
          <p>View the trainees assigned to your teams.</p>
        </div>

        <div className="trainee-count">
          <strong>{trainerTrainees.length}</strong>
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
            {trainerTrainees.map((trainee) => {
              const traineeTeam = trainerTeams.find((team) =>
                team.traineeIds.includes(trainee.id),
              );

              return (
                <tr key={trainee.id}>
                  {/* Trainee */}
                  <td>
                    <div className="trainee-name">
                      <div className="trainee-avatar">
                        {trainee.name.charAt(0)}
                      </div>

                      <span>{trainee.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td>{trainee.email}</td>

                  {/* Team */}
                  <td>{traineeTeam?.name || "Not assigned"}</td>

                  {/* Joining Date */}
                  <td>{trainee.joiningDate}</td>

                  {/* Action */}
                  <td>
                    <button
                      className="view-trainee-btn"
                      onClick={() =>
                        setSelectedTrainee({
                          ...trainee,
                          teamName: traineeTeam?.name || "Not assigned",
                        })
                      }
                    >
                      <FaEye />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              );
            })}
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
                  {selectedTrainee.name.charAt(0)}
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

                <strong>{selectedTrainee.joiningDate}</strong>
              </div>

              <div className="detail-item">
                <span className="detail-label">Status</span>

                <span
                  className={`details-status ${selectedTrainee.status.toLowerCase()}`}
                >
                  {selectedTrainee.status}
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
