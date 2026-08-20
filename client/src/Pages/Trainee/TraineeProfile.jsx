import { useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaUserGraduate,
  FaCalendarAlt,
  FaLock,
  FaSave,
  FaTimes,
  FaBookOpen,
} from "react-icons/fa";

import "./TraineeProfile.css";

function TraineeProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@skillaxis.com",
    phone: "+91 98765 12345",
    role: "Trainee",
    course: "Full Stack Web Development",
    joinedDate: "10 August 2026",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    alert("Change Password feature will be connected later.");
  };

  return (
    <div className="trainee-profile-page">
      {/* HEADER */}
      <div className="trainee-profile-header">
        <div>
          <h1>Trainee Profile</h1>
          <p>Manage your account and personal information</p>
        </div>

        {!isEditing && (
          <button className="profile-edit-btn" onClick={handleEdit} type="button">
            <FaEdit />
            Edit Profile
          </button>
        )}
      </div>

      {/* PROFILE TOP CARD */}
      <div className="trainee-profile-card profile-main-card">
        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <div className="profile-main-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>

          <span className="trainee-role-badge">
            <FaUserGraduate />
            Trainee
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="trainee-profile-content">
        {/* PERSONAL INFORMATION */}
        <div className="trainee-profile-card">
          <div className="profile-card-header">
            <div>
              <h2>Personal Information</h2>
              <p>Your basic account and course information</p>
            </div>
            <FaUserCircle className="profile-header-icon" />
          </div>

          <form onSubmit={handleSave}>
            <div className="profile-form-grid">
              {/* NAME */}
              <div className="profile-field">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-value">
                    <FaUserCircle />
                    {profile.name}
                  </div>
                )}
              </div>

              {/* EMAIL */}
              <div className="profile-field">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-value">
                    <FaEnvelope />
                    {profile.email}
                  </div>
                )}
              </div>

              {/* PHONE */}
              <div className="profile-field">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-value">
                    <FaPhone />
                    {profile.phone}
                  </div>
                )}
              </div>

              {/* COURSE */}
              <div className="profile-field">
                <label>Enrolled Course / Track</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-value">
                    <FaBookOpen />
                    {profile.course}
                  </div>
                )}
              </div>

              {/* ROLE */}
              <div className="profile-field">
                <label>Role</label>
                <div className="profile-value">
                  <FaUserGraduate />
                  {profile.role}
                </div>
              </div>

              {/* JOINED DATE */}
              <div className="profile-field">
                <label>Enrollment Date</label>
                <div className="profile-value">
                  <FaCalendarAlt />
                  {profile.joinedDate}
                </div>
              </div>
            </div>

            {/* EDIT ACTIONS */}
            {isEditing && (
              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button type="submit" className="profile-save-btn">
                  <FaSave />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ACCOUNT SECURITY */}
        <div className="trainee-profile-card security-card">
          <div className="profile-card-header">
            <div>
              <h2>Account Security</h2>
              <p>Manage your account security settings</p>
            </div>
            <FaLock className="profile-header-icon" />
          </div>

          <div className="security-row">
            <div className="security-info">
              <div className="security-icon">
                <FaLock />
              </div>
              <div>
                <strong>Password</strong>
                <p>Keep your account secure with a strong password.</p>
              </div>
            </div>

            <button
              type="button"
              className="change-password-btn"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TraineeProfile;