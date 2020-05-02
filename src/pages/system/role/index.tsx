import { Button, Card, Col, Form, Input, Row, message, Tag, Modal, Select, Divider } from 'antd';
import {
  PlusOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { FormInstance } from 'antd/lib/form';
import { getSiteInfo } from '@/utils/common';
import { history } from '@@/core/history';
import { StateType } from './model';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';

import { TableListItem } from './data.d';

import styles from './style.less';
import AllocationPermission from '@/pages/system/role/allocatePermission';

const FormItem = Form.Item;

interface TableListProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  role: StateType;
}

interface TableListState {
  selectedRows: TableListItem[];
  allocatePermissionModalVisible: boolean;
  allocatePermissionRecord: TableListItem;
}

class TableList extends Component<TableListProps, TableListState> {
  searchForm = React.createRef(FormInstance);

  state: TableListState = {
    selectedRows: [],
    allocatePermissionModalVisible: false,
    allocatePermissionRecord: {},
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '部门',
      dataIndex: 'departmentName',
    },
    {
      title: '状态',
      dataIndex: 'isEnabled',
      width: 60,
      render: (text) => (text ? <Tag color="#108ee9">启用</Tag> : <Tag color="#f50">禁用</Tag>),
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      sorter: true,
      width: 170,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      width: 100,
      render: (text, record: TableListItem) => (
        <Fragment>
          <a onClick={() => history.push(`/system/role/edit/${record.id}`)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.update(record, 'remove')}>删除</a>
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
      type: 'role/list',
      payload: {
        ...params,
      },
    });
    this.setState({
      selectedRows: [],
    });
  };

  update = (record: TableListItem, type1: string, content1?: string) => {
    const root = this;
    const content2 = () => {
      if (type1 === 'remove') {
        return '您正在执行账号删除操作';
      }
      if (type1 === 'enabled') {
        return '您正在执行账号启用操作';
      }
      if (type1 === 'reset') {
        return `您正在执行账户重置密码操作，密码将重置为${getSiteInfo('defaultPassword')}！！！`;
      }
      if (type1 === 'disabled') {
        return '您正在执行账号禁用操作';
      }
      return '';
    };
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: '警告',
      content: content1 || content2(),
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: `role/${type1}`,
          payload: {
            ids: record.id,
          },
          callback: (response: { type: string; content: string }) => {
            const { type, content } = response;
            if (type === 'success') {
              message.success(content);
              root.list({});
            } else {
              message.error(content);
            }
          },
        });
      },
    });
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = (values: { [key: string]: any }) => {
    this.list({
      ...values,
    });
  };

  renderSimpleForm = () => {
    return (
      <Form ref={this.searchForm} onFinish={this.handleSearch}>
        <Row gutter={16}>
          <Col md={5}>
            <FormItem label="姓名" name="name">
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col md={5}>
            <FormItem label="手机号" name="mobile">
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col md={4}>
            <FormItem label="状态" name="isEnabled">
              <Select>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="true">启用</Select.Option>
                <Select.Option value="false">禁用</Select.Option>
              </Select>
            </FormItem>
          </Col>
          <Col md={2}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  /**
   * 给角色分配权限
   */
  allocatePermission = () => {
    const { selectedRows } = this.state;
    message.destroy();
    if (selectedRows.length === 0) {
      message.warn('请选择一条记录');
    }
    if (selectedRows.length > 1) {
      message.warn('只能选择一条记录');
    } else {
      this.setState({
        allocatePermissionModalVisible: true,
        allocatePermissionRecord: selectedRows[0],
      });
    }
  };

  onClose = () => {
    this.setState({
      allocatePermissionModalVisible: false,
      allocatePermissionRecord: {},
    });
  };

  render() {
    const {
      role: { data },
      loading,
    } = this.props;

    const { selectedRows, allocatePermissionModalVisible, allocatePermissionRecord } = this.state;

    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button
                disabled={loading}
                icon={<PlusOutlined />}
                onClick={() => history.push('/system/role/add')}
                type="primary"
              >
                新增
              </Button>
              <Button
                title={loading || selectedRows.length === 0 ? '至少选择一条记录' : ''}
                disabled={loading || selectedRows.length === 0}
                icon={<DeleteOutlined />}
                onClick={() => history.push('/system/role/add')}
                type="danger"
              >
                删除
              </Button>
              <Button
                title={loading || selectedRows.length === 0 ? '请选择一条记录' : ''}
                disabled={loading || selectedRows.length === 0}
                icon={<UserAddOutlined />}
                onClick={this.allocatePermission}
              >
                权限分配
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
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {allocatePermissionModalVisible && Object.keys(allocatePermissionRecord).length > 0 ? (
          <AllocationPermission
            onClose={this.onClose}
            allocatePermissionModalVisible={allocatePermissionModalVisible}
            allocatePermissionRecord={allocatePermissionRecord}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    role,
    loading,
  }: {
    role: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    role,
    loading:
      loading.effects['role/list'] ||
      loading.effects['role/disabled'] ||
      loading.effects['role/enabled'] ||
      loading.effects['role/save'] ||
      loading.effects['role/update'],
  }),
)(TableList);
