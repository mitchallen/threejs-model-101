// 1. Add reminder for how to reference the script
/*
  In a browser must use script type="module" parameter:

  <script type="module" src="./src/app.js"></script>
 */

// 2. Import the cube scene factory
import {CubeSceneFactory} from './cube-scene.js';

// 3. Create a new cube scene using the factory
var cubeScene = CubeSceneFactory.create({
  clear: "#FF0000"
});

// 4. Define a render function
var render = function() {
  requestAnimationFrame( render );
  cubeScene.step();
}

// 5. Add and define a listener for browser resize events
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    cubeScene.resize();
}

// 6. Call render to initiate the scene display
render();