import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import './reminder.less';
const month = moment().month() + 1;

@connect(state => state.home, actionCreators)
class Reminder extends Component {
  componentDidMount() {
    const {
      getReminderList,
      queryMyToDoProject,
      queryMyToDoEducation
    } = this.props;
    getReminderList();
    queryMyToDoProject();
    queryMyToDoEducation();
  }
  render() {
    const { reminderList, myTodoList, myTodoeducationData } = this.props;
    return (
      <Row className="layout-home-reminder" style={{ minWidth: '290px' }}>
        <Link to={`/basic?entmonth=${month}`} style={{ color: '#000000a6' }}>
          <Col span={12} className="reminder-content reminder-content-link">
            {month}月入职人数
            <span style={{ color: '#658ef7' }}>
              {reminderList && reminderList.entryEmpTotal}
            </span>
            人
          </Col>
        </Link>
        <Link to={`/basic?leavemonth=${month}`} style={{ color: '#000000a6' }}>
          <Col span={12} className="reminder-content reminder-content-link">
            {month}月离职人数
            <span style={{ color: '#658ef7' }}>
              {reminderList && reminderList.leaveEmpTotal}
            </span>
            人
          </Col>
        </Link>

        <Col span={12} className="reminder-content">
          待完善项目
          <span style={{ color: '#658ef7' }}>{myTodoList}</span>人
        </Col>
        <Col span={12} className="reminder-content">
          信息安全提醒
          <span style={{ color: '#658ef7' }}></span>
        </Col>
        <Link to={`/education?statusFlag=${2}`} style={{ color: '#000000a6' }}>
          <Col span={12} className="reminder-content reminder-content-link">
            待完善学历
            <span style={{ color: '#658ef7' }}> {myTodoeducationData} </span>人
          </Col>
        </Link>
      </Row>
    );
  }
}

export default Reminder;
