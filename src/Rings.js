import { useFrame } from "@react-three/fiber"
import { useRef } from "react"


export default function Rings() {
  const itemsRef = useRef([])

  useFrame((state) => {
    for (let index = 0; index < itemsRef.current.length; index++) {
      let mesh = itemsRef.current[index];
      // [-7, 6] because we have 14 elemetns in array
      let z = (index - 7) * 3.5;
      mesh.position.set(0, 0, -z)

      let dist = Math.abs(z)
      mesh.scale.set(1- dist * 0.04, 1- dist * 0.04, 1- dist * 0.04);
    }
  })

  return (
    <>
      {[0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0].map((v, index) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  )
}
