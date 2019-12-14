import React,{ Component } from 'react';
import { connect } from 'react-redux'
import { NavLink ,Link, withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './index.less'
const { SubMenu } = Menu;

class Menus extends Component {
  selectRouterAactive = () => {
    const { pathname } = this.props.location;
    let activeKey = '';
    activeKey = pathname.substr(1);
    if(pathname !== '/' ) {
      activeKey = pathname.substr(1)
    } 

    if(pathname === '/' ) {
      activeKey = 'home'
    }
    return activeKey;
    
  }
    render() {
      const activeKey = this.selectRouterAactive()
      console.log('menu',this.props);

      
        return (
          <div className="inservice-menu">
            <Menu theme="dark" style={{backgroundColor: '#658ef7', color: '#fff'}} selectedKeys={[activeKey]} mode="horizontal">
              <Menu.Item key="home">
                <Link to='/home'>
                    首页
                </Link>
              </Menu.Item>
              <Menu.Item key="basic">
                  <Link to='/basic'>
                    基础信息
                  </Link>
              </Menu.Item>
              <Menu.Item key="project">
                  <Link to='/project'>
                    项目信息
                  </Link>
              </Menu.Item>
            </Menu>
          </div>
        );
      }
}
export default withRouter(Menus)