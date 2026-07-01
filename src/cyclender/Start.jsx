import { Canvas } from '@react-three/fiber'
import React from 'react'
import { OrbitControls } from '@react-three/drei'
import Cylender from './Cylender'

const Start = () => {

    return (
        <Canvas camera={{fov : 35}}>
            <OrbitControls />
            <ambientLight/>
            {/* <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} /> */}
            <Cylender />
        </Canvas>

    )
}

export default Start