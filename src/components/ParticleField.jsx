// ParticleField.jsx
//
// The page's single 3D centerpiece. ~1500 instanced glass chips that:
//   • assemble into the LOGO at the top (the hero mark),
//   • scatter into free particles as you scroll,
//   • MORPH through a distinct shape per section (sphere → torus-knot → cube),
//   • reassemble into the LOGO at the bottom of the page.
//
// Driven purely by page scroll progress (0..1), eased for a buttery morph.
// Centered, fixed, behind page content (#page-root is z-base:1).

import { useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import * as THREE from "three";

const MODEL = "/models/updated-glass.glb";
const SHAPE_RADIUS = 1.5;

// Morph keyframes: a target shape at each scroll stop. Logo bookends the journey.
//   stops are fractions of total page scroll; shapes morph between them.
const STOPS = [0, 0.33, 0.56, 0.8, 1];
// shape keys map 1:1 to STOPS: logo (hero) → sphere → knot → cube → logo (end)
const SHAPE_KEYS = ["logo", "sphere", "knot", "cube", "logo"];
// Per-stop screen offset [fx, fy] as fractions of the visible viewport
// (fx: -0.5 left … +0.5 right). Shapes drift left/right for dynamic movement;
// logo stays centered at the hero and at the bottom.
const OFFSETS = [
  [0, 0], // logo — hero, centered
  [0.27, 0], // sphere — right (The Approach)
  [-0.34, 0], // knot — left, pushed to outer margin (Selected work)
  [0.32, 0], // cube — right, pushed out (Capabilities)
  [0, 0], // logo — bottom, centered
];

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const smootherstep = (x) => {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

// ---- Shape samplers (each returns COUNT centered, radius-normalised points) --
function sampleSurface(geometry, count) {
  const mesh = new THREE.Mesh(geometry);
  const sampler = new MeshSurfaceSampler(mesh).build();
  const tmp = new THREE.Vector3();
  const out = [];
  for (let i = 0; i < count; i++) {
    sampler.sample(tmp);
    out.push(tmp.clone());
  }
  return out;
}

function fibonacciSphere(count, r) {
  const out = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out.push(
      new THREE.Vector3(Math.cos(theta) * rad, y, Math.sin(theta) * rad).multiplyScalar(r),
    );
  }
  return out;
}

function normalize(points, R) {
  const centroid = new THREE.Vector3();
  for (const p of points) centroid.add(p);
  centroid.divideScalar(points.length);
  let maxR = 0;
  for (const p of points) {
    p.sub(centroid);
    maxR = Math.max(maxR, p.length());
  }
  const s = R / (maxR || 1);
  for (const p of points) p.multiplyScalar(s);
  return points;
}

function Particles({ isHome }) {
  const meshRef = useRef();
  // Latest route state, read inside useFrame. Flips false the instant we leave
  // the home route — before AnimatePresence finishes unmounting Home — so the
  // explosion fires from the current shape instead of waiting for unmount.
  const homeRef = useRef(isHome);
  homeRef.current = isHome;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 760;
  const COUNT = isMobile ? 1000 : 2400;
  const DELAY_SPAN = 0.35; // per-particle morph stagger → shapes ripple into form

  const { nodes } = useGLTF(MODEL);

  // Build every morph target once, plus per-particle character.
  const { shapes, data } = useMemo(() => {
    // Logo: orient to face camera (matches hero's x≈1.6 tilt), then sample.
    const logoGeo = nodes.Curve.geometry.clone();
    logoGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(1.6));

    const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.28, 160, 20);
    const cubeGeo = new THREE.BoxGeometry(2, 2, 2, 12, 12, 12);

    const shapes = {
      logo: normalize(sampleSurface(logoGeo, COUNT), SHAPE_RADIUS),
      sphere: fibonacciSphere(COUNT, SHAPE_RADIUS),
      knot: normalize(sampleSurface(knotGeo, COUNT), SHAPE_RADIUS),
      cube: normalize(sampleSurface(cubeGeo, COUNT), SHAPE_RADIUS),
    };
    knotGeo.dispose();
    cubeGeo.dispose();

    const data = [];
    for (let i = 0; i < COUNT; i++) {
      data.push({
        scatter: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        )
          .normalize()
          .multiplyScalar(0.6 + Math.random() * 1.1),
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize(),
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.5 + Math.random() * 0.9,
        spinSpeed: (Math.random() - 0.5) * 1.6,
        size: 0.014 + Math.random() * 0.016,
        delay: Math.random() * DELAY_SPAN, // stagger when this chip morphs
        swirl: (Math.random() - 0.5) * 3.0, // vortex twist during transitions
      });
    }
    return { shapes, data };
  }, [nodes, COUNT]);

  // ---- Per-frame morph ------------------------------------------------------
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pSmooth = useRef(0);
  const opacityRef = useRef(0);
  // 0 = dispersed cloud, 1 = formed. Starts at 0 so the logo materialises on
  // load; eases toward `present` so leaving/returning home disperses/reforms.
  const appearRef = useRef(0);
  const spin = useMemo(() => new THREE.Matrix4(), []);
  const A = useMemo(() => new THREE.Vector3(), []);
  const B = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Progress = how far #main-wrapper has scrolled past the top of the
    // viewport. Re-queried each frame so route changes are picked up: when the
    // element is gone (off the home page), the field fades out (`present`).
    // Drive presence off the ROUTE, not #main-wrapper existence. On nav-away the
    // path leaves "/" instantly, while AnimatePresence keeps Home mounted (and
    // ScrollToTop fires scrollTo(0)) during the exit. If we tracked scroll then,
    // p would ease to 0 and morph current→sphere→logo before exploding. Latch
    // off the route so we FREEZE p the moment we leave home: explode from the
    // current shape, then fade.
    const el = document.getElementById("main-wrapper");
    const onHome = homeRef.current && el;
    const present = onHome ? 1 : 0;
    if (onHome) {
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const pTarget = range > 0 ? THREE.MathUtils.clamp(-r.top / range, 0, 1) : 0;
      pSmooth.current += (pTarget - pSmooth.current) * Math.min(1, dt * 8);
    }
    const p = pSmooth.current;

    // Legibility: dim the field across the dense content band (project text +
    // capabilities) so bright chips don't wash out descriptions; full strength
    // at the hero and the bottom reassembly. On mobile the cloud can't drift
    // clear of the single narrow column, so dim earlier and harder — it reads
    // as a faint backdrop everywhere between the hero and the bottom reform.
    const dimStart = isMobile ? 0.08 : 0.42;
    const dimEnd = isMobile ? 0.18 : 0.52;
    const dim =
      THREE.MathUtils.smoothstep(p, dimStart, dimEnd) *
      (1 - THREE.MathUtils.smoothstep(p, 0.9, 1));
    const dimAmount = isMobile ? 0.66 : 0.32;

    // Assemble / disperse. `appear` eases toward present; particles fly in from
    // their scatter vectors as it rises, and back out as it falls.
    appearRef.current += (present - appearRef.current) * Math.min(1, dt * 2.4);
    const appear = appearRef.current;

    // Footer reveal. The canvas is position:fixed, so when the #page-root panel
    // slides up to expose the cinematic footer underneath, the fixed logo would
    // otherwise keep painting OVER the footer. Instead of fading it out (looks
    // dead), glue the logo to the panel: shift the whole cloud UP by however far
    // the panel has lifted, so the logo rides off the top as the footer enters
    // from the bottom. Measured from the panel's bottom edge in viewport px.
    const root = document.getElementById("page-root");
    let revealPx = 0;
    if (root) {
      const rb = root.getBoundingClientRect().bottom;
      revealPx = Math.max(0, window.innerHeight - rb);
    }

    const targetOp = (1 - dimAmount * dim) * appear;
    opacityRef.current += (targetOp - opacityRef.current) * Math.min(1, dt * 4);
    mesh.material.opacity = opacityRef.current;

    // Skip all the matrix work while fully faded (e.g. on non-home routes).
    if (opacityRef.current < 0.01) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;

    // Find the active morph segment + local progress.
    let k = 0;
    while (k < STOPS.length - 2 && p > STOPS[k + 1]) k++;
    const seg = THREE.MathUtils.clamp(
      (p - STOPS[k]) / (STOPS[k + 1] - STOPS[k] || 1),
      0,
      1,
    );
    const shapeA = shapes[SHAPE_KEYS[k]];
    const shapeB = shapes[SHAPE_KEYS[k + 1]];

    // Whole-cloud rotation: autoplay + scroll-linked turn, plus a tumble on X
    // that peaks mid-page so the form never reads flat.
    // Spin clockwise (negative Y) — same sense as the first shape drifting
    // right, so the turn reads as following the motion.
    const yAngle = (prefersReduced ? 0 : -t * 0.14) - p * Math.PI * 1.15;
    const tiltX =
      (prefersReduced ? 0 : Math.sin(t * 0.3) * 0.12) +
      Math.sin(p * Math.PI) * 0.28;
    spin.makeRotationX(tiltX);
    // Shared Y-rotation for chips that are neither morphing nor assembling
    // (the common case) — lets the loop skip per-particle trig.
    const cyA0 = Math.cos(yAngle);
    const syA0 = Math.sin(yAngle);

    // Whole-cloud screen offset for this segment (eased), left↔right per shape.
    const eG = smootherstep(seg);
    const oa = OFFSETS[k];
    const ob = OFFSETS[k + 1];
    const fxm = isMobile ? 0.5 : 1;
    const offX = (oa[0] + (ob[0] - oa[0]) * eG) * fxm * state.viewport.width;
    // Ride up with the footer-reveal panel (px → world units at the cloud's z).
    const revealLift = revealPx * (state.viewport.height / window.innerHeight);
    // On mobile the hero logo would sit dead-centre on the wordmark + eyebrow.
    // Lift ONLY the hero stop (k===0 start) into the upper third so the copy
    // below stays legible; the bottom reassembly (k===3 end → logo) stays put.
    const oaY = isMobile && k === 0 ? oa[1] + 0.16 : oa[1];
    const offY =
      (oaY + (ob[1] - oaY) * eG) * state.viewport.height + revealLift;

    const wob = prefersReduced ? 0 : 1;
    const scatterAmp = 1.15;
    const span = 1 - DELAY_SPAN;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];

      // Per-particle staggered progress → the shape ripples into form.
      const local = THREE.MathUtils.clamp((seg - d.delay) / span, 0, 1);
      const e = smootherstep(local);
      const bump = Math.sin(Math.PI * local); // 0→1→0 across this chip's morph

      A.copy(shapeA[i]);
      B.copy(shapeB[i]);
      pos.lerpVectors(A, B, e);

      // Assemble/disperse: staggered per chip so the form ripples in/out.
      // `burst` is 1 when dispersed, 0 when formed — pushes the chip far out
      // along its scatter vector (materialise on load / scatter away on exit).
      const pa = THREE.MathUtils.clamp((appear - d.delay) / span, 0, 1);
      const burst = (1 - smootherstep(pa)) * wob; // wob 0 → reduced-motion fades in place
      if (burst > 0.0001) {
        pos.addScaledVector(d.scatter, burst * 3.4);
      }

      // Mid-transition: blow out into free particles with drifting life.
      if (bump > 0.0001) {
        pos.x +=
          d.scatter.x * bump * scatterAmp +
          wob * Math.sin(t * d.wobbleSpeed + d.phase) * bump * 0.3;
        pos.y +=
          d.scatter.y * bump * scatterAmp +
          wob * Math.cos(t * d.wobbleSpeed + d.phase) * bump * 0.3;
        pos.z +=
          d.scatter.z * bump * scatterAmp +
          wob * Math.sin(t * 0.6 + d.phase) * bump * 0.3;
      }

      // Per-particle vortex twist around Y (peaks mid-transition + during
      // assembly so chips spiral in). Only recompute trig when actually
      // twisting; otherwise reuse the shared rotation.
      let cy = cyA0;
      let sy = syA0;
      if (bump > 0.0001 || burst > 0.0001) {
        const yA = yAngle + bump * d.swirl + burst * d.swirl * 1.6;
        cy = Math.cos(yA);
        sy = Math.sin(yA);
      }
      const rx = pos.x * cy - pos.z * sy;
      const rz = pos.x * sy + pos.z * cy;
      pos.x = rx;
      pos.z = rz;
      pos.applyMatrix4(spin); // shared X tumble
      pos.x += offX; // drift the whole shape left/right on screen
      pos.y += offY;

      dummy.position.copy(pos);
      dummy.scale.setScalar(d.size * (0.85 + 0.35 * (1 - bump)));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, data.length]}
      frustumCulled={false}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.12}
        metalness={0}
        envMapIntensity={1.5}
        transparent
        opacity={1}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

Particles.propTypes = {
  isHome: PropTypes.bool.isRequired,
};

const ParticleField = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  // Narrow viewports show more of the fixed-size cloud, so it reads as huge and
  // buries the hero copy. Dolly the camera back on mobile to shrink it.
  const isMobile = typeof window !== "undefined" && window.innerWidth < 760;
  return (
    <div
      className="particle-field"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, isMobile ? 8.4 : 6], fov: 45 }}
        // Decorative only — never intercept pointer/scroll. Inline so it beats
        // R3F's own canvas styles.
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 8, 6]} intensity={0.7} />
        <Particles isHome={isHome} />
        {/* Same procedural studio as the hero glass — chips read as the same
            white-glass material, not a separate effect. */}
        <Environment resolution={256}>
          <Lightformer
            intensity={3}
            color="#ffffff"
            position={[0, 3, 4]}
            scale={[12, 4, 1]}
          />
          <Lightformer
            intensity={1.6}
            color="#ffffff"
            position={[-6, 1, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[8, 8, 1]}
          />
          <Lightformer
            intensity={1.6}
            color="#ffffff"
            position={[6, -1, 2]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[8, 8, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
};

useGLTF.preload(MODEL);

export default ParticleField;
