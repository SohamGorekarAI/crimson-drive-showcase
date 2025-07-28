import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Error Boundary for 3D content
class ThreeErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('3D Model Error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
}

// Fallback Car (simple box if model fails to load)
function FallbackCar() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={3}> {/* Increased scale */}
            <boxGeometry args={[2, 1, 4]} />
            <meshStandardMaterial color="#ff0000" />
        </mesh>
    )
}

// Car Model Component - Uncommented GLTF loading code to display the actual model
function CarModel() {
    const meshRef = useRef<THREE.Group>(null)
    const gltf = useGLTF('/models/scene.gltf')

    useFrame((state) => {
        if (meshRef.current) {
            // Fixed position based on your preference: y: -0.029793023244513224
            meshRef.current.position.set(0, -0.029793023244513224, 0);
            meshRef.current.rotation.y += 0.01 // Rotate clockwise

            // Log the current rotation for debugging
            if (state.clock.elapsedTime % 5 < 0.1) { // Log approximately every 5 seconds
                console.log('Car rotation:', meshRef.current.rotation);
                console.log('Car position:', meshRef.current.position);
            }
        }
    })

    if (!gltf || !gltf.scene) {
        return <FallbackCar />
    }

    return (
        <primitive
            ref={meshRef}
            object={gltf.scene}
            scale={1}
            position={[0, 0, 0]}
        />
    )
}

const SuperCar = () => {
    // State for camera settings
    const [cameraPosition, setCameraPosition] = React.useState<[number, number, number]>([0, 2, 10]);
    const [cameraFov, setCameraFov] = React.useState<number>(75);

    // Setup console commands for camera control
    React.useEffect(() => {
        // Expose camera controls to window object for console access
        (window as any).setCameraFOV = (fov: number) => {
            setCameraFov(fov);
            console.log(`Camera FOV set to: ${fov}`);
        };

        // Log initial camera settings
        console.log('Initial camera position:', cameraPosition);
        console.log('Initial camera FOV:', cameraFov);

        return () => {
            // Clean up
            delete (window as any).setCameraFOV;
        };
    }, []);

    return (
        <div className="w-full h-screen bg-black"> {/* Changed background to pure black */}
            <Canvas
                camera={{
                    position: cameraPosition,
                    fov: cameraFov,
                    near: 0.1,
                    far: 1000
                }}
                style={{ width: '100%', height: '100%' }}
                onCreated={({ camera }) => {
                    // Log camera position whenever it changes
                    console.log('Camera initialized with position:', camera.position);

                    // Check if camera has FOV property (PerspectiveCamera)
                    if ('fov' in camera) {
                        console.log('Camera initialized with FOV:', (camera as THREE.PerspectiveCamera).fov);
                    }

                    // To change FOV from console: window.setCameraFOV(60)
                    console.log('To change FOV from console, use: window.setCameraFOV(value)');
                }}
            >
                {/* Super Bright Studio Lighting Setup */}
                {/* Main ambient light for overall brightness */}
                <ambientLight intensity={20} />

                {/* Key Light - Primary light source */}
                <directionalLight position={[10, 10, 5]} intensity={15} color="#ffffff" castShadow />

                {/* Fill Light - Softer light to fill shadows - much brighter */}
                <directionalLight position={[-5, 8, 10]} intensity={15} color="#f5f5ff" />

                {/* Back Light - Creates rim lighting effect - much brighter */}
                <directionalLight position={[0, 8, -10]} intensity={18} color="#fffaf0" />

                {/* Primary Accent Spotlights - much brighter */}
                <spotLight
                    position={[8, 5, 3]}
                    angle={0.3}
                    penumbra={0.7}
                    intensity={20}
                    color="#ffffff"
                    castShadow
                    distance={20}
                />
                <spotLight
                    position={[-8, 5, 3]}
                    angle={0.3}
                    penumbra={0.7}
                    intensity={20}
                    color="#ffffff"
                    castShadow
                    distance={20}
                />

                {/* Additional Spotlight from top-front */}
                <spotLight
                    position={[0, 10, 8]}
                    angle={0.4}
                    penumbra={0.8}
                    intensity={25}
                    color="#fefefe"
                    castShadow
                    distance={25}
                />

                {/* Additional Spotlights from sides at different angles */}
                <spotLight
                    position={[12, 3, -5]}
                    angle={0.25}
                    penumbra={0.6}
                    intensity={22}
                    color="#ffffff"
                    castShadow
                    distance={30}
                />
                <spotLight
                    position={[-12, 3, -5]}
                    angle={0.25}
                    penumbra={0.6}
                    intensity={22}
                    color="#ffffff"
                    castShadow
                    distance={30}
                />

                {/* Low front spotlight - highlighting from below */}
                <spotLight
                    position={[0, -1, 15]}
                    angle={0.35}
                    penumbra={0.7}
                    intensity={18}
                    color="#f8f8ff"
                    castShadow
                    distance={25}
                />

                {/* Floor bounce light - much brighter */}
                <pointLight position={[0, -3, 0]} intensity={12} color="#ffffff" />

                {/* Controls */}
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={20}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                />

                {/* 3D Model with Error Boundary */}
                <ThreeErrorBoundary fallback={<FallbackCar />}>
                    <Suspense fallback={<FallbackCar />}>
                        <CarModel />
                    </Suspense>
                </ThreeErrorBoundary>
            </Canvas>
        </div>
    )
}

export default SuperCar
