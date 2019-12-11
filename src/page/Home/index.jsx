import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Reminder from './components/Reminder.jsx';
import BirthdayReminder from './components/BirthdayReminder.jsx'
import FieldNumber from './components/FieldNumber.jsx'
import Rejular from './components/Rejular.jsx'
import './index.less';
const homeList = ['提醒事项','生日提醒','转正提醒','场地人数']

export default class Home extends Component {
    render() {
        return (
            <div className="layout-home">
                <Row>
                   {homeList.map((item, index) => {
                    return (
                        <Col key={index} className="layout-home-col" span={12} style={{height: '400px'}}>
                            <h2 className="layout-home-title">{item}</h2>
                            <div className="layout-home-info">
                                <div>
                                    { 
                                        item === '提醒事项' && <Reminder/> || 
                                        item === '生日提醒' && <BirthdayReminder/> ||
                                        item === '场地人数' && <FieldNumber/> ||
                                        item === '转正提醒' && <Rejular/>
                                    
                                    }
                                    
                                </div>
                            </div>
                        </Col>
                    )
                   })}
                 </Row>
            </div>
        )
    }
}