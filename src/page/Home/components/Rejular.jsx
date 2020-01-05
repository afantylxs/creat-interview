import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import './rejular.less';

@connect(state => state.home, actionCreators)
class Rejular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rejularPage: 1
    };
  }
  componentDidMount() {
    const { getRejularList } = this.props;
    const arg0 = {
      pageSize: 6,
      currentPage: 1
    };
    getRejularList(arg0);
  }

  handleChangeRejularPage = page => {
    const { getRejularList } = this.props;
    const arg0 = {
      pageSize: 6,
      currentPage: page
    };
    this.setState(
      {
        rejularPage: page
      },
      () => {
        getRejularList(arg0);
      }
    );
  };
  render() {
    const { rejularList, regularTotal } = this.props;
    const { rejularPage } = this.state;
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
          <Pagination
            current={rejularPage}
            pageSize={6}
            total={regularTotal}
            onChange={this.handleChangeRejularPage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Rejular;
