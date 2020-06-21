//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Pilot extends MainPanel {
  constructor () {
    super('pilot')

    this.details = 'aligns to locations'
    this.port.isPersistent = true
    this.isAligned = false
    this.retargeting = false

    this.targetDirectionIndicator = new Empty()
    this.targetDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.55, 0), new THREE.Vector3(0, 0.7, 0)],
        verreciel.white
      )
    )
    this.mainNode.add(this.targetDirectionIndicator)

    this.activeDirectionIndicator = new Empty()
    this.activeDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.4, -0.1), new THREE.Vector3(0, 0.55, -0)],
        verreciel.grey
      )
    )
    this.mainNode.add(this.activeDirectionIndicator)

    this.staticDirectionIndicator = new Empty()
    this.staticDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.2, -0.1), new THREE.Vector3(0, 0.4, -0)],
        verreciel.cyan
      )
    )
    this.staticDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(0, -0.2, -0.1), new THREE.Vector3(0, -0.4, -0)],
        verreciel.red
      )
    )
    this.staticDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(0.2, 0, -0.1), new THREE.Vector3(0.4, 0, -0)],
        verreciel.red
      )
    )
    this.staticDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(-0.2, 0, -0.1), new THREE.Vector3(-0.4, 0, -0)],
        verreciel.red
      )
    )
    this.mainNode.add(this.staticDirectionIndicator)

    this.eventsDirectionIndicator = new Empty()
    this.eventsDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.2, -0.1), new THREE.Vector3(0.2, 0, -0)],
        verreciel.white
      )
    )
    this.eventsDirectionIndicator.add(
      new SceneLine(
        [new THREE.Vector3(0, 0.2, -0.1), new THREE.Vector3(-0.2, 0, -0)],
        verreciel.white
      )
    )
    this.mainNode.add(this.eventsDirectionIndicator)

    this.detailsLabel.updateText('Ready', verreciel.grey)
  }

  touch (id = 0) {
    return true
  }

  whenRenderer () {
    super.whenRenderer()

    let lastTarget = this.target
    this.target = null

    if (verreciel.capsule.isFleeing == true) {
      for (
        let i = verreciel.capsule.previousLocations.length - 1;
        i >= 0;
        i--
      ) {
        let loc = verreciel.capsule.previousLocations[i]
        if (loc.isComplete || !(loc instanceof LocationStar)) {
          this.target = loc
          break
        }
      }
    } else if (verreciel.capsule.isReturning == true) {
      this.target = verreciel.capsule.closestKnownLocation()
    } else if (this.port.isReceivingEventOfTypeLocation()) {
      this.target = this.port.origin.event
    }

    if (lastTarget != this.target) {
      this.retargeting = true
    }

    if (this.target != null) {
      this.align()
    } else {
      this.detailsLabel.updateText('--', verreciel.grey)
    }
  }

  align () {
    let left = this.target.calculateAlignment(
      verreciel.capsule.direction - 0.5
    )
    let right = this.target.calculateAlignment(
      verreciel.capsule.direction + 0.5
    )

    this.target_align =
      Math.abs(this.target.align * 0.045) < 0.01
        ? this.target.align
        : this.target.align * 0.045

    if (left <= right) {
      this.turnLeft(this.target_align)
    } else {
      this.turnRight(this.target_align)
    }

    this.isAligned = Math.abs(this.target.align) < 1
    if (this.isAligned == true && this.retargeting == true) {
      this.retargeting = false
      verreciel.ghost.report(LogType.pilotAligned, this.target.name)
    }

    this.animate()
  }

  turnLeft (deg) {
    verreciel.capsule.direction = verreciel.capsule.direction - deg
    verreciel.capsule.direction = verreciel.capsule.direction % 360
  }

  turnRight (deg) {
    verreciel.capsule.direction = verreciel.capsule.direction + deg
    verreciel.capsule.direction = verreciel.capsule.direction % 360
  }

  animate () {
    this.targetDirectionIndicator.rotation.z =
      degToRad(verreciel.capsule.direction) * -1
    this.staticDirectionIndicator.rotation.z = degToRad(
      verreciel.capsule.direction
    )

    if (verreciel.capsule.isFleeing == true) {
      this.detailsLabel.updateText('Auto', verreciel.red)
    } else if (Math.abs(this.target.align) > 25) {
      this.detailsLabel.updateText(
        Math.abs(this.target.align).toFixed(0),
        verreciel.red
      )
    } else if (Math.abs(this.target.align) < 1) {
      this.detailsLabel.updateText('ok', verreciel.cyan)
    } else {
      this.detailsLabel.updateText(
        Math.abs(this.target.align).toFixed(0),
        verreciel.white
      )
    }
  }

  onInstallationBegin () {
    super.onInstallationBegin()

    verreciel.player.lookAt(-135)
  }
}
