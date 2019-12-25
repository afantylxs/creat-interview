import React, { Component } from 'react';
import { Row, Col, Button, Table, Form, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import EducationModal from './components/EducationModal.jsx';
const { Search } = Input;
const { Option } = Select;

const data = [
  {
    id: '1',
    empName: '新员工',
    ipsaBuDeptId: 32,
    ipsaDeptId: '蚂蚁实施部',
    empNo: 111,
    raduatedUniversities: '软通大学',
    majorCode: 'web前端',
    educationCode: '高中',
    uniformFlag: '否'
  }
];
@connect(state => state.educ, actionCreators)
class EducationInfo extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'BU',
        dataIndex: 'ipsaBuDeptId',
        width: '15%'
      },
      {
        title: '部门',
        dataIndex: 'ipsaDeptId',
        width: '15%'
      },
      {
        title: '姓名',
        dataIndex: 'empName',
        width: '10%'
      },
      {
        title: '软通工号',
        dataIndex: 'empNo',
        width: '10%'
      },
      {
        title: '毕业学校',
        dataIndex: 'raduatedUniversities',
        width: '15%'
      },
      {
        title: '专业',
        dataIndex: 'majorCode',
        width: '15%'
      },
      {
        title: '学历',
        dataIndex: 'educationCode',
        width: '6%'
      },
      {
        title: '是否统招本科',
        dataIndex: 'uniformFlag',
        width: '9%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '5%',
        render: (text, record) => {
          return (
            <Button onClick={this.handleShowModal.bind(this)}>编辑</Button>
          );
        }
      }
    ];
  }
  handleShowModal = () => {
    const { changeEducationVisible } = this.props;
    changeEducationVisible({
      educVisible: true
    });
  };
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
        sm: { span: 14 }
      }
    };
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
                <Col span={4}>
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
                <Col span={4}>
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
                </Col>
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
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={data}
            />
          </Col>
        </Row>
        <EducationModal />
      </div>
    );
  }
}

export default Form.create()(EducationInfo);
