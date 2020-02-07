//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationStar extends Location {
  constructor (data) {
    // assertArgs(arguments, 3);
    super(data, new IconStar(), new StructureStar())
    this.isComplete = false
  }

  makePanel () {
    // assertArgs(arguments, 0);
    let newPanel = new Panel()

    let requirementLabel = new SceneLabel('drop the veil$extinguish the sun')
    requirementLabel.position.set(Templates.leftMargin, Templates.topMargin - 0.3, 0)
    newPanel.add(requirementLabel)

    this.button = new SceneButton(this, this.code + '_install', 'install', 1, 1)
    this.button.position.set(0, -1, 0)
    newPanel.add(this.button)

    this.button.disable('extinguish')

    return newPanel
  }

  dockUpdate () {
    super.dockUpdate()

    if (verreciel.veil.hasVeil(verreciel.items.veil1) && verreciel.battery.isVeilPowered() == true) {
      this.button.enable('extinguish')
    } else {
      this.button.disable('extinguish')
    }
  }

  sightUpdate () {
    // assertArgs(arguments, 0);

    let radiation = this.isComplete == true ? 0 : (1 - this.distance / 0.7) / 0.6

    if (verreciel.capsule.hasShield() === false) {
      if (radiation > 1 && verreciel.capsule.isFleeing == false) {
        verreciel.capsule.flee()
      }
      verreciel.capsule.radiation = radiation
    }
  }

  onApproach () {
    // assertArgs(arguments, 0);
    if (verreciel.capsule.hasShield() === true) {
      super.onApproach()
      verreciel.helmet.addWarning('shield ok', verreciel.cyan, 3, 'shield')
    } else {
      verreciel.space.startInstance(this)
    }
  }

  touch (id) {
    // assertArgs(arguments, 1);
    super.touch(id)
    if (id == 1) {
      this.onComplete()
      // TODO: Add extra sound effect
      verreciel.music.playEffect('click3')
    }
    return true
  }

  onComplete () {
    // assertArgs(arguments, 0);
    super.onComplete()
    verreciel.space.onSystemEnter(verreciel.capsule.system)
  }

  onDisconnect () {
    // assertArgs(arguments, 0);
  }
}

class IconStar extends Icon {
  constructor () {
    // assertArgs(arguments, 0);
    super()

    this.mesh.add(
      new SceneLine(
        [
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(this.size * 2, 0, 0),
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(-this.size * 2, 0, 0),
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(0, this.size * 2, 0),
          new THREE.Vector3(0, -this.size, 0),
          new THREE.Vector3(0, -this.size * 2, 0),
          new THREE.Vector3(this.size / 2, this.size / 2, 0),
          new THREE.Vector3(this.size, this.size, 0),
          new THREE.Vector3(-this.size / 2, this.size / 2, 0),
          new THREE.Vector3(-this.size, this.size, 0),
          new THREE.Vector3(this.size / 2, -this.size / 2, 0),
          new THREE.Vector3(this.size, -this.size, 0),
          new THREE.Vector3(-this.size / 2, -this.size / 2, 0),
          new THREE.Vector3(-this.size, -this.size, 0)
        ],
        this.color
      )
    )
  }
}

class StructureStar extends Structure {
  constructor () {
    // assertArgs(arguments, 0);
    super()

    this.root.position.set(0, 5, 0)

    var i = 0
    while (i < 20) {
      let shape = new Octagon(i * 0.3, verreciel.red)
      shape.rotation.y = degToRad(22.5)
      this.root.add(shape)
      i += 1
    }
  }

  onDock () {
    // assertArgs(arguments, 0);
    super.onDock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    var i = 0
    for (let node of this.root.children) {
      node.rotation.y = degToRad(i * (90 / this.root.children.length))
      i += 1
    }

    verreciel.animator.commit()
  }

  sightUpdate () {
    // assertArgs(arguments, 0);
    super.sightUpdate()
    this.root.rotation.y += degToRad(0.1)
  }

  onUndock () {
    // assertArgs(arguments, 0);
    super.onDock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    for (let node of this.root.children) {
      node.position.y = 0
      node.rotation.y = 0
    }

    verreciel.animator.commit()
  }

  onComplete () {
    // assertArgs(arguments, 0);
    super.onComplete()

    this.root.updateChildrenColors(verreciel.cyan)

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.5

    var i = 0
    for (let node of this.root.children) {
      node.position.y = -i * 0.05
      i += 1
      node.rotation.y = 0
    }

    verreciel.animator.commit()
  }
}
