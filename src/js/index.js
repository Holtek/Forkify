import Search from "./models/Search"
import * as searchView from "./views/searchView"
import {
  elements
} from "./views/base"
// Global state of the app
// -Search object
// -Current recipe object
// -Liked Recipes
const state = {}

const controlSearch = async () => {
  // 1. Get the query from view
  const query = searchView.getInput
  console.log(query);
  if (query) {
    // 2. New search object and add it to the state
    state.search = new Search(query)

    // 3.Prepare UI for results

    // 4.Search for recipes
    await state.search.getResults();

    // 5. Render results on UI
    console.log(state.search.result)
  }
}
document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch()
})