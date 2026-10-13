import { Sky } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, type ComponentRef } from 'react'
import * as THREE from 'three'
import { useDayNight } from '../context/DayNightContext'
import { glowVertex, orbFragment } from '../shaders/glow'

const TRANSITION_SECONDS = 2.6
const { smoothstep } = THREE.MathUtils

const SUN_DAY = new THREE.Vector3(-60, 9, -100)
const SUN_NIGHT = new THREE.Vector3(-60, -16, -100)
const MOON_POSITION: [number, number, number] = [-42, 30, -100]
const SHADOW_MAP: [number, number] = [1024, 1024]

/** Day value → night value for every light, blended each frame */
const LIGHTS = {
  fog: ['#e3c6a6', '#18213d'],
  ambient: ['#ffe8d6', '#7d8fd6', 0.4, 0.28],
  sun: ['#ffd6a5', '#a9bcff', 2.1, 0.75],
  fill: ['#c7dcff', '#5b6fb8', 0.7, 0.2],
  hemiSky: ['#ffd9b8', '#2c3a70', 0.55, 0.4],
  hemiGround: ['#2d5a3a', '#0f1a16'],
} as const

const pair = (colors: readonly [string, string, ...unknown[]]) =>
  [new THREE.Color(colors[0]), new THREE.Color(colors[1])] as const

const FOG = pair(LIGHTS.fog)
const AMBIENT = pair(LIGHTS.ambient)
const SUN = pair(LIGHTS.sun)
const FILL = pair(LIGHTS.fill)
const HEMI_SKY = pair(LIGHTS.hemiSky)
const HEMI_GROUND = pair(LIGHTS.hemiGround)
const lerp = (range: readonly [unknown, unknown, number, number], t: number) =>
  THREE.MathUtils.lerp(range[2], range[3], t)

const domeVertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const domeFragment = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform float uOpacity;
  varying vec3 vDir;
  void main() {
    float h = clamp(vDir.y, 0.0, 1.0);
    gl_FragColor = vec4(mix(uHorizon, uTop, pow(h, 0.55)), uOpacity);
    #include <colorspace_fragment>
  }
