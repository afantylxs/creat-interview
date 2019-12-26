import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDomNode } from 'react-dom';
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
  Input,
  Pagination,
  message
} from 'antd';
import axios from 'axios';
import BasicModal from './components/BasicModal.jsx';
import { empPropertyEumn } from '../../utils/optionEnum';
import { actionCreators } from './store';
import './index.less';
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
@connect(state => state.basic, actionCreators)
class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.columns = [
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
        title: '姓名',
        dataIndex: 'empName',
        width: '100px'
      },
      {
        title: '软通工号',
        dataIndex: 'empNo',
        width: '100px'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        width: '80px',
        render: (text, record) => {
          switch (text) {
            case 1:
              return <span>男</span>;
            case 0:
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
        width: '80px'
      },
      {
        title: '是否在职',
        dataIndex: 'onJob',
        width: '90px',
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
        width: '100px',
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
        width: '100px'
      },
      {
        title: '交付经理',
        dataIndex: 'deliveryManagerName',
        width: '100px'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '90px',
        render: (text, record) => {
          return (
            <span
              className="basic-action-span"
              onClick={() => {
                const { changeBasicVisible, deptInfo } = this.props;
                let onjobKey = '',
                  onJobLabel = '';
                if (record.onJob === 0) {
                  onjobKey = record.onJob;
                  onJobLabel = '离职';
                } else if (record.onJob === 1) {
                  onjobKey = record.onJob;
                  onJobLabel = '在职';
                }
                const newRecord = {
                  id: record.id,
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
                    label: record.gender === 1 ? '男' : '女'
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
                    key: onjobKey,
                    label: onJobLabel
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
            </span>
          );
        }
      }
    ];
  }

  componentDidMount() {
    const {
      queryEmployeeBaseInfoList,
      deptInfoBu,
      queryUserListInfoByRolePermission
    } = this.props;
    queryEmployeeBaseInfoList({
      currentPage: 1,
      pageSize: 10
    });
    queryUserListInfoByRolePermission('deliveryManager');
    deptInfoBu();
  }

  //打开对话框
  handleShowModel = () => {
    const { changeBasicVisible } = this.props;
    this.props.form.resetFields();
    changeBasicVisible({
      basicVisible: true,
      record: {}
    });
  };

  //导入数据提醒
  handleChangeFile = ({ file, fileList }) => {
    const { queryEmployeeBaseInfoList } = this.props;

    if (file && file.status === 'done' && file.response.success) {
      message.success(
        file.response.message + '，共导入' + file.response.data + '条数据'
      );
      queryEmployeeBaseInfoList({
        currentPage: 1,
        pageSize: 20
      });
    }
  };

  //上传前的文件校验
  handleBeforeUpload = (file, fileList) => {
    if (
      file &&
      file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      message.error('请上传以.xlsx为后缀的Excel文件');
      return;
    }
  };
  //搜索框调用查询列表
  handleSearchInput = value => {
    const { queryEmployeeBaseInfoList, changeCurrentPageData } = this.props;
    this.props.form.validateFields((err, values) => {
      const dateStart =
        values.joiningDay && values.joiningDay.length
          ? moment(values.joiningDay[0]).format('YYYY-MM-DD')
          : '';
      const dateEnd =
        values.joiningDay && values.joiningDay.length
          ? moment(values.joiningDay[1]).format('YYYY-MM-DD')
          : '';

      const arg0 = {
        currentPage: 1,
        pageSize: 10,
        ipsaBuDeptId: values.ipsaBuDeptId,
        ipsaDeptId: values.ipsaDeptId,
        gender: values.gender,
        keyword: value,
        joiningDayStartTime: dateStart,
        joiningDayEndTime: dateEnd,
        empProperty: values.empProperty,
        deliveryManagerId: values.deliveryManagerName
      };
      changeCurrentPageData(arg0);
      queryEmployeeBaseInfoList(arg0);
    });
  };

  handleChangeBuDeptId = value => {
    const { deptInfo, changeDepList } = this.props;
    if (value) {
      deptInfo(value);
    } else {
      changeDepList([]);
    }
  };

  //查询按钮
  handleSearchList = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {
        queryEmployeeBaseInfoList,
        changeCurrentPageData,
        currentPageData
      } = this.props;
      const dateStart =
        values.joiningDay && values.joiningDay.length
          ? moment(values.joiningDay[0]).format('YYYY-MM-DD')
          : '';
      const dateEnd =
        values.joiningDay && values.joiningDay.length
          ? moment(values.joiningDay[1]).format('YYYY-MM-DD')
          : '';
      const arg0 = {
        currentPage: 1,
        pageSize: 10,
        ipsaBuDeptId: values.ipsaBuDeptId,
        ipsaDeptId: values.ipsaDeptId,
        gender: values.gender,
        keyword: currentPageData.keyword,
        joiningDayStartTime: dateStart,
        joiningDayEndTime: dateEnd,
        empProperty: values.empProperty,
        deliveryManagerId: values.deliveryManagerName
      };
      changeCurrentPageData(arg0);
      queryEmployeeBaseInfoList(arg0);
    });
  };

  //分页查询
  handleTableChange = page => {
    const {
      queryEmployeeBaseInfoList,
      changeCurrentPageData,
      currentPageData
    } = this.props;
    const arg0 = {
      currentPage: page,
      pageSize: 10,
      keyword: currentPageData.keyword,
      ipsaBuDeptId: currentPageData.ipsaBuDeptId,
      ipsaDeptId: currentPageData.ipsaDeptId,
      gender: currentPageData.gender,
      jjoiningDayEndTime: currentPageData.joiningDayEndTime,
      joiningDayStartTime: currentPageData.joiningDayStartTime,
      empProperty: currentPageData.empProperty
    };
    changeCurrentPageData(arg0);
    queryEmployeeBaseInfoList(arg0);
    // const table = ReactDom.findDOMNode(this.table),
    //   tableBody = table.querySelector('.ant-table-body');
    // const div = document.getElementsByClassName('basic-content-table');

    // console.log('this.props.refs', this.tableHeight.props.style);
  };

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    const { currentPageData } = this.props;
    axios({
      method: 'get',
      url: '/api/base/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      params: {
        ipsaBuDeptId: currentPageData.ipsaBuDeptId,
        ipsaDeptId: currentPageData.ipsaDeptId,
        gender: currentPageData.gender,
        joiningDayEndTime: currentPageData.joiningDayEndTime,
        joiningDayStartTime: currentPageData.joiningDayStartTime
      },
      responseType: 'blob'
    })
      .then(res => {
        if (res.status === 200) {
          const blob = new Blob([res.data], {
            type:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          });
          const url = window.URL.createObjectURL(blob);
          const aLink = document.createElement('a');
          aLink.style.display = 'none';
          aLink.href = url;
          aLink.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(aLink);
          aLink.click();
          document.body.removeChild(aLink); //下载完成移除元素
          window.URL.revokeObjectURL(url);
          message.success('导出成功');
        } else {
          message.error('导出失败');
        }
      })
      .catch(err => {
        message.error('导出失败');
      });
  };
  render() {
    const columns = this.columns;
    const {
      basicList,
      buList,
      depList,
      total,
      currentPageData,
      dmData
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const token = localStorage.getItem('token');

    // const { getFieldDecorator } = this.props.form;
    return (
      <div className="basic-information">
        <Row style={{ padding: '30px' }}>
          <Col span={24}>
            <Row className="basic-operator-set">
              <Col span={8}>
                <Search
                  style={{ width: '50%', marginLeft: '20px' }}
                  placeholder="输入姓名或软通工号"
                  onSearch={value => this.handleSearchInput(value)}
                  enterButton
                />
              </Col>
              {/* <Col span={12} style={{ textAlign: 'right' }}>
                
              </Col> */}
              <Col span={16} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={this.handleShowModel.bind(this)}
                  style={{ marginRight: '7%' }}
                >
                  + 新增
                </Button>
                <div
                  style={{
                    width: '64px',
                    display: 'inline-block',
                    marginRight: '7%'
                  }}
                >
                  <Upload
                    action="/api/base/import/employeeBaseInfo.json"
                    method="post"
                    headers={{
                      Authorization: 'Bearer ' + token
                    }}
                    showUploadList={false}
                    onChange={this.handleChangeFile.bind(this)}
                    beforeUpload={this.handleBeforeUpload.bind(this)}
                  >
                    <Button type="primary">导入</Button>
                  </Upload>
                </div>
                <div
                  style={{
                    width: '64px',
                    display: 'inline-block',
                    marginRight: '2%'
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
              <Col span={22}>
                <Form>
                  <Col span={6}>
                    <Form.Item
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 18 }}
                      label="BU"
                      hasFeedback
                    >
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
                    <Form.Item
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 16 }}
                      label="部门"
                      hasFeedback
                    >
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
                  <Col span={4}>
                    <Form.Item
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}
                      label="性别"
                      hasFeedback
                    >
                      {getFieldDecorator('gender')(
                        <Select allowClear>
                          <Option value="1">男</Option>
                          <Option value="0">女</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 18 }}
                      label="入职日期"
                      hasFeedback
                    >
                      {getFieldDecorator('joiningDay')(
                        <RangePicker
                          placeholder={['起始日期', '结束日期']}
                          ranges={{
                            当天: [moment(), moment()],
                            本月: [
                              moment().startOf('month'),
                              moment().endOf('month')
                            ]
                          }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 15 }}
                      label="人员性质"
                      hasFeedback
                    >
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
                    <Form.Item
                      labelCol={{ span: 14 }}
                      wrapperCol={{ span: 10 }}
                      label="交付经理"
                      hasFeedback
                    >
                      {getFieldDecorator('deliveryManagerName')(
                        <Select allowClear>
                          {dmData.map(item => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.username}
                              </Option>
                            );
                          })}
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
                  onClick={this.handleSearchList.bind(this)}
                >
                  查询
                </Button>
              </Col>
            </Row>
          </Col>
          <Col
            className="basic-content-table"
            style={{ marginTop: '30px' }}
            span={24}
            ref={el => {
              this.tableHeight = el;
            }}
          >
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={basicList}
              scroll={{ y: 400, x: 1400 }}
              pagination={false}
              scrollToFirstRowOnChange={true}
            />
          </Col>
          <Col className="basic-paging" span={24}>
            <Pagination
              total={total}
              current={currentPageData.currentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
        </Row>
        <BasicModal />
      </div>
    );
  }
}
export default Form.create()(BasicInformation);
