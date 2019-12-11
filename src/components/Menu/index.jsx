import React,{ Component } from 'react';
import { connect } from 'react-redux'
import { NavLink ,Link, withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './index.less'
const { SubMenu } = Menu;

class Menus extends Component {
      handleClick = e => {
        console.log('click ', e);
        this.props.handleChangeMenuSelectedKeys(e.key)
      };
  selectRouterAactive = current => {
    const newCurrent = '/' + current;
    const { pathname } = this.props.location;
    console.log('this.props',this.props, 'sssss', newCurrent);

    
    let activeKey = '';
    activeKey = pathname.substr(1);
    if(pathname !== '/' && pathname !== newCurrent) {
      activeKey = pathname.substr(1)
    } 

    if(pathname === '/' ) {
      activeKey = 'home'
    }
    return activeKey;
    
  }
    render() {
      const { current } = this.props;
      const activeKey = this.selectRouterAactive(current)
      console.log('activeKey',activeKey);

      
        return (
          <div className="inservice-menu">
            <Menu theme="dark" style={{backgroundColor: '#658ef7', color: '#fff'}} onClick={this.handleClick} selectedKeys={[activeKey]} mode="horizontal">
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

const mapStateToProps = state => {
  return {
    current: state.current,
  }
}

const mapDispatchTopProps = dispatch => {
  return {
      handleChangeMenuSelectedKeys(key) {
          const action = {
              type: 'change_selectedKeys',
              payload: key
          }
          dispatch(action)
      }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchTopProps)(Menus))