import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Col,Row } from 'antd';
import Header from '../Header'
import './index.less'
class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            localStorage.setItem("flag", true);
            this.props.handleChangeisLogin()
            this.props.history.push('/home')
            // if (!err) {

            // }
        });
    };

  render () {
    const { getFieldDecorator } = this.props.form;
    const  formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
            };
    return (
    <div>
      <div className="login-form-layout">
          <Row style={{backgroundColor: '#fff'}}>
              <Col span={15}>
                  <div className="login-left-img">
                    <img width="100%" src={require('../../images/login.jpg')} />
                  </div>
              </Col>
              <Col span={9}>
                  <div className="login-rigiht-img">
                    <h2 style={{fontSize: '30px'}}>登录</h2>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住密码</Checkbox>)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
              </Col>
          </Row>
      </div>
      </div>
    
    );
  }
  
}
const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        handleChangeisLogin() {
            const action = {
                type: 'change_islogin',
                payload: {
                    isLogin: true,
                }
            }
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchTopProps)(Login = Form.create()(Login));
