//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Thruster extends MainPanel {
  // MARK: Default -

  constructor () {
    super('thruster')

    this.interface_flight = new Empty()
    this.interface_cutlines = new Empty()
    this.interface_dock = new Empty()
    this.interface_warp = new Empty()
    this.speed = 0
    this.actualSpeed = 0
    this.canWarp = false
    this.isLocked = false
    this.port.isPersistent = true

    this.details = 'moves the capsule'

    // Flight

    this.mainNode.add(this.interface_flight)

    this.line1 = new SceneLine(
      [new THREE.Vector3(-0.5, -0.3, 0), new THREE.Vector3(0.5, -0.3, 0)],
      verreciel.grey
    )
    this.line2 = new SceneLine(
      [new THREE.Vector3(-0.5, -0.1, 0), new THREE.Vector3(0.5, -0.1, 0)],
      verreciel.grey
    )
    this.line3 = new SceneLine(
      [new THREE.Vector3(-0.5, 0.1, 0), new THREE.Vector3(0.5, 0.1, 0)],
      verreciel.grey
    )
    this.line4 = new SceneLine(
      [new THREE.Vector3(-0.5, 0.3, 0), new THREE.Vector3(0.5, 0.3, 0)],
      verreciel.grey
    )

    this.interface_flight.add(this.line1)
    this.interface_flight.add(this.line2)
    this.interface_flight.add(this.line3)
    this.interface_flight.add(this.line4)

    this.mainNode.add(this.interface_cutlines)

    this.cutLine1 = new SceneLine(
      [
        new THREE.Vector3(-0.5, -0.3, 0),
        new THREE.Vector3(-0.1, -0.3, 0),
        new THREE.Vector3(0.5, -0.3, 0),
        new THREE.Vector3(0.1, -0.3, 0)
      ],
      verreciel.grey
    )
    this.cutLine2 = new SceneLine(
      [
        new THREE.Vector3(-0.5, -0.1, 0),
        new THREE.Vector3(-0.1, -0.1, 0),
        new THREE.Vector3(0.5, -0.1, 0),
        new THREE.Vector3(0.1, -0.1, 0)
      ],
      verreciel.grey
    )
    this.cutLine3 = new SceneLine(
      [
        new THREE.Vector3(-0.5, 0.1, 0),
        new THREE.Vector3(-0.1, 0.1, 0),
        new THREE.Vector3(0.5, 0.1, 0),
        new THREE.Vector3(0.1, 0.1, 0)
      ],
      verreciel.grey
    )
    this.cutLine4 = new SceneLine(
      [
        new THREE.Vector3(-0.5, 0.3, 0),
        new THREE.Vector3(-0.1, 0.3, 0),
        new THREE.Vector3(0.5, 0.3, 0),
        new THREE.Vector3(0.1, 0.3, 0)
      ],
      verreciel.grey
    )

    this.interface_cutlines.add(this.cutLine1)
    this.interface_cutlines.add(this.cutLine2)
    this.interface_cutlines.add(this.cutLine3)
    this.interface_cutlines.add(this.cutLine4)

    this.interface_cutlines.hide()

    // Dock

    this.mainNode.add(this.interface_dock)
    this.interface_dock.add(
      new SceneLine(
        [new THREE.Vector3(-0.1, 0, 0), new THREE.Vector3(0, 0.1, 0)],
        verreciel.grey
      )
    )
    this.interface_dock.add(
      new SceneLine(
        [new THREE.Vector3(0.1, 0, 0), new THREE.Vector3(0, 0.1, 0)],
        verreciel.grey
      )
    )
    this.interface_dock.add(
      new SceneLine(
        [new THREE.Vector3(-0.1, -0.1, 0), new THREE.Vector3(0, 0, 0)],
        verreciel.grey
      )
    )
    this.interface_dock.add(
      new SceneLine(
        [new THREE.Vector3(0.1, -0.1, 0), new THREE.Vector3(0, 0, 0)],
        verreciel.grey
      )
    )

    // Warp

    this.mainNode.add(this.interface_warp)
    var verticalOffset = 0.1
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(-0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    verticalOffset = -0.1
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(-0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    verticalOffset = 0.3
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(-0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    verticalOffset = -0.3
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0, 0.1 + verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.1, verticalOffset, 0),
          new THREE.Vector3(-0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )
    this.interface_warp.add(
      new SceneLine(
        [
          new THREE.Vector3(0.1, verticalOffset, 0),
          new THREE.Vector3(0.4, verticalOffset, 0)
        ],
        verreciel.cyan
      )
    )

    // Etcs

    this.lineLeft = new SceneLine(
      [new THREE.Vector3(-0.5, 0.5, 0), new THREE.Vector3(-0.5, -0.5, 0)],
      verreciel.red
    )
    this.mainNode.add(this.lineLeft)
    this.lineRight = new SceneLine(
      [new THREE.Vector3(0.5, 0.5, 0), new THREE.Vector3(0.5, -0.5, 0)],
      verreciel.red
    )
    this.mainNode.add(this.lineRight)

    // Triggers

    this.accelerate = new SceneTrigger(this, 'thruster_accelerate', 2, 1, 1)
    this.accelerate.position.set(0, 0.5, 0)
    this.accelerate.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(0.5, 0, 0)],
        verreciel.cyan
      )
    )
    this.accelerate.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(-0.5, 0, 0)],
        verreciel.cyan
      )
    )

    this.decelerate = new SceneTrigger(this, 'thruster_decelerate', 2, 1, 0)
    this.decelerate.position.set(0, -0.5, 0)
    this.decelerate.add(
      new SceneLine(
        [new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(0.5, 0, 0)],
        verreciel.red
      )
    )
    this.decelerate.add(
      new SceneLine(
        [new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(-0.5, 0, 0)],
        verreciel.red
      )
    )

    this.action = new SceneTrigger(this, 'thruster_action', 2, 2, 2)

    this.mainNode.add(this.accelerate)
    this.mainNode.add(this.decelerate)
    this.mainNode.add(this.action)

    this.detailsLabel.updateText('--')
  }

  touch (id = 0) {
    if (verreciel.battery.thrusterPort.isReceivingItemOfType(ItemTypes.battery) == false) {
      return false
    }
    if (id == 0) {
      this.speedDown()
      verreciel.music.playEffect('click3')
      return true
    } else if (id == 1) {
      if ((verreciel.pilot.target == null || verreciel.pilot.port.origin.host != verreciel.radar) && verreciel.pilot.isInstalled == true) {
        verreciel.helmet.addMessage('no destination')
        return
      }
      this.speedUp()
      verreciel.music.playEffect('click4')
      return true
    }
    if (id == 2) {
      if (this.canWarp == true) {
        verreciel.capsule.warpTo(verreciel.pilot.port.origin.event)
      } else {
        verreciel.capsule.undock()
      }
      verreciel.music.playEffect('click2')
      return true
    }
    return false
  }

  update () {
    if (this.maxSpeed() > 0) {
      this.line1.show()
    } else {
      this.line1.hide()
    }
    if (this.maxSpeed() > 1) {
      this.line2.show()
    } else {
      this.line2.hide()
    }
    if (this.maxSpeed() > 2) {
      this.line3.show()
    } else {
      this.line3.hide()
    }
    this.line4.hide()
  }

  hasWarpPower () {
    return this.port.isReceivingEvent(verreciel.items.warpDrive) === true
  }

  hasWarpDestination () {
    return verreciel.pilot.port.origin && verreciel.pilot.port.origin.event && verreciel.pilot.port.isReceivingLocationOfTypePortal() === true && verreciel.pilot.port.origin.event != verreciel.capsule.location
  }

  hasWarpAlignment () {
    return verreciel.pilot.target && Math.abs(verreciel.pilot.target.align) == 0
  }

  whenRenderer () {
    super.whenRenderer()

    this.canWarp = false

    this.update()

    if (this.isLocked == true) {
      this.modeLocked()
    } else if (verreciel.battery.thrusterPort.isReceivingItemOfType(ItemTypes.battery) == false) {
      this.speed = 0
      this.modeUnpowered()
    } else if (verreciel.capsule.isWarping == true) {
      this.modeWarping()
    } else if (verreciel.capsule.isDocked == true && this.hasWarpPower() === true) {
      if (this.hasWarpDestination() !== true) {
        this.modeWarpError()
      } else if (this.hasWarpAlignment() !== true) {
        this.modeAligning()
      } else {
        this.modeWaitingForWarp()
        this.canWarp = true
      }
    } else if (verreciel.capsule.isDocked == true && verreciel.capsule.location.storedItems().length > 0) {
      this.modeStorageBusy()
    } else if (verreciel.capsule.isDocked == true) {
      this.modeDocked()
    } else if (verreciel.capsule.location != null) {
      this.modeDocking()
    } else {
      this.modeFlight()
    }
    //
    this.thrust()
  }

  // MARK: Locking

  lock () {
    this.isLocked = true
  }

  unlock () {
    this.isLocked = false
    verreciel.ghost.report(LogType.thrusterUnlock)
  }

  // MARK: Custom -

  onPowered () {
    this.refresh()
  }

  onUnpowered () {
    this.refresh()
  }

  // MARK: Modes -

  modeFlight () {
    this.detailsLabel.updateText(this.actualSpeed.toFixed(1), verreciel.white)

    this.interface_cutlines.hide()
    this.interface_flight.show()
    this.interface_dock.hide()
    this.interface_warp.hide()

    if (this.speed > 0) {
      this.line1.color = verreciel.white
    } else {
      this.line1.color = verreciel.grey
    }
    if (this.speed > 1) {
      this.line2.color = verreciel.white
    } else {
      this.line2.color = verreciel.grey
    }
    if (this.speed > 2) {
      this.line3.color = verreciel.white
    } else {
      this.line3.color = verreciel.grey
    }
    if (this.speed > 3) {
      this.line4.color = verreciel.white
    } else {
      this.line4.color = verreciel.grey
    }

    this.action.disable()

    this.accelerate.enable()
    this.decelerate.enable()

    this.accelerate.updateChildrenColors(
      this.speed == this.maxSpeed() ? verreciel.grey : verreciel.cyan
    )
    this.decelerate.updateChildrenColors(
      this.speed == 0 ? verreciel.grey : verreciel.red
    )

    this.lineLeft.color = verreciel.clear
    this.lineRight.color = verreciel.clear

    this.interface_dock.hide()
    this.interface_flight.show()
  }

  modeLocked () {
    this.detailsLabel.updateText('locked', verreciel.grey)

    this.interface_flight.hide()
    this.interface_dock.show()
    this.interface_warp.hide()

    this.action.disable()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.grey)
    this.decelerate.updateChildrenColors(verreciel.grey)

    this.lineLeft.color = verreciel.grey
    this.lineRight.color = verreciel.grey
  }

  modeWarping () {
    this.detailsLabel.updateText('warping', verreciel.white)

    this.interface_flight.hide()
    this.interface_dock.hide()
    this.interface_warp.blink()

    this.action.disable()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.clear)
    this.decelerate.updateChildrenColors(verreciel.clear)

    this.line1.show()
    this.cutLine1.hide()
    this.line2.show()
    this.cutLine2.hide()
    this.line3.show()
    this.cutLine3.hide()
    this.line4.show()
    this.cutLine4.hide()

    this.line1.blink()
    this.line2.blink()
    this.line3.blink()
    this.line4.blink()

    this.lineLeft.color = verreciel.clear
    this.lineRight.color = verreciel.clear
  }

  modeWaitingForWarp () {
    this.detailsLabel.updateText('warp', verreciel.white)

    this.interface_flight.hide()
    this.interface_dock.hide()
    this.interface_warp.show()
    this.interface_warp.updateChildrenColors(verreciel.cyan)

    this.action.enable()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.cyan)
    this.decelerate.updateChildrenColors(verreciel.cyan)

    this.lineLeft.color = verreciel.cyan
    this.lineRight.color = verreciel.cyan
  }

  modeWarpError () {
    this.detailsLabel.updateText('no pilot', verreciel.red)

    this.interface_flight.hide()
    this.interface_dock.hide()
    this.interface_warp.show()
    this.interface_warp.updateChildrenColors(verreciel.red)

    this.action.disable()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.red)
    this.decelerate.updateChildrenColors(verreciel.red)

    this.lineLeft.color = verreciel.red
    this.lineRight.color = verreciel.red
  }

  modeAligning () {
    if (verreciel.pilot.target == null || verreciel.pilot.target.align == null) {
      return
    }

    this.detailsLabel.updateText('align ' + (Math.abs(verreciel.pilot.target.align) / 180 * 100).toFixed(0) + '%',
      verreciel.red
    )

    this.interface_flight.hide()
    this.interface_dock.hide()
    this.interface_warp.updateChildrenColors(verreciel.red)

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.red)
    this.decelerate.updateChildrenColors(verreciel.red)

    this.line1.show()
    this.cutLine1.hide()
    this.line2.show()
    this.cutLine2.hide()
    this.line3.show()
    this.cutLine3.hide()
    this.line4.show()
    this.cutLine4.hide()

    this.lineLeft.color = verreciel.red
    this.lineRight.color = verreciel.red

    this.action.disable()
  }

  modeUnpowered () {
    this.detailsLabel.updateText('unpowered', verreciel.grey)

    this.interface_flight.hide()
    this.interface_dock.hide()
    this.interface_warp.hide()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.grey)
    this.decelerate.updateChildrenColors(verreciel.grey)

    this.line1.hide()
    this.cutLine1.show()
    this.line2.hide()
    this.cutLine2.show()
    this.line3.hide()
    this.cutLine3.show()
    this.line4.hide()
    this.cutLine4.show()

    this.lineLeft.color = verreciel.grey
    this.lineRight.color = verreciel.grey
  }

  modeDocking () {
    let dockingProgress = Math.floor(
      (1 -
        distanceBetweenTwoPoints(
          verreciel.capsule.at,
          verreciel.capsule.location.at
        ) /
          0.5) *
        100
    )
    this.detailsLabel.updateText(
      'docking ' + dockingProgress.toFixed(0) + '%',
      verreciel.grey
    )

    this.interface_flight.hide()
    this.interface_dock.show()
    this.interface_warp.hide()

    this.action.enable()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.grey)
    this.decelerate.updateChildrenColors(verreciel.grey)

    this.lineLeft.color = verreciel.clear
    this.lineRight.color = verreciel.clear
  }

  modeStorageBusy () {
    this.detailsLabel.updateText(
      'Take ' + verreciel.capsule.location.storedItems()[0].name,
      verreciel.red
    )

    this.interface_flight.hide()
    this.interface_dock.show()
    this.interface_warp.hide()

    this.action.disable()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.grey)
    this.decelerate.updateChildrenColors(verreciel.grey)

    this.lineLeft.color = verreciel.grey
    this.lineRight.color = verreciel.grey
  }

  modeDocked () {
    this.detailsLabel.updateText('undock', verreciel.white)

    this.interface_flight.hide()
    this.interface_dock.show()
    this.interface_warp.hide()

    this.action.enable()

    this.accelerate.disable()
    this.decelerate.disable()
    this.accelerate.updateChildrenColors(verreciel.red)
    this.decelerate.updateChildrenColors(verreciel.red)

    this.lineLeft.color = verreciel.red
    this.lineRight.color = verreciel.red
  }

  // MARK: Misc -

  maxSpeed () {
    return verreciel.battery.cellCount()
  }

  speedUp () {
    if (this.speed < this.maxSpeed()) {
      this.speed += 1
      if (DEBUG_LOG_GHOST == true && this.speed < this.maxSpeed()) {
        this.accelerate.tap();
      }
    }
  }

  speedDown () {
    if (this.speed >= 1) {
      this.speed -= 1
      if (DEBUG_LOG_GHOST == true && this.speed >= 1) {
        this.decelerate.tap();
      }
    }
  }

  thrust () {
    if (verreciel.capsule.isWarping == true) {
      this.speed = 100
      verreciel.journey.distance += this.actualSpeed
      return
    }
    if (verreciel.capsule.isDocked == true) {
      this.speed = 0
      this.actualSpeed = 0
      return
    }

    if (Math.abs(this.speed - this.actualSpeed) < 0.0001) {
      this.actualSpeed = this.speed
    } else if (this.speed * 10 > Math.floor(this.actualSpeed * 10)) {
      this.actualSpeed += 0.1
    } else if (this.speed * 10 < Math.floor(this.actualSpeed * 10)) {
      this.actualSpeed -= 0.1
    }

    if (verreciel.capsule.location != null) {
      this.speed = 0
    } else if (this.actualSpeed < 0.1) {
      this.actualSpeed = DEBUG_LOG_GHOST ? 0 : 0.1
    }

    if (this.actualSpeed > 0) {
      // Should this be this.speed?
      let speed = this.actualSpeed / 600
      let angle = verreciel.capsule.direction % 360

      let angleRad = degToRad(angle)

      verreciel.capsule.at.x += speed * Math.sin(angleRad)
      verreciel.capsule.at.y += speed * Math.cos(angleRad)
    }

    verreciel.journey.distance += this.actualSpeed
  }

  onInstallationBegin () {
    super.onInstallationBegin()

    verreciel.player.lookAt(-45)
  }
}
