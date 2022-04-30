import createDataContext from "./createDataContext";
import smartFeed from '../api/smartFeed'

const mealReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_meals':
            return action.payload;
        case 'get-meal':
            return action.payload;
        default:
            return state;
    }
};

const fetchMeals = dispatch => async () => {
    const response = await smartFeed.get('/meals?limit=500&page=0');
    dispatch({ type: 'fetch_meals', payload: response.data.data });
};
  
const getMeal = dispatch => async (id) => {
    const response = await smartFeed.get(`/meals/`+id);
    dispatch({ type: 'get-meal', payload: response.data.data });
}

const createMeal = dispatch => async (name, photo, description, type, cost, protein, calories, carbohydrates, fats) => {
    await smartFeed.post('/meals', {name, photo, description, type, cost, protein, calories, carbohydrates, fats});
}

const deleteMeal = dispatch => async (id) => {
    await smartFeed.delete('/meals/'+id);
    //dispatch({ type: 'del-ingredient', payload: response})
}

const patchMeal = dispatch => async (id, name, photo, description, type, cost, protein, calories, carbohydrates, fats) => {
    await smartFeed.patch('meals/'+id, {name, photo, description, type, cost, protein, calories, carbohydrates, fats});
}

export const { Provider, Context } = createDataContext(
  mealReducer,
  { fetchMeals, getMeal, createMeal, deleteMeal, patchMeal },
  []
);