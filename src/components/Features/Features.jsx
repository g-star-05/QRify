import "./Features.css";

const Features = () => {

  const featureData = [

    {
      title: "Instant QR Generation",
      description:
        "Generate professional QR codes instantly with fast and reliable performance.",
      icon: "⚡",
    },

    {
      title: "Custom Templates",
      description:
        "Use modern and stylish QR templates designed for business and events.",
      icon: "🎨",
    },

    {
      title: "HD Downloads",
      description:
        "Download QR codes in high-quality PNG and SVG formats.",
      icon: "⬇️",
    },

  ];

  return (

    <section className="features-section">

      <div className="features-header">

        <h1>
          Powerful Features
        </h1>

        <p>
          Everything you need to create
          modern and customizable QR codes.
        </p>

      </div>

      <div className="features-grid">

        {featureData.map((feature, index) => (

          <div
            className="feature-card"
            key={index}
          >

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h2>{feature.title}</h2>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Features;