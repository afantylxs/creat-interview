import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home'; //首页
import Header from '../../components/Header'; //头部导航栏
import Login from '../Login'; //登录页面
import Error from '../../components/Error'; //404页面
import BasicInformation from '../BasicInformation'; //基础信息页面
import EducationInfo from '../EducationInfo'; //学历信息页面
import ProjectInformation from '../ProjectInformation'; //项目信息页面
import Department from '../Department'; //部门调整页面
import Leave from '../Leave'; //离职离项页面
import Analysis from '../Analysis/'; //数据分析页面

import FrontendAuth from '../../components/FrontendAuth'; //根据是否存有token值，判断是否登录

const routerList = [
  '/',
  '/home',
  '/basic',
  '/project',
  '/department',
  '/leave',
  '/analysis',
  '/education'
];
class Layout extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div style={{ minWidth: '1300px' }}>
        <FrontendAuth />
        {routerList.includes(pathname) && <Header />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/basic" component={BasicInformation} />
          <Route path="/education" component={EducationInfo} />
          {/* <Route path="/project" component={ProjectInformation} />
          <Route path="/department" component={Department} />
          <Route path="/leave" component={Leave} />
          <Route path="/analysis" component={Analysis} /> */}
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Layout);
