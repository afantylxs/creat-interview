import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

@connect(state => state.home, actionCreators)
class InterviewReminder extends Component {
  componentDidMount() {
    const {
      queryMyToDoAssignationInterview,
      queryMyToDoInterview
    } = this.props;
    queryMyToDoAssignationInterview();
    queryMyToDoInterview();
  }
  render() {
    const { interviewResume, distributionResume } = this.props;
    return (
      <Row className="layout-home-reminder" style={{ minWidth: '290px' }}>
        <Col span={12} className="reminder-content reminder-content-link">
          待分配简历
          <span style={{ color: '#658ef7' }}> {distributionResume} </span>份
        </Col>
        <Col span={12} className="reminder-content reminder-content-link">
          待面试简历
          <span style={{ color: '#658ef7' }}> {interviewResume} </span>份
        </Col>
      </Row>
    );
  }
}

export default withRouter(InterviewReminder);
