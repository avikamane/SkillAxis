import { useState } from "react";
import { resources } from "../../Info/resourceData";
import "./TraineeResources.css";

const TraineeResources = () => {
  const [activeType, setActiveType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items dynamically based on search & category pill
  const filteredResources = resources.filter((item) => {
    const matchesType = activeType === "All" || item.type.toLowerCase() === activeType.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Helper function to render matching icons
  const getResourceIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return { symbol: "📄", className: "pdf-type" };
      case "link":
        return { symbol: "🔗", className: "link-type" };
      case "document":
      default:
        return { symbol: "📝", className: "doc-type" };
    }
  };

  return (
    <div className="trainee-resources-card">
      {/* Header */}
      <div className="resources-header">
        <div className="header-icon-title">
          <div className="header-icon">📖</div>
          <div>
            <h1>Resources</h1>
            <p>Access study materials, documentation, and practice links.</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="resources-controls">
        <div className="filter-pills">
          {["All", "PDF", "Link", "Document"].map((type) => (
            <button
              key={type}
              className={`pill-btn ${activeType.toLowerCase() === type.toLowerCase() ? "active" : ""}`}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Resource Items List */}
      <div className="resources-list">
        {filteredResources.length > 0 ? (
          filteredResources.map((item) => {
            const { symbol, className } = getResourceIcon(item.type);
            const isDownloadable = item.type.toLowerCase() === "pdf" || item.type.toLowerCase() === "document";

            return (
              <div key={item.id} className="resource-card">
                <div className={`resource-icon-box ${className}`}>
                  {symbol}
                </div>

                <div className="resource-content">
                  <div className="title-row">
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.description}</p>
                  <span className="type-tag">{item.type}</span>
                </div>

                <div className="resource-actions">
                  {isDownloadable ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn download"
                      download
                    >
                      📥 Download
                    </a>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn open"
                    >
                      ↗ Open
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-resources">
            <p>No learning materials found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraineeResources;