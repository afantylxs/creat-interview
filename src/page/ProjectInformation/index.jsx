import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Form, Select, Input } from 'antd';
import ProjectModal from './components/ProjectModal.jsx';
import { actionCreators } from './store';
import { projectColumns } from '../../utils/tableTitle.config';
import SearchForm from './components/searchForm.jsx';
const { Search } = Input;
const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    empName: '阿里实施部',
    ipsaBuDeptId: i + 1,
    ipsaDeptId: '约翰',
    empNo: '北京MAG阿里实施部4606',
    sex: '男',
    bieth: '1990-01-01',
    entry: '2017-01-01',
    address: '助理视觉设计师',
    code: 'P7',
    nature: '试用期',
    superior: '权威光',
    deliver: '闫海军'
  });
}

@connect(state => state.project, actionCreators)
class ProjectInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'empName',
        width: '150px'
      },
      {
        title: 'BU',
        dataIndex: 'ipsaBuDeptId',
        width: '150px'
      },
      {
        title: '部门',
        dataIndex: 'ipsaDeptId',
        width: '150px'
      },
      {
        title: '软通工号',
        dataIndex: 'empNo',
        width: '150px',
        render: (text, record) => {
          console.log('text', record);
        }
      },
      {
        title: '阿里工号',
        dataIndex: 'alworkId',
        width: '150px'
      },
      {
        title: '入项时间',
        dataIndex: 'entryp',
        width: '150px'
      },
      {
        title: '一类岗位',
        dataIndex: 'onepost',
        width: '150px'
      },
      {
        title: '二类岗位',
        dataIndex: 'twopost',
        width: '150px'
      },
      {
        title: '三类岗位',
        dataIndex: 'threepost',
        width: '150px'
      },
      {
        title: '层级',
        dataIndex: 'hierarchy',
        width: '150px'
      },
      {
        title: '技术方向',
        dataIndex: 'direction',
        width: '150px'
      },
      {
        title: '框架',
        dataIndex: 'frame',
        width: '150px'
      },
      {
        title: '事业群',
        dataIndex: 'careergroup',
        width: '150px'
      },
      {
        title: '事业部',
        dataIndex: 'businessunit',
        width: '150px'
      },
      {
        title: '项目名称',
        dataIndex: 'entryname',
        width: '150px'
      },
      {
        title: '业务线名称',
        dataIndex: 'business',
        width: '150px'
      },
      {
        title: '项目类型',
        dataIndex: 'projecttype',
        width: '150px'
      },
      {
        title: '是否IDU',
        dataIndex: 'idu',
        width: '150px'
      },
      {
        title: '是否TL',
        dataIndex: 'tl',
        width: '150px'
      },
      {
        title: '工作城市',
        dataIndex: 'workcity',
        width: '150px'
      },
      {
        title: '办公场地',
        dataIndex: 'officespace',
        width: '150px'
      },
      {
        title: '资源状态',
        dataIndex: 'resource',
        width: '150px'
      },
      {
        title: '是否骨干',
        dataIndex: 'backbone',
        width: '150px'
      },
      {
        title: '是否收费',
        dataIndex: 'charge',
        width: '150px'
      }
    ];
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = this.columns;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    return (
      <div className="project-information">
        <Row style={{ padding: '30px' }}>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Search
                  style={{ width: '50%' }}
                  placeholder="输入姓名或软通工号"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button style={{ marginRight: '40px' }} type="primary">
                  导入
                </Button>
                <Button style={{ marginRight: '30px' }} type="primary">
                  导出
                </Button>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <SearchForm />
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={data}
              scroll={{ x: '100%' }}
            />
          </Col>
        </Row>
        <ProjectModal />
      </div>
    );
  }
}
export default Form.create()(ProjectInformation);
