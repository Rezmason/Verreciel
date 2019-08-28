//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

const recipeData = [
  // Records
  {
    ingredientIDs: ['record1', 'record2'],
    resultID: 'record4',
    like: false
  },
  {
    ingredientIDs: ['record1', 'record3'],
    resultID: 'record4',
    like: false
  },
  {
    ingredientIDs: ['record2', 'record3'],
    resultID: 'record4',
    like: false
  },

  // Keys
  {
    ingredientIDs: ['valenPortalFragment1', 'valenPortalFragment2'],
    resultID: 'valenPortalKey',
    like: false
  },
  {
    ingredientIDs: ['usulPortalFragment1', 'usulPortalFragment2'],
    resultID: 'usulPortalKey',
    like: false
  },
  {
    ingredientIDs: ['valenPortalKey', 'usulPortalKey'],
    resultID: 'endPortalKeyFragment1',
    like: false
  },
  {
    ingredientIDs: ['loiqePortalKey', 'senniPortalKey'],
    resultID: 'endPortalKeyFragment2',
    like: false
  },
  {
    ingredientIDs: ['endPortalKeyFragment1', 'endPortalKeyFragment2'],
    resultID: 'endPortalKey',
    like: false
  },

  // Maps
  {
    ingredientIDs: ['map1', 'map2'],
    resultID: 'map3',
    like: false
  },

  // Currencies
  {
    ingredientIDs: ['currency1', 'currency2'],
    resultID: 'currency4',
    like: true
  },
  {
    ingredientIDs: ['currency2', 'currency3'],
    resultID: 'currency5',
    like: true
  },
  {
    ingredientIDs: ['currency4', 'currency5'],
    resultID: 'currency6',
    like: true
  }
]

class Recipes {
  constructor () {
    // assertArgs(arguments, 0);
    this.horadric = []

    recipeData.forEach(data => {
      const {ingredientIDs, resultID, like} = data
      const ingredients = ingredientIDs.map(id => verreciel.items[id])
      const result = verreciel.items[resultID]
      this.horadric.push(new Recipe(
        ingredients,
        like ? Item.like(result) : result
      ))
    })
  }
}
