import * as THREE from 'three'
import React, { useRef, useMemo } from "react";
import { Canvas, extend, useThree, useLoader, useFrame  } from "@react-three/fiber";
import { Water } from 'three-stdlib'
import { useTexture } from '@react-three/drei';

extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useTexture('/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000, 128, 128), [])
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(1, 1, 1),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 5.0,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta;
    const positionAttribute = ref.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const wave1 = Math.sin(x * 0.1 + time * 1.5) * 1;
      const wave2 = Math.sin(x * 0.2 + time * 1.0) * 0.6;
      const wave3 = Math.cos(y * 0.15 + time * 2.0) * 0.8;
      const z = wave1 + wave2 + wave3;
      positionAttribute.setZ(i, z);
    }
    positionAttribute.needsUpdate = true;
  })
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} vertexShader={`
    uniform float u_time;
    varying vec2 vUv;

    void main() {
      vUv = uv; // Passer les coordonnées UV au fragment shader
      vec3 pos = position;
      pos.z += sin(pos.x * 0.1 + u_time) * 0.5; // Exemple de déformation
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `} fragmentShader={`
    uniform sampler2D waterNormals;
    varying vec2 vUv;

    void main() {
      vec3 normal = texture2D(waterNormals, vUv).xyz; // Utiliser la texture pour les normales
      gl_FragColor = vec4(normal, 1.0); // Couleur basée sur les normales
    }
  `} />
}

export default Ocean;