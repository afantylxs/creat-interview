import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Input,
  Pagination,
  message,
  Tooltip
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { actionCreators } from '../store';
import fetch from '../../../utils/axios.config';

import AssignModal from './AssignModal.jsx';
import EditModal from './EidtModal.jsx';
import DetailsModal from './DetailsModal.jsx';
import './distributionTable.less';
@connect(state => state.personnel, actionCreators)
class DistributionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentPage: 1
    };
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        width: '10%',
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
        width: '8%',
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
        width: '8%',
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
        width: '8%',
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
        width: '8%'
      },
      {
        title: '操作',
        dataIndex: 'buttons',
        width: '27%',
        render: (text, record) => {
          const buttonsArr =
            text &&
            text.length &&
            text.map(item => {
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
            });
          return buttonsArr;
        }
      }
    ];
  }

  //打开分配简历弹窗
  handleOpenAssignModal = () => {
    const {
      changeAssignModalVisible,
      queryUserListInfoByRolePermission
    } = this.props;
    changeAssignModalVisible({
      assignModalVisible: true
    });
    queryUserListInfoByRolePermission({
      key: 'assign',
      value: 'interviewPerson'
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

  //多选项
  onSelectChange = (selectedRowKeys, a) => {
    const { changeSelectedRowKeys } = this.props;
    changeSelectedRowKeys(selectedRowKeys);
  };

  //分页查询
  handleTableChange = page => {
    const {
      queryAssignInterviewList,
      distriSearchValue,
      changeCurrentPage
    } = this.props;

    const arg0 = {
      currentPage: page,
      pageSize: 10,
      ...distriSearchValue
    };
    changeCurrentPage({
      interCurrentPage: 1,
      dispCurrentPage: page
    });
    queryAssignInterviewList(arg0);
  };

  render() {
    const columns = this.columns;
    const {
      assignList = [],
      selectedRowKeys,
      assignTotal,
      dispCurrentPage
    } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div>
        <Row className="distribution-table">
          <Col style={{ textAlign: 'right', marginBottom: '20px' }}>
            <Tooltip
              title={
                selectedRowKeys && selectedRowKeys.length
                  ? ''
                  : '请先选择分配项'
              }
            >
              <Button
                style={{ marginRight: '20px' }}
                disabled={
                  selectedRowKeys && selectedRowKeys.length ? false : true
                }
                onClick={this.handleOpenAssignModal}
                type="primary"
              >
                分配简历
              </Button>
            </Tooltip>
          </Col>
          <Col className="distribution-table-data">
            <Table
              rowKey={(record, index) => record.id}
              columns={columns}
              rowSelection={rowSelection}
              dataSource={assignList}
              pagination={false}
            />
          </Col>
          <Col className="distribution-paging">
            <Pagination
              total={assignTotal}
              showTotal={assignTotal => `共 ${assignTotal} 条数据`}
              current={dispCurrentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
          <AssignModal selectedRowKeys={selectedRowKeys} />
          <DetailsModal />
        </Row>
      </div>
    );
  }
}

export default DistributionTable;
