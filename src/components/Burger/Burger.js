import React from 'react';

import cssObject from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((item) => {
            return [...Array(props.ingredients[item])].map((_, index) => {
                // _ means blank argument, it means we don't need item argument of map method
                return <BurgerIngredient key={item + index} type={item} />
            });
        }).reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue);
        }, []);
    // Mega cool code I should lern it properly

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return (
        <div className={cssObject.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;

