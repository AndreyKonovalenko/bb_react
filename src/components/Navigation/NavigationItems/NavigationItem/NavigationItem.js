import React from 'react';
import { NavLink } from 'react-router-dom';

import cssObject from './NavigationItem.css'

const navigationItem  = (props) => (
    <li className={cssObject.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact} // for useg only in whe exact props passed from outside not for all navigation Items
            activeClassName={cssObject.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
