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
        <div className="layout-home-reminder-content">
          <div className="reminder-entry">{moment().month() + 1}月入职人数</div>
          <div className="entry-number">
            {reminderList && reminderList.entryEmpTotal}
          </div>
        </div>
        <div className="entry-number-line"></div>
        <div className="layout-home-reminder-content">
          <div className="reminder-entry">{moment().month() + 1}月离职人数</div>
          <div style={{ color: '#658ef7' }} className="entry-number">
            {reminderList && reminderList.leaveEmpTotal}
          </div>
        </div>
      </div>
    );
  }
}

export default Reminder;
