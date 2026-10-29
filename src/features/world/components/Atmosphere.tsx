import { Sky } from '@react-three/drei'

const SHADOW_MAP: [number, number] = [1024, 1024]
const SUN_POSITION: [number, number, number] = [-60, 9, -100]

/** Day sky, fog, and lighting for the hub world. */
export function Atmosphere() {
  return (
    <>
      <color attach="background" args={['#e9c9a4']} />
      <fog attach="fog" args={['#e3c6a6', 32, 85]} />
      <Sky
        distance={450000}
        sunPosition={SUN_POSITION}
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
        shadow-mapSize={SHADOW_MAP}
        shadow-bias={-0.0004}
        shadow-camera-far={90}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <directionalLight position={[20, 14, 30]} color="#c7dcff" intensity={0.7} />
      <hemisphereLight args={['#ffd9b8', '#2d5a3a', 0.55]} />
    </>
  )
}
