import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../Home'; //首页
import Header from '../../components/Header'; //头部导航栏
import Error from '../../components/Error'; //404页面

class Layout extends Component {
  render() {
    return (
      <div style={{ minWidth: '1300px' }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/society" component={Error} />
          <Route exact path="/campus" component={Error} />
          <Route exact path="/ali" component={Error} />
          <Route exact path="/personage" component={Error} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Layout);
