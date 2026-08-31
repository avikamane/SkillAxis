import { FaClipboardList, FaExternalLinkAlt } from "react-icons/fa";

// Import data from Info directory
import { assessments } from "../../Info/assessmentData";
import { sessions } from "../../Info/sessionData";

import "./TraineeAssessments.css";

const TraineeAssessments = () => {
  // Current logged-in trainee ID
  const currentTraineeId = 1;
  const assessmentsList = assessments || [];
  const sessionsList = sessions || [];

  // Filter assessments where this trainee is enrolled in performance array
  const myAssessments = assessmentsList.filter((item) =>
    Array.isArray(item?.performance) &&
    item.performance.some((p) => p.traineeId === currentTraineeId)
  );

  // Fallback to all assessments if none match logged-in ID
  const displayAssessments = myAssessments.length > 0 ? myAssessments : assessmentsList;

  // Helper to get session title
  const getSessionTitle = (sessionId) => {
    const session = sessionsList.find((s) => s.id === sessionId);
    return session ? session.title : "General";
  };

  // Helper to get trainee score
  const getTraineeScore = (performanceList) => {
    if (!Array.isArray(performanceList)) return null;
    const record = performanceList.find((p) => p.traineeId === currentTraineeId);
    return record ? record.score : null;
  };

  return (
    <div className="trainee-assessments-container">
      {/* HEADER SECTION */}
      <header className="page-header">
        <h1>Assessments</h1>
        <p>View your assigned quizzes, track submission status, and check your scores.</p>
      </header>

      {/* CONTENT AREA */}
      <div className="assessments-content">
        <div className="section-title-bar">
          <h2>My Assessments</h2>
          <span className="badge-count">{displayAssessments.length} Assessments</span>
        </div>

        <div className="assessments-list">
          {displayAssessments.map((item, index) => {
            const score = getTraineeScore(item.performance);
            const statusString = item?.status ? String(item.status) : "Open";
            const isOpen = statusString.toLowerCase() === "open";

            return (
              <div key={item?.id || index} className="assessment-card">
                <div className="card-header">
                  <div className="card-title-group">
                    <div className="icon-wrapper">
                      <FaClipboardList />
                    </div>
                    <div>
                      <h3>{item?.title || "Untitled Assessment"}</h3>
                      <span className="session-tag">{getSessionTitle(item?.sessionId)}</span>
                    </div>
                  </div>
                  <span className={`status-pill ${isOpen ? "open" : "upcoming"}`}>
                    {statusString}
                  </span>
                </div>

                <p className="description">{item?.description}</p>

                <div className="details-grid">
                  <div className="detail-box">
                    <span className="detail-label">Due Date</span>
                    <span className="detail-value">{item?.dueDate || "N/A"}</span>
                  </div>
                  <div className="detail-box">
                    <span className="detail-label">Total Marks</span>
                    <span className="detail-value">{item?.totalMarks || 0}</span>
                  </div>
                  <div className="detail-box">
                    <span className="detail-label">Your Score</span>
                    <span className="detail-value score-value">
                      {score !== null && score !== undefined ? `${score} / ${item?.totalMarks}` : "Not Graded"}
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  {item?.quizLink ? (
                    <a
                      href={item.quizLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quiz-button"
                    >
                      <FaExternalLinkAlt /> Open Quiz
                    </a>
                  ) : (
                    <button className="quiz-button disabled" disabled>
                      No Quiz Link
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TraineeAssessments;