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
    const response = await smartFeed.get('/meals');
    dispatch({ type: 'fetch_meals', payload: response.data });
};
  
const getMeal = dispatch => async (id) => {
    const response = await smartFeed.get(`/meals/`+id);
    dispatch({ type: 'get-meal', payload: response.data });
}


export const { Provider, Context } = createDataContext(
  mealReducer,
  { fetchMeals, getMeal },
  []
);
  