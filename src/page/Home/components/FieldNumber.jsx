import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import './fieldNumber.less';
import { actionCreators } from '../store';

const columns = [
  {
    title: '地址',
    dataIndex: 'areaName',
    width: '50%',
    key: 1
  },
  {
    title: '人数',
    dataIndex: 'areaEmployeeTotal',
    width: '50%',
    key: 2
  }
];

@connect(state => state.home, actionCreators)
class FieldNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getFieldList } = this.props;
    getFieldList();
  }
  render() {
    const { fieldList } = this.props;
    const paginationObj = {
      pageSize: 3
    };
    return (
      <div className="fieldNumber" style={{ padding: '10px' }}>
        <Table
          rowKey={(record, index) => index}
          columns={columns}
          dataSource={fieldList}
          pagination={paginationObj}
        />
      </div>
    );
  }
}

export default FieldNumber;
