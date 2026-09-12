import Navbar from './common/Navbar';
import welcomeImg from '../assets/welcome-img.png';
import './WelcomePage.css';

export default function WelcomePage({ onGetStarted, onSignIn, onDemo }) {
  return (
    <div className="pv-hero-wrapper">
      {/* Background Image with Cinematic Industrial Overlays */}
      <div
        className="pv-hero-bg"
        style={{ backgroundImage: `url(${welcomeImg})` }}
      >
        <div className="pv-hero-overlay" />
      </div>

      {/* Top Navbar */}
      <Navbar onDemoClick={onDemo} />


      {/* Main Hero Container */}
      <main className="pv-hero-content">
        {/* Central Titles & CTAs */}
        <section className="pv-hero-center-section">
          <h1 className="pv-hero-title">
            PETRO VISION 360
          </h1>

          <p className="pv-hero-subtitle-primary">
            See the Risk Before It Becomes an Incident.
          </p>

          <p className="pv-hero-subtitle-secondary">
            AI-powered vision that catches fire, falls, leaks, and corrosion — seconds before traditional sensors do.
          </p>

          <div className="pv-hero-cta-group">
            <button
              type="button"
              className="pv-btn-primary"
              onClick={onGetStarted}
            >
              <span>Get Started Now</span>
              <svg
                className="pv-arrow-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button
              type="button"
              className="pv-btn-secondary"
              onClick={onSignIn}
            >
              Login
            </button>
          </div>
        </section>

        {/* Bottom Glassmorphism Feature Cards */}
        <section className="pv-hero-bottom-section">
          <div className="pv-glass-grid">
            {/* Feature Card 1 */}
            <div className="pv-glass-card">
              <h2 className="pv-glass-card-title">
                Predict Risks Early
              </h2>
              <p className="pv-glass-card-desc">
                Identify potential hazards before they become critical.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="pv-glass-card">
              <h2 className="pv-glass-card-title">
                Monitor Operations Live
              </h2>
              <p className="pv-glass-card-desc">
                Track assets and detect anomalies in real time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
