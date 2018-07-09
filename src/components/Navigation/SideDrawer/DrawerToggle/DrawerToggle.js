import React from 'react';

import cssObject from "./DrawerToggle.css";


const drawerToggle = (props) =>(
    <div className={cssObject.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);


export default drawerToggle;