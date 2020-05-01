import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, InputNumber, Checkbox, message, TreeSelect } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { StateType } from '@/pages/system/department/model';
import { Dispatch } from 'umi';
import { DepartmentTree } from '@/pages/system/department/data';

const FormItem = Form.Item;

interface CreateFromProps {
  dispatch: Dispatch<any>;
  addModalVisible: boolean;
  onClose: (modalVisible: boolean, refresh?: boolean) => void;
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
    const { dispatch } = this.props;
    dispatch({
      type: 'department/tree',
      callback: (response: DepartmentTree[]) => {
        this.setState({
          departmentTree: response,
        });
      },
    });
  }

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
            callback: (response: { type: string; content: string }) => {
              const { type, content } = response;
              if (type === 'success') {
                message.success(content);
                onClose(false, true);
              } else {
                message.error(content);
              }
            },
          });
        })
        .catch((errorInfo) => console.log(errorInfo));
    }
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
    const { addModalVisible, onClose } = this.props;
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
    return (
      <Modal
        maskClosable={false}
        destroyOnClose
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
            <TreeSelect treeDefaultExpandAll>{this.renderTreeSelect(departmentTree)}</TreeSelect>
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
