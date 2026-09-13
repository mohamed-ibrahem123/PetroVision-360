import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignInStep1 from './components/SignInStep1';
import StepTwoWM from './components/StepTwoWM';
import StepTwoManager from './components/StepTwoManager';
import StepThreeUpload from './components/StepThreeUpload';
import FacilityManagerDashboard from './components/Dashboard/FacilityManagerDashboard';
import DepartmentManagerDashboard from './components/Dashboard/DepartmentManagerDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

function AppRoutes() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/sign-in');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleDemo = () => {
    console.log('Demo clicked');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <WelcomePage 
            onGetStarted={handleGetStarted} 
            onSignIn={handleSignIn} 
            onDemo={handleDemo} 
          />
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-in/step-1" element={<SignInStep1 />} />
      <Route path="/sign-in/step-2-wm" element={<StepTwoWM />} />
      <Route path="/sign-in/step-2-manager" element={<StepTwoManager />} />
      <Route path="/sign-in/step-3-upload" element={<StepThreeUpload />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['FacilityManager']}>
            <FacilityManagerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/department-manager-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['DepartmentManager', 'Department Manager']}>
            <DepartmentManagerDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
