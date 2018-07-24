import React from 'react';

import cssObject from './Input.css'


const input = (props) => {
    let inputElement = null;
    switch (props.input_stype) {
        case ('input'): 
            inputElement = <input className={cssObject.InputElement} {...props}/>;
            break;
        case ('textaria'):
            inputElement = <textaria className={cssObject.InputElement} {...props}/>;
            break;
        default:
            inputElement = <input className={cssObject.InputElement} {...props}/>
    }
    
    return (
        <div className={cssObject.Input}>
            <label className={cssObject.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
    
}


export default input;  