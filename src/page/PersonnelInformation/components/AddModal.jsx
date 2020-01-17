import React, { Component } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
const { Option } = Select;

@connect(state => state.personnel, actionCreators)
class AddModal extends Component {
  //关闭弹窗

  handleCancel = () => {
    const { changeAddModalVisible } = this.props;
    changeAddModalVisible({
      addModalvisible: false
    });
  };

  handleGetDicInfo = key => {
    const { dictInfo } = this.props;
    dictInfo(key);
  };
  render() {
    const {
      addModalvisible,
      resourceMangeList = [],
      ownerList = [],
      leveList = [],
      typeList = []
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
          title="新建简历"
          visible={addModalvisible}
          onOk={this.handleEducationSubmit}
          onCancel={this.handleCancel}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            <Form.Item label="姓名" hasFeedback>
              {getFieldDecorator('resumeUserName', {})(<Input />)}
            </Form.Item>
            <Form.Item label="电话" hasFeedback>
              {getFieldDecorator('resumeUserPhone', {})(<Input />)}
            </Form.Item>
            <Form.Item label="资源经理" hasFeedback>
              {getFieldDecorator(
                'resourceManagerId',
                {}
              )(
                <Select placeholder="请选择面试官">
                  {resourceMangeList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.empName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="简历来源" hasFeedback>
              {getFieldDecorator(
                'resumeSource',
                {}
              )(
                <Select
                  onFocus={this.handleGetDicInfo.bind(this, 'owner_range')}
                  placeholder="请选择简历来源"
                >
                  {ownerList.map(item => {
                    return (
                      <Option key={item.key} value={item.key}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="招聘级别" hasFeedback>
              {getFieldDecorator(
                'recruitmentLevel',
                {}
              )(
                <Select
                  onFocus={this.handleGetDicInfo.bind(this, 'position_level')}
                  placeholder="请选择招聘级别"
                >
                  {leveList.map(item => {
                    return (
                      <Option key={item.key} value={item.key}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="工作地点" hasFeedback>
              {getFieldDecorator(
                'workAddress',
                {}
              )(<Input placeholder="请输入工作地点" />)}
            </Form.Item>
            <Form.Item label="职位类型" hasFeedback>
              {getFieldDecorator(
                'positionType',
                {}
              )(
                <Select
                  onFocus={this.handleGetDicInfo.bind(this, 'position_type')}
                  placeholder="请选择职位类型"
                >
                  {typeList.map(item => {
                    return (
                      <Option key={item.key} value={item.key}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(AddModal);
