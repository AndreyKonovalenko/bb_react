import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import cssObject from './NavigationItems.css'

const navigationItems = () => (
    <ul className={cssObject.NavigationItems}>
        <NavigationItem link="/" active={true} >Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;