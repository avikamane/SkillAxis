import { useNavigate } from "react-router-dom";

import {
  FaUserPlus,
  FaCalendarPlus,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaEye,
} from "react-icons/fa";

import { sessions } from "../../Info/sessionData";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // Currently based on your existing project data
  const totalTrainers = 5;
  const totalTrainees = 15;
  const totalUsers = totalTrainers + totalTrainees;

  // Use sessionData instead of hardcoded sessions
  const totalSessions = sessions.length;

  // Show recent/upcoming sessions
  const displayedSessions = sessions.slice(0, 5);

  // Quick action handlers
  const handleAddTrainer = () => {
    navigate("/admin/trainers");
  };

  const handleAddTrainee = () => {
    navigate("/admin/trainees");
  };

  const handleCreateSession = () => {
    navigate("/admin/sessions");
  };

  // View session
  const handleViewSession = (sessionId) => {
    navigate(`/admin/sessions?view=${sessionId}`);
  };

  return (
    <div className="dashboard">

      {/* ===============================
          WELCOME SECTION
      =============================== */}

      <div className="dashboard-header">
        <h1>WELCOME, ADMIN</h1>

        <p>
          Here's what's happening in your training system today.
        </p>
      </div>


      {/* ===============================
          STATISTICS
      =============================== */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-content">
            <h3>Total users</h3>
            <span>{totalUsers}</span>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-content">
            <h3>Trainers</h3>

            <span className="trainer-number">
              {totalTrainers}
            </span>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-content">
            <h3>Trainees</h3>

            <span className="trainee-number">
              {totalTrainees}
            </span>
          </div>
        </div>


        <div className="stat-card active-stat">
          <div className="stat-content">
            <h3>Total Sessions</h3>

            <span className="session-number">
              {totalSessions}
            </span>
          </div>
        </div>

      </div>


      {/* ===============================
          MIDDLE SECTION
      =============================== */}

      <div className="dashboard-middle">

        {/* Recent Activities */}

        <div className="recent-activities dashboard-box">

          <h2>Recent Activities</h2>

          <div className="activity">
            <FaUserPlus />

            <span>
              New Trainer Added
            </span>
          </div>


          <div className="activity">
            <FaCalendarPlus />

            <span>
              Session Scheduled
            </span>
          </div>


          <div className="activity">
            <FaUserGraduate />

            <span>
              Trainee Management Updated
            </span>
          </div>

        </div>


        {/* Quick Actions */}

        <div className="quick-actions dashboard-box">

          <h2>Quick Actions</h2>

          <div className="action-buttons">

            <button
              className="action-btn add-trainer"
              onClick={handleAddTrainer}
            >
              <FaUserPlus />

              <span>
                Add Trainer
              </span>
            </button>


            <button
              className="action-btn add-trainee"
              onClick={handleAddTrainee}
            >
              <FaUserGraduate />

              <span>
                Add Trainee
              </span>
            </button>


            <button
              className="action-btn create-session"
              onClick={handleCreateSession}
            >
              <FaCalendarPlus />

              <span>
                Create Session
              </span>
            </button>

          </div>

        </div>

      </div>


      {/* ===============================
          RECENT / UPCOMING SESSIONS
      =============================== */}

      <div className="sessions-section">

        <h2>
          Recent/Upcoming Sessions
        </h2>


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

              {displayedSessions.map((session) => (

                <tr key={session.id}>

                  {/* Session */}

                  <td>
                    {session.title}
                  </td>


                  {/* Trainer */}

                  <td>
                    Trainer #{session.trainerId}
                  </td>


                  {/* Date */}

                  <td>
                    {session.date}
                  </td>


                  {/* Time */}

                  <td>
                    {session.startTime}
                    {" - "}
                    {session.endTime}
                  </td>


                  {/* Status */}

                  <td>

                    <span
                      className={`status ${
                        session.status.toLowerCase()
                      }`}
                    >

                      <span className="status-dot"></span>

                      {session.status}

                    </span>

                  </td>


                  {/* Action */}

                  <td>

                    <button
                      className="view-btn"
                      onClick={() =>
                        handleViewSession(session.id)
                      }
                    >
                      <FaEye />
                      {" "}
                      View
                    </button>

                  </td>

                </tr>

              ))}


              {/* No sessions */}

              {displayedSessions.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No sessions available.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;