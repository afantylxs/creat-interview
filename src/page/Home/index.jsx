import React, { Component } from 'react'
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Menu } from 'antd';
import Header from '../Header'

export default class Home extends Component {
    render() {
        console.log('home.this',this.props);
        const { pathname } = this.props.location;
        
        return (
            <div>
                <Header/>
                <div >
                        { this.props.children && this.props.children }
                    </div>
            </div>
        )
    }
}