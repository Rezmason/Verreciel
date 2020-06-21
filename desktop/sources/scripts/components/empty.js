//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Empty extends SceneNode {
  constructor () {
    super()
    this.details = 'unknown'
  }

  touch (id = 0) {
    return false
  }

  update () {
  }

  empty () {
    while (this.children.length > 0) {
      this.remove(this.children[0])
    }
  }

  blink () {
    if (parseInt(verreciel.game.time * 0.2) % 2 === 0) {
      this.opacity = 1
    } else {
      this.opacity = 0
    }
  }

  show () {
    this.opacity = 1
  }

  hide () {
    this.opacity = 0
  }

  updateChildrenColors (color) {
    for (let node of this.children) {
      node.updateChildrenColors(color)
    }
  }

  updateColorPalette () {
    for (let node of this.children) {
      node.updateColorPalette()
    }
  }

  onConnect () {
    this.update()
  }

  onDisconnect () {
    this.update()
  }

  onUploadComplete () {
  }

  payload () {
    return new ConsolePayload([new ConsoleData('unknown', 'unknown')])
  }
}
