import { useState } from "react";

import {
  FaBookOpen,
  FaSearch,
  FaArrowLeft,
  FaFilter,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaFilePdf,
  FaFileAlt,
  FaVideo,
  FaLink,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { resources as initialResources } from "../../Info/resourceData";
import { sessions } from "../../Info/sessionData";

import "./TrainerResources.css";

function TrainerResources() {
  // Change this according to the logged-in trainer
  const loggedInTrainerId = 1;

  // ==================================================
  // RESOURCES
  // ==================================================

  const [resources, setResources] = useState(initialResources);

  // ==================================================
  // FILTERS
  // ==================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSession, setSelectedSession] = useState("All");

  // ==================================================
  // TRAINER RESOURCES
  // ==================================================

  const trainerResources = resources.filter(
    (resource) => resource.trainerId === loggedInTrainerId,
  );

  // ==================================================
  // TRAINER SESSIONS
  // ==================================================

  const trainerSessions = sessions.filter(
    (session) => session.trainerId === loggedInTrainerId,
  );

  // ==================================================
  // GET SESSION
  // ==================================================

  const getSession = (sessionId) => {
    return sessions.find((session) => session.id === sessionId);
  };

  // ==================================================
  // RESOURCE ICON
  // ==================================================

  const getResourceIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FaFilePdf />;

      case "Word":
        return <FaFileAlt />;

      case "Video":
        return <FaVideo />;

      case "Link":
      default:
        return <FaLink />;
    }
  };

  // ==================================================
  // FILTER RESOURCES
  // ==================================================

  const filteredResources = trainerResources.filter((resource) => {
    const session = getSession(resource.sessionId);

    const searchText = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      resource.title?.toLowerCase().includes(searchText) ||
      resource.description?.toLowerCase().includes(searchText) ||
      resource.type?.toLowerCase().includes(searchText) ||
      session?.title?.toLowerCase().includes(searchText);

    const matchesType =
      selectedType === "All" || resource.type === selectedType;

    const matchesSession =
      selectedSession === "All" ||
      String(resource.sessionId) === String(selectedSession);

    return matchesSearch && matchesType && matchesSession;
  });

  // ==================================================
  // CLEAR FILTERS
  // ==================================================

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedSession("All");
  };

  // ==================================================
  // CHECK FILTERS
  // ==================================================

  const hasActiveFilters =
    searchTerm !== "" || selectedType !== "All" || selectedSession !== "All";

  // ==================================================
  // DELETE RESOURCE
  // ==================================================

  const handleDeleteResource = (resourceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?",
    );

    if (!confirmDelete) return;

    setResources((prev) =>
      prev.filter((resource) => resource.id !== resourceId),
    );
  };

  // ==================================================
  // EDIT RESOURCE
  // ==================================================

  const handleEditResource = (resource) => {
    // For now this is a placeholder.
    // The edit form can be connected here later.
    alert(`Edit resource: ${resource.title}`);
  };

  // ==================================================
  // RETURN
  // ==================================================

  return (
    <div className="trainer-resources-page">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="resources-page-header">
        <button
          className="resources-back-btn"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft />
          Back to Assessments
        </button>
        <div className="resources-page-heading">
          <div className="resources-page-icon">
            <FaBookOpen />
          </div>

          <div>
            <h1>Resources</h1>

            <p>
              Search and manage learning materials shared with your trainees.
            </p>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* SEARCH & FILTERS */}
      {/* ================================================= */}

      <div className="resources-filter-card">
        {/* SEARCH */}

        <div className="resource-search-wrapper">
          <FaSearch />

          <input
            type="text"
            placeholder="Search resources, sessions, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm("")}
              title="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* FILTERS */}

        <div className="resource-filters">
          {/* TYPE */}

          <div className="resource-filter-group">
            <label>
              <FaFilter />
              Resource Type
            </label>

            <div className="select-wrapper">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Link">Link</option>
                <option value="PDF">PDF</option>
                <option value="Word">Word</option>
                <option value="Video">Video</option>
              </select>

              <FaChevronDown />
            </div>
          </div>

          {/* SESSION */}

          <div className="resource-filter-group">
            <label>
              <FaBookOpen />
              Session
            </label>

            <div className="select-wrapper">
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                <option value="All">All Sessions</option>

                {trainerSessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.title}
                  </option>
                ))}
              </select>

              <FaChevronDown />
            </div>
          </div>

          {/* CLEAR */}

          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              <FaTimes />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* RESULTS HEADER */}
      {/* ================================================= */}

      <div className="resources-results-header">
        <div>
          <h2>All Resources</h2>

          <p>
            Showing {filteredResources.length} of {trainerResources.length}{" "}
            resource
            {trainerResources.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* RESOURCE LIST */}
      {/* ================================================= */}

      {filteredResources.length === 0 ? (
        <div className="resources-empty-state">
          <div className="resources-empty-icon">
            <FaBookOpen />
          </div>

          <h3>
            {hasActiveFilters ? "No resources found" : "No resources available"}
          </h3>

          <p>
            {hasActiveFilters
              ? "Try changing your search or filters."
              : "Resources added for your sessions will appear here."}
          </p>

          {hasActiveFilters && (
            <button className="empty-clear-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="resources-page-list">
          {filteredResources.map((resource) => {
            const session = getSession(resource.sessionId);

            return (
              <div className="resource-page-card" key={resource.id}>
                {/* ================================================= */}
                {/* RESOURCE ICON */}
                {/* ================================================= */}

                <div className="resource-page-card-icon">
                  {getResourceIcon(resource.type)}
                </div>

                {/* ================================================= */}
                {/* RESOURCE CONTENT */}
                {/* ================================================= */}

                <div className="resource-page-card-content">
                  <div className="resource-page-card-title-row">
                    <h3>{resource.title}</h3>

                    <span className="resource-page-type">{resource.type}</span>
                  </div>

                  <p className="resource-page-session">
                    {session ? session.title : "Session unavailable"}
                  </p>

                  {resource.description && (
                    <p className="resource-page-description">
                      {resource.description}
                    </p>
                  )}

                  {resource.fileName && (
                    <p className="resource-page-file">📄 {resource.fileName}</p>
                  )}
                </div>

                {/* ================================================= */}
                {/* ACTIONS */}
                {/* ================================================= */}

                <div className="resource-page-actions">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-page-view-btn"
                    title="Open Resource"
                  >
                    <FaExternalLinkAlt />
                    <span>View</span>
                  </a>

                  <button
                    className="resource-page-delete-btn"
                    onClick={() => handleDeleteResource(resource.id)}
                    title="Delete Resource"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TrainerResources;
