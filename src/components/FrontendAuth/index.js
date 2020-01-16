import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IncumbencyRouterList,
  inserviceRouterList
} from '../../utils/router.config.js';

class FrontendAuth extends Component {
  componentWillReceiveProps(nextProps) {
    const { pathname } = this.props.location;
    const flag = localStorage.getItem('flag');
    // 判断登录情况，如果是登录状态跳转至当前页面，如果不是登录状态跳转至登录页
    if ((flag === null || flag === 'false') && pathname !== '/login') {
      if (IncumbencyRouterList.includes(pathname)) {
        this.props.history.push('/login');
      }
      if (inserviceRouterList.includes(pathname)) {
        this.props.history.push('/interview/login');
      }
      return;
    }
  }
  componentDidMount() {
    const { pathname } = this.props.location;
    const flag = localStorage.getItem('flag');
    // 判断登录情况，如果是登录状态跳转至当前页面，如果不是登录状态跳转至登录页
    if ((flag === null || flag === 'false') && pathname !== '/login') {
      this.props.history.push('/login');
      return;
    }
  }
  render() {
    return null;
  }
}
const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps)(withRouter(FrontendAuth));
