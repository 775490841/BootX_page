import { Button, Card, Divider, message } from 'antd';
import React, { Component, Fragment } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Link, Dispatch, AnyAction } from 'umi';
import { StateType } from './model';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem } from './data';
import styles from './style.less';

interface TableListProps {
  match: {
    params: {
      [key: string]: string;
    };
  };
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
  storagePlugin: StateType;
}

class TableList extends Component<TableListProps> {
  columns: StandardTableColumnProps[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '序号',
      dataIndex: 'order',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'isEnabled',
      width: 100,
      render: (text) => (text ? '启用' : '禁用'),
    },
    {
      title: '操作',
      width: 100,
      render: (text, record: TableListItem) => (
        <Fragment>
          {record.isInstalled ? (
            <Fragment>
              {record.settingUrl && (
                <Link to={`/setting/storagePlugin/${record.settingUrl}`}>配置</Link>
              )}
              {record.uninstallUrl && (
                <Fragment>
                  <Divider type="vertical" />
                  <a onClick={() => this.uninstall(record.uninstallUrl)}>卸载</a>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <a onClick={() => this.install(record.installUrl)}>安装</a>
          )}
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.list({});
  }

  install = (installUrl: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storagePlugin/install',
      payload: {
        url: installUrl,
      },
      callback: (response: { type: string; content: string }) => {
        const { type, content } = response;
        if (type === 'success') {
          message.success(content);
        } else {
          message.error(content);
        }
        this.list({});
      },
    });
  };

  uninstall = (uninstall: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storagePlugin/uninstall',
      payload: {
        url: uninstall,
      },
      callback: (response: { type: string; content: string }) => {
        const { type, content } = response;
        if (type === 'success') {
          message.success(content);
        } else {
          message.error(content);
        }
        this.list({});
      },
    });
  };

  list = (params: {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storagePlugin/list',
      payload: params,
    });
  };

  render() {
    const {
      loading,
      storagePlugin: { data },
    } = this.props;
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                icon="reload"
                disabled={loading}
                loading={loading}
                type="primary"
                onClick={() => this.componentDidMount()}
              >
                刷新
              </Button>
            </div>
            <StandardTable
              bordered
              size="small"
              loading={loading}
              data={data}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    storagePlugin,
    loading,
  }: {
    storagePlugin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    storagePlugin,
    loading:
      loading.effects['storagePlugin/list'] ||
      loading.effects['storagePlugin/install'] ||
      loading.effects['storagePlugin/uninstall'],
  }),
)(TableList);
