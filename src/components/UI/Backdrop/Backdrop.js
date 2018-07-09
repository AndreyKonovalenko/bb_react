import React from 'react';
import cssObject from './Backdrop.css'

const backdrop = (props) => (
    props.show ? <div className={cssObject.Backdrop} onClick={props.clicked}></div> : null 
);

export default backdrop;