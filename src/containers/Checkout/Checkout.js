import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }
    
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        // DON'T forget const is read-only!!!!! so use let for price
        for (let param of query.entries()){
            // ['salad', '1']
            // adding "+" sybol to the string convert it to a number
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
        //goBack() simply goes back to the last page
    }
    // this is "this" type of syntax to be able to use "this"
    
    checkoutContinuedHandler = () => {
        this.props.history.replace( this.props.match.url + '/contact-data');
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
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }
    // when we reneder componint manualy with render method we should pass props to it by using (props) and {...props} 
    // So we can use props.history in ContactData compenent
}

export default Checkout;