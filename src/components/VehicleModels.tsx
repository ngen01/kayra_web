'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere, Torus, Extrude, Tube } from '@react-three/drei'
import * as THREE from 'three'

// --- High-Fidelity Materials ---

const hullMaterial = new THREE.MeshStandardMaterial({
    color: '#0B1C3E', // Navy Blue
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 1.5,
})

const deckMaterial = new THREE.MeshStandardMaterial({
    color: '#1F2937', // Dark Grey
    roughness: 0.7,
    metalness: 0.3,
})

const accentMaterial = new THREE.MeshStandardMaterial({
    color: '#00F0FF', // Cyan
    emissive: '#00F0FF',
    emissiveIntensity: 0.8,
    toneMapped: false,
})

const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#A5F3FC',
    roughness: 0,
    metalness: 0.1,
    transmission: 0.95,
    thickness: 0.5,
    transparent: true,
    opacity: 0.4,
    envMapIntensity: 2,
})

const metalMaterial = new THREE.MeshStandardMaterial({
    color: '#9CA3AF', // Silver/Chrome
    roughness: 0.1,
    metalness: 1.0,
})

const carbonFiberMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.4,
    metalness: 0.5,
    normalScale: new THREE.Vector2(1, 1), // Would need a texture for real carbon fiber, using dark metallic for now
})

const safetyOrangeMaterial = new THREE.MeshStandardMaterial({
    color: '#F97316',
    roughness: 0.4,
    metalness: 0.2,
})

// --- USV Model (Unmanned Surface Vehicle) ---

export function USVModel(props: any) {
    const radarRef = useRef<THREE.Group>(null)
    const propLRef = useRef<THREE.Group>(null)
    const propRRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (radarRef.current) radarRef.current.rotation.y += delta * 2.5
        if (propLRef.current) propLRef.current.rotation.z += delta * 10
        if (propRRef.current) propRRef.current.rotation.z -= delta * 10
    })

    const hullShape = useMemo(() => {
        const shape = new THREE.Shape()
        shape.moveTo(0, 0)
        shape.bezierCurveTo(1.5, 0, 2.2, 4, 0, 12) // Sleek bow curve
        shape.bezierCurveTo(-2.2, 4, -1.5, 0, 0, 0)
        return shape
    }, [])

    return (
        <group {...props} dispose={null}>
            {/* Hull */}
            <group rotation={[Math.PI / 2, Math.PI, 0]} position={[0, 0, -1]}>
                <Extrude args={[hullShape, { depth: 2, bevelEnabled: true, bevelSize: 0.2, bevelThickness: 0.2, steps: 4 }]}>
                    <primitive object={hullMaterial} />
                </Extrude>
            </group>

            {/* Superstructure / Cabin */}
            <group position={[0, 1.2, 1]}>
                {/* Main Cabin Block */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.2, 1.2, 3]} />
                    <primitive object={hullMaterial} />
                </mesh>

                {/* Windshield */}
                <mesh position={[0, 0.2, 1.3]} rotation={[0.3, 0, 0]}>
                    <boxGeometry args={[2.0, 0.8, 0.5]} />
                    <primitive object={glassMaterial} />
                </mesh>

                {/* Side Windows */}
                <mesh position={[1.11, 0.2, 0]}>
                    <boxGeometry args={[0.1, 0.6, 2]} />
                    <primitive object={glassMaterial} />
                </mesh>
                <mesh position={[-1.11, 0.2, 0]}>
                    <boxGeometry args={[0.1, 0.6, 2]} />
                    <primitive object={glassMaterial} />
                </mesh>
            </group>

            {/* Sensor Mast & Radar */}
            <group position={[0, 2.5, 0]}>
                <mesh position={[0, -0.5, 0]}>
                    <cylinderGeometry args={[0.1, 0.2, 1.5]} />
                    <primitive object={metalMaterial} />
                </mesh>
                <group ref={radarRef} position={[0, 0.3, 0]}>
                    <mesh>
                        <boxGeometry args={[1.8, 0.15, 0.3]} />
                        <primitive object={deckMaterial} />
                    </mesh>
                    <mesh position={[0, 0, 0.16]}>
                        <boxGeometry args={[1.7, 0.05, 0.05]} />
                        <primitive object={accentMaterial} />
                    </mesh>
                </group>
            </group>

            {/* Rear Deck Details */}
            <group position={[0, 0.8, -3]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[2.5, 3]} />
                    <primitive object={deckMaterial} />
                </mesh>
                {/* Helipad / Drone Landing Marker */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <ringGeometry args={[0.8, 0.9, 32]} />
                    <primitive object={accentMaterial} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <planeGeometry args={[0.2, 0.8]} />
                    <primitive object={accentMaterial} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.01, 0]}>
                    <planeGeometry args={[0.2, 0.8]} />
                    <primitive object={accentMaterial} />
                </mesh>
            </group>

            {/* Propulsion */}
            <group position={[0, -0.5, -5]}>
                <group position={[0.8, 0, 0]} ref={propLRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.3, 0.1, 0.8]} />
                        <primitive object={metalMaterial} />
                    </mesh>
                </group>
                <group position={[-0.8, 0, 0]} ref={propRRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.3, 0.1, 0.8]} />
                        <primitive object={metalMaterial} />
                    </mesh>
                </group>
                {/* Water Jet Glow */}
                <mesh position={[0.8, 0, -0.5]}>
                    <sphereGeometry args={[0.25]} />
                    <primitive object={accentMaterial} />
                </mesh>
                <mesh position={[-0.8, 0, -0.5]}>
                    <sphereGeometry args={[0.25]} />
                    <primitive object={accentMaterial} />
                </mesh>
            </group>
        </group>
    )
}

