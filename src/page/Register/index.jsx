import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, Col, Row, message } from 'antd';
import './index.less';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'text'
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
    this.props.history.push('/interview/login');
  };

  //提交注册信息
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //   if (!err) {
      console.log('values', values);
      this.props.history.push('/home');
      //   }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { passwordType } = this.state;
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
                        {getFieldDecorator('username', {
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
                            autoComplete="new-password"
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