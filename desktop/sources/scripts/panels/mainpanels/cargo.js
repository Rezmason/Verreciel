//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Cargo extends MainPanel {
  constructor () {
    super('cargo')

    this.cargohold = new CargoHold()

    this.details = 'stores items'
    this.port.event = this.cargohold
    this.uploadPercentage = 0

    this.mainNode.position.set(0, 0, Templates.radius)

    // Quantity

    let lineCoords = [new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)]
    this.lines = []
    let line
    for (let i = 0; i < 6; i++) {
      line = new SceneLine(lineCoords, verreciel.grey),
      line.position.y = -0.5 + i * 0.2
      this.lines.push(line)
      this.mainNode.add(line)
    }

    this.detailsLabel.updateText('Empty', verreciel.grey)
  }

  contains (event) {
    for (let item of this.cargohold.content) {
      if (item == event) {
        return true
      }
    }
    return false
  }

  containsLike (target) {
    for (let item of this.cargohold.content) {
      if (item.name == target.name && item.type == target.type) {
        return true
      }
    }
    return false
  }

  containsCount (count, target) {
    var count_actual = 0
    for (let item of this.cargohold.content) {
      if (item.name == target.name && item.type == target.type) {
        count_actual += 1
      }
    }
    if (count == count_actual) {
      return true
    }
    return false
  }

  // MARK: Add -

  addItems (items) {
    for (let item of items) {
      this.addItem(item)
    }
    this.refresh()
  }

  addItem (item) {
    this.cargohold.content.push(item)
    this.refresh()
  }

  removeItem (target, index) {
    const lineToAnimate = this.lines[this.cargohold.content.length - 1]
    lineToAnimate.position.x = 0.25
    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5
    lineToAnimate.position.x = 0
    verreciel.animator.completionBlock = function () {
      this.removeTransfer(target, index)
    }.bind(this)
    verreciel.animator.commit()
  }

  removeTransfer (target, index) {
    if (this.cargohold.content[index] != target) {
      index = this.cargohold.content.indexOf(target)
    }
    if (index != -1) {
      this.cargohold.content.splice(index, 1)
    }

    this.refresh()
  }

  refresh () {
    let newCargohold = new CargoHold()
    for (let item of this.cargohold.content) {
      newCargohold.content.push(item)
    }
    this.port.event = newCargohold

    // Animate

    for (let i = 0; i < this.lines.length; i++) {
      if (this.cargohold.content.length > i) {
        this.lines[i].color =
          this.cargohold.content[i].isDestroyable == true
            ? verreciel.white
            : verreciel.cyan
      } else {
        this.lines[i].color = verreciel.grey
      }
    }

    if (this.cargohold.content.length == 0) {
      this.detailsLabel.updateText('Empty', verreciel.grey)
    } else if (this.isFull()) {
      this.detailsLabel.updateText('FULL', verreciel.red)
    } else {
      this.detailsLabel.updateText(
        this.cargohold.content.length + '/6',
        verreciel.white
      )
    }

    if (this.port.isConnectedToPanel(verreciel.console) == true) {
      verreciel.console.onConnect()
    }
  }

  isFull () {
    return this.cargohold.content.length == 6
  }

  onUploadComplete () {
    this.refresh()

    if (this.port.isConnectedToPanel(verreciel.console) == true) {
      verreciel.console.onConnect()
    }

    verreciel.music.playEffect('click3')
  }

  onConnect () {
    if (this.port.isReceivingEventOfTypeItem() == false) {
      this.detailsLabel.updateText('ERROR', verreciel.red)
      return
    }
    if (this.port.event == null) {
      return
    }
    if (
      this.port.origin != null &&
      this.port.origin.host != null &&
      this.port.origin.host instanceof ConsoleLine
    ) {
      this.detailsLabel.updateText('ERROR', verreciel.red)
      return
    }

    if (this.cargohold.content.length < 6) {
      this.upload(this.port.event)
    }
  }

  // MARK: Upload -

  upload (item) {
    this.uploadedItem = item
    this.uploadProgress()
  }

  uploadProgress () {
    if (this.port.origin == null) {
      this.uploadCancel()
      return
    }

    this.uploadPercentage += (Math.random() * 6 + 1) * verreciel.game.gameSpeed
    if (this.uploadPercentage > 100) {
      this.uploadComplete()
    } else {
      this.detailsLabel.updateText(
        this.uploadPercentage.toFixed(0) + '%',
        verreciel.grey
      )
      delay(0.05, this.uploadProgress.bind(this))
    }
  }

  uploadComplete () {
    const lineToAnimate = this.lines[this.cargohold.content.length]
    lineToAnimate.position.x = -0.25
    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5
    lineToAnimate.position.x = 0
    verreciel.animator.completionBlock = function () {
      this.uploadTransfer()
    }.bind(this)
    verreciel.animator.commit()
  }

  uploadTransfer () {
    if (this.port.origin != null) {
      let origin = this.port.origin.host
      this.cargohold.content.push(this.port.syphon())
      if (origin != null) {
        origin.onUploadComplete()
      }
      this.onUploadComplete()
    }
    this.uploadPercentage = 0
    this.refresh()
    verreciel.ghost.report(LogType.upload, this.name)
  }

  uploadCancel () {
    this.uploadPercentage = 0
    this.refresh()
  }

  // MARK: Installation -

  onInstallationBegin () {
    super.onInstallationBegin()

    verreciel.player.lookAt(-225)
  }
}

class CargoHold extends Item {
  constructor () {
    super('cargo', ItemTypes.cargo, null, 'storage', true, null)

    this.content = []
  }

  payload () {
    var data = []

    for (let item of this.content) {
      data.push(new ConsoleData(item.name, item.type, item))
    }

    var i = 0
    while (i < 6 - this.content.length) {
      data.push(new ConsoleData('--', '', null, verreciel.grey))
      i += 1
    }

    return new ConsolePayload(data)
  }
}
