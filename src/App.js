import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './page/Layout';
import Login from './page/Login'
import Error from './components/Error'
import BasicInformation from './components/BasicInformation';
import ProjectInformation from './page/ProjectInformation'

import FrontendAuth from './components/FrontendAuth'; //检查是否登录组件
class App extends Component {
  

  render () {
    // const { pathname } = this.props.location;
    // console.log('pathname', pathname);
    
    return (
      <HashRouter>
          <FrontendAuth />
        <Switch>
          <Route exact path='/' component={Layout} />
          <Route exact path='/home' component={Layout} />
          <Route exact path='/login' component={Login} />
          <Layout>
            <Route path='/basic' component={BasicInformation} />
            <Route path='/project' component={ProjectInformation} />
          </Layout>
          <Route  component={Error} />
        </Switch>
     </HashRouter> 
    );
  }
  
}

export default App;
