import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, message } from 'antd';
import { Dispatch, history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType } from '../model';

import styles from './index.less';

interface CreateFromProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  match: {
    params: {
      [key: string]: any;
    };
  };
}

class CreateFrom extends Component<CreateFromProps> {
  onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/save',
      payload: values,
      callback: (response: { type: string; content: string }) => {
        const { type, content } = response;
        if (type === 'success') {
          history.push('/system/admin');
        } else {
          message.error(content);
        }
      },
    });
  };

  render() {
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <iframe className={styles.iframe} title="flowable" src="http://localhost:9990" />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({ admin, loading }: { admin: StateType; loading: { effects: { [key: string]: boolean } } }) => ({
    admin,
    submitting: loading.effects['admin/save'] || loading.effects['admin/departmentTree'],
  }),
)(CreateFrom);
