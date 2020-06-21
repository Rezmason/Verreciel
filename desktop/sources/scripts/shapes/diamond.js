//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Diamond extends SceneLine {
  constructor (size, color = verreciel.white) {

    super(
      [
        new THREE.Vector3(0, 0, size),
        new THREE.Vector3(size, 0, 0),
        new THREE.Vector3(size, 0, 0),
        new THREE.Vector3(0, 0, -size),
        new THREE.Vector3(0, 0, -size),
        new THREE.Vector3(-size, 0, 0),
        new THREE.Vector3(-size, 0, 0),
        new THREE.Vector3(0, 0, size)
      ],
      color
    )
  }
}
