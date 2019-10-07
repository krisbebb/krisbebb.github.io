
// read existing recipes from localStorage
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    if (recipesJSON !== null) {
        return JSON.parse(recipesJSON)
    } else {
        return []
    }
}

// save recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// remove recipe from the array
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    }
}

// generate DOM structure for recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
    // const button = document.createElement('button')
    
    // delete recipe button
    // button.textContent = 'x'
    // recipeEl.appendChild(button)
    // button.addEventListener('click', (e) => {
    //     removeRecipe(recipe.id)
    //     saveRecipes(recipes)
    //     renderRecipes(recipes, filters)
    // })

    // recipe title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    // textEl.setAttribute('href', `./edit.html#${recipe.id}`)
    recipeEl.addEventListener('click', ()=>{
        location.assign(`./edit.html#${recipe.id}`)

    })
    recipeEl.classList.add('list-group-item')
    containerEl.appendChild(textEl)
    recipeEl.appendChild(containerEl)


    return recipeEl
}

// render using filters
const renderRecipes = function(recipes, filters) {
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()) 
    })

    document.querySelector('#recipes').innerHTML = ''

    filteredRecipes.forEach((recipe) => {
        const recipeEl = generateRecipeDOM(recipe)
        document.querySelector('#recipes').appendChild(recipeEl)
    })
}

// export { removeRecipe }