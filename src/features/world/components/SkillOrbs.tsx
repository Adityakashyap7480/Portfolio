import { Float, useTexture } from '@react-three/drei'
import { useLayoutEffect, useMemo } from 'react'
import * as THREE from 'three'
import {
  brandIconDataUrl,
  getBrandIcon,
  WORLD_SKILL_ORBS,
} from '../data/skillBrands'

const ORB_SIZE = 1.15

function SkillBrandOrb({
  label,
  position,
}: {
  label: string
  position: [number, number, number]
}) {
  const brand = getBrandIcon(label)
  const url = useMemo(
    () => (brand ? brandIconDataUrl(brand, 256) : ''),
    [brand],
  )
  const texture = useTexture(url)

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.needsUpdate = true
  }, [texture])

  if (!brand) return null

  return (
    <Float speed={1.4} floatIntensity={1.1} rotationIntensity={0.15}>
      <group position={position}>
        <mesh>
          <planeGeometry args={[ORB_SIZE, ORB_SIZE]} />
          <meshBasicMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  )
}

export function SkillOrbs() {
  return (
    <group position={[22, 0, 0]}>
      {WORLD_SKILL_ORBS.map((label, i) => {
        const a = (i / WORLD_SKILL_ORBS.length) * Math.PI * 2
        return (
          <SkillBrandOrb
            key={label}
            label={label}
            position={[Math.cos(a) * 5.5, 1.8 + (i % 3) * 0.35, Math.sin(a) * 5.5]}
          />
        )
      })}
    </group>
  )
}
