const headingElement =  document.querySelector('#recipe-heading')
console.log(headingElement)
const titleElement = document.querySelector('#recipe-title')
const instructionsElement = document.querySelector('#recipe-instructions')
const removeElement = document.querySelector('#remove-recipe')
// get recipe id from url hash
// load in any saved recipes from localStorage
// get recipe by id or return home if not found
const recipeId = location.hash.substring(1)
let recipes = getSavedRecipes()
let recipe = recipes.find((recipe) => {
    return recipe.id === recipeId
})

if (recipe === undefined) {
    location.assign('./index.html')
}

headingElement.textContent = recipe.title
titleElement.value = recipe.title
instructionsElement.value = recipe.instructions

titleElement.addEventListener('input', (e) => {
    recipe.title = e.target.value
    saveRecipes(recipes)
})

instructionsElement.addEventListener('input', (e) => {
    recipe.instructions = e.target.value
    saveRecipes(recipes)
})

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipe.id)
    saveRecipes(recipes)
    location.assign('./index.html')
})

// sync changes across multiple windows
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        recipe = recipes.find((recipe) => {
            return recipe.id === recipeId
        })
        
        if (recipe === undefined) {
            location.assign('./index.html')
        }
        

        headingElement.textContent = recipe.title
        titleElement.value = recipe.title
        instructionsElement.value = recipe.instructions
    }
})