let recipes = getSavedRecipes()

// filters
const filters = {
    searchText: ''
}

renderRecipes(recipes, filters)

// add event listener to button
document.querySelector('#add-recipe').addEventListener('click', (e) => {
    const id = uuidv4()
    recipes.push({
        id: id,
        title: '',
        instructions: '',
        ingredients: ''
    })
    saveRecipes()
    location.assign(`./edit.html#${id}`)
})

// get search input and set filter
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

// sync changes from edit page
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        renderRecipes(recipes, filters)
    }
})


  