'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'


// Neural Network - Brain-like connections
function NeuralNetwork() {
    const groupRef = useRef<THREE.Group>(null)
    const nodesRef = useRef<THREE.InstancedMesh>(null)
    const linesRef = useRef<THREE.LineSegments>(null)

    const nodeCount = 150
    const connectionCount = 300

    const { nodePositions, nodeColors, linePositions, linePulses } = useMemo(() => {
        const positions: number[] = []
        const colors: number[] = []
        const lines: number[] = []
        const pulses: number[] = []

        // Create nodes in a brain-like sphere shape
        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            const radius = 4 + Math.random() * 2

            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6 // Flatten slightly
            const z = radius * Math.cos(phi)

            positions.push(x, y, z)

            // Color gradient from cyan to purple
            const t = Math.random()
            colors.push(
                0.0 + t * 0.5, // R
                0.8 - t * 0.3, // G
                1.0,           // B
                1.0            // A
            )
        }

        // Create connections between nearby nodes
        for (let i = 0; i < connectionCount; i++) {
            const a = Math.floor(Math.random() * nodeCount)
            const b = Math.floor(Math.random() * nodeCount)

            lines.push(
                positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2],
                positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]
            )
            pulses.push(Math.random() * Math.PI * 2)
        }

        return {
            nodePositions: new Float32Array(positions),
            nodeColors: new Float32Array(colors),
            linePositions: new Float32Array(lines),
            linePulses: pulses
        }
    }, [])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
        }

        // Pulse nodes
        if (nodesRef.current) {
            const dummy = new THREE.Object3D()
            const time = state.clock.elapsedTime

            for (let i = 0; i < nodeCount; i++) {
                const i3 = i * 3
                const pulse = Math.sin(time * 2 + i * 0.5) * 0.3 + 0.7

                dummy.position.set(
                    nodePositions[i3],
                    nodePositions[i3 + 1],
                    nodePositions[i3 + 2]
                )
                dummy.scale.setScalar(0.08 * pulse)
                dummy.updateMatrix()
                nodesRef.current.setMatrixAt(i, dummy.matrix)
            }
            nodesRef.current.instanceMatrix.needsUpdate = true
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Nodes */}
            <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.9} />
            </instancedMesh>

            {/* Connections */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={connectionCount * 2}
                        array={linePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#00F0FF" transparent opacity={0.15} />
            </lineSegments>
        </group>
    )
}

// Circuit Board Pattern
function CircuitBoard() {
    const groupRef = useRef<THREE.Group>(null)

    const traces = useMemo(() => {
        const paths: { points: THREE.Vector3[]; color: string }[] = []

        // Create circuit-like paths
        for (let i = 0; i < 40; i++) {
            const points: THREE.Vector3[] = []
            let x = (Math.random() - 0.5) * 30
            let z = (Math.random() - 0.5) * 30
            const y = -8 + Math.random() * 0.5

            points.push(new THREE.Vector3(x, y, z))

            // Create orthogonal paths like PCB traces
            for (let j = 0; j < 5; j++) {
                const direction = Math.random() > 0.5
                const length = 1 + Math.random() * 3

                if (direction) {
                    x += length * (Math.random() > 0.5 ? 1 : -1)
                } else {
                    z += length * (Math.random() > 0.5 ? 1 : -1)
                }

                points.push(new THREE.Vector3(x, y, z))
            }

            paths.push({
                points,
                color: Math.random() > 0.7 ? '#00F0FF' : '#0077BE'
            })
        }

        return paths
    }, [])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
        }
    })

    return (
        <group ref={groupRef}>
            {traces.map((trace, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={trace.points.length}
                            array={new Float32Array(trace.points.flatMap(p => [p.x, p.y, p.z]))}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={trace.color} transparent opacity={0.4} />
                </line>
            ))}

            {/* Circuit nodes */}
            {traces.map((trace, i) =>
                trace.points.map((point, j) => (
                    <mesh key={`${i}-${j}`} position={point}>
                        <circleGeometry args={[0.1, 8]} />
                        <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
                    </mesh>
                ))
            )}
        </group>
    )
}

