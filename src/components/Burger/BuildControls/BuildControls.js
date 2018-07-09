import React from 'react';
import cssObject from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'}, 
    {label: 'Meat', type: 'meat'}, 
    {label: 'Cheese', type: 'cheese'}, 
    {label: 'Bacon', type: 'bacon'}
];


const buildControls = (props) => (

    <div className={cssObject.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((element) => (
            <BuildControl 
                key={element.label} 
                label={element.label}
                added={() => props.ingredientAdded(element.type)}
                removed={() => props.ingredientRemoved(element.type)}
                disabled = {props.disabled[element.type]}/>
        ))}
        <button 
            className={cssObject.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls; 