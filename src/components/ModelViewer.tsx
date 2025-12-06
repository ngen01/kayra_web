'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Float } from '@react-three/drei'
import { USVModel, UAVModel, ROVModel } from './VehicleModels'

interface ModelViewerProps {
    vehicleId: 'usv' | 'uav' | 'rov';
}

export default function ModelViewer({ vehicleId }: ModelViewerProps) {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 6], fov: 45 }} gl={{ preserveDrawingBuffer: true, alpha: true }}>
                <Suspense fallback={null}>
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
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" distance={20} />
                    <pointLight position={[-10, -5, -10]} intensity={0.5} color="#EAB308" distance={20} />
                    <ambientLight intensity={0.2} />
                </Suspense>

                <OrbitControls
                    autoRotate
                    autoRotateSpeed={1}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 1.4}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>
        </div>
    )
}
