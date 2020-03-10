import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Select, Col, Row, message } from 'antd';
import './index.less';

const { Option } = Select;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'text',
      sourceList: []
    };
  }

  //切换密码框input的type类型
  handleFocusPasswordType = () => {
    this.setState({
      passwordType: 'password'
    });
  };

  //跳转至登录页
  handleGoToLogin = () => {
    this.props.history.push('/login');
  };

  //提交注册信息
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('/api/user/register.json', {
            ...values
          })
          .then(res => {
            if (res && res.data && res.data.success) {
              message.success('注册成功');
              localStorage.setItem('token', '');
              localStorage.setItem('flag', false);
              this.props.history.push('/interview/login');
            } else {
              message.error('注册失败:' + res.data.message);
            }
          })
          .catch(err => {
            message.error('注册失败：' + err);
          });
      }
    });
  };

  //查询内面官群组范围接口（字典接口）
  handleFocusGetSource = () => {
    axios
      .get('/api/interview/dict/source')
      .then(res => {
        if (res && res.data && res.data.success) {
          const { data } = res.data;
          this.setState({
            sourceList: data
          });
        } else {
          message.error(
            '面试群组获取失败:' + res.data.message ? res.data.message : ''
          );
        }
      })
      .catch(err => {
        message.error('面试群组获取失败' + err);
      });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { passwordType, sourceList = [] } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div>
        <div className="register-form-layout">
          <Row style={{ backgroundColor: '#fff' }}>
            <Col span={15}>
              <div className="register-left-img">
                <img width="100%" src={require('../../images/login.jpg')} />
              </div>
            </Col>
            <Col span={9}>
              <div className="register-rigiht-img">
                <Row>
                  <Col span={4}>
                    <h2 style={{ fontSize: '30px' }}>注册</h2>
                  </Col>
                  <Col span={12} className="register-click-to-login">
                    已有账号？
                    <span
                      className="register-click-login-btn"
                      onClick={this.handleGoToLogin.bind(this)}
                    >
                      点此登录 >
                    </span>
                  </Col>
                  <Col span={24}>
                    <Form
                      {...formItemLayout}
                      onSubmit={this.handleSubmit}
                      className="register-form"
                    >
                      <Form.Item>
                        {getFieldDecorator('userName', {
                          rules: [
                            {
                              required: true,
                              message: '用户名为必填项'
                            }
                          ]
                        })(
                          <Input
                            placeholder="请输入用户名"
                            autocomplete="off"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: '密码为必填项'
                            }
                          ]
                        })(
                          <Input
                            type={passwordType}
                            onFocus={this.handleFocusPasswordType.bind(this)}
                            placeholder="请输入密码"
                            autocomplete="off"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              required: true,
                              message: '邮箱为必填项'
                            },
                            {
                              type: 'email',
                              message: '邮箱格式为xxxx@xxx.com'
                            }
                          ]
                        })(
                          <Input placeholder="请输入邮箱" autocomplete="off" />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('phone', {
                          rules: [
                            {
                              required: true,
                              message: '电话为必填项'
                            },
                            {
                              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                              message: '请输入正确的电话'
                            }
                          ]
                        })(
                          <Input placeholder="请输入电话" autocomplete="off" />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('empNo', {
                          rules: [
                            {
                              required: true,
                              message: '软通工号为必填项'
                            },
                            {
                              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                              message: '工号格式有误，请输入数字'
                            }
                          ]
                        })(
                          <Input
                            placeholder="请输入软通工号"
                            autocomplete="off"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('empName', {
                          rules: [
                            {
                              required: true,
                              message: '软通员工姓名为必填项'
                            }
                          ]
                        })(
                          <Input
                            placeholder="请输入软通员工姓名"
                            autocomplete="off"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('source', {
                          rules: [
                            {
                              required: true,
                              message: '不能为空'
                            }
                          ]
                        })(
                          <Select
                            onFocus={this.handleFocusGetSource}
                            placeholder="请选择内面群组"
                          >
                            {sourceList.map(item => {
                              return (
                                <Option key={item.value} value={item.value}>
                                  {item.label}
                                </Option>
                              );
                            })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="register-form-button"
                          onClick={this.handleSubmit}
                        >
                          注册
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(Register);
