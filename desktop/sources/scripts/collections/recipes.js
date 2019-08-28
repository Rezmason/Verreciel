//  Created by Devine Lu Linvega.
//  Copyright © 2017 XXIIVV. All rights reserved.

const recipeData = [
  // Records
  {
    ingredientIDs: ['record1', 'record2'],
    resultID: 'record4'
  },
  {
    ingredientIDs: ['record1', 'record3'],
    resultID: 'record4'
  },
  {
    ingredientIDs: ['record2', 'record3'],
    resultID: 'record4'
  },

  // Keys
  {
    ingredientIDs: ['valenPortalFragment1', 'valenPortalFragment2'],
    resultID: 'valenPortalKey'
  },
  {
    ingredientIDs: ['usulPortalFragment1', 'usulPortalFragment2'],
    resultID: 'usulPortalKey'
  },
  {
    ingredientIDs: ['valenPortalKey', 'usulPortalKey'],
    resultID: 'endPortalKeyFragment1'
  },
  {
    ingredientIDs: ['loiqePortalKey', 'senniPortalKey'],
    resultID: 'endPortalKeyFragment2'
  },
  {
    ingredientIDs: ['endPortalKeyFragment1', 'endPortalKeyFragment2'],
    resultID: 'endPortalKey'
  },

  // Maps
  {
    ingredientIDs: ['map1', 'map2'],
    resultID: 'map3'
  },

  // Currencies
  {
    ingredientIDs: ['currency1', 'currency2'],
    resultID: 'currency4'
  },
  {
    ingredientIDs: ['currency2', 'currency3'],
    resultID: 'currency5'
  },
  {
    ingredientIDs: ['currency4', 'currency5'],
    resultID: 'currency6'
  }
]

const makeRecipes = () =>
  recipeData.map(data => {
    const {ingredientIDs, resultID, like} = data
    const ingredients = ingredientIDs.map(id => verreciel.items[id])
    const result = verreciel.items[resultID]
    return new Recipe(ingredients, result)
  })
