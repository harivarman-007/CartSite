import React, { useRef, useState } from 'react';
import { Layers, Box, Disc, Cpu, Shield, ArrowUpRight } from 'lucide-react';

const COMPONENTS_DATA = [
  {
    id: 'basket',
    name: '01 // WIRE BASKET',
    meshTarget: 'basket',
    material: 'High-Tensile Wire Mesh',
    icon: Box,
    desc: 'Deep-volume 180-liter basket featuring calibrated optical visibility for overhead multi-item AI classification. 35,979 precision-tessellated triangles from the STEP CAD file.',
    specs: ['180L Payload', 'Crosshatch Weave', 'Dual Grips'],
  },
  {
    id: 'panel',
    name: '02 // BASKET FLOOR PANEL',
    meshTarget: 'panel',
    material: 'Molded Polypropylene',
    icon: Layers,
    desc: 'Impact-absorbing warm cream undercarriage panel protecting payload and housing the dual load-cell weight detection array.',
    specs: ['±5g Accuracy', 'UV Stabilized', 'Chrome Bezel'],
  },
  {
    id: 'caster_wheel',
    name: '03 // SWIVEL CASTER WHEELS',
    meshTarget: 'caster_wheel',
    material: 'Chrome & High-Rebound Urethane',
    icon: Disc,
    desc: 'Precision dual-ball bearing swivel casters. 4× assemblies each with mirrored CAD geometry from the STEP assembly tree.',
    specs: ['250kg Static Load', '360° Zero-Turn', 'Silent Glide'],
  },
  {
    id: 'caster_body',
    name: '04 // CASTER BRACKETS',
    meshTarget: 'caster_body',
    material: 'AISI 304 Chrome Steel',
    icon: Shield,
    desc: 'Precision mandrel-formed caster mounting brackets with integral anti-theft lock mechanism. Robotic TIG welded to the main frame.',
    specs: ['32mm Bore', 'TIG Welded', 'Lock Ready'],
  },
  {
    id: 'handle',
    name: '05 // TELEMETRY ENCLOSURE',
    meshTarget: 'handle',
    material: 'Anodized Aluminum / ABS',
    icon: Cpu,
    desc: 'Central computational unit housing the quad-core AI inference board, multi-camera array, LiFePO4 battery pack, and WiFi 6E radio.',
    specs: ['18-Hour Battery', 'Quad WiFi 6E', 'IP65 Sealed'],
  },
];

function TiltBlock({ item, onHover, isHovered }) {
  const cardRef = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const IconComponent = item.icon;

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;

    setRot({
      x: -py * 7,
      y: px * 7,
    });
  };

  const handlePointerLeave = () => {
    setRot({ x: 0, y: 0 });
    onHover(null);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => onHover(item.meshTarget)}
      onPointerLeave={handlePointerLeave}
      className={`tilt-card ${isHovered ? 'hovered' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
      }}
    >
      <div className="card-top">
        <div className="card-id">
          <span className="card-indicator" />
          <span>{item.name}</span>
        </div>
        <div style={{ padding: '6px', borderRadius: '50%', background: 'rgba(34,31,26,0.05)' }}>
          <ArrowUpRight size={15} />
        </div>
      </div>

      <div className="card-body">
        <div className="card-icon">
          <IconComponent size={22} />
        </div>
        <div>
          <h3 className="card-material">{item.material}</h3>
          <p className="card-desc">{item.desc}</p>
        </div>
      </div>

      <div className="card-specs">
        {item.specs.map((spec, idx) => (
          <span key={idx} className="spec-badge">
            {spec}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function InteractiveBlocks({ onHoverComponent, hoveredComponent }) {
  return (
    <section className="blocks-section">
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-line" />
          System 03 // Interactive Component Matrix
        </div>
        <h2 className="section-heading">
          Anatomy of a High-Precision Autonomous Cart
        </h2>
        <p className="section-sub">
          Move your cursor over each architectural block to inspect individual 3D sub-assemblies with real-time perspective tilt and material isolation.
        </p>
      </div>

      <div className="blocks-grid">
        {COMPONENTS_DATA.map((comp) => (
          <TiltBlock
            key={comp.id}
            item={comp}
            onHover={onHoverComponent}
            isHovered={hoveredComponent === comp.meshTarget}
          />
        ))}
      </div>
    </section>
  );
}
