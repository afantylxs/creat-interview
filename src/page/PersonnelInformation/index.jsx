import React, { Component } from 'react';
import {
  Row,
  Col,
  Tabs,
  message,
  Button,
  Input,
  Form,
  Select,
  Tooltip
} from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from './store';
import DistributionTable from './components/DistributionTable.jsx';
import InterviewTable from './components/InterviewTable.jsx';
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
      activeKye: 'distribution',
      searchValue: '',
      distriSearchValue: {},
      interviewSearchValue: {}
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

  //切换tab
  handleChangeTabs = key => {
    this.setState(
      {
        activeKye: key,
        searchValue: ''
      },
      () => {
        const {
          queryAssignInterviewList,
          queryInterviewList,
          changeCurrentPage
        } = this.props;
        switch (key) {
          case 'distribution':
            const arg0 = {
              currentPage: 1,
              pageSize: 10
            };
            queryAssignInterviewList(arg0);
            break;
          case 'interview':
            const arg1 = {
              currentPage: 1,
              pageSize: 10
            };
            queryInterviewList(arg1);
            break;
          default:
            break;
        }
        changeCurrentPage({
          interCurrentPage: 1,
          dispCurrentPage: 1
        });
      }
    );
    this.handleEmptyCheck();
  };

  //输入框搜索
  handleSearchInput = value => {
    const { activeKye } = this.state;
    const {
      queryAssignInterviewList,
      queryInterviewList,
      changeCurrentPage
    } = this.props;
    if (activeKye === 'distribution') {
      const arg0 = {
        currentPage: 1,
        pageSize: 10,
        resumeUserPhone: value
      };
      queryAssignInterviewList(arg0);
    }
    if (activeKye === 'interview') {
      const arg0 = {
        currentPage: 1,
        pageSize: 10,
        resumeUserPhone: value
      };
      queryInterviewList(arg0);
    }
    changeCurrentPage({
      interCurrentPage: 1,
      dispCurrentPage: 1
    });
    this.handleEmptyCheck();
  };

  //清空查询表单
  handleEmptyCheck = () => {
    this.props.form.setFieldsValue({
      resumeStatus: '',
      initialInterviewResult: '',
      finalInterviewResult: '',
      interviewLevel: ''
    });
  };

  //修改搜索框的值
  handleChangeSearchInput = value => {
    this.setState({
      searchValue: value.target.value
    });
  };

  //点击查询按钮
  handleSearchList = () => {
    this.props.form.validateFields((err, values) => {
      const { activeKye } = this.state;
      const {
        queryAssignInterviewList,
        queryInterviewList,
        changeCurrentPage
      } = this.props;
      if (activeKye === 'distribution') {
        const arg0 = {
          currentPage: 1,
          pageSize: 10,
          ...values
        };
        queryAssignInterviewList(arg0);
        this.setState({
          distriSearchValue: values
        });
      }
      if (activeKye === 'interview') {
        const arg0 = {
          currentPage: 1,
          pageSize: 10,
          ...values
        };
        queryInterviewList(arg0);
        this.setState({
          interviewSearchValue: values
        });
      }
      changeCurrentPage({
        interCurrentPage: 1,
        dispCurrentPage: 1
      });
    });

    this.setState({
      searchValue: ''
    });
  };

  handleGetDicInfo = key => {
    const { dictInfo } = this.props;
    dictInfo(key);
  };

  render() {
    const {
      activeKye,
      searchValue,
      distriSearchValue,
      interviewSearchValue
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { leveList } = this.props;
    return (
      <div className="personnel-interview">
        <Row className="personnel-search">
          <Col span={12} className="personnel-search-phone">
            <Search
              style={{ width: '30%', marginLeft: '16px' }}
              placeholder="输入电话号码查询"
              enterButton
              onChange={value => this.handleChangeSearchInput(value)}
              onSearch={value => this.handleSearchInput(value)}
              value={searchValue}
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
                  <Select allowClear>
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
                {getFieldDecorator(
                  'interviewLevel',
                  {}
                )(
                  <Select
                    onFocus={this.handleGetDicInfo.bind(
                      this,
                      'wutong_position_level'
                    )}
                  >
                    {leveList.map(item => {
                      return (
                        <Option key={item.id} value={item.label}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                )}
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
                onClick={this.handleSearchList.bind(this)}
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
              onChange={this.handleChangeTabs}
            >
              <TabPane tab="简历分配" key="distribution">
                <DistributionTable
                  distriSearchValue={distriSearchValue}
                  activeKye={activeKye}
                />
              </TabPane>
              <TabPane tab="简历面试" key="interview">
                <InterviewTable interviewSearchValue={interviewSearchValue} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <AddModal />
      </div>
    );
  }
}

export default Form.create()(PersonnelInformation);
