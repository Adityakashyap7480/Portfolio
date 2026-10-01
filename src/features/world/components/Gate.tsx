import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { memo, useMemo, useRef } from 'react'
import * as THREE from 'three'
import fontBold from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff'
import fontSemi from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff'
import type { GateConfig } from '../data/gates'

const FRAME_COLOR = '#1b1f24'
const ARCH_HALF_SPAN = 3.9
/** Must stay narrower than the gap between the arch pillars (inner edges at ±3.65) */
const SIGN_WIDTH = 7
const SIGN_HEIGHT = 1.4
const SIGN_Y = 4.05

function GlowStrip({
  position,
  size,
  color,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  )
}

export const Gate = memo(function Gate({
  config,
  highlighted,
}: {
  config: GateConfig
  highlighted: boolean
}) {
  const portalRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Group>(null)
  const arcRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<THREE.Points>(null)
  const ringScale = useRef(new THREE.Vector3(1, 1, 1))

  const particles = useMemo(() => {
    const pts = new Float32Array(24 * 3)
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2
      const r = 1.95 + (i % 3) * 0.12
      pts[i * 3] = Math.cos(a) * r
      pts[i * 3 + 1] = Math.sin(a) * r
      pts[i * 3 + 2] = (i % 2) * 0.1
    }
    return pts
  }, [])

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    if (portalRef.current) {
      const mat = portalRef.current.material as THREE.MeshBasicMaterial
      const target = highlighted ? 0.42 : 0.2
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, target + Math.sin(t * 2.2) * 0.04, 0.1)
    }
    if (ringRef.current) {
      const s = highlighted ? 1.06 : 1
      ringRef.current.scale.lerp(ringScale.current.setScalar(s), 0.1)
    }
    if (arcRef.current) arcRef.current.rotation.z += delta * (highlighted ? 1.6 : 0.7)
    if (orbitRef.current) orbitRef.current.rotation.z -= delta * 0.35
  })

  return (
    <group position={config.position} rotation={[0, config.rotationY, 0]}>
      {/* Base step */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[6, 0.08, 2.2]} />
        <meshStandardMaterial color="#2a2e33" roughness={0.6} metalness={0.3} />
      </mesh>
      <GlowStrip position={[0, 0.085, 1.1]} size={[6, 0.03, 0.03]} color={config.color} />
      <GlowStrip position={[0, 0.085, -1.1]} size={[6, 0.03, 0.03]} color={config.color} />

      {/* Pillars */}
      {[-2.25, 2.25].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 2.4, 0]} castShadow>
            <boxGeometry args={[0.5, 4.4, 0.5]} />
            <meshStandardMaterial color={FRAME_COLOR} roughness={0.35} metalness={0.65} />
          </mesh>
          <GlowStrip position={[0, 2.4, 0.26]} size={[0.07, 4.1, 0.02]} color={config.color} />
          <GlowStrip position={[0, 2.4, -0.26]} size={[0.07, 4.1, 0.02]} color={config.color} />
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[0.7, 0.3, 0.7]} />
            <meshStandardMaterial color="#111418" roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Top beam */}
      <mesh position={[0, 4.75, 0]} castShadow>
        <boxGeometry args={[5.3, 0.42, 0.6]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.35} metalness={0.65} />
      </mesh>
      <GlowStrip position={[0, 4.62, 0.31]} size={[4.9, 0.05, 0.02]} color={config.color} />
      <GlowStrip position={[0, 4.62, -0.31]} size={[4.9, 0.05, 0.02]} color={config.color} />

      {/* Portal */}
      <mesh ref={portalRef} position={[0, 2.35, 0]}>
        <circleGeometry args={[1.8, 48]} />
        <meshBasicMaterial
          color={config.glow}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <group ref={ringRef} position={[0, 2.35, 0]}>
        <mesh>
          <torusGeometry args={[1.85, 0.07, 12, 64]} />
          <meshBasicMaterial color={config.color} toneMapped={false} />
        </mesh>
        <mesh ref={arcRef}>
          <torusGeometry args={[1.55, 0.035, 8, 64, Math.PI * 1.3]} />
          <meshBasicMaterial color={config.glow} transparent opacity={0.9} toneMapped={false} />
        </mesh>
        <points ref={orbitRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={config.glow}
            size={0.1}
            transparent
            opacity={0.9}
            depthWrite={false}
            toneMapped={false}
          />
        </points>
      </group>
      <Text
        position={[0, 5.55, 0]}
        font={fontBold}
        sdfGlyphSize={128}
        fontSize={0.62}
        letterSpacing={0.08}
        color={config.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.025}
        outlineColor="#0b0d10"
        material-toneMapped={false}
      >
        {config.label}
      </Text>
    </group>
  )
})

