import React, { Component } from 'react';
import { Row, Col, Button, Table, Form, Select, Input } from 'antd';
import { connect } from 'react-redux';
// import { actionCreators } from '../BasicInformation/store';
const { Search } = Input;
const { Option } = Select;

const data = [
  {
    key: '1',
    empName: 'John Brown',
    ipsaBuDeptId: 32,
    ipsaDeptId: 'New York No. 1 Lake Park',
    empNo: 111
  }
];
// @connect(state => state.basic, actionCreators)
class Department extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'empName',
        width: '150px'
      },
      {
        title: 'BU',
        dataIndex: 'ipsaBuDeptId',
        width: '150px'
      },
      {
        title: '部门',
        dataIndex: 'ipsaDeptId',
        width: '150px'
      },
      {
        title: '软通工号',
        dataIndex: 'empNo',
        width: '150px'
      },
      {
        title: '调整后一类岗位',
        dataIndex: 'w',
        width: '150px'
      },
      {
        title: '调整后二类岗位',
        dataIndex: 'e',
        width: '150px'
      },
      {
        title: '调整后三类岗位',
        dataIndex: 'r',
        width: '150px'
      },
      {
        title: '调岗生效时间',
        dataIndex: 't',
        width: '150px'
      },
      {
        title: '调整后层级',
        dataIndex: 'y',
        width: '150px'
      },
      {
        title: '调级生效时间',
        dataIndex: 'u',
        width: '150px'
      },
      {
        title: '调整后职位',
        dataIndex: 'i',
        width: '150px'
      },
      {
        title: '调整后职级',
        dataIndex: 'o',
        width: '150px'
      },
      {
        title: '调职调级生效时间',
        dataIndex: 'p',
        width: '150px'
      },
      {
        title: '调整后部门',
        dataIndex: 'a',
        width: '150px'
      },
      {
        title: '部门调整生效时间',
        dataIndex: 's',
        width: '150px'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        render: (text, record) => {
          return <Button>编辑</Button>;
        }
      }
    ];
  }
  render() {
    const columns = this.columns;
    const { basicList } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    console.log('basicList', basicList);

    return (
      <div>
        <Row style={{ padding: '30px' }}>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Search
                  style={{ width: '50%' }}
                  placeholder="输入姓名或软通工号"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button style={{ marginRight: '40px' }} type="primary">
                  导入
                </Button>
                <Button style={{ marginRight: '30px' }} type="primary">
                  导出
                </Button>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <Row>
              <Form {...formItemLayout}>
                <Col span={6}>
                  <Form.Item label="BU" hasFeedback>
                    {getFieldDecorator('confirm')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
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
                <Col span={8}>
                  <Form.Item label="生效时间" hasFeedback>
                    {getFieldDecorator('sex')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                {/* <Col span={8}>
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
          </Col>
          <Col span={24}>
            <Table columns={columns} dataSource={data} scroll={{ x: '100%' }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Department);
