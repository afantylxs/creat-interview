import React, { Component } from 'react';
import { Row, Col, Button, Table, Input, Pagination, message } from 'antd';

const data = [
  {
    projectName: '阿里实施部',
    resumeUserName: '张三',
    resumeUserPhone: 123456789,
    interviewEndTime: '9102',
    positionType: 'javascript',
    resumeLock: 1
  }
];
export default class DistributionTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName'
      },
      {
        title: '简历面试者姓名',
        dataIndex: 'resumeUserName'
      },
      {
        title: '电话',
        dataIndex: 'resumeUserPhone'
      },
      {
        title: '截止时间',
        dataIndex: 'interviewEndTime'
      },
      {
        title: '职位类型',
        dataIndex: 'positionType'
      },
      {
        title: '锁定',
        dataIndex: 'resumeLock',
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
        dataIndex: 'action',
        render: (text, render) => {
          return (
            <div>
              <Button>详情</Button>
            </div>
          );
        }
      }
    ];
  }
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
        </Row>
      </div>
    );
  }
}
