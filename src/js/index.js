import Search from './models/Search'
import * as searchView from './views/searchView'
import Recipe from './models/Recipe'
import * as recipeView from './views/recipeView'
import {
  elements,
  renderLoader,
  clearLoader
} from './views/base';
// Global state of the app
// -Search object
// -Current recipe object
// -Liked Recipes
const state = {}

const controlSearch = async () => {
  // 1. Get the query from view
  const query = searchView.getInput()
  if (query) {
    // 2. New search object and add it to the state
    state.search = new Search(query)

    // 3.Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes)
    try {

      // 4.Search for recipes
      await state.search.getResults();

      // 5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result)
    } catch (error) {
      alert('Oops something went wrong ;(');
      clearLoader();
    }
  }
}
document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch()
})

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage)
  }
})

// Recipe Controller
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');
  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe)


    // Highlight the selected search item
    if (state.search) searchView.highlightedSelected(id)


    // Create New Recipe Obj
    state.recipe = new Recipe(id)
    try {
      // Get Recipe Data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      //Calculate servings and time
      state.recipe.calcTime()
      state.recipe.calcServings();
      // Render the recipe

      clearLoader();
      recipeView.renderRecipe(state.recipe);
      console.log(state.recipe)
    } catch (error) {
      alert('Error processing recipe ;(')
    }
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))