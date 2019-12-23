import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, Select, Modal, Form, DatePicker, Input } from 'antd';
import './basicModal.less';
import { actionCreators } from '../store';
import {
  genderEunm,
  empPropertyEumn,
  onJobEnum,
  reminderColumnsForm
} from '../../../utils/optionEnum';
const { Option } = Select;

const inputList = ['empName', 'empNo'];
const dateList = ['birthday', 'joiningDay', 'correctionTime'];

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

  componentDidMount() {
    const { queryUserListInfoByRolePermission } = this.props;
    queryUserListInfoByRolePermission('dm');
    // queryUserListInfoByRolePermission('pm');
    queryUserListInfoByRolePermission('rs');
  }

  // 根据不同的信息渲染不同的输入框
  baseFormInput = key => {
    const { rsData, dmData, buList, dicList } = this.props;
    if (inputList.indexOf(key) !== -1) {
      return <Input />;
    }
    if (dateList.indexOf(key) !== -1) {
      const { basicRecord } = this.props;
      return (
        <DatePicker
          disabled={key === 'correctionTime' && !basicRecord.id && true}
          placeholder="请选择日期"
          style={{ width: '100%' }}
          onChange={this.handleChangeDate.bind(this, key)}
        />
      );
    }
    return (
      <Select
        onFocus={this.handleGetOption.bind(this, key)}
        className="basic-select"
        style={{ width: '100%' }}
      >
        {key === 'ipsaBuDeptId' &&
          buList.map(item => {
            return (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        {key === 'ipsaDeptId' && <Option value={1}>部门</Option>}
        {key === 'gender' &&
          genderEunm.map(item => {
            return (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            );
          })}
        {key === 'ipsaPostNo' &&
          dicList.map(item => {
            return (
              <Option key={item.id} value={item.id}>
                {item.label}
              </Option>
            );
          })}
        {key === 'ipsaGradeCode' && <Option value={4}>p7</Option>}
        {key === 'empProperty' &&
          empPropertyEumn.map(item => {
            return (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        {key === 'directSuperiorName' && (
          <Option value="superior">权威光</Option>
        )}
        {key === 'deliveryManagerName' &&
          dmData.map(item => {
            //交付下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.username}
              </Option>
            );
          })}
        {key === 'onJob' &&
          onJobEnum.map(item => {
            return (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        {key === 'recruitmentUserId' &&
          rsData.map(item => {
            //招聘顾问下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.username}
              </Option>
            );
          })}
      </Select>
    );
  };

  handleGetOption = key => {
    const { dictInfo } = this.props;
    if (key === 'ipsaPostNo') {
      dictInfo('general_position');
    }
    console.log('key', key);
  };

  handleChangeDate = (key, date, dateString) => {
    console.log('date', date, 'dateString', dateString, 'key', key);
  };

  handleProjectSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { saveEmployeeBaseInfo, basicRecord } = this.props;
        const arg0 = {
          empName: values.empName,
          ipsaBuDeptId: values.ipsaBuDeptId,
          ipsaDeptId: values.ipsaDeptId,
          empNo: values.empNo,
          gender: values.gender,
          birthdayFormat: moment(values.birthday).format('YYYY-MM-DD'),
          joiningDayFormat: moment(values.joiningDay).format('YYYY-MM-DD'),
          correctionTimeFormat: basicRecord.id
            ? moment(values.correctionTime).format('YYYY-MM-DD')
            : '',
          ipsaPostNo: values.ipsaPostNo,
          ipsaGradeCode: values.ipsaGradeCode,
          empProperty: values.empProperty,
          directSuperiorId: 1,
          directSuperiorName: values.directSuperiorName,
          deliveryManagerId: 1,
          deliveryManagerName: values.deliveryManagerName,
          onJob: values.onJob,
          recruitmentUserId: 1,
          recruitmentUserName: '谁'
        };
        console.log('arg0', arg0);

        console.log(basicRecord);
        if (basicRecord.id) {
          console.log('编辑');
        } else {
          // saveEmployeeBaseInfo(arg0);
        }
      }
    });
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
          onOk={this.handleProjectSubmit}
          onCancel={this.handleCancel}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form
            {...formItemLayout}
            onSubmit={this.handleProjectSubmit}
            className="basic-form"
          >
            {reminderColumnsForm.map((item, index) => {
              const { basicRecord } = this.props;
              return (
                <Form.Item label={item.title} key={item.dataIndex}>
                  {getFieldDecorator(item.dataIndex, {
                    initialValue:
                      item.dataIndex === 'birthday' ||
                      item.dataIndex === 'joiningDay' ||
                      item.dataIndex === 'correctionTime'
                        ? basicRecord[item.dataIndex]
                          ? moment(basicRecord[item.dataIndex])
                          : moment()
                        : basicRecord[item.dataIndex],
                    rules: this.basicFormRules(item.dataIndex)
                  })(this.baseFormInput(item.dataIndex))}
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
