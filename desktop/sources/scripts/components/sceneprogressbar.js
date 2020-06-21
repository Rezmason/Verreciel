//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class SceneProgressBar extends Empty {
  constructor (width, color = verreciel.red) {
    super()
    this.percent = 0
    this.width = width
    this.color = color
    this.addGeometry()
  }

  addGeometry () {
    this.progressLine = new SceneLine(
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
      this.color
    )
    this.add(this.progressLine)
    this.remainingLine = new SceneLine(
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(this.width, 0, 0)],
      verreciel.grey
    )
    this.add(this.remainingLine)
  }

  updatePercent (percent) {
    let to = this.width * (percent / 100)

    this.progressLine.updateVertices([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(to, 0, 0)
    ])
    this.remainingLine.updateVertices([
      new THREE.Vector3(to, 0, 0),
      new THREE.Vector3(this.width, 0, 0)
    ])
  }
}
