import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cart3D from "./components/Cart3D";

gsap.registerPlugin(ScrollTrigger);

// Milky Light Green / Ocean Breeze palette
const COLORS = {
  lightBg:    "#D5E5DB",  // Milky soft sage-mint light green
  darkBg:     "#14291F",  // Deep rich forest pine
  lightFg:    "#12241A",  // Deep forest ink
  darkFg:     "#E2F0E7",  // Soft mint white
  primary:    "#2D7F53",  // Lush emerald green
  darkPrimary:"#389B66",  // Bright emerald green
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modelRotation, setModelRotation] = useState({ y: 0.35, x: 0.05 });
  const [colorway, setColorway] = useState("light");
  const containerRef = useRef(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  // Scroll ? camera + model rotation + colorway room progression
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Continuous forward rotation & room changes
          if (p < 0.15) {
            setModelRotation({ y: 0.35 + p * 2.6, x: 0.05 });
            setColorway("light");
          } else if (p < 0.30) {
            setModelRotation({ y: 0.74 + (p - 0.15) * 4.6, x: 0.08 });
            setColorway("light");
          } else if (p < 0.45) {
            setModelRotation({ y: 1.43 + (p - 0.30) * 4.8, x: -0.06 });
            setColorway("dark");
          } else if (p < 0.60) {
            setModelRotation({ y: 2.15 + (p - 0.45) * 4.6, x: 0.12 });
            setColorway("dark");
          } else if (p < 0.75) {
            setModelRotation({ y: 2.84 + (p - 0.60) * 4.8, x: 0.22 });
            setColorway("light");
          } else if (p < 0.90) {
            setModelRotation({ y: 3.56 + (p - 0.75) * 4.6, x: 0.30 });
            setColorway("dark");
          } else {
            setModelRotation({ y: 4.25 + (p - 0.90) * 4.0, x: 0.05 });
            setColorway("light");
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isDark = colorway === "dark";
  const bg  = isDark ? COLORS.darkBg  : COLORS.lightBg;
  const fg  = isDark ? COLORS.darkFg  : COLORS.lightFg;
  const acc = isDark ? COLORS.darkPrimary : COLORS.primary;
  const pct = Math.round(scrollProgress * 100);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: bg,
        transition: "background-color 0.5s cubic-bezier(0.4,0,0.2,1)",
        minHeight: "100vh",
      }}
    >
      {/* -- Fixed full-screen 3D canvas -- */}
      <div
        style={{
          position: "fixed", inset: 0,
          width: "100vw", height: "100vh",
          zIndex: 1,
          pointerEvents: scrollProgress < 0.08 ? "auto" : "none",
          cursor: scrollProgress < 0.08 ? "grab" : "default",
        }}
      >
        <Cart3D
          rotationY={modelRotation.y}
          rotationX={modelRotation.x}
          colorway={colorway}
          scrollProgress={scrollProgress}
          enableFloat
          renderMode="pbr"
        />
      </div>

      {/* -- Brand mark -- */}
      <div style={{
        position: "fixed", top: 28, left: 36, zIndex: 10,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em",
        color: fg, transition: "color 0.5s ease", opacity: 0.88,
      }}>
        SMART CART &nbsp;/&nbsp; OCEAN BREEZE v1.0
      </div>

      {/* -- Scroll % counter -- */}
      <div style={{
        position: "fixed", top: 28, right: 36, zIndex: 10,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em",
        color: fg, transition: "color 0.5s ease", opacity: 0.70,
      }}>
        {pct}%
      </div>

      {/* -- Drag & Orbit Cue (Fades out when scrolling) -- */}
      <div style={{
        position: "fixed", bottom: 36, left: "50%", transform: "translateX(-50%)",
        zIndex: 10,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em",
        color: fg, transition: "opacity 0.4s ease, color 0.5s ease",
        opacity: Math.max(0, 1 - scrollProgress * 12),
        pointerEvents: "none",
        background: "rgba(18, 36, 26, 0.08)",
        padding: "8px 18px", borderRadius: "999px",
        backdropFilter: "blur(8px)",
      }}>
        ? DRAG TO ROTATE 3D CART &nbsp;�&nbsp; SCROLL TO EXPLORE CINEMATIC SHOTS
      </div>

      {/* -- Shot Dot Indicator -- */}
      <div style={{
        position: "fixed", bottom: 36, right: 36, zIndex: 10,
        display: "flex", flexDirection: "column", gap: "8px",
      }}>
        {[0.00, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90].map((threshold, i) => {
          const next = [0.15, 0.30, 0.45, 0.60, 0.75, 0.90, 1.01][i];
          const active = scrollProgress >= threshold && scrollProgress < next;
          return (
            <div key={i} style={{
              width: active ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: active ? acc : fg,
              opacity: active ? 1 : 0.3,
              transition: "all 0.3s ease",
            }} />
          );
        })}
      </div>

      {/* -- Bottom Progress Line -- */}
      <div style={{
        position: "fixed", bottom: 0, left: 0,
        height: "3px", width: `${pct}%`,
        background: acc, zIndex: 10,
        transition: "background 0.5s ease",
      }} />

      {/* -- Long scroll container (800vh) -- */}
      <div style={{ height: "800vh" }} />
    </div>
  );
}
