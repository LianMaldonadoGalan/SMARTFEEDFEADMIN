import createDataContext from "./createDataContext";
import smartFeed from '../api/smartFeed'

const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'get-recipe':
            return state = action.payload;
        default:
            return state;
    }
};
  
const getRecipe = dispatch => async (id) => {
    const response = await smartFeed.get(`/recipes/meal/`+id);
    dispatch({ type: 'get-recipe', payload: response.data });
}

const createRecipe = dispatch => async (mealIngredients, mealRecipe, mealPrepTime, mealId) => {
    await smartFeed.post('/recipes', {mealIngredients, mealRecipe, mealPrepTime, mealId});
}

const updateRecipe = () => async (recipe_id, mealIngredients, mealRecipe, mealPrepTime) => {
    await smartFeed.patch('recipes/' + recipe_id, {mealIngredients, mealRecipe, mealPrepTime})
}

export const { Provider, Context } = createDataContext(
  recipeReducer,
  { getRecipe, createRecipe, updateRecipe },
  []
);