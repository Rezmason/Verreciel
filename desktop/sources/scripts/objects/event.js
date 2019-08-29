//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Event extends Empty {
  constructor (
    name = '',
    at = new THREE.Vector2(),
    details = '',
    color = verreciel.grey,
    isDestroyable = true
  ) {
    // assertArgs(arguments, 5);
    super()

    this.isDestroyable = isDestroyable

    this.name = name
    this.details = details

    this.at = at
    this.color = color
  }

  // MARK: Radar -

  update () {
    // assertArgs(arguments, 0);
    super.update()
  }

  remove () {
    // assertArgs(arguments, 0);
    this.removeFromParentNode()
  }

  clean () {
    // assertArgs(arguments, 0);
  }
}
