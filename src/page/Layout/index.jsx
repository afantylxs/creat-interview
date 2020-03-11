import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import Home from '../Home'; //首页
import Header from '../../components/Header'; //头部导航栏
import Login from '../Login'; //登录页面
import Register from '../Register';
import Error from '../../components/Error'; //404页面
import PersonnelInformation from '../PersonnelInformation/index'; //内面系统人员信息页面

//路由配置
import { allRouterList } from '../../utils/router.config.js';

import FrontendAuth from '../../components/FrontendAuth'; //根据是否存有token值，判断是否登录

class Layout extends Component {
  render() {
    const flag = localStorage.getItem('flag');
    const { pathname } = this.props.location;
    return (
      <div style={{ minWidth: '1300px' }}>
        <FrontendAuth />
        {allRouterList.includes(pathname) && <Header />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route path="/personnel" component={PersonnelInformation} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Layout);
