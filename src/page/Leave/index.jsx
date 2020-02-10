import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Form,
  Select,
  Input,
  Upload,
  message,
  Tooltip
} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import SearchForm from './components/searchForm.jsx';
import fetch from '../../utils/axios.config';
// import { actionCreators } from '../BasicInformation/store';

import './index.less';
const { Search } = Input;
const { Option } = Select;

const data = [
  {
    key: '1',
    empName: 'John Brown',
    ipsaBuDeptId: 32,
    ipsaDeptId: 'New York No. 1 Lake Park',
    empNo: 111
  }
];
// @connect(state => state.basic, actionCreators)
class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: '150px'
      },
      {
        title: 'BU',
        dataIndex: 'bu',
        width: '150px'
      },
      {
        title: '部门',
        dataIndex: 'bumen',
        width: '150px'
      },
      {
        title: '软通工号',
        dataIndex: 'empNo',
        width: '150px'
      },
      {
        title: '阿里离项时间',
        dataIndex: 'alworkId',
        width: '150px'
      },
      {
        title: '阿里离项原因',
        dataIndex: 'entryp',
        width: '150px'
      },
      {
        title: '阿里离项类型',
        dataIndex: 'onepost',
        width: '150px'
      },
      {
        title: '业务线反馈离职原因',
        dataIndex: 'twopost',
        width: '150px'
      },
      {
        title: '业务线反馈离职类型',
        dataIndex: 'threepost',
        width: '150px'
      },
      {
        title: '业务线反馈离职分类',
        dataIndex: 'hierarchy',
        width: '150px'
      },
      {
        title: '离职提出时间',
        dataIndex: 'direction',
        width: '150px'
      },
      {
        title: '离职生效日',
        dataIndex: 'frame',
        width: '150px'
      },
      {
        title: '离职时状态',
        dataIndex: 'careergroup',
        width: '150px'
      },
      {
        title: 'IPSA离职原因',
        dataIndex: 'businessunit',
        width: '150px'
      },
      {
        title: 'HR三月后离职分类',
        dataIndex: 'entryname',
        width: '150px'
      },
      {
        title: 'HR一月后离职类型',
        dataIndex: 'business',
        width: '150px'
      },
      {
        title: 'HR一月后沟通离职原因',
        dataIndex: 'projecttype',
        width: '150px'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        fixed: 'right',
        render: (text, record) => {
          return <Button>编辑</Button>;
        }
      }
    ];
  }

  componentDidMount() {
    fetch.get('/api/user/queryUserPermission.json').then(res => {
      if (res && res.success) {
        const { data } = res;
        const permission = data[0].permission;
        this.setState({
          permission
        });
      }
    });
  }

  //上传前的文件校验
  handleBeforeUpload = (file, fileList) => {
    if (
      file &&
      file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      message.error('请上传以.xlsx为后缀的Excel文件');
      return;
    }
  };

  //导入数据提醒
  handleChangeFile = ({ file, fileList }) => {
    const { queryProjectRecordInfoList } = this.props;

    if (file && file.status === 'done' && file.response.success) {
      message.success(
        file.response.message + '，共导入' + file.response.data + '条数据'
      );
      queryProjectRecordInfoList({
        currentPage: 1,
        pageSize: 20
      });
    } else {
      if (file && file.status === 'done' && !file.response.success) {
        message.error('导入失败:' + file.response.message);
      }
      if (file && file.status === 'error') {
        if (file.error.status === 401) {
          message.error('导入失败，请重新登录');
        } else {
          message.error('导入失败:' + file.response.message);
        }
      }
    }
  };

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    axios({
      method: 'get',
      url: '/api/project/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      params: {},
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
    const columns = this.columns;
    const token = localStorage.getItem('token');
    const { basicList } = this.props;
    const { permission } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="leave-information">
        <Row style={{ padding: '30px' }}>
          <Col span={24}>
            <Row className="leave-operator-set">
              <Col span={8}>
                <Search
                  style={{ width: '50%', marginLeft: '20px' }}
                  placeholder="输入姓名或软通工号"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <div
                  style={{
                    width: '64px',
                    display: 'inline-block',
                    marginRight: '7%'
                  }}
                >
                  <Upload
                    disabled={
                      (permission && permission === 'projectManage') ||
                      permission === 'admin' ||
                      permission === 'hr'
                        ? false
                        : true
                    }
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    action="/api/project/import/projectRecordInfo.json"
                    method="post"
                    headers={{
                      Authorization: 'Bearer ' + token
                    }}
                    showUploadList={false}
                    onChange={this.handleChangeFile.bind(this)}
                    beforeUpload={this.handleBeforeUpload.bind(this)}
                  >
                    <Tooltip title="支持导入.xlsx文件">
                      <Button
                        disabled={
                          (permission && permission === 'projectManage') ||
                          permission === 'admin' ||
                          permission === 'hr'
                            ? false
                            : true
                        }
                        type="primary"
                      >
                        导入
                      </Button>
                    </Tooltip>
                  </Upload>
                </div>
                <div
                  style={{
                    width: '64px',
                    display: 'inline-block',
                    marginRight: '2%'
                  }}
                >
                  <Button
                    disabled={
                      (permission && permission === 'projectManage') ||
                      permission === 'admin' ||
                      permission === 'hr'
                        ? false
                        : true
                    }
                    type="primary"
                    onClick={this.handleDownload.bind(this)}
                  >
                    导出
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <SearchForm />
          </Col>
          <Col span={24}>
            <Table columns={columns} dataSource={data} scroll={{ x: '100%' }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Department);
