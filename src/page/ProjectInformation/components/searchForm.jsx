import React, { Component } from 'react';
import { Row, Input, Col, Button, Form, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actionCreators } from '../store';
import './searchForm.less';

const { Option } = Select;

@connect(state => state.project, actionCreators)
class SearchForm extends Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  //切换BU列表
  handleChangeBuDeptId = value => {
    const { deptInfo, changeDepList } = this.props;
    if (value) {
      const arg0 = {
        flag: 'bu',
        value
      };
      deptInfo(arg0);
      this.props.form.resetFields();
    } else {
      changeDepList([]);
    }
  };

  //获取一类岗位
  handleFocusFirstCategoryId = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_1');
  };

  //获取二类岗位
  handleFocusSecondCategoryId = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_2');
  };

  //获取三类岗位
  handleFocusThirdCategoryId = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_3');
  };

  //获取层级
  handleFocusaliGradeCode = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_level');
  };

  //获取工作城市
  handleFocusWorkCity = () => {
    const { dictInfo } = this.props;
    dictInfo('work_city');
  };

  //获取项目名称
  handleFocusProjectList = () => {
    const { dictInfo } = this.props;
    dictInfo('project_list');
  };

  //获取框架
  handleFocusIframe = () => {
    const { deptInfoIframe } = this.props;
    const arg0 = {
      value: '',
      flag: 'zero'
    };
    deptInfoIframe(arg0);
  };

  handleChangeIftame = (value, key) => {
    if (key) {
      const { deptInfo } = this.props;
      const arg0 = {
        value: key,
        flag: value
      };
      deptInfo(arg0);
    }
    if (!key) {
      const {
        changeCareerGroupId,
        changeCareerDeptId,
        changeGroupDeptId,
        changeDeptId
      } = this.props;
      changeCareerGroupId([]);
      changeCareerDeptId([]);
      changeGroupDeptId([]);
      changeDeptId([]);
      this.props.form.resetFields();
    }
  };

  handleSearchSubmit = () => {
    this.props.form.validateFields((err, values) => {
      const {
        changeSaveSearchSubmit,
        queryProjectRecordInfoList,
        changeCurrentPageData
      } = this.props;
      const arg0 = {
        currentPage: 1,
        pageSize: 10,
        aliNo: values.aliNo,
        ipsaBuDeptId: values.ipsaBuDeptId,
        ipsaDeptId: values.ipsaDeptId,
        projectId: values.projectId,
        joiningProjTimeFormat: values.joiningProjTimeFormat
          ? moment(values.joiningProjTimeFormat).format('YYYY-MM-DD')
          : '',
        firstCategoryId: values.firstCategoryId,
        secondCategoryId: values.secondCategoryId,
        thirdJobId: values.thirdJobId,
        aliGradeCode: values.aliGradeCode,
        techDirection: values.techDirection,
        aliFrameId: values.aliFrameId,
        careerGroupId: values.careerGroupId,
        groupDeptId: values.groupDeptId,
        careerDeptId: values.careerDeptId,
        deptId: values.deptId,
        projetDurationType: values.projetDurationType,
        projetType: values.projetType,
        iduFlag: values.iduFlag,
        tlFlag: values.tlFlag,
        workCity: values.workCity,
        workAddress: values.workAddress,
        resourceStatus: values.resourceStatus,
        backboneFlag: values.backboneFlag,
        chargeFlag: values.chargeFlag
      };
      changeSaveSearchSubmit(values);
      changeCurrentPageData(arg0);
      queryProjectRecordInfoList(arg0);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const that = this;
    const {
      buList,
      depList,
      currentPageData,
      firstCategoryidList,
      secondCategoryidList,
      thirdCategoryidList,
      aliGradeCodeList,
      workCityList,
      newProjectList,
      iframeList = [],
      careerGroupList = [],
      groupdeptList = [],
      careerdepList = [],
      deptIdList = [],
      handleSaveSearchThis
    } = this.props;
    handleSaveSearchThis(that);
    return (
      <div className="project-search-from">
        <Row>
          <Col span={22}>
            <Form>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="BU"
                  hasFeedback
                >
                  {getFieldDecorator('ipsaBuDeptId', {
                    initialValue: currentPageData.ipsaBuDeptId
                  })(
                    <Select
                      allowClear
                      onChange={this.handleChangeBuDeptId.bind(this)}
                    >
                      {buList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="部门"
                  hasFeedback
                >
                  {getFieldDecorator('ipsaDeptId', {
                    initialValue: currentPageData.ipsaDeptId
                  })(
                    <Select allowClear>
                      {depList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="阿里工号"
                  hasFeedback
                >
                  {getFieldDecorator('aliNo', {
                    initialValue: currentPageData.aliNo
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  label="入项时间"
                  hasFeedback
                >
                  {getFieldDecorator('joiningProjTimeFormat', {
                    initialValue: currentPageData.joiningProjTimeFormat
                      ? moment(currentPageData.joiningProjTimeFormat)
                      : null
                  })(
                    <DatePicker
                      showToday={false}
                      placeholder="请选择入项时间"
                      onChange={this.onChange.bind(this)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="一类岗位"
                  hasFeedback
                >
                  {getFieldDecorator('firstCategoryId', {
                    initialValue: currentPageData.firstCategoryId
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusFirstCategoryId.bind(this)}
                    >
                      {firstCategoryidList &&
                        firstCategoryidList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="二类岗位"
                  hasFeedback
                >
                  {getFieldDecorator('secondCategoryId', {
                    initialValue: currentPageData.secondCategoryId
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusSecondCategoryId.bind(this)}
                    >
                      {secondCategoryidList &&
                        secondCategoryidList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="三类岗位"
                  hasFeedback
                >
                  {getFieldDecorator('thirdJobId', {
                    initialValue: currentPageData.thirdJobId
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusThirdCategoryId.bind(this)}
                    >
                      {thirdCategoryidList &&
                        thirdCategoryidList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.label}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="层级"
                  hasFeedback
                >
                  {getFieldDecorator('aliGradeCode', {
                    initialValue: currentPageData.aliGradeCode
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusaliGradeCode.bind(this)}
                    >
                      {aliGradeCodeList &&
                        aliGradeCodeList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="框架"
                  hasFeedback
                >
                  {getFieldDecorator('aliFrameId', {
                    initialValue: currentPageData.ipsaBaliFrameIduDeptId
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusIframe.bind(this)}
                      onChange={this.handleChangeIftame.bind(
                        this,
                        'aliFrameId'
                      )}
                    >
                      {Array.isArray(iframeList) &&
                        iframeList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="事业群"
                  hasFeedback
                >
                  {getFieldDecorator('careerGroupId', {
                    initialValue: currentPageData.careerGroupId
                  })(
                    <Select
                      allowClear
                      onChange={this.handleChangeIftame.bind(
                        this,
                        'careerGroupId'
                      )}
                    >
                      {Array.isArray(careerGroupList) &&
                        careerGroupList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="事业群本部"
                  hasFeedback
                >
                  {getFieldDecorator('groupDeptId', {
                    initialValue: currentPageData.groupDeptId
                  })(
                    <Select
                      allowClear
                      onChange={this.handleChangeIftame.bind(
                        this,
                        'groupDeptId'
                      )}
                    >
                      {Array.isArray(groupdeptList) &&
                        groupdeptList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.label}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="事业部"
                  hasFeedback
                >
                  {getFieldDecorator('careerDeptId', {
                    initialValue: currentPageData.careerDeptId
                  })(
                    <Select
                      allowClear
                      onChange={this.handleChangeIftame.bind(
                        this,
                        'careerDeptId'
                      )}
                    >
                      {Array.isArray(careerdepList) &&
                        careerdepList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                  label="阿里部门"
                  hasFeedback
                >
                  {getFieldDecorator('deptId', {
                    initialValue: currentPageData.deptId
                  })(
                    <Select allowClear>
                      {Array.isArray(deptIdList) &&
                        deptIdList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="项目名称"
                  hasFeedback
                >
                  {getFieldDecorator('projectId', {
                    initialValue: currentPageData.projectId
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusProjectList.bind(this)}
                    >
                      {Array.isArray(newProjectList) &&
                        newProjectList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="项目类型"
                  hasFeedback
                >
                  {getFieldDecorator('projetType', {
                    initialValue: currentPageData.projetType
                  })(
                    <Select allowClear>
                      <Option value="0">EP</Option>
                      <Option value="1">TM</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="项目时长"
                  hasFeedback
                >
                  {getFieldDecorator('projetDurationType', {
                    initialValue: currentPageData.projetDurationType
                  })(
                    <Select allowClear>
                      <Option value="0">短期</Option>
                      <Option value="1">长期</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="是否IDU"
                  hasFeedback
                >
                  {getFieldDecorator('iduFlag', {
                    initialValue: currentPageData.iduFlag
                  })(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                  label="是否TL"
                  hasFeedback
                >
                  {getFieldDecorator('tlFlag', {
                    initialValue: currentPageData.tlFlag
                  })(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="工作城市"
                  hasFeedback
                  onFocus={this.handleFocusWorkCity.bind(this)}
                >
                  {getFieldDecorator('workCity', {
                    initialValue: currentPageData.workCity
                  })(
                    <Select allowClear>
                      {workCityList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
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
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="办公场地"
                  hasFeedback
                >
                  {getFieldDecorator('workAddress', {
                    initialValue: currentPageData.workAddress
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 15 }}
                  label="资源状态"
                  hasFeedback
                >
                  {getFieldDecorator('resourceStatus', {
                    initialValue: currentPageData.resourceStatus
                  })(
                    <Select allowClear>
                      <Option value="0">闲置</Option>
                      <Option value="1">在岗</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
                  label="是否骨干"
                  hasFeedback
                >
                  {getFieldDecorator('backboneFlag', {
                    initialValue: currentPageData.backboneFlag
                  })(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 10 }}
                  label="是否收费"
                  hasFeedback
                >
                  {getFieldDecorator('chargeFlag', {
                    initialValue: currentPageData.chargeFlag
                  })(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Form>
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              style={{
                marginTop: '3px',
                marginRight: '15%'
              }}
              onClick={this.handleSearchSubmit.bind(this)}
            >
              查询
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(SearchForm);
