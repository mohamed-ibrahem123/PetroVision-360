export default function LiveMonitoring({ cameras }) {
  return (
    <div className="fm-card">
      <div className="fm-section-header">
        <div>
          <h2 className="fm-section-title">Live Monitoring Overview</h2>
          <div className="fm-section-subtitle">High-definition AI perceptual vision & thermal telemetry feeds</div>
        </div>
        <a href="#view-all-cameras" className="fm-section-link">
          View All Cameras
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      
      <div className="fm-cameras-grid">
        {cameras && cameras.map((cam, idx) => (
          <div key={cam.id} className={`fm-camera-box ${idx === 0 ? 'has-bb' : ''}`}>
            {/* Fallback placeholder since streamUrl might not be natively playable */}
            <div style={{ width: '100%', height: '100%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              {cam.name} Stream Placeholder
            </div>
            
            {/* Mock Bounding Box for visual fidelity to design on first camera */}
            {idx === 0 && <div className="fm-camera-bb"></div>}

            <div className="fm-camera-overlay">
              <div className={`fm-camera-dot ${cam.status === 'Active' ? 'live' : ''}`}></div>
              {cam.status === 'Active' ? 'Live' : cam.status}
            </div>
          </div>
        ))}
        {/* If fewer than 4 cameras, render empty placeholders to match 2x2 grid if desired. The API returns 2, but design shows 4. I will render empty slots. */}
        {cameras && cameras.length < 4 && Array.from({ length: 4 - cameras.length }).map((_, i) => (
          <div key={`empty-${i}`} className="fm-camera-box">
             <div style={{ width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
               Camera Offline
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
