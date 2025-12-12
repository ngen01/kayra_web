'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Box, Cylinder, Sphere, Torus, Extrude, Tube, Center } from '@react-three/drei'
import * as THREE from 'three'
import { STLLoader } from 'three-stdlib'

// --- High-Fidelity Materials ---

// --- High-Fidelity Materials ---

const hullMaterial = new THREE.MeshStandardMaterial({
    color: '#152C55', // Lighter Navy for better visibility
    roughness: 0.3, // Smoother/Shinier surface ("parlak")
    metalness: 0.2, // Slight metallic feel
    side: THREE.DoubleSide,
    envMapIntensity: 2.0, // Catch more light/reflections
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
    normalScale: new THREE.Vector2(1, 1),
})

const safetyOrangeMaterial = new THREE.MeshStandardMaterial({
    color: '#F97316',
    roughness: 0.4,
    metalness: 0.2,
})

const yellowSubMaterial = new THREE.MeshStandardMaterial({
    color: '#EAB308', // Yellow
    roughness: 0.3,
    metalness: 0.5,
})

// --- USV Model (Unmanned Surface Vehicle) - STL LOADED ---

export function USVModel(props: any) {
    const geometry = useLoader(STLLoader, '/models/usv.stl')
    const meshRef = useRef<THREE.Mesh>(null)

    // Ensure normals are computed for smooth shading
    useMemo(() => {
        if (geometry) {
            geometry.computeVertexNormals()
        }
    }, [geometry])

    return (
        <group {...props} dispose={null}>
            <Center top>
                <mesh
                    ref={meshRef}
                    geometry={geometry}
                    material={hullMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.1}
                >
                </mesh>
            </Center>
            <mesh position={[0, 0.5, 0]}>
                <pointLight distance={3} intensity={2} color="#00F0FF" />
            </mesh>
        </group>
    )
}

// --- UAV Model (Unmanned Aerial Vehicle) - PROCEDURAL (No STL provided) ---

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

// --- ROV Model (Remotely Operated Vehicle) - STL LOADED ---

export function ROVModel(props: any) {
    const geometry = useLoader(STLLoader, '/models/rov.stl')

    useMemo(() => {
        if (geometry) {
            geometry.computeVertexNormals()
        }
    }, [geometry])

    return (
        <group {...props} dispose={null}>
            <Center top>
                <mesh
                    geometry={geometry}
                    material={hullMaterial}
                    rotation={[0, 0, 0]}
                    scale={0.1}
                />
            </Center>
            <mesh position={[0, 0, 0]}>
                <pointLight distance={4} intensity={2} color="#EAB308" />
            </mesh>
        </group>
    )
}


