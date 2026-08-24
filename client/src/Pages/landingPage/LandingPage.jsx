import LandingNavbar from "./LandingNavbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">

      <LandingNavbar />

      <HeroSection />

      <FeatureSection />

      {/* =========================
    ABOUT SECTION
========================= */}

<section className="about-section" id="about">
  <div className="section-container">

    <div className="section-badge">
      About SkillAxis
    </div>

    <h2>Training Management Made Simple</h2>

    <p className="about-text">
      SkillAxis is an all-in-one Training Management System designed to
      simplify and organize the complete training process. It provides a
      centralized platform where administrators, trainers, and trainees can
      manage training activities, sessions, attendance, assessments, and
      progress efficiently.
    </p>

    <p className="about-text">
      With SkillAxis, organizations can reduce manual work, keep training
      information organized, monitor learner performance, and improve the
      overall learning experience through one simple and intuitive platform.
    </p>

  </div>
</section>


{/* =========================
    PRICING SECTION
========================= */}

<section className="pricing-section" id="pricing">

  <div className="section-container">

    <div className="section-badge">
      Pricing
    </div>

    <h2>Simple & Flexible Pricing</h2>

    <p className="pricing-intro">
      Choose a plan that fits your organization's training needs.
    </p>

    <div className="pricing-cards">

      {/* CARD 1 */}
      <div className="pricing-card">

        <h3>Starter</h3>

        <p className="pricing-description">
          Perfect for small teams and organizations getting started
          with digital training management.
        </p>

        <div className="price">
          <span>₹</span>999
          <small>/month</small>
        </div>

        <ul>
          <li>✓ Training Management</li>
          <li>✓ Trainer Management</li>
          <li>✓ Trainee Management</li>
          <li>✓ Session Management</li>
          <li>✓ Attendance Tracking</li>
        </ul>

        <a href="/login" className="pricing-btn">
          Get Started
        </a>

      </div>


      {/* CARD 2 */}
      <div className="pricing-card popular">

        <div className="popular-badge">
          Most Popular
        </div>

        <h3>Professional</h3>

        <p className="pricing-description">
          A complete solution for organizations that need advanced
          training and performance management.
        </p>

        <div className="price">
          <span>₹</span>1999
          <small>/month</small>
        </div>

        <ul>
          <li>✓ Everything in Starter</li>
          <li>✓ Assessment Management</li>
          <li>✓ Progress Tracking</li>
          <li>✓ Trainer & Trainee Dashboard</li>
          <li>✓ Reports & Analytics</li>
        </ul>

        <a href="/login" className="pricing-btn">
          Get Started
        </a>

      </div>

    </div>

  </div>

</section>


{/* =========================
    CONTACT SECTION
========================= */}

<section className="contact-section" id="contact">

  <div className="contact-container">

    <div className="section-badge">
      Contact Us
    </div>

    <h2>Let's Grow Together</h2>

    <p>
      Have questions about SkillAxis or want to know more about our
      training management platform? Our team is ready to help you.
    </p>

    <p>
      Get in touch with us to learn more about SkillAxis and find the
      right solution for your organization.
    </p>

    <a href="mailto:skillaxis@example.com" className="contact-btn">
      Contact Us
      <span>→</span>
    </a>

  </div>

</section>
    </div>
  );
}

export default LandingPage;