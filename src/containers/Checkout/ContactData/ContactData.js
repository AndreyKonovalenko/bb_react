import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import cssObject from  './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pastalCode: ''
        }
    }
    
    render () {
        return (
            <div className={cssObject.ContactData}>
                <h4>Enter your Contact Data </h4>
                <form>
                    <input className={cssObject.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={cssObject.Input} type="email" name="email" placeholder="Your email" />
                    <input className={cssObject.Input} type="text" name="street" placeholder="Street" />
                    <input className={cssObject.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button buttonType="Success">ORDER</Button>
                </form>
            </div>
            );
    }
}

export default ContactData;