import React, { Component } from 'react';
import { Row, Col, Button, Table, Input, Pagination, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { actionCreators } from '../store';

@connect(state => state.analysis, actionCreators)
class WeeklyBuDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: null,
      currentPage: 1
    };
    this.columns = [
      {
        title: '序号',
        dataIndex: 'serial'
      },
      {
        title: '部门',
        dataIndex: 'ipsaDeptName'
      },
      {
        title: '人数',
        dataIndex: 'subtotal'
      }
    ];
  }
  onChangeTurnoverRate = (date, dateString) => {
    this.setState({
      endDate: dateString
    });
  };

  handleSearchTurnoverRate = () => {
    const { endDate } = this.state;
    const { queryEmployeeCountByDept } = this.props;
    queryEmployeeCountByDept({ endDate });
  };

  //分页
  handleTableChange = page => {
    const { endDate } = this.state;
    const arg0 = {
      currentPage: page,
      pageSize: 10,
      endDate
    };
    const { queryEmployeeCountByDept } = this.props;
    queryEmployeeCountByDept(arg0);
    this.setState({
      currentPage: page
    });
  };

  render() {
    const columns = this.columns;
    const { currentPage, endDate } = this.state;
    console.log('endDate', endDate);

    const { weeklyDataList, weeklyTotal } = this.props;
    return (
      <div className="turnover-rate">
        <Row>
          <Col span={24}>
            <span>时间筛选：</span>
            <DatePicker
              showToday={false}
              value={endDate ? moment(endDate) : null}
              onChange={this.onChangeTurnoverRate}
              placeholder="请选择日期"
            />
            <Button
              onClick={this.handleSearchTurnoverRate.bind(this)}
              type="primary"
              className="turnover-rate-search-btn"
            >
              查询
            </Button>
          </Col>
          <Col className="turnover-rate-content-table" span={24}>
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={weeklyDataList}
              scroll={{ x: '100%' }}
              pagination={false}
            />
          </Col>
          <Col className="general-paging" span={24}>
            <Pagination
              total={weeklyTotal}
              showTotal={weeklyTotal => `共 ${weeklyTotal} 条数据`}
              current={currentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default WeeklyBuDepartment;
