import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './reminder.less'

export default class Reminder extends Component {
    render() {
        return (
            <div className="layout-home-reminder">
                <div>12月入职人数</div>
                <div>50</div>
            </div>
        )
    }
}