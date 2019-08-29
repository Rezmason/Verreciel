//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Systems {}
setEnumValues(Systems, ['loiqe', 'valen', 'senni', 'usul', 'aitasla', 'unknown'])

class Location extends Event {
  constructor (data, icon, structure) {
    const {
      id,
      type,
      name,
      system,
      at,
      mapRequirementID,
      connectedAddress
    } = data
    // assertArgs(arguments, 5);
    super(name, new THREE.Vector2(at.x, at.y), 'unknown', verreciel.grey, false)

    this.system = system
    this.icon = icon
    this.structure = structure
    this.code = system + '-' + name
    this.id = id
    this.type = type
    this.storage = []
    this.mapRequirementID = mapRequirementID
    if (connectedAddress != null) {
      this.connectedAddress = {
        id: connectedAddress.id,
        systemID: connectedAddress.systemID != null ? connectedAddress.systemID : system
      }
    }
    this.isDocked = false
    this.inCollision = false
    this.inApproach = false
    this.inDiscovery = false
    this.inSight = false
    this.isTargetable = true
    this.isTargeted = false
    this.isKnown = false
    this.isSelected = false
    this.isComplete = null
    this.isPortEnabled = false

    this.structure.addHost(this)
    this.icon.addHost(this)

    const trigger = new SceneTrigger(this, 'location_' + this.code, 1, 1, 0)
    trigger.position.set(0, 0, -0.1)
    this.icon.add(trigger)
  }

  makePanel () {
    return null
  }

  // MARK: System -

  whenStart () {
    // assertArgs(arguments, 0);
    this.panel = this.makePanel()
    this.icon.position.set(this.at.x, this.at.y, 0)
    this.distance = distanceBetweenTwoPoints(verreciel.capsule.at, this.at)
    this.angle = this.calculateAngle()
    this.align = this.calculateAlignment()
    this.icon.onUpdate()
  }

  refresh () {
    // assertArgs(arguments, 0);
  }

  whenRenderer () {
    // assertArgs(arguments, 0);

    this.icon.position.set(this.at.x, this.at.y, 0)
    this.distance = distanceBetweenTwoPoints(verreciel.capsule.at, this.at)
    this.angle = this.calculateAngle()
    this.align = this.calculateAlignment()

    if (this.distance <= Settings.sight) {
      if (this.inSight == false) {
        this.onSight()
        this.inSight = true
      }
      this.sightUpdate()
    } else {
      this.inSight = false
    }

    if (this.distance <= Settings.approach) {
      if (this.inApproach == false) {
        this.inApproach = true
        this.onApproach()
      }
      this.approachUpdate()
    } else {
      this.inApproach = false
    }

    if (this.distance <= Settings.collision) {
      if (this.inCollision == false) {
        this.inCollision = true
        this.onCollision()
      }
    } else {
      this.inCollision = false
    }

    if (
      verreciel.capsule.isDocked == true &&
      verreciel.capsule.location == this
    ) {
      this.dockUpdate()
    }

    this.radarCulling()
  }

  onRadarView () {
    // assertArgs(arguments, 0);
    this.icon.label.opacity = 1
  }

  onHelmetView () {
    // assertArgs(arguments, 0);
    this.icon.label.opacity = 0
  }

  onSight () {
    // assertArgs(arguments, 0);
    this.update()
    this.icon.onUpdate()

    if (this.isDocked) {
      this.structure.onDock()
    } else {
      this.structure.onSight()
    }
  }

  onApproach () {
    // assertArgs(arguments, 0);
    if (this.isVisible() !== true) {
      return
    }
    verreciel.space.startInstance(this)
    // Don't try to dock if there is already a target
    if (
      (verreciel.radar.port.hasEvent() == true &&
        verreciel.radar.port.event == this) ||
      verreciel.capsule.isFleeing == true
    ) {
      verreciel.capsule.dock(this)
    } else if (verreciel.radar.port.hasEvent() == false) {
      verreciel.capsule.dock(this)
    }
    this.update()
  }

  onCollision () {
    // assertArgs(arguments, 0);
    this.update()
  }

  onDock () {
    // assertArgs(arguments, 0);
    if (
      verreciel.thruster.isLocked &&
      verreciel.universe.loiqe.city.isKnown == true
    ) {
      verreciel.thruster.unlock()
    }

    this.isDocked = true
    this.isKnown = true
    this.update()
    this.structure.onDock()
    this.icon.onUpdate()
    verreciel.exploration.refresh()
    verreciel.music.playEffect('beep2')
  }

  onUndock () {
    // assertArgs(arguments, 0);
    this.isDocked = false
    this.retrieveStorage()
    this.structure.onUndock()
    verreciel.exploration.refresh()
  }

