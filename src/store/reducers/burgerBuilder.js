import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
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
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
             };
        case actionTypes.REMOVE_INGREDIENT:
             return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    // indgredientName we receive as payload of the action
                    //[] is ES6 method for updating properties of a given object
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
    
}

export default reducer;