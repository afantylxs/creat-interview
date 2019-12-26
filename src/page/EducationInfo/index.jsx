import React, { Component } from 'react';
import { Row, Col, Button, Table, Form, Select, Input, Pagination } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import EducationModal from './components/EducationModal.jsx';
import { uniformFlagEnum, educationCodeEnum } from '../../utils/optionEnum';
import './index.less';
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
            <span
              className="educ-action-span"
              onClick={this.handleShowModal.bind(this)}
            >
              编辑
            </span>
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

  componentDidMount() {
    const { deptInfoBu } = this.props;
    deptInfoBu();
  }

  //
  handleChangeBuDeptId = value => {
    const { deptInfo, changeDepList } = this.props;
    if (value) {
      deptInfo(value);
    } else {
      changeDepList([]);
    }
  };

  render() {
    const columns = this.columns;
    const { buList, depList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="education-info">
        <Row style={{ padding: '30px' }}>
          <Col className="educ-operator-set" span={24}>
            <Row>
              <Col span={8}>
                <Search
                  className="educ-seatch-input"
                  placeholder="输入姓名或软通工号"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <Button style={{ marginRight: '7%' }} type="primary">
                  导入
                </Button>
                <Button style={{ marginRight: '2%' }} type="primary">
                  导出
                </Button>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <Row>
              <Form>
                <Col span={5}>
                  <Form.Item
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 16 }}
                    label="BU"
                    hasFeedback
                  >
                    {getFieldDecorator('confirm')(
                      <Select
                        allowClear
                        onChange={this.handleChangeBuDeptId.bind(this)}
                      >
                        {buList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    label="部门"
                    hasFeedback
                  >
                    {getFieldDecorator('bumen')(
                      <Select allowClear>
                        {depList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                    label="学历"
                    hasFeedback
                  >
                    {getFieldDecorator('sex')(
                      <Select allowClear>
                        {educationCodeEnum.map(item => {
                          return (
                            <Option key={item.key} value={item.key}>
                              {item.label}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 9 }}
                    label="是否统招"
                    hasFeedback
                  >
                    {getFieldDecorator('entry')(
                      <Select allowClear>
                        {uniformFlagEnum.map(item => {
                          return (
                            <Option key={item.key} value={item.key}>
                              {item.label}
                            </Option>
                          );
                        })}
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
                      marginRight: '21px'
                    }}
                  >
                    查询
                  </Button>
                </Col>
              </Form>
            </Row>
          </Col>
          <Col span={24} className="educ-content-table">
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </Col>
          <Col className="educ-paging" span={24}>
            <Pagination total={10} current={1} />
          </Col>
        </Row>
        <EducationModal />
      </div>
    );
  }
}

export default Form.create()(EducationInfo);
