import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import Menus from '../../components/Menu';
import './index.less';

class Header extends Component {
  handleCancleLogin = () => {
    localStorage.setItem('flag', false);
    this.props.history.push('/login');
  };
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="inservice-header">
        <Row style={{ height: '100%', display: 'flex' }}>
          <Col span={5}>
            <div className="inservice-header-logo"></div>
          </Col>
          <Col span={16} className="inservice-header-menu">
            <Menus />
          </Col>
          <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
            {pathname !== '/login' && (
              <Button onClick={this.handleCancleLogin.bind(this)}>
                退出登录
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Header);
