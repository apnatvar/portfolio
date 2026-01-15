"use client";

import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const MAIN = new THREE.Color("rgb(109, 204, 61)");

function SentinelSwarm() {
  // Instanced “sentinel core” particles with trailing motion illusion.
  // (Core + tentacles would be heavier; this gives the feel at hero-bg cost.)
  const inst = useRef<THREE.InstancedMesh>(null);
  const inst2 = useRef<THREE.InstancedMesh>(null);
  const inst3 = useRef<THREE.InstancedMesh>(null);

  const COUNT = 220;
  const temp = useMemo(() => new THREE.Object3D(), []);
  const temp2 = useMemo(() => new THREE.Object3D(), []);
  const temp3 = useMemo(() => new THREE.Object3D(), []);

  // Per-instance params
  const params = useMemo(() => {
    const arr = new Array(COUNT).fill(0).map((_, i) => {
      // lanes drifting toward the city gate
      const lane = (i % 10) - 5;
      return {
        seed: Math.random() * 1000,
        lane,
        baseX: lane * 4 + (Math.random() - 0.5) * 3,
        baseY: (Math.random() - 0.5) * 8,
        // start far and recycle
        z0: -60 - Math.random() * 160,
        speed: 5.5 + Math.random() * 6.5,
        size: 0.25 + Math.random() * 0.85,
        wobble: 0.6 + Math.random() * 1.8,
      };
    });
    return arr;
  }, []);

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    if (!inst.current || !inst2.current || !inst3.current) return;

    for (let i = 0; i < COUNT; i++) {
      const p = params[i];

      // Move toward the gate; wrap around for infinite loop
      const zTravel = (t * p.speed) % 170;
      const z = p.z0 + zTravel;

      // Lateral swarm wobble
      const x = p.baseX + Math.sin(t * p.wobble + p.seed) * 2.2;
      const y = p.baseY + Math.cos(t * (p.wobble * 0.8) + p.seed) * 1.6;

      // Slight “attack angle” pointing forward
      temp.position.set(x, y, z);
      temp.rotation.set(0, Math.sin(t + p.seed) * 0.35, 0);
      temp.scale.setScalar(p.size);
      temp.updateMatrix();
      inst.current.setMatrixAt(i, temp.matrix);

      // A second instance acts like a “glow shell” offset behind (cheap trail feel)
      temp2.position.set(x * 0.98, y * 0.98, z - 1.2 - p.size * 1.6);
      temp2.rotation.copy(temp.rotation);
      temp2.scale.setScalar(p.size * 1.35);
      temp2.updateMatrix();
      inst2.current.setMatrixAt(i, temp2.matrix);

      temp3.position.set(x * 0.9, y * 0.9, z - 1 - p.size * 1.1);
      temp3.rotation.copy(temp.rotation);
      temp3.scale.setScalar(p.size * 1.45);
      temp3.updateMatrix();
      inst3.current.setMatrixAt(i, temp3.matrix);
    }

    inst.current.instanceMatrix.needsUpdate = true;
    inst2.current.instanceMatrix.needsUpdate = true;
    inst3.current.instanceMatrix.needsUpdate = true;

    // tiny global drift to keep it alive
    inst.current.rotation.y += dt * 0.2;
    inst2.current.rotation.y += dt * 0.05;
    inst3.current.rotation.y += dt * 0.1;
  });

  return (
    <group>
      {/* Core (dark metallic) */}
      <instancedMesh ref={inst} args={[undefined, undefined, COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={MAIN}
          roughness={10}
          metalness={2}
          emissive={MAIN}
          emissiveIntensity={0.3}
          opacity={0.3}
        />
      </instancedMesh>

      <instancedMesh ref={inst2} args={[undefined, undefined, COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={MAIN}
          roughness={10}
          metalness={4}
          emissive={MAIN}
          emissiveIntensity={0.7}
          opacity={0.8}
        />
      </instancedMesh>

      <instancedMesh ref={inst3} args={[undefined, undefined, COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={MAIN}
          roughness={10}
          metalness={3}
          emissive={MAIN}
          emissiveIntensity={0.5}
          opacity={0.2}
        />
      </instancedMesh>
    </group>
  );
}

function CameraDrift() {
  // Subtle forward creep + micro shake so it feels “alive”.
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.08) * 2.2;
    camera.position.y = 3 + Math.cos(t * 0.11) * 1.2;
    camera.position.z = 18 + Math.sin(t * 0.05) * 1.8;

    camera.lookAt(0, 0, -90);
  });
  return null;
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ fov: 55, near: 0.1, far: 260, position: [0, 3, 18] }}
      >
        {/* Dark base so white/grey text stays readable */}
        <color attach="background" args={["#020302"]} />

        {/* Atmosphere */}
        <fog attach="fog" args={["#000000", 18, 200]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[8, 12, 10]} intensity={0.6} />
        <pointLight position={[0, 2, -40]} intensity={1.2} color={MAIN} />

        <CameraDrift />
        <SentinelSwarm />

        {/* Dust/particles for depth */}
        <Sparkles
          count={660}
          size={1.6}
          speed={0.25}
          opacity={10}
          color={MAIN}
          scale={[120, 50, 160]}
          position={[0, 0, -70]}
        />

        {/* Postprocessing */}
        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.8}
          />
        </EffectComposer>
      </Canvas>

      {/* Optional: readability gradient overlay for your headline area */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
