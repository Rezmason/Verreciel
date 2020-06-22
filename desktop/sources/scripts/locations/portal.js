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
    this.keyPort = new ScenePort(this, this.code + '_key')
    this.keyPort.enable()
    this.thrusterPort = new ScenePort(this, this.code + '_thruster')
    this.thrusterLabel = new SceneLabel(
      'thruster',
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
  }

  whenStart () {
    super.whenStart()
    this.refresh()
  }

  // MARK: Panel -

  makePanel () {
    const newPanel = new Panel()

    this.thrusterPort.add(this.thrusterLabel)
    this.pilotPort.add(this.pilotLabel)

    newPanel.add(this.keyLabel)
    newPanel.add(this.keyPort)
    newPanel.add(this.thrusterPort)
    newPanel.add(this.pilotPort)

    this.keyLabel.position.set(0, 0.75, 0)

    this.keyPort.position.set(0, 0.2, 0)

    this.thrusterPort.position.set(-0.8, -0.4, 0)
    this.thrusterLabel.position.set(0, -0.4, 0)

    this.pilotPort.position.set(0.8, -0.4, 0)
    this.pilotLabel.position.set(0, -0.4, 0)

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

    return newPanel
  }

  onWarp () {
    if (this.structure instanceof StructurePortal) {
      this.structure.isWarping = true
      this.structure.onWarp()
    }
  }

  onConnect () {
    this.refresh()
  }

  onDisconnect () {
    this.refresh()
  }

  refresh () {
    if (this.keyPort.isReceivingItemOfType(ItemTypes.key) == true) {
      const location = this.getLocation(this.keyPort.origin.event)
      if (location == this) {
        this.inactive()
      } else {
        this.unlock()
      }
    } else {
      this.lock()
    }
  }

  getLocation (key) {
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
    this.thrusterPort.removeEvent()
    this.thrusterPort.disable()
    this.keyLabel.updateText('error', verreciel.red)

    this.structure.root.updateChildrenColors(verreciel.red)
  }

  lock () {
    this.pilotPort.removeEvent()
    this.pilotPort.disable()
    this.thrusterPort.removeEvent()
    this.thrusterPort.disable()
    this.keyLabel.updateText('no key', verreciel.red)

    if (this.structure instanceof StructurePortal) {
      this.structure.onLock()
    }
  }

  unlock () {
    const key = this.keyPort.origin.event

    if (!(key instanceof Item)) {
      return
    }

    const destination = this.getLocation(key)
    destination.isKnown = true

    this.keyLabel.updateText(
      destination.type === "aitasla"
      ? destination.name
      : destination.system + ' ' + destination.name,
      verreciel.cyan
    )

    this.pilotPort.addEvent(destination)
    this.pilotPort.enable()
    this.thrusterPort.addEvent(verreciel.items.warpDrive)
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

    const nodes = 52
    var i = 0
    while (i < nodes) {
      const node = new Empty()
      const line = new SceneLine(
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

    for (const node of this.root.children) {
      node.children[0].position.set(2, 1, 2)
    }

    verreciel.animator.commit()
  }

  onUnlock () {
    this.root.updateChildrenColors(verreciel.cyan)

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (const node of this.root.children) {
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

    for (const node of this.root.children) {
      node.children[0].position.set(-2, 0, 0)
    }

    verreciel.animator.commit()
  }

  onLeave () {
    super.onLeave()

    this.isWarping = false
  }
}
