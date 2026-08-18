import { useMemo, useState } from "react";

import {
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaSearch,
  FaTimes,
  FaUserGraduate,
  FaUsers,
  FaExclamationTriangle,
} from "react-icons/fa";

import { trainees } from "../../Info/traineeData";
import { assessments } from "../../Info/assessmentData";
import { sessions } from "../../Info/sessionData";
import { trainerAttendanceData } from "../../Info/attendanceData";

import "./TrainerProgress.css";

function TrainerProgress() {
  // =========================================================
  // LOGGED-IN TRAINER
  // =========================================================

  // Change this according to the logged-in trainer.
  // Later this can come from authentication/context.
  const loggedInTrainerId = 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainee, setSelectedTrainee] = useState(null);

  // =========================================================
  // TRAINER ASSESSMENTS
  // =========================================================

  const trainerAssessments = useMemo(() => {
    return assessments.filter(
      (assessment) =>
        Number(assessment.trainerId) === Number(loggedInTrainerId),
    );
  }, [loggedInTrainerId]);

  // =========================================================
  // TRAINER SESSIONS
  // =========================================================

  const trainerSessions = useMemo(() => {
    return sessions.filter(
      (session) => Number(session.trainerId) === Number(loggedInTrainerId),
    );
  }, [loggedInTrainerId]);

  // =========================================================
  // GET TRAINEE IDS FROM TRAINER SESSIONS
  // =========================================================

  const trainerTraineeIds = useMemo(() => {
    const traineeIds = [];

    trainerSessions.forEach((session) => {
      /*
       * Supports:
       *
       * traineeIds: [1, 2, 3]
       *
       * OR
       *
       * trainees: [1, 2, 3]
       *
       * OR
       *
       * trainees: [
       *   { id: 1 },
       *   { id: 2 }
       * ]
       *
       * OR
       *
       * traineeId: 1
       */

      if (Array.isArray(session.traineeIds)) {
        traineeIds.push(...session.traineeIds);
      }

      if (Array.isArray(session.trainees)) {
        session.trainees.forEach((trainee) => {
          if (typeof trainee === "object" && trainee !== null) {
            if (trainee.id !== undefined) {
              traineeIds.push(trainee.id);
            }
          } else {
            traineeIds.push(trainee);
          }
        });
      }

      if (session.traineeId !== undefined) {
        traineeIds.push(session.traineeId);
      }
    });

    // Remove duplicates
    return [...new Set(traineeIds.map((id) => Number(id)))];
  }, [trainerSessions]);

  // =========================================================
  // TRAINER TRAINEES
  // =========================================================

  const trainerTrainees = useMemo(() => {
    return trainees.filter((trainee) =>
      trainerTraineeIds.includes(Number(trainee.id)),
    );
  }, [trainerTraineeIds]);

  // =========================================================
  // GET SESSION
  // =========================================================

  const getSession = (sessionId) => {
    return trainerSessions.find(
      (session) => Number(session.id) === Number(sessionId),
    );
  };

  // =========================================================
  // GET TRAINEE ASSESSMENT RESULTS
  // =========================================================

  const getTraineeResults = (traineeId) => {
    const results = [];

    trainerAssessments.forEach((assessment) => {
      const performance = assessment.performance || [];

      const result = performance.find(
        (item) => Number(item.traineeId) === Number(traineeId),
      );

      if (result) {
        results.push({
          assessment,
          result,
        });
      }
    });

    return results;
  };

  // =========================================================
  // GET TRAINEE SESSIONS
  // =========================================================

  const getTraineeSessions = (traineeId) => {
    return trainerSessions.filter((session) => {
      // traineeIds: [1, 2, 3]
      if (Array.isArray(session.traineeIds)) {
        return session.traineeIds.some(
          (id) => Number(id) === Number(traineeId),
        );
      }

      // trainees: [1, 2, 3]
      if (Array.isArray(session.trainees)) {
        return session.trainees.some((trainee) => {
          if (typeof trainee === "object" && trainee !== null) {
            return Number(trainee.id) === Number(traineeId);
          }

          return Number(trainee) === Number(traineeId);
        });
      }

      // traineeId: 1
      if (session.traineeId !== undefined) {
        return Number(session.traineeId) === Number(traineeId);
      }

      return false;
    });
  };

  // =========================================================
  // GET TRAINEE ATTENDANCE
  // =========================================================

  const getTraineeAttendance = (traineeId) => {
    const trainerAttendance = trainerAttendanceData.filter(
      (attendance) =>
        Number(attendance.trainerId) === Number(loggedInTrainerId),
    );

    const records = [];

    trainerAttendance.forEach((attendance) => {
      const trainee = attendance.trainees?.find(
        (item) => Number(item.traineeId) === Number(traineeId),
      );

      if (trainee) {
        records.push({
          ...attendance,
          attendanceStatus: trainee.status,
        });
      }
    });

    return records;
  };

  // =========================================================
  // CALCULATE ATTENDANCE PERCENTAGE
  // =========================================================

  const getAttendancePercentage = (traineeId) => {
    const attendanceRecords = getTraineeAttendance(traineeId);

    // Only count sessions where attendance has actually been marked
    const markedRecords = attendanceRecords.filter(
      (record) =>
        record.attendanceStatus !== null &&
        record.attendanceStatus !== undefined,
    );

    if (markedRecords.length === 0) {
      return 0;
    }

    const presentCount = markedRecords.filter(
      (record) => record.attendanceStatus.toLowerCase() === "present",
    ).length;

    return (presentCount / markedRecords.length) * 100;
  };

  // =========================================================
  // CALCULATE TRAINEE PROGRESS
  // =========================================================

  const getTraineeProgress = (trainee) => {
    const results = getTraineeResults(trainee.id);

    const completedAssessments = results.filter(
      ({ result }) => result.score !== null && result.score !== undefined,
    );

    // =========================================================
    // ASSESSMENT PERFORMANCE
    // =========================================================

    let averagePercentage = 0;

    if (completedAssessments.length > 0) {
      const totalPercentage = completedAssessments.reduce(
        (total, { assessment, result }) => {
          if (!assessment.totalMarks || result.score === null) {
            return total;
          }

          return (
            total + (Number(result.score) / Number(assessment.totalMarks)) * 100
          );
        },
        0,
      );

      averagePercentage = totalPercentage / completedAssessments.length;
    }

    // =========================================================
    // ASSESSMENT COMPLETION
    // =========================================================

    const totalAssessments = trainerAssessments.length;

    const assessmentCompletion =
      totalAssessments > 0
        ? (completedAssessments.length / totalAssessments) * 100
        : 0;

    // =========================================================
    // ATTENDANCE
    // =========================================================

    const attendanceRecords = getTraineeAttendance(trainee.id);

    const markedAttendance = attendanceRecords.filter(
      (record) =>
        record.attendanceStatus !== null &&
        record.attendanceStatus !== undefined,
    );

    const presentCount = markedAttendance.filter(
      (record) => record.attendanceStatus.toLowerCase() === "present",
    ).length;

    const attendancePercentage =
      markedAttendance.length > 0
        ? (presentCount / markedAttendance.length) * 100
        : 0;

    // =========================================================
    // OVERALL PROGRESS
    // =========================================================
    //
    // Assessment Performance  = 40%
    // Assessment Completion   = 30%
    // Attendance              = 30%
    //
    // =========================================================

    const overallProgress = Math.round(
      averagePercentage * 0.4 +
        assessmentCompletion * 0.3 +
        attendancePercentage * 0.3,
    );

    // =========================================================
    // STATUS
    // =========================================================

    let status = "On Track";

    if (overallProgress < 40) {
      status = "Needs Attention";
    } else if (overallProgress < 70) {
      status = "In Progress";
    }

    return {
      trainee,
      results,
      completedAssessments,
      totalAssessments,

      averagePercentage,
      assessmentCompletion,

      attendanceRecords,
      markedAttendance,
      presentCount,
      attendancePercentage,

      overallProgress,
      status,

      sessions: getTraineeSessions(trainee.id),
    };
  };

  // =========================================================
  // TRAINER TRAINEE PROGRESS
  // =========================================================

  const traineeProgress = useMemo(() => {
    return trainerTrainees
      .map((trainee) => getTraineeProgress(trainee))
      .filter((item) => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) return true;

        const name = (
          item.trainee.name ||
          item.trainee.fullName ||
          `${item.trainee.firstName || ""} ${
            item.trainee.lastName || ""
          }`.trim() ||
          `Trainee ${item.trainee.id}`
        ).toLowerCase();

        const email = (item.trainee.email || "").toLowerCase();

        return name.includes(search) || email.includes(search);
      });
  }, [searchTerm, trainerTrainees, trainerAssessments, trainerSessions]);

  // =========================================================
  // SUMMARY
  // =========================================================

  const totalTrainees = trainerTrainees.length;

  const averageProgress =
    totalTrainees > 0
      ? Math.round(
          traineeProgress.reduce(
            (total, trainee) => total + trainee.overallProgress,
            0,
          ) / totalTrainees,
        )
      : 0;

  const totalCompletedAssessments = traineeProgress.reduce(
    (total, trainee) => total + trainee.completedAssessments.length,
    0,
  );

  const traineesNeedingAttention = traineeProgress.filter(
    (trainee) => trainee.status === "Needs Attention",
  ).length;

  // =========================================================
  // TRAINEE NAME
  // =========================================================

  const getTraineeName = (trainee) => {
    return (
      trainee.name ||
      trainee.fullName ||
      `${trainee.firstName || ""} ${trainee.lastName || ""}`.trim() ||
      `Trainee ${trainee.id}`
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="trainer-progress-page">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="progress-page-header">
        <div>
          <h1>Progress</h1>

          <p>Monitor trainee performance and track assessment progress.</p>
        </div>
      </div>

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="progress-summary-grid">
        <div className="progress-summary-card">
          <div className="progress-summary-icon blue">
            <FaUsers />
          </div>

          <div>
            <span>My Trainees</span>
            <strong>{totalTrainees}</strong>
          </div>
        </div>

        <div className="progress-summary-card">
          <div className="progress-summary-icon green">
            <FaChartLine />
          </div>

          <div>
            <span>Average Progress</span>
            <strong>{averageProgress}%</strong>
          </div>
        </div>

        <div className="progress-summary-card">
          <div className="progress-summary-icon purple">
            <FaCheckCircle />
          </div>

          <div>
            <span>Assessments Completed</span>
            <strong>{totalCompletedAssessments}</strong>
          </div>
        </div>

        <div className="progress-summary-card">
          <div className="progress-summary-icon orange">
            <FaExclamationTriangle />
          </div>

          <div>
            <span>Needs Attention</span>
            <strong>{traineesNeedingAttention}</strong>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* TRAINEE PROGRESS CARD */}
      {/* ================================================= */}

      <div className="trainee-progress-card">
        <div className="trainee-progress-header">
          <div>
            <h2>My Trainee Progress</h2>

            <p>View individual trainee performance and assessment results.</p>
          </div>

          <div className="progress-search-box">
            <FaSearch />

            <input
              type="text"
              placeholder="Search trainee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        {traineeProgress.length === 0 ? (
          <div className="progress-empty">
            <FaUserGraduate />

            <h3>
              {trainerTrainees.length === 0
                ? "No trainees assigned"
                : "No trainees found"}
            </h3>

            <p>
              {trainerTrainees.length === 0
                ? "You currently have no trainees assigned to your sessions."
                : "Try changing your search."}
            </p>
          </div>
        ) : (
          <div className="trainee-progress-table-wrapper">
            <table className="trainee-progress-table">
              <thead>
                <tr>
                  <th>Trainee</th>
                  <th>Assessments</th>
                  <th>Average Score</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {traineeProgress.map((item) => {
                  const traineeName = getTraineeName(item.trainee);

                  return (
                    <tr key={item.trainee.id}>
                      {/* TRAINEE */}

                      <td>
                        <div className="trainee-cell">
                          <div className="trainee-avatar">
                            <FaUserGraduate />
                          </div>

                          <div>
                            <strong>{traineeName}</strong>

                            {item.trainee.email && (
                              <span>{item.trainee.email}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* ASSESSMENTS */}

                      <td>
                        <span className="assessment-count-text">
                          {item.completedAssessments.length}
                          {" / "}
                          {item.totalAssessments}
                        </span>
                      </td>

                      {/* AVERAGE */}

                      <td>
                        <strong className="average-score">
                          {item.averagePercentage.toFixed(1)}%
                        </strong>
                      </td>

                      {/* PROGRESS */}

                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${item.overallProgress}%`,
                              }}
                            />
                          </div>

                          <span>{item.overallProgress}%</span>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`progress-status ${item.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* VIEW */}

                      <td>
                        <button
                          className="view-progress-btn"
                          onClick={() => setSelectedTrainee(item)}
                        >
                          View Progress
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* TRAINEE DETAILS MODAL */}
      {/* ================================================= */}

      {selectedTrainee && (
        <div
          className="progress-modal-overlay"
          onClick={() => setSelectedTrainee(null)}
        >
          <div className="progress-modal" onClick={(e) => e.stopPropagation()}>
            {/* MODAL HEADER */}

            <div className="progress-modal-header">
              <div className="progress-modal-title">
                <div className="modal-trainee-avatar">
                  <FaUserGraduate />
                </div>

                <div>
                  <h2>{getTraineeName(selectedTrainee.trainee)}</h2>

                  <p>Trainee Progress Overview</p>
                </div>
              </div>

              <button
                className="progress-modal-close"
                onClick={() => setSelectedTrainee(null)}
              >
                <FaTimes />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="progress-modal-body">
              {/* OVERVIEW */}

              <div className="progress-overview-grid">
                <div className="progress-overview-card">
                  <span>Overall Progress</span>
                  <strong>{selectedTrainee.overallProgress}%</strong>
                </div>

                <div className="progress-overview-card">
                  <span>Average Score</span>
                  <strong>
                    {selectedTrainee.averagePercentage.toFixed(1)}%
                  </strong>
                </div>

                <div className="progress-overview-card">
                  <span>Attendance</span>
                  <strong>
                    {selectedTrainee.attendancePercentage.toFixed(1)}%
                  </strong>
                </div>

                <div className="progress-overview-card">
                  <span>Assessments</span>
                  <strong>
                    {selectedTrainee.completedAssessments.length}
                    {" / "}
                    {selectedTrainee.totalAssessments}
                  </strong>
                </div>
              </div>

              {/* PROGRESS BAR */}

              <div className="overall-progress-section">
                <div className="overall-progress-heading">
                  <div>
                    <h3>Overall Progress</h3>

                    <p>Based on assessment completion and performance.</p>
                  </div>

                  <strong>{selectedTrainee.overallProgress}%</strong>
                </div>

                <div className="large-progress-bar">
                  <div
                    className="large-progress-fill"
                    style={{
                      width: `${selectedTrainee.overallProgress}%`,
                    }}
                  />
                </div>

                {/* ATTENDANCE PROGRESS */}

                <div className="attendance-progress-section">
                  <div className="attendance-progress-heading">
                    <div>
                      <h3>Attendance</h3>

                      <p>
                        Attendance contributes to the trainee's overall
                        progress.
                      </p>
                    </div>

                    <strong>
                      {selectedTrainee.attendancePercentage.toFixed(1)}%
                    </strong>
                  </div>

                  <div className="attendance-progress-bar">
                    <div
                      className="attendance-progress-fill"
                      style={{
                        width: `${selectedTrainee.attendancePercentage}%`,
                      }}
                    />
                  </div>

                  <div className="attendance-progress-info">
                    <span>
                      Present: <strong>{selectedTrainee.presentCount}</strong>
                    </span>

                    <span>
                      Total Marked:{" "}
                      <strong>{selectedTrainee.markedAttendance.length}</strong>
                    </span>

                    <span>
                      Absent:{" "}
                      <strong>
                        {selectedTrainee.markedAttendance.length -
                          selectedTrainee.presentCount}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* ASSESSMENT PERFORMANCE */}

              <div className="assessment-progress-section">
                <div className="assessment-progress-heading">
                  <div>
                    <h3>Assessment Performance</h3>

                    <p>View this trainee's results for each assessment.</p>
                  </div>

                  <FaClipboardList />
                </div>

                {selectedTrainee.results.length === 0 ? (
                  <div className="no-assessment-results">
                    <FaClipboardList />

                    <p>No assessment results available yet.</p>
                  </div>
                ) : (
                  <div className="assessment-progress-list">
                    {selectedTrainee.results.map(({ assessment, result }) => {
                      const hasScore =
                        result.score !== null && result.score !== undefined;

                      const percentage =
                        hasScore && Number(assessment.totalMarks) > 0
                          ? (
                              (Number(result.score) /
                                Number(assessment.totalMarks)) *
                              100
                            ).toFixed(1)
                          : null;

                      return (
                        <div
                          className="assessment-progress-item"
                          key={assessment.id}
                        >
                          <div className="assessment-progress-info">
                            <div className="assessment-progress-icon">
                              <FaClipboardList />
                            </div>

                            <div>
                              <h4>{assessment.title}</h4>

                              <span>{assessment.dueDate}</span>
                            </div>
                          </div>

                          <div className="assessment-progress-score">
                            <span>Score</span>

                            <strong>
                              {hasScore
                                ? `${result.score} / ${assessment.totalMarks}`
                                : "Not graded"}
                            </strong>
                          </div>

                          <div className="assessment-progress-percentage">
                            <span>Percentage</span>

                            <strong>
                              {percentage !== null ? `${percentage}%` : "-"}
                            </strong>
                          </div>

                          <div className="mini-progress">
                            <div className="mini-progress-bar">
                              <div
                                className="mini-progress-fill"
                                style={{
                                  width: `${percentage || 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SESSIONS */}

              <div className="progress-sessions-section">
                <div>
                  <h3>Sessions</h3>

                  <p>Sessions associated with this trainee.</p>
                </div>

                {selectedTrainee.sessions.length === 0 ? (
                  <div className="no-sessions-message">
                    No session information available.
                  </div>
                ) : (
                  <div className="session-progress-list">
                    {selectedTrainee.sessions.map((session) => (
                      <div className="session-progress-item" key={session.id}>
                        <div>
                          <strong>{session.title}</strong>

                          {session.date && <span>{session.date}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerProgress;
