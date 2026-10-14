import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

// ─── Floating Glass Cube ────────────────────────────────────────────
function GlassCube({
  position,
  scale = 1,
  rotationSpeed = 0.3,
}: {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * rotationSpeed;
    ref.current.rotation.y = t * rotationSpeed * 0.8;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.2}>
      <Box ref={ref} args={[scale, scale, scale]} position={position}>
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.15}
          emissive="#10b981"
          emissiveIntensity={0.05}
        />
      </Box>
      <Box args={[scale * 1.001, scale * 1.001, scale * 1.001]} position={position}>
        <meshBasicMaterial color="#00ffa3" wireframe transparent opacity={0.12} />
      </Box>
    </Float>
  );
}

// ─── Glowing Torus Ring ─────────────────────────────────────────────
function GlowingRing({
  position,
  scale = 1,
  color = '#00ffa3',
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <Torus ref={ref} args={[scale, scale * 0.04, 16, 80]} position={position}>
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </Torus>
    </Float>
  );
}

// ─── Wireframe Icosahedron ──────────────────────────────────────────
function WireShape({
  position,
  scale = 1,
  color = '#00f0ff',
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
      <Icosahedron ref={ref} args={[scale, 0]} position={position}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </Icosahedron>
    </Float>
  );
}

// ─── Particle Field ─────────────────────────────────────────────────
function ParticleField({ count = 150 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00ffa3"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Mouse Parallax Group ───────────────────────────────────────────
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!group.current) return;
    target.current.x += (pointer.x * 0.5 - target.current.x) * 0.05;
    target.current.y += (pointer.y * 0.3 - target.current.y) * 0.05;
    group.current.rotation.y = target.current.x;
    group.current.rotation.x = -target.current.y;
  });

  return <group ref={group}>{children}</group>;
}

// ─── Full 3D Scene ──────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#00ffa3" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#00f0ff" />

      <ParallaxGroup>
        {/* Glass cubes */}
        <GlassCube position={[-2.5, 1, -3]} scale={0.6} />
        <GlassCube position={[3, -0.5, -4]} scale={0.8} rotationSpeed={0.2} />
        <GlassCube position={[0, 2, -5]} scale={0.5} rotationSpeed={0.4} />
        <GlassCube position={[-4, -1, 0]} scale={0.4} rotationSpeed={0.5} />

        {/* Glowing rings */}
        <GlowingRing position={[2, 2, -3]} scale={1.2} color="#00ffa3" />
        <GlowingRing position={[-3, -1.5, -4]} scale={0.9} color="#00f0ff" />
        <GlowingRing position={[4.5, 0.5, -5]} scale={1.5} color="#00ffa3" />

        {/* Wireframe shapes */}
        <WireShape position={[1.5, 0.5, -2]} scale={0.5} color="#00f0ff" />
        <WireShape position={[-4, 2, -1]} scale={0.4} color="#00ffa3" />

        {/* Particles */}
        <ParticleField count={120} />
      </ParallaxGroup>
    </>
  );
}

// ─── HTML floating code labels (no async font loading) ──────────────
const FLOATING_LABELS = [
  { text: '</>', top: '15%', left: '8%', color: '#00ffa3', size: 'text-2xl', delay: '0s' },
  { text: '{ }', top: '70%', left: '85%', color: '#00f0ff', size: 'text-3xl', delay: '0.5s' },
  { text: 'JS', top: '25%', left: '90%', color: '#00f0ff', size: 'text-lg', delay: '1s' },
  { text: 'CSS', top: '80%', left: '12%', color: '#00ffa3', size: 'text-base', delay: '1.5s' },
  { text: 'npm', top: '45%', left: '5%', color: '#00ffa3', size: 'text-sm', delay: '0.8s' },
  { text: 'API', top: '60%', left: '92%', color: '#00f0ff', size: 'text-sm', delay: '0.3s' },
  { text: 'HTML', top: '10%', left: '75%', color: '#00ffa3', size: 'text-sm', delay: '2s' },
  { text: '⚛', top: '85%', left: '50%', color: '#00f0ff', size: 'text-2xl', delay: '1.2s' },
];

// ─── Export with Canvas + HTML overlay labels ───────────────────────
export default function CodingUniverse() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* 3D Canvas — shapes, rings, particles only */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* HTML floating code labels — no font loading needed */}
      {FLOATING_LABELS.map((label, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute animate-float-slow font-mono font-bold ${label.size} select-none`}
          style={{
            top: label.top,
            left: label.left,
            color: label.color,
            textShadow: `0 0 10px ${label.color}80, 0 0 20px ${label.color}40`,
            animationDelay: label.delay,
            opacity: 0.7,
          }}
        >
          {label.text}
        </span>
      ))}
    </div>
  );
}
