//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Event {
  constructor (
    name = '',
    at = new THREE.Vector2(),
    details = '',
    color = verreciel.grey,
    isDestroyable = true
  ) {
    // assertArgs(arguments, 5);

    this.isDestroyable = isDestroyable

    this.name = name
    this.details = details

    this.at = at
    this.color = color
  }

  update () {

  }

  onConnect () {
    this.update()
  }

  onDisconnect () {
    this.update()
  }

  onUploadComplete () {

  }
}
