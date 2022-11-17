import { useFrame, useLoader } from '@react-three/fiber'
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
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.traverse((object) => {
      if(object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    })
  },[gltf]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0].children[3];
    // Wheels one by one
    group.children[1].rotation.x = t * 2;
    group.children[0].rotation.x = t * 2;
    group.children[2].rotation.x = t * 2;
    group.children[3].rotation.x = t * 2;
  })

  return <primitive object={gltf.scene} />
}

export default Car
