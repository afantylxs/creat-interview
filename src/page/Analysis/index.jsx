import React, { Component } from 'react';
import { Row, Col, Tabs, message } from 'antd';
import moment from 'moment';
import fetch from '../../utils/axios.config';
import WeekAnalysis from './components/WeekAnalysis';
import GeneralTable from './components/GeneralTable';
import './index.less';
const { TabPane } = Tabs;

const weekOfday = moment().format('E');
const last_monday = moment()
  .subtract(weekOfday - 1, 'days')
  .format('YYYY-MM-DD');

const last_sunday = moment()
  .add(7 - weekOfday, 'days')
  .format('YYYY-MM-DD');
const arg0 = {
  startTimeFormat: last_monday,
  endTimeFormat: last_sunday
};

export default class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekData: null,
      activeKye: 'week',
      generalTotal: null,
      generalData: []
    };
  }
  handleChangeTabs = key => {
    this.setState(
      {
        activeKye: key
      },
      () => {
        const { activeKye } = this.state;
        switch (activeKye) {
          case 'week':
            this.queryEmployeeWeekDataAnalysis(arg0);
            break;
          case 'general':
            this.queryAllEmployeeInfoList();
            break;
          default:
            break;
        }
      }
    );
  };

  //获取周分析数据
  queryEmployeeWeekDataAnalysis = arg1 => {
    fetch
      .get('/api/analysis/queryEmployeeWeekDataAnalysis.json', {
        params: arg1
      })
      .then(res => {
        if (res.success && res.data) {
          this.setState({
            weekData: res.data
          });
        } else {
          message.error('周分析列表获取失败：' + res.message && res.message);
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };

  //获取一览表数据
  queryAllEmployeeInfoList = arg1 => {
    fetch
      .post('/api/analysis/queryAllEmployeeInfoList.json', arg1)
      .then(res => {
        if (res.success && res.data) {
          const { data = [], total } = res.data;
          this.setState({
            generalData: data,
            generalTotal: total
          });
        } else {
          message.error('周分析列表获取失败：' + res.message && res.message);
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };

  componentDidMount() {
    const { activeKye } = this.state;

    const arg1 = {
      currentPage: 1,
      pageSize: 10
    };
    switch (activeKye) {
      case 'week':
        this.queryEmployeeWeekDataAnalysis(arg0);
        break;
      case 'general':
        this.queryAllEmployeeInfoList(arg1);
        break;

      default:
        break;
    }
  }
  render() {
    const { activeKye, weekData, generalData, generalTotal } = this.state;
    return (
      <div className="analysis">
        <Row className="analysis-content">
          <Col>
            <Tabs
              animated={false}
              rowKey={(record, index) => index}
              defaultActiveKey={activeKye}
              onChange={this.handleChangeTabs}
              pagination={false}
            >
              <TabPane tab="周分析" key="week">
                <WeekAnalysis
                  weekData={weekData}
                  queryEmployeeWeekDataAnalysis={
                    this.queryEmployeeWeekDataAnalysis
                  }
                />
              </TabPane>
              <TabPane tab="一览表" key="general">
                <GeneralTable
                  generalData={generalData}
                  generalTotal={generalTotal}
                  queryAllEmployeeInfoList={this.queryAllEmployeeInfoList}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
