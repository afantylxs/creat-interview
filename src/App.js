import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login'
import Error from './components/Error'

import FrontendAuth from './components/FrontendAuth'
class App extends Component {

  render () {
    
    return (
      <HashRouter>
          <FrontendAuth />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route  component={Error} />
        </Switch>
     </HashRouter> 
    );
  }
  
}

export default App;
