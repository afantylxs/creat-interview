import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Table,
  Pagination,
  Input,
  message,
  Upload,
  Tooltip
} from 'antd';
import axios from 'axios';
import ProjectModal from './components/ProjectModal.jsx';
import { actionCreators } from './store';
import { projectColumnsFunction } from './projectColumns';
import SearchForm from './components/searchForm.jsx';
import './index.less';
const { Search } = Input;

@connect(state => state.project, actionCreators)
class ProjectInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      thats: null
    };
  }

  //table表格
  handleGetColumns = () => {
    const that = this;
    const projectList = projectColumnsFunction(that);
    return projectList;
  };

  componentDidMount() {
    const { deptInfoBu, queryProjectRecordInfoList } = this.props;
    deptInfoBu();
    queryProjectRecordInfoList({
      currentPage: 1,
      pageSize: 10
    });
  }

  //分页查询
  handleTableChange = page => {
    const {
      queryProjectRecordInfoList,
      changeCurrentPageData,
      currentPageData
    } = this.props;
    const arg0 = {
      currentPage: page,
      pageSize: 10,
      aliNo: currentPageData.aliNo,
      ipsaBuDeptId: currentPageData.ipsaBuDeptId,
      ipsaDeptId: currentPageData.ipsaDeptId,
      projectId: currentPageData.projectId,
      joiningProjTimeFormat: currentPageData.joiningProjTimeFormat,
      firstCategoryId: currentPageData.firstCategoryId,
      secondCategoryId: currentPageData.secondCategoryId,
      thirdJobId: currentPageData.thirdJobId,
      aliGradeCode: currentPageData.aliGradeCode,
      techDirection: currentPageData.techDirection,
      aliFrameId: currentPageData.aliFrameId,
      careerGroupId: currentPageData.careerGroupId,
      groupDeptId: currentPageData.groupDeptId,
      careerDeptId: currentPageData.careerDeptId,
      deptId: currentPageData.deptId,
      projetDurationType: currentPageData.projetDurationType,
      projetType: currentPageData.projetType,
      iduFlag: currentPageData.iduFlag,
      tlFlag: currentPageData.tlFlag,
      workCity: currentPageData.workCity,
      workAddress: currentPageData.workAddress,
      resourceStatus: currentPageData.resourceStatus,
      backboneFlag: currentPageData.backboneFlag,
      chargeFlag: currentPageData.chargeFlag,
      keyword: currentPageData.keyword
    };
    changeCurrentPageData(arg0);
    queryProjectRecordInfoList(arg0);
  };

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    const { currentPageData } = this.props;
    axios({
      method: 'get',
      url: '/api/project/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      params: {
        aliNo: currentPageData.aliNo,
        ipsaBuDeptId: currentPageData.ipsaBuDeptId,
        ipsaDeptId: currentPageData.ipsaDeptId,
        projectId: currentPageData.projectId,
        joiningProjTimeFormat: currentPageData.joiningProjTimeFormat,
        firstCategoryId: currentPageData.firstCategoryId,
        secondCategoryId: currentPageData.secondCategoryId,
        thirdJobId: currentPageData.thirdJobId,
        aliGradeCode: currentPageData.aliGradeCode,
        techDirection: currentPageData.techDirection,
        aliFrameId: currentPageData.aliFrameId,
        careerGroupId: currentPageData.careerGroupId,
        groupDeptId: currentPageData.groupDeptId,
        careerDeptId: currentPageData.careerDeptId,
        deptId: currentPageData.deptId,
        projetDurationType: currentPageData.projetDurationType,
        projetType: currentPageData.projetType,
        iduFlag: currentPageData.iduFlag,
        tlFlag: currentPageData.tlFlag,
        workCity: currentPageData.workCity,
        workAddress: currentPageData.workAddress,
        resourceStatus: currentPageData.resourceStatus,
        backboneFlag: currentPageData.backboneFlag,
        chargeFlag: currentPageData.chargeFlag,
        keyword: currentPageData.keyword
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
    const { queryProjectRecordInfoList, changeCurrentPageData } = this.props;
    const { thats } = this.state;
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
      keyword: value
    };
    changeCurrentPageData(arg0);
    queryProjectRecordInfoList(arg0);
    thats.props.form.resetFields();
  };

  handleChangeSearchInput = value => {
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
      keyword: value.target.value
    };
    changeCurrentPageData(arg0);
  };

  //刷新子组件

  render() {
    const {
      projectDataList,
      total,
      currentPageData,
      saveSearchData
    } = this.props;
    const token = localStorage.getItem('token');
    return (
      <div className="project-information">
        <Row style={{ padding: '20px' }}>
          <Col span={24}>
            <Row className="project-operator-set">
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
                <div
                  style={{
                    width: '64px',
                    display: 'inline-block',
                    marginRight: '7%'
                  }}
                >
                  <Upload
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    action="/api/project/import/projectRecordInfo.json"
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
            <SearchForm handleSonSearch={this.handleSonSearch} />
          </Col>
          <Col className="project-content-table" span={24}>
            <Table
              rowKey={(record, index) => index}
              columns={this.handleGetColumns()}
              dataSource={projectDataList}
              scroll={{ x: '100%' }}
              pagination={false}
            />
          </Col>
          <Col className="project-paging" span={24}>
            <Pagination
              total={total}
              current={currentPageData.currentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
        </Row>
        <ProjectModal />
      </div>
    );
  }
}
export default ProjectInformation;
