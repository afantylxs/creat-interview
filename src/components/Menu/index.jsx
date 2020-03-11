import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import fetch from '../../utils/axios.config';

import './index.less';

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    };
  }
  selectRouterAactive = () => {
    const { pathname } = this.props.location;
    let activeKey = '';
    activeKey = pathname.substr(1);
    if (pathname !== '/') {
      activeKey = pathname.substr(1);
    }

    if (pathname === '/') {
      activeKey = 'home';
    }
    return activeKey;
  };

  selectInserviceRouterAactive = () => {
    const { pathname } = this.props.location;
    const activeKey = pathname;
    return activeKey;
  };

  componentDidMount() {
    fetch.get('/api/user/queryUserPermission.json').then(res => {
      if (res && res.success) {
        const { data } = res;
        const permission = data[0].permission;
        localStorage.setItem('permission', permission);
        this.setState({
          permission
        });
      }
    });
  }
  render() {
    const activeKey = this.selectInserviceRouterAactive();
    return (
      <div className="inservice-menu">
        <Menu
          theme="dark"
          selectedKeys={[activeKey]}
          className="inservice-menu-antd"
          style={{ backgroundColor: '#658ef7', color: '#fff' }}
          mode="horizontal"
        >
          <Menu.Item key="/home">
            <Link to="/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="/personnel">
            <Link to="/personnel">面试管理</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default withRouter(Menus);
