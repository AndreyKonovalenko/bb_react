import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import cssObject from  './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pastalCode: ''
        }, 
        loading: false
    }
   
    orderHandler = (event) => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer:  {
                name: 'Indra',
                adress: {
                    street: 'Izumruday 1',
                    zipCode: '134201',
                    country: 'Panama'  
                },
                email: 'test@test.com',
                cellNumber: '+7 111 111 1111'
            },
            deliveryMethod: 'fastest'
        }
        // in a real app we should recalculate the price on server, because users can manipulate data

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
        // '.json' is firebase requirement only
    
        // to preventing reloading page inside form which is it default behaver
        // we should use preventDefaul
        event.preventDefault();
        console.log(this.props);
    }
    
    render () {
        let form = (
                <form>
                    <input className={cssObject.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={cssObject.Input} type="email" name="email" placeholder="Your email" />
                    <input className={cssObject.Input} type="text" name="street" placeholder="Street" />
                    <input className={cssObject.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        
        return (
            <div className={cssObject.ContactData}>
                <h4>Enter your Contact Data </h4>
                { form }
            </div> 
        );
    }
}

export default ContactData;