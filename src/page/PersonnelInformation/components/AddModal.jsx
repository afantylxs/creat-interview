import React, { Component } from 'react';
import {
  Modal,
  Form,
  Select,
  Input,
  Row,
  Col,
  Upload,
  message,
  Icon,
  Button
} from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
import './AddModal.less';
const { Option } = Select;

@connect(state => state.personnel, actionCreators)
class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

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

  //提交
  handleAddSubmit = () => {
    this.props.form.validateFields((err, values) => {
      const { addInterview } = this.props;
      const { fileList } = this.state;
      let id = '';
      fileList.forEach(item => {
        if (item.response && item.response.data && item.response.data.fileId) {
          id = item.response.data.fileId;
        }
      });
      values.fileId = id;
      addInterview(values);
    });
  };

  //上传简历
  handleChangeFile = ({ file, fileList }) => {
    if (file && file.status === 'done' && file.response.success) {
      if (file.response.data) {
        if (fileList.length > 1) {
          fileList.splice(0, 1);
          this.setState({ fileList: [...fileList] });
        }
      } else {
        message.error(
          '上传图片失败' + file.response.message && file.response.message
        );
      }
    }
    if (file && file.status === 'done' && !file.response.success) {
      message.error(
        '上传图片失败' + file.response.message && file.response.message
      );
    }
    if (file && file.status === 'error' && file.error.status === 401) {
      message.error('上传失败，请重新登录');
    }
    this.setState({ fileList: [...fileList] });
  };

  //关闭回调
  afterClose = () => {
    this.setState({
      fileList: []
    });
  };

  render() {
    const {
      addModalvisible,
      resourceMangeList = [],
      ownerList = [],
      leveList = [],
      typeList = []
    } = this.props;
    const { fileList } = this.state;
    const token = localStorage.getItem('token');
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
          onOk={this.handleAddSubmit}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          afterClose={this.afterClose}
          className="personnel-add-modal"
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
                      <Option key={item.id} value={item.value}>
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
                  onFocus={this.handleGetDicInfo.bind(
                    this,
                    'wutong_position_level'
                  )}
                  placeholder="请选择招聘级别"
                >
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
                  onFocus={this.handleGetDicInfo.bind(
                    this,
                    'wutong_position_type'
                  )}
                  placeholder="请选择职位类型"
                >
                  {typeList.map(item => {
                    return (
                      <Option key={item.id} value={item.label}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Row>
              <Col style={{ marginRight: '10px', textAlign: 'right' }} span={6}>
                上传简历：
              </Col>
              <Col span={16}>
                <Upload
                  method="post"
                  headers={{
                    Authorization: 'Bearer ' + token
                  }}
                  listType="personnel-card"
                  className="personnel-add-uploader"
                  // beforeUpload={this.beforeUpload.bind(this)}
                  action="/api/file/uploadLocalStorageFile.json"
                  onChange={this.handleChangeFile.bind(this)}
                  fileList={fileList}
                >
                  <Icon type="upload" />{' '}
                  <span className="personnel-add-uploader-elect">选择文件</span>
                </Upload>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(AddModal);
