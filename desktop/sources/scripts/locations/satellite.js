//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationSatellite extends Location {
  constructor (data) {
    const {
      name,
      message,
      itemID
    } = data
    super(
      data,
      new IconSatellite(),
      name === 'wreck' ? new StructureSpaceship() : name == 'spawn' ? new Structure() : new StructureSatellite()
    )
    const item = verreciel.items[itemID]
    this.details = item.name
    this.isComplete = false
    this.message = message

    this.port = new ScenePortSlot(
      this,
      this.code + '_' + item.name,
      Alignment.center,
      true
    )
    this.port.position.set(0, -0.4, 0)
    this.port.addEvent(item)
    this.port.enable()

    this.update()
  }

  // MARK: Panel

  makePanel () {
    if (this.isComplete === true) {
      return null
    }

    let newPanel = new Panel()
    let text = new SceneLabel(this.message, 0.1, Alignment.left)
    text.position.set(-1.5, 1, 0)
    newPanel.add(text)
    newPanel.add(this.port)

    return newPanel
  }

  onDock () {
    super.onDock()
    this.port.refresh()
  }

  update () {
    super.update()

    if (this.port.event == null) {
      this.onComplete()
    }
  }

  onUploadComplete () {
    this.onComplete()
    this.structure.update()
  }
}

class IconSatellite extends Icon {
  constructor () {
    super()

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

class StructureSatellite extends Structure {
  constructor () {
    super()

    let nodes = 4

    this.root.position.set(0, 7.5, 0)

    var i = 0
    while (i < nodes) {
      let axis = new Empty()
      axis.rotation.y = degToRad(i * (360 / nodes))

      this.root.add(axis)

      let shape = new Cube(2, verreciel.red)
      shape.position.x = 0
      axis.add(shape)

      let shape2 = new Cube(2, verreciel.red)
      shape2.rotation.z = degToRad(90)
      shape.add(shape2)

      let shape3 = new Cube(2, verreciel.red)
      shape3.rotation.y = degToRad(90)
      shape.add(shape3)

      let shape4 = new Cube(2, verreciel.red)
      shape4.rotation.x = degToRad(90)
      shape.add(shape4)

      i += 1
    }
  }

  onSight () {
    super.onSight()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (let node of this.root.children) {
      for (let subnode of node.children) {
        subnode.position.x = 4
      }
    }

    verreciel.animator.commit()
  }

  onUndock () {
    super.onUndock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (let node of this.root.children) {
      for (let subnode of node.children) {
        subnode.position.x = 4
      }
    }

    verreciel.animator.commit()
  }

  onDock () {
    super.onDock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (let node of this.root.children) {
      for (let subnode of node.children) {
        subnode.position.x = 2
      }
    }

    verreciel.animator.commit()
  }

  onComplete () {
    super.onComplete()

    this.root.updateChildrenColors(verreciel.cyan)
  }

  sightUpdate () {
    this.root.rotation.y += degToRad(0.1)
  }

  dockUpdate () {
    for (let node of this.root.children) {
      for (let subnode of node.children) {
        subnode.rotation.z += degToRad(0.25)
      }
    }
  }
}

class StructureSpaceship extends Structure {
  constructor () {
    super()

    this.root.position.set(0, 5, 0)
    this.root.add(new Spaceship(5))
  }

  onSight () {
    super.onSight()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    this.root.rotation.y = degToRad(25)
    this.root.rotation.z = degToRad(25)
    this.root.rotation.x = degToRad(25)

    verreciel.animator.commit()
  }

  onComplete () {
    super.onComplete()

    this.root.updateChildrenColors(verreciel.grey)
  }

  dockUpdate () {
    this.root.rotation.y += degToRad(0.1)
    this.root.rotation.x += degToRad(0.05)
    this.root.rotation.z += degToRad(0.025)
  }

  sightUpdate () {
    super.sightUpdate()

    this.root.rotation.y += degToRad(0.1)
    this.root.rotation.x += degToRad(0.05)
    this.root.rotation.z += degToRad(0.025)
  }
}
