import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import cssObject from './Auth.css';
import * as  actions from  '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }  
        },
        isSingup: true
    };
    
    componentDidMount () {
        // HERE WE TEST WHETHER THE USER STARTS BUILDING BURGER OR NOT
        console.log(this.props.buildingBurger, this.props.authRedirectPath);
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
            // I don't need to pass any argument to onSetAuthRedirectPath
            // Because I hardcoded '/' path in mapDispatchToProps function 
        }
    }
    
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls =  updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }
    
     submitHandler = (event) => {
        event.preventDefault();  
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingup);
    }
    
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSingup: !prevState.isSingup};
        });
    }
    render () {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = formElementArray.map(element => (
            <Input 
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.inputChangedHandler(event, element.id)}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched} />
        ));
        
        if (this.props.loading) {
            form = <Spinner/>
        }
        
        let errorMessage = null;
        
        if (this.props.error) {
            console.log(this.props.error.message);
            errorMessage = (
                <p>{this.props.error.message}</p>    
            );
        }
        let authRedirect = null;
        console.log(authRedirect, this.props.authRedirectPath, this.props.isAuthenticated);
        
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        
        console.log(this.state.isSingup);
        
        return (
            <div className={cssObject.Auth}>
                {authRedirect}
                {errorMessage}
                <form  onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    buttonType="Danger">SWITCH TO {this.state.isSingup ? 'SINGIN': 'SINGUP'}
                </Button>
            </div>    
        );

    }
    
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSingup) => dispatch(actions.auth(email, password, isSingup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);