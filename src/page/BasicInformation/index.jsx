import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Form, Select, Input } from 'antd';
import BasicModal from './components/BasicModal.jsx';
import { actionCreators } from './store';
import { reminderColumns } from '../../utils/tableTitle.config';
const { Search } = Input;
const { Option } = Select;
const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    bu: '阿里实施部',
    workId: i + 1,
    name: '约翰',
    bumen: '北京MAG阿里实施部4606',
    sex: '男',
    bieth: '1990-01-01',
    entry: '2017-01-01',
    currency: '助理视觉设计师',
    code: 'P7',
    nature: '试用期',
    superior: '权威光',
    deliver: '闫海军'
  });
}
@connect(state => state.basic, actionCreators)
class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.columns = [
      ...reminderColumns,
      {
        title: '操作',
        dataIndex: '17',
        width: '100px',
        fixed: 'right',
        render: (text, record) => (
          <Button
            onClick={() => {
              console.log('record', record);

              const { changeBasicVisible } = this.props;
              changeBasicVisible({
                basicVisible: true,
                record
              });
            }}
          >
            编辑
          </Button>
        )
      }
    ];
  }

  componentDidMount() {
    console.log('渲染几次');
  }
  handleShowModel = () => {
    const { changeBasicVisible } = this.props;
    changeBasicVisible({
      basicVisible: true,
      record: {}
    });
  };
  render() {
    const columns = this.columns;
    const { getFieldDecorator } = this.props.form;
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
              <Col span={4}>
                <Button
                  style={{ marginLeft: '30px' }}
                  onClick={this.handleShowModel.bind(this)}
                >
                  + 新增
                </Button>
              </Col>
              <Col span={8}>
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
            <Row>
              <Form {...formItemLayout}>
                <Col span={6}>
                  <Form.Item label="BU" hasFeedback>
                    {getFieldDecorator('confirm')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="部门" hasFeedback>
                    {getFieldDecorator('bumen')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="性别" hasFeedback>
                    {getFieldDecorator('sex')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="入职日期" hasFeedback>
                    {getFieldDecorator('entry')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="人员性质" hasFeedback>
                    {getFieldDecorator('xinzhi')(
                      <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    style={{ marginTop: '3px', marginLeft: '5%' }}
                  >
                    查询
                  </Button>
                </Col>
              </Form>
            </Row>
          </Col>
          <Col style={{ marginTop: '30px' }} span={24}>
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={data}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Row>
        <BasicModal />
      </div>
    );
  }
}
export default Form.create()(BasicInformation);
