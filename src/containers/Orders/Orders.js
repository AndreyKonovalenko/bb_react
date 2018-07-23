import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                console.log(response.data);
                const fetchOrders = [];
                for (let key in response.data){
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                console.log(fetchOrders);
                this.setState({loading: false, orders: fetchOrders});

            })
            .catch(error => {
                this.setState({loading: false});
            });
    }
    
    ingredientsExtrator(order_element) {
        const ingredients_arr = [];
        for (let key in order_element) {
            ingredients_arr.push(key + ": " + order_element[key]);
        }
        return ingredients_arr;
    }
    
    render () {

        return (
            <div>
                {this.state.orders.map(element => (
                  <Order 
                    key={element.id} 
                    ingredients = {(this.ingredientsExtrator(element.ingredients)).map(ing => (
                        <p key={ing}>{ing}</p>))}
                    price={element.price}/>)
                )}
            </div>
        );
    }
    
}

export default withErrorHandler(Orders, axios);
 