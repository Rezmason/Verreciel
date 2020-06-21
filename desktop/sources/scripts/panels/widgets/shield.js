//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Shield extends Widget {
  constructor () {
    super('shield')

    this.details = 'star protection'
    this.requirement = ItemTypes.shield
    this.isPowered = function () {
      return verreciel.battery.isShieldPowered()
    }
    this.label.updateText(name)
  }

  setShield (item) {
    if (this.port.event == null) {
      this.port.addEvent(item)
      this.onUploadComplete()
      this.update()
    }
  }

  hasShield (shield) {
    if (this.port.hasEvent() == false) {
      return false
    }
    if (this.port.event == shield) {
      return true
    }
    return false
  }

  onDisconnect () {
    super.onDisconnect()

    setTimeout(() => { this.update() }, 1000)
  }

  update () {
    if (this.port.hasItemOfType(ItemTypes.shield) == true) {
      if (verreciel.battery.isShieldPowered() == true) {
        this.mode_powered()
      } else {
        this.mode_unpowered()
      }
    } else {
      if (verreciel.battery.isShieldPowered() == true) {
        this.mode_blank()
      } else {
        this.mode_none()
      }
    }
  }

  mode_powered () {
    if (this.hasShield(verreciel.items.shield2)) {
      verreciel.capsule.shieldRoot.updateChildrenColors(verreciel.red)
    } else {
      verreciel.capsule.shieldRoot.updateChildrenColors(verreciel.cyan)
    }

    verreciel.capsule.shieldRoot.show()
  }

  mode_unpowered () {
    verreciel.capsule.shieldRoot.updateChildrenColors(verreciel.grey)
    verreciel.capsule.shieldRoot.show()
  }

  mode_blank () {
    verreciel.capsule.shieldRoot.updateChildrenColors(verreciel.grey)
    verreciel.capsule.shieldRoot.show()
  }

  mode_none () {
    verreciel.capsule.shieldRoot.updateChildrenColors(verreciel.clear)
    verreciel.capsule.shieldRoot.hide()
  }

  onPowered () {
    super.onPowered()
    this.update()
  }

  onUnpowered () {
    super.onUnpowered()
    this.update()
  }

  createShield () {
    verreciel.capsule.add(verreciel.capsule.shieldRoot)
    let radius = 6
    var scale = 2.5
    let sides = 8
    let color = verreciel.red

    var i = 0
    while (i < sides) {
      scale = 2.5

      // Face 2
      scale = 1.9
      let face2 = new Empty()
      let line5 = new SceneLine(
        [
          new THREE.Vector3(-scale, 0, radius),
          new THREE.Vector3(0, scale, radius)
        ],
        color
      )
      let line6 = new SceneLine(
        [
          new THREE.Vector3(0, scale, radius),
          new THREE.Vector3(scale, 0, radius)
        ],
        color
      )
      let line7 = new SceneLine(
        [
          new THREE.Vector3(scale, 0, radius),
          new THREE.Vector3(0, -scale, radius)
        ],
        color
      )
      let line8 = new SceneLine(
        [
          new THREE.Vector3(0, -scale, radius),
          new THREE.Vector3(-scale, 0, radius)
        ],
        color
      )
      face2.add(line5)
      face2.add(line6)
      face2.add(line7)
      face2.add(line8)
      face2.rotation.y += degToRad(i * (360 / sides))
      face2.rotation.x += degToRad(40)
      verreciel.capsule.shieldRoot.add(face2)

      // Face 3
      scale = 1.9
      let face3 = new Empty()
      let line9 = new SceneLine(
        [
          new THREE.Vector3(-scale, 0, radius),
          new THREE.Vector3(0, scale, radius)
        ],
        color
      )
      let line10 = new SceneLine(
        [
          new THREE.Vector3(0, scale, radius),
          new THREE.Vector3(scale, 0, radius)
        ],
        color
      )
      let line11 = new SceneLine(
        [
          new THREE.Vector3(scale, 0, radius),
          new THREE.Vector3(0, -scale, radius)
        ],
        color
      )
      let line12 = new SceneLine(
        [
          new THREE.Vector3(0, -scale, radius),
          new THREE.Vector3(-scale, 0, radius)
        ],
        color
      )
      face3.add(line9)
      face3.add(line10)
      face3.add(line11)
      face3.add(line12)
      face3.rotation.y += degToRad(i * (360 / sides))
      face3.rotation.x -= degToRad(40)
      verreciel.capsule.shieldRoot.add(face3)

      i += 1
    }

    verreciel.capsule.shieldRoot.rotation.y = degToRad(360 / 16)
    verreciel.capsule.shieldRoot.hide()
  }

  onInstallationBegin () {
    super.onInstallationBegin()
    verreciel.player.lookAt(90, -30)
  }

  onInstallationComplete () {
    super.onInstallationComplete()
    this.createShield()
    verreciel.battery.installShield()
    this.update()
  }
}
