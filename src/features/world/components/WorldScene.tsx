import { Cloud, Sky, Sparkles } from '@react-three/drei'
import { memo, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { useExperience } from '../context/ExperienceContext'
import { GATES, type SectionId } from '../data/gates'
import { CameraRig, LookControls } from './CameraRig'
import { Character } from './Character'
import { Gate, WelcomeArch } from './Gate'
import { HelperNPC } from './HelperNPC'
import { SkillOrbs } from './SkillOrbs'

const PLAZA_RADIUS = 6.8
const PATH_WIDTH = 3
const FOLIAGE = ['#1f6b3a', '#27774a', '#2f8a4f', '#1d5e36', '#3a8f4a']

/** Deterministic pseudo-random so the layout is stable between renders */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const GATE_ANGLES = GATES.map((g) => Math.atan2(g.position[2], g.position[0]))

function nearGateLane(angle: number, width: number) {
  return GATE_ANGLES.some((ga) => {
    const d = Math.atan2(Math.sin(angle - ga), Math.cos(angle - ga))
    return Math.abs(d) < width
  })
}

const Ground = memo(function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[48, 72]} />
        <meshStandardMaterial color="#3d7a47" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <circleGeometry args={[28, 72]} />
        <meshStandardMaterial color="#4a8c52" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]} receiveShadow>
        <ringGeometry args={[10, 17, 72]} />
        <meshStandardMaterial color="#529659" roughness={1} />
      </mesh>
    </>
  )
})

const Plaza = memo(function Plaza() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[PLAZA_RADIUS + 0.35, 64]} />
        <meshStandardMaterial color="#5f5a50" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
        <circleGeometry args={[PLAZA_RADIUS, 64]} />
        <meshStandardMaterial color="#8d8677" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
        <ringGeometry args={[PLAZA_RADIUS - 0.55, PLAZA_RADIUS - 0.42, 96]} />
        <meshBasicMaterial color="#c8f542" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
        <ringGeometry args={[1.25, 1.4, 64]} />
        <meshBasicMaterial color="#c8f542" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.034, 0]}>
        <circleGeometry args={[1.25, 48]} />
        <meshStandardMaterial color="#6f695d" roughness={0.8} />
      </mesh>
      {GATES.map((gate) => {
        const angle = Math.atan2(gate.position[0], gate.position[2])
        return (
          <group key={gate.id} rotation={[0, angle, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, Math.PI]} position={[0, 0.04, 2.2]}>
              <circleGeometry args={[0.32, 3]} />
              <meshBasicMaterial color={gate.color} toneMapped={false} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
})

type InstanceSpec = {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
}

/** One draw call for many copies of the same mesh */
function InstancedSet({
  items,
  castShadow = false,
  receiveShadow = false,
  children,
}: {
  items: InstanceSpec[]
  castShadow?: boolean
  receiveShadow?: boolean
  children: ReactNode
}) {
  const ref = useRef<THREE.InstancedMesh>(null)

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()
    items.forEach((item, i) => {
      dummy.position.set(...item.position)
      dummy.rotation.set(...(item.rotation ?? [0, 0, 0]))
      dummy.scale.setScalar(item.scale ?? 1)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      if (item.color) mesh.setColorAt(i, color.set(item.color))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [items])

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, items.length]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      {children}
    </instancedMesh>
  )
}

const PATH_SEGMENTS = GATES.map((gate) => {
  const dist = Math.hypot(gate.position[0], gate.position[2])
  const start = PLAZA_RADIUS - 0.2
  const end = dist - 1.3
  return { gate, start, len: end - start, angle: Math.atan2(gate.position[0], gate.position[2]) }
})

const Paths = memo(function Paths() {
  const { posts, bulbs } = useMemo(() => {
    const posts: InstanceSpec[] = []
    const bulbs: InstanceSpec[] = []
    for (const { gate, start, len, angle } of PATH_SEGMENTS) {
      const sin = Math.sin(angle)
      const cos = Math.cos(angle)
      for (let z = start + 1.2; z < start + len - 0.4; z += 2.6) {
        for (const side of [-1, 1]) {
          const x = side * (PATH_WIDTH / 2 + 0.35)
          const wx = x * cos + z * sin
          const wz = -x * sin + z * cos
          posts.push({ position: [wx, 0.12, wz] })
          bulbs.push({ position: [wx, 0.27, wz], color: gate.color })
        }
      }
    }
    return { posts, bulbs }
  }, [])

  return (
    <group>
      {PATH_SEGMENTS.map(({ gate, start, len, angle }) => (
        <group key={gate.id} rotation={[0, angle, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, start + len / 2]} receiveShadow>
            <planeGeometry args={[PATH_WIDTH + 0.4, len]} />
            <meshStandardMaterial color="#5f5a50" roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, start + len / 2]} receiveShadow>
            <planeGeometry args={[PATH_WIDTH, len]} />
            <meshStandardMaterial color="#8d8677" roughness={0.85} />
          </mesh>
        </group>
      ))}
      <InstancedSet items={posts}>
        <cylinderGeometry args={[0.07, 0.09, 0.24, 8]} />
        <meshStandardMaterial color="#1b1f24" metalness={0.5} roughness={0.4} />
      </InstancedSet>
      <InstancedSet items={bulbs}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </InstancedSet>
    </group>
  )
})

