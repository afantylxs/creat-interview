import React, { Component } from 'react';
import { Table, message } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
// import fetch from '../../../utils/axios.config';
import './birthdayReminder.less';
import { actionCreators } from '../store';

const columns = [
  {
    title: '月份',
    dataIndex: 'birthdayMonthCode',
    width: '50%',
    key: 1
  },
  {
    title: '人数',
    dataIndex: 'birthdayMonthTotal',
    width: '50%',
    key: 2
  }
];

const data = [
  {
    birthdayMonthCode: '3月',
    birthdayMonthTotal: 10
  },
  {
    birthdayMonthCode: '4月',
    birthdayMonthTotal: 10
  },
  {
    birthdayMonthCode: '5月',
    birthdayMonthTotal: 10
  },
  {
    birthdayMonthCode: '6月',
    birthdayMonthTotal: 10
  }
];

@connect(state => state.home, actionCreators)
class BirthdayReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const token = localStorage.getItem("token");
    const { getBirthdayList } = this.props;
    getBirthdayList();
  }
  render() {
    const paginationObj = {
      pageSize: 3
    };
    const { birthdayList } = this.props;
    return (
      <div className="birthdat" style={{ padding: '10px' }}>
        <Table
          rowKey={(record, index) => index}
          columns={columns}
          dataSource={birthdayList}
          pagination={paginationObj}
        />
      </div>
    );
  }
}
export default BirthdayReminder;
