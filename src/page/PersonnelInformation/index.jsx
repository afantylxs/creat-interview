import React, { Component } from 'react';
import { Row, Col, Tabs, message, Button } from 'antd';

import DistributionTable from './components/DistributionTable.jsx';
import './index.less';

const { TabPane } = Tabs;
export default class PersonnelInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKye: 'distribution'
    };
  }
  render() {
    const { activeKye } = this.state;
    return (
      <div>
        <Row className="personnel-search">
          <Col span={8} className="personnel-search-phone"></Col>
        </Row>
        <Row className="personnel-content">
          <Col span={24} className="personnel-add">
            <Button type="primary">新增信息</Button>
          </Col>
          <Col span={24}>
            <Tabs
              animated={false}
              defaultActiveKey={activeKye}
              //   onChange={this.handleChangeTabs}
            >
              <TabPane tab="简历分配" key="distribution">
                <DistributionTable />
              </TabPane>
              <TabPane tab="简历面试" key="interview"></TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
