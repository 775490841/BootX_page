import { Alert } from 'antd';
import React, { Component } from 'react';
import { Dispatch, AnyAction, connect } from 'umi';
import { uuid } from '@/utils/common';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginFrom from './components/Login';

const { Tab, UserName, Password, Captcha, Submit } = LoginFrom;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userAndlogin: StateType;
  submitting?: boolean;
}

interface LoginState {
  type: string;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

class Login extends Component<LoginProps, LoginState> {
  state = {
    type: 'account',
  };

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'userAndlogin/getCaptcha',
      payload: {
        captchaId: uuid(),
      },
    });
  }

  handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
        type: 'account',
      },
    });
  };

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType } = userAndlogin;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <LoginFrom activeKey={type} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {status === 'error' && loginType === 'account' && !submitting && (
              <LoginMessage content="账户或密码错误" />
            )}

            <UserName
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="验证码"
              countDown={120}
              getCaptchaButtonText=""
              getCaptchaSecondText="秒"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
            />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
        </LoginFrom>
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
