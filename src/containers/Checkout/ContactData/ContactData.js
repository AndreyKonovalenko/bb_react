import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import cssObject from  './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: null,
            street: null,
            zipCode: null,
            country: null,
            email: null,
            cellNumber: null,
            deliveryMethod: null
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
    
    
    formDataCreator (param_type, elem_type, elem_plecholder, param_value)  {
        const parameter_object = {
            elementType: param_type,
            elementConfig: {
                type: elem_type,
                placeholder: elem_plecholder,
            },
            value: param_value,
        };
        
        console.log(parameter_object);
        return parameter_object;
        
        
    }
    
    
    componentDidMount() {
        console.log('Setup deafault parameter for orderForm', this.state);
        
        form_name = {...this.formDataCreator('input','text','Your Name', '')};
        console.log(form_name);
        this.setState( {name: form_name,
            street: this.formDataCreator('input', 'text',' Your stret', ''),
            zipCode: this.formDataCreator('input', 'text', 'Zip code', ''),
            country: this.formDataCreator('input', 'text', 'Your Country', ''),
            email: this.formDataCreator('input', 'email', 'Your Email', ''),
            cellNumber: this.formDataCreator('input', 'text', 'Your cell phone', ''),
            deliveryMethod: this.formDataCreator('input', 'text', 'method', '')});
        console.log(this.state);
    }
    
    render () {
        let form = (
                <form>
                    <Input  input_type="input" name="name" placeholder="Your Name" />
                    <Input  input_type="input" name="email" placeholder="Your Mail" />
                    <Input  input_type="input" name="street" placeholder="Street" />
                    <Input  input_type="input" name="postal" placeholder="Postal Code" />
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