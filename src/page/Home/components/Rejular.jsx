import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import './rejular.less';

@connect(state => state.home, actionCreators)
class Rejular extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getRejularList, changeRejularList } = this.props;
    getRejularList();
  }
  render() {
    const { rejularList, regularTotal } = this.props;
    console.log('regularTotal', regularTotal);

    return (
      <div className="rejular" style={{ padding: '10px' }}>
        {rejularList.map((item, index) => {
          return (
            <span key={index} className="rejular-content">
              {item.empName}将在
              <span style={{ color: '#658ef7' }}>{item.regularTime}</span>
              天后转正
            </span>
          );
        })}
        <div className="rejular-pagination">
          <Pagination current={1} pageSize={6} total={regularTotal} />
        </div>
      </div>
    );
  }
}

export default Rejular;
