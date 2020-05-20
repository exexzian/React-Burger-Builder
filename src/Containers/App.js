import React, { Component } from 'react';

import classes from './App.css';
import Layout from '../Components/Layout/Layout';
import BurgerBuilder from '../Containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  render() {
    return (
     <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
     </div>
    );
  }
}

export default App;