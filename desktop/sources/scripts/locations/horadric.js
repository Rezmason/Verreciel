//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class LocationHoradric extends Location {
  constructor (data) {
    // assertArgs(arguments, 3);
    super(data, new IconHoradric(), new StructureHoradric())

    this.details = 'unknown'
    this.recipeValid = null
    this.combinationPercentage = 0
  }

  makePanel () {
    // assertArgs(arguments, 0);
    let newPanel = new Panel()

    this.inPort1 = new ScenePortSlot(
      this,
      this.code + '_input_1',
      Alignment.center,
      false,
      'In'
    )
    this.inPort2 = new ScenePortSlot(
      this,
      this.code + '_input_2',
      Alignment.center,
      false,
      'In'
    )

    this.inPort1.label.position.set(0, 0.5, 0)
    this.inPort2.label.position.set(0, 0.5, 0)

    this.inPort1.enable()
    this.inPort2.enable()

    this.inPort1.position.set(0.6, 0.6, 0)
    this.inPort2.position.set(-0.6, 0.6, 0)

    this.outPort = new ScenePortSlot(
      this,
      this.code + '_output_1',
      Alignment.center,
      false,
      ''
    )
    this.outPort.position.set(0, -0.8, 0)
    this.outPort.label.position.set(0, -0.4, 0)
    this.outPort.label.updateText('Out')

    newPanel.add(this.inPort1)
    newPanel.add(this.inPort2)
    newPanel.add(this.outPort)

    newPanel.add(
      new SceneLine(
        [
          new THREE.Vector3(0.6, 0.6 - 0.125, 0),
          new THREE.Vector3(0.6, 0.3 - 0.125, 0)
        ],
        verreciel.grey
      )
    )
    newPanel.add(
      new SceneLine(
        [
          new THREE.Vector3(-0.6, 0.6 - 0.125, 0),
          new THREE.Vector3(-0.6, 0.3 - 0.125, 0)
        ],
        verreciel.grey
      )
    )

    newPanel.add(
      new SceneLine(
        [
          new THREE.Vector3(0, -0.2 - 0.125, 0),
          new THREE.Vector3(0.6, 0.3 - 0.125, 0)
        ],
        verreciel.grey
      )
    )
    newPanel.add(
      new SceneLine(
        [
          new THREE.Vector3(0, -0.2 - 0.125, 0),
          new THREE.Vector3(-0.6, 0.3 - 0.125, 0)
        ],
        verreciel.grey
      )
    )

    newPanel.add(
      new SceneLine(
        [
          new THREE.Vector3(0, -0.2 - 0.125, 0),
          new THREE.Vector3(0, -0.8 + 0.125, 0)
        ],
        verreciel.grey
      )
    )

    this.storage = [this.inPort1, this.inPort2, this.outPort]

    return newPanel
  }

  dockUpdate () {
    // assertArgs(arguments, 0);
    if (this.inPort1.isEnabled == true && this.inPort2.isEnabled == true) {
    }

    if (this.combinationPercentage > 0) {
      this.structure.blink()
    }
  }

  onUploadComplete () {
    // assertArgs(arguments, 0);
    this.verifyRecipes()
  }

  verifyRecipes () {
    // assertArgs(arguments, 0);
    var ingredients = []

    if (this.inPort1.event != null) {
      ingredients.push(this.inPort1.event)
    }
    if (this.inPort2.event != null) {
      ingredients.push(this.inPort2.event)
    }

    for (let recipe of verreciel.recipes) {
      if (recipe.isValid(ingredients) == true) {
        this.recipeValid = recipe
        this.combine(recipe)
        break
      } else {
        this.recipeValid = null
      }
    }

    this.refresh()
  }

  refresh () {
    // assertArgs(arguments, 0);
    if (this.outPort.hasEvent() == true) {
      this.inPort1.disable()
      this.inPort2.disable()
      this.outPort.enable()
    } else {
      this.inPort1.enable()
      this.inPort2.enable()
      this.outPort.disable()
    }

    if (this.recipeValid != null) {
      this.inPort1.disable()
      this.inPort2.disable()
    }

    if (this.recipeValid != null) {
      this.inPort1.label.updateText('IN', verreciel.white)
      this.inPort2.label.updateText('IN', verreciel.white)
      this.outPort.label.updateText(
        this.recipeValid.result.name,
        verreciel.white
      )
    } else if (this.inPort1.event != null && this.inPort2.event != null) {
      this.inPort1.label.updateText('IN', verreciel.grey)
      this.inPort2.label.updateText('IN', verreciel.grey)
      this.outPort.label.updateText('error', verreciel.red)
    } else {
      if (this.inPort1.event != null) {
        this.inPort1.label.updateText('IN', verreciel.white)
      } else {
        this.inPort1.label.updateText('IN', verreciel.grey)
      }
      if (this.inPort2.event != null) {
        this.inPort2.label.updateText('IN', verreciel.white)
      } else {
        this.inPort2.label.updateText('IN', verreciel.grey)
      }
      this.outPort.label.updateText('Out', verreciel.grey)
    }
  }

  // MARK: Combinatrix

  combine (recipe) {
    // assertArgs(arguments, 1);
    this.inPort1.disable()
    this.inPort2.disable()
    this.inPort1.label.color = verreciel.cyan
    this.inPort2.label.color = verreciel.cyan

    this.combinationRecipe = recipe
    this.combineProgress()
    verreciel.music.playEffect('beep1')
  }

  combineProgress () {
    // assertArgs(arguments, 0);
    this.combinationPercentage += Math.random() * 2 * verreciel.game.gameSpeed

    if (this.combinationPercentage > 100) {
      this.onCombinationComplete()
      return
    } else {
      delay(0.05, this.combineProgress.bind(this))
    }
    this.outPort.label.updateText(
      this.combinationPercentage.toFixed(0) + '%',
      verreciel.grey
    )
  }

  onCombinationComplete () {
    // assertArgs(arguments, 0);
    this.inPort1.removeEvent()
    this.inPort2.removeEvent()
    this.inPort1.label.color = verreciel.grey
    this.inPort2.label.color = verreciel.grey

    this.outPort.addEvent(Item.like(this.combinationRecipe.result))

    this.combinationPercentage = 0

    this.refresh()
    verreciel.music.playEffect('beep2')
    verreciel.ghost.report(
      LogType.combination,
      this.combinationRecipe.result.id
    )

    setTimeout(() => { this.structure.show() }, 100)
  }
}

