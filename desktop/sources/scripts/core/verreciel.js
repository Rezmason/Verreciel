//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Verreciel {
  constructor () {
  }

  install () {
    this.version = 'r1'

    this.phase = Phase.install

    this.element = document.createElement('verreciel')
    document.body.appendChild(this.element)

    const defaultTheme = {
      background: '#111',
      f_high: '#ffb545',
      f_med: '#72dec2',
      f_low: '#ffffff',
      f_inv: '#000',
      b_high: '#ffffff',
      b_med: '#72dec2',
      b_low: '#aaaaaa',
      b_inv: '#ffb545'
    }

    this.theme = new Theme(defaultTheme)

    this.theme.install(document.body, () => {
      if (!this.root) { return }
      const compatible = this.theme.floats()
      this.colorPalette[0].setRGB(compatible.f_high.r, compatible.f_high.g, compatible.f_high.b)
      this.colorPalette[1].setRGB(compatible.f_med.r, compatible.f_med.g, compatible.f_med.b)
      this.colorPalette[2].setRGB(compatible.f_low.r, compatible.f_low.g, compatible.f_low.b)
      this.root.updateColorPalette()
    })

    this.colorPalette = [
      new THREE.Color(1, 0, 0), // red
      new THREE.Color(0.44, 0.87, 0.76), // cyan
      new THREE.Color(1, 1, 1) // white
    ]

    // Colors
    this.clear = new THREE.Vector4(0, 0, 0, 0)
    this.black = new THREE.Vector4(0, 0, 0, 1)
    this.grey = new THREE.Vector4(0, 0, 0.5, 1)
    this.white = new THREE.Vector4(0, 0, 1, 1)
    this.red = new THREE.Vector4(1, 0, 0, 1)
    this.cyan = new THREE.Vector4(0, 1, 0, 1)

    this.controller = new Controller()
    this.fps = 60
    this.camera = new THREE.PerspectiveCamera(105, 1, 0.0001, 10000)
    this.raycaster = new THREE.Raycaster()
    this.numClicks = 0
    this.clock = new THREE.Clock()
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0, 0, 0)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // this.renderer.sortObjects = false;
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(0, 0)

    this.element.appendChild(this.renderer.domElement)
    this.lastMousePosition = new THREE.Vector2()
    this.mouseMoved = false
    this.waitingForMouseUp = false
    this.music = new Music()

    this.animator = new Animator()
    this.ghost = new Ghost()

    // Collections
    this.items = makeItems()
    this.recipes = makeRecipes()
    const [locations, universe] = makeLocations()
    this.locations = locations
    this.universe = universe
    this.locations.forEach(location => {
      location.connect()
    })
    this.installers = makeInstallers()

    // Panels
    this.battery = new Battery()
    this.pilot = new Pilot()
    this.hatch = new Hatch()
    this.intercom = new Intercom()
    this.cargo = new Cargo()
    this.thruster = new Thruster()
    this.console = new Console()
    this.radar = new Radar()
    this.above = new Above()
    this.below = new Below()

    // Monitors
    this.journey = new Journey()
    this.exploration = new Exploration()
    this.progress = new Progress()
    this.completion = new Complete()

    this.radio = new Radio()
    this.nav = new Nav()
    this.shield = new Shield()
    this.veil = new Veil()

    // Core
    this.game = new Game()
    this.capsule = new Capsule()
    this.player = new Player()
    this.space = new Space()
    this.helmet = new Helmet()

    if (!DEBUG_DISABLE_MISSIONS) {
      this.missions = new Missions()
    }

    this.render = this.render.bind( this )
  }

  start (jump_mission) {
    this.theme.start()
    this.phase = Phase.start
    console.info('Starting Verreciel')

    this.mouseIsDown = false
    document.addEventListener('mousemove', this.mouseMove.bind(this), false)
    document.addEventListener('mousedown', this.mouseDown.bind(this), false)
    document.addEventListener('mouseup', this.mouseUp.bind(this), false)
    document.addEventListener('wheel', this.mouseWheel.bind(this), false)
    window.addEventListener('resize', this.windowResize.bind(this), false)

    document.addEventListener('keydown', this.keyDown.bind(this), false)

    this.windowResize()

    this.root = new Empty()
    this.wires = []

    this.scene.add(this.root.element)

    this.root.add(this.player)
    this.root.add(this.helmet)
    this.root.add(this.capsule)
    this.root.add(this.space)
    this.root.add(this.ghost)

    this.ghost.whenStart()
    this.player.whenStart()
    this.helmet.whenStart()
    this.capsule.whenStart()
    this.space.whenStart()
    this.game.whenStart(jump_mission)

    this.locations.forEach(location => location.whenStart())

    if (DEBUG_DISABLE_MISSIONS) {
      this.capsule.beginAtLocation(this.universe.loiqe.spawn)
      this.battery.install()
      this.battery.cellPort1.enable()
      this.battery.cellPort1.addEvent(this.items.battery1)
      // this.battery.cellPort2.enable('empty', this.grey)
      // this.battery.cellPort3.enable('empty', this.grey)
      // this.locations.forEach(location => {
      //   location.isKnown = true
      // })
      this.universe.valen.bank.addItems([
        this.items.loiqePortalKey,
        this.items.record1,
        this.items.waste
      ])

      this.universe.loiqe.spawn.isKnown = true

      // this.thruster.install()
      // this.intercom.install()
      // this.cargo.install()
      // this.console.install()
      // this.radar.install()
      // this.progress.install()
      // this.pilot.install()
      // this.exploration.install()
      // this.journey.install()
      // this.hatch.install()
      // this.completion.install()

      // this.nav.install()
      // this.battery.cellPort3.addEvent(this.items.battery3)
      // this.battery.cellPort3.connect(this.battery.navPort)
      // this.nav.setMap(this.items.map3)
    }

    if (DEBUG_SHOW_STATS) {
      this.stats = new Stats()
      this.stats.showPanel(1)
      document.body.appendChild(this.stats.dom)
    }

    this.root.whenResize()
    this.render()
  }

  reset () {
    this.game.reset()
  }

  updateWireAnimations() {
    for( let i = 0; i < this.wires.length; i++ ) {
      this.wires[i].animate()
    }
  }

  render () {
    this.phase = Phase.render
    requestAnimationFrame(this.render)

    if (DEBUG_SHOW_STATS) {
      this.stats.begin()
    }

    var delta = this.clock.getDelta()

    this.game.tick( delta )
    this.animator.updateAnimations( delta )
    this.updateWireAnimations()

    this.music.updateData()
    for (let i = 0; i < this.game.gameSpeed; i++) {
      // TODO: divide role of whenRenderer
      // between game tick and render logic
      this.root.whenRenderer()
      this.locations.forEach(location => location.whenRenderer())
    }
    this.helmet.updatePortWires()

    this.renderer.render(this.scene, this.camera)

    this.phase = Phase.idle

    if (DEBUG_SHOW_STATS) {
      this.stats.end()
    }

  }

  mouseDown (e) {
    e.preventDefault()
    if (this.player.isLocked) {
      return
    }

    this.mouseIsDown = true
    this.mouseMoved = false
    this.waitingForMouseUp = true

    this.lastMousePosition.x = e.clientX / this.width
    this.lastMousePosition.y = e.clientY / this.height

    this.player.canAlign = false
    this.helmet.canAlign = false

    let hits = this.getHits().filter(hit => this.isEnabledTapTarget(hit, "mousedown"))
    hits.sort(this.hasShortestDistance)
    for (let hit of hits) {
      if (hit.object.node.trigger.tap()) {
        this.numClicks++
        this.waitingForMouseUp = false
        break
      }
    }
  }

  mouseMove (e) {
    e.preventDefault()
    if (!this.mouseIsDown) {
      return
    }
    if (this.player.isLocked) {
      return
    }

    this.mouseMoved = true

    let mouseX = e.clientX / this.width
    let mouseY = e.clientY / this.height

    let dragX = mouseX - this.lastMousePosition.x
    let dragY = mouseY - this.lastMousePosition.y

    this.lastMousePosition.x = mouseX
    this.lastMousePosition.y = mouseY

    this.player.accelY += dragX
    this.player.accelX += dragY
  }

  mouseUp (e) {
    e.preventDefault()
    this.mouseIsDown = false
    if (this.player.isLocked) {
      return
    }

    this.player.canAlign = true
    this.helmet.canAlign = true

    if (this.waitingForMouseUp && !this.mouseMoved) {
      e.preventDefault()
      let hits = this.getHits().filter(hit => this.isEnabledTapTarget(hit, "mouseup"))
      if (hits.length > 0 && this.ghost.isReplaying) {
        this.ghost.disappear()
      } else {
        this.numClicks++
        hits.sort(this.hasShortestDistance)
        for (let hit of hits) {
          if (hit.object.node.trigger.tap()) {
            break
          }
        }
      }
    }

    this.waitingForMouseUp = false;
  }

  mouseWheel (e) {
    // e.preventDefault() // https://www.chromestatus.com/features/6662647093133312
    if (this.mouseIsDown || this.player.isLocked) {
      return
    }
    this.player.accelY += e.deltaX * -0.001
    this.player.accelX += e.deltaY * -0.001
  }

  isEnabledTapTarget (hit, eventType) {
    let node = hit.object.node
    return (
      node instanceof SceneTapTarget &&
      node.trigger.isEnabled == true &&
      node.type == eventType &&
      node.opacityFromTop > 0
    )
  }

  hasShortestDistance (hit1, hit2) {
    if (hit1.distSquared == null) {
      hit1.distSquared = hit1.object.node.getDistSquared(hit1.point)
    }
    if (hit2.distSquared == null) {
      hit2.distSquared = hit2.object.node.getDistSquared(hit2.point)
    }
    return hit1.distSquared - hit2.distSquared
  }

  getHits () {
    let mouse = new THREE.Vector2()
    mouse.x = this.lastMousePosition.x * 2 - 1
    mouse.y = -this.lastMousePosition.y * 2 + 1

    this.raycaster.setFromCamera(mouse, this.camera)
    return this.raycaster.intersectObjects(this.scene.children, true)
  }

  windowResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
    if (this.root != null) {
      this.root.whenResize()
    }
  }

  scramblePalette () {
    if (!this.root) { return }
    this.colorPalette[0].setRGB(Math.random(), Math.random(), Math.random())
    this.colorPalette[1].setRGB(Math.random(), Math.random(), Math.random())
    this.colorPalette[2].setRGB(Math.random(), Math.random(), Math.random())
    this.root.updateColorPalette()
  }

  keyDown (event) {
    if (!this.player.port.connection) { return }
    this.player.send(event.key)
    event.preventDefault()
  }
}

