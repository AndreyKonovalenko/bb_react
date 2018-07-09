import React, {Component} from 'react';
import cssObject from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component  {
    render () {
        let ingredient = null;
        switch(this.props.type) {
            case ('bread-bottom'):
                ingredient  = <div className={cssObject.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={cssObject.BreadTop}>
                        <div className={cssObject.Seeds1}> </div>
                        <div className={cssObject.Seeds2}> </div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={cssObject.Meat}></div>
                break;
            case ('cheese'):
                ingredient = <div className={cssObject.Cheese}></div>
                break;
            case ('salad'):
                ingredient = <div className={cssObject.Salad}></div>
                break;
            case ('bacon'):
                ingredient = <div className={cssObject.Bacon}></div>
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient; 