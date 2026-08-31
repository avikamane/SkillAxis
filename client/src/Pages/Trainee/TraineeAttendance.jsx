import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarCheck,
  FaSearch,
  FaDownload,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";

import {
  traineeAttendanceInfo,
  attendanceRecords,
  monthlyTrends,
} from "../../Info/attendanceData";

import "./TraineeAttendance.css";

function TraineeAttendance() {
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Summary Metrics Calculations
  const totalSessions = attendanceRecords.length;
  const presentCount = attendanceRecords.filter((r) => r.status === "Present").length;
  const absentCount = attendanceRecords.filter((r) => r.status === "Absent").length;
  const lateCount = attendanceRecords.filter((r) => r.status === "Late").length;
  const leaveCount = attendanceRecords.filter((r) => r.status === "Leave").length;

  const attendancePercentage = totalSessions > 0
    ? (((presentCount + lateCount * 0.5) / totalSessions) * 100).toFixed(1)
    : 0;

  const isBelowThreshold = attendancePercentage < traineeAttendanceInfo.minimumRequirement;

  // Filter Records
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.session.toLowerCase().includes(search.toLowerCase()) ||
      record.trainer.toLowerCase().includes(search.toLowerCase());

    const matchesMonth = selectedMonth === "All" || record.month === selectedMonth;
    const matchesStatus = selectedStatus === "All" || record.status === selectedStatus;

    return matchesSearch && matchesMonth && matchesStatus;
  });

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="attendance-page">
      {/* HEADER & TRAINEE INFO */}
      <div className="attendance-header-card">
        <div>
          <h1>Attendance Dashboard</h1>
          <p>Monitor your session presence, track requirements, and review records.</p>
        </div>

        <div className="trainee-meta-tags">
          <div className="meta-tag">
            <span>Trainee:</span> <strong>{traineeAttendanceInfo.name}</strong>
          </div>
          <div className="meta-tag">
            <span>ID:</span> <strong>{traineeAttendanceInfo.traineeId}</strong>
          </div>
          <div className="meta-tag">
            <span>Course:</span> <strong>{traineeAttendanceInfo.course}</strong>
          </div>
          <div className="meta-tag">
            <span>Batch:</span> <strong>{traineeAttendanceInfo.batch}</strong>
          </div>
        </div>
      </div>

      {/* ALERT WARNING (If below 75%) */}
      {isBelowThreshold && (
        <div className="attendance-warning-banner">
          <FaExclamationTriangle className="warning-icon" />
          <div>
            <strong>Attendance Warning:</strong> Your current attendance is{" "}
            <strong>{attendancePercentage}%</strong>, which is below the minimum required{" "}
            <strong>{traineeAttendanceInfo.minimumRequirement}%</strong>. Please ensure regular attendance to avoid debarment.
          </div>
        </div>
      )}

      {/* 1. ATTENDANCE SUMMARY CARDS */}
      <div className="attendance-stats-grid">
        <div className="att-stat-card">
          <div className="att-stat-icon total-icon">
            <FaCalendarCheck />
          </div>
          <div className="att-stat-info">
            <span>Total Sessions</span>
            <strong>{totalSessions}</strong>
          </div>
        </div>

        <div className="att-stat-card">
          <div className="att-stat-icon present-icon">
            <FaCheckCircle />
          </div>
          <div className="att-stat-info">
            <span>Present</span>
            <strong className="text-present">{presentCount}</strong>
          </div>
        </div>

        <div className="att-stat-card">
          <div className="att-stat-icon absent-icon">
            <FaTimesCircle />
          </div>
          <div className="att-stat-info">
            <span>Absent</span>
            <strong className="text-absent">{absentCount}</strong>
          </div>
        </div>

        <div className="att-stat-card">
          <div className="att-stat-icon late-icon">
            <FaClock />
          </div>
          <div className="att-stat-info">
            <span>Late / Leave</span>
            <strong className="text-late">{lateCount + leaveCount}</strong>
          </div>
        </div>

        {/* Circular Progress Representation */}
        <div className="att-stat-card percentage-card">
          <div className="percentage-circle">
            <span className="percentage-val">{attendancePercentage}%</span>
          </div>
          <div className="att-stat-info">
            <span>Overall Attendance</span>
            <small>Req: {traineeAttendanceInfo.minimumRequirement}%</small>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: MONTHLY TRENDS & ACTIONS */}
      <div className="attendance-middle-grid">
        <div className="trend-card">
          <h3>
            <FaChartLine /> Attendance Monthly Trends
          </h3>
          <div className="trend-bars">
            {monthlyTrends.map((t) => (
              <div className="trend-item" key={t.month}>
                <div className="trend-label">
                  <span>{t.month}</span>
                  <strong>{t.percentage}%</strong>
                </div>
                <div className="trend-progress-track">
                  <div
                    className="trend-progress-fill"
                    style={{ width: `${t.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="download-action-box">
          <h3>Attendance Report</h3>
          <p>Export your full official attendance sheet with timestamps and signatures.</p>
          <button className="download-report-btn" onClick={handleDownload}>
            <FaDownload /> Download Attendance Report
          </button>
        </div>
      </div>

      {/* 2. FILTERS & SEARCH */}
      <div className="attendance-filter-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by session or trainer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-selects">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Months</option>
            <option value="August">August</option>
            <option value="July">July</option>
            <option value="June">June</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Leave">Leave</option>
          </select>
        </div>
      </div>

      {/* 3. ATTENDANCE HISTORY TABLE */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Session</th>
              <th>Trainer</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>
                    <strong>{record.session}</strong>
                  </td>
                  <td>{record.trainer}</td>
                  <td>{record.time}</td>
                  <td>
                    <span className={`status-pill ${record.status.toLowerCase()}`}>
                      <span className="dot"></span>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-records-row">
                  No attendance records found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TraineeAttendance;