import React, { Component } from 'react';
import { Row, Col, Button, Table, Form, Select, Input } from 'antd';
import { leaveFormList } from '../../../utils/tableTitle.config.js';
const { Option } = Select;
const searchListNo = [
  'name',
  'empNo',
  'onepost',
  'twopost',
  'frame',
  'businessunit',
  'projecttype'
];
class SearchForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    return (
      <div>
        <Row style={{ marginRight: '30px' }}>
          <Form {...formItemLayout}>
            {leaveFormList.map(item => {
              if (!searchListNo.includes(item.dataIndex)) {
                return (
                  <Col key={item.dataIndex} span={6}>
                    <Form.Item label={item.title} hasFeedback>
                      {getFieldDecorator(item.dataIndex)(
                        <Select>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="tom">Tom</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                );
              }
            })}

            {/* <Col span={4}>
              <Form.Item label="部门" hasFeedback>
                {getFieldDecorator('bumen')(
                  <Select>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="学历" hasFeedback>
                {getFieldDecorator('sex')(
                  <Select>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="是否统招本科" hasFeedback>
                {getFieldDecorator('entry')(
                  <Select>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col> */}
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                style={{
                  marginTop: '3px',
                  marginLeft: '5%',
                  marginRight: '30px'
                }}
              >
                查询
              </Button>
            </Col>
          </Form>
        </Row>
      </div>
    );
  }
}

export default Form.create()(SearchForm);
