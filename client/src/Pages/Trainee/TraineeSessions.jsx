import { useState } from "react";
import { sessions } from "../../Info/sessionData";
import { trainers } from "../../Info/trainerData";
import SessionDetailsModal from "../../components/SessionDetailsModel";
import "./TraineeSession.css";

function TraineeSessions() {
  const loggedInTraineeId = 1;
  const [selectedSession, setSelectedSession] = useState(null);

  const traineeSessions = sessions.filter(
    (session) =>
      Array.isArray(session?.traineeIds) &&
      session.traineeIds.includes(loggedInTraineeId)
  );

  const getTrainerName = (trainerId) => {
    const trainer = trainers.find((t) => t.id === trainerId);
    return trainer ? trainer.name : "Unassigned";
  };

  return (
    <div className="trainee-sessions">
      <div className="sessions-header">
        <div>
          <h1>My Sessions</h1>
          <p>View all your scheduled and completed training sessions.</p>
        </div>
      </div>

      <div className="sessions-table-container">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>Session</th>
              <th>Date</th>
              <th>Time</th>
              <th>Trainer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {traineeSessions.length > 0 ? (
              traineeSessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.title}</td>
                  <td>{session.date}</td>
                  <td>
                    {session.startTime} - {session.endTime}
                  </td>
                  <td>{getTrainerName(session.trainerId)}</td>
                  <td>
                    <span
                      className={`session-status ${session.status.toLowerCase()}`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="view-session-btn"
                      onClick={() => setSelectedSession(session)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-sessions-row">
                  No sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedSession && (
        <SessionDetailsModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}

export default TraineeSessions;