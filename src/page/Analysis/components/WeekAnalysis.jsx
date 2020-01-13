import React, { Component } from 'react';
import { Row, Col, DatePicker, Button, Table } from 'antd';
import moment from 'moment';

import { weekAnalysisColumns } from '../../../utils/tableTitle.config';
import './weekAnalysis.less';

const { WeekPicker } = DatePicker;
export default class WeekAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYear: '',
      showWeek: '',
      weekTimeFormat: ''
    };
  }

  //选择日期
  onChangeWeekAnalysis = (date, dateString) => {
    this.setState({
      weekTimeFormat: date ? moment(date).format('YYYY-MM-DD') : ''
    });
  };

  //查询调用
  handleSearchWeekAnalysis = () => {
    const { weekTimeFormat } = this.state;
    const { queryEmployeeWeekDataAnalysis } = this.props;
    const arg0 = {
      weekTimeFormat: weekTimeFormat
    };
    queryEmployeeWeekDataAnalysis(arg0);
  };
  render() {
    const { weekData } = this.props;
    return (
      <div className="week-analysis">
        <Row>
          <Col className="week-analysis-height" span={2}>
            <span>{weekData ? weekData.year : ''}</span>
            <span>{weekData ? '第' + weekData.week + '周' : ''}</span>
          </Col>
          <Col span={22}>
            <span>周期筛选：</span>
            <WeekPicker
              onChange={this.onChangeWeekAnalysis}
              placeholder="请选择日期"
              format="YYYY-MM-DD"
            />
            <Button
              onClick={this.handleSearchWeekAnalysis.bind(this)}
              type="primary"
              className="week-analysis-search-btn"
            >
              查询
            </Button>
          </Col>
          <Col span={24} className="week-analysis-table-style">
            <Table
              rowKey={(record, index) => index}
              columns={weekAnalysisColumns}
              dataSource={weekData ? weekData.dataAnalysisList : []}
              bordered
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
