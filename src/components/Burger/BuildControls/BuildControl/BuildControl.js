import React from 'react';
import cssObject from './BuildControl.css';

const buildControl = (props) => (
    <div className={cssObject.BuildControl}>
        <div className={cssObject.Label}>{props.label}</div>
        <button 
            className={cssObject.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>Less</button>
        <button 
            className={cssObject.More} 
            onClick={props.added}>More</button>
    </div>
);

export default buildControl;
