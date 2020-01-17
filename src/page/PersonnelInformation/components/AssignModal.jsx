import React, { Component } from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
const { Option } = Select;

@connect(state => state.personnel, actionCreators)
class AssignModal extends Component {
  //关闭弹窗

  handleCancel = () => {
    const { changeAssignModalVisible } = this.props;
    changeAssignModalVisible({
      assignModalVisible: false
    });
  };

  handleGetDicInfo = key => {
    const { dictInfo } = this.props;
    dictInfo(key);
  };
  render() {
    const {
      assignModalVisible,
      interviewerList = [],
      projectList = []
    } = this.props;
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
          title="简历分配"
          visible={assignModalVisible}
          onOk={this.handleEducationSubmit}
          onCancel={this.handleCancel}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            <Form.Item label="项目" hasFeedback>
              {getFieldDecorator(
                'projectId',
                {}
              )(
                <Select
                  onFocus={this.handleGetDicInfo.bind(this, 'project_list')}
                  placeholder="请选择项目"
                >
                  {projectList.map(item => {
                    return (
                      <Option key={item.key} value={item.key}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="面试官" hasFeedback>
              {getFieldDecorator(
                'interviewUserInfo',
                {}
              )(
                <Select placeholder="请选择面试官">
                  {interviewerList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.empName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="面试截止时间" hasFeedback>
              {getFieldDecorator(
                'interviewEndTimeFormat',
                {}
              )(<DatePicker placeholder="请选择截止时间" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(AssignModal);
