import { useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaLock,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import "./feature-profile.css";

function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Avika Mane",
    email: "avika@skillaxis.com",
    phone: "+91 98765 43210",
    role: "Administrator",
    department: "Administration",
    joinedDate: "01 August 2026",
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
    <div className="admin-profile-page">

      {/* HEADER */}
      <div className="admin-profile-header">
        <div>
          <h1>Admin Profile</h1>
          <p>Manage your account and personal information</p>
        </div>

        {!isEditing && (
          <button
            className="profile-edit-btn"
            onClick={handleEdit}
          >
            <FaEdit />
            Edit Profile
          </button>
        )}
      </div>

      {/* PROFILE TOP CARD */}
      <div className="admin-profile-card profile-main-card">

        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <div className="profile-main-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>

          <span className="admin-role-badge">
            <FaUserShield />
            Administrator
          </span>
        </div>

      </div>

      {/* CONTENT */}
      <div className="admin-profile-content">

        {/* PERSONAL INFORMATION */}
        <div className="admin-profile-card">

          <div className="profile-card-header">
            <div>
              <h2>Personal Information</h2>
              <p>Your basic account information</p>
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
                  <div className="profile-value">
                    {profile.department}
                  </div>
                )}
              </div>

              {/* ROLE */}
              <div className="profile-field">
                <label>Role</label>

                <div className="profile-value">
                  <FaUserShield />
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

                <button
                  type="submit"
                  className="profile-save-btn"
                >
                  <FaSave />
                  Save Changes
                </button>

              </div>
            )}

          </form>
        </div>

        {/* ACCOUNT SECURITY */}
        <div className="admin-profile-card security-card">

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

export default AdminProfile;