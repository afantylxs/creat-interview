import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import './index.less';

let num = 2;
let time = '';

export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: null,
      data: [],
    };
  }
  componentDidMount() {
    // 开启定时器并拿到传入组件的数据
    time = setInterval(this.broadcastAnimation, 65);
    const { positionData } = this.props;
    this.setState({
      data: positionData,
    });
  }

  broadcastAnimation = () => {
    num = num + 2;

    // 最后一条内容移动至顶端时重置top定位
    if (num > 330) {
      num = 0;
    }

    // 最后一条数据滚动出现时复制一份数据
    if (num === 100) {
      const { data } = this.state;
      const newData = [];
      data.forEach((item) => {
        newData.push(item);
      });
      this.setState({
        data: newData.concat(data),
      });
    }

    // 最后一套数据滚动至最上层删除掉复制的数据
    if (num === 330) {
      const { data } = this.state;
      data.splice(10);
      this.setState({
        data,
      });
    }
    const p = document.getElementsByClassName('content-animation');
    p[0].style.top = '-' + num + 'px';
  };

  componentWillUnmount() {
    // 清除定时器
    clearInterval(time);

    // 重置定位
    num = 0;
  }
  render() {
    const { data } = this.state;
    const { newsTitle } = this.props;

    return (
      <div className="position">
        <Row>
          <Col>
            <Card
              title={newsTitle}
              extra={<a href="#">更多</a>}
              style={{ width: 300 }}
              className={'position-content'}
            >
              <div className="content-animation">
                {data.map((item, index) => {
                  return <p key={index}> {item} </p>;
                })}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
