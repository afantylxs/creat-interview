import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

@connect(state => state.home, actionCreators)
class InterviewRejular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
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

  //分页
  handleChangeInterviewRejularPage = page => {
    const { queryResumeWillRelease } = this.props;
    const arg0 = {
      pageSize: 6,
      currentPage: page
    };
    queryResumeWillRelease(arg0);
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { interviewRejularList, interviewRejularTotal } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="rejular" style={{ padding: '10px' }}>
        {interviewRejularList.map((item, index) => {
          return (
            <span key={index} className="rejular-content">
              <span style={{ color: '#658ef7' }}>{item.userName}</span>将在
              <span style={{ color: '#658ef7' }}>{item.releaseTime}</span>
              h后释放
            </span>
          );
        })}
        <div className="rejular-pagination">
          <Pagination
            current={currentPage}
            pageSize={6}
            total={interviewRejularTotal}
            onChange={this.handleChangeInterviewRejularPage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default InterviewRejular;
