import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarCheck,
  FaLock,
  FaSave,
  FaUsers,
} from "react-icons/fa";

import { trainees } from "../../Info/traineeData";
import { trainerAttendanceData } from "../../Info/attendanceData";

import "./TrainerAttendance.css";

function TrainerAttendance() {
  // Temporary logged-in trainer
  const loggedInTrainerId = 1;

  // Only sessions belonging to this trainer
  const trainerSessions = trainerAttendanceData.filter(
    (session) => session.trainerId === loggedInTrainerId,
  );

  const [selectedSessionId, setSelectedSessionId] = useState(
    trainerSessions[0]?.sessionId || null,
  );

  const [attendance, setAttendance] = useState({});

  const [savedSessions, setSavedSessions] = useState(() => {
    const saved = {};

    trainerSessions.forEach((session) => {
      saved[session.sessionId] = session.isSaved;
    });

    return saved;
  });

  const selectedSession = trainerSessions.find(
    (session) => session.sessionId === Number(selectedSessionId),
  );

  // =========================================
  // GET CURRENT STATUS
  // =========================================

  const getStatus = (sessionId, traineeId, originalStatus) => {
    if (
      attendance[sessionId] &&
      attendance[sessionId][traineeId] !== undefined
    ) {
      return attendance[sessionId][traineeId];
    }

    return originalStatus;
  };

  // =========================================
  // UPDATE ATTENDANCE
  // =========================================

  const handleAttendanceChange = (traineeId, status) => {
    if (!selectedSession) return;

    if (savedSessions[selectedSession.sessionId]) {
      return;
    }

    // Upcoming sessions cannot be marked
    if (selectedSession.status === "Upcoming") {
      return;
    }

    setAttendance((prev) => ({
      ...prev,

      [selectedSession.sessionId]: {
        ...(prev[selectedSession.sessionId] || {}),
        [traineeId]: status,
      },
    }));
  };

  // =========================================
  // SAVE ATTENDANCE
  // =========================================

  const handleSave = () => {
    if (!selectedSession) return;

    if (selectedSession.status === "Upcoming") {
      return;
    }

    const sessionAttendance = attendance[selectedSession.sessionId] || {};

    const hasEmptyAttendance = selectedSession.trainees.some((trainee) => {
      const status = getStatus(
        selectedSession.sessionId,
        trainee.traineeId,
        trainee.status,
      );

      return !status;
    });

    if (hasEmptyAttendance) {
      alert("Please mark attendance for every trainee before saving.");
      return;
    }

    setSavedSessions((prev) => ({
      ...prev,
      [selectedSession.sessionId]: true,
    }));
  };

  // =========================================
  // ATTENDANCE OVERVIEW
  // =========================================

  const allRecords = trainerSessions.flatMap((session) =>
    (session.trainees || []).map((trainee) => ({
      ...trainee,
      sessionId: session.sessionId,

      status: getStatus(session.sessionId, trainee.traineeId, trainee.status),
    })),
  );

  // Only records that have been marked
  const markedRecords = allRecords.filter((record) => record.status);

  const totalMarked = markedRecords.length;

  const presentCount = markedRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const absentCount = markedRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const lateCount = markedRecords.filter(
    (record) => record.status === "Late",
  ).length;

  const leaveCount = markedRecords.filter(
    (record) => record.status === "Leave",
  ).length;

  const attendancePercentage =
    totalMarked > 0
      ? (((presentCount + lateCount * 0.5) / totalMarked) * 100).toFixed(1)
      : "0.0";

  // =========================================
  // FIND TRAINEE
  // =========================================

  const getTrainee = (traineeId) => {
    return trainees.find((trainee) => trainee.id === traineeId);
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="trainer-attendance-page">
      {/* HEADER */}

      <div className="attendance-page-header">
        <div>
          <h1>Attendance</h1>
          <p>Mark and review attendance for your assigned sessions.</p>
        </div>
      </div>

      {/* =========================================
          ATTENDANCE OVERVIEW
          ========================================= */}

      <section className="attendance-overview">
        <div className="overview-header">
          <div>
            <h2>Attendance Overview</h2>
            <p>Overview of attendance for your assigned trainees.</p>
          </div>

          <FaChartIcon />
        </div>

        <div className="overview-cards">
          <div className="overview-card">
            <div className="overview-icon total">
              <FaCalendarCheck />
            </div>

            <div>
              <span>Marked Records</span>
              <strong>{totalMarked}</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon present">
              <FaCheckCircle />
            </div>

            <div>
              <span>Present</span>
              <strong>{presentCount}</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon absent">
              <FaTimesCircle />
            </div>

            <div>
              <span>Absent</span>
              <strong>{absentCount}</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon late">
              <FaClock />
            </div>

            <div>
              <span>Late</span>
              <strong>{lateCount}</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon leave">
              <FaUsers />
            </div>

            <div>
              <span>Leave</span>
              <strong>{leaveCount}</strong>
            </div>
          </div>

          <div className="overview-card percentage">
            <div className="percentage-circle">{attendancePercentage}%</div>

            <div>
              <span>Attendance Rate</span>
              <strong>{attendancePercentage}%</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SESSION SELECTOR
          ========================================= */}

      <section className="attendance-section">
        <div className="section-header">
          <div>
            <h2>Mark Attendance</h2>
            <p>Select a session to view its trainees.</p>
          </div>

          <select
            value={selectedSessionId || ""}
            onChange={(e) => setSelectedSessionId(Number(e.target.value))}
            className="session-dropdown"
          >
            {trainerSessions.map((session) => (
              <option key={session.sessionId} value={session.sessionId}>
                {session.session} — {session.date}
              </option>
            ))}
          </select>
        </div>

        {/* =========================================
            SESSION INFO
            ========================================= */}

        {selectedSession && (
          <div className="selected-session-info">
            <div>
              <h3>{selectedSession.session}</h3>

              <p>
                {selectedSession.date} • {selectedSession.time}
              </p>
            </div>

            <div
              className={`session-lock-status ${
                selectedSession.status === "Upcoming"
                  ? "locked"
                  : savedSessions[selectedSession.sessionId]
                    ? "locked"
                    : "open"
              }`}
            >
              {selectedSession.status === "Upcoming" ||
              savedSessions[selectedSession.sessionId] ? (
                <>
                  <FaLock />
                  Locked
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Open
                </>
              )}
            </div>
          </div>
        )}

        {/* =========================================
            TRAINEE TABLE
            ========================================= */}

        {selectedSession && (
          <div className="attendance-table-container">
            <table className="trainer-attendance-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Trainee</th>
                  <th>Email</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {selectedSession.trainees.map((traineeRecord, index) => {
                  const trainee = getTrainee(traineeRecord.traineeId);

                  const currentStatus = getStatus(
                    selectedSession.sessionId,
                    traineeRecord.traineeId,
                    traineeRecord.status,
                  );

                  const isLocked =
                    selectedSession.status === "Upcoming" ||
                    savedSessions[selectedSession.sessionId];

                  return (
                    <tr key={traineeRecord.traineeId}>
                      <td>{index + 1}</td>

                      <td>
                        <strong>{trainee?.name || "Unknown Trainee"}</strong>
                      </td>

                      <td>{trainee?.email || "-"}</td>

                      <td>
                        <div className="attendance-options">
                          <button
                            disabled={isLocked}
                            className={
                              currentStatus === "Present"
                                ? "attendance-btn present active"
                                : "attendance-btn present"
                            }
                            onClick={() =>
                              handleAttendanceChange(
                                traineeRecord.traineeId,
                                "Present",
                              )
                            }
                          >
                            <FaCheckCircle />
                            Present
                          </button>

                          <button
                            disabled={isLocked}
                            className={
                              currentStatus === "Absent"
                                ? "attendance-btn absent active"
                                : "attendance-btn absent"
                            }
                            onClick={() =>
                              handleAttendanceChange(
                                traineeRecord.traineeId,
                                "Absent",
                              )
                            }
                          >
                            <FaTimesCircle />
                            Absent
                          </button>

                          <button
                            disabled={isLocked}
                            className={
                              currentStatus === "Late"
                                ? "attendance-btn late active"
                                : "attendance-btn late"
                            }
                            onClick={() =>
                              handleAttendanceChange(
                                traineeRecord.traineeId,
                                "Late",
                              )
                            }
                          >
                            <FaClock />
                            Late
                          </button>

                          <button
                            disabled={isLocked}
                            className={
                              currentStatus === "Leave"
                                ? "attendance-btn leave active"
                                : "attendance-btn leave"
                            }
                            onClick={() =>
                              handleAttendanceChange(
                                traineeRecord.traineeId,
                                "Leave",
                              )
                            }
                          >
                            Leave
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================================
            SAVE BUTTON
            ========================================= */}

        {selectedSession && (
          <div className="attendance-actions">
            {selectedSession.status === "Upcoming" ? (
              <div className="locked-message">
                <FaLock />
                Attendance will be available after the session.
              </div>
            ) : savedSessions[selectedSession.sessionId] ? (
              <div className="locked-message">
                <FaLock />
                Attendance has been saved and can no longer be changed.
              </div>
            ) : (
              <button className="save-attendance-btn" onClick={handleSave}>
                <FaSave />
                Save Attendance
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/*
  Small component used only for the overview heading.
  Keeping it here avoids adding another import.
*/
function FaChartIcon() {
  return (
    <span className="overview-heading-icon">
      <FaCalendarCheck />
    </span>
  );
}

export default TrainerAttendance;
