import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // this colud be functional component, doesn't have to be a class
    // componentWillUpdate() {
    //     console.log("[OrderSummary] WillUpdate");
    // }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(element => {
            return (
                <li key={element}>
                    <span style={{textTransform: 'capitalize'}}>{element}</span>: {this.props.ingredients[element]}
                </li>
            );
        });
        return (
            <Aux>
                <h3>Your orderSummary</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button buttonType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }   
}

export default OrderSummary;