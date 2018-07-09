import React from 'react';
import cssObject from './Button.css';

const button = (props) => (
        <button
            className={[cssObject.Button, cssObject[props.buttonType]].join(' ')} 
            onClick={props.clicked} >{props.children}</button>
);

export default button; 