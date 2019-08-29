//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Item extends Event {
  constructor (data) {
    const {
      id,
      name,
      type,
      portalAddress,
      details,
      isDestroyable
    } = data
    // assertArgs(arguments, 6);
    super(name, new THREE.Vector2(), details, verreciel.grey, false)
    this.id = id
    this.name = name
    this.type = type
    this.details = details
    this.isDestroyable = isDestroyable
    this.portalAddress = portalAddress
  }

  payload () {
    // assertArgs(arguments, 0);
    return new ConsolePayload([
      new ConsoleData('Item', this.type),
      new ConsoleData(this.details)
    ])
  }

  static like (other) {
    // assertArgs(arguments, 1);
    if (other.type === ItemTypes.currency) {
      return new Item(other)
    } else {
      return other
    }
  }
}
