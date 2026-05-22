import "./Auth.css";

const Login = () => {
  return (
    <section className="auth-section">
      <div className="auth-container">

        <div className="auth-left">
          <h1>Welcome Back</h1>

          <p>
            Login to manage your QR codes, templates, analytics,
            and downloads in one place.
          </p>
        </div>

        <div className="auth-right">
          <h2>Login</h2>

          <form className="auth-form">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <input
              type="password"
              placeholder="Enter your password"
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p className="auth-bottom-text">
            Don’t have an account?
            <span> Signup</span>
          </p>

        </div>

      </div>
    </section>
  );
};

export default Login; 