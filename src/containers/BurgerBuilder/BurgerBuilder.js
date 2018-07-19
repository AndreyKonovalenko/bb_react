import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'; 

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    //old syntax
    // constructor(props) {
    //     super(props);
    //     this.state={...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://bb-react-5d531.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                console.log(error)
                this.setState({error: true});
            })
    }
    
    updataPurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(element => {
                return ingredients[element]
            })
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        this.setState({purchasable: sum  > 0});
        // "sum > 0" means true or false so purchasble takes value true or false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients : updatedIngredients});
        this.updataPurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients : updatedIngredients});
        this.updataPurchaseState(updatedIngredients);                
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});  
    }

    purchaseCanselHadler = () => {
        this.setState({purchasing: false});  
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:  {
        //         name: 'Indra',
        //         adress: {
        //             street: 'Izumruday 1',
        //             zipCode: '134201',
        //             country: 'Panama'  
        //         },
        //         email: 'test@test.com',
        //         cellNumber: '+7 111 111 1111'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // // in a real app we should recalculate the price on server, because users can manipulate data

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading:false, purchasing: false});
        //     });
        // // '.json' is firebase rrequirement only
        
        const queryParams =  [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
   
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
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
   
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                purchaseCanceled={this.purchaseCanselHadler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);