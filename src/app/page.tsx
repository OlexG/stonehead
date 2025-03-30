'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

function StoneheadModel() {
  const { scene } = useGLTF('/stonehead.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Fix weird shading
        mesh.geometry.computeVertexNormals();

        // Solid dark gray flat material with smooth stone look
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#777777',         // medium-dark gray
          roughness: 0.9,           // matte
          metalness: 0,             // no reflectivity
          flatShading: true,        // clean flat shading
        });
      }
    });

    // Correct rotation
    scene.rotation.x = Math.PI / 2;
    scene.rotation.y = Math.PI;
    scene.rotation.z = Math.PI / 5;
  }, [scene]);

  return <primitive object={scene} scale={0.013} position={[0, -1, 0]} />;
}

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen w-full">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-8 py-20 gap-16">
        {/* 3D Model */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px]">
          <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 2, 5]} intensity={1.2} />
            <Suspense fallback={null}>
              <StoneheadModel />
              <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Immortalize your Memories.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Upload your photo. We turn it into a stunning 3D-printed statue. Precision-crafted, shipped to your doorstep.
          </p>

          {/* Button to /buy */}
          <Link
            href="/buy"
            className="inline-block mt-4 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Get Your Own →
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        <section>
          <h2 className="text-3xl font-semibold mb-4">How it Works</h2>
          <p className="text-gray-400 text-lg">
            You submit a photo — front-facing, good lighting. Our AI reconstructs a 3D model of your head. Once approved, we 3D print it with durable materials and ship it to you.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Why Stonehead?</h2>
          <p className="text-gray-400 text-lg">
            Stonehead creates timeless keepsakes. Whether it’s a gift, a tribute, or a piece of yourself — we make sure it lasts.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-400 text-lg">
            The future of personalized art is here. Scroll back up and let your legacy take shape.
          </p>
        </section>
      </div>
    </div>
  );
}

useGLTF.preload('/stonehead.glb');
