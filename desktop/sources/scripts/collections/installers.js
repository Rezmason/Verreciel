const installerData = [
  {
    cause: {
      type: 'isBatteryPortPowered',
      batteryPortID: 'thrusterPort'
    },
    result: {
      subject: 'thruster',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'thrusterActive'
    },
    result: {
      subject: 'intercom',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'locationIsKnown',
      locationAddress: {
        systemID: 'loiqe',
        id: 'harvest'
      }
    },
    result: {
      subject: 'cargo',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'cargoContains',
      itemID: 'currency1'
    },
    result: {
      subject: 'console',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'locationIsComplete',
      locationAddress: {
        systemID: 'loiqe',
        id: 'city'
      }
    },
    result: {
      subject: 'radar',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'cargoContains',
      itemID: 'valenPortalFragment1'
    },
    result: {
      subject: 'progress',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'locationIsSelected',
      locationAddress: {
        systemID: 'loiqe',
        id: 'satellite'
      }
    },
    result: {
      subject: 'pilot',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'cargoContains',
      itemID: 'valenPortalKey'
    },
    result: {
      subject: 'exploration',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'or',
      conditions: [
        {
          type: 'cargoContains',
          itemID: 'battery2'
        },
        {
          type: 'batteryContains',
          itemID: 'battery2'
        }
      ]
    },
    result: {
      subject: 'battery',
      portID: 'cellPort2',
      type: 'enablePort'
    }
  },
  {
    cause: {
      type: 'panelIsInstalled',
      panelID: 'radio'
    },
    result: {
      subject: 'journey',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'cargoContains',
      itemID: 'waste'
    },
    result: {
      subject: 'hatch',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'hatchUsed'
    },
    result: {
      subject: 'completion',
      type: 'install'
    }
  },
  {
    cause: {
      type: 'or',
      conditions: [
        {
          type: 'cargoContains',
          itemID: 'battery3'
        },
        {
          type: 'batteryContains',
          itemID: 'battery3'
        }
      ]
    },
    result: {
      subject: 'battery',
      portID: 'cellPort3',
      type: 'enablePort'
    }
  }
]

const makeInstallers = () => installerData.map(data => new Installer(data))
