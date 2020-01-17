import React, { Component } from 'react';
import { Row, Col, Tabs, message, Button, Input, Form, Select } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from './store';
import DistributionTable from './components/DistributionTable.jsx';
import AddModal from './components/AddModal.jsx';
import {
  resumeStatusList,
  initialInterviewResultList,
  finalInterviewResultList
} from '../../utils/optionEnum';
import './index.less';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
@connect(state => state.personnel, actionCreators)
class PersonnelInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKye: 'distribution'
    };
  }

  handleOpenAddModal = () => {
    const {
      changeAddModalVisible,
      queryUserListInfoByRolePermission
    } = this.props;
    changeAddModalVisible({
      addModalvisible: true
    });
    queryUserListInfoByRolePermission({
      key: 'add',
      value: 'resourceMange'
    });
  };

  componentDidMount() {
    const { queryAssignInterviewList } = this.props;
    const arg0 = {
      currentPage: 1,
      pageSize: 10
    };
    queryAssignInterviewList(arg0);
  }
  render() {
    const { activeKye } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="personnel-interview">
        <Row className="personnel-search">
          <Col span={12} className="personnel-search-phone">
            <Search
              style={{ width: '30%', marginLeft: '16px' }}
              placeholder="输入电话号码查询"
              enterButton
            />
          </Col>
          <Col span={12} className="personnel-add">
            <Button
              style={{ marginRight: '20px' }}
              onClick={this.handleOpenAddModal.bind(this)}
              type="primary"
            >
              新增简历
            </Button>
          </Col>
        </Row>
        <Row className="personnel-check">
          <Form>
            <Col span={5}>
              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                label="简历状态"
                hasFeedback
              >
                {getFieldDecorator(
                  'resumeStatus',
                  {}
                )(
                  <Select
                    allowClear
                    // onChange={this.handleChangeBuDeptId.bind(this)}
                  >
                    {resumeStatusList.map(item => {
                      return (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                label="初面结果"
                hasFeedback
              >
                {getFieldDecorator(
                  'initialInterviewResult',
                  {}
                )(
                  <Select allowClear>
                    {initialInterviewResultList.map(item => {
                      return (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                label="终面结果"
                hasFeedback
              >
                {getFieldDecorator(
                  'finalInterviewResult',
                  {}
                )(
                  <Select allowClear>
                    {finalInterviewResultList.map(item => {
                      return (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                label="建议级别"
                hasFeedback
              >
                {getFieldDecorator('interviewLevel', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                style={{
                  width: '88px',
                  marginTop: '3px',
                  marginRight: '8%'
                }}
                // onClick={this.handleSearchList.bind(this)}
              >
                查询
              </Button>
            </Col>
          </Form>
        </Row>
        <Row className="personnel-content">
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
        <AddModal />
      </div>
    );
  }
}

export default Form.create()(PersonnelInformation);
