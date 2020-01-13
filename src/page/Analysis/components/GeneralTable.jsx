import React, { Component } from 'react';
import { Row, Col, Button, Table, Input, Pagination, message } from 'antd';
import axios from 'axios';

import { generalTableColumns } from '../../../utils/tableTitle.config';

import './generalTable.less';
const { Search } = Input;
export default class GeneralTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      currentPage: 1
    };
  }

  //修改搜索框的值
  handleChangeSearchInput = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  //搜索框调用查询列表
  handleSearchInput = value => {
    console.log('value', value);
    const { queryAllEmployeeInfoList } = this.props;
    const arg1 = {
      currentPage: 1,
      pageSize: 10,
      keyword: value
    };
    queryAllEmployeeInfoList(arg1);
  };

  //切换分页
  handleTableChange = page => {
    const { queryAllEmployeeInfoList } = this.props;
    this.setState(
      {
        currentPage: page
      },
      () => {
        const { currentPage, keyword } = this.state;
        const arg1 = {
          currentPage,
          pageSize: 10,
          keyword
        };
        queryAllEmployeeInfoList(arg1);
      }
    );
  };

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    const { keyword } = this.state;
    axios({
      method: 'get',
      url: '/api/analysis/baseInfo/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      params: {
        keyword
      },
      responseType: 'blob'
    })
      .then(res => {
        if (res.status === 200) {
          const blob = new Blob([res.data], {
            type:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          });
          const url = window.URL.createObjectURL(blob);
          const aLink = document.createElement('a');
          aLink.style.display = 'none';
          aLink.href = url;
          aLink.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(aLink);
          aLink.click();
          document.body.removeChild(aLink); //下载完成移除元素
          window.URL.revokeObjectURL(url);
          message.success('导出成功');
        } else {
          message.error('导出失败');
        }
      })
      .catch(err => {
        message.error('导出失败');
      });
  };
  render() {
    const { keyword, currentPage } = this.state;
    const { generalData = [], generalTotal } = this.props;
    console.log('generalData', generalData);

    return (
      <div className="general-analysis">
        <Row className="general-operator-set">
          <Col span={22}>
            <Search
              value={keyword}
              onSearch={value => this.handleSearchInput(value)}
              onChange={value => this.handleChangeSearchInput(value)}
              className="general-seatch-input"
              placeholder="输入姓名或软通工号"
              enterButton
            />
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <Button
              className="general-download-btn"
              onClick={this.handleDownload.bind(this)}
              type="primary"
            >
              导出
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: '10px' }}>
            <Table
              rowKey={(record, index) => index}
              columns={generalTableColumns}
              dataSource={generalData}
              scroll={{ x: '100%' }}
              pagination={false}
            />
          </Col>
          <Col className="general-paging" span={24}>
            <Pagination
              total={generalTotal}
              showTotal={generalTotal => `共 ${generalTotal} 条数据`}
              current={currentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
