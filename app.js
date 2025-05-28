// Setting up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);  // Set background to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry (a cube for example) and material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffa500, wireframe: true });  // Set cubes to orange
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Mouse interaction variables
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Resize handling for responsive layout
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Scroll interaction
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  cube.scale.set(1 + scrollY / 500, 1 + scrollY / 500, 1 + scrollY / 500); // Scale cube based on scroll
});

// Create a 5x5 grid of cubes (half the original number)
const cubes = [];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500, wireframe: true });  // Set all cubes to orange
    const newCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    newCube.position.set(i - 2, j - 2, Math.random() * 5);  // Adjust positions to fit the smaller grid
    cubes.push(newCube);
    scene.add(newCube);
  }
}

// Animation loop to render the scene
function animateCubes() {
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Interactivity with mouse
  cube.rotation.x += 0.01 + mouseY * 0.05; // React to mouseY
  cube.rotation.y += 0.01 + mouseX * 0.05; // React to mouseX

  animateCubes(); // Animate all cubes

  renderer.render(scene, camera);
}

animate();
