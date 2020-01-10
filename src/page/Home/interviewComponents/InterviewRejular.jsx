import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

@connect(state => state.home, actionCreators)
class InterviewRejular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rejularPage: 1
    };
  }

  componentDidMount() {
    const { queryResumeWillRelease } = this.props;
    const arg0 = {
      pageSize: 6,
      currentPage: 1
    };
    queryResumeWillRelease(arg0);
  }

  render() {
    const { interviewRejularList, interviewRejularTotal } = this.props;
    return (
      <div className="rejular" style={{ padding: '10px' }}>
        {/* <span className="rejular-content">
          xxxx将在
          <span style={{ color: '#658ef7' }}>xxx</span>
          h后释放
        </span> */}
        {interviewRejularList.map((item, index) => {
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
            current={1}
            pageSize={6}
            total={interviewRejularTotal}
            // onChange={this.handleChangeRejularPage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default InterviewRejular;
