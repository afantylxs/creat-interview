import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, Select, Modal, Form, DatePicker, Input } from 'antd';
import './projectModal.less';
import { actionCreators } from '../store';
const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(state => state.project, actionCreators)
class ProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortTime: null
    };
  }
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
    console.log('key', key);

    if (key) {
      const { deptInfo } = this.props;
      const arg0 = {
        value: key.key,
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

  handleCancel = () => {
    const { changeProjectVisible } = this.props;
    changeProjectVisible({
      projectVisible: false,
      record: {}
    });
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { projectRecord, updateProjectRecordInfoById } = this.props;
        const projectStartTimeFormat = values.shortTime
          ? moment(values.shortTime[0]).format('YYYY-MM-DD')
          : '';
        const projectEndTimeFormat = values.shortTime
          ? moment(values.shortTime[1]).format('YYYY-MM-DD')
          : '';

        const reg = /[\u4e00-\u9fa5]/g;
        const level = values.aliGradeCode.label
          ? values.aliGradeCode.label.match(reg).join('')
          : '';
        const arg0 = {
          id: projectRecord.id,
          aliNo: values.aliNo,
          projectName: values.projectId.label,
          projectId: values.projectId.key,
          joiningProjTimeFormat: values.joiningProjTimeFormat
            ? moment(values.joiningProjTimeFormat).format('YYYY-MM-DD')
            : '',
          managerId: projectRecord.managerId,
          managerName: projectRecord.managerName,
          firstCategoryId: values.firstCategoryId.key,
          secondCategoryId: values.secondCategoryId.key,
          thirdJobId: values.thirdJobId.key,
          aliGradeCode: values.aliGradeCode.key,
          techDirection: values.techDirection,
          aliFrameId: values.aliFrameId.key,
          careerGroupId: values.careerGroupId.key,
          groupDeptId: values.groupDeptId.key,
          careerDeptId: values.careerDeptId.key,
          deptId: values.deptId.key,
          businessLine:
            values.iduFlag === 1
              ? 'IDU-' + values.careerDeptId.label
              : values.careerDeptId.label,
          projetDurationType: values.projetDurationType,
          projetType: values.projetType,
          iduFlag: values.iduFlag,
          tlFlag: values.tlFlag,
          workCity: values.workCity,
          workAddress: values.workAddress,
          resourceStatus: values.resourceStatus,
          backboneFlag: level === '资深' || level === '专家' ? 1 : 0,
          chargeFlag: values.chargeFlag,
          leaveProjReasonId: values.leaveProjReasonId,
          leaveProjType: values.leaveProjType,
          projectStartTimeFormat,
          projectEndTimeFormat
        };
        console.log('arg0', arg0);

        updateProjectRecordInfoById(arg0);
      }
    });
  };

  //选择项目时长
  handleChangeprojetType = value => {
    console.log('value', value);
    this.setState({
      shortTime: value
    });
  };

  //关闭弹框刷新表单
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  render() {
    const {
      projectVisible,
      firstCategoryidList,
      secondCategoryidList,
      thirdCategoryidList,
      aliGradeCodeList,
      workCityList,
      newProjectList = [],
      iframeList = [],
      careerGroupList = [],
      groupdeptList = [],
      careerdepList = [],
      deptIdList = [],
      projectRecord
    } = this.props;
    const { shortTime } = this.state;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div className="project-modal">
        <Modal
          title="编辑项目信息"
          visible={projectVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          afterClose={this.handleAfterClose}
          className="project-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Row>
            <Form
              {...formItemLayout}
              onSubmit={this.handleSubmit}
              className="project-form"
            >
              <Col>
                <Form.Item label="阿里工号" hasFeedback>
                  {getFieldDecorator('aliNo', {
                    initialValue: projectRecord.aliNo ? projectRecord.aliNo : ''
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="入项时间" hasFeedback>
                  {getFieldDecorator('joiningProjTimeFormat', {
                    initialValue: projectRecord.joiningProjTime
                      ? moment(projectRecord.joiningProjTime)
                      : null
                  })(
                    <DatePicker
                      showToday={false}
                      placeholder="请选择入项时间"
                      // onChange={this.onChange.bind(this)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="一类岗位" hasFeedback>
                  {getFieldDecorator('firstCategoryId', {
                    initialValue: projectRecord.firstCategoryId
                      ? projectRecord.firstCategoryId
                      : {}
                  })(
                    <Select
                      allowClear
                      labelInValue
                      onFocus={this.handleFocusFirstCategoryId.bind(this)}
                    >
                      {firstCategoryidList.map(item => {
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
              <Col>
                <Form.Item label="二类岗位" hasFeedback>
                  {getFieldDecorator('secondCategoryId', {
                    initialValue: projectRecord.secondCategoryId
                      ? projectRecord.secondCategoryId
                      : {}
                  })(
                    <Select
                      allowClear
                      labelInValue
                      onFocus={this.handleFocusSecondCategoryId.bind(this)}
                    >
                      {secondCategoryidList.map(item => {
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
              <Col>
                <Form.Item label="三类岗位" hasFeedback>
                  {getFieldDecorator('thirdJobId', {
                    initialValue: projectRecord.thirdJobId
                      ? projectRecord.thirdJobId
                      : {}
                  })(
                    <Select
                      allowClear
                      labelInValue
                      onFocus={this.handleFocusThirdCategoryId.bind(this)}
                    >
                      {thirdCategoryidList.map(item => {
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
              <Col>
                <Form.Item label="层级" hasFeedback>
                  {getFieldDecorator('aliGradeCode', {
                    initialValue: projectRecord.aliGradeCode
                      ? projectRecord.aliGradeCode
                      : {}
                  })(
                    <Select
                      allowClear
                      labelInValue
                      onFocus={this.handleFocusaliGradeCode.bind(this)}
                    >
                      {aliGradeCodeList.map(item => {
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
              <Col>
                <Form.Item label="技术方向" hasFeedback>
                  {getFieldDecorator('techDirection', {
                    initialValue: projectRecord.techDirection
                      ? projectRecord.techDirection
                      : ''
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="框架" hasFeedback>
                  {getFieldDecorator('aliFrameId', {
                    initialValue: projectRecord.aliFrameId
                      ? projectRecord.aliFrameId
                      : {}
                  })(
                    <Select
                      labelInValue
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
              <Col>
                <Form.Item label="事业群" hasFeedback>
                  {getFieldDecorator('careerGroupId', {
                    initialValue: projectRecord.careerGroupId
                      ? projectRecord.careerGroupId
                      : {}
                  })(
                    <Select
                      labelInValue
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
              <Col>
                <Form.Item label="事业群本部" hasFeedback>
                  {getFieldDecorator('groupDeptId', {
                    initialValue: projectRecord.groupDeptId
                      ? projectRecord.groupDeptId
                      : {}
                  })(
                    <Select
                      labelInValue
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
              <Col>
                <Form.Item label="事业部" hasFeedback>
                  {getFieldDecorator('careerDeptId', {
                    initialValue: projectRecord.careerDeptId
                      ? projectRecord.careerDeptId
                      : {}
                  })(
                    <Select
                      labelInValue
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
              <Col>
                <Form.Item label="阿里部门" hasFeedback>
                  {getFieldDecorator('deptId', {
                    initialValue: projectRecord.deptId
                      ? projectRecord.deptId
                      : {}
                  })(
                    <Select labelInValue>
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
              <Col>
                <Form.Item label="项目名称" hasFeedback>
                  {getFieldDecorator('projectId', {
                    initialValue: projectRecord.projectId
                      ? projectRecord.projectId
                      : {}
                  })(
                    <Select
                      labelInValue
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

              <Col>
                <Form.Item label="项目类型" hasFeedback>
                  {getFieldDecorator('projetType', {
                    initialValue: projectRecord.projetType
                      ? projectRecord.projetType
                      : ''
                  })(
                    <Select allowClear>
                      <Option value={0}>FP</Option>
                      <Option value={1}>TM</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col>
                <Form.Item label="项目时长" hasFeedback>
                  {getFieldDecorator('projetDurationType', {
                    initialValue: projectRecord.projetDurationType
                      ? projectRecord.projetDurationType
                      : ''
                  })(
                    <Select allowClear onChange={this.handleChangeprojetType}>
                      <Option value={0}>短期</Option>
                      <Option value={1}>长期</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              {shortTime === '0' ? (
                <Col>
                  <Form.Item label="短期起始" hasFeedback>
                    {getFieldDecorator('shortTime')(
                      <RangePicker
                        placeholder={['起始日期', '结束日期']}
                        ranges={{
                          当天: [moment(), moment()],
                          本月: [
                            moment().startOf('month'),
                            moment().endOf('month')
                          ]
                        }}
                      />
                    )}
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              <Col>
                <Form.Item label="是否IDU" hasFeedback>
                  {getFieldDecorator('iduFlag', {
                    initialValue: projectRecord.iduFlag
                      ? projectRecord.iduFlag
                      : ''
                  })(
                    <Select allowClear>
                      <Option value={0}>否</Option>
                      <Option value={1}>是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="是否TL" hasFeedback>
                  {getFieldDecorator('tlFlag', {
                    initialValue: projectRecord.tlFlag
                      ? projectRecord.tlFlag
                      : ''
                  })(
                    <Select allowClear>
                      <Option value={0}>否</Option>
                      <Option value={1}>是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="工作城市"
                  hasFeedback
                  onFocus={this.handleFocusWorkCity.bind(this)}
                >
                  {getFieldDecorator('workCity', {
                    initialValue: projectRecord.workCity
                      ? projectRecord.workCity
                      : ''
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
              <Col>
                <Form.Item label="办公场地" hasFeedback>
                  {getFieldDecorator('workAddress', {
                    initialValue: projectRecord.workAddress
                      ? projectRecord.workAddress
                      : ''
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="资源状态" hasFeedback>
                  {getFieldDecorator('resourceStatus', {
                    initialValue: projectRecord.resourceStatus
                      ? projectRecord.resourceStatus
                      : ''
                  })(
                    <Select allowClear>
                      <Option value={0}>闲置</Option>
                      <Option value={1}>在岗</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="是否收费" hasFeedback>
                  {getFieldDecorator('chargeFlag', {
                    initialValue: projectRecord.chargeFlag
                      ? projectRecord.chargeFlag
                      : ''
                  })(
                    <Select allowClear>
                      <Option value={0}>否</Option>
                      <Option value={1}>是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Form>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ProjectModal);
