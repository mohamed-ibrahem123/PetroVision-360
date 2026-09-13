export default function RecentAlerts({ alerts }) {
  return (
    <div className="fm-card">
      <div className="fm-section-header" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="fm-section-title">Recent Alerts</h2>
          <div className="fm-section-subtitle" style={{ color: '#f59e0b', fontWeight: 600 }}>7 Today</div>
        </div>
        <a href="#view-all-alerts" className="fm-section-link">
          View All
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      
      <div className="fm-alerts-list">
        {alerts && alerts.map(alert => (
          <div key={alert.id} className={`fm-alert-item severity-${alert.severity}`}>
            <div className="fm-alert-header">
              <div className="fm-alert-title-wrap">
                <div className={`fm-alert-dot severity-${alert.severity}`}></div>
                <span className="fm-alert-title">{alert.title}</span>
              </div>
              <span className="fm-alert-time">{alert.timeAgo}</span>
            </div>
            
            <div className="fm-alert-desc">
              {alert.description}
            </div>
            
            <div className={`fm-alert-status ${alert.status}`}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              {alert.status === 'BeingHandled' ? 'Being Handled' : 
               alert.status === 'UnderInvestigation' ? 'Under Investigation' : alert.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
