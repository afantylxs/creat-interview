import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Pagination, Input } from 'antd';
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
      visible: false
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
    const { queryProjectRecordInfoList, changeCurrentPageData } = this.props;
    const arg0 = {
      currentPage: page,
      pageSize: 10
    };
    changeCurrentPageData(arg0);
    queryProjectRecordInfoList(arg0);
  };

  render() {
    const { projectDataList, total, currentPageData } = this.props;
    return (
      <div className="project-information">
        <Row style={{ padding: '20px' }}>
          <Col span={24}>
            <Row className="project-operator-set">
              <Col span={8}>
                <Search
                  style={{ width: '50%', marginLeft: '20px' }}
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
          <Col style={{ marginTop: '5px' }} span={24}>
            <SearchForm />
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
