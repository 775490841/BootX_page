import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  message,
  Tag,
  Modal,
  Select,
  Divider,
  Tree,
} from 'antd';
import { PlusOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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

import { MenuTree, TableListItem } from './data.d';

import styles from './style.less';

const FormItem = Form.Item;

interface TableListProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  menu: StateType;
}

interface TableListState {
  selectedRows: TableListItem[];
  menuTree: MenuTree[];
  tableTitle: string;
  parentId: number | '';
}

class TableList extends Component<TableListProps, TableListState> {
  searchForm = React.createRef(FormInstance);

  state: TableListState = {
    selectedRows: [],
    menuTree: [],
    tableTitle: '',
    parentId: '',
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '菜单名',
      dataIndex: 'name',
    },
    {
      title: '路由',
      dataIndex: 'url',
      width: 110,
    },
    {
      title: '序号',
      dataIndex: 'order',
      width: 50,
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
          <a onClick={() => history.push(`/system/menu/edit/${record.id}`)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.update(record, 'remove')}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.list({});
    this.tree();
  }

  list = (params: {}) => {
    const { dispatch } = this.props;
    const { parentId } = this.state;
    dispatch({
      type: 'menu/list',
      payload: {
        ...params,
        parentId,
      },
    });
    this.setState({
      selectedRows: [],
    });
  };

  tree = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/tree',
      callback: (response: MenuTree[]) => {
        this.setState({
          menuTree: response,
        });
      },
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
          type: `menu/${type1}`,
          payload: {
            id: record.id,
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

  renderTree = (menuTree: MenuTree[]) => {
    return menuTree.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Tree.TreeNode key={item.id} title={item.name}>
            {this.renderTree(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={item.id} title={item.name} />;
    });
  };

  onSelectTreeNode = (selectedKeys: string[], e: { selected: boolean; selectedNodes: any }) => {
    const { selectedNodes } = e;
    this.list({
      parentId: selectedKeys.join(','),
    });

    if (selectedNodes[0]) {
      this.setState({
        tableTitle: selectedNodes[0].title,
        parentId: selectedNodes[0].key,
      });
    } else {
      this.setState({
        tableTitle: '',
        parentId: '',
      });
    }
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

  render() {
    const {
      menu: { data },
      loading,
    } = this.props;

    const { selectedRows, menuTree, tableTitle } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={false} size="small">
                <Tree showLine defaultExpandAll onSelect={this.onSelectTreeNode}>
                  <Tree.TreeNode key="" title="全部菜单">
                    {this.renderTree(menuTree)}
                  </Tree.TreeNode>
                </Tree>
              </Card>
            </Col>
            <Col span={18}>
              <Card
                bordered={false}
                size="small"
                title={tableTitle ? <h1>上级菜单：{tableTitle}</h1> : <h1>顶级菜单</h1>}
              >
                <div className={styles.tableList}>
                  <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
                  <div className={styles.tableListOperator}>
                    <Button
                      disabled={loading}
                      icon={<PlusOutlined />}
                      onClick={() => history.push('/system/menu/add')}
                      type="primary"
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
                    selectedRows={selectedRows}
                    loading={loading}
                    data={data}
                    columns={this.columns}
                    onSelectRow={this.handleSelectRows}
                    onChange={this.handleStandardTableChange}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    menu,
    loading,
  }: {
    menu: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    menu,
    loading:
      loading.effects['menu/list'] ||
      loading.effects['menu/disabled'] ||
      loading.effects['menu/enabled'] ||
      loading.effects['menu/reset'] ||
      loading.effects['menu/save'] ||
      loading.effects['menu/update'],
  }),
)(TableList);
