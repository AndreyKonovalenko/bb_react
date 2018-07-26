import React from 'react';

import cssObject from './Input.css'


const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'): 
            inputElement = <input 
                className={cssObject.InputElement} 
                {...props.elementConfig}
                value = {props.value}/>;
            break;
        case ('textaria'):
            inputElement = <textaria 
                className={cssObject.InputElement} 
                {...props.elementConfig}
                value = {props.value}/>;
            break;
        default:
            inputElement = <input 
                className={cssObject.InputElement} 
                {...props.elementConfig}
                value = {props.value}/>
    }
    
    return (
        <div className={cssObject.Input}>
            <label className={cssObject.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
    
}


export default input;  