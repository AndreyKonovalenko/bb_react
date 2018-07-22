import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import cssObject from './NavigationItems.css'

const navigationItems = () => (
    <ul className={cssObject.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;