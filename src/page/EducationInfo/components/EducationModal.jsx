import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Upload, Modal, Form, Icon, Input } from 'antd';
import './educModal.less';
import { actionCreators } from '../store';
import { educationList } from '../../../utils/tableTitle.config.js';

@connect(state => state.educ, actionCreators)
class EducationModal extends Component {
  handleCancel = () => {
    const { changeEducationVisible } = this.props;
    changeEducationVisible({
      educVisible: false
    });
  };

  // 对输入框进行校验
  basicFormRules = key => {
    if (key === 'deliver') {
      return [{ required: true, message: '不能为空' }];
    }
    return [];
  };

  // 根据不同的信息渲染不同的输入框
  baseFormInput = key => {
    return <Input />;
  };

  handleEducationSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('提');
      }
    });
  };

  render() {
    const { educVisible } = this.props;
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
      <div className="basic-modal">
        <Modal
          title="修改学历信息"
          visible={educVisible}
          onOk={this.handleEducationSubmit}
          onCancel={this.handleCancel}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form
            {...formItemLayout}
            onSubmit={this.handleEducationSubmit}
            className="basic-form"
          >
            {educationList.map((item, index) => {
              return (
                <Form.Item label={item.title} key={item.dataIndex}>
                  {getFieldDecorator(item.dataIndex, {
                    rules: this.basicFormRules(item.dataIndex)
                  })(this.baseFormInput(item.dataIndex))}
                </Form.Item>
              );
            })}
            <Row>
              <Col style={{ marginRight: '10px', textAlign: 'right' }} span={6}>
                证据：
              </Col>
              <Col span={16}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <Icon type={'plus'} />
                  <div className="ant-upload-text">Upload</div>
                </Upload>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(EducationModal);
