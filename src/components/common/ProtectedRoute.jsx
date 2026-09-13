import { Navigate } from 'react-router-dom';
import { tokenStorage } from '../../services/api';

export default function ProtectedRoute({ allowedRoles, children }) {
  const token = tokenStorage.get();

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  try {
    const payloadStr = atob(token.split('.')[1]);
    const payload = JSON.parse(payloadStr);
    const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || payload.role;

    if (!allowedRoles.includes(role)) {
      // Role not allowed
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    console.error('Failed to parse token in ProtectedRoute', err);
    // Invalid token or decoding failed
    tokenStorage.clear();
    return <Navigate to="/login" replace />;
  }
}
