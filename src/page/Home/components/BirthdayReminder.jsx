import React, { Component } from 'react';
import { Table } from 'antd';
import fetch from '../../../utils/axios.config'
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

    componentDidMount() {
        // const token = localStorage.getItem("token");
        // fetch.get('/api/home/queryEmployeeBirthdayCountByMonth.json', {
        //     params: {
        //         currentPage: '1',
        //         pageSize: '3',
        //         token,
        //     }
                
        // }).then(res => {
        //     console.log('生日', res);
            
        // })
    }
    render() {
        return (
            <div className="birthdat" style={{padding: '10px'}} >
                <Table rowKey={(record, index) => index} columns={columns} dataSource={data} pagination={false} />
            </div>
        )
    }
}