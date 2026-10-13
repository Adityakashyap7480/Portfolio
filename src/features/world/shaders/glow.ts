/** Works for plain and instanced meshes, passing the per-instance colour through */
export const glowVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vTint;
  varying vec2 vUv;

  void main() {
    vec4 local = vec4(position, 1.0);
    vec3 n = normal;
    #ifdef USE_INSTANCING
      local = instanceMatrix * local;
      n = mat3(instanceMatrix) * n;
    #endif
    #ifdef USE_INSTANCING_COLOR
      vTint = instanceColor;
    #else
      vTint = vec3(1.0);
    #endif
    vec4 mv = modelViewMatrix * local;
    vNormal = normalize(normalMatrix * n);
    vView = normalize(-mv.xyz);
    vUv = uv;
    gl_Position = projectionMatrix * mv;
  }
`

/** Soft glowing orb: bright where the sphere faces the camera, fading out at the rim */
export const orbFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vTint;

  void main() {
    float facing = max(dot(normalize(vNormal), normalize(vView)), 0.0);
    gl_FragColor = vec4(uColor * vTint, pow(facing, uPower) * uOpacity);
    #include <colorspace_fragment>
  }
`

/** Radial light pool for a flat circle */
export const poolFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vTint;
  varying vec2 vUv;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float falloff = pow(clamp(1.0 - d, 0.0, 1.0), 2.2);
    gl_FragColor = vec4(uColor * vTint, falloff * uOpacity);
    #include <colorspace_fragment>
  }
`
