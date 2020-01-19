import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { actionCreators } from '../store';
import {
  resumeStatusList,
  initialInterviewResultList,
  finalInterviewResultList
} from '../../../utils/optionEnum';
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
    const { detailsVisible, detailsList } = this.props;
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
            destroyOnClose={true}
            className="personnel-details-modal"
            width="55%"
            onCancel={this.handleCancel}
            footer={<Button onClick={this.handleCancel}>取消</Button>}
          >
            <Form {...formItemLayout}>
              <h3 className="personnel-details-title">简历信息</h3>
              <Col span={12}>
                <Form.Item label="姓名" hasFeedback>
                  {getFieldDecorator('resumeUserName', {
                    initialValue: detailsList.resumeUserName
                      ? detailsList.resumeUserName
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号" hasFeedback>
                  {getFieldDecorator('resumeUserPhone', {
                    initialValue: detailsList.resumeUserPhone
                      ? detailsList.resumeUserPhone
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <h3 className="personnel-details-title">面试基本信息</h3>
              <Col span={12}>
                <Form.Item label="资源经理" hasFeedback>
                  {getFieldDecorator('resourceManagerUserName', {
                    initialValue: detailsList.resourceManagerUserName
                      ? detailsList.resourceManagerUserName
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历状态" hasFeedback>
                  {getFieldDecorator('resumeStatus', {
                    initialValue: detailsList.resumeStatus
                      ? resumeStatusList[detailsList.resumeStatus - 1].label
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="招聘级别" hasFeedback>
                  {getFieldDecorator('recruitmentLevel', {
                    initialValue: detailsList.recruitmentLevel
                      ? detailsList.recruitmentLevel
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历来源" hasFeedback>
                  {getFieldDecorator('resumeSource', {
                    initialValue: detailsList.resumeSource
                      ? detailsList.resumeSource
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="工作地点" hasFeedback>
                  {getFieldDecorator('workAddress', {
                    initialValue: detailsList.workAddress
                      ? detailsList.workAddress
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历分配时间" hasFeedback>
                  {getFieldDecorator('distributionTime', {
                    initialValue: detailsList.distributionTime
                      ? moment(detailsList.distributionTime).format(
                          'YYYY-MM-DD'
                        )
                      : null
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="面试完成时间 " hasFeedback>
                  {getFieldDecorator('interviewCompleteTime', {
                    initialValue: detailsList.interviewCompleteTime
                      ? moment(detailsList.interviewCompleteTime).format(
                          'YYYY-MM-DD'
                        )
                      : null
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="建议级别" hasFeedback>
                  {getFieldDecorator('interviewLevel', {
                    initialValue: detailsList.interviewLevel
                      ? detailsList.interviewLevel
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="初面结果" hasFeedback>
                  {getFieldDecorator('initialInterviewResult', {
                    initialValue: detailsList.initialInterviewResult
                      ? initialInterviewResultList[
                          detailsList.initialInterviewResult - 1
                        ].label
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="终面结果" hasFeedback>
                  {getFieldDecorator('finalInterviewResult', {
                    initialValue: detailsList.finalInterviewResult
                      ? finalInterviewResultList[
                          detailsList.finalInterviewResult - 1
                        ].label
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="职位类型" hasFeedback>
                  {getFieldDecorator('positionType', {
                    initialValue: detailsList.positionType
                      ? detailsList.positionType
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="项目名称" hasFeedback>
                  {getFieldDecorator('projectName', {
                    initialValue: detailsList.projectName
                      ? detailsList.projectName
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="面试官名字" hasFeedback>
                  {getFieldDecorator('interviewUserName', {
                    initialValue: detailsList.interviewUserName
                      ? detailsList.interviewUserName
                      : ''
                  })(<Input disabled={true} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="简历过期时间" hasFeedback>
                  {getFieldDecorator('expireTime', {
                    initialValue: detailsList.expireTime
                      ? moment(detailsList.expireTime).format('YYYY-MM-DD')
                      : null
                  })(<Input disabled={true} />)}
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
                    initialValue: detailsList.interviewComment
                      ? detailsList.interviewComment
                      : ''
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
