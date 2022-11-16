import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three';

// "AC - Audi R8 Lms 2016" (https://skfb.ly/ozYT8) by DAVID.3D.ART is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
function Car() {
  const gltf = useLoader(GLTFLoader,
    process.env.PUBLIC_URL + 'models/car/scene.gltf'
    );

  useEffect(() => {
    gltf.scene.scale.set(0.8, 0.8, 0.8);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if(object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    })
  },[gltf]);

  return <primitive object={gltf.scene} />
}

export default Car
