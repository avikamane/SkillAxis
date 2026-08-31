import { Link } from "react-router-dom";
import heroImage from "../../assets/logo/image.png";

function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-content">

          <div className="hero-badge">
            All-in-One Training Management System
          </div>

          <h1>
            Manage Training.
            <br />
            Empower People.
            <br />
            <span>Grow Together.</span>
          </h1>

          <p>
            SkillAxis is a smart and intuitive platform to manage trainers,
            trainees, sessions, assessments and progress — all in one place.
          </p>

          <div className="hero-buttons">

            <Link to="/login" className="primary-btn">
              Get Started Free
              <span>→</span>
            </Link>

            <button className="demo-btn">
              <span className="play-icon">▶</span>
              Watch Demo
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hero-image-container">
          <div className="hero-circle"></div>

          <img
            src={heroImage}
            alt="SkillAxis Training Dashboard"
            className="hero-image"
          />
        </div>

      </div>

      {/* BOTTOM CURVE */}
      <div className="hero-bottom-shape"></div>
    </section>
  );
}

export default HeroSection;