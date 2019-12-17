import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, Select, Modal, Form, DatePicker, Input } from 'antd';
import './basicModal.less';
import { actionCreators } from '../store';
const { Option } = Select;
const arr = ['阿里', '蚂蚁'];
const brr = ['北京MAG阿里实施部4606', '西安MAG阿里管理部0136'];

const basicListArray = [
  {
    label: 'BU',
    key: 'bu'
  },
  {
    label: '部门',
    key: 'bumen'
  },
  {
    label: '软通工号',
    key: 'workId'
  },
  {
    label: '姓名',
    key: 'name'
  },
  {
    label: '性别',
    key: 'sex'
  },
  {
    label: '出生日期',
    key: 'bieth'
  },
  {
    label: '入职日期',
    key: 'entry'
  },
  {
    label: '通用职位',
    key: 'currency'
  },
  {
    label: 'Grade代码',
    key: 'code'
  },
  {
    label: '人员性质',
    key: 'nature'
  },
  {
    label: '直属上级',
    key: 'superior'
  },
  {
    label: '交付经理',
    key: 'deliver'
  }
];
const inputList = ['workId', 'name', 'code'];
const dateList = ['bieth', 'entry'];

@connect(state => state.basic, actionCreators)
class BasicModal extends Component {
  handleCancel = () => {
    const { changeBasicVisible } = this.props;
    changeBasicVisible({
      basicVisible: false,
      record: {}
    });
  };

  // 对输入框进行校验
  basicFormRules = key => {
    if (key === 'deliver') {
      return [{ required: true, message: '不能为空' }];
    }
    return [];
  };

  // 根据不同的信息渲染不同的输入框
  baseFormInput = key => {
    if (inputList.indexOf(key) !== -1) {
      return <Input />;
    }
    if (dateList.indexOf(key) !== -1) {
      return (
        <DatePicker
          placeholder="请选择日期"
          style={{ width: '100%' }}
          onChange={this.handleChangeDate.bind(this, key)}
        />
      );
    }
    console.log('key', key);
    return (
      <Select className="basic-select" style={{ width: '100%' }}>
        {key === 'bu' && <Option value="jack">阿里</Option>}
        {key === 'bumen' && <Option value="bumen">部门</Option>}
        {key === 'sex' && <Option value="men">男</Option>}
        {key === 'currency' && <Option value="currency">高级视觉设计师</Option>}
        {key === 'code' && <Option value="code">p7</Option>}
        {key === 'nature' && <Option value="nature">正式员工</Option>}
        {key === 'superior' && <Option value="superior">权威光</Option>}
        {key === 'deliver' && <Option value="deliver">闫海军</Option>}
      </Select>
    );
  };

  handleChangeDate = (key, date, dateString) => {
    console.log('date', date, 'dateString', dateString, 'key', key);
  };

  render() {
    const { basicVisible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div className="basic-modal">
        <Modal
          title="添加新员工"
          visible={basicVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="basic-add-modal"
        >
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="basic-form"
          >
            {basicListArray.map((item, index) => {
              const { basicRecord } = this.props;
              console.log('modalbasicRecord', basicRecord[item.key]);
              return (
                <Form.Item label={item.label} key={index}>
                  {getFieldDecorator(item.key, {
                    initialValue:
                      item.key === 'bieth' || item.key === 'entry'
                        ? moment(basicRecord[item.key])
                        : basicRecord[item.key],
                    rules: this.basicFormRules(item.key)
                  })(this.baseFormInput(item.key))}
                </Form.Item>
              );
            })}
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(BasicModal);
