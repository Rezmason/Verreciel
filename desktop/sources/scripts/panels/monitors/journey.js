//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Journey extends Monitor {
  constructor () {
    super()
    this.distance = 0
    this.name = 'journey'
    this.rotation.x = degToRad(Templates.monitorsAngle)
    this.nameLabel.updateText('--')
    this.detailsLabel.updateText(this.name)
  }

  whenSecond () {
    super.whenSecond()
    this.nameLabel.updateText(Math.floor(this.distance / 100).toString())
  }
}
