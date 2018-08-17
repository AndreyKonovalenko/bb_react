import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import cssObject from './NavigationItems.css'

const navigationItems = (props) => (
    <ul className={cssObject.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;