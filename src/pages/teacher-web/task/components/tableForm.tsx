import Condition from '@/components/Condition';
import { Modal, Input, Radio, Switch, Form, InputNumber, Checkbox, Select } from 'antd';
import { useEffect, useImperativeHandle, useState } from 'react';

const TableForm: React.FC<any> = (props) => {
  const { cref, taskAdd, taskDetail, taskEdit, reload, loading } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const [visible, setVisible] = useState<any>(false);
  const [formType, setFormType] = useState<any>('add');

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onOk = async () => {
    let valid = await form.validateFields();
    if (valid) {
      console.log(valid);
      let reqData = { ...valid };
      if (formType == 'add') {
        await taskAdd(reqData).then((res: any) => {
          if (res) {
            onCancel();
            reload();
          }
        });
      } else if (formType == 'edit') {
        await taskEdit(reqData).then((res: any) => {
          if (res) {
            onCancel();
            reload();
          }
        });
      }
    }
  };

  const open = async (type: any, row?: any) => {
    setFormType(type);
    if (type == 'edit') {
      await taskDetail({ id: row?.id }).then((res: any) => {
        form.setFieldsValue({
          ...res?.data,
        });
      });
    }
    setVisible(true);
  };

  useImperativeHandle(cref, () => ({
    open,
  }));

  return (
    <Modal
      visible={visible}
      title={`${formType == 'edit' ? '编辑' : '新增'}任务`}
      onCancel={onCancel}
      onOk={onOk}
      width={600}
      confirmLoading={loading}
    >
      <Form form={form} layout="horizontal" {...formItemLayout}>
        <Form.Item
          name="taskName"
          label="任务名称"
          rules={[{ required: true, message: '请输入任务名称' }]}
        >
          <Input showCount maxLength={75} placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item
          label="通过标准"
          name={'passScore'}
          rules={[{ required: true, message: '请输入通过标准' }]}
          initialValue={100}
        >
          <InputNumber
            precision={0}
            style={{ width: '135px' }}
            controls={false}
            min={1}
            max={100}
            placeholder={'请输入1-100整数'}
          />
        </Form.Item>
        <Form.Item
          label="任务模式"
          name={'taskModel'}
          initialValue={1}
          rules={[{ required: true, message: '请选择任务模式' }]}
        >
          <Radio.Group>
            <Radio value={1}>闯关模式</Radio>
            <Radio value={2}>任务模式</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="任务类型"
          name={'taskType'}
          initialValue={1}
          rules={[{ required: true, message: '请选择任务类型' }]}
        >
          <Radio.Group>
            <Radio value={1}>培训任务</Radio>
            <Radio value={2}>考试任务</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="培训组别"
          label="培训组别"
          rules={[{ required: true, message: '请选择培训组别' }]}
        >
          <Select placeholder="请选择培训组别" mode="multiple" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TableForm;
