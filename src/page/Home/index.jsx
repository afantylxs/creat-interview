import React, { Component } from 'react';
import { Row, Col } from 'antd';
import InterviewReminder from './interviewComponents/InterviewReminder.jsx';
import InterviewRejular from './interviewComponents/InterviewRejular.jsx';
import WaitingDistribution from './interviewComponents/WaitingDistribution.jsx';
import ProjectApproval from './interviewComponents/ProjectApproval.jsx';
import fetch from '../../utils/axios.config';
import './index.less';
const interViewHomeList = [
  '提醒事项',
  '面试提醒',
  '待分配简历',
  '项目通过人数'
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    };
  }
  componentDidMount() {
    const { pathname } = this.props.location;
    if (pathname === '/home') {
      fetch.get('/api/user/queryUserPermission.json').then(res => {
        if (res && res.success) {
          const { data } = res;
          const permission = data[0].permission;
          this.setState({
            permission
          });
        }
      });
    }
  }
  render() {
    //根据路由判断是进入人员管理还是内面系统
    return (
      <div className="layout-home">
        <Row>
          {interViewHomeList.map((item, index) => {
            return (
              <Col
                key={index}
                className="layout-home-col"
                span={12}
                style={{ height: '400px' }}
              >
                <h2 className="layout-home-title">{item}</h2>
                <div className="layout-home-info">
                  <div>
                    {(item === '提醒事项' && <InterviewReminder />) ||
                      (item === '面试提醒' && <InterviewRejular />) ||
                      (item === '待分配简历' && <WaitingDistribution />) ||
                      (item === '项目通过人数' && <ProjectApproval />)}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
