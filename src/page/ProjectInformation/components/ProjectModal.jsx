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
        const arg0 = {
          aliNo: values.aliNo,
          projectName: values.projectName,
          projectId: values.projectId,
          managerId: '',
          managerName: '',
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
          businessLine: values.businessLine,
          projetDurationType: values.projetDurationType,
          projetType: values.projetType,
          iduFlag: values.iduFlag,
          tlFlag: values.tlFlag,
          workCity: values.workCity,
          workAddress: values.workAddress,
          resourceStatus: values.resourceStatus,
          backboneFlag: values.backboneFlag,
          chargeFlag: values.chargeFlag,
          leaveProjReasonId: values.leaveProjReasonId,
          leaveProjType: values.leaveProjType
        };
        console.log('values', values, 'arg0------', arg0);
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

  render() {
    const {
      projectVisible,
      firstCategoryidList,
      secondCategoryidList,
      thirdCategoryidList,
      aliGradeCodeList,
      workCityList
    } = this.props;
    const { shortTime } = this.state;
    console.log('shortTime', shortTime === '0');

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
                  {getFieldDecorator('aliNo')(<Input />)}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="入项时间" hasFeedback>
                  {getFieldDecorator('joiningProjTimeFormat')(
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
                  {getFieldDecorator('firstCategoryId')(
                    <Select
                      allowClear
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
                  {getFieldDecorator('secondCategoryId')(
                    <Select
                      allowClear
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
                  {getFieldDecorator('thirdJobId')(
                    <Select
                      allowClear
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
                  {getFieldDecorator('aliGradeCode')(
                    <Select
                      allowClear
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
                  {getFieldDecorator('techDirection')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="框架" hasFeedback>
                  {getFieldDecorator('aliFrameId')(
                    <Select allowClear>
                      <Option value="jack">财务及内控</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="事业群" hasFeedback>
                  {getFieldDecorator('careerGroupId')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="事业部" hasFeedback>
                  {getFieldDecorator('careerDeptId')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="阿里部门" hasFeedback>
                  {getFieldDecorator('deptId')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="项目名称" hasFeedback>
                  {getFieldDecorator('xmmc')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="业务线名称" hasFeedback>
                  {getFieldDecorator('businessLine')(
                    <Select allowClear>
                      <Option value="jack">财务及内控</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="项目类型" hasFeedback>
                  {getFieldDecorator('projetType')(
                    <Select allowClear>
                      <Option value="0">EP</Option>
                      <Option value="1">TM</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col>
                <Form.Item label="项目时长" hasFeedback>
                  {getFieldDecorator('projetDurationType')(
                    <Select allowClear onChange={this.handleChangeprojetType}>
                      <Option value="0">短期</Option>
                      <Option value="1">长期</Option>
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
                  {getFieldDecorator('iduFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="是否TL" hasFeedback>
                  {getFieldDecorator('tlFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
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
                  {getFieldDecorator('workCity')(
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
                  {getFieldDecorator('workAddress')(<Input />)}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="资源状态" hasFeedback>
                  {getFieldDecorator('resourceStatus')(
                    <Select allowClear>
                      <Option value="0">闲置</Option>
                      <Option value="1">在岗</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="是否骨干" hasFeedback>
                  {getFieldDecorator('backboneFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="是否收费" hasFeedback>
                  {getFieldDecorator('chargeFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
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
