import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
import Header from '../../components/Header';
import Login from '../Login';
import Error from '../../components/Error';
import BasicInformation from '../BasicInformation';
import ProjectInformation from '../ProjectInformation';
import FrontendAuth from '../../components/FrontendAuth'; //检查是否登录

const routerList = ['/','/home','/basic','/project']
class Layout extends Component {
  

  render () {
    console.log('layout',this.props);
    const { pathname } = this.props.location
    return (
      <div>
          <FrontendAuth />
          { routerList.includes(pathname) && <Header /> }
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route path='/basic' component={BasicInformation} />
          <Route path='/project' component={ProjectInformation} />
          <Route  component={Error} />
        </Switch>
     </div> 
    );
  }
  
}

export default withRouter(Layout);
