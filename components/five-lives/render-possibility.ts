import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createPossibilityScene(
  host: HTMLElement,
  initiallyPaused: boolean,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0.12, 7.4);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.06);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const sculpture = new THREE.Group();
  const colors = ['#35596c', '#adbcaf', '#c3917e', '#cab88b', '#7b99ac'];
  const geometry = new THREE.TorusGeometry(0.92, 0.16, 20, 96);
  const rings = colors.map((color, index) => {
    const material = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.35,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.45,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const angle = (index / 5) * Math.PI * 2;
    mesh.position.set(
      Math.cos(angle) * 0.57,
      Math.sin(angle) * 0.57,
      Math.sin(angle * 2) * 0.13,
    );
    mesh.rotation.set(
      0.35 + Math.sin(angle) * 0.52,
      Math.cos(angle) * 0.65,
      angle + 0.4,
    );
    mesh.scale.set(1, 1.18, 1);
    sculpture.add(mesh);
    return mesh;
  });
  sculpture.rotation.set(0.12, -0.35, -0.18);
  scene.add(sculpture);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x849fa8, 2.5));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 5, 4);
  scene.add(key);
  let paused = initiallyPaused,
    visible = true,
    disposed = false,
    frame = 0,
    lastTime = 0,
    elapsed = 0;
  let pointerX = 0,
    pointerY = 0;
  const draw = (time: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    if (!paused && time - lastTime < 32) {
      frame = requestAnimationFrame(draw);
      return;
    }
    if (!paused) elapsed += Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    const scroll = paused
      ? 0
      : Math.min(window.scrollY / Math.max(innerHeight, 1), 1.5);
    const x =
      0.12 +
      (paused
        ? 0
        : Math.sin(elapsed * 0.25) * 0.1 + pointerY * 0.12 + scroll * 0.3);
    const y =
      -0.35 +
      (paused
        ? 0
        : Math.sin(elapsed * 0.18) * 0.22 + pointerX * 0.2 + scroll * 0.8);
    sculpture.rotation.x += (x - sculpture.rotation.x) * (paused ? 1 : 0.07);
    sculpture.rotation.y += (y - sculpture.rotation.y) * (paused ? 1 : 0.07);
    sculpture.rotation.z =
      -0.18 + (paused ? 0 : Math.sin(elapsed * 0.16) * 0.07);
    sculpture.position.y = paused ? 0 : Math.sin(elapsed * 0.65) * 0.045;
    renderer.render(scene, camera);
    if (!paused) frame = requestAnimationFrame(draw);
  };
  const start = () => {
    if (!frame && !disposed) frame = requestAnimationFrame(draw);
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    start();
  };
  const pointer = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || paused) return;
    const rect = host.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  };
  const leave = () => {
    pointerX = 0;
    pointerY = 0;
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else start();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) start();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  intersectionObserver.observe(host);
  host.addEventListener('pointermove', pointer);
  host.addEventListener('pointerleave', leave);
  document.addEventListener('visibilitychange', visibility);
  const contextLost = (event: Event) => {
    event.preventDefault();
    host.dataset.fallback = 'true';
    cancelAnimationFrame(frame);
    frame = 0;
    visible = false;
  };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  host.appendChild(renderer.domElement);
  resize();
  renderer.render(scene, camera);
  host.dataset.ready = 'true';
  return {
    pause(value: boolean) {
      paused = value;
      cancelAnimationFrame(frame);
      frame = 0;
      start();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', pointer);
      host.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      geometry.dispose();
      rings.forEach((ring) => ring.material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.ready;
    },
  };
}
