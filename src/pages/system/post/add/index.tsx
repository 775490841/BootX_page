import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Checkbox, message, InputNumber, Select, Card, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { StateType } from '@/pages/system/post/model';
import { Dispatch, history } from 'umi';
import { TableListItem } from '@/pages/system/post/data';
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

class CreateFrom extends Component<CreateFromProps> {
  formRef = React.createRef<FormInstance>();

  componentDidMount(): void {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    if (params && Object.keys(params).length > 0 && params.id) {
      dispatch({
        type: 'post/edit',
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
      type: 'post/save',
      payload: values,
      callback: (response: { type: string; content: string }) => {
        const { type, content } = response;
        if (type === 'success') {
          history.push('/system/post');
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
              label="类型"
              name="level"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Select>
                <Select.Option value={1}>高层</Select.Option>
                <Select.Option value={2}>中层</Select.Option>
                <Select.Option value={3}>基层</Select.Option>
                <Select.Option value={4}>其他</Select.Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="描述" name="description">
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
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
              <InputNumber style={{ width: '100%' }} min={1} precision={0} step={1} />
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
              <Button onClick={() => history.push('/system/post')} style={{ marginLeft: 8 }}>
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
  ({ post, loading }: { post: StateType; loading: { effects: { [key: string]: boolean } } }) => ({
    post,
    submitting: loading.effects['post/save'] || loading.effects['post/edit'],
  }),
)(CreateFrom);
