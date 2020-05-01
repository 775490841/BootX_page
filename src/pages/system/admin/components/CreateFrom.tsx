import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, InputNumber, Checkbox, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { StateType } from '@/pages/system/department/model';

const FormItem = Form.Item;

interface CreateFromProps {
  addModalVisible: boolean;
  onClose: (modalVisible: false) => void;
}

class CreateFrom extends Component<CreateFromProps> {
  formRef = React.createRef<FormInstance>();

  onOk = () => {
    const { onClose, dispatch } = this.props;
    const { current } = this.formRef;
    if (current) {
      current
        .validateFields()
        .then((values) => {
          dispatch({
            type: 'department/save',
            payload: values,
            callback: (response: any) => {
              message.success(response);
            },
          });
        })
        .catch((errorInfo) => message.error(errorInfo));
    }
    onClose(false);
  };

  render() {
    const { addModalVisible, onClose } = this.props;
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
    return (
      <Modal
        title="添加部门"
        visible={addModalVisible}
        onOk={this.onOk}
        onCancel={() => onClose(false)}
      >
        <Form
          ref={this.formRef}
          initialValues={{
            isEnabled: true,
          }}
        >
          <FormItem
            {...formItemLayout}
            label="上级部门"
            name="parentId"
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
          <FormItem {...formItemLayout} label="设置">
            <FormItem
              name="isEnabled"
              valuePropName="checked"
              style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Checkbox>启用</Checkbox>
            </FormItem>
          </FormItem>
        </Form>
      </Modal>
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
    submitting: loading.effects['department/save'],
  }),
)(CreateFrom);