`

function hash(n: number) {
  const x = Math.sin(n * 91.345 + 47.853) * 43758.5453
  return x - Math.floor(x)
}

function useStarGeometry(count: number, radius: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const y = 0.06 + hash(i) * 0.94
      const a = hash(i + 5000) * Math.PI * 2
      const ring = Math.sqrt(1 - y * y)
      positions.set([Math.cos(a) * ring * radius, y * radius, Math.sin(a) * ring * radius], i * 3)
      const b = 0.35 + hash(i + 9000) ** 3 * 0.65
      colors.set([b * 0.92, b * 0.95, b], i * 3)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geometry
  }, [count, radius])
}

/**
 * Sky, fog and lighting for both times of day. Switching sinks the sun into a
 * sunset, then fades in a night dome with stars and a moon.
 */
export function Atmosphere() {
  const { timeOfDay, nightBlend } = useDayNight()
  const dpr = useThree((s) => s.viewport.dpr)

  const sky = useRef<ComponentRef<typeof Sky>>(null)
  const fog = useRef<THREE.Fog>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const sun = useRef<THREE.DirectionalLight>(null)
  const fill = useRef<THREE.DirectionalLight>(null)
  const hemi = useRef<THREE.HemisphereLight>(null)
  const dome = useRef<THREE.Mesh>(null)
  const stars = useRef<THREE.Points>(null)
  const moon = useRef<THREE.Group>(null)
  const moonDisc = useRef<THREE.MeshBasicMaterial>(null)

  const progress = useRef(nightBlend.current)
  const applied = useRef(-1)

  const starGeometry = useStarGeometry(1400, 140)
  const domeUniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color('#05070f') },
      uHorizon: { value: new THREE.Color('#1c2747') },
      uOpacity: { value: 0 },
    }),
    [],
  )
  const moonHaloUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#b9c8ff') },
      uOpacity: { value: 0 },
      uPower: { value: 2.6 },
    }),
    [],
  )

  useFrame((_, delta) => {
    const target = timeOfDay === 'night' ? 1 : 0
    const step = Math.min(delta, 0.1) / TRANSITION_SECONDS
    const p = progress.current
    progress.current = target > p ? Math.min(target, p + step) : Math.max(target, p - step)

    const t = smoothstep(progress.current, 0, 1)
    if (t === applied.current) return
    applied.current = t
    nightBlend.current = t

    if (sky.current) {
      sky.current.material.uniforms.sunPosition.value.lerpVectors(SUN_DAY, SUN_NIGHT, t)
      sky.current.visible = t < 1
    }
    fog.current?.color.lerpColors(FOG[0], FOG[1], t)
    if (ambient.current) {
      ambient.current.color.lerpColors(AMBIENT[0], AMBIENT[1], t)
      ambient.current.intensity = lerp(LIGHTS.ambient, t)
    }
    if (sun.current) {
      sun.current.color.lerpColors(SUN[0], SUN[1], t)
      sun.current.intensity = lerp(LIGHTS.sun, t)
    }
    if (fill.current) {
      fill.current.color.lerpColors(FILL[0], FILL[1], t)
      fill.current.intensity = lerp(LIGHTS.fill, t)
    }
    if (hemi.current) {
      hemi.current.color.lerpColors(HEMI_SKY[0], HEMI_SKY[1], t)
      hemi.current.groundColor.lerpColors(HEMI_GROUND[0], HEMI_GROUND[1], t)
      hemi.current.intensity = lerp(LIGHTS.hemiSky, t)
    }

    // The sunset plays out first, then the night sky fades in over it
    domeUniforms.uOpacity.value = smoothstep(t, 0.25, 1)
    if (dome.current) dome.current.visible = t > 0
    const starAlpha = smoothstep(t, 0.55, 1)
    if (stars.current) {
      ;(stars.current.material as THREE.PointsMaterial).opacity = starAlpha
      stars.current.visible = starAlpha > 0
    }
    const moonAlpha = smoothstep(t, 0.45, 1)
    if (moonDisc.current) moonDisc.current.opacity = moonAlpha
    moonHaloUniforms.uOpacity.value = moonAlpha * 0.55
    if (moon.current) moon.current.visible = moonAlpha > 0
  })

  return (
    <>
      <color attach="background" args={['#e9c9a4']} />
      <fog ref={fog} attach="fog" args={[LIGHTS.fog[0], 32, 85]} />
      <Sky
        ref={sky}
        distance={450000}
        sunPosition={SUN_DAY}
        turbidity={7}
        rayleigh={2}
        mieCoefficient={0.006}
        mieDirectionalG={0.88}
      />

      {/* Transparent sky layers render first so clouds and sparkles stay on top of them */}
      <mesh ref={dome} renderOrder={-10} visible={false}>
        <sphereGeometry args={[150, 32, 16]} />
        <shaderMaterial
          vertexShader={domeVertex}
          fragmentShader={domeFragment}
          uniforms={domeUniforms}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
      <points ref={stars} geometry={starGeometry} renderOrder={-9} visible={false}>
        <pointsMaterial
          size={1.7 * dpr}
          sizeAttenuation={false}
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          fog={false}
          toneMapped={false}
        />
      </points>
      <group ref={moon} position={MOON_POSITION} visible={false}>
        <mesh renderOrder={-8}>
          <sphereGeometry args={[13, 24, 16]} />
          <shaderMaterial
            vertexShader={glowVertex}
            fragmentShader={orbFragment}
            uniforms={moonHaloUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh renderOrder={-7}>
          <sphereGeometry args={[4.2, 32, 16]} />
          <meshBasicMaterial
            ref={moonDisc}
            color="#f6f3e8"
            transparent
            opacity={0}
            depthWrite={false}
            fog={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <ambientLight ref={ambient} intensity={LIGHTS.ambient[2]} color={LIGHTS.ambient[0]} />
      <directionalLight
        ref={sun}
        castShadow
        position={[-24, 26, -32]}
        color={LIGHTS.sun[0]}
        intensity={LIGHTS.sun[2]}
        shadow-mapSize={SHADOW_MAP}
        shadow-bias={-0.0004}
        shadow-camera-far={90}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <directionalLight
        ref={fill}
        position={[20, 14, 30]}
        color={LIGHTS.fill[0]}
        intensity={LIGHTS.fill[2]}
      />
      <hemisphereLight
        ref={hemi}
        args={[LIGHTS.hemiSky[0], LIGHTS.hemiGround[0], LIGHTS.hemiSky[2]]}
      />
    </>
  )
}
