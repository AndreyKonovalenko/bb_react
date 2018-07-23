import React from 'react';

import cssObject from './Order.css';

const order = (props) => (
    <div className={cssObject.Order}>
        <p><strong>Ingredients:</strong></p>
        {props.ingredients}
        <p> Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
);

export default order;