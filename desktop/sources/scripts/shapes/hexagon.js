//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Hexagon extends SceneLine {
  constructor (size, color = verreciel.white) {
    let angle = 1.5

    super(
      [
        new THREE.Vector3(0, 0, size),
        new THREE.Vector3(size / angle, 0, size / angle),
        new THREE.Vector3(size / angle, 0, -size / angle),
        new THREE.Vector3(size / angle, 0, size / angle),
        new THREE.Vector3(size / angle, 0, -size / angle),
        new THREE.Vector3(0, 0, -size),
        new THREE.Vector3(0, 0, size),
        new THREE.Vector3(-size / angle, 0, size / angle),
        new THREE.Vector3(-size / angle, 0, -size / angle),
        new THREE.Vector3(-size / angle, 0, size / angle),
        new THREE.Vector3(-size / angle, 0, -size / angle),
        new THREE.Vector3(0, 0, -size)
      ],
      color
    )
  }
}
