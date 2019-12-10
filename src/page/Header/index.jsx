import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button } from 'antd'

class Header extends Component {
    handleCancleLogin = () => {
        this.props.history.push('/login')
    }
    render() {
        const { pathname } = this.props.location
        console.log('header.this.props',this.props);
        
        return (
            <div style={{height: '100px'}}>
                <span>头部</span>
                {pathname !== '/login' && <Button onClick={this.handleCancleLogin.bind(this)}>退出登录</Button>}
            </div>
        )
    }
}

export default withRouter(Header)