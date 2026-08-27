import React, { useState } from 'react';
import { 
  Scan, 
  BatteryCharging, 
  Wifi, 
  CreditCard, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Plus,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_ITEMS = [
  { id: 1, name: 'Cold-Pressed Tuscan Olive Oil (750ml)', price: 16.50, weight: 0.95, time: '14:22:04' },
  { id: 2, name: 'Artisanal Sourdough Batard', price: 6.25, weight: 0.60, time: '14:22:45' },
  { id: 3, name: 'Fair Trade Espresso Beans (500g)', price: 18.00, weight: 0.52, time: '14:23:18' },
];

export default function FeaturePullout() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [isScanning, setIsScanning] = useState(false);
  const [paid, setPaid] = useState(false);

  const totalWeight = items.reduce((acc, curr) => acc + curr.weight, 0).toFixed(2);
  const subtotal = items.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
  const tax = (subtotal * 0.08).toFixed(2);
  const grandTotal = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newItems = [
        ...items,
        {
          id: Date.now(),
          name: 'Himalayan Pink Salt Grinder (200g)',
          price: 4.75,
          weight: 0.35,
          time: new Date().toLocaleTimeString(),
        },
      ];
      setItems(newItems);
      setIsScanning(false);
    }, 1000);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setPaid(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B60C5', '#FDF2DE', '#221F1A'],
    });
    setTimeout(() => {
      setPaid(false);
    }, 3500);
  };

  return (
    <section className="pullout-section">
      <div className="pullout-container">
        {/* Top Header */}
        <div className="pullout-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="brand-dot" />
            <span className="section-tag" style={{ margin: 0 }}>
              System 04 // Feature Demo Pullout
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,31,26,0.05)', padding: '6px 12px', borderRadius: '999px' }}>
              <Wifi size={13} color="#3A8358" />
              <span>6E / 5G LINKED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,31,26,0.05)', padding: '6px 12px', borderRadius: '999px' }}>
              <BatteryCharging size={13} color="#3B60C5" />
              <span>88% (18h)</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="pullout-grid">
          {/* Left: POS Screen */}
          <div className="pos-screen">
            <div className="pos-header">
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#60A5FA', fontWeight: 600 }}>
                  ● LIVE CART TELEMETRY
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.5, marginTop: '2px' }}>
                  Vision + Weight Fusion Engine
                </div>
              </div>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="btn-primary"
                style={{ fontSize: '0.72rem', padding: '8px 16px' }}
              >
                {isScanning ? <RefreshCw size={13} className="animate-spin" /> : <Plus size={13} />}
                {isScanning ? 'DETECTING...' : 'DROP ITEM IN BASKET'}
              </button>
            </div>

            {/* Laser Barcode Simulation */}
            <div className="laser-box">
              <div className="laser-beam" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
                <Scan size={18} color="#60A5FA" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>
                  {isScanning ? 'CLASSIFYING 3D MESH & WEIGHT DELTA...' : 'OPTICAL CAMERAS ACTIVE'}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#3A8358', zIndex: 1 }}>
                ● 120 FPS
              </div>
            </div>

            {/* Item List */}
            <div className="item-list">
              {items.map((item) => (
                <div key={item.id} className="item-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShoppingBag size={14} color="#60A5FA" />
                    <div>
                      <div style={{ color: '#FFFFFF', fontWeight: 500 }}>{item.name}</div>
                      <div style={{ opacity: 0.5, fontSize: '0.68rem' }}>Weight: {item.weight}kg</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#60A5FA', fontWeight: 600 }}>${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* POS Footer */}
            <div className="pos-footer">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <div style={{ opacity: 0.7 }}>Items: {items.length} | Payload: {totalWeight} kg</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2px' }}>
                  Total: <span style={{ color: '#60A5FA' }}>${grandTotal}</span>
                </div>
              </div>

              {paid ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#3A8358', color: '#FFF', padding: '10px 20px', borderRadius: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <CheckCircle2 size={16} />
                  WALK-OUT COMPLETE
                </div>
              ) : (
                <button onClick={handleCheckout} className="btn-primary" style={{ padding: '12px 24px' }}>
                  <CreditCard size={15} />
                  TAP TO PAY & WALK OUT
                </button>
              )}
            </div>
          </div>

          {/* Right: Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div className="section-tag" style={{ margin: 0 }}>
                Autonomous Hardware Drawer
              </div>
              <h3 className="section-heading" style={{ fontSize: '1.8rem', marginTop: '8px' }}>
                Real-Time Shrinkage Protection
              </h3>
              <p className="section-sub" style={{ fontSize: '0.92rem', marginTop: '10px' }}>
                The smart telemetry console slides smoothly from beneath the basket, verifying every item against optical vision and ±5g calibrated load cells in 18ms.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(34,31,26,0.05)', border: '1px solid var(--ink-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
                  <Sparkles size={14} color="#3B60C5" />
                  Quad Optical Barcode Array
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
                  Multi-angle cameras recognize products instantly from any basket orientation.
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(34,31,26,0.05)', border: '1px solid var(--ink-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
                  <CheckCircle2 size={14} color="#3A8358" />
                  Dual Wheatstone Load Cells
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
                  Real-time basket weight delta cross-checks visual recognition to prevent missed items.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
