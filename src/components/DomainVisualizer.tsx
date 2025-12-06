'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Cloud, Sparkles, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { USVModel, UAVModel, ROVModel } from './VehicleModels'

interface DomainVisualizerProps {
    activePlatform: number // 0: USV, 1: UAV, 2: ROV
}

// === UAV SCENE (AIR) ===
function AirDomain() {
    return (
        <group>
            {/* Atmosphere */}
            <Cloud opacity={0.5} speed={0.4} segments={20} position={[0, -2, -5]} />
            <Cloud opacity={0.3} speed={0.2} segments={10} position={[4, 2, -3]} color="#a5b4fc" />

            {/* Floating UAV */}
            <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
                <group rotation={[0, -Math.PI / 4, 0]}>
                    <UAVModel scale={0.6} />
                </group>
            </Float>

            {/* Speed/Wind Particles */}
            <Sparkles count={50} scale={10} size={4} speed={2} opacity={0.5} color="#60a5fa" />
        </group>
    )
}

// === USV SCENE (SURFACE) ===
function SurfaceDomain() {
    return (
        <group>
            {/* Water Surface Simulation */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[20, 20, 20, 20]} />
                <meshStandardMaterial
                    color="#001e36"
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Floating USV */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                <group rotation={[0, -Math.PI / 6, 0]}>
                    <USVModel scale={0.7} />
                </group>
                {/* Wake Effect */}
                <Sparkles count={30} scale={[4, 1, 6]} position={[0, -0.5, 2]} size={6} speed={0.4} opacity={0.4} color="#00F0FF" />
            </Float>

            <Sparkles count={40} scale={12} size={3} speed={0.4} opacity={0.2} color="#ccfbf1" />
        </group>
    )
}

// === ROV SCENE (SUBSEA) ===
function SubseaDomain() {
    return (
        <group>
            {/* Dark Water Atmosphere */}
            <fog attach="fog" args={['#02040a', 0, 15]} />

            {/* Floating ROV */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
                <group rotation={[0.2, 0.4, 0]}>
                    <ROVModel scale={0.7} />
                </group>
            </Float>

            {/* Marine Snow / Bubbles */}
            <Sparkles count={100} scale={10} size={5} speed={0.2} opacity={0.4} color="#fbbf24" />

            {/* Light Shafts simulation (Cones) */}
            <group position={[0, 8, 0]}>
                <mesh rotation={[0, 0, 0.2]}>
                    <coneGeometry args={[1, 15, 32]} />
                    <meshBasicMaterial color="#EAB308" transparent opacity={0.05} depthWrite={false} />
                </mesh>
                <mesh rotation={[0, 0, -0.1]} position={[2, 0, 0]}>
                    <coneGeometry args={[0.5, 12, 32]} />
                    <meshBasicMaterial color="#EAB308" transparent opacity={0.03} depthWrite={false} />
                </mesh>
            </group>
        </group>
    )
}


export default function DomainVisualizer({ activePlatform }: DomainVisualizerProps) {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [4, 1, 5], fov: 40 }}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -5, -10]} intensity={0.5} color={activePlatform === 2 ? "#EAB308" : "#00F0FF"} />

                {/* Dynamic Lighting based on domain */}
                {activePlatform === 1 && <directionalLight position={[0, 10, 5]} intensity={1} color="#bae6fd" />}
                {activePlatform === 2 && <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#EAB308" />}

                <group>
                    {activePlatform === 1 && <AirDomain />}
                    {activePlatform === 0 && <SurfaceDomain />}
                    {activePlatform === 2 && <SubseaDomain />}
                </group>

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Canvas>
        </div>
    )
}

