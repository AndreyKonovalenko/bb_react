import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import cssObject from './CheckoutSummary.css'


const checkoutSummary = (props) => {
    return (
        <div className={cssObject.CheckoutSummary}>
            <h1>We hope it tastes well !</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                buttonType="Danger"
                clicked>CANCEL</Button>
            <Button 
                buttonType="Success"
                clicked>CONTINUE</Button>
        </div>
    );
    
    
}

export default checkoutSummary;