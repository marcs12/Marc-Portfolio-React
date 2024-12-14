import { useEffect } from "react";
import * as THREE from "three";
import images from "../images"; // Import image paths

const WebGLHoverEffect = () => {
  useEffect(() => {
    // Check for WebGL context
    if (!window.WebGLRenderingContext) {
      console.error("Your browser does not support WebGL.");
      return;
    }

    let targetX = 0;
    let targetY = 0;

    const container = document.querySelector(".projects-section");
    if (!container) {
      console.error("Container not found");
      return; // Exit early if container doesn't exist
    }

    const links = [...document.querySelectorAll(".projects-list li")];
    if (links.length === 0) {
      console.error("No project links found");
      return; // Exit early if no links are found
    }

    // Load textures once at the beginning
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

    // Create a geometry and material for the mesh (with a basic material instead of shaders)
    const geometry = new THREE.PlaneGeometry(250, 350, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      map: textures[0],
      transparent: true,
      opacity: 0.0, // Start with opacity 0
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function onMouseMove(e) {
      targetX = e.clientX - window.innerWidth / 2;
      targetY = -e.clientY + window.innerHeight / 2;
    }

    function render() {
      // Smooth movement to follow the cursor
      mesh.position.x += (targetX - mesh.position.x) * 0.1;
      mesh.position.y += (targetY - mesh.position.y) * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    links.forEach((link, idx) => {
      link.addEventListener("mouseenter", () => {
        material.map = textures[idx]; // Update texture on hover
        material.opacity = 1.0; // Make it fully visible
      });

      link.addEventListener("mouseleave", () => {
        material.opacity = 0.0; // Hide texture when mouse leaves
      });
    });

    window.addEventListener("mousemove", onMouseMove);
    render();

    // Handle window resizing to maintain aspect ratio
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", () => {}); // Cleanup resize event
    };
  }, []);

  return null;
};

export default WebGLHoverEffect;
