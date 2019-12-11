import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Menu } from 'antd';
import Header from '../Header';
import Home from '../Home';
const authPatch = ['/', '/home', '/basic', '/project']

class Layout extends Component {
    render() {
        const { pathname } = this.props.location;
        const errorPage = authPatch.includes(pathname)
        return (
            <div>
                {
                    errorPage ? 
                    <div>
                        <Header/>
                        <div >
                            { this.props.children ? this.props.children : <Home/> }
                        </div>
                    </div> : 
                    <div>
                        404
                    </div>
                }
                
            </div>
        )
    }
}

export default  withRouter(Layout)