import React, { Component } from 'react';
import { Row, Col, Button, Table, Form, Select, Input } from 'antd';
import { connect } from 'react-redux';
import SearchForm from './components/searchForm.jsx';
// import { actionCreators } from '../BasicInformation/store';
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
        render: (text, record) => {
          return <Button>编辑</Button>;
        }
      }
    ];
  }
  render() {
    const columns = this.columns;
    const { basicList } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
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
          <Col span={24}>
            <Table columns={columns} dataSource={data} scroll={{ x: '100%' }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Department);
