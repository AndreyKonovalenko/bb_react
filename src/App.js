import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../src/hoc/Layout/Layout';
import BurgerBuild from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from '../src/containers/Orders/Orders';
import Auth from '../src/containers/Auth/Auth';
import Logout from '../src/containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSingup();
  } 
 
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={ Auth } />
                <Route path="/" exact component={ BurgerBuild } />
                <Redirect to="/" />
            </Switch>
        );
        
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={ Checkout } />
                    <Route path="/orders" component={ Orders } />
                    <Route path="/logout" component= { Logout } />
                    <Route path="/" exact component={ BurgerBuild } />
                    <Redirect to="/" />
                </Switch>
            );
        }
      
        return (
            <div>
                <Layout>
                    { routes }
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSingup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

