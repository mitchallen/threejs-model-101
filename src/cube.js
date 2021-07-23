// 1. Define and export a cube factory class
export class CubeFactory {

  // 2. Define a static create method to return new cubes
  static create( spec = {} ) {

    // 3. Setup default values or use arguments
    let {
      name = "cube", 
      color = "#FF00FF",
      width = 1,
      height = 1,
      depth = 1,
      x = 0.0,
      y = 0.0,
      z = 0.0,
    } = spec;

    // 4. Use ThreeJS to define a 3D cube
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshBasicMaterial({ color: color });
    var cube = new THREE.Mesh(geometry, material);

    // 5. Use the name property to specify a type
    cube.name = name;

    // 6. Using ThreeJS methods on the cube, move it to a specific offset
    cube.translateX(x);
    cube.translateY(y);
    cube.translateZ(z);

    // 7. Return the new cube
    return cube;
  }
}