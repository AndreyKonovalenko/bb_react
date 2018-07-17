import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuild from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';


class App extends Component {
 
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuild />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;