// --- UAV Model (Unmanned Aerial Vehicle) ---

export function UAVModel(props: any) {
    const propRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (propRef.current) propRef.current.rotation.z += delta * 20
    })

    return (
        <group {...props} dispose={null}>
            {/* Fuselage */}
            <group rotation={[Math.PI / 2, 0, 0]}>
                {/* Main Body */}
                <mesh position={[0, 0, 0]}>
                    <capsuleGeometry args={[0.4, 3.5, 8, 16]} />
                    <primitive object={hullMaterial} />
                </mesh>
                {/* Cockpit / Sensor Dome */}
                <mesh position={[0, 0.2, 1.2]} rotation={[0.2, 0, 0]}>
                    <capsuleGeometry args={[0.35, 1.2, 8, 16]} />
                    <primitive object={glassMaterial} />
                </mesh>
            </group>

            {/* Wings */}
            <group position={[0, 0.2, 0.5]}>
                {/* Main Wing Shape */}
                <mesh>
                    <boxGeometry args={[8, 0.1, 1.2]} />
                    <primitive object={hullMaterial} />
                </mesh>
                {/* Flaps / Ailerons */}
                <mesh position={[2, -0.05, -0.5]}>
                    <boxGeometry args={[3, 0.05, 0.3]} />
                    <primitive object={metalMaterial} />
                </mesh>
                <mesh position={[-2, -0.05, -0.5]}>
                    <boxGeometry args={[3, 0.05, 0.3]} />
                    <primitive object={metalMaterial} />
                </mesh>
                {/* Wingtips */}
                <mesh position={[4, 0.5, -0.2]} rotation={[0, 0, Math.PI / 6]}>
                    <boxGeometry args={[0.1, 1.2, 0.8]} />
                    <primitive object={accentMaterial} />
                </mesh>
                <mesh position={[-4, 0.5, -0.2]} rotation={[0, 0, -Math.PI / 6]}>
                    <boxGeometry args={[0.1, 1.2, 0.8]} />
                    <primitive object={accentMaterial} />
                </mesh>
            </group>

            {/* V-Tail */}
            <group position={[0, 0.5, -1.8]}>
                <mesh rotation={[0, 0, Math.PI / 4]} position={[0.8, 0.5, 0]}>
                    <boxGeometry args={[2, 0.1, 0.8]} />
                    <primitive object={hullMaterial} />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]} position={[-0.8, 0.5, 0]}>
                    <boxGeometry args={[2, 0.1, 0.8]} />
                    <primitive object={hullMaterial} />
                </mesh>
            </group>

            {/* Rear Propeller */}
            <group position={[0, 0, -2.2]} ref={propRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.2]} />
                    <primitive object={metalMaterial} />
                </mesh>
                <mesh>
                    <boxGeometry args={[2.2, 0.15, 0.02]} />
                    <primitive object={carbonFiberMaterial} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[2.2, 0.15, 0.02]} />
                    <primitive object={carbonFiberMaterial} />
                </mesh>
                {/* Prop Blur Effect (Visual only) */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[1.1, 1.1, 0.05, 32]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                </mesh>
            </group>

            {/* Belly Camera Pod */}
            <group position={[0, -0.5, 1]}>
                <mesh>
                    <sphereGeometry args={[0.3]} />
                    <primitive object={metalMaterial} />
                </mesh>
                <mesh position={[0, -0.2, 0.15]}>
                    <sphereGeometry args={[0.1]} />
                    <primitive object={glassMaterial} />
                </mesh>
                <mesh position={[0, -0.2, 0.15]}>
                    <pointLight color="#00F0FF" distance={2} intensity={2} />
                </mesh>
            </group>
        </group>
    )
}

