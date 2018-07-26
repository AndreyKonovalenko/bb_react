import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import cssObject from  './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Yuor Name',
                },
                value: '',
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Yuor Street',
                },
                value: '',
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Zip Code',
                },
                value: '',
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Yuor Country',
                },
                value: '',
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: 'Your E-Mail',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                },
                value: '',
            }
        },
        loading: false
    }
    
    orderHandler = (event) => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice
            
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
        console.log(this.state)
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
                <form>
                    {formElementArray.map(element => (
                    <Input
                            key={element.id} 
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}/>
                    ))}
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