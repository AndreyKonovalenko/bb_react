import * as actionTypes from '../actions/actionTypes';

const initialSate = {
    orders: [],
    loading: false
}


const reducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                ...action.id
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {};
        default: 
            return state;
    }
    
}

export default reducer;