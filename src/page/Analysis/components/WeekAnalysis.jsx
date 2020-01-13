import React, { Component } from 'react';
import { Row, Col, DatePicker, Button, Table } from 'antd';
import moment from 'moment';

import { weekAnalysisColumns } from '../../../utils/tableTitle.config';
import './weekAnalysis.less';

const weekOfday = moment().format('E');
const last_monday = moment()
  .subtract(weekOfday - 1, 'days')
  .format('YYYY-MM-DD');

const last_sunday = moment()
  .add(7 - weekOfday, 'days')
  .format('YYYY-MM-DD');

const { WeekPicker, RangePicker } = DatePicker;
export default class WeekAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYear: '',
      showWeek: '',
      weekTimeFormat: '',
      startTimeFormat: '',
      endTimeFormat: ''
    };
  }

  //选择日期
  onChangeWeekAnalysis = (date, dateString) => {
    this.setState({
      startTimeFormat: dateString[0] ? dateString[0] : last_monday,
      endTimeFormat: dateString[1] ? dateString[1] : last_sunday
    });
  };

  //查询调用
  handleSearchWeekAnalysis = () => {
    const { startTimeFormat, endTimeFormat } = this.state;
    const { queryEmployeeWeekDataAnalysis } = this.props;
    const arg0 = {
      startTimeFormat,
      endTimeFormat
    };
    queryEmployeeWeekDataAnalysis(arg0);
  };
  render() {
    const { weekData } = this.props;
    return (
      <div className="week-analysis">
        <Row>
          <Col span={24}>
            <span>自定义日期筛选：</span>
            <RangePicker
              onChange={this.onChangeWeekAnalysis}
              placeholder={['起始日期', '结束日期']}
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
