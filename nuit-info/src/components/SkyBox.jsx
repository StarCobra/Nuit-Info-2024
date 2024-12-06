import * as THREE from 'three';
import React, { useRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";

function SkyBox() {
  const ref = useRef();
  
  const texture = useLoader(THREE.TextureLoader, '/assets/ciel.jpg'); 

  const geom = useMemo(() => new THREE.BoxGeometry(1000000, 1000000, 1000000), []);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });
  }, [texture]);

  if (!texture) {
    console.error("La texture de la skybox n'a pas pu être chargée.");
  }

  return <mesh ref={ref} geometry={geom} material={material} />;
}

export default SkyBox;
