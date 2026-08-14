import "./SessionDetailsModal.css";

function SessionDetailsModal({ session, onClose }) {
  if (!session) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="session-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{session.title}</h2>
            <p>Session Details</p>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="session-info-grid">
            <div className="session-info-item">
              <span>Date</span>
              <strong>{session.date}</strong>
            </div>

            <div className="session-info-item">
              <span>Time</span>
              <strong>
                {session.startTime} - {session.endTime}
              </strong>
            </div>

            <div className="session-info-item">
              <span>Trainees</span>
              <strong>{session.traineeIds.length}</strong>
            </div>

            <div className="session-info-item">
              <span>Status</span>
              <strong>{session.status}</strong>
            </div>
          </div>

          <div className="session-description">
            <h3>Description</h3>
            <p>{session.description}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-close-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SessionDetailsModal;
