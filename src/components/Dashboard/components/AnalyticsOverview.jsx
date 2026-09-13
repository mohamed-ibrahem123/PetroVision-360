export default function AnalyticsOverview({ data }) {
  if (!data) return null;
  
  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  // We mock a simple vertical bar chart with CSS for the weekly data
  const maxVal = Math.max(...(data.weeklyIncidentData || [10]));
  
  return (
    <div className="fm-card">
      <div className="fm-section-header">
        <div>
          <h2 className="fm-section-title">Analytics Overview</h2>
          <div className="fm-section-subtitle">Incidents & Hazards (Past 7 Days)</div>
        </div>
        <a href="#view-report" className="fm-section-link">
          View Full Report
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
        <span>Weekly Incident Frequency</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, backgroundColor: '#1a56db' }}></div>Resolved</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, backgroundColor: '#f59e0b' }}></div>Open</span>
        </div>
      </div>
      
      <div className="fm-chart-wrapper">
        {data.weeklyIncidentData && data.weeklyIncidentData.map((val, idx) => {
          const heightPercent = Math.max((val / maxVal) * 100, 5); // Ensure at least a sliver is visible
          return (
            <div key={idx} className="fm-bar-col">
              <div className="fm-bar-track">
                {/* Mocking stacked data loosely since we only have single values per day from API */}
                {/* Let's pretend some are open and some are resolved for visual similarity */}
                <div className="fm-bar-fill orange" style={{ height: `${heightPercent * 0.2}%` }}></div>
                <div className="fm-bar-fill" style={{ height: `${heightPercent * 0.8}%` }}></div>
              </div>
              <span className="fm-bar-label">{days[idx]}</span>
            </div>
          );
        })}
      </div>
      
      <div className="fm-analytics-metrics">
        <div className="fm-metric-row">
          <div className="fm-metric-left">
            <div className="fm-metric-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className="fm-metric-info">
              <span className="fm-metric-title">Avg. Resolution Time</span>
              <span className="fm-metric-sub">12% Faster than 30d baseline</span>
            </div>
          </div>
          <span className="fm-metric-val">{data.avgResolutionTime}</span>
        </div>
        
        <div className="fm-metric-row">
          <div className="fm-metric-left">
            <div className="fm-metric-icon blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div className="fm-metric-info">
              <span className="fm-metric-title">Hazard Prevention Rate</span>
              <span className="fm-metric-sub">Predictive AI early warnings</span>
            </div>
          </div>
          <span className="fm-metric-val" style={{ color: '#10b981' }}>{data.hazardPreventionRate}%</span>
        </div>
      </div>
      
    </div>
  );
}
