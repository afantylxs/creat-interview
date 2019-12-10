import React, { Component } from 'react'
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Menu } from 'antd';
import Header from '../Header'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Link to="/home">首页</Link>
                <Link to="/login">详情</Link>
            </div>
        )
    }
}