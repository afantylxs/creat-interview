import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class FrontendAuth extends Component {
    componentWillReceiveProps() {
        const { isLogin } = this.props;
        const { pathname } = this.props.location;
        if(!isLogin && pathname !== '/login') {
            this.props.history.push('/login')
        }
    }
    componentDidMount () {
        const { isLogin } = this.props;
        if(!isLogin) {
            this.props.history.push('/login')
        }
    }
    render() {
        return null
    }
}
const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
    }
}
export default connect(mapStateToProps)(withRouter(FrontendAuth))