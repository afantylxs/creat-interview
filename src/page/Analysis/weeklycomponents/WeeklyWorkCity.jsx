import React, { Component } from 'react';
import { Row, Col, Button, Table, Input, Pagination, DatePicker } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';

@connect(state => state.analysis, actionCreators)
class WeeklyWorkCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      endDate: ''
    };
    this.columns = [
      {
        title: '序号',
        dataIndex: 'serial'
      },
      {
        title: '工作地点',
        dataIndex: 'workCityName'
      },
      {
        title: '业务线',
        dataIndex: 'businessLine'
      },
      {
        title: '小计',
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
    const { queryEmployeeCountByWorkCity } = this.props;

    queryEmployeeCountByWorkCity({ currentPage: 1, endDate });
    this.setState({
      currentPage: 1
    });
  };

  //分页
  handleTableChange = page => {
    const { endDate } = this.state;
    const arg0 = {
      currentPage: page,
      pageSize: 10,
      endDate
    };
    const { queryEmployeeCountByWorkCity } = this.props;
    queryEmployeeCountByWorkCity(arg0);
    this.setState({
      currentPage: page
    });
  };
  render() {
    const columns = this.columns;
    const { currentPage } = this.state;
    const { weeklyCityDataList, weeklyCityTotal } = this.props;
    return (
      <div className="turnover-rate">
        <Row>
          <Col span={24}>
            <span>时间筛选：</span>
            <DatePicker
              showToday={false}
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
              dataSource={weeklyCityDataList}
              scroll={{ x: '100%' }}
              pagination={false}
            />
          </Col>
          <Col className="general-paging" span={24}>
            <Pagination
              total={weeklyCityTotal}
              showTotal={weeklyCityTotal => `共 ${weeklyCityTotal} 条数据`}
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

export default WeeklyWorkCity;
