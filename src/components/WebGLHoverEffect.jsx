import { useEffect } from "react";
import * as THREE from "three";
import images from "../images"; // Import image paths
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

const WebGLHoverEffect = () => {
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;

    const container = document.querySelector(".projects-section");
    if (!container) return;

    const links = [...document.querySelectorAll(".projects-list li")];
    if (links.length === 0) return;

    const textureLoader = new THREE.TextureLoader();
    const textures = [
      textureLoader.load(images.imageOne),
      textureLoader.load(images.imageTwo),
      textureLoader.load(images.imageThree),
      textureLoader.load(images.imageFour),
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTexture: { value: textures[0] },
      uAlpha: { value: 0.0 },
      uOffset: { value: new THREE.Vector2(0.0, 0.0) },
    };

    const geometry = new THREE.PlaneGeometry(250, 350, 20, 20);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function onMouseMove(e) {
      targetX = e.clientX - window.innerWidth / 2;
      targetY = -e.clientY + window.innerHeight / 2;
    }

    function render() {
      mesh.position.x += (targetX - mesh.position.x) * 0.1;
      mesh.position.y += (targetY - mesh.position.y) * 0.1;
      uniforms.uOffset.value.set(
        (targetX - mesh.position.x) * 0.0005,
        -(targetY - mesh.position.y) * 0.0005,
      );

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    links.forEach((link, idx) => {
      link.addEventListener("mouseenter", () => {
        uniforms.uTexture.value = textures[idx];
        uniforms.uAlpha.value = 1.0;
      });

      link.addEventListener("mouseleave", () => {
        uniforms.uAlpha.value = 0.0;
      });
    });

    window.addEventListener("mousemove", onMouseMove);
    render();

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize);

    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
};

export default WebGLHoverEffect;
