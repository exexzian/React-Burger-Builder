import React, { Component } from 'react';

import classes from './App.css';
import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../Containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  // state = {
  //   show: true,
  // };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 5000);
  // }

  render() {
    return (
     <div>
      <Layout>
        {/* {this.state.show ? <BurgerBuilder/> : null } */}
        <BurgerBuilder/>
      </Layout>
     </div>
    );
  }
}

export default App;
