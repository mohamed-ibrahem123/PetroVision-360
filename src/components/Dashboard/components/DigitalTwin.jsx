export default function DigitalTwin({ data }) {
  if (!data) return null;
  
  return (
    <div className="fm-card">
      <div className="fm-section-header">
        <div>
          <h2 className="fm-section-title">Digital Twin Snapshot</h2>
          <div className="fm-section-subtitle">Sector Alpha-1 Real-time Spatial Telemetry & P&ID Sync</div>
        </div>
        <button className="fm-twin-btn">
          See Digital Twin
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
      
      <div className="fm-twin-image-wrapper">
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
          3D Interactive Digital Twin View<br/><small>(WebGL Canvas Placeholder)</small>
        </div>
      </div>
      
      <div className="fm-twin-stats-row">
        <div className="fm-twin-stat-box">
          <span className="fm-twin-stat-label">Spatial Health</span>
          <span className="fm-twin-stat-val">{data.spatialHealthPercentage}%</span>
        </div>
        <div className="fm-twin-stat-box">
          <span className="fm-twin-stat-label">Piping Integrity</span>
          <span className="fm-twin-stat-val" style={{ color: '#10b981' }}>{data.pipingIntegrityPercentage}%</span>
        </div>
        <div className="fm-twin-stat-box">
          <span className="fm-twin-stat-label">Last Twin Scan</span>
          <span className="fm-twin-stat-val">{data.lastTwinScanText}</span>
        </div>
      </div>
    </div>
  );
}
