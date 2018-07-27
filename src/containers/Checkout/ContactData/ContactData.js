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
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Yuor Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Yuor Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: 'Your E-Mail',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                },
                value: "",
                touched: false
            }
        },
        loading: false
    }
    
    checkValidity(value, rules) {
        // We checking our rulse one by one to prevet false validation for element which dose not have length checking rule
        let isValid = true;
        
        if(rules.required && isValid) {
            isValid = value.trim() !== '' && isValid;
        }
        
        if (rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }
        
        if (rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }
        
        return isValid;
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
            
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
     
    inputChangedHandler = (event, inputIdentifier) => {
        //immutable way to copy complex objects with nested objects
        //using spread operator "..."
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.validation !== undefined) {
           updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation); 
        }
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({orderForm: updatedOrderForm});
    }
 
    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
                <form onSubmit = {this.orderHandler}>
                    {formElementArray.map(element => (
                    <Input
                            key={element.id} 
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            changed={(event) => this.inputChangedHandler(event, element.id)}
                            invalid={!element.config.valid}
                            shouldValidate={element.config.validation}
                            touched={element.config.touched}/>
                    ))}
                    <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        
        console.log(this.state.orderForm.deliveryMethod.value);
        return (
            <div className={cssObject.ContactData}>
                <h4>Enter your Contact Data </h4>
                { form }
            </div> 
        );
    }
}

export default ContactData;