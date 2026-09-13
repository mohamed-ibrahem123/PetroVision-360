import { Link, useLocation } from 'react-router-dom';
import { tokenStorage } from '../../../services/api';
import logoSrc from '../../../assets/logo.svg';
import Logo from "../../common/Logo"

export default function DashboardSidebar({ isOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;

  let role = '';
  const token = tokenStorage.get();
  if (token) {
    try {
      const payloadStr = atob(token.split('.')[1]);
      const payload = JSON.parse(payloadStr);
      role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || payload.role;
    } catch (e) {
      console.error('Sidebar could not parse token role', e);
    }
  }

  let menuItems = [];

  if (role === 'DepartmentManager' || role === 'Department Manager') {
    menuItems = [
      { label: 'Dashboard', path: '/department-manager-dashboard', icon: 'grid', badge: null },
      { label: 'Digital Twin', path: '#', icon: 'box', badge: { text: 'Live', type: 'live' } },
      { label: 'Live Monitoring', path: '#', icon: 'video', badge: null },
      { label: 'Alerts', path: '#', icon: 'bell', badge: { text: '4 Today', type: 'warning' } },
      { label: 'Incidents', path: '#', icon: 'alert-triangle', badge: { text: '1 Pending', type: 'critical' } },
      { label: 'Technicians Team', path: '#', icon: 'users', badge: null },
      { label: 'Equipment & Assets', path: '#', icon: 'settings', badge: null },
      { label: 'Analytics & Reports', path: '/department-manager-dashboard/analytics', icon: 'bar-chart', badge: null },
    ];
  } else {
    // Default / Facility Manager
    menuItems = [
      { label: 'Dashboard', path: '/dashboard', icon: 'grid', badge: null },
      { label: 'Digital Twin', path: '#', icon: 'box', badge: { text: 'Live', type: 'live' } },
      { label: 'Live Monitoring', path: '#', icon: 'video', badge: null },
      { label: 'Alerts', path: '#', icon: 'bell', badge: { text: '7', type: 'warning' } },
      { label: 'Incidents', path: '#', icon: 'alert-triangle', badge: { text: '1 Active', type: 'critical' } },
      { label: 'Management Team', path: '#', icon: 'users', badge: null },
      { label: 'Equipment & Assets', path: '#', icon: 'settings', badge: null },
      { label: 'Analytics & Reports', path: '#', icon: 'bar-chart', badge: null },
    ];
  }

  const renderIcon = (name) => {
    // Simple SVG placeholders based on feather icons
    switch (name) {
      case 'grid': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
      case 'box': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
      case 'video': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
      case 'bell': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
      case 'alert-triangle': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
      case 'users': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
      case 'settings': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
      case 'bar-chart': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
      case 'log-out': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fm-menu-icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
      default: return null;
    }
  };

  return (
    <aside className={`fm-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="fm-sidebar-logo">
        {/* <img src={logoSrc} alt="Petro Vision 360" /> <span >PETRO VISION360</span> */}
        <Logo fontColor="#000000" fontSize="15px" />
      </div>

      <div className="fm-menu-label">MENU</div>

      <nav className="fm-sidebar-menu">
        {menuItems.map((item, idx) => {
          const isActive = currentPath === item.path;
          return (
            <Link key={idx} to={item.path} className={`fm-menu-item ${isActive ? 'active' : ''}`}>
              <div className="fm-menu-item-left">
                {renderIcon(item.icon)}
                {item.label}
              </div>
              {item.badge && (
                <span className={`fm-menu-badge ${item.badge.type}`}>{item.badge.text}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="fm-menu-label">GENERAL</div>
      <nav className="fm-sidebar-menu" style={{ flex: 'none' }}>
        <Link to="#" className="fm-menu-item">
          <div className="fm-menu-item-left">
            {renderIcon('settings')}
            Settings
          </div>
        </Link>
        <Link to="/login" className="fm-menu-item" onClick={() => localStorage.removeItem('authToken')}>
          <div className="fm-menu-item-left">
            {renderIcon('log-out')}
            Sign out
          </div>
        </Link>
      </nav>
    </aside>
  );
}
