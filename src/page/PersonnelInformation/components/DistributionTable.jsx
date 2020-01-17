import React, { Component } from 'react';
import { Row, Col, Button, Table, Input, Pagination, message } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';

import AssignModal from './AssignModal.jsx';
import EditModal from './EidtModal.jsx';
import DetailsModal from './DetailsModal.jsx';
import './distributionTable.less';

const data = [
  {
    projectName: '阿里实施部',
    resumeUserName: '张三',
    resumeUserPhone: 123456789,
    interviewEndTime: '9102',
    positionType: 'javascript',
    resumeLock: 1,
    recruitmentLevel: '中级',
    buttons: ['assign', 'edit', 'detail', 'interview', 'download']
  }
];
@connect(state => state.personnel, actionCreators)
class DistributionTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        width: '10%'
      },
      {
        title: '简历面试者姓名',
        dataIndex: 'resumeUserName',
        width: '10%'
      },
      {
        title: '电话',
        dataIndex: 'resumeUserPhone',
        width: '10%'
      },
      {
        title: '截止时间',
        dataIndex: 'interviewEndTime',
        width: '10%'
      },
      {
        title: '职位类型',
        dataIndex: 'positionType',
        width: '10%'
      },
      {
        title: '招聘级别',
        dataIndex: 'recruitmentLevel',
        width: '10%'
      },
      {
        title: '锁定',
        dataIndex: 'resumeLock',
        width: '10%',
        render: (text, record) => {
          switch (text) {
            case 1:
              return <span>是</span>;
            case 2:
              return <span>否</span>;

            default:
              break;
          }
        }
      },
      {
        title: '操作',
        dataIndex: 'buttons',
        width: '25%',
        render: (text, render) => {
          const buttonsArr =
            text &&
            text.length &&
            text.map(item => {
              if (item === 'assign') {
                return (
                  <Button key={item} onClick={this.handleOpenAssignModal}>
                    分配
                  </Button>
                );
              }
              if (item === 'edit') {
                return (
                  <Button
                    key={item}
                    onClick={this.handleOpenEditModal}
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
                    onClick={this.handleOpenDetailsModal}
                    className="action-buttons"
                  >
                    详情
                  </Button>
                );
              }
              if (item === 'interview') {
                return (
                  <Button key={item} className="action-buttons">
                    面试
                  </Button>
                );
              }
              if (item === 'download') {
                return (
                  <Button key={item} className="action-buttons">
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
  //倒开分配简历弹窗
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

  //打开更新简历弹窗
  handleOpenEditModal = () => {
    const { changeEditModalVisible } = this.props;
    changeEditModalVisible({
      editModalVisible: true
    });
  };

  //打开详情弹窗
  handleOpenDetailsModal = () => {
    const { changeDetailsModalVisible } = this.props;
    changeDetailsModalVisible({
      detailsVisible: true
    });
  };
  render() {
    const columns = this.columns;
    return (
      <div>
        <Row className="distribution-table">
          <Col className="distribution-table-data">
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </Col>
          <AssignModal />
          <EditModal />
          <DetailsModal />
        </Row>
      </div>
    );
  }
}

export default DistributionTable;
