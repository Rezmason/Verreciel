//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationTransit extends Location {
  constructor (data) {
    super(data, new IconTransit(), new StructureTransit())
  }

  // MARK: Panel -

  makePanel () {
    let newPanel = new Panel()

    return newPanel
  }
}

class IconTransit extends Icon {
  constructor () {
    super()

    this.label.hide()

    this.size = 0.05
    this.mesh.add(
      new SceneLine(
        [
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(0, -this.size, 0)
        ],
        this.color
      )
    )
  }
}

class StructureTransit extends Structure {
  constructor () {
    super()
  }
}
