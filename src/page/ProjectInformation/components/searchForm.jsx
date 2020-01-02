import React, { Component } from 'react';
import { Row, Input, Col, Button, Form, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import './searchForm.less';

const { Option } = Select;

@connect(state => state.project, actionCreators)
class SearchForm extends Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  //切换BU列表
  handleChangeBuDeptId = value => {
    const { deptInfo, changeDepList } = this.props;
    if (value) {
      deptInfo(value);
    } else {
      changeDepList([]);
    }
  };

  //获取一类岗位
  handleFocusFirstCategoryId = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_1');
  };

  //获取二类岗位
  handleFocusSecondCategoryId = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_2');
  };

  //获取三类岗位
  handleFocusThirdCategoryId = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_3');
  };

  //获取层级
  handleFocusaliGradeCode = () => {
    const { dictInfo } = this.props;
    dictInfo('job_class_level');
  };

  //获取工作城市
  handleFocusWorkCity = () => {
    const { dictInfo } = this.props;
    dictInfo('work_city');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      buList,
      depList,
      firstCategoryidList,
      secondCategoryidList,
      thirdCategoryidList,
      aliGradeCodeList,
      workCityList
    } = this.props;
    return (
      <div className="project-search-from">
        <Row>
          <Col span={22}>
            <Form>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="BU"
                  hasFeedback
                >
                  {getFieldDecorator('ipsaBuDeptId')(
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
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="部门"
                  hasFeedback
                >
                  {getFieldDecorator('ipsaDeptId')(
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
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="阿里工号"
                  hasFeedback
                >
                  {getFieldDecorator('aliNo')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  label="入项时间"
                  hasFeedback
                >
                  {getFieldDecorator('joiningProjTimeFormat')(
                    <DatePicker
                      showToday={false}
                      placeholder="请选择入项时间"
                      onChange={this.onChange.bind(this)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="一类岗位"
                  hasFeedback
                >
                  {getFieldDecorator('firstCategoryId')(
                    <Select
                      allowClear
                      onFocus={this.handleFocusFirstCategoryId.bind(this)}
                    >
                      {firstCategoryidList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="二类岗位"
                  hasFeedback
                >
                  {getFieldDecorator('secondCategoryId')(
                    <Select
                      allowClear
                      onFocus={this.handleFocusSecondCategoryId.bind(this)}
                    >
                      {secondCategoryidList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="三类岗位"
                  hasFeedback
                >
                  {getFieldDecorator('thirdJobId')(
                    <Select
                      allowClear
                      onFocus={this.handleFocusThirdCategoryId.bind(this)}
                    >
                      {thirdCategoryidList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="层级"
                  hasFeedback
                >
                  {getFieldDecorator('aliGradeCode')(
                    <Select
                      allowClear
                      onFocus={this.handleFocusaliGradeCode.bind(this)}
                    >
                      {aliGradeCodeList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  label="技术方向"
                  hasFeedback
                >
                  {getFieldDecorator('techDirection')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="框架"
                  hasFeedback
                >
                  {getFieldDecorator('aliFrameId')(
                    <Select allowClear>
                      <Option value="jack">财务及内控</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="事业群"
                  hasFeedback
                >
                  {getFieldDecorator('careerGroupId')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="事业部"
                  hasFeedback
                >
                  {getFieldDecorator('careerDeptId')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="阿里部门"
                  hasFeedback
                >
                  {getFieldDecorator('deptId')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  label="项目名称"
                  hasFeedback
                >
                  {getFieldDecorator('xmmc')(
                    <Select allowClear>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="业务线名称"
                  hasFeedback
                >
                  {getFieldDecorator('businessLine')(
                    <Select allowClear>
                      <Option value="jack">财务及内控</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="项目类型"
                  hasFeedback
                >
                  {getFieldDecorator('projetType')(
                    <Select allowClear>
                      <Option value="0">EP</Option>
                      <Option value="1">TM</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  label="项目时长"
                  hasFeedback
                >
                  {getFieldDecorator('projetDurationType')(
                    <Select allowClear>
                      <Option value="0">短期</Option>
                      <Option value="1">长期</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 15 }}
                  label="是否IDU"
                  hasFeedback
                >
                  {getFieldDecorator('iduFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  label="是否TL"
                  hasFeedback
                >
                  {getFieldDecorator('tlFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  label="工作城市"
                  hasFeedback
                  onFocus={this.handleFocusWorkCity.bind(this)}
                >
                  {getFieldDecorator('workCity')(
                    <Select allowClear>
                      {workCityList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 15 }}
                  label="办公场地"
                  hasFeedback
                >
                  {getFieldDecorator('workAddress')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 15 }}
                  label="资源状态"
                  hasFeedback
                >
                  {getFieldDecorator('resourceStatus')(
                    <Select allowClear>
                      <Option value="0">闲置</Option>
                      <Option value="1">在岗</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
                  label="是否骨干"
                  hasFeedback
                >
                  {getFieldDecorator('backboneFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 10 }}
                  label="是否收费"
                  hasFeedback
                >
                  {getFieldDecorator('chargeFlag')(
                    <Select allowClear>
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Form>
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              style={{
                marginTop: '3px',
                marginRight: '15%'
              }}
            >
              查询
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(SearchForm);
