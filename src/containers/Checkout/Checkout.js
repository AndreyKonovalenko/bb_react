import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese:1,
            bacon: 1
        }
    }
    
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            // ['salad', '1']
            // adding "+" sybol to the string convert it to a number
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
        //goBack() simply goes back to the last page
    }
    // this is "this" type of syntax to be able to use "this"
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checout/contact-data');
    }
    
    // componentDidMount (){
    //     console.log( "Checkout DidMount with props: ", this.props.history);
    // }
    
    render () {
        
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        );
    }
    
}

export default Checkout;