'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instance, Instances, Text, Line } from '@react-three/drei'
import * as THREE from 'three'

// Grid Configuration
const GRID_SIZE = 20
const NODE_SIZE = 0.8
const SPACING = 1.2

// Colors
const COLOR_EMPTY = new THREE.Color('#1F2937')
const COLOR_OBSTACLE = new THREE.Color('#EF4444')
const COLOR_PATH = new THREE.Color('#00F0FF')
const COLOR_VISITED = new THREE.Color('#3B82F6')
const COLOR_START = new THREE.Color('#10B981')
const COLOR_TARGET = new THREE.Color('#F59E0B')

export default function SearchVisualizer() {
    const [nodes, setNodes] = useState<any[]>([])
    const [path, setPath] = useState<THREE.Vector3[]>([])
    const [visited, setVisited] = useState<number[]>([])

    // Initialize Grid
    useEffect(() => {
        const newNodes = []
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let z = 0; z < GRID_SIZE; z++) {
                const isObstacle = Math.random() > 0.8
                newNodes.push({
                    id: x * GRID_SIZE + z,
                    x: (x - GRID_SIZE / 2) * SPACING,
                    z: (z - GRID_SIZE / 2) * SPACING,
                    isObstacle,
                    status: 'empty'
                })
            }
        }
        setNodes(newNodes)
        simulateSearch(newNodes)
    }, [])

    const simulateSearch = async (gridNodes: any[]) => {
        // Simple BFS Simulation for visual effect
        const startIdx = 0
        const targetIdx = gridNodes.length - 1
        const queue = [startIdx]
        const cameFrom: Record<number, number> = {}
        const visitedSet = new Set([startIdx])
        const visitedOrder: number[] = []

        let found = false

        while (queue.length > 0) {
            const current = queue.shift()!
            visitedOrder.push(current)

            if (current === targetIdx) {
                found = true
                break
            }

            // Neighbors (Up, Down, Left, Right)
            const neighbors = []
            const x = Math.floor(current / GRID_SIZE)
            const z = current % GRID_SIZE

            if (x > 0) neighbors.push((x - 1) * GRID_SIZE + z)
            if (x < GRID_SIZE - 1) neighbors.push((x + 1) * GRID_SIZE + z)
            if (z > 0) neighbors.push(x * GRID_SIZE + (z - 1))
            if (z < GRID_SIZE - 1) neighbors.push(x * GRID_SIZE + (z + 1))

            for (const neighbor of neighbors) {
                if (!visitedSet.has(neighbor) && !gridNodes[neighbor].isObstacle) {
                    visitedSet.add(neighbor)
                    cameFrom[neighbor] = current
                    queue.push(neighbor)
                }
            }
        }

        // Animate Visited
        for (let i = 0; i < visitedOrder.length; i++) {
            setVisited(prev => [...prev, visitedOrder[i]])
            await new Promise(r => setTimeout(r, 10)) // Speed of search
        }

        // Reconstruct Path
        if (found) {
            let curr = targetIdx
            const pathPoints = []
            while (curr !== startIdx) {
                const node = gridNodes[curr]
                pathPoints.push(new THREE.Vector3(node.x, 0.5, node.z))
                curr = cameFrom[curr]
            }
            pathPoints.push(new THREE.Vector3(gridNodes[startIdx].x, 0.5, gridNodes[startIdx].z))
            setPath(pathPoints.reverse())
        }
    }

    return (
        <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
            <Instances range={nodes.length}>
                <boxGeometry args={[NODE_SIZE, 0.2, NODE_SIZE]} />
                <meshStandardMaterial />
                {nodes.map((node, i) => (
                    <NodeInstance
                        key={i}
                        data={node}
                        isVisited={visited.includes(i)}
                        isPath={false} // Path handled by Line
                    />
                ))}
            </Instances>

            {path.length > 0 && (
                <Line
                    points={path}
                    color="#00F0FF"
                    lineWidth={3}
                    dashed={false}
                />
            )}

            {/* Floating Label */}
            <Text
                position={[0, 5, 0]}
                fontSize={1}
                color="#00F0FF"
                anchorX="center"
                anchorY="middle"
            >
                DEEP SEARCH PLANNING
            </Text>
        </group>
    )
}

function NodeInstance({ data, isVisited, isPath }: { data: any, isVisited: boolean, isPath: boolean }) {
    const ref = useRef<any>(null)

    useFrame((state) => {
        if (ref.current) {
            // Pulse effect for visited nodes
            if (isVisited && !data.isObstacle) {
                ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, 2, 0.1)
            }
        }
    })

    const color = useMemo(() => {
        if (data.isObstacle) return COLOR_OBSTACLE
        if (isPath) return COLOR_PATH
        if (isVisited) return COLOR_VISITED
        return COLOR_EMPTY
    }, [data.isObstacle, isVisited, isPath])

    return (
        <Instance
            ref={ref}
            position={[data.x, 0, data.z]}
            color={color}
        />
    )
}
