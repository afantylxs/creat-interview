import React, { Component } from 'react';
import { Pagination } from 'antd';
import './rejular.less'

const arr = [
    {
        name: '刘晓森',
        days: '15'
    },
    {
        name: '刘晓森',
        days: '15'
    },
    {
        name: '刘晓森',
        days: '15'
    },
    {
        name: '刘晓森',
        days: '15'
    },
    {
        name: '刘晓森',
        days: '15'
    },
    {
        name: '刘晓森',
        days: '15'
    }

]


export default class Rejular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="rejular" style={{padding: '10px'}} >
                {
                    arr.map( item => {
                        return (
                    <span className="rejular-content">{item.name}将在<span style={{color: '#658ef7'}}>{item.days}</span>天后转正</span>
                        )
                    })
                }
                <div className="rejular-pagination">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        )
    }
}