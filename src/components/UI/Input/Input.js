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
        case ('select'):
            inputElement = 
                <select 
                    className={cssObject.InputElement} 
                    value = {props.value}>
                    {props.elementConfig.options.map(element => (
                        <option key={element.value} value={element.value} > {element.displayValue}</option>
                    ))}
                </select>;
            break;    
        default:
            inputElement = <input 
                className={cssObject.InputElement} 
                {...props.elementConfig}
                value = {props.value}/>
    }
    console.log(props, inputElement);
    return (
        <div className={cssObject.Input}>
            <label className={cssObject.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
    
}


export default input;  