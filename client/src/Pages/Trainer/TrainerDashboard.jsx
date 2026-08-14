import {
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaUserCheck,
  FaEye,
  FaTasks,
} from "react-icons/fa";

import { trainers } from "../../Info/trainerData";
import { trainees } from "../../Info/traineeData";
import { sessions } from "../../Info/sessionData";

import "./TrainerDashboard.css";

// =========================================
// CURRENT TRAINER
// =========================================

// Temporary for demo.
// Later this will come from login/authentication.
const currentTrainerId = 1;

// =========================================
// ACTIVITY ICON
// =========================================

function ActivityIcon({ type }) {
  switch (type) {
    case "session":
      return <FaCalendarAlt />;

    case "attendance":
      return <FaUserCheck />;

    case "trainee":
      return <FaUsers />;

    case "assessment":
      return <FaTasks />;

    default:
      return <FaCheckCircle />;
  }
}

// =========================================
// TRAINER DASHBOARD
// =========================================

function TrainerDashboard() {
  // Find the current trainer
  const currentTrainer = trainers.find(
    (trainer) => trainer.id === currentTrainerId,
  );

  // =========================================
  // TRAINER'S SESSIONS
  // =========================================

  const mySessions = sessions.filter(
    (session) => session.trainerId === currentTrainerId,
  );

  // =========================================
  // UPCOMING SESSIONS
  // =========================================

  const upcomingSessions = mySessions.filter(
    (session) => session.status === "Upcoming",
  );

  // =========================================
  // COMPLETED SESSIONS
  // =========================================

  const completedSessions = mySessions.filter(
    (session) => session.status === "Completed",
  );

  // =========================================
  // TRAINER'S TRAINEES
  // =========================================

  const traineeIds = [
    ...new Set(mySessions.flatMap((session) => session.traineeIds)),
  ];

  const myTrainees = trainees.filter((trainee) =>
    traineeIds.includes(trainee.id),
  );

  // =========================================
  // RECENT ACTIVITIES
  // =========================================

  const recentActivities = [
    {
      id: 1,
      type: "attendance",
      message: "Attendance marked",
    },
    {
      id: 2,
      type: "session",
      message: "Session completed",
    },
    {
      id: 3,
      type: "trainee",
      message: "New trainee assigned",
    },
  ];

  // =========================================
  // RECENT + UPCOMING SESSIONS
  // =========================================

  const displaySessions = mySessions;

  return (
    <div className="trainer-dashboard">
      {/* =========================
          WELCOME
      ========================= */}

      <section className="welcome-section">
        <h1>
          WELCOME,{" "}
          {currentTrainer ? currentTrainer.name.toUpperCase() : "TRAINER"}
        </h1>

        <p>Here's an overview of your training activities.</p>
      </section>

      {/* =========================
          STATISTICS
      ========================= */}

      <section className="stats-container">
        {/* My Sessions */}

        <div className="stat-card">
          <div className="stat-icon blue-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h2>My Sessions</h2>

            <span className="stat-number blue">{mySessions.length}</span>
          </div>
        </div>

        {/* Upcoming Sessions */}

        <div className="stat-card">
          <div className="stat-icon green-icon">
            <FaClock />
          </div>

          <div>
            <h2>Upcoming Sessions</h2>

            <span className="stat-number green">{upcomingSessions.length}</span>
          </div>
        </div>

        {/* Completed Sessions */}

        <div className="stat-card">
          <div className="stat-icon yellow-icon">
            <FaCheckCircle />
          </div>

          <div>
            <h2>Completed Sessions</h2>

            <span className="stat-number yellow">
              {completedSessions.length}
            </span>
          </div>
        </div>

        {/* Assigned Trainees */}

        <div className="stat-card">
          <div className="stat-icon purple-icon">
            <FaUsers />
          </div>

          <div>
            <h2>Assigned Trainees</h2>

            <span className="stat-number purple">{myTrainees.length}</span>
          </div>
        </div>
      </section>

      {/* =========================
          MIDDLE SECTION
      ========================= */}

      <section className="middle-section">
        {/* =========================
            RECENT ACTIVITIES
        ========================= */}

        <div className="recent-activities">
          <h2>Recent Activities</h2>

          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-icon">
                  <ActivityIcon type={activity.type} />
                </div>

                <span>{activity.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <div className="quick-actions">
          <h2>Quick Actions</h2>

          <div className="actions-container">
            {/* Mark Attendance */}

            <button className="action-card action-blue" type="button">
              <FaUserCheck />

              <span>
                Mark
                <br />
                Attendance
              </span>
            </button>

            {/* View Trainees */}

            <button className="action-card action-yellow" type="button">
              <FaUsers />

              <span>
                View
                <br />
                Trainees
              </span>
            </button>

            {/* View Sessions */}

            <button className="action-card action-purple" type="button">
              <FaEye />

              <span>
                View My
                <br />
                Sessions
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          SESSIONS
      ========================= */}

      <section className="sessions-section">
        <h2>Recent/Upcoming Sessions</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Session</th>

                <th>Trainees</th>

                <th>Date</th>

                <th>Time</th>

                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {displaySessions.map((session) => (
                <tr key={session.id}>
                  {/* Session */}

                  <td>{session.title}</td>

                  {/* Number of trainees */}

                  <td>{session.traineeIds.length}</td>

                  {/* Date */}

                  <td>{session.date}</td>

                  {/* Time */}

                  <td>{session.time}</td>

                  {/* Status */}

                  <td>
                    <span className={`status ${session.status.toLowerCase()}`}>
                      {session.status}
                    </span>
                  </td>

                  {/* Action */}

                  <td>
                    <button className="view-button" type="button">
                      <FaEye />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default TrainerDashboard;
