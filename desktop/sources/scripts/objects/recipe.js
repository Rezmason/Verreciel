//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

class Recipe {
  constructor (ingredients, result) {
    // assertArgs(arguments, 2);
    this.ingredients = ingredients
    this.result = result
  }

  isValid (inputs) {
    // assertArgs(arguments, 1);
    // Check if ingredients are all inputs
    for (const ingredient of this.ingredients) {
      var isFound = false
      for (const input of inputs) {
        if (input.name == ingredient.name) {
          isFound = true
        }
      }
      if (isFound == false) {
        return false
      }
    }

    // Check if inputs are all ingredients
    for (const input of inputs) {
      var isFound = false
      for (const ingredient of this.ingredients) {
        if (input.name == ingredient.name) {
          isFound = true
        }
      }
      if (isFound == false) {
        return false
      }
    }
    return true
  }
}
