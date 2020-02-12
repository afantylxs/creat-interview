import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Modal,
  message
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { empPropertyEumn } from '../../../utils/optionEnum';
import { actionCreators } from '../store';
import fetch from '../../../utils/axios.config';

const { Option } = Select;
const { TextArea } = Input;

let timeout;
let currentValue;

function fetchs(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    fetch
      .get('/api/base/searchEmployeeBaseAndProjectInfo.json', {
        params: {
          keyword: currentValue
        }
      })
      .then(res => {
        if (res && res.success) {
          const { data, total } = res;
          const empNamedata = [];
          data.forEach(item => {
            empNamedata.push({
              value: item.empNo,
              label: item.empName,
              leaveProjTime: item.leaveProjTime,
              leaveProjReasonName: item.leaveProjReasonName,
              leaveProjType: item.leaveProjType
            });
          });
          callback(empNamedata);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

@connect(state => state.leave, actionCreators)
class EditLeaveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionData: [],
      leaveOptionData: [],
      searchNameValue: undefined,
      empNo: ''
    };
  }

  //关闭离职信息弹框
  handleCancel = () => {
    const { changeLeaveVisible } = this.props;
    changeLeaveVisible({
      leaveVisible: false,
      record: {}
    });
  };

  handleSearch = value => {
    if (value) {
      fetchs(value, data => this.setState({ optionData: data }));
    } else {
      this.setState({ optionData: [] });
    }
  };

  handleChange = value => {
    const { optionData } = this.state;
    let zeroValue = '';
    const secondValue = optionData.filter(item => item.value === value);
    const threeValue = secondValue.length ? secondValue[0].label : '';
    if (threeValue) {
      zeroValue = threeValue;
    }

    zeroValue = value;

    this.setState({ searchNameValue: zeroValue });
  };

  //调用下拉列表字典
  handleGetSelectOption = key => {
    const { dictInfo } = this.props;
    dictInfo(key);
  };

  //改变父级，查找子集
  handleChangeHrOneMonthClass = (key, value) => {
    const arg0 = {
      name: key,
      pid: value.key
    };
    const { dictInfoSon } = this.props;
    dictInfoSon(arg0);
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

  //选中添加这姓名
  handleSelictNameValue = value => {
    const { optionData } = this.state;
    this.setState({
      empNo: value
    });
    this.props.form.setFieldsValue({
      leaveProjTimeFormat: optionData.length
        ? moment(optionData[0].leaveProjTime).format('YYYY-MM-DD')
        : '',
      leaveProjReasonName: optionData.length
        ? optionData[0].leaveProjReasonName
        : '',
      leaveProjType: optionData.length ? optionData[0].leaveProjType : ''
    });
  };

  //新增提交
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      const { optionData } = this.state;
      const {
        updateEmployeeLeaveInfoById,
        saveEmployeeLeaveInfo,
        record
      } = this.props;
      const id = record.id;
      if (!id && !optionData.length) {
        message.error('必须选择增加人员姓名');
        return;
      }
      if (!err) {
        const arg0 = {
          ...values,
          leaveOfficeApplyTimeFormat: moment(
            values.leaveOfficeApplyTimeFormat
          ).format('YYYY-MM-DD'),
          effectiveTimeFormat: moment(values.effectiveTimeFormat).format(
            'YYYY-MM-DD'
          ),
          busOnlineFeedbackType: values.busOnlineFeedbackType
            ? values.busOnlineFeedbackType.key
            : '',
          busOnlineFeedbackId: values.busOnlineFeedbackId
            ? values.busOnlineFeedbackId.key
            : '',
          hrOneMonthClass: values.hrOneMonthClass
            ? values.hrOneMonthClass.key
            : '',
          hrOneMonthType: values.hrOneMonthType ? values.hrOneMonthType.key : ''
        };
        if (id) {
          arg0.id = id;
          updateEmployeeLeaveInfoById(arg0);
        }
        if (!id) {
          arg0.empNo = optionData.length ? optionData[0].value : '';
          saveEmployeeLeaveInfo(arg0);
        }
        console.log('arg0', arg0);
      }
    });
  };

  //关闭弹框刷新表单
  handleAfterClose = () => {
    this.setState({
      searchNameValue: ''
    });
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      leaveVisible,
      hrOneClassList = [],
      hrOneTypeList = [],
      busonlineTypeList = [],
      businessLeaveTypeList = [],
      ipsaLeaveReasonList = [],
      record
    } = this.props;
    const {
      busOnlineFeedbackType,
      busOnlineFeedbackId,
      hrOneMonthClass,
      hrOneMonthType,
      busOnlineFeedback,
      leaveOfficeApplyTime,
      effectiveTime,
      leaveReasonId,
      hrCommunicateReason,
      leaveOfficeStatus
    } = record;
    const { searchNameValue, optionData } = this.state;

    const searchOptions = optionData.map(d => (
      <Option key={d.value}>{d.label}</Option>
    ));

    return (
      <div className="edit-leave-modal">
        <Modal
          title="编辑离项信息"
          visible={leaveVisible}
          width="75%"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          afterClose={this.handleAfterClose}
          okText="提交"
          cancelText="取消"
        >
          <Row>
            <Col span={24}>
              <Form>
                {!record.id && (
                  <div>
                    <Col span={24}>
                      <span>查找姓名</span>
                    </Col>
                    <Col span={10}>
                      <Select
                        showSearch
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        value={searchNameValue}
                        onSearch={this.handleSearch}
                        onChange={this.handleChange}
                        notFoundContent={null}
                        onSelect={this.handleSelictNameValue.bind(this)}
                      >
                        {searchOptions}
                      </Select>
                    </Col>
                  </div>
                )}

                <Col span={24}>
                  <span>阿里离项原因</span>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 15 }}
                    label="阿里离项时间"
                    hasFeedback
                  >
                    {getFieldDecorator('leaveProjTimeFormat', {
                      initialValue: record.leaveProjTime
                        ? moment(record.leaveProjTime)
                        : null
                    })(<Input disabled={true} />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 15 }}
                    label="阿里离项原因"
                    hasFeedback
                  >
                    {getFieldDecorator('leaveProjReasonName', {
                      initialValue: record.leaveProjReasonName
                        ? record.leaveProjReasonName
                        : ''
                    })(<Input disabled={true} />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 15 }}
                    label="阿里离项类型"
                    hasFeedback
                  >
                    {getFieldDecorator('leaveProjType', {
                      initialValue: record.leaveProjReasonId
                        ? record.leaveProjReasonId
                        : ''
                    })(
                      <Select allowClear disabled={true}>
                        <Option value={0}>被动</Option>
                        <Option value={1}>主动</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <span>业务线反馈离职原因</span>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 15 }}
                    label="业务线反馈离职原因"
                    hasFeedback
                  >
                    {getFieldDecorator('busOnlineFeedback', {
                      initialValue: busOnlineFeedback ? busOnlineFeedback : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(<TextArea />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 15 }}
                    label="业务线反馈离职分类"
                    hasFeedback
                  >
                    {getFieldDecorator('busOnlineFeedbackType', {
                      initialValue: busOnlineFeedbackType
                        ? busOnlineFeedbackType
                        : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(
                      <Select
                        labelInValue
                        onFocus={this.handleGetSelectOption.bind(
                          this,
                          'business_leave_category'
                        )}
                        onChange={this.handleChangeHrOneMonthClass.bind(
                          this,
                          'business_leave_type'
                        )}
                      >
                        {busonlineTypeList.map(item => (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 15 }}
                    label="业务线反馈离职类型"
                    hasFeedback
                  >
                    {getFieldDecorator('busOnlineFeedbackId', {
                      initialValue: busOnlineFeedbackId
                        ? busOnlineFeedbackId
                        : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(
                      <Select labelInValue>
                        {businessLeaveTypeList.map(item => (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <span>离职信息</span>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 19 }}
                    label="离职提出时间"
                    hasFeedback
                  >
                    {getFieldDecorator('leaveOfficeApplyTimeFormat', {
                      initialValue: leaveOfficeApplyTime
                        ? moment(leaveOfficeApplyTime)
                        : null,
                      rules: [{ required: true, message: '不能为空' }]
                    })(<DatePicker />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 19 }}
                    label="离职生效时间"
                    hasFeedback
                  >
                    {getFieldDecorator('effectiveTimeFormat', {
                      initialValue: effectiveTime
                        ? moment(effectiveTime)
                        : null,
                      rules: [{ required: true, message: '不能为空' }]
                    })(<DatePicker />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                    label="离职时状态"
                    hasFeedback
                  >
                    {getFieldDecorator('leaveOfficeStatus', {
                      initialValue: leaveOfficeStatus
                        ? Number(leaveOfficeStatus)
                        : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(
                      <Select>
                        {empPropertyEumn.map(item => (
                          <Option key={item.id}>{item.name}</Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                    label="IPSA离职原因"
                    hasFeedback
                  >
                    {getFieldDecorator('leaveReasonId', {
                      initialValue: leaveReasonId ? leaveReasonId : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(
                      <Select
                        onFocus={this.handleGetSelectOption.bind(
                          this,
                          'ipsa_leave_reason'
                        )}
                      >
                        {ipsaLeaveReasonList.map(item => (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 13 }}
                    wrapperCol={{ span: 16 }}
                    label="HR一月后离职分类"
                    hasFeedback
                  >
                    {getFieldDecorator('hrOneMonthClass', {
                      initialValue: hrOneMonthType ? hrOneMonthType : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(
                      <Select
                        onFocus={this.handleGetSelectOption.bind(
                          this,
                          'hr_leave_category'
                        )}
                        onChange={this.handleChangeHrOneMonthClass.bind(
                          this,
                          'hr_leave_type'
                        )}
                        labelInValue
                      >
                        {hrOneClassList.map(item => (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 13 }}
                    wrapperCol={{ span: 16 }}
                    label="HR一个月后离职类型"
                    hasFeedback
                  >
                    {getFieldDecorator('hrOneMonthType', {
                      initialValue: hrOneMonthClass ? hrOneMonthClass : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(
                      <Select labelInValue>
                        {hrOneTypeList.map(item => (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 15 }}
                    wrapperCol={{ span: 16 }}
                    label="HR一个月后沟通离职原因"
                    hasFeedback
                  >
                    {getFieldDecorator('hrCommunicateReason', {
                      initialValue: hrCommunicateReason
                        ? hrCommunicateReason
                        : '',
                      rules: [{ required: true, message: '不能为空' }]
                    })(<TextArea />)}
                  </Form.Item>
                </Col>
              </Form>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(EditLeaveModal);
