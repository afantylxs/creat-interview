import React, { Component } from 'react';
import { Row, Col, Button, Select, Modal, Form, DatePicker, Input } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actionCreators } from '../store';

const { Option } = Select;

@connect(state => state.project, actionCreators)
class ProjectLeaveModal extends Component {
  //获取离项原因
  handleFocusLeaveProj = () => {
    const { dictInfo } = this.props;
    dictInfo('leave_proj_reason');
  };

  handleCancel = () => {
    const { changeLeaveProjVisible } = this.props;
    changeLeaveProjVisible({
      leaveProjVisible: false,
      record: {}
    });
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { leaveProjRecord, updateProjectRecordInfoById } = this.props;
        const arg0 = {
          id: leaveProjRecord.id,
          leaveProjTimeFormat: values.leaveProjTimeFormat
            ? moment(values.leaveProjTimeFormat).format('YYYY-MM-DD')
            : '',
          leaveProjReasonId: values.leaveProjReasonId.key,
          leaveProjType: values.leaveProjType
        };
        updateProjectRecordInfoById(arg0);
      }
    });
  };

  //关闭弹框刷新表单
  handleAfterClose = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      leaveProjList = [],
      leaveProjVisible,
      leaveProjRecord
    } = this.props;
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
    const { leaveProjTime, leaveProjReasonId, leaveProjType } = leaveProjRecord;
    return (
      <div>
        <Modal
          title="填写离项信息"
          visible={leaveProjVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          afterClose={this.handleAfterClose}
          okText="提交"
          cancelText="取消"
        >
          <Row>
            <Col>
              <Form
                {...formItemLayout}
                onSubmit={this.handleSubmit}
                className="project-form"
              >
                <Form.Item label="阿里离项时间" hasFeedback>
                  {getFieldDecorator('leaveProjTimeFormat', {
                    initialValue: leaveProjTime ? moment(leaveProjTime) : null,
                    rules: [{ required: true, message: '不能为空' }]
                  })(
                    <DatePicker
                      showToday={false}
                      placeholder="请选择离项时间"
                    />
                  )}
                </Form.Item>
                <Form.Item label="阿里离项原因" hasFeedback>
                  {getFieldDecorator('leaveProjReasonId', {
                    initialValue:
                      leaveProjReasonId && leaveProjReasonId.key
                        ? leaveProjReasonId
                        : '',
                    rules: [{ required: true, message: '不能为空' }]
                  })(
                    <Select
                      labelInValue
                      onFocus={this.handleFocusLeaveProj.bind(this)}
                    >
                      {leaveProjList.map(item => {
                        return (
                          <Option key={item.value} value={item.value}>
                            {item.label}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="阿里离项类型" hasFeedback>
                  {getFieldDecorator('leaveProjType', {
                    initialValue:
                      leaveProjType || leaveProjType === 0 ? leaveProjType : '',
                    rules: [{ required: true, message: '不能为空' }]
                  })(
                    <Select allowClear>
                      <Option value={0}>被动</Option>
                      <Option value={1}>主动</Option>
                    </Select>
                  )}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(ProjectLeaveModal);
