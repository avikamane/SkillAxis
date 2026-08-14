import { useState } from "react";
import { sessions } from "../../Info/sessionData";
import SessionDetailsModal from "../../components/SessionDetailsModel";
import "./TrainerSession.css";

function TrainerSessions() {
  // Temporary ID for the logged-in trainer
  // Later this will come from authentication
  const loggedInTrainerId = 1;

  const [selectedSession, setSelectedSession] = useState(null);

  const trainerSessions = sessions.filter(
    (session) => session.trainerId === loggedInTrainerId,
  );

  return (
    <div className="trainer-sessions">
      <div className="sessions-header">
        <div>
          <h1>My Sessions</h1>
          <p>View your assigned training sessions.</p>
        </div>
      </div>

      <div className="sessions-table-container">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>Session</th>
              <th>Date</th>
              <th>Time</th>
              <th>Trainees</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {trainerSessions.map((session) => (
              <tr key={session.id}>
                <td>{session.title}</td>

                <td>{session.date}</td>

                <td>
                  {session.startTime} - {session.endTime}
                </td>

                <td>{session.traineeIds.length}</td>

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
            ))}
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

export default TrainerSessions;
