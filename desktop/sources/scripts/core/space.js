//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Space extends Empty {
  constructor () {
    super()

    console.info('^ Space | Init')

    this.targetSpaceColor = new THREE.Color(0, 0, 0)
    this.currentSpaceColor = new THREE.Color(0, 0, 0)

    this.targetStarColor = verreciel.white
    this.currentStarColor = verreciel.white.clone()

    this.lastStarAddedTime = 0
    this.starClusters = []

    this.structuresRoot = new Empty()
    this.starsRoot = new Empty()
    this.add(this.structuresRoot)
    this.add(this.starsRoot)

    this.starsRoot.position.set(0, 40, 0)
  }

  whenStart () {
    super.whenStart()
    console.info('+ Space | Start')
  }

  // Space Color

  onSystemEnter (system) {
    verreciel.capsule.system = system
    switch (system) {
      case Systems.valen:
        this.targetSpaceColor.setRGB(0, 0, 0.1)
        this.targetStarColor = verreciel.white
        verreciel.music.setAmbience(Ambience.ambience2)
        break
      case Systems.senni:
        this.targetSpaceColor.setRGB(0, 0, 0)
        this.targetStarColor = verreciel.cyan
        verreciel.music.setAmbience(Ambience.ambience3)
        break
      case Systems.usul:
        this.targetSpaceColor.setRGB(0.05, 0.05, 0.05)
        this.targetStarColor = verreciel.red
        verreciel.music.setAmbience(Ambience.ambience4)
        break
      case Systems.aitasla:
        this.targetSpaceColor.setRGB(0, 0, 0.6)
        this.targetStarColor = verreciel.black
        verreciel.music.setAmbience(Ambience.ambience5)
        break
      default:
        this.targetSpaceColor.setRGB(0, 0, 0)
        this.targetStarColor = verreciel.white
        verreciel.music.setAmbience(Ambience.ambience1)
        break
    }

    if (verreciel.player.isEjected === true) {
      this.targetSpaceColor.setRGB(0, 0, 0)
    }
  }

  // Instances

  startInstance (location) {
    this.structuresRoot.add(location.structure)
  }

  whenRenderer () {
    super.whenRenderer()
    if (
      verreciel.capsule.isDockedAtLocation(verreciel.universe.aitasla.star) == true
    ) {
      verreciel.journey.distance += 3
    }

    if (
      this.starsRoot.children.length < 30 &&
      verreciel.journey.distance > this.lastStarAddedTime + 20
    ) {
      this.starsRoot.add(this.fetchStarCluster())
      this.lastStarAddedTime = verreciel.journey.distance
    }

    // Background

    if (this.currentSpaceColor.r < this.targetSpaceColor.r) {
      this.currentSpaceColor.r += 0.01
    }
    if (this.currentSpaceColor.r > this.targetSpaceColor.r) {
      this.currentSpaceColor.r -= 0.01
    }
    if (this.currentSpaceColor.g < this.targetSpaceColor.g) {
      this.currentSpaceColor.g += 0.01
    }
    if (this.currentSpaceColor.g > this.targetSpaceColor.g) {
      this.currentSpaceColor.g -= 0.01
    }
    if (this.currentSpaceColor.b < this.targetSpaceColor.b) {
      this.currentSpaceColor.b += 0.01
    }
    if (this.currentSpaceColor.b > this.targetSpaceColor.b) {
      this.currentSpaceColor.b -= 0.01
    }

    if (this.currentStarColor.x < this.targetStarColor.x) {
      this.currentStarColor.x += 0.01
    }
    if (this.currentStarColor.x > this.targetStarColor.x) {
      this.currentStarColor.x -= 0.01
    }
    if (this.currentStarColor.y < this.targetStarColor.y) {
      this.currentStarColor.y += 0.01
    }
    if (this.currentStarColor.y > this.targetStarColor.y) {
      this.currentStarColor.y -= 0.01
    }
    if (this.currentStarColor.z < this.targetStarColor.z) {
      this.currentStarColor.z += 0.01
    }
    if (this.currentStarColor.z > this.targetStarColor.z) {
      this.currentStarColor.z -= 0.01
    }

    const diffuse = new THREE.Color(0, 0, 0)
    const colorPalette = verreciel.colorPalette

    diffuse.r += colorPalette[0].r * this.currentSpaceColor.r
    diffuse.g += colorPalette[0].g * this.currentSpaceColor.r
    diffuse.b += colorPalette[0].b * this.currentSpaceColor.r

    diffuse.r += colorPalette[1].r * this.currentSpaceColor.g
    diffuse.g += colorPalette[1].g * this.currentSpaceColor.g
    diffuse.b += colorPalette[1].b * this.currentSpaceColor.g

    diffuse.r += colorPalette[2].r * this.currentSpaceColor.b
    diffuse.g += colorPalette[2].g * this.currentSpaceColor.b
    diffuse.b += colorPalette[2].b * this.currentSpaceColor.b

    verreciel.scene.background = diffuse

    // Etc

    this.starsRoot.updateChildrenColors(this.currentStarColor)

    this.starsRoot.rotation.set(0, degToRad(verreciel.capsule.direction), 0)
  }

  fetchStarCluster () {
    var nextCluster = null
    for (let cluster of this.starClusters) {
      if (cluster.parent == null) {
        nextCluster = cluster
        cluster.reset()
        break
      }
    }
    if (nextCluster == null) {
      nextCluster = new StarCluster()
      this.starClusters.push(nextCluster)
    }
    return nextCluster
  }

  printDistance (distance) {
    return (distance * Space.unit).toFixed(2)
  }

  printPosition (position) {
    return (
      position.x /* * Space.unit */
        .toFixed(0) +
      ',' +
      position.y /* * Space.unit */
        .toFixed(0)
    )
  }
}

