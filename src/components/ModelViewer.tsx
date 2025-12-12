'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { USVModel, UAVModel, ROVModel } from './VehicleModels'

interface ModelViewerProps {
    vehicleId: 'usv' | 'uav' | 'rov';
}

// Loading placeholder component
function LoadingPlaceholder() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-navy-900/50">
            <div className="text-center">
                <div className="w-12 h-12 border-2 border-cyan-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-metallic-DEFAULT font-mono">Loading 3D Model...</p>
            </div>
        </div>
    )
}

export default function ModelViewer({ vehicleId }: ModelViewerProps) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="w-full h-full min-h-[400px] relative">
            {/* Loading state */}
            {!isLoaded && <LoadingPlaceholder />}

            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [8, 4, 12], fov: 40 }}
                gl={{ preserveDrawingBuffer: true, alpha: true, antialias: false, powerPreference: 'high-performance' }}
                onCreated={() => setIsLoaded(true)}
            >
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

                    {/* Post-Processing Effects - Simplified for performance */}
                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} radius={0.5} />
                        <Vignette eskil={false} offset={0.1} darkness={0.4} />
                    </EffectComposer>

                    {/* OrbitControls inside Suspense for proper initialization */}
                    <OrbitControls
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableZoom={false}
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}


