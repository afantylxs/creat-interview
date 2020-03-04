import React, { Component } from 'react';
import { Row, Col, Tabs, message, Collapse, Icon } from 'antd';
import { connect } from 'react-redux';

import WeeklyBuDepartment from './WeeklyBuDepartment.jsx';
import WeeklyWorkCity from './WeeklyWorkCity.jsx';
import WeeklyJobClass from './WeeklyJobClass.jsx';

import { actionCreators } from '../store';

const { Panel } = Collapse;
const customPanelStyle = {
  background: '#f0f5ff',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};

@connect(state => state.analysis, actionCreators)
class Weekly extends Component {
  handChangeCollapse = activeKey => {
    const {
      queryEmployeeCountByDept,
      queryEmployeeCountByWorkCity,
      queryEmployeeCountByJobClass
    } = this.props;
    switch (activeKey) {
      case 'weeklyBu-department':
        queryEmployeeCountByDept();
        break;
      case 'weeklyBu-line':
        queryEmployeeCountByWorkCity();
        break;
      case 'workType-employee':
        queryEmployeeCountByJobClass();
        break;
      default:
        break;
    }
  };
  render() {
    const { weeklyJobClassYear, weeklyCityYear, weeklyYear } = this.props;
    return (
      <div className="analusis-weekly">
        <Row>
          <Col>
            <Collapse
              accordion={true}
              onChange={this.handChangeCollapse}
              bordered={false}
              defaultActiveKey={['turnoverRate']}
              expandIcon={({ isActive }) => (
                <Icon type="caret-right" rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header={`${weeklyYear.year}第${weeklyYear.week}周人员分布一览 -- 阿里实施 + 平台`}
                key="weeklyBu-department"
                style={customPanelStyle}
              >
                <WeeklyBuDepartment />
              </Panel>
              <Panel
                header={`${weeklyCityYear.year}第${weeklyCityYear.week}周项目组人员分布 -- 阿里实施`}
                key="weeklyBu-line"
                style={customPanelStyle}
              >
                <WeeklyWorkCity />
              </Panel>
              <Panel
                header={`${weeklyJobClassYear.year}第${weeklyJobClassYear.week}周员工类别分布 -- 阿里实施`}
                key="workType-employee"
                style={customPanelStyle}
              >
                <WeeklyJobClass />
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Weekly;
