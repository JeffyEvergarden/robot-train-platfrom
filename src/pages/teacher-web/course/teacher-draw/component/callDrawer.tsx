import { useDrawModel } from '@/pages/teacher-web/course/model';
import { Button, Checkbox, Drawer, Form, Input, InputNumber, Space } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { useModel } from 'umi';

const CallDrawer: React.FC<any> = (props: any) => {
  const { cref } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<any>(false);
  const { courseCallConfig, courseCallConfigSave } = useDrawModel();
  const [info, setInfo] = useState<any>({});
  const timeoutSwitch = Form.useWatch('timeoutSwitch', form);
  const stopSwitch = Form.useWatch('stopSwitch', form);

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
      await courseCallConfigSave({ ...info, ...valid }).then((res) => {
        if (res) {
          onCancel();
        }
      });
    }
  };

  const open = async (type: any, row?: any) => {
    // setFormType(type);
    await courseCallConfig({ id: courseInfo?.id }).then((res) => {
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
      title={'通话设置'}
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
        <Form.Item name="timeoutSwitch" initialValue={true} noStyle valuePropName="checked">
          <Checkbox>超时设置</Checkbox>
        </Form.Item>
        <Form.Item>
          <span style={{ marginRight: '8px' }}>学员轮次回复等待不允许超过</span>
          <Form.Item
            noStyle
            name="answerWaitTime"
            rules={[{ required: true, message: '请输入' }]}
            initialValue={8}
          >
            <InputNumber controls={false} min={1} max={100} disabled={!timeoutSwitch} />
          </Form.Item>
          <span style={{ marginLeft: '8px' }}>s</span>
        </Form.Item>

        <Form.Item
          name="timeoutTip"
          label="超时提示"
          rules={[{ required: true, message: '请输入超时提示' }]}
          initialValue={'过长时间未回复，请尽快回复客户'}
        >
          <Input showCount maxLength={100} placeholder="请输入超时提示" />
        </Form.Item>

        <Form.Item name="stopSwitch" initialValue={true} noStyle valuePropName="checked">
          <Checkbox>停顿设置</Checkbox>
        </Form.Item>
        <Form.Item>
          <span style={{ marginRight: '8px' }}>学员轮次回复停顿不允许超过</span>
          <Form.Item
            name="stopTime"
            rules={[{ required: true, message: '请输入' }]}
            initialValue={3}
            noStyle
          >
            <InputNumber controls={false} min={1} max={100} disabled={!stopSwitch} />
          </Form.Item>
          <span style={{ marginLeft: '8px' }}>s</span>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CallDrawer;
