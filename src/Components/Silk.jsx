/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useRef, useMemo, useLayoutEffect } from "react";
import { Color } from "three";

const hexToRGB = (hex) => {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};

const vert = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

const frag = `
varying vec2 vUv;
uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
const float e = 2.71828182845904523536;
float noise(vec2 t){ float G=e; vec2 r=(G*sin(G*t)); return fract(r.x*r.y*(1.0+t.x)); }
vec2 rotUv(vec2 uv,float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c)*uv; }
void main(){
  float rnd=noise(gl_FragCoord.xy);
  vec2 uv=rotUv(vUv*uScale,uRotation);
  vec2 tex=uv*uScale; float t=uSpeed*uTime;
  tex.y+=0.03*sin(8.0*tex.x-t);
  float p=0.6+0.4*sin(5.0*(tex.x+tex.y+cos(3.0*tex.x+5.0*tex.y)+0.02*t)+sin(20.0*(tex.x+tex.y-0.1*t)));
  vec4 col=vec4(uColor,1.0)*vec4(p)-rnd/15.0*uNoiseIntensity;
  col.a=1.0; gl_FragColor=col;
}
`;

const SilkPlane = forwardRef(({ uniforms }, ref) => {
  const { viewport } = useThree();
  const tick = useRef(0);

  useLayoutEffect(() => {
    if (ref.current) ref.current.scale.set(viewport.width, viewport.height, 1);
  }, [ref, viewport]);

  useFrame((_, delta) => {
    // Пропускаем каждый второй кадр → ~30fps вместо 60
    tick.current++;
    if (tick.current % 2 !== 0) return;
    ref.current.material.uniforms.uTime.value += delta * 0.8;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

export default function Silk({
  speed = 3,
  scale = 1,
  color = "#1B4332",
  noiseIntensity = 1.5,
  rotation = 0,
}) {
  const meshRef = useRef();
  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [speed, scale, noiseIntensity, color, rotation],
  );

  return (
    <Canvas
      dpr={[0.6, 1]}
      frameloop="always"
      style={{ position: "absolute", inset: 0 }}
      gl={{
        antialias: false,
        powerPreference: "low-power",
        depth: false,
        stencil: false,
      }}
    >
      <SilkPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  );
}
