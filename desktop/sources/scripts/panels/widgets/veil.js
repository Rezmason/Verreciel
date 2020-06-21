//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Veil extends Widget {
  constructor () {
    super('veil')

    this.details = 'extra'
    this.requirement = ItemTypes.veil
    this.isPowered = function () {
      return verreciel.battery.isVeilPowered()
    }
    this.label.updateText(this.name)
  }

  setVeil (veil) {
    if (!this.hasVeil(veil)) {
      this.port.addEvent(veil)
    }
  }

  hasVeil (veil) {
    if (this.port.hasEvent() == false) {
      return false
    }
    if (this.port.event == veil) {
      return true
    }
    return false
  }

  onInstallationBegin () {
    super.onInstallationBegin()
    verreciel.player.lookAt(180, -30)
  }

  onInstallationComplete () {
    super.onInstallationComplete()
    verreciel.battery.installVeil()
  }
}
