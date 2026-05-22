import "./Pricing.css";

const Pricing = () => {

  const pricingPlans = [
    {
      title: "Basic",
      price: "Free",
      description: "Perfect for beginners and personal use.",
      features: [
        "Generate Unlimited QR Codes",
        "Basic Templates",
        "PNG Download",
        "Standard Support",
      ],
      buttonText: "Get Started",
      active: false,
    },

    {
      title: "Pro",
      price: "₹499/mo",
      description: "Best for businesses and professionals.",
      features: [
        "Everything in Basic",
        "Premium Templates",
        "HD QR Downloads",
        "Analytics Dashboard",
        "Custom Branding",
      ],
      buttonText: "Start Pro",
      active: true,
    },

    {
      title: "Enterprise",
      price: "Custom",
      description: "Advanced features for teams and agencies.",
      features: [
        "Everything in Pro",
        "API Access",
        "Team Collaboration",
        "Priority Support",
        "Cloud Storage",
      ],
      buttonText: "Contact Sales",
      active: false,
    },
  ];

  return (
    <section className="pricing-section">

      {/* HEADER */}
      <div className="pricing-header">

        <h1>
          Simple & Transparent Pricing
        </h1>

        <p>
          Choose the perfect plan for your business,
          startup, or personal QR generation needs.
        </p>

      </div>

      {/* PRICING CARDS */}
      <div className="pricing-grid">

        {pricingPlans.map((plan, index) => (

          <div
            key={index}
            className={`pricing-card ${plan.active ? "active-plan" : ""}`}
          >

            {plan.active && (
              <div className="popular-badge">
                Most Popular
              </div>
            )}

            <h2>{plan.title}</h2>

            <h3>{plan.price}</h3>

            <p className="plan-description">
              {plan.description}
            </p>

            <ul>

              {plan.features.map((feature, i) => (
                <li key={i}>
                  ✅ {feature}
                </li>
              ))}

            </ul>

            <button>
              {plan.buttonText}
            </button>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Pricing;