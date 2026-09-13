import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import StatCard from './components/StatCard';
import LiveMonitoring from './components/LiveMonitoring';
import DigitalTwin from './components/DigitalTwin';
import RecentAlerts from './components/RecentAlerts';
import AnalyticsOverview from './components/AnalyticsOverview';
import DashboardSkeleton from './components/DashboardSkeleton';
import './styles/facility-manager.css';

export default function FacilityManagerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/Dashboard/facility-manager');
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
        <DashboardSidebar />
        <div className="fm-main-content">
          <DashboardHeader welcomeMessage="Welcome" facilityName="Facility" location="Unknown" />
          <div className="fm-empty-container">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <h2 style={{ margin: 0, color: '#0f172a' }}>No Dashboard Data Available</h2>
            <p style={{ color: '#64748b' }}>The facility manager dashboard currently has no data to display.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fm-dashboard-layout">
      <div className={`fm-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <DashboardSidebar isOpen={sidebarOpen} />
      
      <div className="fm-main-content">
        <DashboardHeader 
          welcomeMessage={data.welcomeMessage} 
          facilityName={data.facilityName} 
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
          
          {/* Main Content Grid */}
          <div className="fm-main-grid">
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <LiveMonitoring cameras={data.liveCameras} />
              <DigitalTwin data={data.digitalTwin} />
            </div>
            
            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <RecentAlerts alerts={data.recentAlerts} />
              <AnalyticsOverview data={data.analytics} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
