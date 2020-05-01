import { Button, Card, Tag, Divider } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { ColumnProps } from 'antd/es/table';
import { StateType } from './model';
import StandardTable from './components/StandardTable';

import { TableListItem } from './data.d';

import styles from './style.less';
import CreateFrom from './components/CreateFrom';

interface TableListProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  department: StateType;
}

interface TableListState {
  addModalVisible: boolean;
}

class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    addModalVisible: false,
  };

  columns: ColumnProps<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 40,
    },
    {
      title: '排序',
      width: 50,
      dataIndex: 'order',
    },
    {
      title: '状态',
      dataIndex: 'isEnabled',
      width: 60,
      render: (text) => (text ? <Tag color="#108ee9">启用</Tag> : <Tag color="#f50">禁用</Tag>),
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      sorter: true,
      width: 170,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      width: 90,
      render: (text, record: TableListItem) => (
        <Fragment>
          <a href={`/system/department/edit/${record.id}`}>编辑</a>
          <Divider type="vertical" />
          <a href={`/system/department/edit/${record.id}`}>查看</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.list({});
  }

  list = (params: {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/list',
      payload: {
        ...params,
      },
    });
  };

  handleAdd = (addModalVisible: boolean, refresh?: boolean) => {
    this.setState({
      addModalVisible: !!addModalVisible,
    });
    if (refresh) {
      this.list({});
    }
  };

  render() {
    const {
      department: { data },
      loading,
    } = this.props;

    const { addModalVisible } = this.state;

    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                disabled={loading}
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => this.handleAdd(true)}
              >
                新建
              </Button>
              <Button
                disabled={loading}
                icon={<ReloadOutlined />}
                type="primary"
                onClick={() => this.list({})}
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
        {addModalVisible ? (
          <CreateFrom
            addModalVisible={addModalVisible}
            onClose={() => this.handleAdd(false, true)}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    department,
    loading,
  }: {
    department: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    department,
    loading: loading.effects['department/list'],
  }),
)(TableList);
