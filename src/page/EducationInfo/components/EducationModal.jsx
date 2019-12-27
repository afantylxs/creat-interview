import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Upload,
  Modal,
  Form,
  Icon,
  Input,
  Select,
  message
} from 'antd';
import './educModal.less';
import { actionCreators } from '../store';
import { educationList } from '../../../utils/tableTitle.config.js';
import {
  educationCodeEnum,
  uniformFlagEnum,
  httAddress
} from '../../../utils/optionEnum';
const { Option } = Select;

@connect(state => state.educ, actionCreators)
class EducationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgurl: '',
      fileId: ''
    };
  }
  handleCancel = () => {
    const { changeEducationVisible } = this.props;
    changeEducationVisible({
      educVisible: false,
      record: {}
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
    const { majorList } = this.props;
    if (key === 'majorCode') {
      return (
        <Select>
          {majorList.map(item => {
            //专业下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.label}
              </Option>
            );
          })}
        </Select>
      );
    }

    if (key === 'educationCode') {
      return (
        <Select>
          {educationCodeEnum.map(item => {
            //学位下拉列表
            return (
              <Option key={item.key} value={item.key}>
                {item.label}
              </Option>
            );
          })}
        </Select>
      );
    }

    if (key === 'uniformFlag') {
      return (
        <Select>
          {uniformFlagEnum.map(item => {
            //统招列表
            return (
              <Option key={item.key} value={item.key}>
                {item.label}
              </Option>
            );
          })}
        </Select>
      );
    }
    return <Input />;
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.educVisible) {
      this.props.form.resetFields();
    }
  }

  handleEducationSubmit = () => {
    this.props.form.validateFields((err, values) => {
      const { educRecord, fileId, updateEducationRecordInfoById } = this.props;
      if (!err) {
        const arg0 = {
          recruitmentUserId: educRecord.recruitmentUserId,
          majorCode: values.majorCode,
          recruitmentUserName: educRecord.recruitmentUserName,
          graduatedUniversities: values.graduatedUniversities,
          educationCode: values.educationCode,
          uniformFlag: values.uniformFlag,
          avatarIdPath: fileId,
          id: educRecord.id
        };
        updateEducationRecordInfoById(arg0);
      }
    });
  };

  //上传图片
  handleChangeFile = ({ file, fileList }) => {
    if (file && file.status === 'done' && file.response.success) {
      if (file.response.data) {
        const { changeEducationVisible, educRecord } = this.props;
        changeEducationVisible({
          educVisible: true,
          imageUrl: file.response.data.url,
          record: educRecord,
          fileId: file.response.data.fileId
        });
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
  };

  render() {
    const { educVisible, educRecord, imageUrl } = this.props;
    const { getFieldDecorator } = this.props.form;
    const token = localStorage.getItem('token');
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
                    initialValue: educRecord[item.dataIndex],
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
                  method="post"
                  headers={{
                    Authorization: 'Bearer ' + token
                  }}
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="/api/file/uploadFile.json"
                  onChange={this.handleChangeFile.bind(this)}
                >
                  {imageUrl ? '' : <Icon type={'plus'} />}
                  {imageUrl ? (
                    <img
                      src={httAddress + imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    'Upload'
                  )}
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
