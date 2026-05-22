import "./Dashboard.css";

const Dashboard = () => {

  return (

    <section className="dashboard">

      {/* SIDEBAR */}

      <div className="dashboard-sidebar">

        <h2 className="dashboard-logo">
          QRify
        </h2>

        <ul className="dashboard-menu">

          <li className="active">
            Dashboard
          </li>

          <li>
            My QR Codes
          </li>

          <li>
            Templates
          </li>

          <li>
            Analytics
          </li>

          <li>
            Settings
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}

      <div className="dashboard-content">

        <div className="dashboard-header">

          <h1>
            Dashboard
          </h1>

          <button>
            Create QR
          </button>

        </div>

        {/* STATS */}

        <div className="dashboard-stats">

          <div className="stats-card">

            <h2>120</h2>

            <p>Total QR Codes</p>

          </div>

          <div className="stats-card">

            <h2>5.2K</h2>

            <p>Total Scans</p>

          </div>

          <div className="stats-card">

            <h2>98%</h2>

            <p>Success Rate</p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Dashboard;