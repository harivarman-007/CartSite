import React, { useEffect, useRef, useState } from 'react';
import { Target, Cpu, ShieldCheck, Gauge, Radio } from 'lucide-react';

export default function RevealSpotlight({ isActive = true }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [smoothPos, setSmoothPos] = useState({ x: -1000, y: -1000 });
  const [isInside, setIsInside] = useState(false);
  const requestRef = useRef();

  // High-frequency pointer tracking with lag/spring interpolation
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setIsInside(true);
        setMousePos({ x, y });
      } else {
        setIsInside(false);
      }
    };

    const handlePointerLeave = () => {
      setIsInside(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Spring animation loop (damped lag behind pointer)
  useEffect(() => {
    const animate = () => {
      setSmoothPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none"
    >
      {/* Visual Cursor Target Halo */}
      {isInside && (
        <div
          className="absolute transition-opacity duration-300 pointer-events-none"
          style={{
            transform: `translate(${smoothPos.x - 140}px, ${smoothPos.y - 140}px)`,
            width: '280px',
            height: '280px',
          }}
        >
          {/* Outer Rotating Reticle */}
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '24s' }} viewBox="0 0 280 280">
            <circle
              cx="140"
              cy="140"
              r="135"
              fill="none"
              stroke="rgba(59, 96, 197, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="8 6 24 6"
            />
            <circle
              cx="140"
              cy="140"
              r="105"
              fill="none"
              stroke="rgba(34, 31, 26, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          </svg>

          {/* Center Coordinates Readout */}
          <div className="absolute top-2 right-2 bg-[#FDF2DE] border border-[#221F1A]/20 px-2 py-1 rounded shadow-sm">
            <div className="font-mono text-[10px] text-[#3B60C5] flex items-center gap-1 font-semibold">
              <Target size={10} />
              X: {Math.round(smoothPos.x)} | Y: {Math.round(smoothPos.y)}
            </div>
            <div className="font-mono text-[9px] text-[#221F1A]/70">
              HUD: REVEAL ACTIVE
            </div>
          </div>
        </div>
      )}

      {/* Damped Mask Layer revealing hidden architectural telemetry */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isInside && isActive ? 1 : 0,
          clipPath: `circle(170px at ${smoothPos.x}px ${smoothPos.y}px)`,
          WebkitClipPath: `circle(170px at ${smoothPos.x}px ${smoothPos.y}px)`,
          background: 'rgba(59, 96, 197, 0.04)',
        }}
      >
        {/* Floating Telemetry Annotation Points across standard coordinates */}
        <div className="absolute top-[28%] left-[22%] bg-[#FDF2DE]/95 border border-[#3B60C5] p-3 rounded-lg shadow-lg max-w-[210px]">
          <div className="flex items-center gap-1.5 text-[#3B60C5] font-mono text-[11px] font-bold">
            <Radio size={12} className="animate-pulse" />
            BASKET LOAD SENSOR
          </div>
          <div className="text-[12px] text-[#221F1A] mt-1 font-sans leading-tight">
            Multi-point load cells with ±5g precision scale calibration.
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#3B60C5] bg-[#3B60C5]/10 px-1.5 py-0.5 rounded inline-block">
            CAPACITY: 180L / 120KG
          </div>
        </div>

        <div className="absolute bottom-[32%] right-[24%] bg-[#FDF2DE]/95 border border-[#3B60C5] p-3 rounded-lg shadow-lg max-w-[220px]">
          <div className="flex items-center gap-1.5 text-[#3B60C5] font-mono text-[11px] font-bold">
            <Cpu size={12} />
            AI SCAN ENCLOSURE
          </div>
          <div className="text-[12px] text-[#221F1A] mt-1 font-sans leading-tight">
            360° Quad Optical Cameras + Barcode laser engine.
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#221F1A]/70 flex items-center justify-between">
            <span>LATENCY: 18ms</span>
            <span className="text-[#3A8358] font-bold">ONLINE</span>
          </div>
        </div>

        <div className="absolute bottom-[18%] left-[30%] bg-[#FDF2DE]/95 border border-[#221F1A]/40 p-2.5 rounded-lg shadow-lg">
          <div className="flex items-center gap-1.5 text-[#221F1A] font-mono text-[11px] font-bold">
            <ShieldCheck size={12} className="text-[#3B60C5]" />
            CHASSIS // AISI 304
          </div>
          <div className="text-[11px] font-mono text-[#221F1A]/80 mt-0.5">
            Ø32mm TUBE • ROBOTIC TIG WELDED
          </div>
        </div>
      </div>
    </div>
  );
}
