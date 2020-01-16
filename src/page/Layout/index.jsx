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
import BasicInformation from '../BasicInformation'; //基础信息页面
import EducationInfo from '../EducationInfo'; //学历信息页面
import ProjectInformation from '../ProjectInformation'; //项目信息页面
import Department from '../Department'; //部门调整页面
import Leave from '../Leave'; //离职离项页面
import Analysis from '../Analysis/'; //数据分析页面
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
          <Route exact path="/interview/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* {flag === 'false' ? (
            <Redirect to="/login" />
          ) : (
            <Route exact path="/" component={Home} />
          )} */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/interview/home" component={Home} />
          <Route path="/basic" component={BasicInformation} />
          <Route path="/education" component={EducationInfo} />
          <Route path="/project" component={ProjectInformation} />
          {/* <Route path="/department" component={Department} />
          <Route path="/leave" component={Leave} />*/}
          <Route path="/analysis" component={Analysis} />
          <Route path="/interview/personnel" component={PersonnelInformation} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Layout);
