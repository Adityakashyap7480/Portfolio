import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useExperience } from '../context/ExperienceContext'
import { GATES } from '../data/gates'

const HELPER_SPEED = 11

/** Second character — accent hoodie guide NPC */
export function HelperNPC() {
  const group = useRef<THREE.Group>(null)
  const visualBody = useRef<THREE.Group>(null)
  const leftLeg = useRef<THREE.Mesh>(null)
  const rightLeg = useRef<THREE.Mesh>(null)
  const leftArm = useRef<THREE.Mesh>(null)
  const rightArm = useRef<THREE.Mesh>(null)
  const runPhase = useRef(0)
  const spawned = useRef(false)
  const arrivedOnce = useRef(false)

  const {
    guidePhase,
    guideTarget,
    characterPose,
    onHelperReachedPlayer,
    onHelperReachedGate,
    cancelGuide,
  } = useExperience()

  useEffect(() => {
    if (guidePhase === 'idle') {
      spawned.current = false
      arrivedOnce.current = false
    }
    if (guidePhase === 'summoning' || guidePhase === 'leading') {
      arrivedOnce.current = false
    }
  }, [guidePhase])

  // Cancel guide if player presses WASD while being led/summoned
  useEffect(() => {
    if (guidePhase !== 'leading' && guidePhase !== 'summoning') return

    const onKey = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        cancelGuide()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [guidePhase, cancelGuide])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 0.05)
    const pose = characterPose.current

    if (guidePhase === 'idle') {
      g.visible = false
      helperPose.active = false
      return
    }

    g.visible = true

    if (!spawned.current) {
      const ang = pose.facing + Math.PI * 0.75
      g.position.set(pose.x + Math.sin(ang) * 14, 0, pose.z + Math.cos(ang) * 14)
      spawned.current = true
    }

    let targetX = pose.x
    let targetZ = pose.z
    let arriveDist = 2.4
    let onArrive: (() => void) | null = null

    if (guidePhase === 'summoning') {
      targetX = pose.x + Math.sin(pose.facing + 0.6) * 2.2
      targetZ = pose.z + Math.cos(pose.facing + 0.6) * 2.2
      arriveDist = 1.8
      onArrive = onHelperReachedPlayer
    } else if (guidePhase === 'asking') {
      targetX = pose.x + Math.sin(pose.facing + 0.9) * 2
      targetZ = pose.z + Math.cos(pose.facing + 0.9) * 2
      arriveDist = 0.35
    } else if (guidePhase === 'leading' && guideTarget) {
      const gate = GATES.find((x) => x.id === guideTarget)
      if (gate) {
        targetX = gate.position[0] - gate.forward[0] * 3.2
        targetZ = gate.position[2] - gate.forward[1] * 3.2
        arriveDist = 1.6
        onArrive = onHelperReachedGate
      }
    }

    g.position.y = 0
    helperPose.x = g.position.x
    helperPose.z = g.position.z
    helperPose.active = guidePhase === 'leading' || guidePhase === 'summoning' || guidePhase === 'asking'

    const dx = targetX - g.position.x
    const dz = targetZ - g.position.z
    const dist = Math.hypot(dx, dz)
    let moving = false

    if (dist > arriveDist) {
      moving = true
      arrivedOnce.current = false
      const nx = dx / dist
      const nz = dz / dist
      g.position.x += nx * HELPER_SPEED * dt
      g.position.z += nz * HELPER_SPEED * dt
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, Math.atan2(nx, nz), 0.2)
      helperPose.x = g.position.x
      helperPose.z = g.position.z
    } else if (onArrive && !arrivedOnce.current) {
      arrivedOnce.current = true
      onArrive()
    } else if (!onArrive) {
      g.rotation.y = THREE.MathUtils.lerp(
        g.rotation.y,
        Math.atan2(pose.x - g.position.x, pose.z - g.position.z),
        0.1,
      )
    }

    // Run animation
    const body = visualBody.current
    if (moving) {
      runPhase.current += dt * 14
      const swing = Math.sin(runPhase.current) * 1.0
      if (leftLeg.current) leftLeg.current.rotation.x = swing
      if (rightLeg.current) rightLeg.current.rotation.x = -swing
      if (leftArm.current) leftArm.current.rotation.x = -swing * 1.1
      if (rightArm.current) rightArm.current.rotation.x = swing * 1.1
      if (body) body.position.y = Math.abs(Math.sin(runPhase.current * 2)) * 0.08
    } else {
      if (leftLeg.current) leftLeg.current.rotation.x *= 0.8
      if (rightLeg.current) rightLeg.current.rotation.x *= 0.8
      if (leftArm.current) leftArm.current.rotation.x *= 0.8
      if (rightArm.current) rightArm.current.rotation.x *= 0.8
      if (body) body.position.y = THREE.MathUtils.lerp(body.position.y, 0, 0.2)
    }
  })

  // While leading, gently pull player to follow behind helper (done in Character)

  return (
    <group ref={group} visible={false}>
      <group ref={visualBody}>
        <mesh ref={leftLeg} position={[-0.22, 0.45, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.45, 4, 8]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
        <mesh ref={rightLeg} position={[0.22, 0.45, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.45, 4, 8]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
        <mesh position={[-0.22, 0.08, 0.08]} castShadow>
          <boxGeometry args={[0.28, 0.14, 0.4]} />
          <meshStandardMaterial color="#ecfdf5" />
        </mesh>
        <mesh position={[0.22, 0.08, 0.08]} castShadow>
          <boxGeometry args={[0.28, 0.14, 0.4]} />
          <meshStandardMaterial color="#ecfdf5" />
        </mesh>
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[0.85, 0.95, 0.5]} />
          <meshStandardMaterial color="#115e59" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.2, 0.26]}>
          <planeGeometry args={[0.32, 0.2]} />
          <meshBasicMaterial color="#c8f542" />
        </mesh>
        <mesh position={[0, 1.65, -0.05]} castShadow>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color="#134e4a" />
        </mesh>
        <mesh position={[0, 1.72, 0.05]} castShadow>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#d4a574" />
        </mesh>
        <mesh position={[0, 1.9, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh ref={leftArm} position={[-0.55, 1.2, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 4, 8]} />
          <meshStandardMaterial color="#115e59" />
        </mesh>
        <mesh ref={rightArm} position={[0.55, 1.2, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 4, 8]} />
          <meshStandardMaterial color="#115e59" />
        </mesh>
        <Text
          position={[0, 2.45, 0]}
          fontSize={0.28}
          color="#c8f542"
          anchorX="center"
          outlineWidth={0.015}
          outlineColor="#000"
        >
          GUIDE
        </Text>
      </group>
    </group>
  )
}

/** Expose helper world position for player follow */
export const helperPose = { x: 0, z: 0, active: false }
