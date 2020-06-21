//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Nav extends Widget {
  constructor () {
    super('map')
    this.details = 'disk drive'
    this.requirement = ItemTypes.map
    this.isPowered = function () {
      return verreciel.battery.isNavPowered()
    }
    this.label.updateText(this.name)
  }

  setMap (map) {
    if (!this.hasMap(map)) {
      this.port.addEvent(map)
    }
  }

  hasMap (map) {
    if (this.port.hasEvent() == false) {
      return false
    }
    if (this.port.event == map) {
      return true
    }
    return false
  }

  onUploadComplete () {
    super.onUploadComplete()
  }

  onInstallationBegin () {
    super.onInstallationBegin()

    verreciel.player.lookAt(-90, -30)
  }

  onInstallationComplete () {
    super.onInstallationComplete()
    verreciel.battery.installNav()
  }
}
