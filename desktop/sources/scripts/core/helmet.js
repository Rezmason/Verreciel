//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Helmet extends Empty {
  constructor () {
    super()

    // Useful snippet. I should put it somewhere else, but this is where I'd go looking for it.
    /*
    let node = this;
    let ham = this.element;

    let hamX = ham.position.x;
    let hamY = ham.position.y;
    let hamZ = ham.position.z;

    Object.defineProperty(ham.position, "x", {
      get: function() {
        return hamX;
      },
      set: function(value) {
        console.debug("x");
        console.debug(getStackTrace());
        console.debug(
          value,
          node.position.__xProperty.animation != null,
          node.position.__xProperty.from,
          node.position.__xProperty.to,
          node.position.__xProperty.percent
        );
        console.debug("");
        return (hamX = value);
      }
    });

    Object.defineProperty(ham.position, "y", {
      get: function() {
        return hamY;
      },
      set: function(value) {
        console.debug("y");
        console.debug(getStackTrace());
        console.debug(
          value,
          node.position.__yProperty.animation != null,
          node.position.__yProperty.from,
          node.position.__yProperty.to,
          node.position.__yProperty.percent
        );
        console.debug("");
        return (hamY = value);
      }
    });

    Object.defineProperty(ham.position, "z", {
      get: function() {
        return hamZ;
      },
      set: function(value) {
        console.debug("z");
        console.debug(getStackTrace());
        console.debug(
          value,
          node.position.__zProperty.animation != null,
          node.position.__zProperty.from,
          node.position.__zProperty.to,
          node.position.__zProperty.percent
        );
        console.debug("");
        return (hamZ = value);
      }
    });
    */

    console.info('^ Helmet | Init')

    this.canAlign = false
    this.visor = new Empty()
    this.message = ''
    this.passive = ''
    this.textSize = 0.025
    this.visorDepth = -1.3

    this.warningString = ''
    this.warningColor = verreciel.red
    this.lastWarning = 0

    this.add(this.visor)

    // Left

    this.displayLeft = new Empty()
    this.displayLeft.position.set(-0.5, 0, this.visorDepth)
    this.displayLeft.add(
      new SceneLine(
        [new THREE.Vector3(-0.2, -1.3, 0), new THREE.Vector3(0, -1.3, 0)],
        verreciel.grey
      )
    )
    this.displayLeft.add(
      new SceneLine(
        [new THREE.Vector3(0, -1.3, 0), new THREE.Vector3(0.01, -1.275, 0)],
        verreciel.grey
      )
    )

    this.leftHandLabel = new SceneLabel(
      '--',
      this.textSize,
      Alignment.left,
      verreciel.grey
    )
    this.leftHandLabel.position.set(-0.2, -1.375, 0)
    this.displayLeft.add(this.leftHandLabel)

    this.messageLabel = new SceneLabel(
      '--',
      this.textSize,
      Alignment.center,
      verreciel.white
    )
    this.messageLabel.position.set(0, 1.35, this.visorDepth)
    this.visor.add(this.messageLabel)

    this.passiveLabel = new SceneLabel(
      '--',
      this.textSize,
      Alignment.center,
      verreciel.grey
    )
    this.passiveLabel.position.set(0, -1.2, this.visorDepth)
    this.visor.add(this.passiveLabel)

    this.displayLeft.rotation.y = degToRad(10)

    this.visor.add(this.displayLeft)

    // Right

    this.displayRight = new Empty()
    this.displayRight.position.set(0.5, 0, this.visorDepth)
    this.displayRight.add(
      new SceneLine(
        [new THREE.Vector3(0.2, -1.3, 0), new THREE.Vector3(0, -1.3, 0)],
        verreciel.grey
      )
    )
    this.displayRight.add(
      new SceneLine(
        [new THREE.Vector3(0, -1.3, 0), new THREE.Vector3(-0.01, -1.275, 0)],
        verreciel.grey
      )
    )

    this.rightHandLabel = new SceneLabel(
      '--',
      this.textSize,
      Alignment.right,
      verreciel.white
    )
    this.rightHandLabel.position.set(0.2, -1.375, 0)
    this.displayRight.add(this.rightHandLabel)

    this.displayRight.rotation.y = degToRad(-10)

    this.visor.add(this.displayRight)

    this.displayRight.add(
      new SceneLine(
        [new THREE.Vector3(0.2, 1.4, 0), new THREE.Vector3(0.1, 1.4, 0)],
        verreciel.grey
      )
    )
    this.displayLeft.add(
      new SceneLine(
        [new THREE.Vector3(-0.2, 1.4, 0), new THREE.Vector3(-0.1, 1.4, 0)],
        verreciel.grey
      )
    )

    // Center

    this.warningLabel = new SceneLabel(
      '',
      0.1,
      Alignment.center,
      verreciel.red
    )
    this.warningLabel.position.set(0, 2, -3.25)
    this.visor.add(this.warningLabel)

    this.visor.add(verreciel.player.port)
    verreciel.player.port.position.set(0, -3, -2.5)

    // To spin around a fun shape:
    /*
    const funShape = new Spaceship(10);

    funShape.position.z = -50;
    funShape.rotation.x = Math.PI;
    setInterval(() => {
      funShape.rotation.y += 0.005;
    }, 10);

    this.visor.add(funShape);
    verreciel.capsule.hide();
    */
  }

  whenStart () {
    super.whenStart()
    console.info('+ Helmet | Start')
  }

  whenRenderer () {
    super.whenRenderer()

    let rotX = this.rotation.x
    let rotY = this.rotation.y

    let diffRotationY = sanitizeDiffAngle(
      verreciel.player.rotation.y,
      this.rotation.y
    )
    if (Math.abs(diffRotationY) > 0.001) {
      rotY += diffRotationY * 0.75
    }

    let diffRotationX = sanitizeDiffAngle(
      verreciel.player.rotation.x,
      this.rotation.x
    )
    if (Math.abs(diffRotationX) > 0.001) {
      rotX += diffRotationX * 0.85
    }

    this.rotation.setNow(rotX, rotY, this.rotation.z)

    this.warningLabel.blink()
  }

  updatePortWires () {
    let port = verreciel.player.port
    if (port.origin != null) {
      port.origin.updateWire()
    }
    if (port.connection != null) {
      port.updateWire()
    }
  }

  drinkTea () {
    let oldPassive = this.passive
    this.addPassive('< sip >')

    delay(
      0.7,
      function () {
        verreciel.player.port.origin.disconnect()

        this.addPassive('...mmm...')
        verreciel.animator.begin()
        verreciel.animator.ease = Penner.easeInOutCubic
        verreciel.animator.animationDuration = 0.125
        this.displayLeft.updateChildrenColors(verreciel.cyan)
        this.displayRight.updateChildrenColors(verreciel.cyan)
        this.displayLeft.position.set(-0.65, 0, this.visorDepth + 0.05)
        this.displayRight.position.set(0.65, 0, this.visorDepth + 0.05)
        verreciel.animator.completionBlock = function () {
          verreciel.animator.begin()
          verreciel.animator.ease = Penner.easeInOutQuad
          verreciel.animator.animationDuration = 3
          this.displayLeft.updateChildrenColors(verreciel.grey)
          this.displayLeft.position.set(-0.5, 0, this.visorDepth)
          this.displayRight.updateChildrenColors(verreciel.grey)
          this.displayRight.position.set(0.5, 0, this.visorDepth)
          verreciel.animator.completionBlock = function () {
            this.addPassive(oldPassive)
          }.bind(this)
          verreciel.animator.commit()
        }.bind(this)
        verreciel.animator.commit()
        verreciel.music.playEffect('beep3')
      }.bind(this)
    )
  }

  addMessage (message, color = verreciel.white) {
    if (this.message == message) {
      return
    }

    this.message = message

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.1
    this.messageLabel.hide()
    this.messageLabel.color = verreciel.cyan
    verreciel.animator.completionBlock = function () {
      verreciel.animator.begin()
      verreciel.animator.animationDuration = 0.1
      this.messageLabel.updateText(this.message, color)
      this.messageLabel.show()
      verreciel.animator.commit()
    }.bind(this)
    verreciel.animator.commit()
  }

  addPassive (passive) {
    if (this.passive == passive) {
      return
    }

    this.passive = passive

    verreciel.animator.begin()
    verreciel.animator.animationDuration = 0.1
    this.passiveLabel.position.set(0, -1.2, this.visorDepth - 0.01)
    this.passiveLabel.hide()
    verreciel.animator.completionBlock = function () {
      verreciel.animator.begin()
      verreciel.animator.animationDuration = 0.1
      this.passiveLabel.updateText(this.passive)
      this.passiveLabel.position.set(0, -1.2, this.visorDepth)
      this.passiveLabel.show()
      verreciel.animator.commit()
    }.bind(this)
    verreciel.animator.commit()
  }

  addWarning (text, color, duration, flag) {
    if (verreciel.game.time - this.lastWarning <= 20) {
      return
    }
    if (text == '') {
      return
    }

    this.warningString = text
    if (color == null) {
      color = verreciel.red
    }
    this.warningColor = color
    this.warningFlag = flag
    this.lastWarning = verreciel.game.time

    this.warningLabel.updateText(this.warningString, this.warningColor)
    verreciel.music.playEffect('beep2')

    delay(duration, this.hideWarning.bind(this))
  }

  hideWarning () {
    this.warningFlag = ''
    this.warningString = ''
    this.warningLabel.updateText('')
  }

  resizeText (size) {
    this.textSize = size
    this.leftHandLabel.updateScale(this.textSize)
    this.messageLabel.updateScale(this.textSize)
    this.passiveLabel.updateScale(this.textSize)
    this.rightHandLabel.updateScale(this.textSize)
  }
}
