import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import fetch from '../../utils/axios.config';

import {
  IncumbencyRouterList,
  inserviceRouterList
} from '../../utils/router.config.js';
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
    const { pathname } = this.props.location;
    if (IncumbencyRouterList.includes(pathname)) {
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
  }
  render() {
    const { pathname } = this.props.location;

    if (IncumbencyRouterList.includes(pathname)) {
      const activeKey = this.selectRouterAactive();
      const { permission } = this.state;

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
            {permission && permission !== 'recruitmentConsultant' && (
              <Menu.Item key="basic">
                <Link to="/basic">基础信息</Link>
              </Menu.Item>
            )}
            <Menu.Item key="education">
              <Link to="/education">学历信息</Link>
            </Menu.Item>
            {permission && permission !== 'recruitmentConsultant' && (
              <Menu.Item key="project">
                <Link to="/project">项目信息</Link>
              </Menu.Item>
            )}
            {/* {permission && permission !== 'recruitmentConsultant' && (
              <Menu.Item key="department">
                <Link to="/department">人事调整</Link>
              </Menu.Item>
            )}
            {permission && permission !== 'recruitmentConsultant' && (
              <Menu.Item key="leave">
                <Link to="/leave">离职信息</Link>
              </Menu.Item>
            )}*/}
            {permission && permission !== 'recruitmentConsultant' && (
              <Menu.Item key="analysis">
                <Link to="/analysis">数据分析</Link>
              </Menu.Item>
            )}
          </Menu>
        </div>
      );
    } else if (inserviceRouterList.includes(pathname)) {
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
            <Menu.Item key="/interview/home">
              <Link to="/interview/home">首页</Link>
            </Menu.Item>
            <Menu.Item key="/interview/personnel">
              <Link to="/interview/personnel">面试管理</Link>
            </Menu.Item>
          </Menu>
        </div>
      );
    }
  }
}
export default withRouter(Menus);
