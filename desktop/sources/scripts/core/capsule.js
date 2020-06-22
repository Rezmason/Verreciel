//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Capsule extends Empty {
  // MARK: Default -

  constructor () {
    super()

    console.info('^ Capsule | Init')

    this.at = verreciel.universe.loiqe.spawn.at.clone()
    this.direction = 1
    this.system = Systems.loiqe
    this.shieldRoot = new Empty()
    this.radiation = 0
    this.isWarping = false
    this.isDocked = false
    this.isFleeing = false
    this.isReturning = false
    this.panels = []
    this.previousLocations = []

    this.mesh = new Empty()
    this.mesh.position.set(0, 0, 0)
    this.direction = 0
    this.add(this.mesh)

    // Interface
    // Monitors
    this.addPanel(verreciel.journey)
    this.addPanel(verreciel.exploration)
    this.addPanel(verreciel.progress)
    this.addPanel(verreciel.completion)

    // Panels
    this.addPanel(verreciel.battery)
    this.addPanel(verreciel.hatch)
    this.addPanel(verreciel.console)
    this.addPanel(verreciel.cargo)
    this.addPanel(verreciel.intercom)
    this.addPanel(verreciel.pilot)
    this.addPanel(verreciel.radar)
    this.addPanel(verreciel.thruster)

    this.addPanel(verreciel.above)
    this.addPanel(verreciel.below)

    verreciel.hatch.rotation.y = degToRad(45)
    verreciel.console.rotation.y = degToRad(90)
    verreciel.cargo.rotation.y = degToRad(135)
    verreciel.intercom.rotation.y = degToRad(180)
    verreciel.pilot.rotation.y = degToRad(225)
    verreciel.radar.rotation.y = degToRad(270)
    verreciel.thruster.rotation.y = degToRad(315)

    verreciel.journey.rotation.y = verreciel.battery.rotation.y
    verreciel.exploration.rotation.y = verreciel.console.rotation.y
    verreciel.progress.rotation.y = verreciel.intercom.rotation.y
    verreciel.completion.rotation.y = verreciel.radar.rotation.y

    // Widgets
    verreciel.radar.footer.add(verreciel.nav)
    verreciel.battery.footer.add(verreciel.radio)
    verreciel.console.footer.add(verreciel.shield)
    verreciel.intercom.footer.add(verreciel.veil)
  }

  addPanel (panel) {
    this.add(panel)
    this.panels.push(panel)
  }

  whenStart () {
    super.whenStart()
    console.info('+ Capsule | Start')
  }

  whenRenderer () {
    super.whenRenderer()
    if (this.closestKnownLocation().distance > 1.5 && this.isWarping == false) {
      verreciel.helmet.addWarning('Returning', null, 0.1, 'radiation')
      verreciel.helmet.addPassive('stamina exhausted')
      this.autoReturn()
    } else if (this.isFleeing == true) {
      verreciel.helmet.addWarning('Auto-Pilot', null, 0.1, 'radiation')
    } else if (this.radiation > 0) {
      verreciel.helmet.addWarning(
        'Radiation ' + (this.radiation * 100).toFixed(1) + '%',
        null,
        0.1,
        'radiation'
      )
    }
  }

  beginAtLocation (location) {
    this.at.copy(location.at)
    this.location = location
    this.location.isKnown = true
    this.dock(location)
    this.docked()
    verreciel.radar.addTarget(location)
    verreciel.space.onSystemEnter(location.system)
  }

  whenSecond () {
    super.whenSecond()
    let cl = this.closestLocation()
    if (cl.system != null && cl.system != this.system) {
      verreciel.space.onSystemEnter(cl.system)
    }
  }

  closestLocation () {
    var closestLocation = null
    for (let location of verreciel.locations) {
      if (closestLocation == null) {
        closestLocation = location
      }
      if (location.distance > closestLocation.distance) {
        continue
      }
      closestLocation = location
    }
    return closestLocation
  }

  closestStar () {
    var star = null

    switch (this.system) {
      case Systems.loiqe:
        star = verreciel.universe.loiqe.star
        break
      case Systems.valen:
        star = verreciel.universe.valen.star
        break
      case Systems.senni:
        star = verreciel.universe.senni.star
        break
      case Systems.usul:
        star = verreciel.universe.usul.star
        break
      case Systems.aitasla:
        star = verreciel.universe.aitasla.star
        break
      default:
        star = verreciel.universe.loiqe.star
    }

    return star
  }

  closestKnownLocation () {
    var closestLocation = null
    for (let location of verreciel.locations) {
      if (location.isKnown == false) {
        continue
      }
      if (closestLocation == null) {
        closestLocation = location
      }
      if (location.distance > closestLocation.distance) {
        continue
      }
      closestLocation = location
    }
    return closestLocation
  }

  // MARK: Warping -

  warpTo (location) {
    if (location == null) {
      return
    }

    let portal = this.location
    portal.pilotPort.disconnect()
    portal.thrusterPort.disconnect()
    portal.onWarp()

    location.isKnown = true
    verreciel.radar.addTarget(location)
    this.warpLocation = location
    this.isWarping = true
    this.undock()
  }

  warpStop () {
    this.isWarping = false
    this.warpLocation = null
  }

  // MARK: Docking -

  dock (newLocation) {
    if (!this.isDocked) {
      this.location = newLocation
      verreciel.thruster.disable()
      verreciel.helmet.addPassive('Approaching ' + this.location.name)
    }
  }

  docked () {
    this.lastLocation = this.location
    this.previousLocations.push(this.location)
    if (this.isFleeing == true) {
      this.isFleeing = false
      verreciel.thruster.unlock()
    }
    this.isReturning = false

    this.isDocked = true
    this.at.copy(this.location.at)
    this.location.onDock()
    verreciel.radar.removeTarget()

    verreciel.helmet.addPassive('Docked at ' + this.location.name)

    verreciel.intercom.connectToLocation(this.location)
    verreciel.ghost.report(LogType.docked, this.location.name)
  }

  undock () {
    const location = this.location
    this.location.onUndock()
    this.isDocked = false
    this.location = null
    verreciel.thruster.enable()
    verreciel.helmet.addPassive('in flight')
    verreciel.intercom.disconnectFromLocation()
    if (verreciel.radar.port.hasEvent(location)) {
      verreciel.radar.removeTarget()
    }
  }

  // MARK: Fleeing -

  flee () {
    if (this.isDocked == true) {
      this.undock()
    }
    this.isFleeing = true
    verreciel.thruster.lock()
    verreciel.thruster.speed = verreciel.thruster.maxSpeed()
    verreciel.radar.addTarget(this.lastLocation)
  }

  autoReturn () {
    this.isReturning = true
    verreciel.thruster.lock()
    verreciel.thruster.speed = verreciel.thruster.maxSpeed()
    verreciel.radar.addTarget(this.closestKnownLocation())
  }

  // MARK: Custom -

  teleport (location) {
    this.location = location
    this.at.copy(this.location.at)
    this.isDocked = true
    this.location.onDock()
    verreciel.intercom.connectToLocation(this.location)
    verreciel.radar.removeTarget()
    verreciel.helmet.addPassive('Docked at ' + this.location.name)
  }

  isDockedAtLocation (location) {
    return (
      this.isDocked == true &&
      this.location != null &&
      this.location == location
    )
  }

  hasShield () {
    return (
      verreciel.shield.isPowered() == true &&
      verreciel.shield.port.hasItemOfType(ItemTypes.shield) == true
    )
  }

  // MARK: Systems -

  systemsInstalledCount () {
    var count = 0
    for (let panel of this.panels) {
      if (panel.isInstalled == true) {
        count += 1
      }
    }
    return count
  }

  systemsCount () {
    return this.panels.length
  }
}
