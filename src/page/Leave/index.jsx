import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Form,
  Select,
  Input,
  Upload,
  message,
  Tooltip,
  Pagination
} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import SearchForm from './components/SearchForm.jsx';
import fetch from '../../utils/axios.config';
import EditLeaveModal from './components/EditLeaveModal.jsx';
import { actionCreators } from './store';
import { leaveColumnsFunction } from './leaveColumns';

import './index.less';
const { Search } = Input;
const { Option } = Select;

@connect(state => state.leave, actionCreators)
class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    };
  }

  componentDidMount() {
    fetch.get('/api/user/queryUserPermission.json').then(res => {
      if (res && res.success) {
        const { data } = res;
        const permission = data[0].permission;
        this.setState({
          permission
        });
      }
    });
    const arg0 = {
      currentPage: 1,
      pageSize: 10
    };
    this.getQueryEmployeeLeaveInfoList(arg0);
  }

  //获取离职列表
  getQueryEmployeeLeaveInfoList = arg0 => {
    const { queryEmployeeLeaveInfoList } = this.props;
    queryEmployeeLeaveInfoList(arg0);
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

  //导入数据提醒
  handleChangeFile = ({ file, fileList }) => {
    const { queryProjectRecordInfoList } = this.props;

    if (file && file.status === 'done' && file.response.success) {
      message.success(
        file.response.message + '，共导入' + file.response.data + '条数据'
      );
      queryProjectRecordInfoList({
        currentPage: 1,
        pageSize: 20
      });
    } else {
      if (file && file.status === 'done' && !file.response.success) {
        message.error('导入失败:' + file.response.message);
      }
      if (file && file.status === 'error') {
        if (file.error.status === 401) {
          message.error('导入失败，请重新登录');
        } else {
          message.error('导入失败:' + file.response.message);
        }
      }
    }
  };

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    const { currentPageData } = this.props;
    axios({
      method: 'get',
      url: '/api/leave/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      params: {
        ...currentPageData
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

  //打开新增离职信息编辑框
  handleShowModel = () => {
    const { changeLeaveVisible } = this.props;
    this.props.form.resetFields();
    changeLeaveVisible({
      leaveVisible: true,
      record: {}
    });
  };

  //table表格
  handleGetColumns = () => {
    const that = this;
    const { permission } = this.state;
    const projectList = leaveColumnsFunction(that, permission);
    return projectList;
  };

  //搜索框调用查询列表
  handleSearchInput = value => {
    const { changeCurrentPageData, thats } = this.props;
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      keyword: value,
      busOnlineFeedbackId: '',
      busOnlineFeedbackType: '',
      leaveOfficeStatus: '',
      leaveReasonId: '',
      hrOneMonthClass: '',
      hrOneMonthType: '',
      ipsaBuDeptId: '',
      ipsaDeptId: '',
      leaveProjReasonId: '',
      effectiveStartTimeFormat: '',
      effectiveEndTimeFormat: '',
      leaveProjStartTimeFormat: '',
      leaveProjEndTimeFormat: ''
    };
    changeCurrentPageData(arg0);
    this.getQueryEmployeeLeaveInfoList(arg0);
    thats.props.form.resetFields();
  };

  //修改搜索框的值
  handleChangeSearchInput = value => {
    const { changeCurrentPageData } = this.props;
    const arg0 = {
      ...changeCurrentPageData,
      keyword: value.target.value
    };
    changeCurrentPageData(arg0);
  };

  //分页查询
  handleTableChange = page => {
    const { changeCurrentPageData, currentPageData } = this.props;
    const arg0 = {
      ...currentPageData,
      currentPage: page,
      pageSize: 10
    };
    changeCurrentPageData(arg0);
    this.getQueryEmployeeLeaveInfoList(arg0);
  };

  //组件销毁清空搜索
  componentWillUnmount() {
    const { changeCurrentPageData } = this.props;
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      aliNo: '',
      ipsaBuDeptId: '',
      ipsaDeptId: '',
      projectId: '',
      joiningProjTimeFormat: '',
      firstCategoryId: '',
      secondCategoryId: '',
      thirdJobId: '',
      aliGradeCode: '',
      techDirection: '',
      aliFrameId: '',
      careerGroupId: '',
      groupDeptId: '',
      careerDeptId: '',
      deptId: '',
      projetDurationType: '',
      projetType: '',
      iduFlag: '',
      tlFlag: '',
      workCity: '',
      workAddress: '',
      resourceStatus: '',
      backboneFlag: '',
      chargeFlag: '',
      keyword: '',
      businessLine: ''
    };
    changeCurrentPageData(arg0);
  }

  render() {
    const token = localStorage.getItem('token');
    const { leaveDataList, currentPageData, leaveTotal } = this.props;
    const { permission } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="leave-information">
        <Row style={{ padding: '30px' }}>
          <Col span={24}>
            <Row className="leave-operator-set">
              <Col span={8}>
                <Search
                  style={{ width: '50%', marginLeft: '20px' }}
                  placeholder="输入姓名或软通工号"
                  onSearch={value => this.handleSearchInput(value)}
                  onChange={value => this.handleChangeSearchInput(value)}
                  value={currentPageData.keyword}
                  enterButton
                />
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <Button
                  disabled={
                    (permission && permission === 'hr') ||
                    permission === 'admin'
                      ? false
                      : true
                  }
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
                    disabled={
                      (permission && permission === 'projectManage') ||
                      permission === 'admin' ||
                      permission === 'hr'
                        ? false
                        : true
                    }
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    action="/api/leave/import/leaveRecord.json"
                    method="post"
                    headers={{
                      Authorization: 'Bearer ' + token
                    }}
                    showUploadList={false}
                    onChange={this.handleChangeFile.bind(this)}
                    beforeUpload={this.handleBeforeUpload.bind(this)}
                  >
                    <Tooltip title="支持导入.xlsx文件">
                      <Button
                        disabled={
                          (permission && permission === 'projectManage') ||
                          permission === 'admin' ||
                          permission === 'hr'
                            ? false
                            : true
                        }
                        type="primary"
                      >
                        导入
                      </Button>
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
                    disabled={
                      (permission && permission === 'projectManage') ||
                      permission === 'admin' ||
                      permission === 'hr'
                        ? false
                        : true
                    }
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
            <SearchForm />
          </Col>
          <Col span={24}>
            <Table
              rowKey={(record, index) => index}
              className="leave-content-table "
              columns={this.handleGetColumns()}
              dataSource={leaveDataList}
              scroll={{ x: '100%' }}
              pagination={false}
            />
          </Col>
          <Col className="leave-paging" span={24}>
            <Pagination
              total={leaveTotal}
              showTotal={total => `共 ${leaveTotal} 条数据`}
              current={currentPageData.currentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
        </Row>
        <EditLeaveModal />
      </div>
    );
  }
}

export default Form.create()(Department);