class Phase {}
setEnumValues(Phase, ['init', 'start', 'render', 'idle'])
class Alignment {}
setEnumValues(Alignment, ['left', 'center', 'right'])

const Records = {
  record1: 'loiqe',
  record2: 'valen',
  record3: 'senni',
  record4: 'usul',
  record5: 'pillar'
}

const Ambience = {
  ambience1: 'fog',
  ambience2: 'ghost',
  ambience3: 'silent',
  ambience4: 'kelp',
  ambience5: 'close'
}

const Templates = (function () {
  let templates = {
    titlesAngle: 22,
    monitorsAngle: 47,
    warningsAngle: 44,

    lineSpacing: 0.42
  }

  let scale = 1
  let height = 1.5

  let highNode = [
    new THREE.Vector3(2 * scale, height, -4 * scale),
    new THREE.Vector3(4 * scale, height, -2 * scale),
    new THREE.Vector3(4 * scale, height, 2 * scale),
    new THREE.Vector3(2 * scale, height, 4 * scale),
    new THREE.Vector3(-2 * scale, height, 4 * scale),
    new THREE.Vector3(-4 * scale, height, 2 * scale),
    new THREE.Vector3(-4 * scale, height, -2 * scale),
    new THREE.Vector3(-2 * scale, height, -4 * scale)
  ]

  templates.left = highNode[7].x
  templates.right = highNode[0].x
  templates.top = highNode[0].y
  templates.bottom = -highNode[0].y
  templates.leftMargin = highNode[7].x * 0.8
  templates.rightMargin = highNode[0].x * 0.8
  templates.topMargin = highNode[0].y * 0.8
  templates.bottomMargin = -highNode[0].y * 0.8
  templates.radius = highNode[0].z
  templates.margin = Math.abs(templates.left - templates.leftMargin)

  return templates
})()

const Settings = {
  sight: 2.0,
  approach: 0.5,
  collision: 0.5
}
