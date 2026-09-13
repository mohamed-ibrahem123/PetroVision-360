import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import StepsIndicator from './common/StepsIndicator';
import logoSrc from '../assets/logo.svg';
import { api } from '../services/api';
import './StepTwoWM.css';

export default function StepTwoWM() {
  const [facilities, setFacilities] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  const [loadingFacilities, setLoadingFacilities] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await api.get('/api/Onboarding/facilities/lookup');
        setFacilities(Array.isArray(res) ? res : (res?.data || []));
      } catch (err) {
        console.error("Failed to fetch facilities", err);
      } finally {
        setLoadingFacilities(false);
      }
    };
    fetchFacilities();
  }, []);

  useEffect(() => {
    if (!selectedFacility) {
      setDepartments([]);
      setSelectedDepartment('');
      return;
    }

    const fetchDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const res = await api.get(`/api/Onboarding/facilities/${selectedFacility}/departments/lookup`);
        setDepartments(Array.isArray(res) ? res : (res?.data || []));
      } catch (err) {
        console.error("Failed to fetch departments", err);
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, [selectedFacility]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFacility || !selectedRole || !selectedDepartment) {
      setError('Facility, Role, and Department are required.');
      return;
    }

    setError('');
    setLoadingSubmit(true);

    try {
      await api.post('/api/Onboarding/employee-info', {
        facilityId: selectedFacility,
        departmentId: selectedDepartment,
        role: selectedRole
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
          message: errorData.message || errorData.title || err.message || 'Failed to save employee info.',
          errors: parsedErrors
        });
      } else {
        setError(err.message || 'Failed to save employee info. Please try again.');
      }
    } finally {
      setLoadingSubmit(false);
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

          <StepsIndicator currentStep={2} />

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
                <select 
                  className="pv-form-input pv-form-select" 
                  value={selectedFacility} 
                  onChange={(e) => setSelectedFacility(e.target.value)} 
                  disabled={loadingFacilities || loadingSubmit}
                >
                  <option value="" disabled hidden>{loadingFacilities ? 'Loading facilities...' : 'Select your facility'}</option>
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
                <div className="pv-input-icon-right" style={{ pointerEvents: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pv-form-group">
              <label className="pv-form-label">Employee Role*</label>
              <div className="pv-input-wrapper">
                <select 
                  className="pv-form-input pv-form-select" 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  disabled={loadingSubmit}
                >
                  <option value="" disabled hidden>Select your role</option>
                  <option value="manager">Manager</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="worker">Worker</option>
                </select>
                <div className="pv-input-icon-right" style={{ pointerEvents: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pv-form-group">
              <label className="pv-form-label">Department Name*</label>
              <div className="pv-input-wrapper">
                <select 
                  className="pv-form-input pv-form-select" 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  disabled={!selectedFacility || loadingDepartments || loadingSubmit}
                >
                  <option value="" disabled hidden>
                    {loadingDepartments ? 'Loading departments...' : 'Select your department'}
                  </option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <div className="pv-input-icon-right" style={{ pointerEvents: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" className="pv-step2-submit" disabled={loadingSubmit}>
              {loadingSubmit ? 'Processing...' : 'Continue'} 
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
