//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Item extends Event {
  constructor (data) {
    const {
      name,
      type,
      locationCode,
      details,
      isQuest,
      code
    } = data
    // assertArgs(arguments, 6);
    super(name, new THREE.Vector2(), details, verreciel.grey, false)

    this.name = name
    this.type = type
    this.details = details
    this.isQuest = isQuest
    this.locationCode = locationCode
    this.code = code
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
      return new Item({ ...other, locationCode: null })
    } else {
      return other
    }
  }
}
