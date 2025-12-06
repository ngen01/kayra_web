'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere, Torus, Cone, Extrude } from '@react-three/drei'
import * as THREE from 'three'

// Shared Materials
const metallicDark = new THREE.MeshStandardMaterial({
    color: '#0B1C3E',
    roughness: 0.3,
    metalness: 0.8
})
const cyanGlow = new THREE.MeshStandardMaterial({
    color: '#00F0FF',
    emissive: '#00F0FF',
    emissiveIntensity: 0.5,
    toneMapped: false
})
const oceanBlue = new THREE.MeshStandardMaterial({
    color: '#0077BE',
    roughness: 0.2,
    metalness: 0.6
})
const safetyOrange = new THREE.MeshStandardMaterial({
    color: '#F59E0B',
    roughness: 0.4,
    metalness: 0.3
})
const glass = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0,
    metalness: 0,
    transmission: 0.9,
    transparent: true,
    opacity: 0.3
})

export function USVModel(props: any) {
    const group = useRef<THREE.Group>(null)
    const radarRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (radarRef.current) {
            radarRef.current.rotation.y += delta * 2
        }
        // Gentle hull float
        if (group.current) {
            group.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.02
        }
    })

    // Hull Shape
    const hullShape = useMemo(() => {
        const shape = new THREE.Shape()
        shape.moveTo(0, 0)
        shape.lineTo(1.5, 0) // Stern width
        shape.lineTo(2, 6) // Midship
        shape.lineTo(0, 10) // Bow tip
        shape.lineTo(-2, 6)
        shape.lineTo(-1.5, 0)
        return shape
    }, [])

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Main Hull */}
            <group rotation={[Math.PI / 2, Math.PI, 0]}> {/* Orient upright */}
                <Extrude args={[hullShape, { depth: 1.5, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.1 }]}>
                    <meshStandardMaterial color="#0B1C3E" metalness={0.7} roughness={0.2} />
                </Extrude>
            </group>

            {/* Deck Structure */}
            <Box args={[3, 1, 4]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#1a3a6e" />
            </Box>

            {/* Cabin / Bridge */}
            <group position={[0, 1.2, 1]}>
                <Box args={[2.5, 1, 2]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#D1D5DB" metalness={0.5} />
                </Box>
                {/* Windows */}
                <Box args={[2.6, 0.4, 1.8]} position={[0, 0.2, 0]}>
                    <primitive object={glass} />
                </Box>
            </group>

            {/* Radar Arch */}
            <group position={[0, 2, -1]}>
                <Box args={[3.2, 0.2, 0.5]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#374151" />
                </Box>
                <Box args={[0.2, 1.5, 0.5]} position={[1.5, -0.75, 0]} rotation={[0, 0, -0.2]}>
                    <meshStandardMaterial color="#374151" />
                </Box>
                <Box args={[0.2, 1.5, 0.5]} position={[-1.5, -0.75, 0]} rotation={[0, 0, 0.2]}>
                    <meshStandardMaterial color="#374151" />
                </Box>
                {/* Rotating Radar */}
                <group ref={radarRef} position={[0, 0.5, 0]}>
                    <Box args={[1.5, 0.1, 0.2]}>
                        <primitive object={cyanGlow} />
                    </Box>
                </group>
            </group>

            {/* Rear Deck / UAV Pad */}
            <group position={[0, 0.8, -3]}>
                <Cylinder args={[1, 1, 0.1, 8]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color="#374151" />
                </Cylinder>
                <Box args={[0.8, 0.2, 0.8]} position={[0, 0, 0]}>
                    <meshBasicMaterial color="#00F0FF" wireframe />
                </Box>
            </group>

            {/* Engines / Jets */}
            <group position={[0, -0.2, -5]}>
                <Cylinder args={[0.3, 0.4, 0.8, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0.8, 0, 0]}>
                    <primitive object={metallicDark} />
                </Cylinder>
                <Cylinder args={[0.3, 0.4, 0.8, 16]} rotation={[Math.PI / 2, 0, 0]} position={[-0.8, 0, 0]}>
                    <primitive object={metallicDark} />
                </Cylinder>
                {/* Thrust glow */}
                <Sphere args={[0.2]} position={[0.8, 0, -0.5]}>
                    <primitive object={cyanGlow} />
                </Sphere>
                <Sphere args={[0.2]} position={[-0.8, 0, -0.5]}>
                    <primitive object={cyanGlow} />
                </Sphere>
            </group>
        </group>
    )
}

export function UAVModel(props: any) {
    const propRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (propRef.current) {
            propRef.current.rotation.z += delta * 15 // Fast spin
        }
    })

    return (
        <group {...props} dispose={null}>
            {/* Fuselage Main */}
            <group rotation={[Math.PI / 2, 0, 0]}>
                <Cylinder args={[0.4, 0.2, 4, 16]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#D1D5DB" metalness={0.6} />
                </Cylinder>
            </group>

            {/* Nose Cone */}
            <Cone args={[0.4, 0.8, 16]} position={[0, 0, 2.4]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#9CA3AF" />
            </Cone>

            {/* Wings */}
            <group position={[0, 0, 0.5]}>
                {/* Left Wing */}
                <Box args={[4, 0.1, 0.8]} position={[2, 0, 0]} rotation={[0, -0.2, 0.05]}>
                    <primitive object={metallicDark} />
                </Box>
                {/* Right Wing */}
                <Box args={[4, 0.1, 0.8]} position={[-2, 0, 0]} rotation={[0, 0.2, -0.05]}>
                    <primitive object={metallicDark} />
                </Box>
                {/* Winglets */}
                <Box args={[0.1, 0.5, 0.6]} position={[4, 0.2, -0.2]}>
                    <primitive object={cyanGlow} />
                </Box>
                <Box args={[0.1, 0.5, 0.6]} position={[-4, 0.2, -0.2]}>
                    <primitive object={cyanGlow} />
                </Box>
            </group>

            {/* Tail */}
            <group position={[0, 0, -1.8]}>
                {/* V-Tail */}
                <Box args={[1.5, 0.1, 0.5]} position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <primitive object={metallicDark} />
                </Box>
                <Box args={[1.5, 0.1, 0.5]} position={[-0.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <primitive object={metallicDark} />
                </Box>
            </group>

            {/* Propeller (Pusher) */}
            <group position={[0, 0, -2]} ref={propRef}>
                <Box args={[1.8, 0.1, 0.05]}>
                    <meshStandardMaterial color="#374151" />
                </Box>
                <Box args={[0.1, 1.8, 0.05]}>
                    <meshStandardMaterial color="#374151" />
                </Box>
            </group>

            {/* Sensor Pod / Camera */}
            <Sphere args={[0.3]} position={[0, -0.3, 1.5]}>
                <primitive object={glass} />
            </Sphere>
            <Sphere args={[0.15]} position={[0, -0.3, 1.5]}>
                <primitive object={cyanGlow} />
            </Sphere>
        </group>
    )
}

export function ROVModel(props: any) {
    return (
        <group {...props} dispose={null}>
            {/* Main Frame - Box Outline Style */}
            <Box args={[2, 1.2, 2.5]}>
                <meshStandardMaterial color="#EAB308" wireframe={true} />
            </Box>
            {/* Yellow Structural Bars (Thicker wireframe simulation) */}
            <Box args={[2.1, 1.3, 0.2]} position={[0, 0, 1.2]}> <primitive object={safetyOrange} /> </Box>
            <Box args={[2.1, 1.3, 0.2]} position={[0, 0, -1.2]}> <primitive object={safetyOrange} /> </Box>
            <Box args={[0.2, 1.3, 2.6]} position={[1, 0, 0]}> <primitive object={safetyOrange} /> </Box>
            <Box args={[0.2, 1.3, 2.6]} position={[-1, 0, 0]}> <primitive object={safetyOrange} /> </Box>

            {/* Buoyancy Foam Block (Top) */}
            <Box args={[1.8, 0.4, 2.3]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#FCD34D" roughness={0.9} />
            </Box>

            {/* Electronics Housing (Center) */}
            <Cylinder args={[0.3, 0.3, 2, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                <meshStandardMaterial color="#374151" metalness={0.8} />
            </Cylinder>

            {/* Thrusters (4 vectored) */}
            {[
                [0.8, 0.4, 1], [-0.8, 0.4, 1],
                [0.8, 0.4, -1], [-0.8, 0.4, -1],
                [0.8, -0.4, 1], [-0.8, -0.4, 1], // Vertical
            ].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <Cylinder args={[0.15, 0.15, 0.4, 16]} rotation={[Math.PI / 2, 0, (i < 4 ? Math.PI / 4 * (i % 2 === 0 ? 1 : -1) : 0)]}>
                        <primitive object={metallicDark} />
                    </Cylinder>
                    {/* Propeller guard */}
                    <Torus args={[0.18, 0.02, 16, 32]} rotation={[0, Math.PI / 2, (i < 4 ? Math.PI / 4 * (i % 2 === 0 ? 1 : -1) : 0)]}>
                        <meshStandardMaterial color="#EAB308" />
                    </Torus>
                </group>
            ))}

            {/* Camera / Lights Array */}
            <group position={[0, 0, 1.25]}>
                <Box args={[0.8, 0.3, 0.2]}>
                    <meshStandardMaterial color="#111" />
                </Box>
                {/* Lenses */}
                <Sphere args={[0.1]} position={[0.2, 0, 0.1]}> <primitive object={glass} /> </Sphere>
                <Sphere args={[0.1]} position={[-0.2, 0, 0.1]}> <primitive object={glass} /> </Sphere>
                {/* Lights */}
                <Sphere args={[0.08]} position={[0.5, 0, 0.1]}> <primitive object={cyanGlow} /> </Sphere>
                <Sphere args={[0.08]} position={[-0.5, 0, 0.1]}> <primitive object={cyanGlow} /> </Sphere>
            </group>

            {/* Manipulator Arm (Folded) */}
            <group position={[0.5, -0.5, 1.2]} rotation={[0, -0.5, 0]}>
                <Box args={[0.1, 0.1, 0.6]} position={[0, 0, -0.3]}> <primitive object={metallicDark} /> </Box>
                <Box args={[0.1, 0.1, 0.5]} position={[0, 0, -0.8]} rotation={[0, 1, 0]}> <primitive object={metallicDark} /> </Box>
                <Box args={[0.2, 0.1, 0.2]} position={[0.23, 0, -1]} rotation={[0, 0.5, 0]}> <meshStandardMaterial color="#9CA3AF" /> </Box>
            </group>
        </group>
    )
}
