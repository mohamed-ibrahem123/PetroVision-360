import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import StatCard from './components/StatCard';
import LiveMonitoring from './components/LiveMonitoring';
import RecentAlerts from './components/RecentAlerts';
import DashboardSkeleton from './components/DashboardSkeleton';
import './styles/facility-manager.css'; // Reusing the same styles

export default function DepartmentManagerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/Dashboard/department-manager');
        if (response && response.isSuccess) {
          setData(response.data);
        } else {
          setError('Failed to fetch dashboard data.');
        }
      } catch (err) {
        console.error('Dashboard Error:', err);
        setError(err.message || 'An error occurred while loading the dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="fm-dashboard-layout">
        <div className={`fm-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
        <DashboardSidebar isOpen={sidebarOpen} />
        
        <div className="fm-main-content">
          <DashboardHeader loading={true} onMenuClick={() => setSidebarOpen(true)} />
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fm-error-container">
        <div style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: 600 }}>Error Loading Dashboard</div>
        <div style={{ color: '#64748b' }}>{error}</div>
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: '8px 16px', backgroundColor: '#11536b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '16px' }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || !data.hasData) {
    return (
      <div className="fm-dashboard-layout">
        <div className={`fm-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
        <DashboardSidebar isOpen={sidebarOpen} />
        
        <div className="fm-main-content">
          <DashboardHeader 
            welcomeMessage={data?.welcomeMessage} 
            facilityName={data?.departmentName} 
            location={data?.location} 
            onMenuClick={() => setSidebarOpen(true)}
          />
          <div className="fm-dashboard-body">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>Over View</h2>
            
            <div className="fm-overview-grid">
              <StatCard type="cameras" title="Zone Cameras" isEmpty={true} />
              <StatCard type="incidents" title="Dept Incidents" isEmpty={true} />
              <StatCard type="alerts" title="Dept Alerts" isEmpty={true} />
              <StatCard type="team" title="Field Workers" isEmpty={true} />
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center', marginTop: '24px', animation: 'fmFadeIn 0.5s ease' }}>
              <div style={{ color: '#cbd5e1', marginBottom: '8px' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 8H3V4h18v4zm-2 2H5v10h14V10zm-5 4H10v-2h4v2z" />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>There is no data currently</h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '500px', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                Welcome! Start by setting up your department details to view live telemetry, analytics, and active alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const alertsSubtitle = data.alertsStat 
    ? `${data.alertsStat.value || ''} ${data.alertsStat.subtitle || ''}`.trim() 
    : 'No Recent Alerts';

  return (
    <div className="fm-dashboard-layout">
      <div className={`fm-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <DashboardSidebar isOpen={sidebarOpen} />
      
      <div className="fm-main-content">
        <DashboardHeader 
          welcomeMessage={data.welcomeMessage} 
          facilityName={data.departmentName} 
          location={data.location} 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <div className="fm-dashboard-body">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>Over View</h2>
          
          {/* Top Stats Row */}
          <div className="fm-overview-grid">
            {data.camerasStat && <StatCard type="cameras" {...data.camerasStat} />}
            {data.incidentsStat && <StatCard type="incidents" {...data.incidentsStat} />}
            {data.alertsStat && <StatCard type="alerts" {...data.alertsStat} />}
            {data.teamStat && <StatCard type="team" {...data.teamStat} />}
          </div>
          
          {/* Main Content Grid for Department Manager */}
          <div className="fm-main-grid">
            {/* Left Column (Zone Cameras) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <LiveMonitoring cameras={data.zoneCameras} />
            </div>
            
            {/* Right Column (Recent Alerts) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <RecentAlerts alerts={data.recentAlerts} alertsSubtitle={alertsSubtitle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
