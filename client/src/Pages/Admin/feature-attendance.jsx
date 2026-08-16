
import { useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";

import {
  traineeAttendanceInfo,
  attendanceRecords,
  trainerAttendanceData,
} from "../../Info/attendanceData";

import "./feature-attendance.css";

function FeatureAttendance() {
  /* =================================
     COMMON STATES
  ================================= */

  const [activeTab, setActiveTab] = useState("trainee");

  const [search, setSearch] = useState("");

  const [date, setDate] = useState("");

  const [course, setCourse] = useState("All Courses");

  const [month, setMonth] = useState("All Months");

  const [sessionFilter, setSessionFilter] =
    useState("All Sessions");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [entriesPerPage, setEntriesPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [loaded, setLoaded] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");


  /* =================================
     TRAINEE STATUS
  ================================= */

  const [traineeStatuses, setTraineeStatuses] =
    useState(
      attendanceRecords.reduce((acc, record) => {
        acc[record.id] = record.status;
        return acc;
      }, {})
    );


  /* =================================
     FILTER TRAINEE RECORDS
  ================================= */

  const filteredTraineeRecords =
    attendanceRecords.filter((record) => {

      const searchMatch =
        `${record.session} ${record.course} ${record.trainer} ${record.status}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const courseMatch =
        course === "All Courses" ||
        record.course === course;

      const monthMatch =
        month === "All Months" ||
        record.month === month;

      const dateMatch =
        !date ||
        record.rawDate === date;

      return (
        searchMatch &&
        courseMatch &&
        monthMatch &&
        dateMatch
      );
    });


  /* =================================
     FILTER TRAINER RECORDS
  ================================= */

  const filteredTrainerRecords =
    trainerAttendanceData.filter((session) => {

      const searchMatch =
        `${session.session} ${session.date} ${session.time} ${session.status}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const sessionMatch =
        sessionFilter === "All Sessions" ||
        session.session === sessionFilter;

      const statusMatch =
        statusFilter === "All Status" ||
        session.status === statusFilter;

      return (
        searchMatch &&
        sessionMatch &&
        statusMatch
      );
    });


  /* =================================
     PAGINATION
  ================================= */

  const currentRecords =
    activeTab === "trainee"
      ? filteredTraineeRecords
      : filteredTrainerRecords;

  const totalPages = Math.max(
    1,
    Math.ceil(
      currentRecords.length / entriesPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * entriesPerPage;

  const paginatedRecords =
    currentRecords.slice(
      startIndex,
      startIndex + entriesPerPage
    );


  /* =================================
     CHANGE TAB
  ================================= */

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSearch("");
    setCurrentPage(1);
    setSaveMessage("");
  };


  /* =================================
     LOAD ATTENDANCE
  ================================= */

  const handleLoadAttendance = () => {
    setCurrentPage(1);
    setLoaded(true);
    setSaveMessage("");
  };


  /* =================================
     CHANGE STATUS
  ================================= */

  const changeTraineeStatus = (id, value) => {
    setTraineeStatuses((previous) => ({
      ...previous,
      [id]: value,
    }));

    setSaveMessage("");
  };


  /* =================================
     SAVE ATTENDANCE
  ================================= */

  const handleSaveAttendance = () => {
    setSaveMessage(
      "Attendance saved successfully!"
    );

    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };


  /* =================================
     SEARCH
  ================================= */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };


  /* =================================
     ENTRIES
  ================================= */

  const handleEntriesChange = (value) => {
    setEntriesPerPage(Number(value));
    setCurrentPage(1);
  };


  /* =================================
     PAGINATION
  ================================= */

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <div className="attendance-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="attendance-header">
        <div>
          <h1>Attendance Management</h1>

          <p>
            Manage and monitor trainer and trainee
            attendance
          </p>
        </div>
      </div>


      {/* =================================
          TABS
      ================================= */}

      <div className="attendance-tabs">

        <button
          className={
            activeTab === "trainee"
              ? "active"
              : ""
          }
          onClick={() =>
            changeTab("trainee")
          }
        >
          Trainee Attendance
        </button>

        <button
          className={
            activeTab === "trainer"
              ? "active"
              : ""
          }
          onClick={() =>
            changeTab("trainer")
          }
        >
          Trainer Attendance
        </button>

      </div>


      {/* =================================
          TRAINEE ATTENDANCE
      ================================= */}

      {activeTab === "trainee" && (
        <>

          {/* PROFILE */}

          <div className="attendance-profile">

            <div className="attendance-avatar">
              VK
            </div>

            <div>
              <h2>
                {traineeAttendanceInfo.name}
              </h2>

              <p>
                {traineeAttendanceInfo.course}
                {" · "}
                {traineeAttendanceInfo.batch}
              </p>
            </div>

          </div>


          {/* FILTERS */}

          <div className="attendance-filter-box">

            <div className="attendance-filter-group">

              <label>
                Course
              </label>

              <select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>
                  All Courses
                </option>

                <option>
                  Full Stack Development
                </option>
              </select>

            </div>


            <div className="attendance-filter-group">

              <label>
                Month
              </label>

              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>
                  All Months
                </option>

                <option>
                  August
                </option>

                <option>
                  July
                </option>
              </select>

            </div>


            <div className="attendance-filter-group">

              <label>
                Date
              </label>

              <div className="attendance-date-input">

                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <FaCalendarAlt />

              </div>

            </div>


            <button
              className="attendance-load-btn"
              onClick={handleLoadAttendance}
            >
              Load Attendance
            </button>

          </div>


          {/* LOADED MESSAGE */}

          {loaded && (
            <div className="attendance-loaded-message">
              Attendance loaded successfully.
            </div>
          )}


          {/* TOOLBAR */}

          <div className="attendance-toolbar">

            <div className="attendance-show">

              <span>
                Show
              </span>

              <select
                value={entriesPerPage}
                onChange={(e) =>
                  handleEntriesChange(
                    e.target.value
                  )
                }
              >
                <option value="5">
                  5
                </option>

                <option value="10">
                  10
                </option>

                <option value="25">
                  25
                </option>
              </select>

              <span>
                entries
              </span>

            </div>


            <div className="attendance-search">

              <span>
                Search:
              </span>

              <div>

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) =>
                    handleSearch(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>


          {/* TABLE */}

          <div className="attendance-table-container">

            <table className="attendance-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Session</th>
                  <th>Trainer</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {paginatedRecords.length > 0 ? (

                  paginatedRecords.map(
                    (record) => (

                      <tr key={record.id}>

                        <td>
                          TRN
                          {String(
                            record.id
                          ).padStart(3, "0")}
                        </td>

                        <td>
                          <strong>
                            {record.session}
                          </strong>
                        </td>

                        <td>
                          {record.trainer}
                        </td>

                        <td>
                          {record.date}
                        </td>

                        <td>
                          {record.time}
                        </td>

                        <td>

                          <select
                            className={`attendance-status-select ${
                              traineeStatuses[
                                record.id
                              ]?.toLowerCase()
                            }`}
                            value={
                              traineeStatuses[
                                record.id
                              ]
                            }
                            onChange={(e) =>
                              changeTraineeStatus(
                                record.id,
                                e.target.value
                              )
                            }
                          >

                            <option value="Present">
                              Present
                            </option>

                            <option value="Absent">
                              Absent
                            </option>

                            <option value="Late">
                              Late
                            </option>

                            <option value="Leave">
                              Leave
                            </option>

                          </select>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="no-attendance"
                    >
                      No attendance records found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* FOOTER */}

          <div className="attendance-footer">

            <span>
              Showing{" "}
              {currentRecords.length === 0
                ? 0
                : startIndex + 1}
              {" - "}
              {Math.min(
                startIndex +
                  entriesPerPage,
                currentRecords.length
              )}{" "}
              of{" "}
              {currentRecords.length} entries
            </span>


            <button
              className="attendance-submit-btn"
              onClick={handleSaveAttendance}
            >
              <FaSave />
              Save Attendance
            </button>

          </div>

        </>
      )}


      {/* =================================
          TRAINER ATTENDANCE
      ================================= */}

      {activeTab === "trainer" && (
        <>

          <div className="attendance-profile">

            <div className="attendance-avatar trainer-avatar">
              TR
            </div>

            <div>

              <h2>
                Trainer Attendance
              </h2>

              <p>
                Manage attendance for trainees
                during trainer sessions
              </p>

            </div>

          </div>


          {/* FILTER BOX */}

          <div className="attendance-filter-box">

            <div className="attendance-filter-group">

              <label>
                Session
              </label>

              <select
                value={sessionFilter}
                onChange={(e) => {
                  setSessionFilter(
                    e.target.value
                  );
                  setCurrentPage(1);
                }}
              >

                <option>
                  All Sessions
                </option>

                {trainerAttendanceData.map(
                  (session) => (
                    <option
                      key={session.sessionId}
                      value={session.session}
                    >
                      {session.session}
                    </option>
                  )
                )}

              </select>

            </div>


            <div className="attendance-filter-group">

              <label>
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(
                    e.target.value
                  );
                  setCurrentPage(1);
                }}
              >

                <option>
                  All Status
                </option>

                <option>
                  Completed
                </option>

                <option>
                  Upcoming
                </option>

              </select>

            </div>


            <div className="attendance-filter-group">

              <label>
                Date
              </label>

              <div className="attendance-date-input">

                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <FaCalendarAlt />

              </div>

            </div>


            <button
              className="attendance-load-btn"
              onClick={handleLoadAttendance}
            >
              Load Attendance
            </button>

          </div>


          {/* TOOLBAR */}

          <div className="attendance-toolbar">

            <div className="attendance-show">

              <span>
                Show
              </span>

              <select
                value={entriesPerPage}
                onChange={(e) =>
                  handleEntriesChange(
                    e.target.value
                  )
                }
              >

                <option value="5">
                  5
                </option>

                <option value="10">
                  10
                </option>

                <option value="25">
                  25
                </option>

              </select>

              <span>
                entries
              </span>

            </div>


            <div className="attendance-search">

              <span>
                Search:
              </span>

              <div>

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) =>
                    handleSearch(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>


          {/* TRAINER TABLE */}

          <div className="attendance-table-container">

            <table className="attendance-table trainer-attendance-table">

              <thead>

                <tr>
                  <th>Session ID</th>
                  <th>Session</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Trainees</th>
                </tr>

              </thead>


              <tbody>

                {paginatedRecords.length > 0 ? (

                  paginatedRecords.map(
                    (session) => (

                      <tr
                        key={
                          session.sessionId
                        }
                      >

                        <td>
                          SES
                          {String(
                            session.sessionId
                          ).padStart(3, "0")}
                        </td>

                        <td>
                          <strong>
                            {session.session}
                          </strong>
                        </td>

                        <td>
                          {session.date}
                        </td>

                        <td>
                          {session.time}
                        </td>

                        <td>

                          <span
                            className={`session-status ${
                              session.status.toLowerCase()
                            }`}
                          >
                            {session.status}
                          </span>

                        </td>

                        <td>

                          <span className="trainee-count">
                            {session.trainees.length}
                            {" trainees"}
                          </span>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="no-attendance"
                    >
                      No trainer sessions found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* FOOTER */}

          <div className="attendance-footer">

            <span>
              Showing{" "}
              {currentRecords.length === 0
                ? 0
                : startIndex + 1}
              {" - "}
              {Math.min(
                startIndex +
                  entriesPerPage,
                currentRecords.length
              )}{" "}
              of{" "}
              {currentRecords.length} entries
            </span>


            <button
              className="attendance-submit-btn"
              onClick={handleSaveAttendance}
            >
              <FaSave />
              Save Attendance
            </button>

          </div>

        </>
      )}


      {/* =================================
          SAVE MESSAGE
      ================================= */}

      {saveMessage && (
        <div className="attendance-save-message">
          {saveMessage}
        </div>
      )}


      {/* =================================
          PAGINATION
      ================================= */}

      <div className="attendance-pagination">

        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>


        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (

          <button
            key={page}
            className={
              currentPage === page
                ? "active-attendance-page"
                : ""
            }
            onClick={() =>
              setCurrentPage(page)
            }
          >
            {page}
          </button>

        ))}


        <button
          onClick={goToNextPage}
          disabled={
            currentPage === totalPages
          }
        >
          &gt;
        </button>

      </div>

    </div>
  );
}

export default FeatureAttendance;

