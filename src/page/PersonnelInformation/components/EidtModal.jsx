import React, { Component } from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { connect } from 'react-redux';

import fetch from '../../../utils/axios.config';
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

  handleEditSubmit = () => {
    const { updataId, queryInterviewList, changeEditModalVisible } = this.props;
    this.props.form.validateFields((err, values) => {
      values.id = updataId;
      fetch
        .post('/api/interview/updateInterviewResultById.json', values)
        .then(res => {
          if (res && res.success) {
            const arg1 = {
              currentPage: 1,
              pageSize: 10
            };
            message.success('编辑成功');
            queryInterviewList(arg1);
            changeEditModalVisible({
              editModalVisible: false
            });
          } else {
            message.error('编辑失败：' + res.message);
          }
        })
        .catch(err => {
          if (err && err.data && err.data.message) {
            message.error('编辑失败：' + err.data.message);
          } else {
            message.error('编辑失败');
          }
        });
    });
  };
  render() {
    const { editModalVisible, leveList = [] } = this.props;
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
          onOk={this.handleEditSubmit}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            <Form.Item label="建议级别" hasFeedback>
              {getFieldDecorator(
                'interviewLevel',
                {}
              )(
                <Select placeholder="请选择">
                  {leveList.map(item => {
                    return (
                      <Option key={item.id} value={item.label}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
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
