//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Missions {
  constructor () {
    // assertArgs(arguments, 0);
    this.story = []
    this.currentMission = new Mission(0, '--')

    let u = verreciel.universe
    let i = verreciel.items

    var m

    // Loiqe

    // MARK: Part 0

    m = new Mission(this.story.length, '')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.spawn)
      verreciel.battery.onInstallationComplete()
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.missions.setToKnown([u.loiqe.spawn])
      u.valen.bank.addItems([i.loiqePortalKey, i.record1, Item.like(i.waste)])
    }
    m.quests = [
      new Quest(
        'Route cell to thruster',
        null,
        function () {
          return (
            verreciel.battery.thrusterPort.isReceivingItemOfType(
              ItemTypes.battery
            ) == true
          )
        },
        function () {
          verreciel.thruster.install()
        }
      ),
      new Quest(
        'Undock with thruster',
        null,
        function () {
          return (
            verreciel.capsule.location != u.loiqe.spawn &&
            u.loiqe.spawn.isKnown == true
          )
        },
        function () {}
      ),
      new Quest(
        'Accelerate with Thruster',
        null,
        function () {
          return (
            (verreciel.capsule.location == null &&
              verreciel.thruster.speed > 0) ||
            verreciel.capsule.location != null
          )
        },
        function () {
          verreciel.intercom.install()
          verreciel.thruster.lock()
        }
      ),
      new Quest(
        'Wait for arrival',
        null,
        function () {
          return u.loiqe.harvest.isKnown == true
        },
        function () {
          verreciel.cargo.install()
          verreciel.thruster.lock()
        }
      ),
      new Quest(
        'Route ' + i.currency1.name + ' to cargo',
        u.loiqe.harvest,
        function () {
          return verreciel.cargo.containsLike(i.currency1)
        },
        function () {
          verreciel.console.install()
          verreciel.thruster.unlock()
        }
      ),
      new Quest(
        'Route cargo to console',
        null,
        function () {
          return (
            verreciel.cargo.port.connection != null &&
            verreciel.cargo.port.connection == verreciel.console.port
          )
        },
        function () {}
      ),
      new Quest(
        'Undock with thruster',
        null,
        function () {
          return verreciel.capsule.location != u.loiqe.harvest
        },
        function () {
          verreciel.radar.install()
        }
      ),
      new Quest(
        'Wait for arrival',
        null,
        function () {
          return u.loiqe.city.isKnown == true
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 1

    m = new Mission(this.story.length, 'Fragments')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.city)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.cargo.addItems([Item.like(i.currency1)])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      u.valen.bank.addItems([i.loiqePortalKey, i.record1, Item.like(i.waste)])
      verreciel.cargo.port.connect(verreciel.console.port)
    }
    m.predicate = function () {
      return verreciel.cargo.contains(i.valenPortalFragment1) == true
    }
    m.quests = [
      new Quest(
        'Route ' + i.currency1.name + ' to cargo',
        u.loiqe.harvest,
        function () {
          return (
            verreciel.cargo.containsLike(i.currency1) ||
            verreciel.capsule.isDockedAtLocation(u.loiqe.city)
          )
        },
        function () {}
      ),
      new Quest(
        'Route ' + i.currency1.name + ' to trade table',
        u.loiqe.city,
        function () {
          return u.loiqe.city.isTradeAccepted == true
        },
        function () {}
      ),
      new Quest(
        'Route ' + i.valenPortalFragment1.name + ' to cargo',
        null,
        function () {
          return verreciel.cargo.contains(i.valenPortalFragment1) == true
        },
        function () {
          verreciel.progress.install()
        }
      )
    ]
    this.story.push(m)

    // MARK: Part 2

    m = new Mission(this.story.length, 'radar')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.city)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.cargo.addItems([i.valenPortalFragment1])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city
      ])
      verreciel.missions.setToCompleted([u.loiqe.city])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      u.valen.bank.addItems([i.loiqePortalKey, i.record1, Item.like(i.waste)])
      verreciel.cargo.port.connect(verreciel.console.port)
    }
    m.quests = [
      new Quest(
        'Select satellite on radar',
        u.loiqe.city,
        function () {
          return (
            verreciel.radar.port.event != null &&
            verreciel.radar.port.event == u.loiqe.satellite
          )
        },
        function () {
          verreciel.pilot.install()
          verreciel.thruster.unlock()
        }
      ),
      new Quest(
        'Route Radar to Pilot',
        null,
        function () {
          return (
            verreciel.pilot.port.origin != null &&
            verreciel.pilot.port.origin == verreciel.radar.port
          )
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 3

    m = new Mission(this.story.length, 'portal')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.city)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.cargo.addItems([i.valenPortalFragment1])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city
      ])
      verreciel.missions.setToCompleted([u.loiqe.city])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      u.valen.bank.addItems([i.loiqePortalKey, i.record1, Item.like(i.waste)])
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
    }
    m.predicate = function () {
      return verreciel.cargo.contains(i.valenPortalKey) == true
    }
    m.quests = [
      new Quest(
        'Aquire ' + i.valenPortalFragment1.name,
        u.loiqe.city,
        function () {
          return (
            verreciel.cargo.contains(i.valenPortalFragment1) == true ||
            verreciel.capsule.isDockedAtLocation(u.loiqe.horadric) == true
          )
        },
        function () {}
      ),
      new Quest(
        'Aquire ' + i.valenPortalFragment2.name,
        u.loiqe.satellite,
        function () {
          return (
            verreciel.cargo.contains(i.valenPortalFragment2) == true ||
            verreciel.capsule.isDockedAtLocation(u.loiqe.horadric) == true
          )
        },
        function () {}
      ),
      new Quest(
        'Combine fragments',
        u.loiqe.horadric,
        function () {
          return verreciel.cargo.contains(i.valenPortalKey) == true
        },
        function () {
          verreciel.exploration.install()
        }
      )
    ]
    this.story.push(m)

    // MARK: Part 4

    m = new Mission(this.story.length, 'transit')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.horadric)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.cargo.addItems([i.valenPortalKey])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric
      ])
      verreciel.missions.setToCompleted([u.loiqe.city, u.loiqe.satellite])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      u.valen.bank.addItems([i.loiqePortalKey, i.record1, Item.like(i.waste)])
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
    }
    m.predicate = function () {
      return verreciel.pilot.port.isReceivingEvent(u.valen.portal) == true && verreciel.thruster.port.isReceivingEvent(i.warpDrive) == true
    }
    m.quests = [
      new Quest(
        'Route ' + i.valenPortalKey.name + ' to Portal',
        u.loiqe.portal,
        function () {
          return (
            verreciel.capsule.isDockedAtLocation(u.loiqe.portal) &&
            verreciel.intercom.port.isReceivingEvent(i.valenPortalKey) == true
          )
        },
        function () {}
      ),
      new Quest(
        'Route portal to pilot',
        u.loiqe.portal,
        function () {
          return verreciel.pilot.port.isReceivingEvent(u.valen.portal) == true
        },
        function () {}
      ),
      new Quest(
        'Route portal to thruster',
        u.loiqe.portal,
        function () {
          return verreciel.thruster.port.isReceivingEvent(i.warpDrive) == true
        },
        function () {}
      ),
      new Quest(
        'Warp portal to valen',
        u.valen.portal,
        function () {
          return verreciel.capsule.system === Systems.valen
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 5

    m = new Mission(this.story.length, 'Valen')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.valen.portal)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.cargo.addItems([i.valenPortalKey])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal
      ])
      verreciel.missions.setToCompleted([u.loiqe.city, u.loiqe.satellite])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      u.valen.bank.addItems([i.loiqePortalKey, i.record1, Item.like(i.waste)])
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
    }
    m.predicate = function () {
      return verreciel.radio.isInstalled == true
    }
    m.quests = [
      new Quest(
        'Route Radar to Pilot',
        null,
        function () {
          return (
            verreciel.pilot.port.origin != null && verreciel.pilot.port.origin == verreciel.radar.port
          )
        },
        function () {}
      ),
      new Quest(
        'Collect ' + i.record1.name,
        u.valen.bank,
        function () {
          return verreciel.cargo.contains(i.record1)
        },
        function () {}
      ),
      new Quest(
        'Collect second cell',
        u.valen.cargo,
        function () {
          return (
            verreciel.battery.hasCell(i.battery2) ||
            verreciel.cargo.contains(i.battery2)
          )
        },
        function () {
          verreciel.battery.cellPort2.enable('empty', verreciel.grey)
        }
      ),
      new Quest(
        'Collect ' + i.currency2.name,
        u.valen.harvest,
        function () {
          return verreciel.cargo.containsLike(i.currency2)
        },
        function () {}
      ),
      new Quest(
        'Install radio',
        u.valen.station,
        function () {
          return verreciel.radio.isInstalled == true
        },
        function () {
          verreciel.journey.install()
        }
      )
    ]
    this.story.push(m)

    // MARK: Part 6

    m = new Mission(this.story.length, 'Record')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.valen.station)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.cargo.addItems([i.valenPortalKey, i.record1])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo
      ])
      u.valen.bank.addItems([i.loiqePortalKey, Item.like(i.waste)])
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
    }
    m.quests = [
      new Quest(
        'Install cell in battery',
        null,
        function () {
          return verreciel.battery.hasCell(i.battery2)
        },
        function () {}
      ),
      new Quest(
        'Power radio',
        null,
        function () {
          return verreciel.battery.isRadioPowered() == true
        },
        function () {}
      ),
      new Quest(
        'Route record to radio',
        null,
        function () {
          return verreciel.radio.port.hasItemOfType(ItemTypes.record)
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 7

    m = new Mission(this.story.length, 'Hatch')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.valen.station)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.cargo.addItems([i.valenPortalKey])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      // verreciel.battery.cellPort2.connect(verreciel.battery.radioPort);
      u.valen.bank.addItems([i.loiqePortalKey, Item.like(i.waste)])
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.radio.setRecord(i.record1)
    }
    m.predicate = function () {
      return verreciel.hatch.count > 0
    }
    m.quests = [
      new Quest(
        'Collect Waste',
        u.valen.bank,
        function () {
          return verreciel.cargo.containsLike(i.waste)
        },
        function () {
          verreciel.hatch.install()
        }
      ),
      new Quest(
        'Route waste to hatch',
        null,
        function () {
          return verreciel.hatch.port.isReceivingItemLike(i.waste)
        },
        function () {}
      ),
      new Quest(
        'Jettison Waste',
        null,
        function () {
          return verreciel.hatch.count > 0
        },
        function () {
          verreciel.completion.install()
        }
      )
    ]
    this.story.push(m)

    // MARK: Part 8

    m = new Mission(this.story.length, i.currency4.name)
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.valen.station)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.cargo.addItems([i.valenPortalKey, i.loiqePortalKey])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.radio.setRecord(i.record1)
    }
    m.predicate = function () {
      return verreciel.cargo.containsLike(i.currency4)
    }
    m.quests = [
      new Quest(
        'Collect ' + i.loiqePortalKey.name,
        u.valen.bank,
        function () {
          return verreciel.cargo.containsLike(i.loiqePortalKey)
        },
        function () {}
      ),
      new Quest(
        'Aquire ' + i.currency2.name,
        u.valen.harvest,
        function () {
          return verreciel.cargo.containsLike(i.currency2)
        },
        function () {}
      ),
      new Quest(
        'Aquire ' + i.currency1.name,
        u.loiqe.harvest,
        function () {
          return verreciel.cargo.containsLike(i.currency1)
        },
        function () {}
      ),
      new Quest(
        'Combine currencies',
        u.loiqe.horadric,
        function () {
          return verreciel.cargo.containsLike(i.currency4)
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 10

    m = new Mission(this.story.length, 'Senni')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.horadric)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        Item.like(i.currency4)
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      // verreciel.battery.cellPort2.connect(verreciel.battery.radioPort);
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.radio.setRecord(i.record1)
    }
    m.predicate = function () {
      return verreciel.cargo.contains(i.senniPortalKey)
    }
    m.quests = [
      new Quest(
        'Aquire ' + i.currency4.name,
        null,
        function () {
          return verreciel.cargo.containsLike(i.currency4)
        },
        function () {}
      ),
      new Quest(
        'Trade ' + i.currency4.name + ' for ' + i.senniPortalKey.name,
        u.loiqe.port,
        function () {
          return verreciel.cargo.contains(i.senniPortalKey)
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 11

    m = new Mission(this.story.length, 'Map')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.port)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.radio.setRecord(i.record1)
    }
    m.predicate = function () {
      return verreciel.nav.isInstalled == true
    }
    m.quests = [
      new Quest(
        'Collect ' + i.map1.name,
        u.senni.cargo,
        function () {
          return verreciel.cargo.contains(i.map1)
        },
        function () {}
      ),
      new Quest(
        'Collect ' + i.currency3.name,
        u.senni.harvest,
        function () {
          return verreciel.cargo.containsLike(i.currency3)
        },
        function () {}
      ),
      new Quest(
        'Install map',
        u.senni.station,
        function () {
          return verreciel.nav.isInstalled == true
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 12

    m = new Mission(this.story.length, 'fog')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.senni.station)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey,
        i.map1
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.station,
        u.senni.cargo
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.radio.setRecord(i.record1)
    }
    m.quests = [
      new Quest(
        'Power Map in battery',
        null,
        function () {
          return verreciel.battery.isNavPowered() == true
        },
        function () {}
      ),
      new Quest(
        'Route ' + i.map1.name + ' to map',
        null,
        function () {
          return verreciel.nav.port.hasItemOfType(ItemTypes.map)
        },
        function () {}
      ),
      new Quest(
        'Collect third cell',
        u.senni.fog,
        function () {
          return (
            verreciel.battery.hasCell(i.battery3) ||
            verreciel.cargo.contains(i.battery3)
          )
        },
        function () {
          verreciel.battery.cellPort3.enable('empty', verreciel.grey)
        }
      ),
      new Quest(
        'Install cell in battery',
        null,
        function () {
          return verreciel.battery.hasCell(i.battery3)
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 13

    m = new Mission(this.story.length, 'Helmet')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.senni.station)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.battery.cellPort3.addEvent(i.battery3)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.cargo,
        u.senni.station,
        u.senni.fog,
        u.senni.wreck
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.battery.cellPort3.connect(verreciel.battery.navPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.nav.setMap(i.map1)
      verreciel.radio.setRecord(i.record2)
      u.valen.bank.addItems([i.record1])
    }
    m.quests = [
      new Quest(
        'Route map to helmet',
        null,
        function () {
          return (
            verreciel.player.port.isReceivingFromPanel(verreciel.nav) == true
          )
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 13

    m = new Mission(this.story.length, i.usulPortalKey.name)
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.senni.station)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.battery.cellPort3.addEvent(i.battery3)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.cargo,
        u.senni.station,
        u.senni.fog,
        u.senni.wreck
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.battery.cellPort3.connect(verreciel.battery.navPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.nav.setMap(i.map1)
      verreciel.radio.setRecord(i.record2)
      u.valen.bank.addItems([i.record1])
    }
    m.predicate = function () {
      return verreciel.cargo.contains(i.usulPortalKey)
    }
    m.quests = [
      new Quest(
        'Collect ' + i.usulPortalFragment1.name,
        u.valen.fog,
        function () {
          return verreciel.cargo.containsLike(i.usulPortalFragment1)
        },
        function () {}
      ),
      new Quest(
        'Collect ' + i.usulPortalFragment2.name,
        u.loiqe.fog,
        function () {
          return verreciel.cargo.containsLike(i.usulPortalFragment2)
        },
        function () {}
      ),
      new Quest(
        'Combine fragments',
        null,
        function () {
          return verreciel.cargo.containsLike(i.usulPortalKey)
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 14

    m = new Mission(this.story.length, 'Usul')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.loiqe.horadric)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.battery.cellPort3.addEvent(i.battery3)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey,
        i.usulPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.cargo,
        u.senni.station,
        u.valen.fog,
        u.loiqe.fog,
        u.senni.fog,
        u.senni.wreck
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.battery.cellPort3.connect(verreciel.battery.navPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.nav.setMap(i.map1)
      verreciel.radio.setRecord(i.record2)
      u.valen.bank.addItems([i.record1])
    }
    m.predicate = function () {
      return verreciel.shield.isInstalled == true && verreciel.shield.port.hasEvent(i.shield) == true
    }
    m.quests = [
      new Quest(
        'Transmit to usul antenna',
        u.usul.antenna,
        function () {
          return u.usul.antenna.getSignal() >= 0.95
        },
        function () {}
      ),
      new Quest(
        'Install shield',
        u.usul.antenna,
        function () {
          return verreciel.shield.isInstalled == true
        },
        function () {}
      ),
      new Quest(
        'Power Shield in battery',
        null,
        function () {
          return verreciel.battery.isShieldPowered() == true
        },
        function () {}
      ),
      new Quest(
        'Collect ' + i.shield.name,
        u.usul.telescope,
        function () {
          return verreciel.cargo.containsLike(i.shield)
        },
        function () {}
      ),
      new Quest(
        'Route ' + i.shield.name + ' to shield',
        null,
        function () {
          return verreciel.shield.port.hasEvent(i.shield)
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 15

    m = new Mission(this.story.length, 'veil')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.usul.telescope)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.battery.cellPort3.addEvent(i.battery3)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey,
        i.usulPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav,
        verreciel.shield
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.cargo,
        u.valen.fog,
        u.senni.station,
        u.loiqe.fog,
        u.senni.fog,
        u.senni.wreck,
        u.usul.antenna,
        u.usul.telescope
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.navPort)
      verreciel.battery.cellPort3.connect(verreciel.battery.radioPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.shield.setShield(i.shield)
      verreciel.nav.setMap(i.map1)
      verreciel.radio.setRecord(i.record2)
      u.valen.bank.addItems([i.record1])
    }
    m.quests = [
      new Quest(
        'Aquire ' + i.map2.name,
        u.usul.cargo,
        function () {
          return verreciel.cargo.contains(i.map2) || verreciel.cargo.contains(i.map3) || verreciel.nav.hasMap(i.map2) || verreciel.nav.hasMap(i.map3)
        },
        function () {}
      ),
      new Quest(
        'Create ' + i.map3.name,
        null,
        function () {
          return verreciel.cargo.contains(i.map3) || verreciel.nav.hasMap(i.map3)
        },
        function () {}
      ),
      new Quest(
        'Route ' + i.map3.name + ' to map',
        null,
        function () {
          return verreciel.nav.hasMap(i.map3)
        },
        function () {}
      ),
      new Quest(
        'Install veil',
        u.valen.antenna,
        function () {
          return verreciel.veil.isInstalled == true
        },
        function () {}
      ),
      new Quest(
        'Power Veil in battery',
        null,
        function () {
          return verreciel.battery.isVeilPowered() == true
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 16

    m = new Mission(this.story.length, 'Extinguish')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.valen.antenna)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.battery.cellPort3.addEvent(i.battery3)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey,
        i.usulPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav,
        verreciel.shield,
        verreciel.veil
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.cargo,
        u.valen.fog,
        u.senni.station,
        u.loiqe.fog,
        u.senni.fog,
        u.senni.wreck,
        u.usul.antenna,
        u.usul.telescope,
        u.usul.cargo,
        u.valen.antenna,
        u.valen.wreck
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.navPort)
      verreciel.battery.cellPort3.connect(verreciel.battery.shieldPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.shield.setShield(i.shield)
      verreciel.nav.setMap(i.map3)
      verreciel.radio.setRecord(i.record3)
      u.valen.bank.addItems([i.record1, i.record2])
    }
    m.predicate = function () {
      return u.loiqe.isComplete === true && u.valen.isComplete === true && u.senni.isComplete === true && u.usul.isComplete === true
    }
    m.quests = [
      new Quest(
        'Aquire ' + i.veil1.name,
        u.loiqe.cargo,
        function () {
          return verreciel.cargo.contains(i.veil1) || verreciel.veil.hasVeil(i.veil1)
        },
        function () {}
      ),
      new Quest(
        'Power Veil in battery',
        null,
        function () {
          return verreciel.battery.isVeilPowered() == true
        },
        function () {}
      ),
      new Quest(
        'Route ' + i.veil1.name + ' to veil',
        null,
        function () {
          return verreciel.veil.hasVeil(i.veil1)
        },
        function () {}
      ),
      new Quest(
        'Power Shield in battery',
        null,
        function () {
          return verreciel.battery.isShieldPowered() == true
        },
        function () {}
      ),
      new Quest(
        'Extinguish Loiqe',
        u.loiqe,
        function () {
          return u.loiqe.isComplete === true
        },
        function () {}
      ),
      new Quest(
        'Extinguish Valen',
        u.valen,
        function () {
          return u.valen.isComplete === true
        },
        function () {}
      ),
      new Quest(
        'Extinguish Senni',
        u.senni,
        function () {
          return u.senni.isComplete === true
        },
        function () {}
      ),
      new Quest(
        'Extinguish Usul',
        u.usul,
        function () {
          return u.usul.isComplete === true
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 17

    m = new Mission(this.story.length, 'close')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.usul.portal)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.battery.cellPort3.addEvent(i.battery3)
      verreciel.cargo.addItems([
        i.loiqePortalKey,
        i.valenPortalKey,
        i.senniPortalKey,
        i.usulPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav,
        verreciel.shield,
        verreciel.veil
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.cargo,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.cargo,
        u.valen.fog,
        u.senni.station,
        u.loiqe.fog,
        u.senni.fog,
        u.senni.wreck,
        u.usul.antenna,
        u.usul.telescope,
        u.usul.cargo,
        u.valen.antenna,
        u.loiqe,
        u.valen,
        u.senni,
        u.usul
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.battery.cellPort3.connect(verreciel.battery.navPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.nav.setMap(i.map3)
      verreciel.shield.setShield(i.shield)
      verreciel.veil.setVeil(i.veil1)
      verreciel.radio.setRecord(i.record3)
      u.valen.bank.addItems([i.record1, i.record2])
    }
    m.predicate = function () {
      return verreciel.cargo.contains(i.endPortalKey)
    }
    m.quests = [
      new Quest(
        'Create ' + i.endPortalKeyFragment1.name,
        null,
        function () {
          return (
            verreciel.cargo.contains(i.endPortalKeyFragment1)
          )
        },
        function () {}
      ),
      new Quest(
        'Create ' + i.endPortalKeyFragment2.name,
        null,
        function () {
          return (
            verreciel.cargo.contains(i.endPortalKeyFragment2)
          )
        },
        function () {}
      ),
      new Quest(
        'Create ' + i.endPortalKey.name,
        null,
        function () {
          return (
            verreciel.cargo.contains(i.endPortalKey)
          )
        },
        function () {}
      )
    ]
    this.story.push(m)

    // MARK: Part 18

    m = new Mission(this.story.length, 'close')
    m.state = function () {
      verreciel.capsule.beginAtLocation(u.senni.tower)
      verreciel.battery.cellPort1.addEvent(i.battery1)
      verreciel.battery.cellPort2.addEvent(i.battery2)
      verreciel.battery.cellPort3.addEvent(i.battery3)
      verreciel.cargo.addItems([
        i.endPortalKey
      ])
      verreciel.missions.setToInstalled([
        verreciel.battery,
        verreciel.thruster,
        verreciel.console,
        verreciel.radar,
        verreciel.progress,
        verreciel.pilot,
        verreciel.exploration,
        verreciel.radio,
        verreciel.journey,
        verreciel.nav,
        verreciel.shield,
        verreciel.veil
      ])
      verreciel.missions.setToKnown([
        u.loiqe.spawn,
        u.loiqe.harvest,
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.horadric,
        u.loiqe.portal,
        u.valen.station,
        u.valen.cargo,
        u.valen.bank,
        u.senni.harvest,
        u.senni.portal,
        u.valen.portal
      ])
      verreciel.missions.setToCompleted([
        u.loiqe.city,
        u.loiqe.satellite,
        u.loiqe.cargo,
        u.valen.station,
        u.valen.cargo,
        u.loiqe.port,
        u.senni.cargo,
        u.valen.fog,
        u.senni.station,
        u.loiqe.fog,
        u.senni.fog,
        u.senni.wreck,
        u.usul.antenna,
        u.usul.telescope,
        u.usul.cargo,
        u.valen.antenna,
        u.loiqe,
        u.valen,
        u.senni,
        u.usul
      ])
      verreciel.battery.cellPort1.connect(verreciel.battery.thrusterPort)
      verreciel.battery.cellPort2.connect(verreciel.battery.radioPort)
      verreciel.battery.cellPort3.connect(verreciel.battery.navPort)
      verreciel.radar.port.connect(verreciel.pilot.port)
      verreciel.cargo.port.connect(verreciel.console.port)
      verreciel.nav.setMap(i.map3)
      verreciel.shield.setShield(i.shield1)
      verreciel.veil.setVeil(i.veil1)
      verreciel.radio.setRecord(i.record3)
      u.valen.bank.addItems([i.record1, i.record2])
    }
    m.predicate = function () {
      return u.aitasla.isKnown === true
    }
    m.quests = [
      new Quest(
        'Enter ' + u.aitasla,
        u.aitasla,
        function () {
          return (
            u.aitasla.isKnown === true
          )
        },
        function () {}
      )
    ]
    this.story.push(m)
  }

  // MARK: Tools -

  setToInstalled (panels) {
    // assertArgs(arguments, 1);
    for (let panel of panels) {
      panel.onInstallationComplete()
    }
  }

  setToKnown (locations) {
    // assertArgs(arguments, 1);
    for (let location of locations) {
      location.isKnown = true
    }
  }

  setToCompleted (locations) {
    // assertArgs(arguments, 1);
    for (let location of locations) {
      if (location.isComplete !== true) {
        location.onComplete()
      }
      location.isKnown = true
    }
  }

  refresh () {
    // assertArgs(arguments, 0);
    this.currentMission.validate()
    if (this.currentMission.isCompleted === true) {
      this.updateCurrentMission()
    }
  }

  updateCurrentMission () {
    // assertArgs(arguments, 0);
    for (let mission of this.story) {
      if (mission.isCompleted == false) {
        this.currentMission = mission
        console.info('# ---------------------------')
        console.info('# MISSION  | Reached: ' + this.currentMission.id)
        console.info('# ---------------------------')
        verreciel.game.save(this.currentMission.id)
        verreciel.helmet.addWarning(this.currentMission.name, verreciel.cyan, 3, 'mission')
        return
      }
    }
  }
}
