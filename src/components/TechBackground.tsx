'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// Circuit Grid - Glowing tech lines
function CircuitGrid() {
    const linesRef = useRef<THREE.Group>(null)

    const lines = useMemo(() => {
        const lineData: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = []
        const gridSize = 20
        const spacing = 2

        // Horizontal lines
        for (let i = -gridSize; i <= gridSize; i += spacing) {
            lineData.push({
                start: new THREE.Vector3(-gridSize, 0, i),
                end: new THREE.Vector3(gridSize, 0, i),
                color: Math.random() > 0.8 ? '#00F0FF' : '#0077BE30'
            })
        }

        // Vertical lines
        for (let i = -gridSize; i <= gridSize; i += spacing) {
            lineData.push({
                start: new THREE.Vector3(i, 0, -gridSize),
                end: new THREE.Vector3(i, 0, gridSize),
                color: Math.random() > 0.8 ? '#00F0FF' : '#0077BE30'
            })
        }

        return lineData
    }, [])

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.x = -Math.PI / 3
            linesRef.current.position.y = -5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
        }
    })

    return (
        <group ref={linesRef}>
            {lines.map((line, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                line.start.x, line.start.y, line.start.z,
                                line.end.x, line.end.y, line.end.z
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={line.color} transparent opacity={0.5} />
                </line>
            ))}
        </group>
    )
}

// Data Nodes - Glowing connection points
function DataNodes({ count = 50 }) {
    const nodesRef = useRef<THREE.InstancedMesh>(null)

    const nodeData = useMemo(() => {
        const positions: number[] = []
        const scales: number[] = []
        const speeds: number[] = []

        for (let i = 0; i < count; i++) {
            positions.push(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15 + 2,
                (Math.random() - 0.5) * 30
            )
            scales.push(0.05 + Math.random() * 0.1)
            speeds.push(0.5 + Math.random() * 2)
        }

        return { positions, scales, speeds }
    }, [count])

    useFrame((state) => {
        if (nodesRef.current) {
            const time = state.clock.elapsedTime
            const dummy = new THREE.Object3D()

            for (let i = 0; i < count; i++) {
                const i3 = i * 3
                dummy.position.set(
                    nodeData.positions[i3] + Math.sin(time * nodeData.speeds[i] + i) * 0.5,
                    nodeData.positions[i3 + 1] + Math.sin(time * 0.5 + i) * 0.3,
                    nodeData.positions[i3 + 2] + Math.cos(time * nodeData.speeds[i] + i) * 0.5
                )
                dummy.scale.setScalar(nodeData.scales[i] * (1 + Math.sin(time * 2 + i) * 0.3))
                dummy.updateMatrix()
                nodesRef.current.setMatrixAt(i, dummy.matrix)
            }
            nodesRef.current.instanceMatrix.needsUpdate = true
        }
    })

    return (
        <instancedMesh ref={nodesRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.8} />
        </instancedMesh>
    )
}

// Connection Lines - Dynamic data flow
function ConnectionLines({ count = 100 }) {
    const linesRef = useRef<THREE.Points>(null)

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            pos[i3] = (Math.random() - 0.5) * 40
            pos[i3 + 1] = (Math.random() - 0.5) * 20 + 5
            pos[i3 + 2] = (Math.random() - 0.5) * 40
        }
        return pos
    }, [count])

    const velocities = useMemo(() => {
        const vel = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            vel[i * 3] = (Math.random() - 0.5) * 0.02
            vel[i * 3 + 1] = -0.01 - Math.random() * 0.02
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02
        }
        return vel
    }, [count])

    useFrame(() => {
        if (linesRef.current) {
            const pos = linesRef.current.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < count; i++) {
                const i3 = i * 3
                pos[i3] += velocities[i3]
                pos[i3 + 1] += velocities[i3 + 1]
                pos[i3 + 2] += velocities[i3 + 2]

                // Reset if out of bounds
                if (pos[i3 + 1] < -10 || Math.abs(pos[i3]) > 20 || Math.abs(pos[i3 + 2]) > 20) {
                    pos[i3] = (Math.random() - 0.5) * 40
                    pos[i3 + 1] = 15
                    pos[i3 + 2] = (Math.random() - 0.5) * 40
                }
            }

            linesRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <points ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#00F0FF"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Hexagon Pattern - Tech honeycomb
function HexagonRing({ radius = 5, y = 0 }) {
    const ringRef = useRef<THREE.Group>(null)

    const hexagons = useMemo(() => {
        const hexs: { x: number; z: number; scale: number }[] = []
        const hexCount = 6

        for (let i = 0; i < hexCount; i++) {
            const angle = (i / hexCount) * Math.PI * 2
            hexs.push({
                x: Math.cos(angle) * radius,
                z: Math.sin(angle) * radius,
                scale: 0.3 + Math.random() * 0.2
            })
        }
        return hexs
    }, [radius])

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.y = state.clock.elapsedTime * 0.1
        }
    })

    return (
        <group ref={ringRef} position={[0, y, 0]}>
            {hexagons.map((hex, i) => (
                <mesh key={i} position={[hex.x, 0, hex.z]} rotation={[Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[hex.scale, 6]} />
                    <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} wireframe />
                </mesh>
            ))}
        </group>
    )
}

// Central Core - Glowing orb
function CentralCore() {
    const coreRef = useRef<THREE.Mesh>(null)
    const ringsRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.x = state.clock.elapsedTime * 0.3
            ringsRef.current.rotation.z = state.clock.elapsedTime * 0.2
        }
    })

    return (
        <group position={[0, 3, -10]}>
            {/* Core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
            </mesh>

            {/* Glow */}
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.1} />
            </mesh>

            {/* Rings */}
            <group ref={ringsRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#00F0FF" transparent opacity={0.8} />
                </mesh>
                <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                    <torusGeometry args={[2.5, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#0077BE" transparent opacity={0.6} />
                </mesh>
                <mesh rotation={[Math.PI / 4, Math.PI / 6, Math.PI / 3]}>
                    <torusGeometry args={[3, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
                </mesh>
            </group>
        </group>
    )
}

// Scene Component
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 10, 0]} intensity={0.5} color="#00F0FF" />

            {/* Circuit Grid */}
            <CircuitGrid />

            {/* Data Nodes */}
            <DataNodes count={80} />

            {/* Connection Lines */}
            <ConnectionLines count={200} />

            {/* Hexagon Rings */}
            <HexagonRing radius={8} y={5} />
            <HexagonRing radius={12} y={2} />
            <HexagonRing radius={6} y={8} />

            {/* Central Core */}
            <CentralCore />

            {/* Post-processing */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    intensity={1.2}
                    radius={0.8}
                />
            </EffectComposer>
        </>
    )
}

// Main Export Component
export default function TechBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 5, 15], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#050a14']} />
                <fog attach="fog" args={['#050a14', 10, 40]} />
                <Scene />
            </Canvas>
        </div>
    )
}
