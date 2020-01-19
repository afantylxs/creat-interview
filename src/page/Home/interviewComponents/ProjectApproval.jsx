import React, { Component } from 'react';
import { Table, Button, message, Tooltip } from 'antd';

import fetch from '../../../utils/axios.config';

export default class ProjectApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectApprovalList: [],
      projectApprovalTotal: 0
    };
    this.columns = [
      {
        title: '项目',
        dataIndex: 'projectName',
        width: '40%',
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
        title: '人数',
        dataIndex: 'interviewPassTotal',
        width: '40%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '20%',
        render: (text, render) => {
          return <Button>查看</Button>;
        }
      }
    ];
  }

  componentDidMount() {
    const arg0 = {
      currentPage: 1,
      pageSize: 3
    };
    this.queryProjectInterviewPassCount(arg0);
  }

  //获取资源经理待分配的面试简历
  queryProjectInterviewPassCount = arg0 => {
    fetch
      .get('/api/audition/home/queryProjectInterviewPassCount.json', {
        params: arg0
      })
      .then(res => {
        if (res && res.success) {
          const { total, data = [] } = res.data;
          this.setState({
            projectApprovalList: data,
            projectApprovalTotal: total
          });
          console.log('res', res);
        } else {
          message.error('出错了，请稍后再试');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };

  handleChangePage = page => {
    const arg0 = {
      pageSize: 3,
      currentPage: page
    };
    this.queryProjectInterviewPassCount(arg0);
  };
  render() {
    const columns = this.columns;
    const { projectApprovalList, projectApprovalTotal } = this.state;
    const paginationObj = {
      pageSize: 3,
      total: projectApprovalTotal,
      onChange: this.handleChangePage
    };
    return (
      <div style={{ padding: '5px' }}>
        <Table
          rowKey={(record, index) => index}
          columns={columns}
          dataSource={projectApprovalList}
          pagination={paginationObj}
        />
      </div>
    );
  }
}
