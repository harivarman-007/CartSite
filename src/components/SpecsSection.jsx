import React, { useState } from 'react';

const SPECS_TABS = [
  {
    id: 'dimensions',
    title: '01 // DIMENSIONS & CHASSIS',
    data: [
      { label: 'Overall Length (OAL)', value: '1,040 mm', tolerance: '± 2.0 mm' },
      { label: 'Overall Width (OAW)', value: '620 mm', tolerance: '± 1.5 mm' },
      { label: 'Handle Height (OAH)', value: '1,050 mm', tolerance: 'Ergonomic 95th Percentile' },
      { label: 'Basket Usable Volume', value: '180 Liters', tolerance: 'ISO 2859 Certified' },
      { label: 'Chassis Tube Spec', value: 'Ø32 mm × 2.0 mm', tolerance: 'AISI 304 Stainless' },
      { label: 'Wheelbase Center-to-Center', value: '780 mm', tolerance: 'Stability Ratio 1.25' },
    ],
  },
  {
    id: 'payload',
    title: '02 // LOAD & SENSORS',
    data: [
      { label: 'Max Safe Working Load', value: '150 kg (330 lbs)', tolerance: 'Safety Factor 3.2×' },
      { label: 'Weight Sensor Resolution', value: '± 5 grams', tolerance: 'Dual Wheatstone Bridge' },
      { label: 'Optical Camera Array', value: '4× Wide-Angle HDR', tolerance: '120fps Global Shutter' },
      { label: 'LiDAR Spatial Grid', value: '360° Solid-State', tolerance: '10m Range @ 2mm Res' },
      { label: 'Edge Processing Unit', value: '8-Core NPU (32 TOPS)', tolerance: 'Fanless Sealed IP65' },
      { label: 'Connectivity', value: 'WiFi 6E + 5G + BLE 5.3', tolerance: 'Sub-10ms Roaming' },
    ],
  },
  {
    id: 'power',
    title: '03 // BATTERY & MOBILITY',
    data: [
      { label: 'Battery Chemistry', value: 'LiFePO4 Safe-Cell', tolerance: '3,000 Cycle Longevity' },
      { label: 'Run-Time Per Charge', value: '18+ Hours Active', tolerance: 'Full AI & Screen Load' },
      { label: 'Inductive Fast Charge', value: '80% in 45 Minutes', tolerance: 'Cart-Nest Magnetic Rail' },
      { label: 'Caster Wheel Hub', value: 'Ø125 mm Polyurethane', tolerance: '4-Hole Chrome Disc' },
      { label: 'Perimeter Brake Lock', value: 'Geofence Solenoid', tolerance: 'Automatic Parking Lock' },
      { label: 'Operating Temp Range', value: '-10°C to +50°C', tolerance: 'Outdoor Compatible' },
    ],
  },
];

export default function SpecsSection() {
  const [activeTab, setActiveTab] = useState('dimensions');
  const currentTab = SPECS_TABS.find((t) => t.id === activeTab) || SPECS_TABS[0];

  return (
    <section className="cobalt-section">
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '36px', borderBottom: '1px solid rgba(253,242,222,0.2)' }}>
          <div className="section-tag" style={{ color: '#FDF2DE' }}>
            <span className="section-tag-line" style={{ background: '#FDF2DE' }} />
            Scene 05 // Color Swap & Metric Specifications
          </div>
          <h2 className="section-heading" style={{ color: '#FDF2DE', margin: 0 }}>
            Rigorous Engineering Standards
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(253,242,222,0.8)', maxWidth: '580px' }}>
            Every millimeter and component is engineered to automotive-grade CAD tolerances, ensuring reliable autonomous retail fleet operations.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '36px' }}>
          {SPECS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '10px 22px',
                borderRadius: '999px',
                border: '1px solid rgba(253,242,222,0.3)',
                background: activeTab === tab.id ? '#FDF2DE' : 'rgba(253,242,222,0.1)',
                color: activeTab === tab.id ? '#3B60C5' : '#FDF2DE',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Specs Grid */}
        <div className="cobalt-grid">
          {/* Table */}
          <div className="spec-table-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid rgba(253,242,222,0.15)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.7, marginBottom: '20px' }}>
              <span>PARAMETER / SUBSYSTEM</span>
              <span>MEASURED VALUE & TOLERANCE</span>
            </div>

            {currentTab.data.map((item, idx) => (
              <div key={idx} className="spec-row">
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500 }}>
                  {item.label}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700 }}>
                    {item.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.65 }}>
                    {item.tolerance}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Card */}
          <div className="cad-badge-card">
            <div>
              <div className="section-tag" style={{ margin: 0 }}>
                CAD Certification
              </div>
              <h3 className="card-material" style={{ fontSize: '1.6rem', marginTop: '12px' }}>
                Shopping_Cart_v1.step
              </h3>
              <p className="card-desc" style={{ marginTop: '10px' }}>
                Validated finite element analysis (FEA) testing under 300% maximum continuous structural fatigue load.
              </p>

              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--ink-border)', display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Compliance:</span>
                  <span style={{ fontWeight: 700 }}>CE / FCC / UL-2272</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Ingress Rating:</span>
                  <span style={{ fontWeight: 700 }}>IP65 Moisture Sealed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Recyclability:</span>
                  <span style={{ fontWeight: 700 }}>94.8% Circular</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert("Downloading CAD STEP Specification Sheet (.pdf)...")}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '30px', padding: '14px' }}
            >
              DOWNLOAD CAD SPEC SHEET (.PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
