import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import Menus from '../../components/Menu'
import './index.less';

class Header extends Component {
    handleCancleLogin = () => {
        localStorage.setItem("flag", false);
        this.props.history.push('/login')
    }
    render() {
        console.log('header.this',this.props);

        const { pathname } = this.props.location
        return (
            <div className="inservice-header">
                <Row>
                    <Col span={4}>
                        <div className="inservice-header-logo"></div>
                    </Col>
                    <Col span={18}>
                        <Menus />
                    </Col>
                    <Col span={2}>
                        {pathname !== '/login' && <Button onClick={this.handleCancleLogin.bind(this)}>退出登录</Button>}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Header)