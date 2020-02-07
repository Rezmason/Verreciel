//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Game {
  constructor () {
    // assertArgs(arguments, 0);
    console.info('^ Game | Init')
    this.time = 0
    this.seconds = 0
    this.gameSpeed = 1
    if (DEBUG_LOG_GHOST) {
      this.gameSpeed = 30
    }
  }

  whenStart (jump_mission) {
    // assertArgs(arguments, 0);
    console.info('+ Game | Start')
    if (JUMP_MISSION) {
      this.load(jump_mission)
      return
    }
    if (DEBUG_LOG_GHOST) {
      this.save(0)
    }
    this.load(this.state)
  }

  save (id) {
    // assertArgs(arguments, 1);
    if (DEBUG_DONT_SAVE) {
      return
    }
    console.info('@ GAME     | Saved State to ' + id)
    for (let c of document.cookie.split(';')) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    }
    localStorage.state = id
    localStorage.version = verreciel.version
    verreciel.completion.refresh()
  }

  load (id) {
    // assertArgs(arguments, 1);
    id = id == 20 ? 0 : id

    console.info('@ GAME     | Loaded State to ' + id)

    for (let mission of verreciel.missions.story) {
      if (mission.id < id) {
        mission.complete()
      }
    }
    verreciel.missions.story[id].state()
  }

  get state () {
    // assertArgs(arguments, 0);
    if ('state' in localStorage) {
      return parseInt(localStorage.state)
    }
    return 0
  }

  erase () {
    // assertArgs(arguments, 0);
    console.info('$ GAME     | Erase')
    localStorage.clear()
  }

  reset () {
    console.info('$ GAME     | Erase')
    this.erase()
    this.load(0)
  }

  tick ( delta ) {
    // assertArgs(arguments, 0);
    this.time += this.gameSpeed
    this.seconds += delta

    if( this.seconds > ( 1 / this.gameSpeed )) {
      this.seconds = 0
      verreciel.capsule.whenSecond()
      verreciel.missions.refresh()
      verreciel.installers.forEach(installer => installer.refresh())
    }
  }
}
