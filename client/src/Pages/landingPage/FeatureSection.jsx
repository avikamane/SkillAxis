import {
  Users,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Clock
} from "lucide-react";

function FeatureSection() {
  const features = [
    {
      icon: <Users />,
      title: "Centralized Management",
      text: "Manage all training activities from one powerful dashboard."
    },
    {
      icon: <BookOpen />,
      title: "Easy Learning",
      text: "Create, deliver and track engaging training programs."
    },
    {
      icon: <BarChart3 />,
      title: "Track Progress",
      text: "Monitor performance and improve learning outcomes."
    },
    {
      icon: <ShieldCheck />,
      title: "Secure & Reliable",
      text: "Your data is safe with our secure and reliable system."
    },
    {
      icon: <Clock />,
      title: "Save Time",
      text: "Automate tasks and save valuable time."
    }
  ];

  return (
    <section className="features-section" id="features">

      <div className="features-container">

        {features.map((feature, index) => (
          <div className="feature-item" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FeatureSection;