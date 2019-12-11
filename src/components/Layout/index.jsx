import React, { Component } from 'react'
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Menu } from 'antd';
import Header from '../../page/Header'
import Home from '../../page/Home'

export default class Home extends Component {
    render() {
        console.log('home.this',this.props);
        
        return (
            <div>
                <Home>
                    <Header />
                    <span>11</span>
                </Home>
            </div>
        )
    }
}