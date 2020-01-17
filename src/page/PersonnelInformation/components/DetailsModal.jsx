import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
import './detailsModal.less';
const { TextArea } = Input;

@connect(state => state.personnel, actionCreators)
class DetailsModal extends Component {
  handleCancel = () => {
    const { changeDetailsModalVisible } = this.props;
    changeDetailsModalVisible({
      detailsVisible: false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailsVisible } = this.props;
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
        <Row>
          <Modal
            title="详情"
            visible={detailsVisible}
            onOk={this.handleEducationSubmit}
            className="personnel-details-modal"
            width="55%"
            onCancel={this.handleCancel}
            footer={<Button onClick={this.handleCancel}>取消</Button>}
          >
            <Form {...formItemLayout}>
              <h3 className="personnel-details-title">简历信息</h3>
              <Col span={12}>
                <Form.Item label="姓名" hasFeedback>
                  {getFieldDecorator('name', {})(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号" hasFeedback>
                  {getFieldDecorator('phone', {})(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <h3 className="personnel-details-title">面试基本信息</h3>
              <Col span={12}>
                <Form.Item label="资源经理" hasFeedback>
                  {getFieldDecorator(
                    'resourceManagerUserName',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历状态" hasFeedback>
                  {getFieldDecorator(
                    'resumeStatus',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="招聘级别" hasFeedback>
                  {getFieldDecorator(
                    'recruitmentLevel',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历来源" hasFeedback>
                  {getFieldDecorator(
                    'resumeSource',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="工作地点" hasFeedback>
                  {getFieldDecorator(
                    'workAddress',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历分配时间" hasFeedback>
                  {getFieldDecorator(
                    'distributionTime',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="面试完成时间 " hasFeedback>
                  {getFieldDecorator(
                    'interviewComment',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="建议级别" hasFeedback>
                  {getFieldDecorator(
                    'interviewLevel',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="初面结果" hasFeedback>
                  {getFieldDecorator(
                    'initialInterviewResult',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="终面结果" hasFeedback>
                  {getFieldDecorator(
                    'finalInterviewResult',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="职位类型" hasFeedback>
                  {getFieldDecorator(
                    'positionType',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="项目名称" hasFeedback>
                  {getFieldDecorator(
                    'projectName',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="面试官名字" hasFeedback>
                  {getFieldDecorator(
                    'interviewUserName',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历过期时间" hasFeedback>
                  {getFieldDecorator(
                    'expireTime',
                    {}
                  )(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <h3 className="personnel-details-title">面试评价信息</h3>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 20 }}
                  label="面试评价"
                  hasFeedback
                >
                  {getFieldDecorator('interviewComment', {
                    initialValue: '11111'
                  })(
                    <TextArea
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      disabled={true}
                    />
                  )}
                </Form.Item>
              </Col>
            </Form>
          </Modal>
        </Row>
      </div>
    );
  }
}

export default Form.create()(DetailsModal);
