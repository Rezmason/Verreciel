//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

const itemData = [
  // Misc
  // {
  //   id: 'kelp',
  //   name: 'space kelp',
  //   type: 'waste',
  //   portalAddress: null,
  //   details: 'useless',
  //   isDestroyable: true
  // },
  {
    id: 'waste',
    name: 'waste',
    type: 'waste',
    portalAddress: null,
    details: 'useless',
    isDestroyable: true
  },

  // "Keys"
  {
    id: 'endPortalKey',
    name: 'aitasla key',
    type: 'key',
    portalAddress: {
      systemID: 'aitasla',
      id: 'void'
    },
    details: 'aitasla warp key',
    isDestroyable: false
  },
  {
    id: 'endPortalKeyFragment1',
    name: 'horizontal part',
    type: 'fragment',
    portalAddress: null,
    details: 'half Portal key',
    isDestroyable: false
  },
  {
    id: 'endPortalKeyFragment2',
    name: 'vertical part',
    type: 'fragment',
    portalAddress: null,
    details: 'half Portal key',
    isDestroyable: false
  },
  {
    id: 'loiqePortalKey',
    name: 'loiqe key',
    type: 'key',
    portalAddress: {
      systemID: 'loiqe',
      id: 'portal'
    },
    details: 'complete key',
    isDestroyable: false
  },
  {
    id: 'senniPortalKey',
    name: 'senni key',
    type: 'key',
    portalAddress: {
      systemID: 'senni',
      id: 'portal'
    },
    details: 'complete key',
    isDestroyable: false
  },
  {
    id: 'usulPortalFragment1',
    name: 'usul Part 1',
    type: 'fragment',
    portalAddress: null,
    details: 'half Portal key',
    isDestroyable: false
  },
  {
    id: 'usulPortalFragment2',
    name: 'usul Part 2',
    type: 'fragment',
    portalAddress: null,
    details: 'half Portal key',
    isDestroyable: false
  },
  {
    id: 'usulPortalKey',
    name: 'usul key',
    type: 'key',
    portalAddress: {
      systemID: 'usul',
      id: 'portal'
    },
    details: 'complete key',
    isDestroyable: false
  },
  {
    id: 'valenPortalFragment1',
    name: 'valen part 1',
    type: 'fragment',
    portalAddress: null,
    details: 'half Portal key',
    isDestroyable: false
  },
  {
    id: 'valenPortalFragment2',
    name: 'valen part 2',
    type: 'fragment',
    portalAddress: null,
    details: 'half Portal key',
    isDestroyable: false
  },
  {
    id: 'valenPortalKey',
    name: 'valen key',
    type: 'key',
    portalAddress: {
      systemID: 'valen',
      id: 'portal'
    },
    details: 'complete key',
    isDestroyable: false
  },

  // "Etc.."
  // {
  //   id: 'warpDrive',
  //   name: 'warpdrive',
  //   type: 'drive',
  //   portalAddress: null,
  //   details: 'local warpdrive',
  //   isDestroyable: false
  // },

  // "Records"
  {
    id: 'record1',
    name: 'record',
    type: 'record',
    portalAddress: null,
    details: 'audio format',
    isDestroyable: false
  },
  {
    id: 'record2',
    name: 'disk',
    type: 'record',
    portalAddress: null,
    details: 'audio format',
    isDestroyable: false
  },
  {
    id: 'record3',
    name: 'tape',
    type: 'record',
    portalAddress: null,
    details: 'audio format',
    isDestroyable: false
  },
  {
    id: 'record4',
    name: 'drive',
    type: 'record',
    portalAddress: null,
    details: 'audio format',
    isDestroyable: false
  },

  // "Maps"
  {
    id: 'map1',
    name: 'Red Map',
    type: 'map',
    portalAddress: null,
    details: 'map expension',
    isDestroyable: false
  },
  {
    id: 'map2',
    name: 'Cyan Map',
    type: 'map',
    portalAddress: null,
    details: 'map expension',
    isDestroyable: false
  },
  {
    id: 'map3',
    name: 'Opal Map',
    type: 'map',
    portalAddress: null,
    details: 'map expension',
    isDestroyable: false
  },

  // "Shields(fields)"

  // "Harvest"
  {
    id: 'currency1',
    name: 'metal',
    type: 'currency',
    portalAddress: null,
    details: 'trading currency',
    isDestroyable: true
  },
  {
    id: 'currency2',
    name: 'sutal',
    type: 'currency',
    portalAddress: null,
    details: 'trading currency',
    isDestroyable: true
  },
  {
    id: 'currency3',
    name: 'vital',
    type: 'currency',
    portalAddress: null,
    details: 'trading currency',
    isDestroyable: true
  },
  {
    id: 'currency4',
    name: 'meseta',
    type: 'currency',
    portalAddress: null,
    details: 'From 1 & 2',
    isDestroyable: true
  },
  {
    id: 'currency5',
    name: 'suveta',
    type: 'currency',
    portalAddress: null,
    details: 'From 2 & 3',
    isDestroyable: true
  },
  {
    id: 'currency6',
    name: 'icon',
    type: 'currency',
    portalAddress: null,
    details: 'From 4 & 5',
    isDestroyable: true
  },
  // {
  //   id: 'record_oquonie',
  //   name: 'record',
  //   type: 'record',
  //   portalAddress: null,
  //   details: 'wet',
  //   isDestroyable: false
  // },
  {
    id: 'shield',
    name: 'glass',
    type: 'shield',
    portalAddress: null,
    details: 'star sand',
    isDestroyable: false
  },
  {
    id: 'shield2',
    name: 'mirror',
    type: 'shield',
    portalAddress: null,
    details: 'red mirror',
    isDestroyable: false
  },

  // "Batteries"
  {
    id: 'battery1',
    name: 'cell',
    type: 'battery',
    portalAddress: null,
    details: 'power source',
    isDestroyable: false
  },
  {
    id: 'battery2',
    name: 'cell',
    type: 'battery',
    portalAddress: null,
    details: 'power source',
    isDestroyable: false
  },
  {
    id: 'battery3',
    name: 'cell',
    type: 'battery',
    portalAddress: null,
    details: 'power source',
    isDestroyable: false
  },
  // Veils

  {
    id: 'veil1',
    name: 'sphere veil',
    type: 'veil',
    portalAddress: null,
    details: 'dyson sphere',
    isDestroyable: false
  },

  // "Echoes"
  {
    id: 'teapot',
    name: 'a teapot',
    type: 'unknown',
    portalAddress: null,
    details: 'is paradise',
    isDestroyable: false
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
  const itemsByID = {}
  itemData.forEach(data => {
    const item = new Item(data)
    itemsByID[data.id] = item
  })
  return itemsByID
}