Space.unit = 19

class StarCluster extends Empty {
  constructor () {
    super()
    this.mesh = new SceneLine([], verreciel.white)
    this.add(this.mesh)
    this.reset()
  }

  reset () {
    this.starsPositions = [
      new THREE.Vector3(
        Math.floor(Math.random() * 40) - 20,
        0,
        Math.floor(Math.random() * 40) - 20
      ),
      new THREE.Vector3(
        Math.floor(Math.random() * 40) - 20,
        0,
        Math.floor(Math.random() * 40) - 20
      ),
      new THREE.Vector3(
        Math.floor(Math.random() * 40) - 20,
        0,
        Math.floor(Math.random() * 40) - 20
      ),
      new THREE.Vector3(
        Math.floor(Math.random() * 40) - 20,
        0,
        Math.floor(Math.random() * 40) - 20
      ),
      new THREE.Vector3(
        Math.floor(Math.random() * 40) - 20,
        0,
        Math.floor(Math.random() * 40) - 20
      )
    ]

    this.mesh.updateVertices([
      this.starsPositions[0],
      new THREE.Vector3(this.starsPositions[0].x, -1, this.starsPositions[0].z),
      this.starsPositions[1],
      new THREE.Vector3(this.starsPositions[1].x, -1, this.starsPositions[1].z),
      this.starsPositions[2],
      new THREE.Vector3(this.starsPositions[2].x, -1, this.starsPositions[2].z),
      this.starsPositions[3],
      new THREE.Vector3(this.starsPositions[3].x, -1, this.starsPositions[3].z),
      this.starsPositions[4],
      new THREE.Vector3(this.starsPositions[4].x, -1, this.starsPositions[4].z)
    ])

    this.position.y = 0
  }

  whenRenderer () {
    let starSpeed = verreciel.thruster.actualSpeed
    if (verreciel.capsule.isWarping == true) {
      starSpeed = 40
    }

    starSpeed *= 0.15

    if (verreciel.capsule.isDockedAtLocation(verreciel.universe.aitasla.star) == true) {
      starSpeed = 0.15
    }

    this.mesh.updateVertices([
      this.starsPositions[0],
      new THREE.Vector3(
        this.starsPositions[0].x,
        starSpeed + 0.1,
        this.starsPositions[0].z
      ),
      this.starsPositions[1],
      new THREE.Vector3(
        this.starsPositions[1].x,
        starSpeed + 0.1,
        this.starsPositions[1].z
      ),
      this.starsPositions[2],
      new THREE.Vector3(
        this.starsPositions[2].x,
        starSpeed + 0.1,
        this.starsPositions[2].z
      ),
      this.starsPositions[3],
      new THREE.Vector3(
        this.starsPositions[3].x,
        starSpeed + 0.1,
        this.starsPositions[3].z
      ),
      this.starsPositions[4],
      new THREE.Vector3(
        this.starsPositions[4].x,
        starSpeed + 0.1,
        this.starsPositions[4].z
      )
    ])

    this.position.y -= starSpeed

    if (this.position.y < -80) {
      this.removeFromParentNode()
    }
  }
}
