import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Reminder from './components/Reminder.jsx';
import BirthdayReminder from './components/BirthdayReminder.jsx';
import FieldNumber from './components/FieldNumber.jsx';
import Rejular from './components/Rejular.jsx';
import fetch from '../../utils/axios.config';
import './index.less';
let homeList = [];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    };
  }
  componentDidMount() {
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
  render() {
    const { permission } = this.state;
    if (permission && permission === 'recruitmentConsultant') {
      homeList = ['提醒事项'];
    }

    if (permission && permission !== 'recruitmentConsultant') {
      homeList = ['提醒事项', '转正提醒', '场地人数', '生日提醒'];
    }
    return (
      <div className="layout-home">
        <Row>
          {homeList.map((item, index) => {
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
                    {(item === '提醒事项' && <Reminder />) ||
                      (item === '场地人数' && <FieldNumber />) ||
                      (item === '生日提醒' && <BirthdayReminder />) ||
                      (item === '转正提醒' && <Rejular />)}
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
