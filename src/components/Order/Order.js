import React from 'react';

import cssObject from './Order.css';

const order = (props) => (
    <div className={cssObject.Order}>
        <p> Ingredients: Salad (1)</p>
        <p> Price: <strong>USD 5.43</strong></p>
    </div>
);

export default order;