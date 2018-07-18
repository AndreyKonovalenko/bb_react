import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../src/hoc/Layout/Layout';
import BurgerBuild from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';


class App extends Component {
 
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={ Checkout }/>
            <Route path="/" exact component={ BurgerBuild }/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

