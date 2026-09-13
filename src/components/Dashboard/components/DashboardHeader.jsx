export default function DashboardHeader({ welcomeMessage, facilityName, location, onMenuClick, loading }) {
  return (
    <header className="fm-header">
      <div className="fm-header-left">
        <button className="fm-mobile-menu-btn" onClick={onMenuClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className="fm-header-title">
          {loading ? <div className="fm-skeleton-shimmer" style={{ width: '200px', height: '24px', marginBottom: '8px' }}></div> : <h1>{welcomeMessage || 'Welcome'}</h1>}
        </div>
        <div className="fm-header-subtitle">
          {loading ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div className="fm-skeleton-shimmer" style={{ width: '80px', height: '14px' }}></div>
              <div className="fm-skeleton-shimmer" style={{ width: '12px', height: '12px', borderRadius: '50%' }}></div>
              <div className="fm-skeleton-shimmer" style={{ width: '60px', height: '14px' }}></div>
            </div>
          ) : (
            <>
              <span>{facilityName || 'Facility'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>{location || 'Location'}</span>
            </>
          )}
        </div>
      </div>

      {/* <div className="fm-header-right">
        <div className="fm-header-actions">
          <button className="fm-header-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>

        <div className="fm-header-profile">
          {loading ? (
            <>
              <div className="fm-skeleton-shimmer" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
              <div className="fm-profile-info" style={{ gap: '4px' }}>
                <div className="fm-skeleton-shimmer" style={{ width: '80px', height: '14px' }}></div>
                <div className="fm-skeleton-shimmer" style={{ width: '120px', height: '12px' }}></div>
              </div>
            </>
          ) : (
            <>
              <img src="https://ui-avatars.com/api/?name=Adam+Ali&background=e2e8f0&color=0f172a" alt="User Profile" className="fm-profile-img" />
              <div className="fm-profile-info">
                <span className="fm-profile-name">Adam Ali</span>
                <span className="fm-profile-role">Facility Manager, Admin</span>
              </div>
            </>
          )}
        </div>
      </div> */}
    </header>
  );
}
