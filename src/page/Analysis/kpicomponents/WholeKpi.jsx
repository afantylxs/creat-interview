import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Button, Table, DatePicker } from 'antd';
import { connect } from 'react-redux';

import { actionCreators } from '../store';
import './turnoverRate.less';
const { MonthPicker } = DatePicker;

@connect(state => state.analysis, actionCreators)
class WholeKpi extends Component {
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
    const { queryKpiWeekJobTypeDataAnalysis } = this.props;
    queryKpiWeekJobTypeDataAnalysis(dateString);
  };
  render() {
    const { wohleKpiList, wohleKpitableTitleInfoList } = this.props;
    return (
      <div className="turnover-rate">
        <Row>
          <Col span={24}>
            <span>时间筛选：</span>
            <MonthPicker
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
              columns={wohleKpiList && wohleKpiList.length ? wohleKpiList : []}
              dataSource={
                wohleKpiList && wohleKpiList.length
                  ? wohleKpitableTitleInfoList
                  : []
              }
              scroll={{ x: '100%' }}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default WholeKpi;
