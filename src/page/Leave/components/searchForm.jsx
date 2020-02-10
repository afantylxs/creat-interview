import React, { Component } from 'react';
import { Row, Col, Button, Form, Select, DatePicker } from 'antd';
import { leaveFormList } from '../../../utils/tableTitle.config.js';
const { Option } = Select;

const { WeekPicker, RangePicker } = DatePicker;
class SearchForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col span={22}>
            <Form>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="BU"
                  hasFeedback
                >
                  {getFieldDecorator(
                    'ipsaBuDeptId',
                    {}
                  )(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label="阿里离项时间"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 15 }}
                  hasFeedback
                >
                  {getFieldDecorator(
                    'leaveProjTimeFormat',
                    {}
                  )(<RangePicker placeholder={['起始日期', '结束日期']} />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="阿里离项原因"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                >
                  {getFieldDecorator('leaveProjReasonId')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="业务线反馈离职类型"
                  labelCol={{ span: 13 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                >
                  {getFieldDecorator('busOnlineFeedbackId')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="部门"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  hasFeedback
                >
                  {getFieldDecorator('bumen')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label="离职生效日期"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 15 }}
                  hasFeedback
                >
                  {getFieldDecorator('effectiveStartTimeFormat')(
                    <RangePicker placeholder={['起始日期', '结束日期']} />
                  )}
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="离职时状态"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                >
                  {getFieldDecorator('leaveOfficeStatus')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="业务线反馈离职分类"
                  labelCol={{ span: 13 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                >
                  {getFieldDecorator('busOnlineFeedbackType')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="HR一月后离职分类"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  hasFeedback
                >
                  {getFieldDecorator('hrOneMonthClass')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="HR一月后离职类型"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 13 }}
                  hasFeedback
                >
                  {getFieldDecorator('hrOneMonthType')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Form>
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              style={{
                marginTop: '3px',
                marginRight: '15%'
              }}
            >
              查询
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(SearchForm);
