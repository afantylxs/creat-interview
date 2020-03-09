import React, { Component } from 'react';
import { Row, Col, Button, Table, Input, Pagination, DatePicker } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
import { turnoverRateColumns } from '../../../utils/tableTitle.config';
import './turnoverRate.less';

@connect(state => state.analysis, actionCreators)
class TurnoverRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: ''
    };
  }
  onChangeTurnoverRate = (date, dateString) => {
    this.setState({
      dateString
    });
  };

  handleSearchTurnoverRate = () => {
    const { dateString } = this.state;
    const { queryKpiWeekLeaveDataAnalysis } = this.props;
    queryKpiWeekLeaveDataAnalysis(dateString);
  };
  render() {
    const { turnoverRateList } = this.props;
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
              columns={turnoverRateColumns}
              dataSource={turnoverRateList}
              scroll={{ x: '100%' }}
              pagination={false}
            />
          </Col>
          <Col className="general-paging" span={24}>
            {/* <Pagination
              total={generalTotal}
              showTotal={generalTotal => `共 ${generalTotal} 条数据`}
              current={currentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            /> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default TurnoverRate;
