import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    //old syntax
    // constructor(props) {
    //     super(props);
    //     this.state={...}
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://bb-react-5d531.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({error: true});
        //     })
    }
    
    updataPurchaseState (ingredients) {
        // We do not update any state here after adding Redux in our project !!!
        // We use this method only for checking if any ingredients was added to the order
        // any ingredient quantity are more then 0
        // if yes order butten become active
        const sum = Object.keys(ingredients)
            .map(element => {
                return ingredients[element]
            })
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        return sum > 0;
        // "sum > 0" means true or false so purchasble takes value true or false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});  
    }

    purchaseCanselHadler = () => {
        this.setState({purchasing: false});  
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
            // this is copy of original state object
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            // this is more shorter variant then :
            // convert copy of original objects propertis value to [true, false] form;
            // if (disabledInfo[key] <= 0) {
            //     disabledInfo[key] = true;
            // } else {
            //     disabledInfo[key] = false;
            // }           
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
   
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updataPurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                purchaseCanceled={this.purchaseCanselHadler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanselHadler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));