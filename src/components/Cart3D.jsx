import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// -- Camera Keyframes ----------------------------------------------------------
// Natural forward flow from top (0%) to bottom (100%)
// Shot 1 (0.00) is the GRAND HERO VIEW: Centered, beautifully framed & interactive.
const CAMERA_KF = [
  // Shot 1 (0.00): HERO VIEW � Perfectly centered, full cart in view, interactive!
  { p: 0.00, pos: [ 0.0,  0.35, 4.8], at: [ 0.0,  0.00, 0], fov: 28 },

  // Shot 2 (0.15): SWEEP RIGHT � Camera moves right, cart clips left-of-center
  { p: 0.15, pos: [ 3.2,  0.40, 3.8], at: [ 0.8, -0.05, 0], fov: 24 },

  // Shot 3 (0.30): LOW FLOOR SWEEP � Camera floor-level looking up, cart rises
  { p: 0.30, pos: [-2.6, -1.00, 3.2], at: [-0.4,  0.80, 0], fov: 26 },

  // Shot 4 (0.45): EXTREME MACRO BASKET � Tight telephoto on wire mesh
  { p: 0.45, pos: [-1.6,  0.60, 2.1], at: [-0.5,  0.10, 0], fov: 18 },

  // Shot 5 (0.60): HIGH AERIAL DUTCH � Looking down from upper-right
  { p: 0.60, pos: [ 2.2,  3.40, 3.4], at: [-0.6, -0.80, 0], fov: 28 },

  // Shot 6 (0.75): CASTER WHEEL MACRO � Underground POV of chrome casters
  { p: 0.75, pos: [ 1.2, -2.00, 1.8], at: [ 0.3,  0.70, 0], fov: 16 },

  // Shot 7 (0.90): GRAND FINALE � Cinematic pull back, centered hero view
  { p: 0.90, pos: [ 0.0,  0.45, 6.8], at: [ 0.0,  0.00, 0], fov: 26 },

  // Shot 8 (1.00): RESOLVED LANDING � Full view
  { p: 1.00, pos: [ 0.0,  0.35, 7.2], at: [ 0.0,  0.00, 0], fov: 27 },
];

// Smoothstep interpolation between keyframes
function interpCamera(progress) {
  let lo = CAMERA_KF[0];
  let hi = CAMERA_KF[CAMERA_KF.length - 1];
  for (let i = 0; i < CAMERA_KF.length - 1; i++) {
    if (progress >= CAMERA_KF[i].p && progress <= CAMERA_KF[i + 1].p) {
      lo = CAMERA_KF[i];
      hi = CAMERA_KF[i + 1];
      break;
    }
  }
  const range = hi.p - lo.p;
  const raw = range === 0 ? 1 : (progress - lo.p) / range;
  const t = raw * raw * (3 - 2 * raw);

  return {
    pos: lo.pos.map((v, i) => v + (hi.pos[i] - v) * t),
    at:  lo.at.map((v, i)  => v + (hi.at[i]  - v) * t),
    fov: lo.fov + (hi.fov - lo.fov) * t,
  };
}

