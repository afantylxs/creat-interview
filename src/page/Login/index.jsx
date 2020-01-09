import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, Col, Row, message } from 'antd';
import './index.less';
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('/api/user/login.json', {
            username: values.username,
            password: values.password
          })
          .then(res => {
            if (res.data.success) {
              localStorage.setItem('token', res.data.data.token);
              localStorage.setItem('flag', true);
              this.props.history.push('/home');
            } else {
              message.error('登录失败:' + res.data.message);
            }
          })
          .catch(err => {
            message.error('登录失败：' + err);
          });
      }
    });
  };

  handleGoToRegister = () => {
    this.props.history.push('/register');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { pathname } = this.props.location;

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
        <div className="login-form-layout">
          <Row style={{ backgroundColor: '#fff' }}>
            <Col span={15}>
              <div className="login-left-img">
                <img width="100%" src={require('../../images/login.jpg')} />
              </div>
            </Col>
            <Col span={9}>
              <div className="login-rigiht-img">
                <Row>
                  <Col span={4}>
                    <h2 style={{ fontSize: '30px' }}>登录</h2>
                  </Col>
                  {pathname === '/interview/login' && (
                    <Col className="login-click-to-login" span={12}>
                      没有账号？
                      <span
                        className="login-click-login-btn"
                        onClick={this.handleGoToRegister.bind(this)}
                      >
                        点此注册 >
                      </span>
                    </Col>
                  )}

                  <Col span={24}>
                    <Form {...formItemLayout} className="login-form">
                      <Form.Item>
                        {getFieldDecorator('username', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your username!'
                            }
                          ]
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="user"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                              />
                            }
                            placeholder="请输入账号"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your Password!'
                            }
                          ]
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="lock"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                              />
                            }
                            type="password"
                            placeholder="请输入密码"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true
                        })(<Checkbox>记住密码</Checkbox>)}
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          onClick={this.handleSubmit}
                        >
                          登录
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
export default Login = Form.create()(Login);
