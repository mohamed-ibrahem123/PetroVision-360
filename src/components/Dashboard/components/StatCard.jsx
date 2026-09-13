export default function StatCard({ title, value, subtitle, statusTag, type }) {
  // Determine colors based on type or statusTag
  let colorClass = 'blue';
  if (type === 'cameras') colorClass = 'green';
  if (type === 'incidents') colorClass = 'red';
  if (type === 'alerts') colorClass = 'orange';
  if (type === 'team') colorClass = 'blue';

  const renderIcon = () => {
    switch (type) {
      case 'cameras':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
      case 'incidents':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
      case 'alerts':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
      case 'team':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="fm-stat-card">
      <div className="fm-stat-header">
        <span className="fm-stat-title">{title}</span>
        <div className={`fm-stat-icon-wrapper ${colorClass}`}>
          {renderIcon()}
        </div>
      </div>
      <div className="fm-stat-value-row">
        <span className="fm-stat-value">{value}</span>
        <span className={`fm-stat-tag ${colorClass}`}>{statusTag}</span>
      </div>
      <div className="fm-stat-footer">
        <div className={`fm-stat-footer-dot ${colorClass}`}></div>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
