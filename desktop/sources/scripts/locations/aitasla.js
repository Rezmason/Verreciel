//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationAitasla extends Location {
  constructor (data) {
    super(data, new IconStar(), new StructureStar())

    this.isComplete = false
    this.icon.color = verreciel.black
  }

  // MARK: Panel -

  makePanel () {
    let newPanel = new Panel()

    return newPanel
  }

  sightUpdate () {

    this.color = verreciel.black
    this.structure.updateChildrenColors(this.color)
    this.icon.label.color = verreciel.clear
  }

  onDock () {
    verreciel.player.eject()
  }

  onUpdate () {

  }
}
