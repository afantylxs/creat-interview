import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Select, Modal, Form, DatePicker, Input } from 'antd';
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
const managedisabled = ['directSuperiorName'];

@connect(state => state.basic, actionCreators)
class BasicModal extends Component {
  handleCancel = () => {
    const { changeBasicVisible } = this.props;
    this.props.form.resetFields();
    changeBasicVisible({
      basicVisible: false,
      record: {}
    });
  };

  // 对输入框进行校验
  basicFormRules = key => {
    if (key === 'deliveryManagerName') {
      return [];
    }
    if (key === 'correctionTime') {
      return [];
    }
    return [
      { required: true, message: '不能为空' },
      {
        validator: this.validFunction
      }
    ];
  };

  validFunction = (rule, value, callback) => {
    if (rule && rule.field === 'ipsaDeptId')
      if (value instanceof Object && Object.keys(value).length === 0) {
        callback('不能为空');
      }
    callback();
  };

  componentDidMount() {
    const { queryUserListInfoByRolePermission, dictInfo } = this.props;
    dictInfo('general_position');
    dictInfo('position_grade_code');
    queryUserListInfoByRolePermission('recruitmentConsultant');
    queryUserListInfoByRolePermission('projectManage');
  }

  // 根据不同的信息渲染不同的输入框
  baseFormInput = (key, disabled) => {
    const {
      rsData,
      dmData,
      buList,
      dicList,
      dicModalList,
      manageList,
      gradeList
    } = this.props;

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
    return (
      <Select
        onChange={this.handleGetOption.bind(this, key)}
        disabled={disabled}
        labelInValue={true}
        className="basic-select"
        style={{ width: '100%' }}
        allowClear={key === 'deliveryManagerName' ? true : false}
      >
        {key === 'ipsaBuDeptId' &&
          buList.map(item => {
            //BU下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        {key === 'ipsaDeptId' &&
          dicModalList.map(item => {
            //部门下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        {key === 'gender' &&
          genderEunm.map(item => {
            //性别下拉列表
            return (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            );
          })}
        {key === 'ipsaPostNo' &&
          dicList.map(item => {
            //通用职位下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.label}
              </Option>
            );
          })}
        {key === 'ipsaGradeCode' &&
          gradeList.map(item => {
            //Grade代码下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.label}
              </Option>
            );
          })}
        {key === 'empProperty' &&
          empPropertyEumn.map(item => {
            //员工性质下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        {key === 'directSuperiorName' &&
          manageList.map(item => {
            //上级主管列表
            return (
              <Option key={item.id} value={item.id}>
                {item.empName}
              </Option>
            );
          })}
        {key === 'deliveryManagerName' &&
          dmData.map(item => {
            //交付下拉列表
            return (
              <Option key={item.id} value={item.id}>
                {item.empName}
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
            return (
              <Option key={item.id} value={item.id}>
                {item.username}
              </Option>
            );
          })}
      </Select>
    );
  };

  handleGetOption = (key, value) => {
    const { deptInfo, basicRecord, changeBasicVisible } = this.props;

    if (key === 'ipsaBuDeptId') {
      const newBasicRecord = JSON.parse(JSON.stringify(basicRecord));
      newBasicRecord.ipsaDeptId = {};
      changeBasicVisible({
        basicVisible: true,
        record: newBasicRecord
      });
      deptInfo({ id: value.key, tab: 'ipsaPostNo' });
      this.props.form.resetFields();
    }
  };

  handleChangeDate = (key, date, dateString) => {
    console.log('date', date, 'dateString', dateString, 'key', key);
  };

  handleProjectSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          saveEmployeeBaseInfo,
          basicRecord,
          updateEmployeeBaseInfo
        } = this.props;
        const arg0 = {
          empName: values.empName,
          ipsaBuDeptId: values.ipsaBuDeptId ? values.ipsaBuDeptId.key : '',
          ipsaDeptId: values.ipsaDeptId ? values.ipsaDeptId.key : '',
          empNo: values.empNo,
          gender: values.gender ? values.gender.key : '',
          birthdayFormat: moment(values.birthday).format('YYYY-MM-DD'),
          joiningDayFormat: moment(values.joiningDay).format('YYYY-MM-DD'),
          correctionTimeFormat: basicRecord.id
            ? values.correctionTime
              ? moment(values.correctionTime).format('YYYY-MM-DD')
              : ''
            : '',
          ipsaPostNo: values.ipsaPostNo ? values.ipsaPostNo.key : '',
          ipsaGradeCode: values.ipsaGradeCode ? values.ipsaGradeCode.key : '',
          empProperty: values.empProperty ? values.empProperty.key : '',
          directSuperiorId: values.directSuperiorName
            ? values.directSuperiorName.key
            : '',
          directSuperiorName: values.directSuperiorName
            ? values.directSuperiorName.label
            : '',
          deliveryManagerId: values.deliveryManagerName
            ? values.deliveryManagerName.key
            : '',
          deliveryManagerName: values.deliveryManagerName
            ? values.deliveryManagerName.label
            : '',
          onJob: values.onJob ? values.onJob.key : '',
          recruitmentUserId: values.recruitmentUserId
            ? values.recruitmentUserId.key
            : '',
          recruitmentUserName: values.recruitmentUserId
            ? values.recruitmentUserId.label
            : ''
        };
        if (basicRecord.id) {
          arg0.id = basicRecord.id;
          updateEmployeeBaseInfo(arg0);
        } else {
          saveEmployeeBaseInfo(arg0);
        }
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.basicVisible) {
      this.props.form.resetFields();
    }
  }

  render() {
    const { basicVisible, basicRecord } = this.props;
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
          title={basicRecord.id ? '修改信息' : '添加新员工'}
          visible={basicVisible}
          onOk={this.handleProjectSubmit}
          onCancel={this.handleCancel}
          className="basic-add-modal"
          okText="提交"
          cancelText="取消"
        >
          <Form {...formItemLayout} className="basic-form">
            {reminderColumnsForm.map((item, index) => {
              if (item.dataIndex === 'recruitmentUserId' && basicRecord.id) {
                //编辑状态不显示招聘顾问
                return '';
              }
              //直属上级在编辑时不能修改
              let disabled = false;
              if (managedisabled.includes(item.dataIndex) && basicRecord.id) {
                disabled = true;
              }
              return (
                <Form.Item label={item.title} key={item.dataIndex}>
                  {getFieldDecorator(item.dataIndex, {
                    initialValue:
                      item.dataIndex === 'birthday' ||
                      item.dataIndex === 'joiningDay' ||
                      item.dataIndex === 'correctionTime'
                        ? basicRecord[item.dataIndex]
                          ? moment(basicRecord[item.dataIndex])
                          : null
                        : basicRecord[item.dataIndex],
                    rules: this.basicFormRules(item.dataIndex)
                  })(this.baseFormInput(item.dataIndex, disabled))}
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
