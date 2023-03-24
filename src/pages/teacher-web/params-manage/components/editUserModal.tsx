import { useState, useImperativeHandle } from 'react';
import { Modal, Form, Input, Select, Button, message, Checkbox, Space } from 'antd';

export default (props: any) => {
  const { cref, loading, groupList, editComfirm } = props;

  const [form] = Form.useForm();

  const [visible, setVisible] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});

  useImperativeHandle(cref, () => ({
    open: (record: any) => {
      setVisible(true);
      setRowData(record);
    },
    close: onClose,
  }));

  const onClose = () => {
    setVisible(false);
  };

  const save = async () => {
    let fromVal = await form.validateFields();
    editComfirm(fromVal, rowData);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title="编辑"
      width={380}
      centered
      onCancel={onClose}
      visible={visible}
      footer={
        <Space>
          <Button type="primary" onClick={save} loading={loading}>
            保存
          </Button>
          <Button onClick={onClose} loading={loading}>
            取消
          </Button>
        </Space>
      }
      destroyOnClose
    >
      <Form form={form} {...layout}>
        <Form.Item label="用户账号" name="account">
          {rowData?.account}
        </Form.Item>
        <Form.Item label="姓名" name="userName">
          {rowData?.userName}
        </Form.Item>
        <Form.Item label="角色" name="roleName">
          {rowData?.roleName}
        </Form.Item>
        <Form.Item
          label="部门组别"
          name="groupId"
          rules={[{ required: true, message: '请选择组别' }]}
        >
          <Select optionFilterProp="children" showSearch allowClear placeholder="请选择组别">
            {groupList?.map((item: any) => {
              return (
                <Select.Option key={item?.id} value={item?.id}>
                  {item?.groupName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
