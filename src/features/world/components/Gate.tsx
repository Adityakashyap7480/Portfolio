import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { GateConfig } from '../data/gates'

export function Gate({
  config,
  highlighted,
}: {
  config: GateConfig
  highlighted: boolean
}) {
  const glowRef = useRef<THREE.Mesh>(null)
  const particles = useMemo(() => {
    const pts = new Float32Array(36)
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      pts[i * 3] = Math.cos(a) * 1.6
      pts[i * 3 + 1] = 1.2 + Math.sin(a * 2) * 0.4
      pts[i * 3 + 2] = Math.sin(a) * 0.2
    }
    return pts
  }, [])

  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const s = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.04
    glowRef.current.scale.set(1, s, 1)
    const mat = glowRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = highlighted ? 0.55 : 0.28
  })

  return (
    <group position={config.position} rotation={[0, config.rotationY, 0]}>
      <mesh position={[-2.2, 2.2, 0]} castShadow>
        <boxGeometry args={[0.45, 4.4, 0.45]} />
        <meshStandardMaterial color="#1c1917" roughness={0.7} />
      </mesh>
      <mesh position={[2.2, 2.2, 0]} castShadow>
        <boxGeometry args={[0.45, 4.4, 0.45]} />
        <meshStandardMaterial color="#1c1917" roughness={0.7} />
      </mesh>
      <mesh position={[0, 4.4, 0]} castShadow>
        <boxGeometry args={[4.9, 0.4, 0.5]} />
        <meshStandardMaterial color="#292524" roughness={0.65} />
      </mesh>

      <mesh ref={glowRef} position={[0, 2.1, 0.05]}>
        <planeGeometry args={[3.6, 3.8]} />
        <meshBasicMaterial
          color={config.glow}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 2.1, 0]}>
        <ringGeometry args={[1.7, 1.95, 48]} />
        <meshBasicMaterial color={config.color} transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>

      <points position={[0, 2.1, 0.2]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color={config.glow} size={0.12} transparent opacity={0.9} />
      </points>

      <Text
        position={[0, 5.1, 0]}
        fontSize={0.55}
        color={config.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {config.label}
      </Text>

      {[-6, -4, -2].map((z) => (
        <mesh key={z} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.55, 10]} />
          <meshStandardMaterial color="#57534e" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

export function WelcomeArch() {
  return (
    <group position={[0, 0, -2]}>
      <mesh position={[-3.2, 2.4, 0]}>
        <boxGeometry args={[0.5, 4.8, 0.5]} />
        <meshStandardMaterial color="#292524" />
      </mesh>
      <mesh position={[3.2, 2.4, 0]}>
        <boxGeometry args={[0.5, 4.8, 0.5]} />
        <meshStandardMaterial color="#292524" />
      </mesh>
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[7, 0.45, 0.55]} />
        <meshStandardMaterial color="#1c1917" />
      </mesh>
      <Text
        position={[0, 5.6, 0]}
        fontSize={0.42}
        color="#c8f542"
        anchorX="center"
        outlineWidth={0.015}
        outlineColor="#000"
      >
        WELCOME TO MY PORTFOLIO
      </Text>
    </group>
  )
}
