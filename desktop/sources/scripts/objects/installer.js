//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Installer {
  constructor (data) {
    const {
      cause,
      result
    } = data
    this.condition = makeCondition(cause)
    const {
      type,
      subject,
      portID
    } = result
    this.type = type
    this.subject = subject
    this.portID = portID

    this.isDone = false
  }

  refresh () {
    this.isDone = false
    if (this.type === 'install') {
      this.isDone = verreciel[this.subject].isInstalled
    } else if (this.type === 'enablePort') {
      this.isDone = verreciel[this.subject][this.portID].isEnabled
    }

    if (!this.isDone && this.condition()) {
      this.isDone = true
      if (!this.isInstalling) {
        this.isInstalling = true
        if (this.type === 'install') {
          this.isDone = verreciel[this.subject].install()
        } else if (this.type === 'enablePort') {
          verreciel[this.subject][this.portID].enable('empty', verreciel.grey)
        }
      }
    }
  }
}
