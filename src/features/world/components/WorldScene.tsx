import { Cloud, Sky } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useExperience } from '../context/ExperienceContext'
import { GATES, type SectionId } from '../data/gates'
import { CameraRig, LookControls } from './CameraRig'
import { Character } from './Character'
import { Gate, WelcomeArch } from './Gate'
import { HelperNPC } from './HelperNPC'
import { SkillOrbs } from './SkillOrbs'

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[48, 64]} />
        <meshStandardMaterial color="#3f7d4e" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[10, 16, 64]} />
        <meshStandardMaterial color="#4b8f5a" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 2]} receiveShadow>
        <planeGeometry args={[3.2, 14]} />
        <meshStandardMaterial color="#6b7280" roughness={0.95} />
      </mesh>
    </>
  )
}

function Trees() {
  const trees = useMemo(() => {
    const list: [number, number, number][] = []
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2 + (i % 3) * 0.2
      const r = 20 + (i % 5) * 3.5
      list.push([Math.cos(a) * r, 0, Math.sin(a) * r])
    }
    return list
  }, [])

  return (
    <group>
      {trees.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.22, 1.4, 6]} />
            <meshStandardMaterial color="#5b3a29" />
          </mesh>
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[1.1, 2.2, 7]} />
            <meshStandardMaterial color="#166534" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function WorldScene() {
  const characterPos = useRef(new THREE.Vector3(0, 0, 6))
  const [nearGate, setNearGate] = useState<SectionId | null>(null)
  const { mode, activeSection } = useExperience()

  return (
    <>
      <color attach="background" args={['#87b5d9']} />
      <fog attach="fog" args={['#9ec5e8', 30, 72]} />
      <Sky sunPosition={[40, 20, 30]} turbidity={6} rayleigh={1.2} />
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        position={[20, 30, 10]}
        intensity={1.35}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={80}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <hemisphereLight args={['#dbeafe', '#3f7d4e', 0.35]} />

      <Ground />
      <Trees />
      <WelcomeArch />
      <SkillOrbs />

      {GATES.map((gate) => (
        <Gate
          key={gate.id}
          config={gate}
          highlighted={nearGate === gate.id || (mode === 'inside' && activeSection === gate.id)}
        />
      ))}

      <Cloud position={[-20, 14, -10]} opacity={0.35} speed={0.2} />
      <Cloud position={[18, 16, 8]} opacity={0.3} speed={0.15} />

      <Character onNearGate={setNearGate} positionRef={characterPos} />
      <HelperNPC />
      <CameraRig characterPos={characterPos} />
      <LookControls />
    </>
  )
}
