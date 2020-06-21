//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Radio extends Widget {
  constructor () {
    super('radio')

    this.seek = 0
    this.details = 'format reader'
    this.requirement = ItemTypes.record
    this.isPowered = function () {
      return verreciel.battery.isRadioPowered()
    }

    this.label.updateText(this.name)
  }

  // This is used when the missions system is assigning values to things
  setRecord (record) {
    this.port.addEvent(record)
    this.onUploadComplete()
  }

  update () {
    super.update()
    this.refresh()
  }

  onPowered () {
    super.onPowered()
    if (this.hasRecord()) {
      this.play()
    } else {
      this.stop()
    }
  }

  onUnpowered () {
    super.onUnpowered()
    this.stop()
  }

  play () {
    verreciel.music.setRecord(Records[this.port.event.id])
    verreciel.music.playRecord()
  }

  hasRecord () {
    let event = this.port.event
    return (
      event != null && event instanceof Item && event.type == ItemTypes.record
    )
  }

  stop () {
    verreciel.music.playAmbience()
  }

  whenRenderer () {
    super.whenRenderer()

    if (verreciel.music.isPlayingRecord()) {
      let scale = 1 + verreciel.music.magnitude * 10
      this.port.sprite_output.element.scale.x = scale
      this.port.sprite_output.element.scale.y = scale
    } else {
      this.port.sprite_output.element.scale.x = 1
      this.port.sprite_output.element.scale.y = 1
    }
  }

  onUploadComplete () {
    super.onUploadComplete()

    if (verreciel.battery.isRadioPowered() == true) {
      if (this.hasRecord()) {
        this.play()
      } else {
        this.stop()
      }
    }
  }

  onInstallationBegin () {
    super.onInstallationBegin()
    verreciel.player.lookAt(0, -30)
  }

  onInstallationComplete () {
    super.onInstallationComplete()
    verreciel.battery.installRadio()
  }
}
