import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { useExperience } from '../context/ExperienceContext'

/** Drag / touch on canvas to look around and discover section gates */
export function LookControls() {
  const { gl } = useThree()
  const { addLookDelta, canInteract } = useExperience()
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = gl.domElement

    const onDown = (e: PointerEvent) => {
      if (!canInteract) return
      // Ignore UI drags starting near edges if needed; canvas-only is fine
      dragging.current = true
      last.current = { x: e.clientX, y: e.clientY }
      el.setPointerCapture(e.pointerId)
      el.style.cursor = 'grabbing'
    }

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - last.current.x
      const dy = e.clientY - last.current.y
      last.current = { x: e.clientX, y: e.clientY }
      addLookDelta(-dx * 0.005, dy * 0.003)
    }

    const onUp = (e: PointerEvent) => {
      dragging.current = false
      el.style.cursor = 'grab'
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.style.touchAction = 'none'
    el.style.cursor = 'grab'

    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [gl, addLookDelta, canInteract])

  return null
}

export function CameraRig({
  characterPos,
}: {
  characterPos: MutableRefObject<THREE.Vector3>
}) {
  const { camera } = useThree()
  const { mode, lookYaw, lookPitch } = useExperience()
  const smoothFollow = useRef(new THREE.Vector3(0, 0, 6))
  const smoothLook = useRef(new THREE.Vector3(0, 1.35, 6))

  useFrame((_, delta) => {
    const target = characterPos.current
    // Smooth only XZ — Y stays grounded so run bob never shakes the view
    const followSpeed = 1 - Math.exp(-8 * delta)
    smoothFollow.current.x = THREE.MathUtils.lerp(smoothFollow.current.x, target.x, followSpeed)
    smoothFollow.current.z = THREE.MathUtils.lerp(smoothFollow.current.z, target.z, followSpeed)
    smoothFollow.current.y = 0

    const distance = mode === 'inside' ? 8.2 : 12.5
    const height = distance * Math.sin(lookPitch) + (mode === 'inside' ? 1.2 : 1.8)
    const flat = distance * Math.cos(lookPitch)

    const desired = new THREE.Vector3(
      smoothFollow.current.x + Math.sin(lookYaw) * flat,
      height,
      smoothFollow.current.z + Math.cos(lookYaw) * flat,
    )

    const camSpeed = 1 - Math.exp(-10 * delta)
    camera.position.lerp(desired, camSpeed)

    smoothLook.current.set(smoothFollow.current.x, 1.35, smoothFollow.current.z)
    camera.lookAt(smoothLook.current)
  })

  return null
}
