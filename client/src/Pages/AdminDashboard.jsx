import {
  FaUserPlus,
  FaCalendarPlus,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";

import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">

      {/* Welcome Section */}
      <div className="dashboard-header">
        <h1>WELCOME, ADMIN</h1>
        <p>Here's what's happening in your training system today.</p>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-content">
            <h3>Total users</h3>
            <span>20</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Trainers</h3>
            <span className="trainer-number">5</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Trainees</h3>
            <span className="trainee-number">15</span>
          </div>
        </div>

        <div className="stat-card active-stat">
          <div className="stat-content">
            <h3>Total Sessions</h3>
            <span className="session-number">3</span>
          </div>
        </div>

      </div>

      {/* Middle Section */}
      <div className="dashboard-middle">

        {/* Recent Activities */}
        <div className="recent-activities dashboard-box">
          <h2>Recent Activities</h2>

          <div className="activity">
            <FaUserPlus />
            <span>New Trainer Added</span>
          </div>

          <div className="activity">
            <FaCalendarPlus />
            <span>Session Scheduled</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions dashboard-box">
          <h2>Quick Actions</h2>

          <div className="action-buttons">

            <button className="action-btn add-trainer">
              <FaUserPlus />
              <span>Add Trainer</span>
            </button>

            <button className="action-btn add-trainee">
              <FaUserGraduate />
              <span>Add Trainee</span>
            </button>

            <button className="action-btn create-session">
              <FaCalendarPlus />
              <span>Create Session</span>
            </button>

          </div>
        </div>

      </div>

      {/* Sessions */}
      <div className="sessions-section">

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

              <tr>
                <td>Node js</td>
                <td>Trisha Pandey</td>
                <td>09-08-26</td>
                <td>10:00 am</td>

                <td>
                  <span className="status upcoming">
                    <span className="status-dot"></span>
                    Upcoming
                  </span>
                </td>

                <td>
                  <button className="view-btn">view</button>
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;