'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// Water shader uniforms
const waterUniforms = {
    uTime: { value: 0.0 },
    uAlpha: { value: 0.73 },
    uFresnelStrength: { value: 1.0 },
    uWaveAmp: { value: 4.19 },
    uNoiseScale: { value: 0.11 },
    uColorDeep: { value: new THREE.Color('#0070ff') },
    uColorShallow: { value: new THREE.Color('#080040') },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uTextureInfluence: { value: 0.0 },
}

// Water vertex shader
const waterVertexShader = `
  uniform float uTime;
  uniform float uWaveAmp;
  uniform float uNoiseScale;
  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vNormal;
  
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  float noise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  mat3 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat3(
      oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s,
      oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s,
      oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c
    );
  }
  
  float fnoise(vec3 p) {
    mat3 rot = rotationMatrix(normalize(vec3(0.0, 0.0, 1.0)), 0.5 * uTime);
    mat3 rot2 = rotationMatrix(normalize(vec3(0.0, 0.0, 1.0)), 0.3 * uTime);
    float sum = 0.0;
    vec3 r = rot * p;
    float add = noise(r);
    float msc = add + 0.7;
    msc = clamp(msc, 0.0, 1.0);
    sum += 0.6 * add;
    p = p * 2.0;
    r = rot * p;
    add = noise(r);
    add *= msc;
    sum += 0.5 * add;
    msc *= add + 0.7;
    msc = clamp(msc, 0.0, 1.0);
    p.xy = p.xy * 2.0;
    p = rot2 * p;
    add = noise(p);
    add *= msc;
    sum += 0.25 * abs(add);
    msc *= add + 0.7;
    msc = clamp(msc, 0.0, 1.0);
    p = p * 2.0;
    add = noise(p);
    add *= msc;
    sum += 0.125 * abs(add);
    p = p * 2.0;
    add = noise(p);
    add *= msc;
    sum += 0.0625 * abs(add);
    return sum * 0.516129;
  }
  
  float getHeight(vec3 p) {
    return 0.3 - uWaveAmp * fnoise(vec3(uNoiseScale * (p.x + 0.0 * uTime), uNoiseScale * p.z, 0.4 * uTime));
  }
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y = getHeight(pos);
    vPos = pos;
    vec3 pdx = pos + vec3(0.01, 0.0, 0.0);
    vec3 pdz = pos + vec3(0.0, 0.0, 0.01);
    float hdx = getHeight(pdx);
    float hdz = getHeight(pdz);
    pdx.y = hdx;
    pdz.y = hdz;
    vNormal = normalize(cross(pos - pdz, pos - pdx));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Water fragment shader
const waterFragmentShader = `
  uniform float uTime;
  uniform float uAlpha;
  uniform float uFresnelStrength;
  uniform float uWaveAmp;
  uniform float uNoiseScale;
  uniform vec3 uColorDeep;
  uniform vec3 uColorShallow;
  uniform vec2 uResolution;
  uniform float uTextureInfluence;
  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vNormal;
  
  vec4 getSky(vec3 rd) {
    // Night sky colors
    if (rd.y > 0.3) return vec4(0.05, 0.1, 0.2, 1.0);
    if (rd.y < 0.0) return vec4(0.0, 0.05, 0.15, 1.0);
    // Moonlight reflection
    if (rd.z > 0.8 && rd.x > 0.2 && rd.y > 0.1) {
      return vec4(0.8, 0.9, 1.0, 1.0);
    }
    return vec4(0.1, 0.15, 0.25, 1.0);
  }
  
  vec4 shade(vec3 normal, vec3 pos, vec3 rd) {
    float fresnel = uFresnelStrength * pow(1.0 - clamp(dot(-rd, normal), 0.0, 1.0), 5.0) + (1.0 - uFresnelStrength);
    vec3 refVec = reflect(rd, normal);
    vec4 reflection = getSky(refVec);
    float deep = 1.0 + 0.5 * pos.y;
    vec4 col = fresnel * reflection;
    col += deep * 0.4 * vec4(uColorDeep, 1.0);
    col = mix(col, vec4(uColorShallow, 1.0), clamp(pos.y * 2.0 + 0.5, 0.0, 1.0));
    return clamp(col, 0.0, 1.0);
  }
  
  void main() {
    vec3 ro = cameraPosition;
    vec3 rd = normalize(vPos - ro);
    vec4 col = shade(vNormal, vPos, rd);
    gl_FragColor = vec4(col.rgb, uAlpha);
  }
`

// Water Surface Component
function WaterSurface() {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)

    const uniforms = useMemo(() => ({
        ...waterUniforms,
        uTime: { value: 0 },
        uColorDeep: { value: new THREE.Color('#0070ff') },
        uColorShallow: { value: new THREE.Color('#080040') },
    }), [])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
            <planeGeometry args={[20, 20, 128, 128]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={waterVertexShader}
                fragmentShader={waterFragmentShader}
                uniforms={uniforms}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

// Floating Particles Component
function FloatingParticles({ count = 2000 }) {
    const pointsRef = useRef<THREE.Points>(null)

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const vel = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            pos[i3] = (Math.random() - 0.5) * 20
            pos[i3 + 1] = Math.random() * 3
            pos[i3 + 2] = (Math.random() - 0.5) * 20

            vel[i3] = (Math.random() - 0.5) * 0.01
            vel[i3 + 1] = 0.01 + Math.random() * 0.02
            vel[i3 + 2] = (Math.random() - 0.5) * 0.01
        }

        return [pos, vel]
    }, [count])

    useFrame(() => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < count; i++) {
                const i3 = i * 3

                // Update positions
                positions[i3] += velocities[i3]
                positions[i3 + 1] += velocities[i3 + 1]
                positions[i3 + 2] += velocities[i3 + 2]

                // Reset if too high or out of bounds
                if (positions[i3 + 1] > 5 || Math.abs(positions[i3]) > 10 || Math.abs(positions[i3 + 2]) > 10) {
                    positions[i3] = (Math.random() - 0.5) * 20
                    positions[i3 + 1] = 0.5
                    positions[i3 + 2] = (Math.random() - 0.5) * 20
                }
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true
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
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#00F0FF"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Moon Component
function Moon() {
    return (
        <group position={[8, 8, -5]}>
            {/* Moon glow */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
            {/* Moon body */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#f5f5dc"
                    emissive="#f5f5dc"
                    emissiveIntensity={0.3}
                />
            </mesh>
        </group>
    )
}

// Scene Component
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.1} />
            <directionalLight position={[8, 8, -5]} intensity={0.5} color="#aaddff" />
            <pointLight position={[0, 3, 0]} intensity={0.5} color="#00F0FF" />

            {/* Moon */}
            <Moon />

            {/* Water */}
            <WaterSurface />

            {/* Particles */}
            <FloatingParticles count={2000} />

            {/* Post-processing */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                    intensity={0.8}
                    radius={0.8}
                />
            </EffectComposer>

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2.2}
                minPolarAngle={Math.PI / 4}
                autoRotate
                autoRotateSpeed={0.3}
            />
        </>
    )
}

// Main Export Component
export default function WaterBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 3, 8], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#050a14']} />
                <fog attach="fog" args={['#050a14', 5, 25]} />
                <Scene />
            </Canvas>
        </div>
    )
}
