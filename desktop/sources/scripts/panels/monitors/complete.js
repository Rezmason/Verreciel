//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Complete extends Monitor {
  constructor () {
    super()

    this.distance = 0
    this.name = 'missions'
    this.rotation.x = degToRad(Templates.monitorsAngle)
    this.nameLabel.updateText('--')
    this.detailsLabel.updateText(this.name)
  }

  refresh () {
    super.refresh()
    if (!DEBUG_DISABLE_MISSIONS) {
      this.nameLabel.updateText(
        verreciel.missions.currentMission.id +
          '/' +
          (verreciel.missions.story.length - 1)
      )
    }
  }
}
