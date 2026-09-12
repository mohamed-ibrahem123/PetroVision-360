import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import logoSrc from '../assets/logo.svg';
import { api } from '../services/api';
import './StepTwoManager.css'; 
import './StepThreeUpload.css';

export default function StepThreeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // api.js automatically omits Content-Type for FormData
      await api.post('/api/Onboarding/upload-evidence', formData);
      
      setIsSuccess(true);
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
          message: errorData.message || errorData.title || err.message || 'Upload failed.',
          errors: parsedErrors
        });
      } else {
        setError(err.message || 'Upload failed. Please try again.');
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

      {/* Right Side: Step 3 Content */}
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

            <div className="pv-stepper-line pv-stepper-line-active"></div>

            {/* Step 2 (Completed) */}
            <div className="pv-step-v2 pv-step-v2-completed">
              <div className="pv-step-v2-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="pv-step-v2-info">
                <span className="pv-step-v2-name">Step 2</span>
                <span className="pv-step-v2-desc">Facility Information</span>
              </div>
            </div>

            <div className="pv-stepper-line pv-stepper-line-active"></div>

            {/* Step 3 */}
            <div className={`pv-step-v2 ${isSuccess ? 'pv-step-v2-completed' : 'pv-step-v2-active'}`}>
              <div className="pv-step-v2-circle">
                {isSuccess ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  "3"
                )}
              </div>
              <div className="pv-step-v2-info">
                <span className="pv-step-v2-name">Step 3</span>
                <span className="pv-step-v2-desc">Upload Evidence</span>
              </div>
            </div>
          </div>

          {/* Form or Success State */}
          {!isSuccess ? (
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

              <div className="pv-upload-box">
                <input 
                  type="file" 
                  id="evidence-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  disabled={loading}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="evidence-upload" className="pv-upload-label">
                  <svg className="pv-upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span className="pv-upload-text">Upload a confirm file/ID Card/etc.</span>
                  <span className="pv-upload-subtext">Max file size: 5MB (PDF, PNG, JPG).</span>
                </label>
              </div>

              {selectedFile && (
                <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#0f4a6e', fontSize: '0.875rem' }}>
                  {selectedFile.name}
                </div>
              )}

              <button type="submit" className="pv-btn-submit" disabled={loading || !selectedFile}>
                {loading ? 'Uploading...' : 'Submit'}
              </button>

            </form>
          ) : (
            <div className="pv-success-container">
              <div className="pv-success-icon-wrapper">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="pv-success-title">Submitted Successfully!</h2>
              <p className="pv-success-message">
                "Your information has been submitted successfully and confirmed by admin. You can now access your dashboard."
              </p>
              <button type="button" onClick={() => navigate('/')} className="pv-btn-dashboard">
                Go to Dashboard 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <p className="pv-assistance-text">
                Need assistance? <a href="#">Contact Facility Administrator</a>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
