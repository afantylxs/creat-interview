import React, { Component } from 'react';
import { Row, Col, Button, Form, Select, DatePicker, Modal } from 'antd';

const { Option } = Select;
class EditLeaveModal extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="编辑离项信息"
          visible={true}
          //   onOk={this.handleOk}
          //   onCancel={this.handleCancel}
          //   afterClose={this.handleAfterClose}
          okText="提交"
          cancelText="取消"
        >
          <Row>
            <Col span={}>
              <span>阿里离项原因</span>
            </Col>
            <Col span={24}>
              <Form>
                <Col span={5}>
                  <Form.Item
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 15 }}
                    label="阿里离项时间"
                    hasFeedback
                  >
                    {getFieldDecorator(
                      'leaveProjTimeFormat',
                      {}
                    )(<DatePicker />)}
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
