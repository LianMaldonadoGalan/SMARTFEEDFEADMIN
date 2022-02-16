import createDataContext from "./createDataContext";
import smartFeed from '../api/smartFeed'

const ingredientReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_ingredients':
            return action.payload;
        case 'get-ingredient':
            console.log('si entra')
            return action.payload;
        default:
            return state;
    }
};

const fetchIngredients = dispatch => async () => {
    const response = await smartFeed.get(`/ingredients`);
    dispatch({ type: 'fetch_ingredients', payload: response.data });
  };

const getIngredient = dispatch => async (id) => {
    const response = await smartFeed.get(`/ingredients/`+id);
    dispatch({ type: 'get-ingredient', payload: response.data });
    return response.data;
}

const createIngredient = dispatch => async (name, picture) => {
    console.log(name+ '   '+ picture)
    await smartFeed.post('/ingredients', {name, picture});
}
  
export const { Provider, Context } = createDataContext(
  ingredientReducer,
  { fetchIngredients, createIngredient, getIngredient },
  []
);
  