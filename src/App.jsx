import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignInStep1 from './components/SignInStep1';
import StepTwoWM from './components/StepTwoWM';
import StepTwoManager from './components/StepTwoManager';

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
