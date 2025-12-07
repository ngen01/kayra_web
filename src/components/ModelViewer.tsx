'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Float, Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { USVModel, UAVModel, ROVModel } from './VehicleModels'

interface ModelViewerProps {
    vehicleId: 'usv' | 'uav' | 'rov';
}

export default function ModelViewer({ vehicleId }: ModelViewerProps) {
    return (
        <div className="w-full h-full min-h-[400px] relative">
            <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, alpha: true, antialias: false }}>
                <PerspectiveCamera makeDefault position={[4, 2, 6]} fov={45} />
                <Suspense fallback={null}>
                    {/* HDRI Environment for realistic reflections */}
                    <Environment preset="city" />

                    {/* Floating animation for aliveness */}
                    <Float
                        speed={2}
                        rotationIntensity={0.5}
                        floatIntensity={0.5}
                        floatingRange={[-0.1, 0.1]}
                    >
                        {/* Stage handles lighting and centering automatically */}
                        <Stage environment={null} intensity={0.5}>
                            {vehicleId === 'usv' && <USVModel />}
                            {vehicleId === 'uav' && <UAVModel />}
                            {vehicleId === 'rov' && <ROVModel />}
                        </Stage>
                    </Float>

                    {/* Additional dramatic lighting */}
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" distance={20} />
                    <pointLight position={[-10, -5, -10]} intensity={1} color="#EAB308" distance={20} />
                    <ambientLight intensity={0.2} />

                    {/* Post-Processing Effects */}
                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={0.5} />
                    </EffectComposer>
                </Suspense>

                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.5}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 1.4}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>

            {/* Loading Overlay (if needed, handled by Suspense fallback usually) */}
        </div>
    )
}
