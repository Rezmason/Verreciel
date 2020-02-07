//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationHarvest extends Location {
  constructor (data) {
    // assertArgs(arguments, 4);
    super(data, new IconHarvest(), new StructureHarvest())

    this.grows = Item.like(verreciel.items[data.harvestedID])

    this.details = this.grows.name

    this.generationCountdown = 0
    this.generationRate = 160

    this.port = new ScenePortSlot(
      this,
      this.code + '_' + this.grows.name,
      Alignment.center,
      false
    )
    this.port.enable()

  }

  whenStart () {
    // assertArgs(arguments, 0);
    super.whenStart()
    this.generate()
    this.port.addEvent(this.grows)
    verreciel.ghost.report(LogType.harvest, this.grows.code)
  }

  generate () {
    // assertArgs(arguments, 0);
    delay(1, this.generate.bind(this))

    if (this.port == null) {
      return
    }
    if (this.timeLeftLabel == null) {
      return
    }

    this.progressRadial.updatePercent(
      this.generationCountdown / this.generationRate * 100
    )

    if (
      this.generationCountdown < this.generationRate &&
      this.port.hasEvent(this.grows) == false
    ) {
      this.generationCountdown += 1
    } else {
      this.refresh()
      this.generationCountdown = 0
      if (!this.port.hasEvent(this.grows)) {
        this.port.addEvent(this.grows)
        verreciel.ghost.report(LogType.harvest, this.grows.code)
      }
      this.structure.update()
    }

    if (this.port.hasEvent(this.grows) == true) {
      this.timeLeftLabel.updateText('')
    } else {
      this.timeLeftLabel.updateText(
        (this.generationRate - this.generationCountdown).toFixed(0)
      )
    }
  }

  makePanel () {
    // assertArgs(arguments, 0);
    let newPanel = new Panel()

    this.timeLeftLabel = new SceneLabel('', 0.15, Alignment.center)
    this.timeLeftLabel.position.set(0, 0.5, 0)
    newPanel.add(this.timeLeftLabel)

    this.progressRadial = new SceneProgressRadial(1.2, 52, verreciel.cyan)
    newPanel.add(this.progressRadial)

    newPanel.add(this.port)

    return newPanel
  }

  onUploadComplete () {
    // assertArgs(arguments, 0);
    super.onUploadComplete()

    this.refresh()
    this.structure.update()
  }

  refresh () {
    // assertArgs(arguments, 0);
    if (this.port.hasEvent(this.grows) != true) {
      this.icon.mesh.updateChildrenColors(verreciel.grey)
    } else {
      this.icon.mesh.updateChildrenColors(verreciel.white)
    }
  }
}

class IconHarvest extends Icon {
  constructor () {
    // assertArgs(arguments, 0);
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
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(0, -this.size, 0)
        ],
        this.color
      )
    )
  }
}

class StructureHarvest extends Structure {
  constructor () {
    // assertArgs(arguments, 0);
    super()

    this.root.position.set(0, 5, 0)

    let color = verreciel.cyan
    let value1 = 7
    let nodes = 45
    var i = 0
    while (i < nodes) {
      let node = new Empty()
      node.rotation.y = degToRad(i * (360 / nodes))
      node.add(
        new SceneLine(
          [
            new THREE.Vector3(0, 0, value1),
            new THREE.Vector3(0, 5, value1),
            new THREE.Vector3(0, 5, value1),
            new THREE.Vector3(0.5, 5.5, value1),
            new THREE.Vector3(0, 5, value1),
            new THREE.Vector3(-0.5, 5.5, value1)
          ],
          color
        )
      )
      this.root.add(node)
      i += 1
    }
  }

  update () {
    // assertArgs(arguments, 0);
    super.update()

    if (this.host.port.hasEvent() != true) {
      this.root.updateChildrenColors(verreciel.grey)
    } else {
      this.root.updateChildrenColors(verreciel.cyan)
    }
  }

  sightUpdate () {
    // assertArgs(arguments, 0);
    super.sightUpdate()

    this.root.rotation.y += degToRad(0.1)
  }
}
