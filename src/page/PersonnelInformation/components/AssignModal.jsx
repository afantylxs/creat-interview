import React, { Component } from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

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

  //分配提交
  handleAssignSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { assignInterview, selectedRowKeys } = this.props;
        const date = values.interviewEndTimeFormat
          ? moment(values.interviewEndTimeFormat).format('YYYY-MM-DD')
          : '';
        const arg0 = {
          ids: selectedRowKeys,
          userIds: values.userIds,
          projectId: values.projectId,
          interviewEndTimeFormat: date
        };
        assignInterview(arg0);
      }
    });
  };

  //设置禁选日期
  disabledDate = currentDate => {
    return currentDate && currentDate < moment().subtract(1, 'days');
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
          onOk={this.handleAssignSubmit}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            <Form.Item label="项目" hasFeedback>
              {getFieldDecorator('projectId', {
                rules: [{ required: true, message: '不能为空' }]
              })(
                <Select
                  onFocus={this.handleGetDicInfo.bind(this, 'project_list')}
                  placeholder="请选择项目"
                  showSearch
                  optionFilterProp="children"
                >
                  {projectList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="面试官" hasFeedback>
              {getFieldDecorator('userIds', {
                rules: [{ required: true, message: '不能为空' }]
              })(
                <Select
                  mode="multiple"
                  tokenSeparators={[',']}
                  placeholder="请选择面试官"
                >
                  {interviewerList.length &&
                    interviewerList.map(item => {
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
              {getFieldDecorator('interviewEndTimeFormat', {
                rules: [{ required: true, message: '不能为空' }]
              })(
                <DatePicker
                  showToday={false}
                  disabledDate={this.disabledDate}
                  placeholder="请选择截止时间"
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(AssignModal);
