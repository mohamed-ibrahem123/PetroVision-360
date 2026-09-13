import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import logoSrc from '../assets/logo.svg';
import { api, tokenStorage } from '../services/api';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api/Auth/login', {
        email: email.trim(),
        password: password
      });

      // Handle both { token: '...' } and string responses
      const token = response?.token || response?.data?.token || (typeof response === 'string' ? response : null);
      
      if (token) {
        tokenStorage.set(token);

        try {
          const payloadStr = atob(token.split('.')[1]);
          const payload = JSON.parse(payloadStr);
          const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || payload.role;
          
          if (role === 'FacilityManager') {
            navigate('/dashboard');
            return;
          }
        } catch (err) {
          console.error('Failed to parse token for role redirection', err);
        }

        navigate('/'); // Redirect to home/dashboard
      } else {
        // Fallback if the token isn't exactly where we expected, try to set the whole response or handle it
        if (response && typeof response === 'object' && Object.keys(response).length > 0) {
            // Some APIs might return a different structure
            const possibleToken = Object.values(response).find(val => typeof val === 'string' && val.length > 20);
            if(possibleToken) {
                tokenStorage.set(possibleToken);
                navigate('/');
                return;
            }
        }
        setError('Login successful, but no token was returned.');
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
          message: errorData.message || errorData.title || err.message || 'Login failed.',
          errors: parsedErrors
        });
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pv-login-wrapper">
      {/* Left Side: Image with Overlay */}
      <div className="pv-login-left">
        <div className="pv-login-overlay" />
        <div className="pv-login-logo-container">
          <Logo />
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="pv-login-right">
        <div className="pv-login-form-container">

          <div className="pv-login-header">
            <img src={logoSrc} alt="PetroVision 360 Logo" className="pv-login-header-logo" />
            <h1 className="pv-login-title">Welcome Back</h1>
            <p className="pv-login-subtitle">
              Securely access the PetroVision 360 facility safety management platform.
            </p>
          </div>

          <form className="pv-login-form" onSubmit={handleLogin}>
            {error && (
              <div className="pv-login-error" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>
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
              <label className="pv-form-label">User Name /E_mail</label>
              <div className="pv-input-wrapper">
                <div className="pv-input-icon-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="pv-form-input" 
                  placeholder="Enter your user name/email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="pv-form-group">
              <label className="pv-form-label">Password</label>
              <div className="pv-input-wrapper">
                <div className="pv-input-icon-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pv-form-input"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="pv-input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pv-login-actions">
              <label className="pv-checkbox-wrapper">
                <input type="checkbox" className="pv-checkbox" defaultChecked />
                <span className="pv-checkbox-label">remember me</span>
              </label>
              <a href="#" className="pv-forgot-link">Forget Password?</a>
            </div>

            <button type="submit" className="pv-login-submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Login In'}
            </button>
          </form>

          <div className="pv-login-footer">
            Don't have Account?
            <Link to="/sign-in" className="pv-signup-link">Sign in</Link>
          </div>

        </div >
      </div >
    </div >
  );
}
