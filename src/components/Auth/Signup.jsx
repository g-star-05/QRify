import "./Auth.css";

const Signup = () => {

  return (

    <section className="auth-section">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-left">

          <h1>Create Account</h1>

          <p>
            Join QRify and start creating
            modern and professional QR codes
            for your business.
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="auth-right">

          <h2>Signup</h2>

          <form className="auth-form">

            <input
              type="text"
              placeholder="Enter your name"
            />

            <input
              type="email"
              placeholder="Enter your email"
            />

            <input
              type="password"
              placeholder="Create password"
            />

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className="auth-bottom-text">

            Already have an account?

            <span> Login</span>

          </p>

        </div>

      </div>

    </section>
  );
};

export default Signup;