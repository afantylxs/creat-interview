import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { menuRouter } from '../../utils/router.config.js';
import fetch from '../../utils/axios.config';

import './index.less';

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: '',
    };
  }
  selectRouterAactive = () => {
    const { pathname } = this.props.location;
    let activeKey = '';
    activeKey = pathname.substr(1);
    console.log('activeKey', activeKey, 'pathname', pathname);

    if (pathname !== '/') {
      activeKey = pathname.substr(1);
    }

    if (pathname === '/') {
      activeKey = 'home';
    }
    return activeKey;
  };

  // 渲染导航栏
  handleRenderMenu = () => {
    const menuList = menuRouter.map((item) => {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    });
    return menuList;
  };
  render() {
    const activeKey = this.selectRouterAactive();
    return (
      <div className="inservice-menu">
        <Menu
          theme="dark"
          selectedKeys={[activeKey]}
          className="inservice-menu-antd"
          style={{ backgroundColor: '#658ef7', color: '#fff' }}
          mode="horizontal"
        >
          {this.handleRenderMenu()}
        </Menu>
      </div>
    );
  }
}
export default withRouter(Menus);
