import { trainees } from "../../Info/traineeData";
import { sessions } from "../../Info/sessionData";
import { teams } from "../../Info/teamData";
import "./TrainerTeams.css";

function TrainerTeams() {
  // Temporary ID for the logged-in trainer
  // Later this will come from authentication
  const loggedInTrainerId = 1;

  const trainerTeams = teams.filter(
    (team) => team.trainerId === loggedInTrainerId,
  );

  return (
    <div className="trainer-teams">
      <div className="teams-header">
        <div>
          <h1>My Teams</h1>
          <p>View the teams and trainees assigned to you.</p>
        </div>
      </div>

      <div className="teams-list">
        {trainerTeams.map((team) => {
          const teamTrainees = trainees.filter((trainee) =>
            team.traineeIds.includes(trainee.id),
          );

          const teamSessions = sessions.filter((session) =>
            team.sessionIds.includes(session.id),
          );

          return (
            <div className="team-card" key={team.id}>
              {/* Team Header */}
              <div className="team-card-header">
                <div>
                  <h2>{team.name}</h2>
                  <p>{team.description}</p>
                </div>

                <div className="team-counts">
                  <div className="team-count">
                    <strong>{teamTrainees.length}</strong>
                    <span>Trainees</span>
                  </div>

                  <div className="team-count">
                    <strong>{teamSessions.length}</strong>
                    <span>Sessions</span>
                  </div>
                </div>
              </div>

              {/* Team Details */}
              <div className="team-details">
                {/* Trainees */}
                <div className="team-section">
                  <div className="team-section-header">
                    <h3>Trainees</h3>
                    <span>{teamTrainees.length}</span>
                  </div>

                  <div className="trainee-list">
                    {teamTrainees.length > 0 ? (
                      teamTrainees.map((trainee) => (
                        <div className="trainee-item" key={trainee.id}>
                          <div className="trainee-avatar">
                            {trainee.name.charAt(0)}
                          </div>

                          <div>
                            <strong>{trainee.name}</strong>
                            <span>{trainee.email}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-message">No trainees assigned.</p>
                    )}
                  </div>
                </div>

                {/* Sessions */}
                <div className="team-section">
                  <div className="team-section-header">
                    <h3>Sessions</h3>
                    <span>{teamSessions.length}</span>
                  </div>

                  <div className="session-list">
                    {teamSessions.length > 0 ? (
                      teamSessions.map((session) => (
                        <div className="session-item" key={session.id}>
                          <div className="session-info">
                            <strong>{session.title}</strong>

                            <span>{session.date}</span>

                            <span>
                              {session.startTime} - {session.endTime}
                            </span>
                          </div>

                          <span
                            className={`session-status ${session.status.toLowerCase()}`}
                          >
                            {session.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="empty-message">No sessions assigned.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrainerTeams;
