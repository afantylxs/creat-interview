import React, { Component } from 'react';
import { Table } from 'antd';
import './birthdayReminder.less'

const columns = [
    {
        title: '月份',
        dataIndex: 'month',
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
        month: '3月',
        number: 10,
    },
    {
        month: '4月',
        number: 10,
    },
    {
        month: '5月',
        number: 10,
    },
    {
        month: '6月',
        number: 10,
    }
]

export default class BirthdayReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="birthdat" style={{padding: '10px'}} >
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>
        )
    }
}