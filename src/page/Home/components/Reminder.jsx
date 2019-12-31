import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
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

  handlGoToBasic = () => {
    localStorage.setItem('entmonth', '1');
    this.props.history.push('/basic');
  };

  handlGoToEduc = () => {
    localStorage.setItem('educStatusFlag', '2');
    this.props.history.push('/education');
  };
  render() {
    const { reminderList, myTodoList, myTodoeducationData } = this.props;
    return (
      <Row className="layout-home-reminder" style={{ minWidth: '290px' }}>
        <Col
          span={12}
          onClick={() => this.handlGoToBasic()}
          className="reminder-content reminder-content-link"
        >
          {month}月入职人数
          <span style={{ color: '#658ef7' }}>
            {reminderList && reminderList.entryEmpTotal}
          </span>
          人
        </Col>
        <Col span={12} className="reminder-content reminder-content-link">
          {month}月离职人数
          <span style={{ color: '#658ef7' }}>
            {reminderList && reminderList.leaveEmpTotal}
          </span>
          人
        </Col>

        <Col span={12} className="reminder-content">
          待完善项目
          <span style={{ color: '#658ef7' }}>{myTodoList}</span>人
        </Col>
        <Col span={12} className="reminder-content">
          信息安全提醒
          <span style={{ color: '#658ef7' }}></span>
        </Col>
        <Col
          onClick={() => this.handlGoToEduc()}
          span={12}
          className="reminder-content reminder-content-link"
        >
          待完善学历
          <span style={{ color: '#658ef7' }}> {myTodoeducationData} </span>人
        </Col>
      </Row>
    );
  }
}

export default withRouter(Reminder);
