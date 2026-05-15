/**
 * Fresnel atmosphere shader strings.
 *
 * The Fresnel term `pow(1 - dot(N, V), uPower)` peaks where the surface
 * normal turns perpendicular to the view direction — i.e. the silhouette
 * of the sphere as seen from the camera. That's exactly where a real
 * planetary atmosphere scatters the most light, so we just paint a soft
 * tinted halo along that ring.
 *
 * Combined with BackSide rendering + AdditiveBlending in <Saturn />,
 * the halo only appears as a glow leaking past the silhouette of the
 * front-facing planet body — never as a visible inner shell.
 *
 * Exported as plain strings (not a custom material class) so we can
 * mount them via the JSX `<shaderMaterial>` element. This keeps TS
 * happy without needing drei's `shaderMaterial` extension helper.
 */

export const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - dot(vNormal, vViewDir), uPower);
    gl_FragColor = vec4(uColor * fresnel * uIntensity, fresnel);
  }
`;