// -- CameraRig � drives camera smoothly based on scroll progress ---------------
function CameraRig({ scrollProgress }) {
  const { camera } = useThree();
  const curPos = useRef(new THREE.Vector3(0, 0.35, 4.8));
  const curAt  = useRef(new THREE.Vector3(0, 0.0, 0));
  const tgtPos = useRef(new THREE.Vector3(0, 0.35, 4.8));
  const tgtAt  = useRef(new THREE.Vector3(0, 0.0, 0));
  const tgtFov = useRef(28);

  useFrame((_s, delta) => {
    const kf = interpCamera(scrollProgress);
    tgtPos.current.set(...kf.pos);
    tgtAt.current.set(...kf.at);
    tgtFov.current = kf.fov;

    const sp = Math.min(delta * 3.5, 1);
    curPos.current.lerp(tgtPos.current, sp);
    curAt.current.lerp(tgtAt.current, sp);

    camera.position.copy(curPos.current);
    camera.lookAt(curAt.current);

    if (Math.abs(camera.fov - tgtFov.current) > 0.05) {
      camera.fov += (tgtFov.current - camera.fov) * sp;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// -- Mesh role classification --------------------------------------------------
function classifyMesh(_name, index) {
  if (index === 0)                          return "basket";
  if (index === 21)                         return "panel";
  if (index >= 22 && index <= 23)           return "detail";
  if (index >= 24)                          return "handle";
  const localIdx = (index - 1) % 5;
  if (localIdx === 2)                       return "caster_tire";
  if (localIdx === 3)                       return "caster_wheel";
  return "caster_body";
}

// -- Real CAD Assembly Model Component -----------------------------------------
export function RealStepCartModel({
  activeComponent = null,
  rotationY = 0.35,
  rotationX = 0.05,
  scale = 1.0,
  colorway = "light",
  renderMode = "pbr",
  showDimensions = false,
  scrollProgress = 0,
}) {
  const groupRef = useRef();
  const [cadData, setCadData] = useState(null);
  const [loadError, setLoadError] = useState(false);

  // Drag interaction state for manual orbit in Hero position
  const [isDragging, setIsDragging] = useState(false);
  const userRot = useRef({ y: 0, x: 0 });
  const dragStart = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 });

  const isDark      = colorway === "dark";
  const isWireframe = renderMode === "wireframe";
  const isXray      = renderMode === "xray";

  const CENTER = useMemo(() => new THREE.Vector3(-277.74, 0, 571.54), []);
  const SCALE  = 1.8 / 1228.31;

  useEffect(() => {
    fetch("/cart-geometry.json")
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(setCadData)
      .catch((e) => { console.error("cart-geometry.json error:", e); setLoadError(true); });
  }, []);

  // Window pointer listeners for smooth manual 3D dragging
  useEffect(() => {
    const handlePointerDown = (e) => {
      // Only enable manual drag near hero top (scrollProgress < 0.08)
      if (scrollProgress > 0.08) return;
      if (e.target.closest("button") || e.target.closest("a")) return;
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        rotY: userRot.current.y,
        rotX: userRot.current.x,
      };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = (e.clientX - dragStart.current.x) * 0.006;
      const deltaY = (e.clientY - dragStart.current.y) * 0.004;
      userRot.current.y = dragStart.current.rotY + deltaX;
      userRot.current.x = Math.max(-0.4, Math.min(0.5, dragStart.current.rotX + deltaY));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, scrollProgress]);

  // Milky Light Green / Deep Pine PBR materials
  const mat = useMemo(() => {
    const wire = isWireframe;
    const xT   = isXray;
    const xOp  = isXray ? 0.32 : 1.0;
    const mk = (color, m = 0.5, r = 0.4, extra = {}) =>
      new THREE.MeshStandardMaterial({ color, metalness: m, roughness: r, wireframe: wire, transparent: xT, opacity: xOp, ...extra });

    return {
      basket:       mk(isDark ? "#7A9E8B" : "#456250", 0.92, 0.25),
      panel:        mk(isDark ? "#8FBFA6" : "#E2ECE6", 0.35, 0.55),
      caster_wheel: mk(isDark ? "#A0C5B0" : "#8AA094", 0.95, 0.18),
      caster_tire:  mk("#14201A",                         0.08, 0.88),
      caster_body:  mk(isDark ? "#729683" : "#688072", 0.88, 0.28),
      handle:       mk(isDark ? "#8BB49B" : "#567262", 0.82, 0.32),
      detail:       mk(isDark ? "#628673" : "#4A6254", 0.90, 0.20),
      highlight:    new THREE.MeshStandardMaterial({
        color: "#389B66", emissive: "#2D7F53", emissiveIntensity: 0.95,
        metalness: 0.4, roughness: 0.15, wireframe: wire,
      }),
      dim_line: new THREE.MeshBasicMaterial({ color: isDark ? "#E2F0E7" : "#2D7F53" }),
    };
  }, [isDark, isWireframe, isXray]);

  const meshObjects = useMemo(() => {
    if (!cadData?.meshes) return [];
    return cadData.meshes.map((md, i) => {
      const geo = new THREE.BufferGeometry();
      const posArr = new Float32Array(md.attributes.position.array);
      geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      if (md.attributes.normal?.array?.length > 0) {
        geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(md.attributes.normal.array), 3));
      } else {
        geo.computeVertexNormals();
      }
      if (md.index?.array?.length > 0) {
        geo.setIndex(new THREE.BufferAttribute(new Uint32Array(md.index.array), 1));
      }
      geo.translate(-CENTER.x, -CENTER.y, -CENTER.z);
      return { id: "cad-" + i, geo, role: classifyMesh(md.name, i) };
    });
  }, [cadData, CENTER]);

  // Frame update: blend scroll rotation with manual drag rotation
  useFrame((_s, delta) => {
    if (!groupRef.current) return;

    // Fade out manual drag rotation as user scrolls down past 0.08
    const userInfluence = Math.max(0, 1 - scrollProgress * 12);
    const targetY = rotationY + userRot.current.y * userInfluence;
    const targetX = rotationX + userRot.current.x * userInfluence;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 5.0, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 5.0, delta);
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        {meshObjects.map((obj) => {
          const m = activeComponent === obj.role ? mat.highlight : (mat[obj.role] || mat.detail);
          return <mesh key={obj.id} geometry={obj.geo} material={m} scale={[SCALE, SCALE, SCALE]} castShadow receiveShadow />;
        })}
      </group>

      {showDimensions && (
        <group name="dim_layer">
          <mesh position={[0, -0.95, 0]} material={mat.dim_line}>
            <cylinderGeometry args={[0.003, 0.003, 1.76, 8]} />
          </mesh>
          <mesh position={[1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mat.dim_line}>
            <cylinderGeometry args={[0.003, 0.003, 1.8, 8]} />
          </mesh>
        </group>
      )}

      {!cadData && !loadError && (
        <mesh>
          <boxGeometry args={[0.6, 0.8, 0.5]} />
          <meshStandardMaterial color="#2D7F53" wireframe />
        </mesh>
      )}
    </group>
  );
}

// -- Master Canvas -------------------------------------------------------------
export default function Cart3D({
  activeComponent = null,
  rotationY = 0.35,
  rotationX = 0.05,
  colorway = "light",
  enableFloat = true,
  renderMode = "pbr",
  showDimensions = false,
  scrollProgress = 0,
}) {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0.0, 0.35, 4.8], fov: 28, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <CameraRig scrollProgress={scrollProgress} />

        <ambientLight intensity={colorway === "dark" ? 1.15 : 0.95} color="#F2FAF5" />
        <directionalLight position={[4, 6, 4]} intensity={colorway === "dark" ? 1.8 : 1.5} color="#EBF5EE" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#94C5A8" />
        <pointLight position={[0, -1.5, 1]} intensity={0.35} color="#FFFFFF" />

        {enableFloat ? (
          <Float speed={1.3} rotationIntensity={0.07} floatIntensity={0.12}>
            <RealStepCartModel
              activeComponent={activeComponent}
              rotationY={rotationY}
              rotationX={rotationX}
              colorway={colorway}
              renderMode={renderMode}
              showDimensions={showDimensions}
              scrollProgress={scrollProgress}
            />
          </Float>
        ) : (
          <RealStepCartModel
            activeComponent={activeComponent}
            rotationY={rotationY}
            rotationX={rotationX}
            colorway={colorway}
            renderMode={renderMode}
            showDimensions={showDimensions}
            scrollProgress={scrollProgress}
          />
        )}

        <ContactShadows
          position={[0, -1.08, 0]}
          opacity={colorway === "dark" ? 0.45 : 0.28}
          scale={6}
          blur={2.5}
          far={3.5}
          color={colorway === "dark" ? "#06120C" : "#1A3326"}
        />
      </Canvas>
    </div>
  );
}
