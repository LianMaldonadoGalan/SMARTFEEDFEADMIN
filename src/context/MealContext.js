import createDataContext from "./createDataContext";
import smartFeed from '../api/smartFeed'

const mealReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_meals':
            return action.payload;
        default:
            return state;
    }
};

const fetchMeals = dispatch => async () => {
    const response = await smartFeed.get('/meals');
    dispatch({ type: 'fetch_meals', payload: response.data });
  };
  
export const { Provider, Context } = createDataContext(
  mealReducer,
  { fetchMeals },
  []
);
  