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
  Input,
  Pagination,
  message,
  Tooltip
} from 'antd';
import axios from 'axios';
import BasicModal from './components/BasicModal.jsx';
import { empPropertyEumn } from '../../utils/optionEnum';
import { actionCreators } from './store';
import { basicColumnsFunction } from './basicColumns';
import './index.less';
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
@connect(state => state.basic, actionCreators)
class BasicInformation extends Component {
  componentDidMount() {
    const {
      queryEmployeeBaseInfoList,
      deptInfoBu,
      queryUserListInfoByRolePermission,
      changeCurrentPageData
    } = this.props;
    const entmonth = localStorage.getItem('entmonth');
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      ipsaBuDeptId: '',
      ipsaDeptId: '',
      gender: '',
      keyword: '',
      joiningDayStartTime: '',
      joiningDayEndTime: '',
      empProperty: '',
      deliveryManagerId: '',
      employeeStatus: entmonth
    };
    changeCurrentPageData(arg0);
    queryEmployeeBaseInfoList(arg0);
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
    } else {
      if (file && file.status === 'done' && !file.response.success) {
        message.error('上传失败:' + file.response.message);
      }
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
      const arg0 = {
        currentPage: 1,
        pageSize: 10,
        ipsaBuDeptId: '',
        ipsaDeptId: '',
        gender: '',
        keyword: value,
        joiningDayStartTime: '',
        joiningDayEndTime: '',
        empProperty: '',
        deliveryManagerId: '',
        employeeStatus: ''
      };
      changeCurrentPageData(arg0);
      localStorage.setItem('entmonth', '');
      queryEmployeeBaseInfoList(arg0);
      this.props.form.resetFields();
    });
  };

  //修改搜索框的值
  handleChangeSearchInput = value => {
    const { changeCurrentPageData } = this.props;
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      ipsaBuDeptId: '',
      ipsaDeptId: '',
      gender: '',
      keyword: value.target.value,
      joiningDayStartTime: '',
      joiningDayEndTime: '',
      empProperty: '',
      deliveryManagerId: '',
      employeeStatus: ''
    };
    changeCurrentPageData(arg0);
  };

  handleChangeBuDeptId = value => {
    const {
      deptInfo,
      changeDepList,
      changeCurrentPageData,
      currentPageData
    } = this.props;
    if (value) {
      const newCurrentPageData = JSON.parse(JSON.stringify(currentPageData));
      newCurrentPageData.ipsaDeptId = '';
      changeCurrentPageData(newCurrentPageData);
      deptInfo(value);
      this.props.form.resetFields();
    } else {
      changeDepList([]);
    }
  };

  //查询按钮
  handleSearchList = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { queryEmployeeBaseInfoList, changeCurrentPageData } = this.props;
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
        keyword: '',
        joiningDayStartTime: dateStart,
        joiningDayEndTime: dateEnd,
        empProperty: values.empProperty,
        deliveryManagerId: values.deliveryManagerName,
        employeeStatus: ''
      };
      changeCurrentPageData(arg0);
      localStorage.setItem('entmonth', '');
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
    const entmonth = localStorage.getItem('entmonth');
    const arg0 = {
      currentPage: page,
      pageSize: 10,
      keyword: currentPageData.keyword,
      ipsaBuDeptId: currentPageData.ipsaBuDeptId,
      ipsaDeptId: currentPageData.ipsaDeptId,
      deliveryManagerId: currentPageData.deliveryManagerId,
      gender: currentPageData.gender,
      joiningDayEndTime: currentPageData.joiningDayEndTime,
      joiningDayStartTime: currentPageData.joiningDayStartTime,
      empProperty: currentPageData.empProperty,
      employeeStatus: entmonth
    };
    changeCurrentPageData(arg0);
    queryEmployeeBaseInfoList(arg0);
  };

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    const entmonth = localStorage.getItem('entmonth');
    const { currentPageData } = this.props;

    axios({
      method: 'get',
      url: '/api/base/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      params: {
        keyword: currentPageData.keyword,
        ipsaBuDeptId: currentPageData.ipsaBuDeptId,
        ipsaDeptId: currentPageData.ipsaDeptId,
        deliveryManagerId: currentPageData.deliveryManagerId,
        gender: currentPageData.gender,
        joiningDayEndTime: currentPageData.joiningDayEndTime,
        joiningDayStartTime: currentPageData.joiningDayStartTime,
        empProperty: currentPageData.empProperty,
        employeeStatus: entmonth
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

  //表格列表
  handleGetColumns = () => {
    const that = this;
    const projectList = basicColumnsFunction(that);
    return projectList;
  };

  //组件销毁清空搜索
  componentWillUnmount() {
    const { changeCurrentPageData } = this.props;
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      ipsaBuDeptId: '',
      ipsaDeptId: '',
      gender: '',
      keyword: '',
      joiningDayStartTime: '',
      joiningDayEndTime: '',
      empProperty: '',
      deliveryManagerId: '',
      employeeStatus: ''
    };
    changeCurrentPageData(arg0);
    localStorage.setItem('entmonth', '');
  }
  render() {
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
        <Row style={{ padding: '20px' }}>
          <Col span={24}>
            <Row className="basic-operator-set">
              <Col span={8}>
                <Search
                  style={{ width: '50%', marginLeft: '20px' }}
                  placeholder="输入姓名或软通工号"
                  onSearch={value => this.handleSearchInput(value)}
                  onChange={value => this.handleChangeSearchInput(value)}
                  enterButton
                  value={currentPageData.keyword}
                />
              </Col>
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
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    action="/api/base/import/employeeBaseInfo.json"
                    method="post"
                    headers={{
                      Authorization: 'Bearer ' + token
                    }}
                    showUploadList={false}
                    onChange={this.handleChangeFile.bind(this)}
                    beforeUpload={this.handleBeforeUpload.bind(this)}
                  >
                    <Tooltip title="支持导入.xlsx文件">
                      <Button type="primary">导入</Button>
                    </Tooltip>
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
          <Col style={{ marginTop: '5px' }} span={24}>
            <Row>
              <Col span={22}>
                <Form>
                  <Col span={6} className="basic-from-search-btn">
                    <Form.Item
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 18 }}
                      label="BU"
                      hasFeedback
                    >
                      {getFieldDecorator('ipsaBuDeptId', {
                        initialValue: currentPageData.ipsaBuDeptId
                      })(
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
                      {getFieldDecorator('ipsaDeptId', {
                        initialValue: currentPageData.ipsaDeptId
                      })(
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
                      {getFieldDecorator('gender', {
                        initialValue: currentPageData.gender
                      })(
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
                      {getFieldDecorator('joiningDay', {
                        initialValue: currentPageData.joiningDay
                      })(
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
                      {getFieldDecorator('empProperty', {
                        initialValue: currentPageData.empProperty
                      })(
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
                      {getFieldDecorator('deliveryManagerName', {
                        initialValue: currentPageData.deliveryManagerName
                      })(
                        <Select allowClear>
                          {dmData.map(item => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.empName}
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
            style={{ marginTop: '5px' }}
            span={24}
            ref={el => {
              this.tableHeight = el;
            }}
          >
            <Table
              rowKey={(record, index) => index}
              columns={this.handleGetColumns()}
              dataSource={basicList}
              pagination={false}
            />
          </Col>
          <Col className="basic-paging" span={24}>
            <Pagination
              total={total}
              showTotal={total => `共 ${total} 条数据`}
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