const Nature = memo(function Nature() {
  const { trunks, pineLow, pineHigh, canopies, bushes, rocks } = useMemo(() => {
    const trees: { pos: [number, number, number]; scale: number; kind: 'pine' | 'round'; color: string; rot: number }[] = []
    for (let i = 0; i < 70; i++) {
      const a = rand(i) * Math.PI * 2
      const r = 19 + rand(i + 100) * 20
      if (r < 31 && nearGateLane(a, 0.22)) continue
      trees.push({
        pos: [Math.cos(a) * r, 0, Math.sin(a) * r],
        scale: 0.8 + rand(i + 200) * 0.7,
        kind: rand(i + 300) > 0.3 ? 'pine' : 'round',
        color: FOLIAGE[Math.floor(rand(i + 400) * FOLIAGE.length)],
        rot: rand(i + 500) * Math.PI,
      })
    }

    const bushes: { pos: [number, number, number]; scale: number; color: string }[] = []
    for (let i = 0; i < 30; i++) {
      const a = rand(i + 600) * Math.PI * 2
      const r = 9 + rand(i + 700) * 9
      if (nearGateLane(a, 0.3)) continue
      bushes.push({
        pos: [Math.cos(a) * r, 0.3, Math.sin(a) * r],
        scale: 0.45 + rand(i + 800) * 0.45,
        color: FOLIAGE[Math.floor(rand(i + 900) * FOLIAGE.length)],
      })
    }

    const rocks: { pos: [number, number, number]; scale: number; rot: number }[] = []
    for (let i = 0; i < 16; i++) {
      const a = rand(i + 1000) * Math.PI * 2
      const r = 11 + rand(i + 1100) * 18
      if (nearGateLane(a, 0.25)) continue
      rocks.push({
        pos: [Math.cos(a) * r, 0.15, Math.sin(a) * r],
        scale: 0.3 + rand(i + 1200) * 0.5,
        rot: rand(i + 1300) * Math.PI,
      })
    }
    /** Places a part of the tree at a local height, scaled with the tree */
    const part = (t: (typeof trees)[number], y: number, color?: string): InstanceSpec => ({
      position: [t.pos[0], y * t.scale, t.pos[2]],
      rotation: [0, t.rot, 0],
      scale: t.scale,
      color,
    })
    const pines = trees.filter((t) => t.kind === 'pine')
    const rounds = trees.filter((t) => t.kind === 'round')

    return {
      trunks: trees.map((t) => part(t, 0.7)),
      pineLow: pines.map((t) => part(t, 1.8, t.color)),
      pineHigh: pines.map((t) => part(t, 2.75, t.color)),
      canopies: rounds.map((t) => part(t, 2.1, t.color)),
      bushes: bushes.map((b) => ({ position: b.pos, scale: b.scale, color: b.color })),
      rocks: rocks.map((r) => ({ position: r.pos, scale: r.scale, rotation: [r.rot, r.rot, 0] as [number, number, number] })),
    }
  }, [])

  return (
    <group>
      <InstancedSet items={trunks} castShadow>
        <cylinderGeometry args={[0.13, 0.22, 1.4, 6]} />
        <meshStandardMaterial color="#5b3a29" roughness={1} flatShading />
      </InstancedSet>
      <InstancedSet items={pineLow} castShadow>
        <coneGeometry args={[1.2, 1.9, 7]} />
        <meshStandardMaterial roughness={0.9} flatShading />
      </InstancedSet>
      <InstancedSet items={pineHigh} castShadow>
        <coneGeometry args={[0.85, 1.5, 7]} />
        <meshStandardMaterial roughness={0.9} flatShading />
      </InstancedSet>
      <InstancedSet items={canopies} castShadow>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial roughness={0.9} flatShading />
      </InstancedSet>
      <InstancedSet items={bushes}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial roughness={0.95} flatShading />
      </InstancedSet>
      <InstancedSet items={rocks} receiveShadow>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#7c7a74" roughness={0.95} flatShading />
      </InstancedSet>
    </group>
  )
})

export function WorldScene() {
  const characterPos = useRef(new THREE.Vector3(0, 0, 6))
  const [nearGate, setNearGate] = useState<SectionId | null>(null)
  const { mode, activeSection } = useExperience()

  return (
    <>
      <color attach="background" args={['#e9c9a4']} />
      <fog attach="fog" args={['#e3c6a6', 32, 85]} />
      <Sky
        distance={450000}
        sunPosition={[-60, 9, -100]}
        turbidity={7}
        rayleigh={2}
        mieCoefficient={0.006}
        mieDirectionalG={0.88}
      />
      <ambientLight intensity={0.4} color="#ffe8d6" />
      <directionalLight
        castShadow
        position={[-24, 26, -32]}
        color="#ffd6a5"
        intensity={2.1}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-far={90}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <directionalLight position={[20, 14, 30]} color="#c7dcff" intensity={0.7} />
      <hemisphereLight args={['#ffd9b8', '#2d5a3a', 0.55]} />

      <Ground />
      <Plaza />
      <Paths />
      <Nature />
      <Sparkles
        count={70}
        scale={[46, 5, 46]}
        position={[0, 2.6, 0]}
        size={3.2}
        speed={0.35}
        opacity={0.8}
        color="#eaffb0"
      />
      <WelcomeArch />
      <SkillOrbs />

      {GATES.map((gate) => (
        <Gate
          key={gate.id}
          config={gate}
          highlighted={nearGate === gate.id || (mode === 'inside' && activeSection === gate.id)}
        />
      ))}

      <Cloud position={[-20, 14, -10]} opacity={0.35} speed={0.2} color="#ffe4cc" />
      <Cloud position={[18, 16, 8]} opacity={0.3} speed={0.15} color="#ffe4cc" />

      <Character onNearGate={setNearGate} positionRef={characterPos} />
      <HelperNPC />
      <CameraRig characterPos={characterPos} />
      <LookControls />
    </>
  )
}
