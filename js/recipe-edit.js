// import { removeRecipe } from './recipe-functions'

const headingElement =  document.querySelector('#recipe-heading')
const titleElement = document.querySelector('#recipe-title')
const instructionsElement = document.querySelector('#recipe-instructions')
const removeElement = document.querySelector('#remove-recipe')
const saveElement = document.querySelector('#save-recipe')
const ingredientsElement = document.querySelector('#ingredients')
const ingredientsSave = document.querySelector('#ingredients-save')
const ingredientsInput = document.querySelector('#ingredients-input')
const ingredientsList = document.querySelector("#ingredients-list")


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

// remove recipe from the array
const removeIngredient = (item) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => {
        return ingredient.item === item
    })

    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
    }
}

// Render application todos based on filters
const renderIngredients= () => {
    const ingredientEl = document.querySelector('#ingredients-list')
    // const { searchText, hideCompleted } = getFilters()
    // const filteredTodos = getTodos().filter((todo) => {
    //   const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
    //   const hideCompletedMatch = !hideCompleted || !todo.completed
    //   return searchTextMatch && hideCompletedMatch
    // })
  
    // const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
  
    ingredientEl.innerHTML = ''
    // ingredientEl.appendChild(generateSummaryDOM(incompleteTodos))
    
    if (recipe.ingredients.length > 0) {
      recipe.ingredients.forEach((ingredient) => {
        ingredientEl.appendChild(generateIngredientDOM(ingredient))
        // console.log(ingredient);
        
      })
    } else {
      const messageEl = document.createElement('p')
      messageEl.classList.add('empty-message')
      messageEl.textContent = 'No ingredients to show'
      ingredientEl.appendChild(messageEl)
    }
  
  }
  


  // Get the DOM elements for an individual note
  const generateIngredientDOM = (ingredient) => {
    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const ingredientText = document.createElement('span')
    const removeButton = document.createElement('button')
  
    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.inStock
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('click', () => {
        ingredient.inStock = !ingredient.inStock
        saveRecipes()
        renderIngredients()
    })
  
    // Setup the todo text
    ingredientText.textContent = ingredient.item
    containerEl.appendChild(ingredientText)
  
    // setup container
    ingredientEl.classList.add('list-group-item')
    containerEl.classList.add('list-group-container')
    ingredientEl.appendChild(containerEl)
  
    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('btn', 'btn-danger', 'btn--remove')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(ingredient.item)
        renderIngredients()
    })
  
    return ingredientEl
  }


renderIngredients()

headingElement.textContent = recipe.title
titleElement.value = recipe.title
instructionsElement.value = recipe.instructions

// recipe.ingredients.forEach((item) => {
//     console.log(item);
//     const checkbox = document.createElement('input')
//     // Setup todo checkbox
//   checkbox.setAttribute('type', 'checkbox')
//   checkbox.checked = item.inStock
//   ingredientsList.appendChild(checkbox)
//   checkbox.addEventListener('click', () => {
//     item.inStock = !item.inStock
//     console.log(item)
//   })
//     var entry = document.createElement('span');
//     entry.textContent = item.item
//     // entry.appendChild(document.createTextNode(item.item));
//     ingredientsList.appendChild(entry);
    

// });

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

saveElement.addEventListener('click', (e) => {
    location.assign('./index.html')
})

ingredientsSave.addEventListener('click', (e) => {
    var ingredient = {
        item: ingredientsInput.value,
        inStock: false
    }
    recipe.ingredients.push(ingredient)
    saveRecipes(recipes)
    renderIngredients()
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

// const toggleTodo = (id) => {
//   const todo = todos.find((todo) => todo.id === id)

//   if (todo) {
//     todo.completed = !todo.completed
//     saveTodos()
//   }
// }

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
	  navigator.serviceWorker.register('/sw.js').then(function(registration) {
		// Registration was successful
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	  }, function(err) {
		// registration failed :(
		console.log('ServiceWorker registration failed: ', err);
	  });
	});
  }