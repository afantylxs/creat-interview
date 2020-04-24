import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import Menus from '../../components/Menu';
import './index.less';

class Header extends Component {
  handleCancleLogin = () => {
    localStorage.setItem('flag', false);
    localStorage.setItem('token', '');
    this.props.history.push('/login');
  };
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="inservice-header">
        <Row className="inservice-header-auto">
          <Col className="inservice-logo" span={6}>
            <div className="inservice-header-logo"></div>
            <i className="inservice-logo-line"></i>
            <i className="inservice-logo-title">社招官网</i>
          </Col>
          <Col span={13} className="inservice-header-menu">
            <Menus />
          </Col>
          <Col className="inservice-header-login" span={5}>
            <div className="inservice-header-login-welcome">
              欢迎来到阿里巴巴集团招聘！
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Header);
