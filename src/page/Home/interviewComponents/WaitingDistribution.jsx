import React, { Component } from 'react';
import { Table, Button, message } from 'antd';

import fetch from '../../../utils/axios.config';

const data = [
  {
    resourceManagerName: '张三',
    assignResumeTotal: '10'
  }
];
export default class WaitingDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingList: [],
      waitingTotal: 0
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'resourceManagerName',
        width: '40%'
      },
      {
        title: '份数',
        dataIndex: 'assignResumeTotal',
        width: '40%'
      }
    ];
  }

  componentDidMount() {
    const arg0 = {
      currentPage: 1,
      pageSize: 3
    };
    this.queryResumeWillAssignCount(arg0);
  }

  //获取资源经理待分配的面试简历
  queryResumeWillAssignCount = arg0 => {
    fetch
      .get('/api/audition/home/queryResumeWillAssignCount.json', {
        params: arg0
      })
      .then(res => {
        if (res && res.success) {
          const { total, data = [] } = res.data;
          this.setState({
            waitingList: data,
            waitingTotal: total
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
    this.queryResumeWillAssignCount(arg0);
  };
  render() {
    const columns = this.columns;
    const { waitingList, waitingTotal } = this.state;
    const paginationObj = {
      pageSize: 3,
      total: waitingTotal,
      onChange: this.handleChangePage
    };
    return (
      <div style={{ padding: '5px' }}>
        <Table
          rowKey={(record, index) => index}
          columns={columns}
          dataSource={waitingList}
          pagination={paginationObj}
        />
      </div>
    );
  }
}
