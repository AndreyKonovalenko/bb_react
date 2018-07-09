import React from 'react';
import cssObject from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={cssObject.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={cssObject.Logo}>
            <Logo />
        </div>
        <nav className={cssObject.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;