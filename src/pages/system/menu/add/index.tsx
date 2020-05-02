import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Checkbox, message, TreeSelect, Card, Button, InputNumber, Radio } from 'antd';
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
  menuTree: DepartmentTree[];
}

class CreateFrom extends Component<CreateFromProps, CreateFromState> {
  formRef = React.createRef<FormInstance>();

  state: CreateFromState = {
    menuTree: [],
  };

  componentDidMount(): void {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    dispatch({
      type: 'menu/tree',
      callback: (response: DepartmentTree[]) => {
        this.setState({
          menuTree: response,
        });
      },
    });
    if (params && Object.keys(params).length > 0 && params.id) {
      dispatch({
        type: 'menu/edit',
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
      type: 'menu/save',
      payload: values,
      callback: (response: { type: string; content: string }) => {
        const { type, content } = response;
        if (type === 'success') {
          history.push('/system/menu');
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
    const { menuTree } = this.state;
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
              target: '_self',
            }}
          >
            <FormItem name="id" style={{ display: 'none' }}>
              <Input type="hidden" />
            </FormItem>
            <FormItem {...formItemLayout} label="上级菜单" name="parentId">
              <TreeSelect showSearch showArrow treeLine treeDefaultExpandAll>
                {this.renderTreeSelect(menuTree)}
              </TreeSelect>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜单名称"
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
              label="菜单图标"
              name="icon"
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
              label="路由"
              name="url"
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
              label="打开方式"
              name="target"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Radio.Group>
                <Radio value="_self">当前窗口</Radio>
                <Radio value="_blank">新窗口</Radio>
                <Radio value="_parent">父级窗口</Radio>
                <Radio value="_top">顶级窗口</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="序号"
              name="order"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <InputNumber min={1} precision={0} step={1} style={{ width: '100%' }} />
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
              <Button onClick={() => history.push('/system/menu')} style={{ marginLeft: 8 }}>
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
  ({ menu, loading }: { menu: StateType; loading: { effects: { [key: string]: boolean } } }) => ({
    menu,
    submitting: loading.effects['menu/save'] || loading.effects['menu/menuTree'],
  }),
)(CreateFrom);
