import React, { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OverlappingFooter() {
  const [copied, setCopied] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setBtnOffset({ x: x * 0.22, y: y * 0.22 });
  };

  const handlePointerLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleCtaClick = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.8 },
      colors: ['#FDF2DE', '#3B60C5', '#FFFFFF'],
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer className="site-footer">
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        {/* Top Split */}
        <div className="footer-top">
          <div>
            <div className="section-tag" style={{ color: '#60A5FA' }}>
              <span className="section-tag-line" style={{ background: '#60A5FA' }} />
              System 05 // Overlapping Section Closure
            </div>
            <h2 className="footer-heading">
              Deploy the Next Standard of Autonomous Retail
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(253,242,222,0.7)', lineHeight: 1.6 }}>
              Equip your retail locations with verified AI computer vision, sub-20ms shrinkage protection, and frictionless walk-out checkout.
            </p>

            <div style={{ marginTop: '28px' }}>
              <button
                ref={btnRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onClick={handleCtaClick}
                style={{
                  transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                  transition: 'transform 0.15s ease-out',
                  fontSize: '0.85rem',
                  padding: '16px 36px',
                  borderRadius: '999px',
                }}
                className="btn-primary"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={18} />
                    FLEET REQUEST INITIATED
                  </>
                ) : (
                  <>
                    <span>REQUEST COMMERCIAL FLEET PILOT</span>
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links">
          <div>
            <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: '14px' }}>SPECIFICATIONS</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.7 }}>
              <li>• CAD STEP v1.0</li>
              <li>• 3D Retopologized GLB</li>
              <li>• Electrical Schematics</li>
              <li>• Structural FEA Report</li>
            </ul>
          </div>

          <div>
            <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: '14px' }}>TECHNOLOGY</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.7 }}>
              <li>• 8-Core Neural NPU</li>
              <li>• 360° Solid-State LiDAR</li>
              <li>• Quad Optical Barcode</li>
              <li>• LiFePO4 Smart Battery</li>
            </ul>
          </div>

          <div>
            <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: '14px' }}>ARCHITECTURE</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.7 }}>
              <li>• AISI 304 Stainless</li>
              <li>• Polypropylene Shields</li>
              <li>• Chrome Swivel Casters</li>
              <li>• 180-Liter Wire Basket</li>
            </ul>
          </div>

          <div>
            <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: '14px' }}>COLLABORATION</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.7 }}>
              <li>• Illoca Design Register</li>
              <li>• Unseen Studio Concept</li>
              <li>• Antigravity Build 2026</li>
              <li>• ISO 9001 Manufacturing</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>© 2026 SMART CART CORP. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>LATENCY: &lt;18MS</span>
            <span style={{ color: '#3A8358', fontWeight: 700 }}>● ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
