import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

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
        let summery = <Redirect to="/" />
        if (this.props.ings) {
            summery = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            );
        }
        return  summery;        
    }
    // when we reneder componint manualy with render method we should pass props to it by using (props) and {...props} 
    // So we can use props.history in ContactData compenent
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
};

// if we omit mapStateToProps in connect function we use this syntax:
// connect(null, mapDispatchProps)
export default connect(mapStateToProps)(Checkout);