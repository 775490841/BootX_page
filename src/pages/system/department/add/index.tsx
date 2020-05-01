import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Checkbox, message, TreeSelect, Card, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { StateType } from '@/pages/system/department/model';
import { Dispatch, history } from 'umi';
import { DepartmentTree, TableListItem } from '@/pages/system/department/data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

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
      type: 'department/tree',
      callback: (response: DepartmentTree[]) => {
        this.setState({
          departmentTree: response,
        });
      },
    });
    if (params && Object.keys(params).length > 0 && params.id) {
      dispatch({
        type: 'department/edit',
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
      type: 'department/save',
      payload: values,
      callback: (response: { type: string; content: string }) => {
        const { type, content } = response;
        if (type === 'success') {
          history.push('/system/department');
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
            }}
          >
            <FormItem name="id" style={{ display: 'none' }}>
              <Input type="hidden" />
            </FormItem>
            <FormItem {...formItemLayout} label="上级部门" name="parentId">
              <TreeSelect showSearch showArrow treeLine treeDefaultExpandAll>
                {this.renderTreeSelect(departmentTree)}
              </TreeSelect>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="名称"
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
            <FormItem
              {...formItemLayout}
              label="排序"
              name="order"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <InputNumber min={0} step={1} precision={0} style={{ width: '100%' }} />
            </FormItem>
            <FormItem {...formItemLayout} label="设置" style={{ marginBottom: 0 }}>
              <FormItem
                name="isEnabled"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
              >
                <Checkbox>启用</Checkbox>
              </FormItem>
            </FormItem>
            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
              <Button onClick={() => history.push('/system/department')} style={{ marginLeft: 8 }}>
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
  ({
    department,
    loading,
  }: {
    department: StateType;
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    department,
    submitting: loading.effects['department/save'] || loading.effects['department/tree'],
  }),
)(CreateFrom);
