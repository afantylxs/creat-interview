import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './index.less';

export default class Error extends Component {
  render() {
    return (
      <div className="error">
        <Row>
          <Col span={24}>
            <div className="error-img">
              <img src={require('../../images/404.png')} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
