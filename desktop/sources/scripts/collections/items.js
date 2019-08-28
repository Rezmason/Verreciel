//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

const itemData = [
  // Misc
  {
    id: 'kelp',
    name: 'space kelp',
    type: 'waste',
    locationID: null,
    details: 'useless',
    isQuest: false,
    code: 'kelp'
  },
  {
    id: 'waste',
    name: 'waste',
    type: 'waste',
    locationID: null,
    details: 'useless',
    isQuest: false,
    code: 'waste'
  },

  // "Keys"
  {
    id: 'endPortalKey',
    name: 'aitasla key',
    type: 'key',
    locationID: 'aitasla',
    details: 'aitasla warp key',
    isQuest: true,
    code: 'end-key'
  },
  {
    id: 'endPortalKeyFragment1',
    name: 'horizontal part',
    type: 'fragment',
    locationID: null,
    details: 'half Portal key',
    isQuest: true,
    code: 'end-key-1'
  },
  {
    id: 'endPortalKeyFragment2',
    name: 'vertical part',
    type: 'fragment',
    locationID: null,
    details: 'half Portal key',
    isQuest: true,
    code: 'end-key-2'
  },
  {
    id: 'loiqePortalKey',
    name: 'loiqe key',
    type: 'key',
    locationID: 'loiqe_portal',
    details: 'complete key',
    isQuest: true,
    code: 'loiqe-key'
  },
  {
    id: 'senniPortalKey',
    name: 'senni key',
    type: 'key',
    locationID: 'senni_portal',
    details: 'complete key',
    isQuest: true,
    code: 'senni-key'
  },
  {
    id: 'usulPortalFragment1',
    name: 'usul Part 1',
    type: 'fragment',
    locationID: null,
    details: 'half Portal key',
    isQuest: true,
    code: 'usul-key-1'
  },
  {
    id: 'usulPortalFragment2',
    name: 'usul Part 2',
    type: 'fragment',
    locationID: null,
    details: 'half Portal key',
    isQuest: true,
    code: 'usul-key-2'
  },
  {
    id: 'usulPortalKey',
    name: 'usul key',
    type: 'key',
    locationID: 'usul_portal',
    details: 'complete key',
    isQuest: true,
    code: 'usul-key'
  },
  {
    id: 'valenPortalFragment1',
    name: 'valen part 1',
    type: 'fragment',
    locationID: null,
    details: 'half Portal key',
    isQuest: true,
    code: 'valen-key-1'
  },
  {
    id: 'valenPortalFragment2',
    name: 'valen part 2',
    type: 'fragment',
    locationID: null,
    details: 'half Portal key',
    isQuest: true,
    code: 'valen-key-2'
  },
  {
    id: 'valenPortalKey',
    name: 'valen key',
    type: 'key',
    locationID: 'valen_portal',
    details: 'complete key',
    isQuest: true,
    code: 'valen-key'
  },

  // "Etc.."
  {
    id: 'warpDrive',
    name: 'warpdrive',
    type: 'drive',
    locationID: null,
    details: 'local warpdrive',
    isQuest: true,
    code: 'warp'
  },

  // "Records"
  {
    id: 'record1',
    name: 'record',
    type: 'record',
    locationID: null,
    details: 'audio format',
    isQuest: true,
    code: 'record1'
  },
  {
    id: 'record2',
    name: 'disk',
    type: 'record',
    locationID: null,
    details: 'audio format',
    isQuest: true,
    code: 'record2'
  },
  {
    id: 'record3',
    name: 'tape',
    type: 'record',
    locationID: null,
    details: 'audio format',
    isQuest: true,
    code: 'record3'
  },
  {
    id: 'record4',
    name: 'drive',
    type: 'record',
    locationID: null,
    details: 'audio format',
    isQuest: true,
    code: 'record4'
  },

  // "Maps"
  {
    id: 'map1',
    name: 'Red Map',
    type: 'map',
    locationID: null,
    details: 'map expension',
    isQuest: true,
    code: 'map-1'
  },
  {
    id: 'map2',
    name: 'Cyan Map',
    type: 'map',
    locationID: null,
    details: 'map expension',
    isQuest: true,
    code: 'map-2'
  },
  {
    id: 'map3',
    name: 'Opal Map',
    type: 'map',
    locationID: null,
    details: 'map expension',
    isQuest: true,
    code: 'map-3'
  },

  // "Shields(fields)"

  // "Harvest"
  {
    id: 'currency1',
    name: 'metal',
    type: 'currency',
    locationID: null,
    details: 'trading currency',
    isQuest: false,
    code: 'currency-1'
  },
  {
    id: 'currency2',
    name: 'sutal',
    type: 'currency',
    locationID: null,
    details: 'trading currency',
    isQuest: false,
    code: 'currency-2'
  },
  {
    id: 'currency3',
    name: 'vital',
    type: 'currency',
    locationID: null,
    details: 'trading currency',
    isQuest: false,
    code: 'currency-3'
  },
  {
    id: 'currency4',
    name: 'meseta',
    type: 'currency',
    locationID: null,
    details: 'From 1 & 2',
    isQuest: false,
    code: 'currency-4'
  },
  {
    id: 'currency5',
    name: 'suveta',
    type: 'currency',
    locationID: null,
    details: 'From 2 & 3',
    isQuest: false,
    code: 'currency-5'
  },
  {
    id: 'currency6',
    name: 'icon',
    type: 'currency',
    locationID: null,
    details: 'From 4 & 5',
    isQuest: false,
    code: 'currency-6'
  },
  {
    id: 'record_oquonie',
    name: 'record',
    type: 'record',
    locationID: null,
    details: 'wet',
    isQuest: true,
    code: 'record5'
  },
  {
    id: 'shield',
    name: 'glass',
    type: 'shield',
    locationID: null,
    details: 'star sand',
    isQuest: true,
    code: 'shield-1'
  },
  {
    id: 'shield2',
    name: 'mirror',
    type: 'shield',
    locationID: null,
    details: 'red mirror',
    isQuest: true,
    code: 'shield-2'
  },

  // "Batteries"
  {
    id: 'battery1',
    name: 'cell',
    type: 'battery',
    locationID: null,
    details: 'power source',
    isQuest: true,
    code: 'battery-1'
  },
  {
    id: 'battery2',
    name: 'cell',
    type: 'battery',
    locationID: null,
    details: 'power source',
    isQuest: true,
    code: 'battery-2'
  },
  {
    id: 'battery3',
    name: 'cell',
    type: 'battery',
    locationID: null,
    details: 'power source',
    isQuest: true,
    code: 'battery-3'
  },
  // Veils

  {
    id: 'veil1',
    name: 'sphere veil',
    type: 'veil',
    locationID: null,
    details: 'dyson sphere',
    isQuest: true,
    code: 'veil-1'
  },

  // "Echoes"
  {
    id: 'teapot',
    name: 'a teapot',
    type: 'unknown',
    locationID: null,
    details: 'is paradise',
    isQuest: true,
    code: 'echoes-1'
  },
]

class ItemTypes {}
setEnumValues(ItemTypes, [
  'generic',
  'fragment',
  'battery',
  'star',
  'quest',
  'waste',
  'panel',
  'key',
  'currency',
  'drive',
  'cargo',
  'shield',
  'map',
  'record',
  'veil',
  'unknown'
])

const makeItems = () => {
  const collection = {}
  itemData.forEach(data => {
    const {id, name, type, locationID, details, isQuest, code} = data
    const item = new Item(name, ItemTypes[type], locationID, details, isQuest, code)
    collection[id] = item
  })
  return collection
}