class IconHoradric extends Icon {
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
          new THREE.Vector3(-this.size, 0, 0),
          new THREE.Vector3(this.size, 0, 0),
          new THREE.Vector3(0, this.size, 0),
          new THREE.Vector3(0, -this.size, 0)
        ],
        this.color
      )
    )
  }
}

class StructureHoradric extends Structure {
  constructor () {
    // assertArgs(arguments, 0);
    super()
    this.root.position.set(0, 0, 0)
    let radius = 5
    let cube1 = new Cube(radius, verreciel.grey)
    this.root.add(cube1)
    let cube2 = new Cube(radius, verreciel.grey)
    this.root.add(cube2)
    let cube3 = new Cube(radius, verreciel.grey)
    this.root.add(cube3)
    let cube4 = new Cube(radius, verreciel.grey)
    this.root.add(cube4)
    let cube5 = new Cube(radius, verreciel.grey)
    this.root.add(cube5)
    let cube6 = new Cube(radius, verreciel.grey)
    this.root.add(cube6)
  }

  onUndock () {
    // assertArgs(arguments, 0);
    super.onUndock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 3

    this.root.children[0].rotation.y = degToRad(0)
    this.root.children[1].rotation.y = degToRad(0)

    this.root.children[2].rotation.z = degToRad(0)
    this.root.children[3].rotation.z = degToRad(0)

    this.root.children[4].rotation.x = degToRad(0)
    this.root.children[5].rotation.x = degToRad(0)

    this.rotation.y = degToRad(0)

    verreciel.animator.commit()
  }

  onDock () {
    // assertArgs(arguments, 0);
    super.onDock()

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 3

    this.root.children[0].rotation.y = degToRad(45)
    this.root.children[1].rotation.y = -degToRad(45)

    this.root.children[2].rotation.z = degToRad(45)
    this.root.children[3].rotation.z = -degToRad(45)

    this.root.children[4].rotation.x = degToRad(90)
    this.root.children[5].rotation.x = -degToRad(90)

    this.rotation.y = degToRad(90)

    verreciel.animator.commit()
  }
}
