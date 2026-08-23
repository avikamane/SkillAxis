import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaGraduationCap,
} from "react-icons/fa";
import { initializeUsers, loginUser } from "../../utils/Auth";
import logo from "../../assets/logo/SkillAxis-logo.png";
// Place your desk & laptop illustration here:
import heroIllustration from "../../assets/logo/heroIllustration.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!selectedRole) {
      setError("Please select your role.");
      return;
    }

    setIsLoading(true);

    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    if (result.user.role !== selectedRole) {
      setError(
        `This account is registered as ${result.user.role}. Please select the correct role.`,
      );
      setIsLoading(false);
      return;
    }

    switch (result.user.role) {
      case "Admin":
        navigate("/admin");
        break;
      case "Trainer":
        navigate("/trainer/dashboard");
        break;
      case "Trainee":
        navigate("/trainee/dashboard");
        break;
      default:
        setError("Invalid user role.");
        setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Password recovery will be available when the backend is connected.");
  };

  return (
    <div className="login-page">
      {/* Background Decorative Grid Dots */}
      <div className="dot-pattern pattern-left"></div>
      <div className="dot-pattern pattern-right"></div>

      {/* ================= LEFT BRANDING SECTION ================= */}
      <section className="login-brand-section">
        {/* LOGO */}
        <div className="login-logo-container">
          <img src={logo} alt="SkillAxis" className="main-logo-image" />
        </div>
        {/* WELCOME TEXT */}
        <div className="welcome-content">
          <h2>Welcome Back!</h2>
          <h3>
            Let's continue
            <br />
            your learning journey.
          </h3>
          <p>
            Login to access your dashboard, manage sessions, track progress and
            achieve your goals with SkillAxis.
          </p>
        </div>

        {/* HERO GRAPHIC / LAPTOP ILLUSTRATION */}
        <div className="brand-illustration-wrapper">
          <img
            src={heroIllustration}
            alt="SkillAxis Workspace Preview"
            className="brand-illustration"
          />
        </div>
      </section>

      {/* ================= RIGHT LOGIN SECTION ================= */}
      <section className="login-form-section">
        <div className="login-card">
          {/* LOGIN ICON */}
          <div className="login-card-icon">
            <FaGraduationCap />
          </div>

          {/* TITLE */}
          <div className="login-heading">
            <h2>Login to SkillAxis</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="login-field">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-password-wrapper">
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            {/* ERROR */}
            {error && <div className="login-error">{error}</div>}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  Login <FaArrowRight />
                </>
              )}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* ROLE CARDS */}
          <div className="role-selection">
            <div className="role-cards">
              {/* ADMIN */}
              <button
                type="button"
                className={`role-card ${
                  selectedRole === "Admin" ? "selected" : ""
                }`}
                onClick={() => handleRoleSelect("Admin")}
              >
                <div className="role-icon admin-icon">
                  <FaUserShield />
                </div>
                <strong>Admin</strong>
                <span>Login as Admin</span>
              </button>

              {/* TRAINER */}
              <button
                type="button"
                className={`role-card ${
                  selectedRole === "Trainer" ? "selected" : ""
                }`}
                onClick={() => handleRoleSelect("Trainer")}
              >
                <div className="role-icon trainer-icon">
                  <FaChalkboardTeacher />
                </div>
                <strong>Trainer</strong>
                <span>Login as Trainer</span>
              </button>

              {/* TRAINEE */}
              <button
                type="button"
                className={`role-card ${
                  selectedRole === "Trainee" ? "selected" : ""
                }`}
                onClick={() => handleRoleSelect("Trainee")}
              >
                <div className="role-icon trainee-icon">
                  <FaUserGraduate />
                </div>
                <strong>Trainee</strong>
                <span>Login as Trainee</span>
              </button>
            </div>
          </div>

          {/* SIGNUP / CONTACT ADMIN */}
          <div className="signup-section">
            <span>Don't have an account?</span>
            <button type="button" onClick={() => navigate("/signup")}>
              Contact Admin
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
