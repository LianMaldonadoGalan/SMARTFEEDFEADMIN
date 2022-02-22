import createDataContext from "./createDataContext";
import smartFeed from '../api/smartFeed'

const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'get-recipe':
            return action.payload;
        default:
            return state;
    }
};
  
const getRecipe = dispatch => async (id) => {
    const response = await smartFeed.get(`/recipes/meal/`+id);
    dispatch({ type: 'get-meal', payload: response.data });
}

const createRecipe = dispatch => async (mealIngredients, mealRecipe, mealPrepTime, mealId) => {
    console.log('holi;')
    await smartFeed.post('/recipes', {mealIngredients, mealRecipe, mealPrepTime, mealId});
}

const deleteMeal = dispatch => async (id) => {
    await smartFeed.delete('/meals/'+id);
    //dispatch({ type: 'del-ingredient', payload: response})
}

export const { Provider, Context } = createDataContext(
  recipeReducer,
  { getRecipe, createRecipe },
  []
);