import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col,Row } from 'antd';
import Header from '../Header'
import './index.less'
class Login extends Component {

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
        <Header />
      <div className="login-form-layout">
          <Row>
              <Col span={15}>
                logo
              </Col>
              <Col span={9}>
                  <h2>软通人员管理系统</h2>
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
              </Col>
          </Row>
      </div>
      </div>
    
    );
  }
  
}
export default Login = Form.create()(Login);
