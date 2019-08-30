const conditionsByType = {
  and: ({ conditions }) => {
    return conditions.every(condition => {
      const result = conditionsByType[condition.type](condition)
      return result
    })
  },
  batteryContains: ({ itemID }) =>
    verreciel.battery.hasCell(verreciel.items[itemID]) || verreciel.cargo.contains(verreciel.items[itemID]),
  capsuleIsDocked: () =>
    verreciel.capsule.isDocked === true,
  cargoContains: ({ itemID }) =>
    verreciel.cargo.containsLike(verreciel.items[itemID]),
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
  thrusterActive: () =>
    verreciel.thruster.speed > 0
}

const makeCondition = data => () => conditionsByType[data.type](data)
