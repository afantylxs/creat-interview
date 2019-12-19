import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import './reminder.less';

@connect(state => state.home, actionCreators)
class Reminder extends Component {
  componentDidMount() {
    const { getReminderList } = this.props;
    getReminderList();
  }
  render() {
    const { reminderList } = this.props;
    return (
      <div className="layout-home-reminder">
        <span className="reminder-content">
          12月入职人数
          <span style={{ color: '#658ef7' }}>10</span>人
        </span>
        <span className="reminder-content">
          12月离职人数
          <span style={{ color: '#658ef7' }}>10</span>人
        </span>
        <span className="reminder-content">
          待完善项目
          <span style={{ color: '#658ef7' }}>10</span>人
        </span>
        <span className="reminder-content">
          信息安全提醒
          <span style={{ color: '#658ef7' }}>10</span>
        </span>
        <span className="reminder-content">
          待完善学历
          <span style={{ color: '#658ef7' }}>10</span>人
        </span>
      </div>
    );
  }
}

export default Reminder;
