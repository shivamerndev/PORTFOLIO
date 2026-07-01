import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as Three from "three"

const Cylender = () => {

  let meshRef = useRef()

  const texture = useTexture("3page.png")

  useFrame((state, delta) => {

    meshRef.current.rotation.y += delta
  })

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0.2]}>
      <cylinderGeometry args={[1, 1, 1, 30, 30, true]} />
      <meshStandardMaterial map={texture} transparent side={Three.DoubleSide} />
    </mesh>
  )
}

export default Cylender