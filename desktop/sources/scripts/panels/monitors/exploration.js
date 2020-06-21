//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Exploration extends Monitor {
  constructor () {
    super()

    this.distance = 0
    this.knownLocations = 0

    this.name = 'exploration'
    this.rotation.x = degToRad(Templates.monitorsAngle)

    this.nameLabel.updateText('--')
    this.detailsLabel.updateText(this.name)
  }

  refresh () {
    super.refresh()

    var kl = 0
    for (let location of verreciel.locations) {
      if (location.isKnown == true) {
        kl += 1
      }
    }

    // MARK: Display
    if (kl > this.knownLocations) {
      this.knownLocations = kl
      this.nameLabel.updateText(
        this.knownLocations + '/' + verreciel.locations.length,
        verreciel.cyan
      )
      delay(
        2,
        function () {
          this.nameLabel.color = verreciel.white
        }.bind(this)
      )
    }
  }

  whenSecond () {
    this.refresh()
  }
}
