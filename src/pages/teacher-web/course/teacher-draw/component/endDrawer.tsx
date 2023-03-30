import { useDrawModel } from '@/pages/teacher-web/model';
import { Button, Drawer, Form, Input, InputNumber, Space } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { useModel } from 'umi';

const EndDrawer: React.FC<any> = (props: any) => {
  const { cref } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<any>(false);
  const { courseEndConfig, courseEndConfigSave } = useDrawModel();
  const [info, setInfo] = useState<any>({});

  const { courseInfo } = useModel('course', (model: any) => ({
    courseInfo: model.courseInfo,
  }));

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onOk = async () => {
    let valid = await form.validateFields();
    if (valid) {
      await courseEndConfigSave({ ...info, ...valid }).then((res) => {
        if (res) {
          onCancel();
        }
      });
    }
  };

  const open = async (type: any, row?: any) => {
    // setFormType(type);
    await courseEndConfig({ id: courseInfo?.id }).then((res) => {
      if (res) {
        form.setFieldsValue(res?.data);
        setInfo(res?.data);
        setVisible(true);
      }
    });
  };

  useImperativeHandle(cref, () => ({
    open,
  }));

  return (
    <Drawer
      title={'结束设置'}
      placement="right"
      onClose={onCancel}
      visible={visible}
      footer={
        <Space align="baseline" style={{ float: 'right' }}>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={onOk}>
            保存
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="maxError"
          label="最大允许异常次数"
          rules={[{ required: true, message: '请输入最大允许异常次数' }]}
        >
          <InputNumber
            controls={false}
            style={{ width: '100%' }}
            precision={0}
            maxLength={150}
            placeholder="请输入最大允许异常次数"
          />
        </Form.Item>
        <Form.Item
          name="errorTip"
          label="异常提示语"
          rules={[{ required: true, message: '请输入异常提示语' }]}
        >
          <Input maxLength={150} placeholder="请输入异常提示语" />
        </Form.Item>
        <Form.Item
          name="endText"
          label="异常结束语"
          rules={[{ required: true, message: '请输入异常结束语' }]}
        >
          <Input maxLength={150} placeholder="请输入异常结束语" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EndDrawer;
