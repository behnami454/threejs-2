import './style.css'
import * as THREE from 'three'
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
// Debug
const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// define camera for ball
let sphereCamera;
// Scene
const scene = new THREE.Scene()
// Objects
// 3d football field
const urls = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
let loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);
//  end of 3d football field
// begin of cube camera that use for reflection
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
	format: THREE.RGBFormat,
	generateMipmaps: true,
	minFilter: THREE.LinearMipmapLinearFilter
});
sphereCamera = new THREE.CubeCamera(1, 10000, cubeRenderTarget)
sphereCamera.position.set(0, 100, 0)
scene.add(sphereCamera);
//  end of cube camera
// sphere geometry
let spheregeo = new THREE.SphereGeometry(200, 50, 50)
// Materials
// sphere material
let sphereMaterial = new THREE.MeshBasicMaterial({
	envMap: sphereCamera.renderTarget
});
// Mesh
// sphere mesh
let sphere = new THREE.Mesh(spheregeo, sphereMaterial)
sphere.position.set(0, 100, 0)
scene.add(sphere)
// Lights
const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}
window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1500)
camera.position.x = 0
camera.position.y = 400
camera.position.z = 1000
scene.add(camera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableZoom = false;
// controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
	const elapsedTime = clock.getElapsedTime()
	// Update objects
	// Update Orbital Controls
	// controls.update()
	// Render
	renderer.render(scene, camera)
	sphereCamera.updateCubeMap(renderer, scene)
	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}
tick()