import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, message, Card, Button, Alert, Select, Radio } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Dispatch, history } from 'umi';
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

interface RoleList {
  id: number;
  name: string;
}

class CreateFrom extends Component<CreateFromProps> {
  formRef = React.createRef<FormInstance>();

  componentDidMount(): void {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    if (params && Object.keys(params).length > 0 && params.id) {
      dispatch({
        type: 'admin/edit',
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
    const { submitting } = this.props;
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
          <Alert
            style={{ marginBottom: 24 }}
            type="info"
            showIcon
            message="目前代码工具只支持自动生成Spring Boot和 Ant Design pro4 ts版"
          />
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              status: 0,
              dataSourceType: 'mysql',
              parentClass: 'BaseEntity',
            }}
          >
            <FormItem name="id" style={{ display: 'none' }}>
              <Input type="hidden" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属项目"
              name="projectId"
              help="设置完成之后，不能修改"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Select>
                <Select.Option value={1}>A 项目</Select.Option>
                <Select.Option value={2}>B 项目</Select.Option>
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="模块中文名"
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
              label="模块描述"
              name="description"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
              help="系统根据描述来生成注释"
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="模块英文名"
              name="name"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
              help="系统根据该名称生成表，表名称：表前缀_模块英文名"
            >
              <Input />
            </FormItem>
            <FormItem {...formItemLayout} label="父类" name="parentClass">
              <Radio.Group>
                <Radio value="BaseEntity">BaseEntity</Radio>
                <Radio value="OrderedEntity">OrderedEntity</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
              <Button onClick={() => history.push('/system/admin')} style={{ marginLeft: 8 }}>
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
  ({ admin, loading }: { admin: StateType; loading: { effects: { [key: string]: boolean } } }) => ({
    admin,
    submitting: loading.effects['admin/save'] || loading.effects['admin/departmentTree'],
  }),
)(CreateFrom);
