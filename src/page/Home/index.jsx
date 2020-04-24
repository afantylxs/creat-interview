import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import Position from '../../components/Position';
import { hotSearch, positionData, newsTitle } from '../../utils/data.js';
import './index.less';

@connect((state) => state.home, actionCreators)
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: '',
    };
  }

  handleChangeValue = (e) => {
    const { changeSearchInput } = this.props;
    const value = e.target.value;
    changeSearchInput(value);
  };

  render() {
    const { serachValue } = this.props;
    return (
      <div>
        <Row>
          <Col span={24} className="layout-home">
            <img
              className="layout-home-banner"
              src="https://img.alicdn.com/tfs/TB14TEEm7CWBuNjy0FaXXXUlXXa-1440-478.png"
            />
            <div className="layout-home-search">
              <p>If not now, when?</p>
              <p>If not me, who?</p>
              <p className="search-title">此时此刻，非我莫属！</p>
              <div className="home-search-btn">
                <Input
                  value={serachValue}
                  className="home-search-input"
                  onChange={(e) => this.handleChangeValue(e)}
                />
                <Button className="search-click">搜索</Button>
              </div>
              <div className="search-hot">
                <span>热门搜索：</span>
                {hotSearch.map((item, index) => {
                  return (
                    <span className="search-hot-span" key={index}>
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="layout-home-content">
              <Position positionData={positionData} newsTitle={newsTitle} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
