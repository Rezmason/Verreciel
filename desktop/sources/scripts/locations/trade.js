//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationTrade extends Location {
  constructor (data) {
    const { name, wantID, giveID } = data
    super(data, new IconTrade(), name === 'tower' ? new StructureTower() : new StructureTrade())

    const give = verreciel.items[giveID]
    const want = verreciel.items[wantID]
    this.details = give.name

    this.isComplete = false
    this.isTradeAccepted = false

    this.wantPort = new ScenePortSlot(this, this.code + '_want')
    this.wantPort.addRequirement(want)
    this.wantPort.label.updateText('EMPTY', verreciel.red)
    this.givePort = new ScenePortSlot(this, this.code + '_give')
    this.givePort.addEvent(give)
  }

  whenStart () {
    super.whenStart()
    this.refresh()
  }

  // MARK: Panels -

  makePanel () {
    if (this.isComplete == true) {
      return null
    }

    let newPanel = new Panel()

    let text = new SceneLabel(
      'Trading ' +
        this.wantPort.requirement.name +
        '$For ' +
        this.givePort.event.name,
      0.1,
      Alignment.left
    )
    text.position.set(-1.5, 1, 0)
    newPanel.add(text)

    // Want

    this.wantPort.position.set(-1.2, -0.6, 0)
    this.wantPort.enable()
    newPanel.add(this.wantPort)

    // Give
    this.givePort.position.set(0, -0.5, 0)
    this.wantPort.add(this.givePort)

    this.wantPort.add(
      new SceneLine(
        [new THREE.Vector3(-0.125, 0, 0), new THREE.Vector3(-0.3, 0, 0)],
        verreciel.grey
      )
    )
    this.wantPort.add(
      new SceneLine(
        [new THREE.Vector3(-0.3, 0, 0), new THREE.Vector3(-0.3, -0.5, 0)],
        verreciel.grey
      )
    )
    this.wantPort.add(
      new SceneLine(
        [new THREE.Vector3(-0.3, -0.5, 0), new THREE.Vector3(-0.125, -0.5, 0)],
        verreciel.grey
      )
    )

    let wantLabel = new SceneLabel(
      'Trade Table',
      0.1,
      Alignment.left,
      verreciel.grey
    )
    wantLabel.position.set(-1.5, 0, 0)
    newPanel.add(wantLabel)

    this.givePort.disable()

    return newPanel
  }

  onUploadComplete () {
    verreciel.player.releasePort()
    this.refresh()
    verreciel.music.playEffect('beep2')
  }

  onDisconnect () {
    this.refresh()
  }

  refresh () {
    if (
      this.wantPort.event != null &&
      this.wantPort.event.name == this.wantPort.requirement.name
    ) {
      this.wantPort.disable()
      this.wantPort.label.updateText('Accepted', verreciel.cyan)
      this.givePort.enable()
      this.givePort.label.color = verreciel.white
      this.isTradeAccepted = true
    } else if (
      this.wantPort.event != null &&
      this.wantPort.event.name != this.wantPort.requirement.name
    ) {
      this.wantPort.enable()
      this.wantPort.label.updateText('Refused', verreciel.red)
      this.givePort.disable()
      this.isTradeAccepted = false
    } else {
      this.wantPort.enable()
      this.wantPort.label.updateText('Empty', verreciel.red)
      this.givePort.disable()
      this.isTradeAccepted = false
    }

    if (this.givePort.event == null) {
      this.onComplete()
    }
  }
}

class IconTrade extends Icon {
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
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(0, -this.size, 0)
        ],
        this.color
      )
    )
  }
}

class StructureTrade extends Structure {
  constructor () {
    super()

    this.root.position.set(0, 5, 0)

    let value1 = 3
    let value2 = 5

    this.nodes = 24
    var i = 0
    while (i < this.nodes) {
      let node = new Empty()

      node.add(
        new SceneLine(
          [
            new THREE.Vector3(-value2, value1 * i, 0),
            new THREE.Vector3(0, value1 * i, value2),
            new THREE.Vector3(0, value1 * i, value2),
            new THREE.Vector3(value2, value1 * i, 0),
            new THREE.Vector3(value2, value1 * i, 0),
            new THREE.Vector3(0, value1 * i + 2, -value2),
            new THREE.Vector3(0, value1 * i + 2, -value2),
            new THREE.Vector3(-value2, value1 * i, 0)
          ],
          verreciel.red
        )
      )

      this.root.add(node)
      i += 1
    }
  }

  onSight () {
    super.onSight()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    var i = 0
    for (let node of this.root.children) {
      node.rotation.y = degToRad(i * 360 / this.nodes)
      i += 1
    }

    verreciel.animator.commit()
  }

  onUndock () {
    super.onUndock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    var i = 0
    for (let node of this.root.children) {
      node.rotation.y = degToRad(i * 360 / this.nodes)
      i += 1
    }

    verreciel.animator.commit()
  }

  onDock () {
    super.onDock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (let node of this.root.children) {
      node.rotation.y = 0
    }

    verreciel.animator.commit()
  }

  onComplete () {
    super.onComplete()
  }

  sightUpdate () {
    this.root.rotation.y += degToRad(0.1)
  }
}

class StructureTower extends Structure {
  constructor () {
    super()

    this.root.position.set(0, 5, 0)
    this.root.add(new Macintosh(1))
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
