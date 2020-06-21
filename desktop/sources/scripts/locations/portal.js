//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationPortal extends Location {
  constructor (data) {
    super(data, new IconPortal(), new StructurePortal())

    this.details = 'transit'
    this.keyLabel = new SceneLabel(
      'input key',
      0.1,
      Alignment.center,
      verreciel.white
    )
    this.destinationLabel = new SceneLabel(
      '--',
      0.08,
      Alignment.center,
      verreciel.grey
    )
    this.pilotPort = new ScenePort(this, this.code + '_pilot')
    this.pilotLabel = new SceneLabel(
      'pilot',
      0.1,
      Alignment.center,
      verreciel.grey
    )
    this.thrusterPort = new ScenePort(this, this.code + '_thruster')
    this.thrusterLabel = new SceneLabel(
      'thruster',
      0.08,
      Alignment.center,
      verreciel.grey
    )
    this.isPortEnabled = true
  }

  // MARK: Panel -

  makePanel () {
    let newPanel = new Panel()

    this.pilotPort.add(this.pilotLabel)
    this.thrusterPort.add(this.thrusterLabel)

    newPanel.add(this.keyLabel)
    newPanel.add(this.pilotPort)
    newPanel.add(this.thrusterPort)

    this.keyLabel.position.set(0, 0.75, 0)
    this.keyLabel.add(this.destinationLabel)
    this.destinationLabel.position.set(0, -0.4, 0)

    this.pilotPort.position.set(0.8, -0.4, 0)
    this.pilotLabel.position.set(0, -0.4, 0)

    this.thrusterPort.position.set(-0.8, -0.4, 0)
    this.thrusterLabel.position.set(0, -0.4, 0)

    newPanel.add(
      new SceneLine(
        [new THREE.Vector3(0.8, -0.275, 0), new THREE.Vector3(0.8, -0.1, 0)],
        verreciel.grey
      )
    )
    newPanel.add(
      new SceneLine(
        [new THREE.Vector3(-0.8, -0.275, 0), new THREE.Vector3(-0.8, -0.1, 0)],
        verreciel.grey
      )
    )
    newPanel.add(
      new SceneLine(
        [new THREE.Vector3(0.8, -0.1, 0), new THREE.Vector3(-0.8, -0.1, 0)],
        verreciel.grey
      )
    )

    newPanel.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(0, -0.1, 0)],
        verreciel.grey
      )
    )

    this.thrusterPort.addEvent(verreciel.items.warpDrive)

    return newPanel
  }

  onConnect () {
    this.validate()
  }

  onDisconnect () {
    this.validate()
  }

  onDock () {
    super.onDock()

    this.validate()
  }

  onWarp () {
    if (this.structure instanceof StructurePortal) {
      this.structure.isWarping = true
      this.structure.onWarp()
    }
  }

  validate () {
    if (verreciel.intercom.port.isReceivingItemOfType(ItemTypes.key) == true) {
      const location = this.getLocation(verreciel.intercom.port.origin.event)
      if (location != null && location == verreciel.capsule.lastLocation) {
        this.inactive()
      } else {
        this.unlock()
      }
    } else {
      this.lock()
    }
  }

  getLocation(key) {
    if (key == null || !(key instanceof Item)) {
      return null
    }
    const address = key.portalAddress
    if (address == null) {
      return null
    }
    return verreciel.universe[address.systemID][address.id]
  }

  inactive () {
    this.pilotPort.removeEvent()
    this.pilotPort.disable()
    this.thrusterPort.disable()
    this.keyLabel.updateText('error', verreciel.red)

    this.structure.root.updateChildrenColors(verreciel.red)
  }

  lock () {
    this.pilotPort.removeEvent()
    this.pilotPort.disable()
    this.thrusterPort.disable()
    this.keyLabel.updateText('no key', verreciel.red)
    this.destinationLabel.updateText('--')

    if (this.structure instanceof StructurePortal) {
      this.structure.onLock()
    }
  }

  unlock () {
    let key = verreciel.intercom.port.origin.event

    if (!(key instanceof Item)) {
      return
    }

    let destination = this.getLocation(key)
    destination.isKnown = true

    this.keyLabel.updateText(key.name, verreciel.cyan)
    this.destinationLabel.updateText(
      'to ' + destination.system + ' ' + destination.name
    )

    this.pilotPort.addEvent(destination)
    this.pilotPort.enable()
    this.thrusterPort.enable()

    if (this.structure instanceof StructurePortal) {
      this.structure.onUnlock()
    }
  }
}

class IconPortal extends Icon {
  constructor () {
    super()

    this.color = verreciel.white

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
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(0.075, 0, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(-0.075, 0, 0)
        ],
        this.color
      )
    )
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

class StructurePortal extends Structure {
  constructor () {
    super()

    this.isWarping = false

    this.root.position.set(0, 10, 0)

    let nodes = 52
    var i = 0
    while (i < nodes) {
      let node = new Empty()
      let line = new SceneLine(
        [new THREE.Vector3(2, 2, 0), new THREE.Vector3(0, 0, 10)],
        verreciel.red
      )
      line.position.set(-2, 0, 0)
      node.add(line)
      this.root.add(node)
      node.rotation.y = degToRad(i * 360 / nodes)
      i += 1
    }
  }

  onSight () {
    super.onSight()

    this.onLock()
  }

  onWarp () {
    this.root.updateChildrenColors(verreciel.cyan)

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 1.5

    for (let node of this.root.children) {
      node.children[0].position.set(2, 1, 2)
    }

    verreciel.animator.commit()
  }

  onUnlock () {
    this.root.updateChildrenColors(verreciel.cyan)

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (let node of this.root.children) {
      node.children[0].position.set(0, 0, 0)
    }

    verreciel.animator.commit()
  }

  onLock () {
    if (this.isWarping == true) {
      return
    }

    this.root.updateChildrenColors(verreciel.red)

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (let node of this.root.children) {
      node.children[0].position.set(-2, 0, 0)
    }

    verreciel.animator.commit()
  }

  onLeave () {
    super.onLeave()

    this.isWarping = false
  }
}
