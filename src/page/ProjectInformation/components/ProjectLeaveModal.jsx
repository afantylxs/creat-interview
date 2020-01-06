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
          leaveProjReasonId: values.leaveProjReasonId,
          leaveProjType: values.leaveProjType
        };
        updateProjectRecordInfoById(arg0);
        console.log('arg0', arg0);
      }
    });
  };

  //关闭弹框刷新表单
  handleAfterClose = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { leaveProjList = [], leaveProjVisible } = this.props;
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
      <div>
        <Modal
          title="填写离职信息"
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
                    rules: [{ required: true, message: '不能为空' }]
                  })(
                    <DatePicker
                      showToday={false}
                      placeholder="请选择入项时间"
                    />
                  )}
                </Form.Item>
                <Form.Item label="阿里离项原因" hasFeedback>
                  {getFieldDecorator('leaveProjReasonId', {
                    rules: [{ required: true, message: '不能为空' }]
                  })(
                    <Select
                      allowClear
                      onFocus={this.handleFocusLeaveProj.bind(this)}
                    >
                      {leaveProjList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="阿里离项类型" hasFeedback>
                  {getFieldDecorator('leaveProjType', {
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