// Floating Robot Arms / Mechanical Parts
function MechanicalElements() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
        }
    })

    return (
        <group ref={groupRef}>
            {/* Orbiting rings */}
            {[3, 5, 7].map((radius, i) => (
                <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, i * 0.3, 0]}>
                    <torusGeometry args={[radius, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#00F0FF" transparent opacity={0.3 - i * 0.05} />
                </mesh>
            ))}

            {/* Floating cubes */}
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2
                const radius = 6 + Math.sin(i) * 2
                return (
                    <mesh
                        key={i}
                        position={[
                            Math.cos(angle) * radius,
                            Math.sin(i * 0.5) * 2,
                            Math.sin(angle) * radius
                        ]}
                        rotation={[i * 0.3, i * 0.5, 0]}
                    >
                        <boxGeometry args={[0.3, 0.3, 0.3]} />
                        <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} wireframe />
                    </mesh>
                )
            })}
        </group>
    )
}

// Particle System - Data flow
function DataParticles({ count = 500 }) {
    const pointsRef = useRef<THREE.Points>(null)

    const [positions, velocities, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const vel = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const angle = Math.random() * Math.PI * 2
            const radius = 8 + Math.random() * 10

            pos[i3] = Math.cos(angle) * radius
            pos[i3 + 1] = (Math.random() - 0.5) * 15
            pos[i3 + 2] = Math.sin(angle) * radius

            vel[i3] = (Math.random() - 0.5) * 0.02
            vel[i3 + 1] = 0.01 + Math.random() * 0.02
            vel[i3 + 2] = (Math.random() - 0.5) * 0.02

            // Color variation
            const t = Math.random()
            col[i3] = 0.0 + t * 0.3     // R
            col[i3 + 1] = 0.7 + t * 0.3 // G
            col[i3 + 2] = 1.0           // B
        }

        return [pos, vel, col]
    }, [count])

    useFrame((state) => {
        if (pointsRef.current) {
            const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
            const time = state.clock.elapsedTime

            for (let i = 0; i < count; i++) {
                const i3 = i * 3

                pos[i3] += velocities[i3]
                pos[i3 + 1] += velocities[i3 + 1]
                pos[i3 + 2] += velocities[i3 + 2]

                // Spiral motion
                const angle = time * 0.1 + i * 0.01
                pos[i3] += Math.cos(angle) * 0.01
                pos[i3 + 2] += Math.sin(angle) * 0.01

                // Reset
                if (pos[i3 + 1] > 10) {
                    pos[i3 + 1] = -10
                    const newAngle = Math.random() * Math.PI * 2
                    const radius = 8 + Math.random() * 10
                    pos[i3] = Math.cos(newAngle) * radius
                    pos[i3 + 2] = Math.sin(newAngle) * radius
                }
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true
            pointsRef.current.rotation.y = time * 0.02
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Depth-based camera animation
function CameraController() {
    const { camera } = useThree()

    useFrame((state) => {
        const time = state.clock.elapsedTime
        camera.position.x = Math.sin(time * 0.1) * 2
        camera.position.y = 2 + Math.sin(time * 0.15) * 1
        camera.lookAt(0, 0, 0)
    })

    return null
}

// Scene Component
function Scene() {
    return (
        <>
            {/* Ambient lighting */}
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#00F0FF" />
            <pointLight position={[-5, -5, 5]} intensity={0.3} color="#7B68EE" />

            {/* Neural Network Brain */}
            <NeuralNetwork />

            {/* Circuit Board Base */}
            <CircuitBoard />

            {/* Mechanical Elements */}
            <MechanicalElements />

            {/* Data Particles */}
            <DataParticles count={600} />

            {/* Camera Animation */}
            <CameraController />

            {/* Post-processing */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                    intensity={1.5}
                    radius={0.8}
                />
            </EffectComposer>
        </>
    )
}

// Main Export Component
export default function RoboticBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 2, 12], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#050810']} />
                <fog attach="fog" args={['#050810', 8, 30]} />
                <Scene />
            </Canvas>
        </div>
    )
}
