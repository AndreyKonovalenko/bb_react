import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssObject from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    
    let attachedClasses = [cssObject.SideDrawer, cssObject.Close];

    if (props.open) {
        attachedClasses = [cssObject.SideDrawer, cssObject.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.sideDrawerClosed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={cssObject.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;