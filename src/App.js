import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from './page/Layout';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout />
      </HashRouter>
    );
  }
}

export default App;
