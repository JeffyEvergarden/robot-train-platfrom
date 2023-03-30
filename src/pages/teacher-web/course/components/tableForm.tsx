import Condition from '@/components/Condition';
import { Modal, Input, Radio, Switch, Form, InputNumber, Checkbox, Select } from 'antd';
import { useEffect, useImperativeHandle, useState } from 'react';

const { TextArea } = Input;
const { Item: FormItem } = Form;

const TableForm: React.FC<any> = (props) => {
  const { cref, courseAdd, courseDetail, courseEdit, reload, loading } = props;
  const [form] = Form.useForm();
  const courseStyle = Form.useWatch('courseType', form);
  const minNumberSwitch = Form.useWatch('minNumberSwitch', form);

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
        await courseAdd(reqData).then((res: any) => {
          if (res) {
            onCancel();
            reload();
          }
        });
      } else if (formType == 'edit') {
        await courseEdit(reqData).then((res: any) => {
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
      await courseDetail({ id: row?.id }).then((res: any) => {
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
      title={`${formType == 'edit' ? '编辑' : '新增'}课程`}
      onCancel={onCancel}
      onOk={onOk}
      width={600}
      confirmLoading={loading}
    >
      <Form form={form} layout="horizontal" {...formItemLayout}>
        <Form.Item
          name="courseName"
          label="课程名称"
          rules={[{ required: true, message: '请输入课程名称' }]}
        >
          <Input showCount maxLength={75} placeholder="请输入课程名称" />
        </Form.Item>
        <Form.Item
          name={'passMark'}
          label="合格分数"
          rules={[{ required: true, message: '请输入合格分数' }]}
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
          name={'courseType'}
          label="课程样式"
          initialValue={0}
          rules={[{ required: true, message: '请选择课程样式' }]}
        >
          <Radio.Group>
            <Radio value={0}>常规</Radio>
            <Radio value={1}>剧情</Radio>
          </Radio.Group>
        </Form.Item>
        <Condition r-if={courseStyle == 1}>
          <Form.Item
            name="modelId"
            label="课程模型"
            rules={[{ required: true, message: '请选择课程模型' }]}
          >
            <Select placeholder="请选择课程模型" />
          </Form.Item>
        </Condition>
        <Form.Item label="最少训练次数">
          <Form.Item noStyle name={'minNumberSwitch'} valuePropName="checked" initialValue={0}>
            <Checkbox
              onChange={(e: any) => {
                form.setFieldsValue({ minNumberSwitch: e?.target?.checked ? 1 : 0 });
              }}
            >
              开启
            </Checkbox>
          </Form.Item>
          <Condition r-if={minNumberSwitch}>
            <Form.Item
              noStyle
              name={'minNumber'}
              rules={[{ required: true, message: '请输入最少训练次数' }]}
            >
              <InputNumber
                precision={0}
                controls={false}
                style={{ width: '135px' }}
                min={1}
                max={100}
                placeholder={'请输入1-100整数'}
              />
            </Form.Item>
          </Condition>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TableForm;
