const conditionsByType = {
  and: ({ conditions }) =>
    conditions.every(condition => conditionsByType[condition.type](condition)),
  batteryContains: ({ itemID }) =>
    verreciel.battery.hasCell(verreciel.items[itemID]) || verreciel.cargo.contains(verreciel.items[itemID]),
  capsuleIsDocked: () =>
    verreciel.capsule.isDocked === true,
  cargoContains: ({ itemID }) =>
    verreciel.cargo.containsLike(verreciel.items[itemID]),
  cargoIsFull: () =>
    verreciel.cargo.isFull(),
  hatchUsed: () =>
    verreciel.hatch.count > 0,
  isBatteryPortPowered: ({ batteryPortID }) =>
    verreciel.battery[batteryPortID].isReceivingItemOfType(ItemTypes.battery),
  locationIsComplete: ({ locationAddress }) =>
    verreciel.universe[locationAddress.systemID][locationAddress.id].isComplete === true,
  locationIsKnown: ({ locationAddress }) =>
    verreciel.universe[locationAddress.systemID][locationAddress.id].isKnown === true,
  locationIsSelected: ({ locationAddress }) =>
    verreciel.universe[locationAddress.systemID][locationAddress.id].isSelected === true,
  not: ({ condition }) =>
    !conditionsByType[condition.type](condition),
  or: ({ conditions }) =>
    conditions.some(condition => conditionsByType[condition.type](condition)),
  panelIsInstalled: ({ panelID }) =>
    verreciel[panelID].isInstalled,
  thrusterAtOrAboveSpeed: ({ speed }) =>
    verreciel.thruster.speed >= speed
}

const makeCondition = data => () => conditionsByType[data.type](data)
