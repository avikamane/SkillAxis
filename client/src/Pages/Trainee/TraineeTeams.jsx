// Import named export 'teams' from teamData.js
import { teams } from "../../Info/teamData";
import { sessions } from "../../Info/sessionData";
import { trainees } from "../../Info/traineeData";
import "./TraineeTeams.css";

const TraineeTeams = () => {
  // Current logged-in trainee ID
  const currentTraineeId = 1;

  // Safe fallbacks to prevent crashes if imports are missing
  const teamsList = Array.isArray(teams) ? teams : [];
  const sessionsList = Array.isArray(sessions) ? sessions : [];
  const traineesList = Array.isArray(trainees) ? trainees : [];

  // Filter teams that include the current logged-in trainee
  const myTeams = teamsList.filter(
    (team) => Array.isArray(team?.traineeIds) && team.traineeIds.includes(currentTraineeId)
  );

  // Fallback to show all teams if no match found
  const displayTeams = myTeams.length > 0 ? myTeams : teamsList;

  // Helper to fetch trainee objects by ID list
  const getTraineesForTeam = (traineeIds = []) => {
    if (!Array.isArray(traineeIds)) return [];
    return traineesList.filter((t) => traineeIds.includes(t.id));
  };

  // Helper to fetch session objects using team's sessionIds array
  const getSessionsForTeam = (sessionIds = [], teamId) => {
    return sessionsList.filter(
      (s) =>
        (Array.isArray(sessionIds) && sessionIds.includes(s.id)) ||
        s.teamId === teamId
    );
  };

  return (
    <div className="trainee-teams-container">
      {/* PAGE HEADER */}
      <header className="page-header">
        <h1>My Teams</h1>
        <p>View the teams, teammates, and sessions assigned to you.</p>
      </header>

      {/* TEAMS LIST */}
      <div className="teams-list">
        {displayTeams.map((team) => {
          const teamTrainees = getTraineesForTeam(team?.traineeIds);
          const teamSessions = getSessionsForTeam(team?.sessionIds, team?.id);

          return (
            <div key={team?.id} className="team-card">
              {/* CARD TOP HEADER */}
              <div className="team-card-header">
                <div className="team-title-group">
                  <h2>{team?.name || "Assigned Team"}</h2>
                  <p className="team-description">{team?.description || "Training Program"}</p>
                </div>
                <div className="team-stats">
                  <div className="stat-box">
                    <span className="stat-number">{teamTrainees.length}</span>
                    <span className="stat-label">Teammates</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">{teamSessions.length}</span>
                    <span className="stat-label">Sessions</span>
                  </div>
                </div>
              </div>

              {/* CARD CONTENT SPLIT GRID */}
              <div className="team-card-content">
                {/* LEFT: TEAMMATES */}
                <div className="team-section">
                  <div className="section-header">
                    <h3>Teammates</h3>
                    <span className="count-badge">{teamTrainees.length}</span>
                  </div>
                  <div className="item-list">
                    {teamTrainees.length === 0 ? (
                      <p className="empty-text">No teammates assigned.</p>
                    ) : (
                      teamTrainees.map((trainee) => (
                        <div key={trainee.id} className="trainee-item">
                          <div className="avatar">
                            {trainee?.name ? trainee.name.charAt(0).toUpperCase() : "T"}
                          </div>
                          <div className="trainee-info">
                            <span className="trainee-name">{trainee.name}</span>
                            <span className="trainee-email">{trainee.email}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* RIGHT: SESSIONS */}
                <div className="team-section">
                  <div className="section-header">
                    <h3>Sessions</h3>
                    <span className="count-badge">{teamSessions.length}</span>
                  </div>
                  <div className="item-list">
                    {teamSessions.length === 0 ? (
                      <p className="empty-text">No sessions scheduled.</p>
                    ) : (
                      teamSessions.map((session) => {
                        const status = (session?.status || "Upcoming").toLowerCase();
                        return (
                          <div key={session.id} className="session-item">
                            <div className="session-info">
                              <span className="session-title">{session.title}</span>
                              <span className="session-time">
                                {session.date} {session.time}
                              </span>
                            </div>
                            <span className={`status-badge ${status}`}>
                              {session.status || "Upcoming"}
                            </span>
                          </div>
                        );
                      })
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
};

export default TraineeTeams;