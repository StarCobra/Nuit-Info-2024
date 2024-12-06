import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const WeathersEffectsComponent = ({ weather }) => {
  const { scene } = useThree();
  const materials = useRef([]);
  const parameters = useRef([]);

  useEffect(() => {
    const particleSystems = createParticleSystems();

    // Add particleSystems to scene
    for (let i = 0; i < particleSystems.length; i++) {
      scene.add(particleSystems[i]);
    }

    return () => {
      // Clean up particle systems on unmount
      for (let i = 0; i < particleSystems.length; i++) {
        scene.remove(particleSystems[i]);
      }
    };
  }, [weather, scene]);

  function createParticleSystems() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleSystems = [];
    const textureLoader = new THREE.TextureLoader();
    let sprite1, sprite2, sprite3, sprite4, sprite5;

    switch (weather) {
      case "rain":
        sprite1 = textureLoader.load("/assets/textures/sprite/rain/rain1.png");
        sprite2 = textureLoader.load("/assets/textures/sprite/rain/rain2.png");
        sprite3 = textureLoader.load("/assets/textures/sprite/rain/rain1.png");
        sprite4 = textureLoader.load("/assets/textures/sprite/rain/rain2.png");
        sprite5 = textureLoader.load("/assets/textures/sprite/rain/rain1.png");
        break;
      case "sun":
        sprite1 = textureLoader.load("/assets/textures/sprite/sun/happy.png");
        sprite2 = textureLoader.load("/assets/textures/sprite/sun/happy.png");
        sprite3 = textureLoader.load("/assets/textures/sprite/sun/sun.png");
        sprite4 = textureLoader.load("/assets/textures/sprite/sun/sun.png");
        sprite5 = textureLoader.load("/assets/textures/sprite/sun/sun.png");
        break;
      case "snow":
        sprite1 = textureLoader.load("/assets/textures/sprite/snow/snowflake1.png");
        sprite2 = textureLoader.load("/assets/textures/sprite/snow/snowflake2.png");
        sprite3 = textureLoader.load("/assets/textures/sprite/snow/snowflake3.png");
        sprite4 = textureLoader.load("/assets/textures/sprite/snow/snowflake4.png");
        sprite5 = textureLoader.load("/assets/textures/sprite/snow/snowflake5.png");
        break;
      default:
        sprite1 = textureLoader.load("/assets/textures/sprite/rain/rain1.png");
        sprite2 = textureLoader.load("/assets/textures/sprite/rain/rain2.png");
        sprite3 = textureLoader.load("/assets/textures/sprite/rain/rain1.png");
        sprite4 = textureLoader.load("/assets/textures/sprite/rain/rain2.png");
        sprite5 = textureLoader.load("/assets/textures/sprite/rain/rain1.png");
        break;
    }

    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      vertices.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    parameters.current = [
      [[1.0, 1.2, 0.5], sprite1, 20],
      [[0.95, 0.2, 0.5], sprite2, 15],
      [[0.9, 0.2, 0.5], sprite3, 10],
      [[0.85, 0.2, 0.5], sprite4, 8],
      [[0.8, 0.2, 0.5], sprite5, 5],
    ];

    for (let i = 0; i < parameters.current.length; i++) {
      const color = parameters.current[i][0];
      const sprite = parameters.current[i][1];
      const size = parameters.current[i][2];

      materials.current[i] = new THREE.PointsMaterial({
        size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      materials.current[i].color.setHSL(color[0], color[1], color[2]);

      const particleSystem = new THREE.Points(geometry, materials.current[i]);

      particleSystem.rotation.x = Math.random() * 2;
      particleSystem.rotation.y = Math.random() * 2;
      particleSystem.rotation.z = Math.random() * 2;

      particleSystems.push(particleSystem);
    }

    return particleSystems;
  }

  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.00005;

      for (let i = 0; i < scene.children.length; i++) {
        const object = scene.children[i];

        if (object instanceof THREE.Points) {
          object.rotation.y = time * (i < 4 ? i + 5 : -(i + 1));
        }
      }

      for (let i = 0; i < materials.current.length; i++) {
        const color = parameters.current[i][0];
        const h = (360 * ((color[0] + time) % 360)) / 360;
        materials.current[i].color.setHSL(h, color[1], color[2]);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [scene, materials, parameters]);

  return null;
};

export default WeathersEffectsComponent;
