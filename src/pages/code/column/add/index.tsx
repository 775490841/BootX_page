import React, { Component } from 'react';
import { Form, Input, Checkbox, Card, Button, Select, Radio, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { Dispatch } from 'umi';
import { DepartmentTree } from '@/pages/system/department/data';
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
  menuTree: DepartmentTree[];
  type: string;
}

class CreateFrom extends Component<CreateFromProps, CreateFromState> {
  formRef = React.createRef<FormInstance>();

  onFinish = (values: { [key: string]: any }) => {
    console.log(values);
  };

  render() {
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
              isNull: false,
              isUnique: false,
              updateIgnore: false,
              showList: true,
              searchList: true,
              orderList: true,
            }}
          >
            <FormItem
              {...formItemLayout}
              label="字段名"
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
              label="字段描述"
              name="memo"
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
              label="字段类型"
              name="type"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Select>
                <Select.Option value="String">String</Select.Option>
                <Select.Option value="Integer">Integer</Select.Option>
                <Select.Option value="Float">Float</Select.Option>
                <Select.Option value="Double">Double</Select.Option>
                <Select.Option value="Long">Long</Select.Option>
                <Select.Option value="List">List</Select.Option>
                <Select.Option value="Set">Set</Select.Option>
                <Select.Option value="Date">Date</Select.Option>
                <Select.Option value="BigDecimal">BigDecimal</Select.Option>
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <span>数据格式 </span>
                  <Tooltip placement="top" title="只对字段类型为String才有效果">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="dataType"
            >
              <Radio.Group>
                <Radio value="email">邮箱</Radio>
                <Radio value="mobile">手机号</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem {...formItemLayout} label="正则校验" name="regexps" extra='多个请用";"分隔'>
              <Input />
            </FormItem>
            <FormItem {...formItemLayout} label="设置" style={{ marginBottom: 0 }}>
              <FormItem
                name="isNull"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(24% - 8px)' }}
              >
                <Checkbox>非空</Checkbox>
              </FormItem>
              <FormItem
                name="isUnique"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(24% - 8px)' }}
              >
                <Checkbox>唯一性</Checkbox>
              </FormItem>
              <FormItem
                name="isEnabled"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(24% - 8px)' }}
              >
                <Checkbox>更新忽略</Checkbox>
              </FormItem>
            </FormItem>
            <FormItem {...formItemLayout} label="显示设置" style={{ marginBottom: 0 }}>
              <FormItem
                name="showList"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(24% - 8px)' }}
              >
                <Checkbox>列表展示</Checkbox>
              </FormItem>
              <FormItem
                name="searchList"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(24% - 8px)' }}
              >
                <Checkbox>列表查询</Checkbox>
              </FormItem>
              <FormItem
                name="orderList"
                valuePropName="checked"
                style={{ display: 'inline-block', width: 'calc(24% - 8px)' }}
              >
                <Checkbox>列表排序</Checkbox>
              </FormItem>
            </FormItem>
            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button style={{ marginLeft: 8 }}>返回</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CreateFrom;
