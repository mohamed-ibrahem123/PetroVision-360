import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import logoSrc from '../assets/logo.svg';
import { api } from '../services/api';
import './StepTwoManager.css';

export default function StepTwoManager() {
  const [facilityName, setFacilityName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!facilityName.trim() || !location.trim()) {
      setError('Facility Name and Location are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await api.post('/api/Onboarding/facility-info', {
        facilityName: facilityName.trim(),
        location: location.trim()
      });
      navigate('/sign-in/step-3-upload');
    } catch (err) {
      const errorData = err.response?.data || err.data;
      if (errorData && (errorData.message || errorData.errors || errorData.title)) {
        let parsedErrors = [];
        if (Array.isArray(errorData.errors)) {
          parsedErrors = errorData.errors;
        } else if (typeof errorData.errors === 'object' && errorData.errors !== null) {
          parsedErrors = Object.values(errorData.errors).flat();
        }
        setError({
          message: errorData.message || errorData.title || err.message || 'Failed to save facility info.',
          errors: parsedErrors
        });
      } else {
        setError(err.message || 'Failed to save facility info. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pv-signin-wrapper">
      {/* Left Side: Image with Overlay */}
      <div className="pv-signin-left">
        <div className="pv-signin-overlay" />
        <div className="pv-signin-logo-container">
          <Logo />
        </div>
      </div>

      {/* Right Side: Step 2 Content */}
      <div className="pv-signin-right">
        <div className="pv-step2-container">

          <div className="pv-signin-header">
            <img src={logoSrc} alt="PetroVision 360 Logo" className="pv-signin-header-logo" />
            <h1 className="pv-signin-title">Welcome to PETRO VISION</h1>
          </div>

          {/* Stepper */}
          <div className="pv-stepper-v2">
            {/* Step 1 (Completed) */}
            <div className="pv-step-v2 pv-step-v2-completed">
              <div className="pv-step-v2-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="pv-step-v2-info">
                <span className="pv-step-v2-name">Step 1</span>
                <span className="pv-step-v2-desc">Choose Your Role</span>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="pv-stepper-line pv-stepper-line-active"></div>

            {/* Step 2 (Active) */}
            <div className="pv-step-v2 pv-step-v2-active">
              <div className="pv-step-v2-circle">2</div>
              <div className="pv-step-v2-info">
                <span className="pv-step-v2-name">Step 2</span>
                <span className="pv-step-v2-desc">Facility Information</span>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="pv-stepper-line"></div>

            {/* Step 3 (Inactive) */}
            <div className="pv-step-v2">
              <div className="pv-step-v2-circle">3</div>
              <div className="pv-step-v2-info">
                <span className="pv-step-v2-name">Step 3</span>
                <span className="pv-step-v2-desc">Upload Evidence</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="pv-step2-form" onSubmit={handleSubmit}>
            
            {error && (
              <div className="pv-signin-error" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {typeof error === 'string' ? error : (
                  <>
                    <div>{error.message}</div>
                    {error.errors && error.errors.length > 0 && (
                      <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                        {error.errors.map((errItem, idx) => (
                          <li key={idx}>{errItem}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="pv-form-group">
              <label className="pv-form-label">Facility Name*</label>
              <div className="pv-input-wrapper">
                <input 
                  type="text" 
                  className="pv-form-input" 
                  placeholder="Enter facility name" 
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="pv-form-group">
              <label className="pv-form-label">Location*</label>
              <div className="pv-input-wrapper">
                <input 
                  type="text" 
                  className="pv-form-input" 
                  placeholder="Enter facility location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={loading}
                />
                <div className="pv-input-icon-right" style={{ pointerEvents: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>
            <button type="submit" className="pv-step2-submit" disabled={loading}>
              {loading ? 'Processing...' : 'Continue'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
