import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Form,
  Select,
  Input,
  Pagination,
  Upload,
  message,
  Tooltip
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import EducationModal from './components/EducationModal.jsx';
import {
  uniformFlagEnum,
  educationCodeEnum,
  httAddress
} from '../../utils/optionEnum';
import './index.less';
const { Search } = Input;
const { Option } = Select;

@connect(state => state.educ, actionCreators)
class EducationInfo extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'BU',
        dataIndex: 'ipsaBuDeptName',
        width: '15%'
      },
      {
        title: '部门',
        dataIndex: 'ipsaDeptName',
        width: '15%'
      },
      {
        title: '姓名',
        dataIndex: 'empName',
        width: '10%'
      },
      {
        title: '软通工号',
        dataIndex: 'empNo',
        width: '10%'
      },
      {
        title: '毕业学校',
        dataIndex: 'graduatedUniversities',
        width: '15%'
      },
      {
        title: '专业',
        dataIndex: 'majorName',
        width: '15%'
      },
      {
        title: '学历',
        dataIndex: 'educationCode',
        width: '6%',
        render: (text, record) => {
          switch (text) {
            case 0:
              return <span>高中</span>;
            case 1:
              return <span>中专</span>;
            case 2:
              return <span>大专</span>;
            case 3:
              return <span>本科</span>;
            case 4:
              return <span>硕士</span>;
            case 5:
              return <span>博士</span>;
            case 6:
              return <span>博士后</span>;
            case 7:
              return <span>院士</span>;
            default:
              break;
          }
        }
      },
      {
        title: '是否统招',
        dataIndex: 'uniformFlag',
        width: '9%',
        render: (text, record) => {
          switch (text) {
            case 0:
              return <span>非</span>;
            case 1:
              return <span>是</span>;
            default:
              break;
          }
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '5%',
        render: (text, record) => {
          return (
            <span
              className="educ-action-span"
              onClick={this.handleShowModal.bind(this, record)}
            >
              编辑
            </span>
          );
        }
      }
    ];
  }

  //打开编辑框
  handleShowModal = record => {
    const { changeEducationVisible, dictInfo } = this.props;
    const imgUrl = [];
    record.avatar &&
      record.avatar.length &&
      record.avatar.forEach(item => {
        if (item) {
          imgUrl.push({
            fileId: item.id,
            uid: item.id,
            name: 'image.png',
            status: 'done',
            url: httAddress + item.url
          });
        }
      });
    changeEducationVisible({
      educVisible: true,
      record,
      imageUrl: imgUrl,
      fileId: ''
    });
    dictInfo();
  };

  componentDidMount() {
    const { deptInfoBu, queryEducationRecordInfoList } = this.props;
    const educStatusFlag = localStorage.getItem('educStatusFlag');
    queryEducationRecordInfoList({
      currentPage: 1,
      pageSize: 10,
      statusFlag: educStatusFlag
    });
    deptInfoBu();
  }

  //BU列表
  handleChangeBuDeptId = value => {
    const {
      deptInfo,
      changeDepList,
      changeCurrentPageData,
      currentPageData
    } = this.props;
    if (value) {
      const newCurrentPageData = JSON.parse(JSON.stringify(currentPageData));
      newCurrentPageData.ipsaDeptId = '';
      changeCurrentPageData(newCurrentPageData);
      deptInfo(value);
      this.props.form.resetFields();
    } else {
      changeDepList([]);
    }
  };

  //分页查询
  handleTableChange = page => {
    const {
      queryEducationRecordInfoList,
      changeCurrentPageData,
      currentPageData
    } = this.props;
    const educStatusFlag = localStorage.getItem('educStatusFlag');
    const arg0 = {
      currentPage: page,
      pageSize: 10,
      educationCode: currentPageData.educationCode,
      uniformFlag: currentPageData.uniformFlag,
      ipsaBuDeptId: currentPageData.ipsaBuDeptId,
      ipsaDeptId: currentPageData.ipsaDeptId,
      keyword: currentPageData.keyword,
      statusFlag: educStatusFlag
    };
    changeCurrentPageData(arg0);
    queryEducationRecordInfoList(arg0);
  };

  //导入数据提醒
  handleChangeFile = ({ file, fileList }) => {
    const { queryEducationRecordInfoList } = this.props;
    if (file && file.status === 'done' && file.response.success) {
      message.success(
        file.response.message + '，共导入' + file.response.data + '条数据'
      );
      queryEducationRecordInfoList({
        currentPage: 1,
        pageSize: 20
      });
    } else {
      if (file && file.status === 'done' && !file.response.success) {
        message.error('上传失败:' + file.response.message);
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

  //导出excel
  handleDownload = () => {
    const token = localStorage.getItem('token');
    const { currentPageData } = this.props;
    const educStatusFlag = localStorage.getItem('educStatusFlag');
    axios({
      method: 'get',
      url: '/api/education/download',
      headers: {
        Authorization: 'Bearer ' + token
      },
      params: {
        educationCode: currentPageData.educationCode,
        uniformFlag: currentPageData.uniformFlag,
        ipsaBuDeptId: currentPageData.ipsaBuDeptId,
        ipsaDeptId: currentPageData.ipsaDeptId,
        keyword: currentPageData.keyword,
        statusFlag: educStatusFlag
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

  //搜索框调用查询列表
  handleSearchInput = value => {
    const { queryEducationRecordInfoList, changeCurrentPageData } = this.props;
    this.props.form.validateFields((err, values) => {
      const arg0 = {
        educationCode: '',
        uniformFlag: '',
        ipsaBuDeptId: '',
        ipsaDeptId: '',
        keyword: value,
        currentPage: 1,
        pageSize: 10
      };
      changeCurrentPageData(arg0);
      localStorage.setItem('educStatusFlag', '');
      queryEducationRecordInfoList(arg0);
      this.props.form.resetFields();
    });
  };

  //修改搜索框的值
  handleChangeSearchInput = value => {
    const { changeCurrentPageData } = this.props;
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      keyword: value.target.value,
      educationCode: '',
      uniformFlag: '',
      ipsaBuDeptId: '',
      ipsaDeptId: ''
    };
    changeCurrentPageData(arg0);
  };

  //查询按钮
  handleSearchList = event => {
    event.preventDefault();
    const { queryEducationRecordInfoList, changeCurrentPageData } = this.props;
    this.props.form.validateFields((err, values) => {
      const arg0 = {
        educationCode: values.educationCode,
        uniformFlag: values.uniformFlag,
        ipsaBuDeptId: values.ipsaBuDeptId,
        ipsaDeptId: values.ipsaDeptId,
        keyword: '',
        currentPage: 1,
        pageSize: 10
      };
      changeCurrentPageData(arg0);
      localStorage.setItem('educStatusFlag', '');
      queryEducationRecordInfoList(arg0);
    });
  };

  //组件销毁清空搜索
  componentWillUnmount() {
    const { changeCurrentPageData } = this.props;
    const arg0 = {
      currentPage: 1,
      pageSize: 10,
      keyword: '',
      educationCode: '',
      uniformFlag: '',
      ipsaBuDeptId: '',
      ipsaDeptId: ''
    };
    changeCurrentPageData(arg0);
    localStorage.setItem('educStatusFlag', '');
  }
  render() {
    const columns = this.columns;
    const { buList, depList, educList, total, currentPageData } = this.props;
    const token = localStorage.getItem('token');
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="education-info">
        <Row style={{ padding: '20px' }}>
          <Col className="educ-operator-set" span={24}>
            <Row>
              <Col span={8}>
                <Search
                  className="educ-seatch-input"
                  placeholder="输入姓名或软通工号"
                  onSearch={value => this.handleSearchInput(value)}
                  onChange={value => this.handleChangeSearchInput(value)}
                  enterButton
                  value={currentPageData.keyword}
                />
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <div className="educ-upload-btn" style={{ marginRight: '7%' }}>
                  <Upload
                    style={{ marginRight: '7%' }}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    action="/api/education/import/education.json"
                    method="post"
                    headers={{
                      Authorization: 'Bearer ' + token
                    }}
                    showUploadList={false}
                    onChange={this.handleChangeFile.bind(this)}
                    beforeUpload={this.handleBeforeUpload.bind(this)}
                  >
                    <Tooltip title="支持导入.xlsx文件">
                      <Button type="primary">导入</Button>
                    </Tooltip>
                  </Upload>
                </div>
                <div className="educ-upload-btn">
                  <Button
                    onClick={this.handleDownload.bind(this)}
                    type="primary"
                  >
                    导出
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <Row>
              <Form>
                <Col span={5}>
                  <Form.Item
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 16 }}
                    label="BU"
                    hasFeedback
                  >
                    {getFieldDecorator('ipsaBuDeptId', {
                      initialValue: currentPageData.ipsaBuDeptId
                    })(
                      <Select
                        allowClear
                        onChange={this.handleChangeBuDeptId.bind(this)}
                      >
                        {buList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    label="部门"
                    hasFeedback
                  >
                    {getFieldDecorator('ipsaDeptId', {
                      initialValue: currentPageData.ipsaDeptId
                    })(
                      <Select allowClear>
                        {depList.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                    label="学历"
                    hasFeedback
                  >
                    {getFieldDecorator('educationCode', {
                      initialValue: currentPageData.educationCode
                    })(
                      <Select allowClear>
                        {educationCodeEnum.map(item => {
                          return (
                            <Option key={item.key} value={item.key}>
                              {item.label}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 9 }}
                    label="是否统招"
                    hasFeedback
                  >
                    {getFieldDecorator('uniformFlag', {
                      initialValue: currentPageData.uniformFlag
                    })(
                      <Select allowClear>
                        {uniformFlagEnum.map(item => {
                          return (
                            <Option key={item.key} value={item.key}>
                              {item.label}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={2} style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    style={{
                      marginTop: '3px',
                      marginRight: '15%'
                    }}
                    onClick={this.handleSearchList.bind(this)}
                  >
                    查询
                  </Button>
                </Col>
              </Form>
            </Row>
          </Col>
          <Col span={24} className="educ-content-table">
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={educList}
              pagination={false}
            />
          </Col>
          <Col className="educ-paging" span={24}>
            <Pagination
              total={total}
              current={currentPageData.currentPage}
              onChange={page => {
                this.handleTableChange(page);
              }}
            />
          </Col>
        </Row>
        <EducationModal />
      </div>
    );
  }
}

export default Form.create()(EducationInfo);
