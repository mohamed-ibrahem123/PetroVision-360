import React from 'react';

export default function DashboardSkeleton() {
  return (
    <div className="fm-dashboard-body" style={{ animation: 'none' }}>
      <div className="fm-skeleton-shimmer" style={{ width: '120px', height: '24px', marginBottom: '8px', borderRadius: '4px' }}></div>
      
      {/* Top Stats Row */}
      <div className="fm-overview-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="fm-stat-card" style={{ animation: 'none', transform: 'none', boxShadow: 'none' }}>
            <div className="fm-stat-header">
              <div className="fm-skeleton-shimmer" style={{ width: '60%', height: '16px' }}></div>
              <div className="fm-skeleton-shimmer" style={{ width: '36px', height: '36px', borderRadius: '8px' }}></div>
            </div>
            <div className="fm-stat-value-row">
              <div className="fm-skeleton-shimmer" style={{ width: '50%', height: '32px' }}></div>
              <div className="fm-skeleton-shimmer" style={{ width: '40px', height: '16px', borderRadius: '12px' }}></div>
            </div>
            <div className="fm-stat-footer">
              <div className="fm-skeleton-shimmer" style={{ width: '8px', height: '8px', borderRadius: '50%' }}></div>
              <div className="fm-skeleton-shimmer" style={{ width: '40%', height: '12px' }}></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="fm-main-grid" style={{ animation: 'none' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Digital Twin Skeleton */}
          <div className="fm-card" style={{ animation: 'none', transform: 'none', boxShadow: 'none' }}>
            <div className="fm-section-header">
              <div style={{ width: '100%' }}>
                <div className="fm-skeleton-shimmer" style={{ width: '40%', height: '20px', marginBottom: '8px' }}></div>
                <div className="fm-skeleton-shimmer" style={{ width: '60%', height: '14px' }}></div>
              </div>
              <div className="fm-skeleton-shimmer" style={{ width: '100px', height: '32px', borderRadius: '6px' }}></div>
            </div>
            <div className="fm-skeleton-shimmer" style={{ width: '100%', height: '280px', borderRadius: '12px', marginBottom: '16px' }}></div>
            <div className="fm-twin-stats-row">
              {[1, 2, 3].map(i => (
                <div key={i} className="fm-twin-stat-box" style={{ animation: 'none', transform: 'none' }}>
                  <div className="fm-skeleton-shimmer" style={{ width: '60%', height: '12px', marginBottom: '8px' }}></div>
                  <div className="fm-skeleton-shimmer" style={{ width: '40%', height: '20px' }}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Monitoring Skeleton */}
          <div className="fm-card" style={{ animation: 'none', transform: 'none', boxShadow: 'none' }}>
            <div className="fm-section-header">
              <div style={{ width: '100%' }}>
                <div className="fm-skeleton-shimmer" style={{ width: '40%', height: '20px', marginBottom: '8px' }}></div>
                <div className="fm-skeleton-shimmer" style={{ width: '60%', height: '14px' }}></div>
              </div>
              <div className="fm-skeleton-shimmer" style={{ width: '80px', height: '20px' }}></div>
            </div>
            <div className="fm-cameras-grid">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="fm-skeleton-shimmer" style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px' }}></div>
              ))}
            </div>
          </div>
          
        </div>
        
        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Analytics Skeleton */}
          <div className="fm-card" style={{ animation: 'none', transform: 'none', boxShadow: 'none' }}>
             <div className="fm-section-header">
              <div style={{ width: '100%' }}>
                <div className="fm-skeleton-shimmer" style={{ width: '50%', height: '20px', marginBottom: '8px' }}></div>
                <div className="fm-skeleton-shimmer" style={{ width: '40%', height: '14px' }}></div>
              </div>
            </div>
            <div className="fm-skeleton-shimmer" style={{ width: '100%', height: '200px', borderRadius: '12px', marginBottom: '16px' }}></div>
            <div className="fm-skeleton-shimmer" style={{ width: '100%', height: '60px', borderRadius: '8px', marginBottom: '12px' }}></div>
            <div className="fm-skeleton-shimmer" style={{ width: '100%', height: '60px', borderRadius: '8px' }}></div>
          </div>

          {/* Alerts Skeleton */}
          <div className="fm-card" style={{ animation: 'none', transform: 'none', boxShadow: 'none' }}>
            <div className="fm-section-header">
              <div style={{ width: '100%' }}>
                <div className="fm-skeleton-shimmer" style={{ width: '50%', height: '20px', marginBottom: '8px' }}></div>
                <div className="fm-skeleton-shimmer" style={{ width: '30%', height: '14px' }}></div>
              </div>
            </div>
            <div className="fm-alerts-list">
              {[1, 2, 3].map(i => (
                <div key={i} className="fm-alert-item" style={{ animation: 'none', transform: 'none', backgroundColor: i % 2 === 0 ? '#fff1f2' : '#fffbeb', borderColor: i % 2 === 0 ? '#fecdd3' : '#fde68a' }}>
                  <div className="fm-alert-header">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '70%' }}>
                      <div className="fm-skeleton-shimmer" style={{ width: '10px', height: '10px', borderRadius: '50%' }}></div>
                      <div className="fm-skeleton-shimmer" style={{ width: '80%', height: '16px' }}></div>
                    </div>
                    <div className="fm-skeleton-shimmer" style={{ width: '20%', height: '12px' }}></div>
                  </div>
                  <div className="fm-skeleton-shimmer" style={{ width: '90%', height: '12px', marginLeft: '18px', marginTop: '8px' }}></div>
                  <div className="fm-skeleton-shimmer" style={{ width: '60%', height: '12px', marginLeft: '18px', marginTop: '4px' }}></div>
                  <div className="fm-skeleton-shimmer" style={{ width: '80px', height: '24px', borderRadius: '12px', marginLeft: '18px', marginTop: '12px' }}></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
