import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  DatePicker,
  Upload,
  Row,
  Col,
  Button,
  Table,
  Form,
  Select,
  Input
} from 'antd';
import BasicModal from './components/BasicModal.jsx';
import { empPropertyEumn } from '../../utils/optionEnum';
import { actionCreators } from './store';
import axios from 'axios';
const { Search } = Input;
const { Option } = Select;
@connect(state => state.basic, actionCreators)
class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSearchData: {},
      currentPage: 1,
      pageSize: 10,
      keyword: '',
      ipsaBuDeptId: '',
      ipsaDeptId: '',
      gender: '',
      joiningDay: '',
      empProperty: ''
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'empName',
        width: '150px'
      },
      {
        title: 'BU',
        dataIndex: 'ipsaBuDeptName',
        width: '150px'
      },
      {
        title: '部门',
        dataIndex: 'ipsaDeptName',
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
        dataIndex: 'ipsaPostName',
        width: '150px'
      },
      {
        title: 'Grade代码',
        dataIndex: 'ipsaGradeName',
        width: '150px'
      },
      {
        title: '是否在职',
        dataIndex: 'onJob',
        width: '150px',
        render: (text, record) => {
          switch (text) {
            case 0:
              return <span>离职</span>;
            case 1:
              return <span>在职</span>;
            default:
              break;
          }
        }
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
                const { changeBasicVisible, deptInfo } = this.props;
                const newRecord = {
                  id: 26,
                  empNo: record.empNo,
                  empName: record.empName,
                  ipsaBuDeptId: {
                    key: record.ipsaBuDeptId,
                    label: record.ipsaBuDeptName
                  },
                  ipsaDeptId: {
                    key: record.ipsaDeptId,
                    label: record.ipsaDeptName
                  },
                  gender: {
                    key: record.gender,
                    label: record.gender === 0 ? '男' : '女'
                  },
                  birthday: record.birthday,
                  joiningDay: record.joiningDay,
                  ipsaPostNo: {
                    key: record.ipsaPostNo,
                    label: record.ipsaPostName
                  },
                  ipsaGradeCode: {
                    key: record.ipsaGradeCode,
                    label: record.ipsaGradeName
                  },
                  correctionTime: record.correctionTime
                    ? record.correctionTime
                    : '',
                  empProperty: {
                    key: record.empProperty,
                    label: record.empProperty
                  },
                  directSuperiorName: {
                    key: record.directSuperiorId,
                    label: record.directSuperiorName
                  },
                  deliveryManagerName: {
                    key: record.deliveryManagerId,
                    label: record.deliveryManagerName
                  },
                  onJob: {
                    key: record.onJob,
                    label: record.onJob === 0 ? '离职' : '在职'
                  }
                };
                changeBasicVisible({
                  basicVisible: true,
                  record: newRecord
                });
                deptInfo({ id: record.ipsaBuDeptId });
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
    this.props.form.resetFields();
    changeBasicVisible({
      basicVisible: true,
      record: {}
    });
  };

  handleChangeFile = ({ file, fileList }) => {
    console.log('file', file, 'fileList', fileList);
  };

  //搜索框调用查询列表
  handleSearchInput = value => {
    const { queryEmployeeBaseInfoList } = this.props;
    const { selectSearchData } = this.state;
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      keyword: value,
      ...selectSearchData
    };
    queryEmployeeBaseInfoList(arg0);
  };

  handleChangeBuDeptId = value => {
    const { deptInfo, changeDepList } = this.props;
    if (value) {
      deptInfo(value);
    } else {
      changeDepList([]);
    }
  };

  //查询搜索列表
  handleSearchList = () => {
    this.props.form.validateFields((err, values) => {
      const { queryEmployeeBaseInfoList } = this.props;
      this.setState(
        {
          ipsaBuDeptId: values.ipsaBuDeptId,
          ipsaDeptId: values.ipsaDeptId,
          gender: values.gender,
          joiningDay: values.joiningDay
            ? moment(values.joiningDay).format('YYYY-MM-DD')
            : '',
          empProperty: values.empProperty,
          currentPage: 1,
          pageSize: 10
        },
        () => {
          const {
            currentPage,
            pageSize,
            ipsaBuDeptId,
            ipsaDeptId,
            gender,
            joiningDay,
            empProperty
          } = this.state;
          const arg0 = {
            currentPage,
            pageSize,
            ipsaBuDeptId,
            ipsaDeptId,
            gender,
            joiningDay,
            empProperty
          };
          queryEmployeeBaseInfoList(arg0);
        }
      );
    });
  };

  //分页查询
  handleTableChange = page => {
    console.log('page', page);
    const { queryEmployeeBaseInfoList } = this.props;
    this.setState(
      {
        currentPage: page
      },
      () => {
        const { currentPage, pageSize } = this.state;
        const arg0 = {
          currentPage,
          pageSize
        };
        queryEmployeeBaseInfoList(arg0);
      }
    );
  };

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    axios({
      method: 'get',
      url: '/api/base/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      responseType: 'blob'
    }).then(res => {
      console.log('res', res);

      const blob = new Blob([res.data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
      });
      const url = window.URL.createObjectURL(blob);
      console.log('url', url);

      const aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = url;
      aLink.setAttribute('download', 'excel.xlsx');
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url);
    });
  };
  render() {
    const columns = this.columns;
    const { basicList, buList, depList, total } = this.props;
    const { getFieldDecorator } = this.props.form;
    const token = localStorage.getItem('token');
    const paginationProps = {
      total,
      onChange: page => {
        this.handleTableChange(page);
      }
    };

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
                  onSearch={value => this.handleSearchInput(value)}
                  enterButton
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <div
                  style={{
                    width: '64px',
                    display: 'inline-block',
                    marginRight: '40px'
                  }}
                >
                  <Upload
                    action="/api/base/import/employeeBaseInfo.json"
                    method="post"
                    headers={{
                      Authorization: 'Bearer ' + token
                    }}
                    showUploadList={false}
                    // onChange={this.handleChangeFile.bind(this)}
                  >
                    <Button type="primary">导入</Button>
                  </Upload>
                </div>
                <div
                  style={{
                    width: '64px',
                    display: 'inline-block',
                    marginRight: '40px'
                  }}
                >
                  <Button
                    type="primary"
                    onClick={this.handleDownload.bind(this)}
                  >
                    导出
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <Row>
              <Form {...formItemLayout}>
                <Col span={6}>
                  <Form.Item label="BU" hasFeedback>
                    {getFieldDecorator('ipsaBuDeptId')(
                      <Select
                        allowClear
                        onChange={this.handleChangeBuDeptId.bind(this)}
                      >
                        {buList.length &&
                          buList.map((item, index) => {
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
                <Col span={6}>
                  <Form.Item label="部门" hasFeedback>
                    {getFieldDecorator('ipsaDeptId')(
                      <Select allowClear>
                        {depList.length &&
                          depList.map(item => {
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
                <Col span={6}>
                  <Form.Item label="性别" hasFeedback>
                    {getFieldDecorator('gender')(
                      <Select allowClear>
                        <Option value="0">男</Option>
                        <Option value="1">女</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="入职日期" hasFeedback>
                    {getFieldDecorator('joiningDay')(<DatePicker />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="人员性质" hasFeedback>
                    {getFieldDecorator('empProperty')(
                      <Select allowClear>
                        {empPropertyEumn.map(item => {
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
                <Col span={6}>
                  <Button
                    type="primary"
                    style={{ marginTop: '3px', marginLeft: '5%' }}
                    onClick={this.handleSearchList.bind(this)}
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
              pagination={paginationProps}
            />
          </Col>
        </Row>
        <BasicModal />
      </div>
    );
  }
}
export default Form.create()(BasicInformation);
