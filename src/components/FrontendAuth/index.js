import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class FrontendAuth extends Component {
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
        // const newiILogin = nextProps.isLogin;
        // const { isLogin } = this.props;
        const { pathname } = this.props.location;
        const flag = localStorage.getItem("flag");
        console.log('flag',flag);
        
        if(!flag&& pathname !== '/login') {

            this.props.history.push('/login')
        }
    }
    componentDidMount () {
        const { isLogin } = this.props;
        const { pathname } = this.props.location;
        const flag = localStorage.getItem("flag");
        if(!flag&& pathname !== '/login') {
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