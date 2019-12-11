import React,{ Component } from 'react';
import { NavLink ,Link} from 'react-router-dom'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

export default class Menus extends Component {
    state = {
        current: 'mail',
      };
    
      handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };
    render() {
        return (
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="mail">
              <Link to='/home'>
                  首页
              </Link>
            </Menu.Item>
            <Menu.Item key="app">
                <Link to='/basic'>
                  基础信息
                </Link>
            </Menu.Item>
          </Menu>
        );
      }
}