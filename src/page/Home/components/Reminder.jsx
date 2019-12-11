import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './reminder.less'

export default class Reminder extends Component {
    render() {
        return (
            <div className="layout-home-reminder">
                <div className="layout-home-reminder-content">
                    <div className="reminder-entry">12月入职人数</div>
                    <div className="entry-number">50</div>
                </div>
                <div className="entry-number-line"></div>
                <div className="layout-home-reminder-content">
                    <div className="reminder-entry">12月离职人数</div>
                    <div style={{color: '#658ef7'}} className="entry-number">10</div>
                </div>
            </div>
        )
    }
}