import React, { Component } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
const { Option } = Select;
const { TextArea } = Input;

@connect(state => state.personnel, actionCreators)
class EditModal extends Component {
  //关闭弹窗

  handleCancel = () => {
    const { changeEditModalVisible } = this.props;
    changeEditModalVisible({
      editModalVisible: false
    });
  };
  render() {
    const { editModalVisible } = this.props;
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
      <div>
        <Modal
          title="更新面试结果"
          visible={editModalVisible}
          onOk={this.handleEducationSubmit}
          onCancel={this.handleCancel}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            <Form.Item label="建议级别" hasFeedback>
              {getFieldDecorator('interviewLevel', {})(<Input />)}
            </Form.Item>
            <Form.Item label="是否通过" hasFeedback>
              {getFieldDecorator(
                'initialInterviewResult',
                {}
              )(
                <Select placeholder="请选择">
                  <Option value={1}>通过</Option>
                  <Option value={2}>不通过</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="面试评价" hasFeedback>
              {getFieldDecorator(
                'interviewComment',
                {}
              )(<TextArea placeholder="请输入评价" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(EditModal);
