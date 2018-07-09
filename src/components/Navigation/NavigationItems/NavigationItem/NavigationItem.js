import React from 'react';

import cssObject from './NavigationItem.css'

const navigationItem  = (props) => (
    <li className={cssObject.NavigationItem}>
        <a 
            href={props.link} 
            className={props.active ? cssObject.active : null}>{props.children}</a>
    </li>
);

export default navigationItem;
