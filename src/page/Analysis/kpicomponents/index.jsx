import React, { Component } from 'react';
import { Row, Col, Tabs, message, Collapse, Icon } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
import TurnoverRate from './TurnoverRate.jsx';
import ManpowerStructure from './ManpowerStructure.jsx';
import WorkType from './WorkType.jsx';
import WholeKpi from './WholeKpi.jsx';

const { Panel } = Collapse;
const customPanelStyle = {
  background: '#f0f5ff',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};

@connect(state => state.analysis, actionCreators)
class KpiBiweekly extends Component {
  handChangeCollapse = activeKey => {
    const {
      queryKpiWeekLeaveDataAnalysis,
      queryKpiWeekEmployeeDataAnalysis,
      queryKpiWeekJobTypeDataAnalysis,
      queryKpiWeekKpiWholeDataAnalysis
    } = this.props;
    switch (activeKey) {
      case 'turnoverRate':
        queryKpiWeekLeaveDataAnalysis();
        break;
      case 'manpower':
        queryKpiWeekEmployeeDataAnalysis();
        break;
      case 'workType':
        queryKpiWeekJobTypeDataAnalysis();
        break;
      case 'wholeKpi':
        queryKpiWeekKpiWholeDataAnalysis();
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div className="analusis-kpi-weekly">
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
                header="软通阿里实施部 -- 离职率"
                key="turnoverRate"
                style={customPanelStyle}
              >
                <TurnoverRate />
              </Panel>
              <Panel
                header="软通阿里实施部 -- 人力结构"
                key="manpower"
                style={customPanelStyle}
              >
                <ManpowerStructure />
              </Panel>
              <Panel
                header="软通阿里实施部 -- 工种分布"
                key="workType"
                style={customPanelStyle}
              >
                <WorkType />
              </Panel>
              <Panel
                header="软通阿里ITO -- KPI整体进展"
                key="wholeKpi"
                style={customPanelStyle}
              >
                <WholeKpi />
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default KpiBiweekly;
