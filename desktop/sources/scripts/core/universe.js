//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Universe extends Empty {
  constructor () {
    // assertArgs(arguments, 0);
    super()
    console.info('^ Universe | Init')

    this.eventView = verreciel.radar.eventView

    this.allLocations = []

    locationData.forEach(systemData => {
      const { at, systemID, locations } = systemData
      const system = Systems[systemID]
      locations.forEach(data => {
        const { type, id } = data
        const isStar = type === "star" || type === "void"
        const appendedData = {
          ...data,
          system,
          at: {
            x: at.x + data.at.x,
            y: at.y + data.at.y
          }
        }
        const location = new (locationClassesByType[type])(appendedData)
        this[this.getKey(systemID, id, isStar)] = location
        this.addLocation(location)
      })
    })
  }

  getKey(systemID, id, isStar = false) {
    return isStar ? systemID : `${systemID}_${id}`
  }

  whenStart () {
    super.whenStart()
    console.info('+ Universe | Start')
    this.connectPaths()
  }

  addLocation (child) {
    // assertArgs(arguments, 1);
    this.allLocations.push(child)
    this.eventView.add(child)
  }

  connectPaths () {
    // assertArgs(arguments, 0);
    this.allLocations.forEach(location => {
      location.connect()
    })
  }

  locationLike (target) {
    // assertArgs(arguments, 1);
    for (let location of this.allLocations) {
      if (location.name == target.name && location.system == target.system) {
        return location
      }
    }

    return null
  }

  locationWithCode (code) {
    // assertArgs(arguments, 1);
    for (let location of this.allLocations) {
      if (location.code == code) {
        return location
      }
    }
    return null
  }
}
