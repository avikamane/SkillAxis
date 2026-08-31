import { useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaLock,
  FaSave,
  FaTimes,
  FaBookOpen,
} from "react-icons/fa";
import { trainerProfile } from "../../Info/trainerProfileData";

import "./TrainerProfile.css";

function TrainerProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(trainerProfile);
  const [formData, setFormData] = useState(trainerProfile);
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
    <div className="trainer-profile-page">
      {/* =========================
          HEADER
      ========================= */}
      <div className="trainer-profile-header">
        <div>
          <h1>Trainer Profile</h1>
          <p>Manage your account and professional information</p>
        </div>

        {!isEditing && (
          <button className="profile-edit-btn" onClick={handleEdit}>
            <FaEdit />
            Edit Profile
          </button>
        )}
      </div>

      {/* =========================
          PROFILE TOP CARD
      ========================= */}
      <div className="trainer-profile-card profile-main-card">
        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <div className="profile-main-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>

          <span className="trainer-role-badge">
            <FaChalkboardTeacher />
            Trainer
          </span>
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="trainer-profile-content">
        {/* =========================
            PERSONAL INFORMATION
        ========================= */}
        <div className="trainer-profile-card">
          <div className="profile-card-header">
            <div>
              <h2>Personal Information</h2>
              <p>Your basic account and professional information</p>
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

              {/* DEPARTMENT */}
              <div className="profile-field">
                <label>Department</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-value">{profile.department}</div>
                )}
              </div>

              {/* SPECIALIZATION */}
              <div className="profile-field">
                <label>Specialization</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-value">
                    <FaBookOpen />
                    {profile.specialization}
                  </div>
                )}
              </div>

              {/* ROLE */}
              <div className="profile-field">
                <label>Role</label>

                <div className="profile-value">
                  <FaChalkboardTeacher />
                  {profile.role}
                </div>
              </div>

              {/* JOINED DATE */}
              <div className="profile-field">
                <label>Joined Date</label>

                <div className="profile-value">
                  <FaCalendarAlt />
                  {profile.joinedDate}
                </div>
              </div>
            </div>

            {/* =========================
                EDIT ACTIONS
            ========================= */}
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

        {/* =========================
            ACCOUNT SECURITY
        ========================= */}
        <div className="trainer-profile-card security-card">
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

export default TrainerProfile;
