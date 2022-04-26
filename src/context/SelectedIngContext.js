import createDataContext from "./createDataContext";
import smartFeed from '../api/smartFeed'

const selectedIng = (state, action) => {
    switch (action.type) {
        case 'reset':
            return [state= []];
        case 'put_ingredients':
            return action.payload;
        case 'fetch-selected-ing':
            console.log(state);
            return state;
        default:
            return state;
    }
};

const reset = dispatch => async () => {
    dispatch({ type: 'reset'});
};

const putIngredients = dispatch => (ingredients) => {
    dispatch({ type: 'put_ingredients', payload: ingredients});
}


const fetchSelectedIng = dispatch => () => {
    dispatch({ type: 'fetch-selected-ing'});
}
  
export const { Provider, Context } = createDataContext(
    selectedIng,
  { reset, putIngredients, fetchSelectedIng },
  []
);