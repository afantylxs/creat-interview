 import React, { Component } from 'react';
 import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, Select, Modal, Form, DatePicker, Input } from 'antd';
import './basicModal.less';
import { actionCreators } from '../store'
const { Option } = Select;

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
 class BasicModal extends Component {
    constructor(props) {
        super(props)
    }

    handleCancel = () => {
        const { handleChangeBasicVisible } = this.props;
        handleChangeBasicVisible(false)
    }

    // 对输入框进行校验
    basicFormRules = key => {
        if(key === 'deliver') {
            return [{required: true, message: '不能为空'}]
        }
        return [];
    }

    // 根据不同的信息渲染不同的输入框
    baseFormInput = key => {
        if(inputList.indexOf(key) !== -1) {
            return <Input />
        }
        if(dateList.indexOf(key) !== -1) {
            return <DatePicker
                        placeholder="请选择日期"
                        style={{ width: '100%'}} 
                        onChange={this.handleChangeDate.bind(this, key)}
                   />
        }
        return (
            <Select className="basic-select" style={{ width: '100%' }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                    Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
        )
    }

    setBasicInitialValue = key => {
        let value = '';
        switch (key) {
            case 'bieth':
                value = moment()
                break;
            case 'entry':
                value = moment()
                break;
            default:
                break;
        }
        console.log('value',value);
        
        return value;
    }

    handleChangeDate = (key, date, dateString) => {
        console.log('date', date, 'dateString', dateString, 'key', key);
    }

    render() {
        const { basicVisible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const  formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
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
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className="basic-form">
                        {
                            basicListArray.map( (item, index) => {
                                return (
                                    <Form.Item label={item.label} key={index}>
                                        {getFieldDecorator(item.key, {
                                            initialValue: this.setBasicInitialValue(item.key),
                                            rules: this.basicFormRules(item.key),
                                        })(
                                            this.baseFormInput(item.key)
                                        )}
                                    </Form.Item>
                                )
                            })
                        }
                    </Form>
                </Modal>
            </div>
        )
    }
 }

 const mapStateToProps = state => {
    return {
        basicVisible: state.basic.basicVisible,
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        handleChangeBasicVisible(active) {
            dispatch(
                actionCreators.changeBasicVisible(
                    {
                        basicVisible: active,
                    }
                )
            )
        }
    }
}

 export default connect(mapStateToProps, mapDispatchTopProps)(Form.create()(BasicModal))