import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    // indgredientName we receive as payload of the action
                    //[] is ES6 method for updating properties of a given object
                }
             };
        case actionTypes.REMOVE_INGREDIENT:
             return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    // indgredientName we receive as payload of the action
                    //[] is ES6 method for updating properties of a given object
                }
            };
        default:
            return state;
    }
    
}

export default reducer;