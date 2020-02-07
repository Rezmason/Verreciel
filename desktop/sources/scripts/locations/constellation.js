//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationConstellation extends Location {
  constructor (data) {
    // assertArgs(arguments, 4);
    const structure = new (structureClassesByID[data.structureID])()
    super(data, new IconConstellation(), structure)
    this.isTargetable = false
  }

  onApproach () {
    // assertArgs(arguments, 0);
    // super.onApproach() // Disable docking

    verreciel.space.startInstance(this)
    this.update()
  }
}

class IconConstellation extends Icon {
  constructor () {
    // assertArgs(arguments, 0);
    super()
    this.size = 0.02
    this.mesh.add(
      new SceneLine(
        [
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(0, this.size, 0)
        ],
        this.color
      )
    )
    this.label.hide()
  }
}

class StructureTunnel extends Structure {
  constructor () {
    // assertArgs(arguments, 0);
    super()

    let hex1 = new Hexagon(6, verreciel.grey)
    hex1.position.set(0, 0, 2)
    this.root.add(hex1)
    let hex2 = new Hexagon(6, verreciel.grey)
    hex2.position.set(0, 0, 0)
    this.root.add(hex2)
    let hex3 = new Hexagon(6, verreciel.grey)
    hex3.position.set(0, 0, -2)
    this.root.add(hex3)
    let hex4 = new Hexagon(6, verreciel.grey)
    hex4.position.set(0, 0, 4)
    this.root.add(hex4)
    let hex5 = new Hexagon(6, verreciel.grey)
    hex5.position.set(0, 0, -4)
    this.root.add(hex5)
  }
}

class StructureDoor extends Structure {
  constructor () {
    // assertArgs(arguments, 0);
    super()

    this.root.add(new Diamond(5, verreciel.grey))
    this.root.add(new Diamond(3, verreciel.grey))
    this.root.add(new Diamond(1, verreciel.grey))
  }

  sightUpdate () {
    // assertArgs(arguments, 0);
    super.sightUpdate()

    this.root.rotation.y += 0.001
  }
}

const structureClassesByID = {
  tunnel: StructureTunnel,
  door: StructureDoor
}
