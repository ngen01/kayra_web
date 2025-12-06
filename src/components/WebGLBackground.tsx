'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { animate, useMotionValue } from 'framer-motion'

// Domain definitions for easy tweaking
const DOMAINS = {
    usv: {
        color: '#00F0FF', // Cyan
        count: 3000,
        speed: 1,
        size: 0.03,
        fog: '#001824'
    },
    uav: {
        color: '#3b82f6', // Sky Blue
        count: 2000,
        speed: 2, // Fast
        size: 0.02,
        fog: '#0f172a'
    },
    rov: {
        color: '#EAB308', // Gold/Yellow lights
        count: 4000, // Dense marine snow
        speed: 0.2, // Slow
        size: 0.04,
        fog: '#050A14'
    }
}

interface ParticleSystemProps {
    domain: 'usv' | 'uav' | 'rov';
}

function ParticleSystem({ domain }: ParticleSystemProps) {
    const ref = useRef<THREE.Points>(null)
    const { mouse, viewport } = useThree()

    // Motion values for smooth transitions
    const speedRef = useRef(DOMAINS[domain].speed)
    const colorRef = useRef(new THREE.Color(DOMAINS[domain].color))

    useEffect(() => {
        // animate speed transition (conceptual, manual lerp in loop is often smoother for threejs)
        speedRef.current = DOMAINS[domain].speed
        // animate color
        const target = new THREE.Color(DOMAINS[domain].color)
        // We'll lerp in the frame loop
    }, [domain])

    const config = DOMAINS[domain]

    const positions = useMemo(() => {
        const pos = new Float32Array(5000 * 3) // Max buffer
        for (let i = 0; i < 5000; i++) {
            // Create a large volume
            pos[i * 3] = (Math.random() - 0.5) * 30
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return pos
    }, []) // Generate once, we just render subset or all

    useFrame((state, delta) => {
        if (!ref.current) return
        const time = state.clock.getElapsedTime()

        // Lerp color
        const material = ref.current.material as THREE.PointsMaterial
        if (material.color) { // Basic check
            const targetColor = new THREE.Color(DOMAINS[domain].color)
            material.color.lerp(targetColor, delta * 2)
        }

        // Domain specific movement logic
        if (domain === 'uav') {
            // Fast horizontal wind effect
            ref.current.rotation.x = 0
            ref.current.rotation.y += delta * 0.2
            ref.current.rotation.z = Math.sin(time * 0.5) * 0.1
            // Simulate forward flight by moving camera or particles?
            // Simple rotation is enough for background
        } else if (domain === 'usv') {
            // Rolling waves
            ref.current.rotation.x = Math.sin(time / 5) * 0.1 + (mouse.y * viewport.height) / 500
            ref.current.rotation.y = Math.cos(time / 8) * 0.1 + (mouse.x * viewport.width) / 500
        } else if (domain === 'rov') {
            // Slow vertical drift (pressure)
            ref.current.rotation.x = Math.sin(time / 10) * 0.05
            ref.current.rotation.y += delta * 0.02
        }
    })

    // Re-creating PointMaterial when domain changes might cause flicker, 
    // keeping it steady and animating props is better but strict declarative react-three-fiber 
    // sometimes encourages swapping. We'll stick to a persistent material for smooth transition usually,
    // but "size" changing requires material rebuild or shader.
    // We'll let React handle it for simplicity in this iteration.

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={positions}
                stride={3}
                frustumCulled={false}
            >
                <PointMaterial
                    transparent
                    color={config.color}
                    size={config.size}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    )
}

function GridPlane({ domain }: { domain: 'usv' | 'uav' | 'rov' }) {
    const ref = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (!ref.current) return
        const mat = ref.current.material as THREE.MeshBasicMaterial
        // Fade grid out for UAV (sky shouldn't have a floor grid usually, or maybe a ceiling)
        // Fade in for USV/ROV
        const targetOpacity = domain === 'uav' ? 0.02 : 0.1
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 2)

        // Color transition
        const targetColor = new THREE.Color(DOMAINS[domain].color)
        mat.color.lerp(targetColor, delta * 2)
    })

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[100, 100, 50, 50]} />
            <meshBasicMaterial
                color="#001824"
                wireframe
                transparent
                opacity={0.1}
            />
        </mesh>
    )
}

interface WebGLBackgroundProps {
    className?: string
    activePlatform: number
}

const PLATFORM_MAP = ['usv', 'uav', 'rov'] as const

export default function WebGLBackground({ className, activePlatform }: WebGLBackgroundProps) {
    const domain = PLATFORM_MAP[activePlatform] || 'usv'

    return (
        <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={[DOMAINS[domain].fog, 5, 20]} />
                <ParticleSystem domain={domain} />
                <GridPlane domain={domain} />
            </Canvas>
        </div>
    )
}
