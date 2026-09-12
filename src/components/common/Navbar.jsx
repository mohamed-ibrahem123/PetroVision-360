import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar({ onDemoClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <header className="pv-navbar-wrapper">
      <div className="pv-navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="pv-nav-brand-link" aria-label="PetroVision 360 Home">
          <Logo />
        </Link>

        {/* Desktop Navigation Links & Action */}
        <nav className="pv-desktop-nav" aria-label="Main Navigation">
          <ul className="pv-nav-links">
            <li>
              <a href="#how-it-works" className="pv-nav-link">
                How It Works
              </a>
            </li>
            <li>
              <a href="#about" className="pv-nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="pv-nav-link">
                Contact
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="pv-btn-demo"
            onClick={onDemoClick}
          >
            Demo
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="pv-mobile-toggle"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`pv-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`pv-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`pv-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="pv-mobile-menu">
          <a
            href="#how-it-works"
            className="pv-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#about"
            className="pv-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="pv-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <div className="pv-mobile-actions">
            <button
              type="button"
              className="pv-btn-demo w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onDemoClick?.();
              }}
            >
              Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
