import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Ground } from "./Ground.js";
import Car from "./Car.js";
import { Boxes } from "./Boxes.js";
import Rings from "./Rings.js";
import { FloatingGrid } from "./FloatingGrid";
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color attach="background" args={[0, 0, 0]} />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>


      <spotLight
        color={[1, 0.25, 0.71]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <Rings />
      <Boxes />
      <FloatingGrid />

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.5} //The bloom intensity
          width={300} // render width
          height={300} //render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.3} // luminance threshold . Raise the value to mask out the darker elements in the scene
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} //color offset
        />
      </EffectComposer>
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}
