import React, { Component } from 'react';
import { Row, Col, Button, Table, message, Tooltip, Pagination } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { actionCreators } from '../store';
import fetch from '../../../utils/axios.config';

import EditModal from './EidtModal.jsx';
import DetailsModal from './DetailsModal.jsx';
import './interviewTable.less';
@connect(state => state.personnel, actionCreators)
class InterviewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      updataId: '',
      currentPage: 1
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'resumeUserName',
        width: '7%'
      },

      {
        title: '电话',
        dataIndex: 'resumeUserPhone',
        width: '10%'
      },
      {
        title: '项目名称',
        dataIndex: 'projectName',
        width: '7%',
        onCell: () => {
          return {
            style: {
              maxWidth: 100,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer'
            }
          };
        },
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )
      },
      {
        title: '截止时间',
        dataIndex: 'interviewEndTime',
        width: '10%',
        render: (text, render) => {
          return text ? moment(text).format('YYYY-MM-DD') : '';
        }
      },
      {
        title: '职位类型',
        dataIndex: 'positionType',
        width: '10%'
      },
      {
        title: '招聘级别',
        dataIndex: 'recruitmentLevel',
        width: '8%'
      },
      {
        title: '简历状态',
        dataIndex: 'resumeStatus',
        width: '7%',
        render: (text, render) => {
          switch (text) {
            case 1:
              return <span>待分配</span>;

            case 2:
              return <span>已分配</span>;
            case 3:
              return <span>待面试</span>;
            case 4:
              return <span>已面试</span>;
            default:
              break;
          }
        }
      },
      {
        title: '初面结果',
        dataIndex: 'initialInterviewResult',
        width: '7%',
        render: (text, render) => {
          switch (text) {
            case 1:
              return <span>通过</span>;

            case 2:
              return <span>不通过</span>;

            default:
              break;
          }
        }
      },
      {
        title: '终面结果',
        dataIndex: 'finalInterviewResult',
        width: '7%',
        render: (text, render) => {
          switch (text) {
            case 1:
              return <span>通过</span>;

            case 2:
              return <span>不通过</span>;
            default:
              break;
          }
        }
      },
      {
        title: '建议级别',
        dataIndex: 'interviewLevel',
        width: '7%'
      },
      {
        title: '操作',
        dataIndex: 'buttons',
        width: '30%',
        render: (text, record) => {
          const buttonsArr =
            text &&
            text.length &&
            text.map(item => {
              if (item === 'edit') {
                return (
                  <Button
                    key={item}
                    onClick={this.handleOpenEditModal.bind(this, record)}
                    className="action-buttons"
                  >
                    编辑
                  </Button>
                );
              }
              if (item === 'detail') {
                return (
                  <Button
                    key={item}
                    onClick={this.handleOpenDetailsModal.bind(this, record)}
                    className="action-buttons"
                  >
                    详情
                  </Button>
                );
              }
              if (item === 'interview') {
                return (
                  <Button
                    key={item}
                    onClick={this.handleAcquireInterview.bind(this, record)}
                    className="action-buttons"
                  >
                    面试
                  </Button>
                );
              }
              if (item === 'download') {
                return (
                  <Button
                    key={item}
                    onClick={this.handleDownload.bind(this, record)}
                    className="action-buttons"
                  >
                    下载
                  </Button>
                );
              }
            });
          return buttonsArr;
        }
      }
    ];
  }

  //下载
  handleDownload = record => {
    const url = record.resumeDownloadUrl;
    console.log('url', url);
    window.location.href = url;
  };

  //打开更新简历弹窗
  handleOpenEditModal = record => {
    const id = record.id;
    const { changeEditModalVisible, dictInfo } = this.props;
    changeEditModalVisible({
      editModalVisible: true,
      editRecord: record
    });
    dictInfo('wutong_position_level');
    this.setState({
      updataId: id
    });
  };

  //打开详情弹窗
  handleOpenDetailsModal = record => {
    const id = record.id;
    const { changeDetailsModalVisible, queryInterviewInfoById } = this.props;
    changeDetailsModalVisible({
      detailsVisible: true
    });
    queryInterviewInfoById(id);
  };

  //面试提交
  handleAcquireInterview = record => {
    const id = record.id;
    const { queryInterviewList } = this.props;
    fetch
      .get('/api/interview/acquireInterview.json', {
        params: {
          id
        }
      })
      .then(res => {
        if (res && res.success) {
          message.success('操作成功');
          queryInterviewList();
        } else {
          message.error('操作失败：' + res.message && res.message);
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
        }
      });
  };

  //分页查询
  handleTableChange = page => {
    const {
      queryInterviewList,
      interviewSearchValue,
      changeCurrentPage
    } = this.props;

    const arg0 = {
      currentPage: page,
      pageSize: 10,
      ...interviewSearchValue
    };
    changeCurrentPage({
      interCurrentPage: page,
      dispCurrentPage: 1
    });
    queryInterviewList(arg0);
  };
  render() {
    const columns = this.columns;
    const { interviewList = [], interviewotal, interCurrentPage } = this.props;
    const { updataId } = this.state;
    return (
      <div>
        <Row className="interview-table">
          <Col className="interview-table-data">
            <Table
              rowKey={(record, index) => record.id}
              columns={columns}
              dataSource={interviewList}
              pagination={false}
            />
          </Col>
          <Col className="interview-paging">
            <Pagination
              total={interviewotal}
              showTotal={interviewotal => `共 ${interviewotal} 条数据`}
              current={interCurrentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
          <EditModal updataId={updataId} />
          <DetailsModal />
        </Row>
      </div>
    );
  }
}

export default InterviewTable;
