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
      <Row className="layout-home-reminder" style={{ minWidth: '290px' }}>
        <Col span={12} className="reminder-content">
          12月入职人数
          <span style={{ color: '#658ef7' }}>10</span>人
        </Col>
        <Col span={12} className="reminder-content">
          12月离职人数
          <span style={{ color: '#658ef7' }}>10</span>人
        </Col>
        <Col span={12} className="reminder-content">
          待完善项目
          <span style={{ color: '#658ef7' }}>10</span>人
        </Col>
        <Col span={12} className="reminder-content">
          信息安全提醒
          <span style={{ color: '#658ef7' }}>10</span>
        </Col>
        <Col span={12} className="reminder-content">
          待完善学历
          <span style={{ color: '#658ef7' }}>10</span>人
        </Col>
      </Row>
    );
  }
}

export default Reminder;
