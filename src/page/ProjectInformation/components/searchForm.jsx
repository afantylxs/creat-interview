import React, { Component } from 'react';
import { Row, Input, Col, Button, Form, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actionCreators } from '../store';
import './searchForm.less';

const { Option } = Select;

@connect(state => state.project, actionCreators)
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aliFrameIdValue: '',
      careerGroupIdValue: '',
      groupDeptIdValue: '',
      careerDeptIdValue: '',
      deptIdValue: '',
      ipsaBuDeptIdValue: '',
      ipsaDeptIdValue: '',
      aliNoValue: '',
      firstCategoryIdValue: '',
      secondCategoryIdValue: '',
      thirdJobIdValue: '',
      aliGradeCodeValue: '',
      projectIdValue: '',
      projetTypeValue: '',
      projetDurationTypeValue: '',
      iduFlagValue: '',
      tlFlagValue: '',
      workCityValue: '',
      workAddressValue: '',
      resourceStatusValue: '',
      backboneFlagValue: '',
      chargeFlagValue: '',
      joiningProjTimeFormatValue: '',
      businessLineValue: ''
    };
  }

  //切换BU列表
  handleChangeBuDeptId = value => {
    const { deptInfo, changeDepList } = this.props;
    if (value) {
      this.setState({
        ipsaBuDeptIdValue: value,
        ipsaDeptIdValue: ''
      });
      const arg0 = {
        flag: 'bu',
        value
      };
      deptInfo(arg0);
    } else {
      this.setState({
        ipsaDeptIdValue: ''
      });
      changeDepList([]);
    }
    this.props.form.resetFields();
  };

  handleChangeBuMenDeptId = value => {
    this.setState({
      ipsaDeptIdValue: value
    });
  };

  //获取一类岗位
  handleFocusFirstCategoryId = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_1');
  };

  //选择二，三类岗位
  handleChangeCategroy = (activeKey, value) => {
    const {
      deptInfoName,
      changeFocusSecondCategoryId,
      changeFocusThirdCategoryId
    } = this.props;
    if (value) {
      const arg0 = {
        activeKey,
        pid: value
      };
      deptInfoName(arg0);
    }

    if (activeKey === 'job_class_2' && !value) {
      this.props.form.setFieldsValue({
        secondCategoryId: '',
        thirdJobId: ''
      });
      changeFocusSecondCategoryId([]);
      changeFocusThirdCategoryId([]);
    }
    if (activeKey === 'job_class_3' && !value) {
      this.props.form.setFieldsValue({
        thirdJobId: ''
      });
      changeFocusThirdCategoryId([]);
    }
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

  //获取产品线
  handleFocusProductLine = () => {
    const { dictInfo } = this.props;
    dictInfo('product_line');
  };

  handleChangeIftame = (value, key) => {
    const {
      changeCareerGroupId,
      changeCareerDeptId,
      changeGroupDeptId,
      changeDeptId
    } = this.props;

    //保存查询条件选择的值，在做联动操作时逐级清空操作
    if (key) {
      const { deptInfo } = this.props;
      const arg0 = {
        value: key,
        flag: value
      };
      if (value === 'aliFrameId') {
        this.setState({
          aliFrameIdValue: key,
          careerGroupIdValue: '',
          groupDeptIdValue: '',
          careerDeptIdValue: '',
          deptIdValue: ''
        });
        changeCareerDeptId([]);
        changeGroupDeptId([]);
        changeDeptId([]);
      }

      if (value === 'careerGroupId') {
        this.setState({
          careerGroupIdValue: key,
          groupDeptIdValue: '',
          careerDeptIdValue: '',
          deptIdValue: ''
        });
        changeGroupDeptId([]);
        changeDeptId([]);
      }

      if (value === 'groupDeptId') {
        this.setState({
          groupDeptIdValue: key,
          careerDeptIdValue: '',
          deptIdValue: ''
        });
        changeDeptId([]);
      }

      if (value === 'careerDeptId') {
        this.setState({
          careerDeptIdValue: key,
          deptIdValue: ''
        });
      }

      if (value === 'deptId') {
        this.setState({
          deptIdValue: key
        });
      }
      deptInfo(arg0);
    }
    if (!key) {
      if (value === 'aliFrameId') {
        this.setState({
          careerGroupIdValue: '',
          groupDeptIdValue: '',
          careerDeptIdValue: '',
          deptIdValue: ''
        });
        changeCareerGroupId([]);
        changeCareerDeptId([]);
        changeGroupDeptId([]);
        changeDeptId([]);
      }

      if (value === 'careerGroupId') {
        this.setState({
          groupDeptIdValue: '',
          careerDeptIdValue: '',
          deptIdValue: ''
        });
        changeCareerDeptId([]);
        changeGroupDeptId([]);
        changeDeptId([]);
      }

      if (value === 'groupDeptId') {
        this.setState({
          careerDeptIdValue: '',
          deptIdValue: ''
        });
        changeCareerDeptId([]);
        changeDeptId([]);
      }

      if (value === 'careerDeptId') {
        this.setState({
          deptIdValue: ''
        });
        changeDeptId([]);
      }
    }
    this.props.form.resetFields();
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
        chargeFlag: values.chargeFlag,
        businessLine: values.businessLine,
        productLine: values.productLine
      };
      changeSaveSearchSubmit(values);
      changeCurrentPageData(arg0);
      queryProjectRecordInfoList(arg0);
      localStorage.setItem('statusFlag', '');
    });
  };

  //保存查询框输入值
  handleAllInputChange = (value, key) => {
    if (value === 'aliNo') {
      this.setState({
        aliNoValue: key.target.value
      });
    }

    if (value === 'joiningProjTimeFormat') {
      console.log('value', moment(key).format('YYYY-MM-DD'));

      this.setState({
        joiningProjTimeFormatValue: key ? moment(key).format('YYYY-MM-DD') : ''
      });
    }

    if (value === 'firstCategoryId') {
      this.setState({
        firstCategoryIdValue: key
      });
    }

    if (value === 'secondCategoryId') {
      this.setState({
        secondCategoryIdValue: key
      });
    }

    if (value === 'thirdJobId') {
      this.setState({
        thirdJobIdValue: key
      });
    }

    if (value === 'aliGradeCode') {
      this.setState({
        aliGradeCodeValue: key
      });
    }

    if (value === 'projectId') {
      this.setState({
        projectIdValue: key
      });
    }

    if (value === 'projetType') {
      this.setState({
        projetTypeValue: key
      });
    }

    if (value === 'projetDurationType') {
      this.setState({
        projetDurationTypeValue: key
      });
    }

    if (value === 'iduFlag') {
      this.setState({
        iduFlagValue: key
      });
    }

    if (value === 'tlFlag') {
      this.setState({
        tlFlagValue: key
      });
    }

    if (value === 'workCity') {
      this.setState({
        workCityValue: key
      });
    }

    if (value === 'workAddress') {
      this.setState({
        workAddressValue: key.target.value
      });
    }

    if (value === 'resourceStatus') {
      this.setState({
        resourceStatusValue: key
      });
    }

    if (value === 'backboneFlag') {
      this.setState({
        backboneFlagValue: key
      });
    }

    if (value === 'chargeFlag') {
      this.setState({
        chargeFlagValue: key
      });
    }

    if (value === 'businessLine') {
      this.setState({
        businessLineValue: key.target.value
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPageData && nextProps.currentPageData.keyword) {
      this.setState({
        aliFrameIdValue: '',
        careerGroupIdValue: '',
        groupDeptIdValue: '',
        careerDeptIdValue: '',
        deptIdValue: '',
        ipsaBuDeptIdValue: '',
        ipsaDeptIdValue: '',
        aliNoValue: '',
        firstCategoryIdValue: '',
        secondCategoryIdValue: '',
        thirdJobIdValue: '',
        aliGradeCodeValue: '',
        projectIdValue: '',
        projetTypeValue: '',
        projetDurationTypeValue: '',
        iduFlagValue: '',
        tlFlagValue: '',
        workCityValue: '',
        workAddressValue: '',
        resourceStatusValue: '',
        backboneFlagValue: '',
        chargeFlagValue: '',
        joiningProjTimeFormatValue: '',
        businessLineValue: ''
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      aliFrameIdValue,
      careerGroupIdValue,
      groupDeptIdValue,
      careerDeptIdValue,
      deptIdValue,
      ipsaBuDeptIdValue,
      ipsaDeptIdValue,
      aliNoValue = '',
      joiningProjTimeFormatValue,
      firstCategoryIdValue = '',
      secondCategoryIdValue = '',
      thirdJobIdValue = '',
      aliGradeCodeValue = '',
      projectIdValue = '',
      projetTypeValue = '',
      projetDurationTypeValue = '',
      iduFlagValue = '',
      tlFlagValue = '',
      workCityValue = '',
      workAddressValue = '',
      resourceStatusValue = '',
      backboneFlagValue = '',
      chargeFlagValue = '',
      businessLineValue = ''
    } = this.state;
    const that = this;
    const {
      buList,
      depList,
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
      handleSaveSearchThis,
      productLineList = []
    } = this.props;

    handleSaveSearchThis(that);
    return (
      <div className="project-search-from">
        <Row>
          <Col span={22}>
            <Form>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="BU"
                  hasFeedback
                >
                  {getFieldDecorator('ipsaBuDeptId', {
                    initialValue: ipsaBuDeptIdValue
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
                    initialValue: ipsaDeptIdValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleChangeBuMenDeptId.bind(this)}
                    >
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
                    initialValue: aliNoValue
                  })(
                    <Input
                      onChange={this.handleAllInputChange.bind(this, 'aliNo')}
                    />
                  )}
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
                    initialValue: joiningProjTimeFormatValue
                      ? moment(joiningProjTimeFormatValue)
                      : null
                  })(
                    <DatePicker
                      showToday={false}
                      placeholder="请选择入项时间"
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'joiningProjTimeFormat'
                      )}
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
                    initialValue: firstCategoryIdValue
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusFirstCategoryId.bind(this)}
                      onChange={this.handleChangeCategroy.bind(
                        this,
                        'job_class_2'
                      )}
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
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="二类岗位"
                  hasFeedback
                >
                  {getFieldDecorator('secondCategoryId', {
                    initialValue: secondCategoryIdValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleChangeCategroy.bind(
                        this,
                        'job_class_3'
                      )}
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
                    initialValue: thirdJobIdValue
                  })(
                    <Select allowClear>
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
                    initialValue: aliGradeCodeValue
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusaliGradeCode.bind(this)}
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'aliGradeCode'
                      )}
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
                    initialValue: aliFrameIdValue
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
                    initialValue: careerGroupIdValue
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
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="事业群本部"
                  hasFeedback
                >
                  {getFieldDecorator('groupDeptId', {
                    initialValue: groupDeptIdValue
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
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="事业部"
                  hasFeedback
                >
                  {getFieldDecorator('careerDeptId', {
                    initialValue: careerDeptIdValue
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
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 14 }}
                  label="阿里部门"
                  hasFeedback
                >
                  {getFieldDecorator('deptId', {
                    initialValue: deptIdValue
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
                    initialValue: projectIdValue
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusProjectList.bind(this)}
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'projectId'
                      )}
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
                    initialValue: projetTypeValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'projetType'
                      )}
                    >
                      <Option value="0">FP</Option>
                      <Option value="1">TM</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="项目时长"
                  hasFeedback
                >
                  {getFieldDecorator('projetDurationType', {
                    initialValue: projetDurationTypeValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'projetDurationType'
                      )}
                    >
                      <Option value="0">短期</Option>
                      <Option value="1">长期</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 10 }}
                  label="是否IDU"
                  hasFeedback
                >
                  {getFieldDecorator('iduFlag', {
                    initialValue: iduFlagValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(this, 'iduFlag')}
                    >
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 14 }}
                  label="是否TL"
                  hasFeedback
                >
                  {getFieldDecorator('tlFlag', {
                    initialValue: tlFlagValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(this, 'tlFlag')}
                    >
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
                    initialValue: workCityValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'workCity'
                      )}
                    >
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
                    initialValue: workAddressValue
                  })(
                    <Input
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'workAddress'
                      )}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="资源状态"
                  hasFeedback
                >
                  {getFieldDecorator('resourceStatus', {
                    initialValue: resourceStatusValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'resourceStatus'
                      )}
                    >
                      <Option value="0">闲置</Option>
                      <Option value="1">在岗</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 10 }}
                  label="是否骨干"
                  hasFeedback
                >
                  {getFieldDecorator('backboneFlag', {
                    initialValue: backboneFlagValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'backboneFlag'
                      )}
                    >
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
                  label="是否收费"
                  hasFeedback
                >
                  {getFieldDecorator('chargeFlag', {
                    initialValue: chargeFlagValue
                  })(
                    <Select
                      allowClear
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'chargeFlag'
                      )}
                    >
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
                  label="业务线名称"
                  hasFeedback
                >
                  {getFieldDecorator('businessLine', {
                    initialValue: businessLineValue
                  })(
                    <Input
                      onChange={this.handleAllInputChange.bind(
                        this,
                        'businessLine'
                      )}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="产品线"
                  hasFeedback
                >
                  {getFieldDecorator(
                    'productLine',
                    {}
                  )(
                    <Select onFocus={this.handleFocusProductLine.bind(this)}>
                      {Array.isArray(productLineList) &&
                        productLineList.map(item => {
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
