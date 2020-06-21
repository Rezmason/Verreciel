//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Icon extends Empty {
  constructor () {
    super()

    this.color = new THREE.Vector4(0.5, 0, 0.5, 1) // Haha, weird!
    this.size = 0.1

    this.trigger = new Empty()
    this.mesh = new Empty()
    this.label = new SceneLabel('', 0.06, Alignment.center, verreciel.grey)
    this.label.position.set(0, -0.3, -0.35)
    this.add(this.label)

    this.wire = new SceneLine([], verreciel.grey)
    this.wire.position.set(0, 0, -0.01)
    this.wire.hide()
    this.add(this.wire)

    this.add(this.mesh)
    this.add(this.label)
    this.add(this.trigger)
    this.add(this.wire)

    this.marker = new Empty()
    this.marker.add(new SceneLine([
      new THREE.Vector3(0, this.size * 3, this.size),
      new THREE.Vector3(0, this.size * 4, this.size)
    ], verreciel.cyan)
    )
  }

  addHost (host) {
    this.host = host
    this.label.updateText(this.host.name)
  }

  whenStart () {
    super.whenStart()

    if (this.host.mapRequirementID != null) {
      this.label.color = verreciel.cyan
      this.add(this.marker)
    }
  }

  onUpdate () {
    if (this.host.name === 'aitasla') {
      this.color = verreciel.black
    } else if (this.host.isComplete == null) {
      this.color = verreciel.white
    } else if (this.host.isComplete == false) {
      this.color = verreciel.red
    } else if (this.host.isComplete == true) {
      this.color = verreciel.cyan
    }

    this.mesh.updateChildrenColors(this.color)
  }

  close () {
  }
}
