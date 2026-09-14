import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import StepsIndicator from './common/StepsIndicator';
import logoSrc from '../assets/logo.svg';
import { api } from '../services/api';
import './SignUp.css';
import './SignUpStep1.css';

export default function SignUpStep1() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!selectedRole) {
      setError('Please select a role.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await api.post('/api/Onboarding/role', { role: selectedRole });

      if (selectedRole === 'FacilityManager') {
        navigate('/sign-up/step-2-manager');
      } else if (selectedRole === 'DepartmentManager' || selectedRole === 'Worker') {
        navigate('/sign-up/step-2-wm');
      }
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
          message: errorData.message || errorData.title || err.message || 'Failed to save role.',
          errors: parsedErrors
        });
      } else {
        setError(err.message || 'Failed to save role. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pv-signup-wrapper">
      {/* Left Side: Image with Overlay */}
      <div className="pv-signup-left">
        <div className="pv-signup-overlay" />
        <div className="pv-signup-logo-container">
          <Logo />
        </div>
      </div>

      {/* Right Side: Step 1 Content */}
      <div className="pv-signup-right">
        <div className="pv-step1-container">

          <div className="pv-signup-header">
            <img src={logoSrc} alt="PetroVision 360 Logo" className="pv-signup-header-logo" />
            <h1 className="pv-signup-title">Welcome to PETRO VISION</h1>
          </div>

          <StepsIndicator currentStep={1} />

          {error && (
            <div className="pv-signup-error" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>
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

          {/* Role Cards */}
          <div className="pv-roles-grid">

            <button
              type="button"
              className={`pv-role-card ${selectedRole === 'FacilityManager' ? 'pv-role-card-active' : ''}`}
              onClick={() => setSelectedRole('FacilityManager')}
            >
              <svg className="pv-role-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="pv-role-title">Facility Manager</span>
            </button>

            <button
              type="button"
              className={`pv-role-card ${selectedRole === 'DepartmentManager' ? 'pv-role-card-active' : ''}`}
              onClick={() => setSelectedRole('DepartmentManager')}
            >
              <svg className="pv-role-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              <span className="pv-role-title">Department<br />Manager</span>
            </button>

            <button
              type="button"
              className={`pv-role-card ${selectedRole === 'Worker' ? 'pv-role-card-active' : ''}`}
              onClick={() => setSelectedRole('Worker')}
            >
              <svg className="pv-role-icon" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="7" r="3" />
                <path d="M12 11c-2.4 0-7 1.2-7 3.6V17h14v-2.4c0-2.4-4.6-3.6-7-3.6z" />
                <circle cx="17.5" cy="8.5" r="2.5" />
                <path d="M17.5 12.2c-.8 0-1.6.2-2.3.5 1.1 1 1.8 2.3 1.8 3.8v.5h4v-1.8c0-2-3.8-3-3.5-3z" />
                <circle cx="6.5" cy="8.5" r="2.5" />
                <path d="M6.5 12.2c.3 0-3.5 1-3.5 3v1.8h4v-.5c0-1.5.7-2.8 1.8-3.8-.7-.3-1.5-.5-2.3-.5z" />
              </svg>
              <span className="pv-role-title">Worker</span>
            </button>

          </div>

          <div className="pv-step1-actions">
            <button type="button" className="pv-step1-next-btn" onClick={handleNext} disabled={loading}>
              {loading ? 'Processing...' : 'Next'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
