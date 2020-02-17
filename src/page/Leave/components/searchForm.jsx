import React, { Component } from 'react';
import { Row, Col, Button, Form, Select, DatePicker, Tooltip } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { empPropertyEumn } from '../../../utils/optionEnum';
import { actionCreators } from '../store';
const { Option } = Select;

const { WeekPicker, RangePicker } = DatePicker;

@connect(state => state.leave, actionCreators)
class SearchForm extends Component {
  handleGetBu = () => {
    const { deptInfoBu } = this.props;
    deptInfoBu();
  };

  //部门列表
  handleChangeBuDeptId = value => {
    const { deptInfo } = this.props;
    if (value) {
      deptInfo(value);
    }
    this.props.form.setFieldsValue({
      ipsaDeptId: ''
    });
  };

  //调用下拉列表字典
  handleGetSelectOption = key => {
    if (key) {
      const { dictInfo } = this.props;
      dictInfo(key);
    }
  };

  //改变父级，查找子集
  handleChangeHrOneMonthClass = (key, value) => {
    if (value && key) {
      const arg0 = {
        name: key,
        pid: value.key
      };
      const { dictInfoSon } = this.props;
      dictInfoSon(arg0);
    }
    if (key === 'hr_leave_type') {
      this.props.form.setFieldsValue({
        hrOneMonthType: ''
      });
    }

    if (key === 'business_leave_type') {
      this.props.form.setFieldsValue({
        busOnlineFeedbackId: ''
      });
    }
  };

  //获取离项原因
  handleFocusLeaveProj = () => {
    const { dictInfo } = this.props;
    dictInfo('leave_proj_reason');
  };

  //点击查询按钮
  handleClickSearch = () => {
    this.props.form.validateFields((err, values) => {
      const { queryEmployeeLeaveInfoList, changeCurrentPageData } = this.props;
      const leaveProjStartTimeFormat =
        values.leaveProjTimeFormat && values.leaveProjTimeFormat.length
          ? moment(values.leaveProjTimeFormat[0]).format('YYYY-MM-DD')
          : '';
      const leaveProjEndTimeFormat =
        values.leaveProjTimeFormat && values.leaveProjTimeFormat.length
          ? moment(values.leaveProjTimeFormat[1]).format('YYYY-MM-DD')
          : '';
      const effectiveStartTimeFormat =
        values.effectiveStartTimeFormat &&
        values.effectiveStartTimeFormat.length
          ? moment(values.effectiveStartTimeFormat[0]).format('YYYY-MM-DD')
          : '';
      const effectiveEndTimeFormat =
        values.effectiveStartTimeFormat &&
        values.effectiveStartTimeFormat.length
          ? moment(values.effectiveStartTimeFormat[1]).format('YYYY-MM-DD')
          : '';
      const arg0 = {
        ...values,
        effectiveStartTimeFormat,
        effectiveEndTimeFormat,
        leaveProjStartTimeFormat,
        leaveProjEndTimeFormat,
        currentPage: 1,
        pageSize: 10,
        keyword: ''
      };
      changeCurrentPageData(arg0);
      queryEmployeeLeaveInfoList(arg0);
    });
  };

  //修改时间
  handleChangeLeaveProjectPicker = value => {
    if (value && !value.length) {
      this.props.form.setFieldsValue({
        leaveProjTimeFormat: undefined
      });
    }
  };

  render() {
    const that = this;
    const { getFieldDecorator } = this.props.form;
    const {
      buList = [],
      depList = [],
      busonlineTypeList = [],
      businessLeaveTypeList = [],
      hrOneTypeList = [],
      hrOneClassList = [],
      leaveProjList = [],
      ipsaLeaveReasonList = [],
      handleSaveSearchThis
    } = this.props;
    handleSaveSearchThis(that);
    return (
      <div>
        <Row>
          <Col span={22}>
            <Form>
              <Col span={6}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="BU"
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator(
                    'ipsaBuDeptId',
                    {}
                  )(
                    <Select
                      onFocus={this.handleGetBu.bind(this)}
                      onChange={this.handleChangeBuDeptId.bind(this)}
                      allowClear
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

              <Col span={7}>
                <Form.Item
                  label="阿里离项时间"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 15 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator(
                    'leaveProjTimeFormat',
                    {}
                  )(
                    <RangePicker
                      onChange={this.handleChangeLeaveProjectPicker}
                      placeholder={['起始日期', '结束日期']}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="阿里离项原因"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('leaveProjReasonId')(
                    <Select
                      allowClear
                      onFocus={this.handleFocusLeaveProj.bind(this)}
                    >
                      {leaveProjList.map(item => {
                        return (
                          <Option
                            title={item.label}
                            key={item.value}
                            value={item.value}
                          >
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
                  label="业务线反馈离职分类"
                  labelCol={{ span: 13 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('busOnlineFeedbackType')(
                    <Select
                      onFocus={this.handleGetSelectOption.bind(
                        this,
                        'business_leave_category'
                      )}
                      onChange={this.handleChangeHrOneMonthClass.bind(
                        this,
                        'business_leave_type'
                      )}
                      allowClear
                    >
                      {busonlineTypeList.map(item => (
                        <Option
                          title={item.label}
                          key={item.id}
                          value={item.id}
                        >
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="部门"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('ipsaDeptId')(
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

              <Col span={7}>
                <Form.Item
                  label="离职生效日期"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 15 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('effectiveStartTimeFormat')(
                    <RangePicker placeholder={['起始日期', '结束日期']} />
                  )}
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="离职时状态"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('leaveOfficeStatus')(
                    <Select allowClear>
                      {empPropertyEumn.map(item => (
                        <Option key={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="业务线反馈离职类型"
                  labelCol={{ span: 13 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('busOnlineFeedbackId')(
                    <Select allowClear>
                      {businessLeaveTypeList &&
                        businessLeaveTypeList.map(item => (
                          <Option
                            title={item.label}
                            key={item.id}
                            value={item.id}
                          >
                            {item.label}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="HR一个月后离职分类"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('hrOneMonthClass')(
                    <Select
                      onFocus={this.handleGetSelectOption.bind(
                        this,
                        'hr_leave_category'
                      )}
                      onChange={this.handleChangeHrOneMonthClass.bind(
                        this,
                        'hr_leave_type'
                      )}
                      allowClear
                    >
                      {hrOneClassList.map(item => (
                        <Option
                          title={item.label}
                          key={item.id}
                          value={item.id}
                        >
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label="HR一个月后离职类型"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 13 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('hrOneMonthType')(
                    <Select allowClear>
                      {hrOneTypeList &&
                        hrOneTypeList.map(item => (
                          <Option
                            title={item.label}
                            key={item.id}
                            value={item.id}
                          >
                            {item.label}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label="IPSA离职原因"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                  hasFeedback
                  validateStatus=""
                >
                  {getFieldDecorator('leaveReasonId')(
                    <Select
                      allowClear
                      onFocus={this.handleGetSelectOption.bind(
                        this,
                        'ipsa_leave_reason'
                      )}
                    >
                      {ipsaLeaveReasonList.map(item => (
                        <Option
                          title={item.label}
                          key={item.id}
                          value={item.id}
                        >
                          {item.label}
                        </Option>
                      ))}
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
              onClick={this.handleClickSearch.bind(this)}
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
