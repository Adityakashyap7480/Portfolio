import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { useExperience } from '../context/ExperienceContext'
import { GATES, SPAWN, WORLD_BOUNDS, type SectionId } from '../data/gates'
import { helperPose } from './HelperNPC'

const RUN_SPEED = 13.5
const ENTER_DIST = 2.4
const EXIT_DIST = 2.7

type CharacterProps = {
  onNearGate: (id: SectionId | null) => void
  positionRef: MutableRefObject<THREE.Vector3>
}

export function Character({ onNearGate, positionRef }: CharacterProps) {
  const group = useRef<THREE.Group>(null)
  const visualBody = useRef<THREE.Group>(null)
  const torso = useRef<THREE.Group>(null)
  const leftLeg = useRef<THREE.Mesh>(null)
  const rightLeg = useRef<THREE.Mesh>(null)
  const leftArm = useRef<THREE.Mesh>(null)
  const rightArm = useRef<THREE.Mesh>(null)
  const keys = useRef<Record<string, boolean>>({})
  const velocity = useRef(new THREE.Vector3())
  const facing = useRef(0)
  const runPhase = useRef(0)
  const cooldown = useRef(0)
  const placedInside = useRef<SectionId | null>(null)
  const exitPlaced = useRef(false)

  const {
    mode,
    activeSection,
    mobileKeys,
    requestEnter,
    requestExit,
    canInteract,
    characterPose,
    guidePhase,
    guideLocksPlayer,
    cancelGuide,
  } = useExperience()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault()
      }
      if (e.code === 'Escape' && mode === 'inside') requestExit()
    }
    const up = (e: KeyboardEvent) => {
      keys.current[e.code] = false
    }
    window.addEventListener('keydown', down, { passive: false })
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [mode, requestExit])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return

    const dt = Math.min(delta, 0.05)
    cooldown.current = Math.max(0, cooldown.current - dt)

    if (mode === 'entering' && activeSection && placedInside.current !== activeSection) {
      const gate = GATES.find((x) => x.id === activeSection)
      if (gate) {
        g.position.set(
          gate.position[0] + gate.forward[0] * 3.4,
          0,
          gate.position[2] + gate.forward[1] * 3.4,
        )
        facing.current = Math.atan2(gate.forward[0], gate.forward[1])
        g.rotation.y = facing.current
        placedInside.current = activeSection
        exitPlaced.current = false
        cooldown.current = 1
        velocity.current.set(0, 0, 0)
      }
    }

    if (mode === 'exiting' && placedInside.current && !exitPlaced.current) {
      const gate = GATES.find((x) => x.id === placedInside.current)
      if (gate) {
        g.position.set(
          gate.position[0] - gate.forward[0] * 3.6,
          0,
          gate.position[2] - gate.forward[1] * 3.6,
        )
        facing.current = Math.atan2(-gate.forward[0], -gate.forward[1])
        g.rotation.y = facing.current
        exitPlaced.current = true
        cooldown.current = 1
        velocity.current.set(0, 0, 0)
      }
    }

    if (mode === 'hub') {
      placedInside.current = null
      exitPlaced.current = false
    }

    const pressed = (code: string) => Boolean(keys.current[code] || mobileKeys[code])
    const forward = pressed('KeyW') || pressed('ArrowUp')
    const back = pressed('KeyS') || pressed('ArrowDown')
    const left = pressed('KeyA') || pressed('ArrowLeft')
    const right = pressed('KeyD') || pressed('ArrowRight')

    // Cancel guided tour if player tries to take over
    if (guideLocksPlayer && (forward || back || left || right)) {
      cancelGuide()
    }

    const move = new THREE.Vector3(
      (right ? 1 : 0) - (left ? 1 : 0),
      0,
      (back ? 1 : 0) - (forward ? 1 : 0),
    )

    // Auto-follow helper while being led
    if (guidePhase === 'leading' && helperPose.active) {
      const fdx = helperPose.x - g.position.x
      const fdz = helperPose.z - g.position.z
      const fdist = Math.hypot(fdx, fdz)
      if (fdist > 2.8) {
        move.set(fdx / fdist, 0, fdz / fdist)
      } else {
        move.set(0, 0, 0)
      }
    }

    const isRunning =
      move.lengthSq() > 0 && (canInteract || guidePhase === 'leading')

    if (isRunning) {
      move.normalize()
      velocity.current.lerp(move.multiplyScalar(RUN_SPEED), 0.28)
      facing.current = Math.atan2(move.x, move.z)
    } else {
      velocity.current.multiplyScalar(0.78)
    }

    if (canInteract || guidePhase === 'leading') {
      g.position.x += velocity.current.x * dt
      g.position.z += velocity.current.z * dt
      g.position.x = THREE.MathUtils.clamp(g.position.x, -WORLD_BOUNDS, WORLD_BOUNDS)
      g.position.z = THREE.MathUtils.clamp(g.position.z, -WORLD_BOUNDS, WORLD_BOUNDS)
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, facing.current, 0.22)
    }

    // Keep root Y locked — bob only the visual body so the camera doesn't shake
    g.position.y = 0
    positionRef.current.set(g.position.x, 0, g.position.z)
    characterPose.current = {
      x: g.position.x,
      z: g.position.z,
      facing: g.rotation.y,
    }

    const speed = velocity.current.length()
    const running = speed > 1.2 && (canInteract || guidePhase === 'leading')
    const body = visualBody.current

    if (running) {
      runPhase.current += dt * (14 + speed * 0.35)
      const swing = Math.sin(runPhase.current) * 1.05
      const armSwing = Math.sin(runPhase.current) * 1.15

      if (leftLeg.current) leftLeg.current.rotation.x = swing
      if (rightLeg.current) rightLeg.current.rotation.x = -swing
      if (leftArm.current) {
        leftArm.current.rotation.x = -armSwing
        leftArm.current.rotation.z = 0.25
      }
      if (rightArm.current) {
        rightArm.current.rotation.x = armSwing
        rightArm.current.rotation.z = -0.25
      }
      if (torso.current) {
        torso.current.rotation.x = THREE.MathUtils.lerp(torso.current.rotation.x, 0.22, 0.15)
      }
      if (body) {
        body.position.y = Math.abs(Math.sin(runPhase.current * 2)) * 0.1
      }
    } else {
      runPhase.current *= 0.85
      const damp = (mesh: THREE.Mesh | null, axis: 'x' | 'z', target = 0) => {
        if (!mesh) return
        mesh.rotation[axis] = THREE.MathUtils.lerp(mesh.rotation[axis], target, 0.2)
      }
      damp(leftLeg.current, 'x')
      damp(rightLeg.current, 'x')
      damp(leftArm.current, 'x')
      damp(rightArm.current, 'x')
      damp(leftArm.current, 'z')
      damp(rightArm.current, 'z')
      if (torso.current) {
        torso.current.rotation.x = THREE.MathUtils.lerp(torso.current.rotation.x, 0, 0.15)
      }
      if (body) {
        body.position.y = THREE.MathUtils.lerp(body.position.y, 0, 0.2)
      }
    }

    let nearest: SectionId | null = null
    let nearestDist = Infinity

    for (const gate of GATES) {
      const dx = g.position.x - gate.position[0]
      const dz = g.position.z - gate.position[2]
      const dist = Math.hypot(dx, dz)
      if (dist < nearestDist) {
        nearestDist = dist
        nearest = gate.id
      }

      const side = dx * gate.forward[0] + dz * gate.forward[1]

      if (mode === 'hub' && cooldown.current <= 0 && dist < ENTER_DIST && side > 0.05) {
        requestEnter(gate.id)
        cooldown.current = 1.4
        break
      }

      if (
        mode === 'inside' &&
        activeSection === gate.id &&
        cooldown.current <= 0 &&
        dist < EXIT_DIST &&
        side < -0.45
      ) {
        requestExit()
        cooldown.current = 1.4
        break
      }
    }

    onNearGate(nearestDist < 5.5 ? nearest : null)
  })

  return (
    <group ref={group} position={SPAWN}>
      <group ref={visualBody}>
      <mesh ref={leftLeg} position={[-0.22, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.45, 4, 8]} />
        <meshStandardMaterial color="#1e3a5f" />
      </mesh>
      <mesh ref={rightLeg} position={[0.22, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.45, 4, 8]} />
        <meshStandardMaterial color="#1e3a5f" />
      </mesh>
      <mesh position={[-0.22, 0.08, 0.08]} castShadow>
        <boxGeometry args={[0.28, 0.14, 0.4]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[0.22, 0.08, 0.08]} castShadow>
        <boxGeometry args={[0.28, 0.14, 0.4]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      <group ref={torso}>
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[0.85, 0.95, 0.5]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.2, 0.26]}>
          <planeGeometry args={[0.35, 0.22]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, 1.65, -0.05]} castShadow>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0, 1.72, 0.05]} castShadow>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#c4a484" />
        </mesh>
        <mesh position={[0, 1.9, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#1c1917" />
        </mesh>
        <mesh ref={leftArm} position={[-0.55, 1.2, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 4, 8]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        <mesh ref={rightArm} position={[0.55, 1.2, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 4, 8]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      </group>
      </group>
    </group>
  )
}
