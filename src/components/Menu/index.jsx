import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.less';
const { SubMenu } = Menu;

class Menus extends Component {
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
  render() {
    const activeKey = this.selectRouterAactive();

    return (
      <div className="inservice-menu">
        <Menu
          theme="dark"
          className="inservice-menu-antd"
          style={{ backgroundColor: '#658ef7', color: '#fff' }}
          selectedKeys={[activeKey]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="basic">
            <Link to="/basic">基础信息</Link>
          </Menu.Item>
          <Menu.Item key="education">
            <Link to="/education">学历信息</Link>
          </Menu.Item>
          <Menu.Item key="project">
            <Link to="/project">项目信息</Link>
          </Menu.Item>
          <Menu.Item key="department">
            <Link to="/department">部门调整</Link>
          </Menu.Item>
          <Menu.Item key="leave">
            <Link to="/leave">离职离项</Link>
          </Menu.Item>
          <Menu.Item key="analysis">
            <Link to="/analysis">数据分析</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default withRouter(Menus);