  retrieveStorage () {
    // assertArgs(arguments, 0);
    if (this.storage.length == 0) {
      return
    }

    for (const port of this.storage) {
      if (port.hasItem() == true) {
        verreciel.cargo.addItem(port.event)
        port.removeEvent()
      }
    }
  }

  onComplete () {
    // assertArgs(arguments, 0);
    this.isComplete = true
    verreciel.progress.refresh()
    this.icon.onUpdate()
    this.structure.onComplete()
    this.panel = this.makePanel()
    if (verreciel.intercom.port.event == this) {
      verreciel.intercom.complete()
    }
    verreciel.music.playEffect('beep1')
  }

  update () {
    super.update()
    this.icon.update()
  }

  sightUpdate () {
    // assertArgs(arguments, 0);
    this.structure.sightUpdate()
  }

  approachUpdate () {
    // assertArgs(arguments, 0);
  }

  collisionUpdate () {
    // assertArgs(arguments, 0);
  }

  dockUpdate () {
    // assertArgs(arguments, 0);
    this.structure.dockUpdate()
  }

  radarCulling () {
    // assertArgs(arguments, 0);

    if (this.isReach() === true && this.isVisible() === true) {
      this.icon.show()
    } else {
      this.icon.hide()
    }

    // Connections
    if (this.connectedLocation != null) {
      if (this.connectedLocation.opacity != 0) {
        this.icon.wire.show()
      } else {
        this.icon.wire.hide()
      }
    }
  }

  connect () {
    if (this.connectedAddress == null) {
      return
    }
    const connectedSystemID = this.connectedAddress.systemID
    const connectedID = this.connectedAddress.id
    this.connectedLocation = verreciel.universe[connectedSystemID][connectedID]
    this.icon.wire.updateVertices([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        this.connectedLocation.at.x - this.at.x,
        this.connectedLocation.at.y - this.at.y,
        0
      )
    ])
  }

  // MARK: Events -

  touch (id) {
    // assertArgs(arguments, 1);
    if (this.isTargetable == false) {
      return false
    }
    if (verreciel.thruster.isLocked == true && verreciel.game.state > 2) {
      return false
    }
    if (verreciel.radar.port.event == null) {
      verreciel.radar.addTarget(this)
      verreciel.music.playEffect('click3')
    } else if (verreciel.radar.port.event == this) {
      verreciel.radar.removeTarget()
      verreciel.music.playEffect('click2')
    } else {
      verreciel.radar.addTarget(this)
      verreciel.music.playEffect('click1')
    }
    if (verreciel.radar.port.isConnectedToPanel(verreciel.console) == true) {
      verreciel.console.onConnect()
    }
    return true
  }

  calculateAngle () {
    // assertArgs(arguments, 0);
    const angle = angleBetweenTwoPoints(
      verreciel.capsule.at,
      this.at,
      verreciel.capsule.at
    )
    return (360 - (angle - 90)) % 360
  }

  calculateAlignment (direction = verreciel.capsule.direction) {
    // assertArgs(arguments, 0);
    var diff =
      Math.max(direction, this.angle) - Math.min(direction, this.angle)
    if (diff > 180) {
      diff = 360 - diff
    }

    return diff
  }

  // MARK: Storage -

  storedItems () {
    // assertArgs(arguments, 0);
    var collection = []
    for (const port of this.storage) {
      if (port.hasEvent() == true && port.event.isDestroyable == false) {
        collection.push(port.event)
      }
    }
    return collection
  }

  payload () {
    // assertArgs(arguments, 0);
    return new ConsolePayload([
      new ConsoleData('Name', this.name),
      new ConsoleData('System', this.system),
      new ConsoleData('Position', verreciel.space.printPosition(this.at)),
      new ConsoleData('Distance', verreciel.space.printDistance(this.distance)),
      new ConsoleData('Angle', this.angle.toFixed(0)),
      new ConsoleData(this.details)
    ])
  }

  isReach () {
    const verticalDistance = Math.abs(verreciel.capsule.at.y - this.at.y)
    const horizontalDistance = Math.abs(verreciel.capsule.at.x - this.at.x)
    return (verticalDistance <= 1.5 && horizontalDistance <= 1.5) || verreciel.radar.overviewMode == true
  }

  isVisible () {
    if (!this.mapRequirementID) {
      return true
    }
    if (this.mapRequirementID && verreciel.nav.port.event && this.mapRequirementID === verreciel.nav.port.event.id) {
      return true
    }
    // Map3 sees all
    if (verreciel.nav.port.event && verreciel.nav.port.event.id === verreciel.items.map3.id) {
      return true
    }
    return false
  }
}
