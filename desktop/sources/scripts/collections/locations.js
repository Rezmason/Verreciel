//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

const locationData = [
  {
    at: {x: 0, y: -3},
    systemID: 'loiqe',
    systemLocations: [
      {
        id: 'star',
        type: 'star',
        name: 'Loiqe',
        at: {x: 0, y: 0},
        connectedSystem: null,
        connectedID: null
      },
      {
        id: 'spawn',
        type: 'satellite',
        name: 'spawn',
        at: {x: 0, y: -2.75},
        connectedSystem: null,
        connectedID: null,
        message: 'Are you sure$that you are in$space.',
        itemID: 'teapot',
        mapRequirementID: 'map2'
      },
      {
        id: 'harvest',
        type: 'harvest',
        name: 'Harvest',
        at: {x: 0, y: -2},
        connectedSystem: null,
        connectedID: null,
        harvestedID: 'currency1'
      },
      {
        id: 'city',
        type: 'trade',
        name: 'City',
        at: {x: 0, y: -1},
        connectedSystem: null,
        connectedID: 'satellite',
        wantID: 'currency1',
        giveID: 'valenPortalFragment1'
      },
      {
        id: 'horadric',
        type: 'horadric',
        name: 'Horadric',
        at: {x: 2, y: 0},
        connectedSystem: null,
        connectedID: 'satellite'
      },
      {
        id: 'portal',
        type: 'portal',
        name: 'portal',
        at: {x: 0, y: 1},
        connectedSystem: null,
        connectedID: 'transit'
      },
      {
        id: 'satellite',
        type: 'satellite',
        name: 'satellite',
        at: {x: 1, y: 0},
        connectedSystem: null,
        connectedID: 'portal',
        message: 'something broken$somewhen lost',
        itemID: 'valenPortalFragment2'
      },
      {
        id: 'port',
        type: 'trade',
        name: 'port',
        at: {x: -1, y: 0},
        connectedSystem: null,
        connectedID: null,
        wantID: 'currency4',
        giveID: 'senniPortalKey'
      },
      // MARK: Fog
      {
        id: 'transit',
        type: 'transit',
        name: 'transit',
        at: {x: 0, y: 2},
        connectedSystem: 'valen',
        connectedID: 'transit',
        mapRequirementID: 'map2'
      },
      {
        id: 'fog',
        type: 'satellite',
        name: 'fog',
        at: {x: -2, y: 0},
        connectedSystem: null,
        connectedID: 'port',
        message: 'something broken$somehow lost',
        itemID: 'usulPortalFragment2',
        mapRequirementID: 'map1'
      },
      {
        id: 'transmitter',
        type: 'transmitter',
        name: 'transmitter',
        at: {x: -1, y: -1},
        connectedSystem: null,
        connectedID: null,
        mapRequirementID: 'map1'
      },
      // Map2
      {
        id: 'cargo',
        type: 'satellite',
        name: 'cargo',
        at: {x: 1, y: -1},
        connectedSystem: null,
        connectedID: null,
        message: 'le soleil est noir',
        itemID: 'veil1',
        mapRequirementID: 'map2'
      },
      // Constellations
      {
        id: 'c_1',
        type: 'constellation',
        name: '',
        at: {x: 0, y: -1.5},
        connectedSystem: null,
        connectedID: null,
        structureID: 'tunnel'
      }
    ]
  },
  {
    at: {x: -3, y: 0},
    systemID: 'usul',
    systemLocations: [
      {
        id: 'star',
        type: 'star',
        name: 'usul',
        at: {x: 0, y: 0},
        connectedSystem: null,
        connectedID: null
      },
      {
        id: 'portal',
        type: 'portal',
        name: 'portal',
        at: {x: 1, y: 0},
        connectedSystem: null,
        connectedID: 'transit',
        mapRequirementID: 'map1'
      },
      // MARK: Fog
      {
        id: 'transit',
        type: 'transit',
        name: 'transit',
        at: {x: 2, y: 0},
        connectedSystem: 'loiqe',
        connectedID: 'transit',
        mapRequirementID: 'map2'
      },
      {
        id: 'cargo',
        type: 'satellite',
        name: 'cargo',
        at: {x: 0, y: 1},
        connectedSystem: null,
        connectedID: 'portal',
        message: 'as above$so below',
        itemID: 'map2',
        mapRequirementID: 'map1'
      },
      {
        id: 'telescope',
        type: 'satellite',
        name: 'telescope',
        at: {x: -1, y: 0},
        connectedSystem: null,
        connectedID: 'antenna',
        message: 'star injection$glass capsule',
        itemID: 'shield',
        mapRequirementID: 'map1'
      },
      {
        id: 'antenna',
        type: 'antenna',
        name: 'antenna',
        at: {x: 0, y: -1},
        connectedSystem: null,
        connectedID: 'portal',
        installID: 'shield',
        installName: 'shield',
        mapRequirementID: 'map1'
      },
      {
        id: 'transmitter',
        type: 'transmitter',
        name: 'transmitter',
        at: {x: 1, y: -1},
        connectedSystem: null,
        connectedID: null,
        mapRequirementID: 'map1'
      }
    ]
  },
  {
    at: {x: 3, y: 0},
    systemID: 'valen',
    systemLocations: [
      {
        id: 'star',
        type: 'star',
        name: 'Valen',
        at: {x: 0, y: 0},
        connectedSystem: null,
        connectedID: null
      },
      {
        id: 'bank',
        type: 'bank',
        name: 'Bank',
        at: {x: 0, y: 1},
        connectedSystem: null,
        connectedID: 'portal'
      },
      {
        id: 'portal',
        type: 'portal',
        name: 'portal',
        at: {x: -1, y: 0},
        connectedSystem: null,
        connectedID: 'transit'
      },
      {
        id: 'harvest',
        type: 'harvest',
        name: 'harvest',
        at: {x: 0, y: 2},
        connectedSystem: null,
        connectedID: 'bank',
        harvestedID: 'currency2'
      },
      {
        id: 'station',
        type: 'station',
        name: 'station',
        at: {x: 1, y: 1},
        connectedSystem: null,
        connectedID: 'bank',
        wantID: 'currency2',
        installID: 'radio',
        installName: 'Radio'
      },
      {
        id: 'cargo',
        type: 'satellite',
        name: 'cargo',
        at: {x: 1, y: 2},
        connectedSystem: null,
        connectedID: null,
        message: 'Extra power$battery format',
        itemID: 'battery2'
      },
      {
        id: 'market',
        type: 'trade',
        name: 'market',
        at: {x: 1, y: -1},
        connectedSystem: null,
        connectedID: null,
        wantID: 'waste',
        giveID: 'kelp'
      },
      // MARK: Fog
      {
        id: 'transit',
        type: 'transit',
        name: 'transit',
        at: {x: -2, y: 0},
        connectedSystem: 'senni',
        connectedID: 'transit',
        mapRequirementID: 'map2'
      },
      {
        id: 'fog',
        type: 'satellite',
        name: 'fog',
        at: {x: 0, y: -1},
        connectedSystem: null,
        connectedID: 'portal',
        message: 'something broken$somehow lost',
        itemID: 'usulPortalFragment1',
        mapRequirementID: 'map1'
      },
      {
        id: 'antenna',
        type: 'antenna',
        name: 'antenna',
        at: {x: 1, y: -1},
        connectedSystem: null,
        connectedID: 'fog',
        installID: 'veil',
        installName: 'veil',
        mapRequirementID: 'map2'
      },
      {
        id: 'c_1',
        type: 'constellation',
        name: '',
        at: {x: 0.5, y: 1.5},
        connectedSystem: null,
        connectedID: null,
        structureID: 'door'
      },
      // MARK: map2
      {
        id: 'wreck',
        type: 'satellite',
        name: 'wreck',
        at: {x: 1, y: -2},
        connectedSystem: null,
        connectedID: null,
        message: 'Memories$of misfortune',
        itemID: 'record2',
        mapRequirementID: 'map2'
      }
    ]
  },
  {
    at: {x: 0, y: 3},
    systemID: 'senni',
    systemLocations: [
      {
        id: 'star',
        type: 'star',
        name: 'Senni',
        at: {x: 0, y: 0},
        connectedSystem: null,
        connectedID: null
      },
      {
        id: 'portal',
        type: 'portal',
        name: 'portal',
        at: {x: 0, y: -1},
        connectedSystem: null,
        connectedID: 'transit'
      },
      {
        id: 'cargo',
        type: 'satellite',
        name: 'cargo',
        at: {x: -1, y: 0},
        connectedSystem: null,
        connectedID: 'portal',
        message: 'extra sight$map format',
        itemID: 'map1'
      },
      {
        id: 'harvest',
        type: 'harvest',
        name: 'harvest',
        at: {x: 0, y: 1},
        connectedSystem: null,
        connectedID: null,
        harvestedID: 'currency3'
      },
      {
        id: 'station',
        type: 'station',
        name: 'station',
        at: {x: 1, y: 0},
        connectedSystem: null,
        connectedID: 'portal',
        wantID: 'currency3',
        installID: 'nav',
        installName: 'Map'
      },
      {
        id: 'transmitter',
        type: 'transmitter',
        name: 'transmitter',
        at: {x: -1, y: 1},
        connectedSystem: null,
        connectedID: null
      },
      // MARK: map1
      {
        id: 'transit',
        type: 'transit',
        name: 'transit',
        at: {x: 0, y: -2},
        connectedSystem: 'usul',
        connectedID: 'transit',
        mapRequirementID: 'map2'
      },
      {
        id: 'horadric',
        type: 'horadric',
        name: 'Horadric',
        at: {x: 0, y: 2},
        connectedSystem: null,
        connectedID: 'harvest',
        mapRequirementID: 'map1'
      },
      {
        id: 'fog',
        type: 'satellite',
        name: 'fog',
        at: {x: 2, y: 0},
        connectedSystem: null,
        connectedID: 'station',
        message: 'Extra power$battery format',
        itemID: 'battery3',
        mapRequirementID: 'map1'
      },
      {
        id: 'wreck',
        type: 'satellite',
        name: 'wreck',
        at: {x: 1, y: -2},
        connectedSystem: null,
        connectedID: null,
        message: 'Memories$of misfortune',
        itemID: 'record3',
        mapRequirementID: 'map1'
      },
      // MARK: map2
      {
        id: 'tower',
        type: 'trade',
        name: 'tower',
        at: {x: 1, y: 1},
        connectedSystem: null,
        connectedID: null,
        wantID: 'currency6',
        giveID: 'shield2',
        mapRequirementID: 'map2'
      }
    ]
  },
  {
    at: {x: 0, y: 0},
    systemID: 'aitasla',
    systemLocations: [
      {
        id: 'void',
        type: 'aitasla',
        name: 'aitasla',
        at: {x: 0, y: 0},
        connectedSystem: null,
        connectedID: null,
        mapRequirementID: 'map2'
      }
    ]
  },
]

const locationClassesByType = {
  aitasla: LocationAitasla,
  antenna: LocationAntenna,
  bank: LocationBank,
  constellation: LocationConstellation,
  harvest: LocationHarvest,
  horadric: LocationHoradric,
  portal: LocationPortal,
  satellite: LocationSatellite,
  star: LocationStar,
  station: LocationStation,
  trade: LocationTrade,
  transit: LocationTransit,
  transmitter: LocationTransmitter
}

const makeLocations = () => {
  const locations = []
  const locationsByKey = {}

  locationData.forEach(systemData => {
    const { at, systemID, systemLocations } = systemData
    const system = Systems[systemID]
    systemLocations.forEach(data => {
      const { type, id } = data
      const appendedData = {
        ...data,
        system,
        at: {
          x: at.x + data.at.x,
          y: at.y + data.at.y
        }
      }
      const location = new (locationClassesByType[type])(appendedData)
      locations.push(location)
      locationsByKey[location.key] = location
    })
  })
  return [locations, locationsByKey]
}
