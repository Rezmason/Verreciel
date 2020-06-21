//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Panel extends Empty {
  constructor (name) {
    super()
    this.name = name
    this.isEnabled = false
    this.root = new Empty()
    this.add(this.root)
    this.isInstalled = false
    this.installPercentage = 0
  }

  refresh () {
  }

  enable () {
    this.isEnabled = true
  }

  disable () {
    this.isEnabled = false
  }

  // MARK: Installation -

  install () {
    if (this.isInstalled == true) {
      return
    }

    this.onInstallationBegin()
    this.installProgress()
  }

  installProgress () {
    this.installPercentage += (Math.random() * 6 + 1) * verreciel.game.gameSpeed

    if (this.installPercentage > 100) {
      this.onInstallationComplete()
    } else {
      delay(0.05, this.installProgress.bind(this))
    }
  }

  onInstallationBegin () {
    verreciel.music.playEffect('beep1')
  }

  onInstallationComplete () {
    this.installPercentage = 0
    this.isInstalled = true
    verreciel.music.playEffect('beep2')
    verreciel.ghost.report(LogType.install, this.name)
  }

  payload () {
    return new ConsolePayload([
      new ConsoleData('Capsule', 'Panel'),
      new ConsoleData(this.details)
    ])
  }
}
