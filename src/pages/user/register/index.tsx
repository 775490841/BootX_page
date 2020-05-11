import { Form, Input, Button, Row, Col, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { Dispatch, AnyAction, connect, history } from 'umi';
import { uuid } from '@/utils/common';
import constants from '@/utils/constants';
import { StateType } from '@/pages/user/register/model';
import styles from './style.less';

interface RegisterProps {
  dispatch: Dispatch<AnyAction>;
  submitting?: boolean;
  userAndRegister: StateType;
}

interface RegisterState {
  captchaId: string;
}

class Register extends Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    captchaId: uuid(),
  };

  componentDidMount(): void {}

  onFinish = (values) => {
    const { captchaId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'userAndRegister/register',
      payload: {
        ...values,
        captchaId,
      },
      callback: (response: { content: string; type: string }) => {
        const { content, type } = response;
        if (type === 'success') {
          message.success(content);
          history.push('/user/login');
        } else {
          message.error(content);
        }
      },
    });
  };

  render() {
    const { submitting } = this.props;
    const { captchaId } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <div className={styles.main}>
        <Form
          name="normal_login"
          className={styles.loginForm}
          onFinish={this.onFinish}
          scrollToFirstError
          {...formItemLayout}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入登陆密码!',
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入登陆密码!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item label="验证码">
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '必填!',
                    },
                  ]}
                >
                  <Input
                    size="large"
                    style={{ textTransform: 'uppercase' }}
                    prefix={<MailOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <img
                  style={{ cursor: 'pointer' }}
                  src={`${constants.baseUrl}/captcha/image?captchaId=${captchaId}`}
                  alt="换一个"
                  onClick={() => this.setState({ captchaId: uuid() })}
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button loading={submitting} size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(
  ({
    userAndRegister,
    loading,
  }: {
    userAndRegister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndRegister,
    submitting: loading.effects['userAndRegister/register'],
  }),
)(Register);