export const WelcomeArch = memo(function WelcomeArch() {
  const accent = '#c8f542'
  return (
    <group position={[0, 0, -2]}>
      {[-ARCH_HALF_SPAN, ARCH_HALF_SPAN].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 2.5, 0]} castShadow>
            <boxGeometry args={[0.5, 5, 0.5]} />
            <meshStandardMaterial color={FRAME_COLOR} roughness={0.35} metalness={0.65} />
          </mesh>
          <GlowStrip position={[0, 2.5, 0.26]} size={[0.07, 4.7, 0.02]} color={accent} />
          <GlowStrip position={[0, 2.5, -0.26]} size={[0.07, 4.7, 0.02]} color={accent} />
        </group>
      ))}
      <mesh position={[0, 5.05, 0]} castShadow>
        <boxGeometry args={[ARCH_HALF_SPAN * 2 + 0.6, 0.45, 0.6]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.35} metalness={0.65} />
      </mesh>

      {/* Hanging sign */}
      {[-2.9, 2.9].map((x) => (
        <mesh key={x} position={[x, 4.79, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.35} metalness={0.65} />
        </mesh>
      ))}
      <mesh position={[0, SIGN_Y, 0]}>
        <boxGeometry args={[SIGN_WIDTH, SIGN_HEIGHT, 0.12]} />
        <meshStandardMaterial color="#0b0e11" roughness={0.6} metalness={0.3} />
      </mesh>
      {[1, -1].map((side) => (
        <group key={side} position={[0, SIGN_Y, side * 0.07]}>
          {[-SIGN_WIDTH / 2, SIGN_WIDTH / 2].map((x) => (
            <GlowStrip key={x} position={[x, 0, 0]} size={[0.04, SIGN_HEIGHT, 0.02]} color={accent} />
          ))}
          <GlowStrip position={[0, SIGN_HEIGHT / 2, 0]} size={[SIGN_WIDTH, 0.04, 0.02]} color={accent} />
          <GlowStrip position={[0, -SIGN_HEIGHT / 2, 0]} size={[SIGN_WIDTH, 0.04, 0.02]} color={accent} />
        </group>
      ))}
      {[0, Math.PI].map((rot) => (
        <group key={rot} position={[0, SIGN_Y, 0]} rotation={[0, rot, 0]}>
          <Text
            position={[0, 0.2, 0.08]}
            font={fontBold}
            sdfGlyphSize={128}
            fontSize={0.36}
            letterSpacing={0.03}
            color={accent}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.012}
            outlineBlur={0.06}
            outlineColor={accent}
            outlineOpacity={0.45}
            material-toneMapped={false}
          >
            WELCOME TO MY PORTFOLIO
          </Text>
          <GlowStrip position={[0, -0.08, 0.075]} size={[1.4, 0.02, 0.01]} color={accent} />
          <Text
            position={[0, -0.33, 0.08]}
            font={fontSemi}
            sdfGlyphSize={128}
            fontSize={0.18}
            letterSpacing={0.16}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            material-toneMapped={false}
          >
            ADITYA KASHYAP · FULL STACK DEVELOPER
          </Text>
        </group>
      ))}
    </group>
  )
})
