import { useState, useImperativeHandle, Fragment } from 'react';
import { Modal, Form, Input, Select, Button, message, Checkbox, Space } from 'antd';

export default (props: any) => {
  const { cref, loading, groupList, comfirmSubmit } = props;

  const [form] = Form.useForm();

  const [visible, setVisible] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});
  const [pageType, setPageTyp] = useState<any>('');

  useImperativeHandle(cref, () => ({
    open: (record: any, type: any) => {
      setVisible(true);
      setRowData(record);
      setPageTyp(type);
      if (type == 'editUser') {
        form.setFieldsValue({ groupId: record?.groupId });
      } else if (type == 'addGroup') {
        form.setFieldsValue({ groupName: '' });
        setRowData({});
      } else if (type == 'editGroup') {
        form.setFieldsValue({ groupName: record?.groupName });
      }
    },
    close: onClose,
  }));

  const onClose = () => {
    setVisible(false);
  };

  const save = async () => {
    let fromVal = await form.validateFields();
    comfirmSubmit(fromVal, rowData, pageType);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title={pageType == 'editUser' ? '编辑' : pageType == 'addGroup' ? '新建组别' : '编辑组别'}
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
        {pageType == 'editUser' && (
          <Fragment>
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
          </Fragment>
        )}
        {(pageType == 'addGroup' || pageType == 'editGroup') && (
          <Form.Item
            label="组别名称"
            name="groupName"
            rules={[{ required: true, message: '请输入组别名称' }]}
          >
            <Input maxLength={30} showCount />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
