import { 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaChartLine, 
  FaClipboardList, 
  FaEye 
} from "react-icons/fa";

// Import mock data directly from Info directory
import { sessions } from "../../Info/sessionData";
import { trainees } from "../../Info/traineeData";
import { trainers } from "../../Info/trainerData";

import "./TraineeDashboard.css";

const TraineeDashboard = () => {
  // Safe array fallbacks
  const sessionsList = sessions || [];
  const traineesList = trainees || [];
  const trainersList = trainers || [];

  // Current logged-in trainee ID (Aarav Sharma)
  const currentTraineeId = 1;
  const currentTrainee = traineesList.find((t) => t.id === currentTraineeId);

  // Filter sessions assigned to current trainee
  const assignedSessions = sessionsList.filter((session) =>
    Array.isArray(session?.traineeIds) && session.traineeIds.includes(currentTraineeId)
  );

  // Use assigned sessions if available, otherwise display all imported sessions
  const displaySessions = assignedSessions.length > 0 ? assignedSessions : sessionsList;

  // Dynamic Statistics
  const upcomingCount = displaySessions.filter(
    (s) => s?.status && String(s.status).toLowerCase() === "upcoming"
  ).length;

  const completedCount = displaySessions.filter(
    (s) => s?.status && String(s.status).toLowerCase() === "completed"
  ).length;

  // Helper to map trainerId to Trainer Name safely
  const getTrainerName = (trainerId) => {
    const trainer = trainersList.find((t) => t.id === trainerId);
    return trainer?.name || "Unassigned";
  };

  return (
    <div className="dashboard">
      {/* WELCOME SECTION */}
      <section className="welcome-section">
        <h1>WELCOME, {currentTrainee?.name ? currentTrainee.name.toUpperCase() : "TRAINEE"}</h1>
        <p>Keep learning, track your progress, and stay on top of your training.</p>
      </section>

      {/* STATS SECTION */}
      <section className="stats-container">
        <div className="stat-card">
          <div className="stat-icon blue-icon">
            <FaCalendarAlt />
          </div>
          <div>
            <h2>Upcoming Sessions</h2>
            <span className="stat-number blue">{upcomingCount}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green-icon">
            <FaCheckCircle />
          </div>
          <div>
            <h2>Completed Sessions</h2>
            <span className="stat-number green">{completedCount}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow-icon">
            <FaChartLine />
          </div>
          <div>
            <h2>Attendance</h2>
            <span className="stat-number yellow">92%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-icon">
            <FaClipboardList />
          </div>
          <div>
            <h2>Assessments</h2>
            <span className="stat-number purple">5</span>
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION */}
      <section className="middle-section">
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            <div className="activity-item">
              <span className="activity-icon">✔</span>
              <span>Session completed</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📋</span>
              <span>Assessment result available</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✔</span>
              <span>Attendance marked</span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-container">
            <button className="action-card action-blue">
              <FaEye />
              <span>View My Sessions</span>
            </button>
            <button className="action-card action-yellow">
              <FaClipboardList />
              <span>View Assessments</span>
            </button>
            <button className="action-card action-purple">
              <FaCalendarAlt />
              <span>View Resources</span>
            </button>
          </div>
        </div>
      </section>

      {/* SESSIONS TABLE */}
      <section className="sessions-section">
        <h2>Recent/Upcoming Sessions</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Session</th>
                <th>Trainer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displaySessions.map((session, index) => {
                const statusString = session?.status ? String(session.status) : "Upcoming";
                const isUpcoming = statusString.toLowerCase() === "upcoming";

                return (
                  <tr key={session?.id || index}>
                    <td>{session?.title || "Untitled Session"}</td>
                    <td>{getTrainerName(session?.trainerId)}</td>
                    <td>{session?.date || "N/A"}</td>
                    <td>{session?.time || "N/A"}</td>
                    <td>
                      <span className={`status ${isUpcoming ? "upcoming" : "completed"}`}>
                        {statusString}
                      </span>
                    </td>
                    <td>
                      <button className="view-button">View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TraineeDashboard;