import { Alert, Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { Dispatch, AnyAction, connect, history } from 'umi';
import { uuid } from '@/utils/common';
import constants from '@/utils/constants';
import { StateType } from './model';
import styles from './style.less';

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 16,
      width: '80%',
      margin: '0 auto',
      marginTop: 16,
    }}
    message={content}
    type="error"
    showIcon
  />
);

interface LoginState {
  captchaId: string;
}

class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    captchaId: uuid(),
  };

  componentDidMount(): void {}

  onFinish = (values) => {
    const { captchaId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
        captchaId,
        type: 'account',
      },
      callback: (response: { code: string }) => {
        const { code } = response;
        if (code === '-2') {
          this.setState({
            captchaId: uuid(),
          });
        }
      },
    });
  };

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType, content } = userAndlogin;
    const { captchaId } = this.state;
    return (
      <div className={styles.main}>
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content={content} />
        )}

        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" />
          </Form.Item>

          <Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item name="captcha">
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
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
            <a onClick={() => history.push('/user/register')}>账号注册</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)(Login);
