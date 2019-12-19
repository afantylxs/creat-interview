import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Form, Select, Input } from 'antd';
import BasicModal from './components/BasicModal.jsx';
import { actionCreators } from './store';
import { reminderColumns } from '../../utils/tableTitle.config';
const { Search } = Input;
const { Option } = Select;
@connect(state => state.basic, actionCreators)
class BasicInformation extends Component {
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
        title: '性别',
        dataIndex: 'gender',
        width: '150px',
        render: (text, record) => {
          switch (text) {
            case 0:
              return <span>男</span>;
            case 1:
              return <span>女</span>;

            default:
              break;
          }
        }
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        width: '150px'
      },
      {
        title: '入职日期',
        dataIndex: 'joiningDay',
        width: '150px'
      },
      {
        title: '转正日期',
        dataIndex: 'correctionTime',
        width: '150px'
      },
      {
        title: '通用职位',
        dataIndex: 'ipsaPostNo',
        width: '150px'
      },
      {
        title: 'Grade代码',
        dataIndex: 'ipsaGradeCode',
        width: '150px'
      },
      {
        title: '是否在职',
        dataIndex: 'onJob',
        width: '150px'
      },
      {
        title: '人员性质',
        dataIndex: 'empProperty',
        width: '150px',
        render: (text, record) => {
          switch (text) {
            case 0:
              return <span>正式员工</span>;
            case 1:
              return <span>试用期</span>;
            case 2:
              return <span>实习期</span>;
            case 3:
              return <span>兼职员工</span>;

            default:
              break;
          }
        }
      },
      {
        title: '直属上级',
        dataIndex: 'directSuperiorName',
        width: '150px'
      },
      {
        title: '交付经理',
        dataIndex: 'deliveryManagerName',
        width: '150px'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                const { changeBasicVisible } = this.props;
                changeBasicVisible({
                  basicVisible: true,
                  record
                });
              }}
            >
              编辑
            </Button>
          );
        }
      }
    ];
  }

  componentDidMount() {
    const { queryEmployeeBaseInfoList, deptInfoBu } = this.props;
    queryEmployeeBaseInfoList();
    deptInfoBu();
  }
  handleShowModel = () => {
    const { changeBasicVisible } = this.props;
    changeBasicVisible({
      basicVisible: true,
      record: {}
    });
  };
  render() {
    const columns = this.columns;
    const { basicList } = this.props;
    const { getFieldDecorator } = this.props.form;
    console.log('basicList', this.props);

    // const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    return (
      <div className="basic-information">
        <Row style={{ padding: '30px' }}>
          <Col span={24}>
            <Row>
              <Col span={4}>
                <Button
                  style={{ marginLeft: '30px' }}
                  onClick={this.handleShowModel.bind(this)}
                >
                  + 新增
                </Button>
              </Col>
              <Col span={8}>
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
                <Col span={6}>
                  <Form.Item label="性别" hasFeedback>
                    {getFieldDecorator('sex')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="入职日期" hasFeedback>
                    {getFieldDecorator('entry')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="人员性质" hasFeedback>
                    {getFieldDecorator('xinzhi')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    style={{ marginTop: '3px', marginLeft: '5%' }}
                  >
                    查询
                  </Button>
                </Col>
              </Form>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={basicList}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Row>
        <BasicModal />
      </div>
    );
  }
}
export default Form.create()(BasicInformation);
