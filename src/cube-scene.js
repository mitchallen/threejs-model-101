// 1. Import the cube class factory
import { CubeFactory } from './cube.js';

// 2. Define and export a scene factory class
export class CubeSceneFactory {

  // 3. Define a static create method to return new scenes filled with cubes
  static create(spec = {}) {

    // 4. Setup default values or use spec arguments
    let {
      clear = "#AAAAAA",
      // fov — Camera frustum vertical field of view
      fov = 75,
      // aspect — Camera frustum aspect ratio
      aspectRatio = window.innerWidth / window.innerHeight,
      near = 0.1,  // near — Camera frustum near plane
      far = 1000, // far — Camera frustum far plane.
    } = spec;

    // 5. Define a list of options for cubes to be created
    var cubeOptions = [
      { color: "#FF0000" },
      { color: "#00FF00", width: 0.5, height: 2.0, depth: 0.5 },
      { color: "#0000FF", width: 2.0, height: 0.5, depth: 0.5 },
      { color: "#FF00FF", width: 0.5, height: 0.5, depth: 2.0 },
      { color: "#FFFF00", x: 3.0 },
      { color: "#FF6619", x: -3.0 },
      { color: "#AAAAAA", y: 2.0, z: -0.05, width: 0.5, height: 0.5, depth: 2 },
      { color: "#04D9FF", y: -2.0, z: 0.05, width: 0.5, height: 0.5, depth: 2 },
    ];

    // 6. Setup a ThreeJS renderer to render the scene
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(clear);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 7. Create a new ThreeJS scene
    var scene = new THREE.Scene();

    // 8. Create a ThreeJS camera
    var camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    camera.position.z = 5; // Set camera position

    let loader = new THREE.GLTFLoader();

    loader.load('/models/wheg-body-01.glb', (gltf) => {
      let robot = gltf.scene;
      robot.name = "wheg";
      robot.scale.set(0.03, 0.03, 0.03);
      robot.position.set(0, 0, 0);
      scene.add(robot);
    });

    // 9. Add several cubes to the scene using the cubeOptions list of parameters
    // cubeOptions.forEach(options => scene.add(CubeFactory.create(options)));

    // 10. Define a cube scene with methods to return
    var cubeScene = {

      // 11. Define a method on the cube scene to handle browser window resizing
      resize: function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      },

      // 12. Define a method to be called when the scene is rendered
      step: function () {
        scene.traverse(function (cube) {
          if (cube.name === "wheg") {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.02;
          }
        });

        renderer.render(scene, camera);
      }
    };

    // 13. Return the new cube scene
    return cubeScene;
  }
}