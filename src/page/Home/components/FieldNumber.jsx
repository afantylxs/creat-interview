import React, { Component } from 'react';
import { Table } from 'antd';
import './fieldNumber.less'

const columns = [
    {
        title: '地址',
        dataIndex: 'address',
        width: '50%',
        key: 1,
      },
      {
        title: '人数',
        dataIndex: 'number',
        width: '50%',
        key: 2,
      },
]

const data = [
    {
        address: '西溪国际',
        number: 120,
    },
    {
        address: '蚂蚁Z空间',
        number: 108,
    },
    {
        address: '乐佳国际',
        number: 198,
    },
    {
        address: '德力西大厦',
        number: 345,
    }
]

export default class FieldNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="fieldNumber" style={{padding: '10px'}} >
                <Table rowKey={(record, index) => index} columns={columns} dataSource={data} pagination={false} />
            </div>
        )
    }
}