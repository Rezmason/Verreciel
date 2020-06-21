//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Cube extends SceneLine {
  constructor (size, color = verreciel.white) {
    super(
      [
        new THREE.Vector3(size, size, size),
        new THREE.Vector3(-size, size, size),
        new THREE.Vector3(size, size, -size),
        new THREE.Vector3(-size, size, -size),
        new THREE.Vector3(size, size, size),
        new THREE.Vector3(size, size, -size),
        new THREE.Vector3(-size, size, size),
        new THREE.Vector3(-size, size, -size),
        new THREE.Vector3(size, -size, size),
        new THREE.Vector3(-size, -size, size),
        new THREE.Vector3(size, -size, -size),
        new THREE.Vector3(-size, -size, -size),
        new THREE.Vector3(size, -size, size),
        new THREE.Vector3(size, -size, -size),
        new THREE.Vector3(-size, -size, size),
        new THREE.Vector3(-size, -size, -size)
        // new THREE.Vector3(size,size,size), new THREE.Vector3(size,-size,size),
        // new THREE.Vector3(size,size,-size), new THREE.Vector3(size,-size,-size),
        // new THREE.Vector3(-size,size,-size), new THREE.Vector3(-size,-size,-size),
        // new THREE.Vector3(-size,size,size), new THREE.Vector3(-size,-size,size),
      ],
      color
    )
  }
}
