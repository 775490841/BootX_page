import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Checkbox, message, TreeSelect, Card, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Dispatch, history } from 'umi';
import { DepartmentTree } from '@/pages/system/department/data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { TableListItem } from '../data';
import { StateType } from '../model';

const FormItem = Form.Item;

interface CreateFromProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  match: {
    params: {
      [key: string]: any;
    };
  };
}

interface CreateFromState {
  departmentTree: DepartmentTree[];
}

class CreateFrom extends Component<CreateFromProps, CreateFromState> {
  formRef = React.createRef<FormInstance>();

  state: CreateFromState = {
    departmentTree: [],
  };

  componentDidMount(): void {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    dispatch({
      type: 'role/departmentTree',
      callback: (response: DepartmentTree[]) => {
        this.setState({
          departmentTree: response,
        });
      },
    });
    if (params && Object.keys(params).length > 0 && params.id) {
      dispatch({
        type: 'role/edit',
        payload: params,
        callback: (response: TableListItem) => {
          const { current } = this.formRef;
          if (current) {
            current.setFieldsValue(response);
          }
        },
      });
    }
  }

  onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/save',
      payload: values,
      callback: (response: { type: string; content: string }) => {
        const { type, content } = response;
        if (type === 'success') {
          history.push('/system/role');
        } else {
          message.error(content);
        }
      },
    });
  };

  renderTreeSelect = (treeSelect: DepartmentTree[]) => {
    return treeSelect.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeSelect.TreeNode value={item.id} key={item.id} title={item.name}>
            {this.renderTreeSelect(item.children)}
          </TreeSelect.TreeNode>
        );
      }
      return <TreeSelect.TreeNode value={item.id} key={item.id} title={item.name} />;
    });
  };

  render() {
    const { submitting } = this.props;
    const { departmentTree } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 6 },
      },
    };
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              isEnabled: true,
              isSystem: false,
            }}
          >
            <FormItem name="id" style={{ display: 'none' }}>
              <Input type="hidden" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属部门"
              name="departmentId"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <TreeSelect showSearch showArrow treeLine treeDefaultExpandAll>
                {this.renderTreeSelect(departmentTree)}
              </TreeSelect>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色名"
              name="name"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Input />
            </FormItem>
            <FormItem {...formItemLayout} label="备注" name="description">
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
            </FormItem>
            <FormItem {...formItemLayout} label="设置" style={{ marginBottom: 0 }}>
              <FormItem
                name="isEnabled"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(15% - 8px)' }}
              >
                <Checkbox>启用</Checkbox>
              </FormItem>
              <FormItem
                name="isSystem"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}
              >
                <Checkbox>管理员角色</Checkbox>
              </FormItem>
            </FormItem>
            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
              <Button onClick={() => history.push('/system/role')} style={{ marginLeft: 8 }}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({ role, loading }: { role: StateType; loading: { effects: { [key: string]: boolean } } }) => ({
    role,
    submitting: loading.effects['role/save'] || loading.effects['role/departmentTree'],
  }),
)(CreateFrom);
