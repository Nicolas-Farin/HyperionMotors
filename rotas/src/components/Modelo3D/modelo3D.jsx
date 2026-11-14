import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Modelo3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // CENA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111");

    // CÂMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 4);

    // RENDER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // CONTROLES (muito importante 🔥)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // LUZES
    const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(5, 10, 7);
    scene.add(light2);

    // LOADER DO MODELO
    const loader = new GLTFLoader();

    loader.load(
      "/models/carro.glb", // 👈 coloque seu arquivo aqui
      (gltf) => {
        const model = gltf.scene;

        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Erro ao carregar modelo:", error);
      }
    );

    // ANIMAÇÃO
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // RESPONSIVO
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // LIMPEZA
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        overflow: "hidden"
      }}
    />
  );
}