// --- ROV Model (Remotely Operated Vehicle) ---

export function ROVModel(props: any) {
    return (
        <group {...props} dispose={null}>
            {/* Main Frame - Industrial Look */}
            <group>
                {/* Top Frame */}
                <mesh position={[0, 0.8, 0]}>
                    <boxGeometry args={[2.2, 0.1, 3.2]} />
                    <primitive object={safetyOrangeMaterial} />
                </mesh>
                {/* Bottom Frame */}
                <mesh position={[0, -0.8, 0]}>
                    <boxGeometry args={[2.2, 0.1, 3.2]} />
                    <primitive object={safetyOrangeMaterial} />
                </mesh>
                {/* Vertical Struts */}
                {[
                    [1, 0, 1.5], [-1, 0, 1.5],
                    [1, 0, -1.5], [-1, 0, -1.5]
                ].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]}>
                        <cylinderGeometry args={[0.08, 0.08, 1.6]} />
                        <primitive object={metalMaterial} />
                    </mesh>
                ))}
            </group>

            {/* Buoyancy Foam */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1.8, 0.4, 2.8]} />
                <meshStandardMaterial color="#FCD34D" roughness={0.9} />
            </mesh>

            {/* Electronics Canister (Titanium) */}
            <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 2.6, 24]} />
                <primitive object={metalMaterial} />
            </mesh>
            {/* End Caps */}
            <mesh position={[0, -0.2, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.55, 0.55, 0.1, 24]} />
                <primitive object={accentMaterial} />
            </mesh>

            {/* Thrusters (Blue Robotics style) */}
            {[
                { pos: [1.2, 0, 1], rot: [0, 0, 0] },
                { pos: [-1.2, 0, 1], rot: [0, 0, 0] },
                { pos: [1.2, 0, -1], rot: [0, 0, 0] },
                { pos: [-1.2, 0, -1], rot: [0, 0, 0] },
                { pos: [0, 1, 0], rot: [0, 0, Math.PI / 2] }, // Vertical
                { pos: [0, -1, 0], rot: [0, 0, Math.PI / 2] } // Vertical
            ].map((config, i) => (
                <group key={i} position={config.pos as [number, number, number]} rotation={config.rot as [number, number, number]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.25, 0.2, 0.4]} />
                        <primitive object={hullMaterial} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.25, 0.02, 16, 32]} />
                        <primitive object={accentMaterial} />
                    </mesh>
                    {/* Propeller */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.2, 0.2, 0.05, 3]} />
                        <primitive object={deckMaterial} />
                    </mesh>
                </group>
            ))}

            {/* Manipulator Arm */}
            <group position={[0.6, -0.6, 1.4]} rotation={[0, -0.2, 0]}>
                <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.6]} />
                    <primitive object={metalMaterial} />
                </mesh>
                <mesh position={[0, 0, 0.6]}>
                    <sphereGeometry args={[0.12]} />
                    <primitive object={accentMaterial} />
                </mesh>
                <group position={[0, 0, 0.6]} rotation={[0, 0.5, 0]}>
                    <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.06, 0.06, 0.6]} />
                        <primitive object={metalMaterial} />
                    </mesh>
                    {/* Claw */}
                    <mesh position={[0, 0, 0.65]} rotation={[0, 0, 0]}>
                        <boxGeometry args={[0.1, 0.2, 0.1]} />
                        <primitive object={metalMaterial} />
                    </mesh>
                    <mesh position={[0.05, 0, 0.75]} rotation={[0, 0, -0.2]}>
                        <boxGeometry args={[0.02, 0.05, 0.2]} />
                        <primitive object={accentMaterial} />
                    </mesh>
                    <mesh position={[-0.05, 0, 0.75]} rotation={[0, 0, 0.2]}>
                        <boxGeometry args={[0.02, 0.05, 0.2]} />
                        <primitive object={accentMaterial} />
                    </mesh>
                </group>
            </group>

            {/* Lights & Camera Array */}
            <group position={[0, 0.1, 1.4]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.8, 0.4, 0.2]} />
                    <primitive object={hullMaterial} />
                </mesh>
                <mesh position={[0.2, 0, 0.11]}>
                    <circleGeometry args={[0.12, 32]} />
                    <primitive object={glassMaterial} />
                </mesh>
                <mesh position={[-0.2, 0, 0.11]}>
                    <circleGeometry args={[0.12, 32]} />
                    <primitive object={glassMaterial} />
                </mesh>
                {/* Strong Lights */}
                <pointLight position={[0.3, 0, 0.5]} intensity={2} color="#ffffff" distance={5} />
                <pointLight position={[-0.3, 0, 0.5]} intensity={2} color="#ffffff" distance={5} />
            </group>
        </group>
    )
}
