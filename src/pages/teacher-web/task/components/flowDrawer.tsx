import Condition from '@/components/Condition';
import config from '@/config';
import { useDrawModel, useTableModel } from '@/pages/teacher-web/course/model';
import { Button, Drawer, Form, Input, message, Select, Space } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { useModel, history, Router } from 'umi';
import { useTaskModel } from '../model';

const FlowDrawer: React.FC<any> = (props: any) => {
  const { cref, changeNodeName } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<any>(false);
  const [info, setInfo] = useState<any>({});
  const [pageType, setPageType] = useState<any>('');

  const { allTableList, getAllTablelist } = useTableModel();
  const { taskEdit, formLoading } = useTaskModel();

  const { courseInfo } = useModel('course', (model: any) => ({
    courseInfo: model.courseInfo,
  }));

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onOk = async () => {
    let valid: any = await form.validateFields();
    if (valid) {
      let formData: any = form.getFieldsValue();
      if (pageType == 'step') {
        let id = formData?.courseId;
        let name = allTableList?.find((item) => item?.id == id)?.courseName;
        changeNodeName(info.id, { value: name, courseId: id }, pageType);
        onCancel();
      } else {
        if (info.type == 'course') {
          await taskEdit({
            id: history?.location?.query?.id,
            taskName: formData?.name,
            editName: true,
          }).then((res) => {
            if (res.resultCode == config.successCode) {
              history.push({
                pathname: '/front/teacher/task/draw',
                query: {
                  ...history?.location?.query,
                  name: formData?.name,
                },
              });
              changeNodeName(info.id, { value: formData?.name }, pageType);
              onCancel();
            }
          });
        } else {
          changeNodeName(info.id, { value: formData?.name }, pageType);
          onCancel();
        }
      }
    }
  };

  const open = async (row: any, type: any) => {
    setPageType(type);
    getAllTablelist({ courseStatus: 1 });
    setInfo(row);
    if (type == 'step') {
      form.setFieldsValue({ courseId: row?.properties?.courseId });
    } else {
      form.setFieldsValue({ name: row?.text?.value });
    }

    setVisible(true);
  };

  useImperativeHandle(cref, () => ({
    open,
  }));

  return (
    <Drawer
      title={'编辑节点'}
      placement="right"
      onClose={onCancel}
      visible={visible}
      footer={
        <Space align="baseline" style={{ float: 'right' }}>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={onOk} loading={formLoading}>
            保存
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Condition r-if={pageType == 'step'}>
          <Form.Item
            name="courseId"
            label="课程"
            rules={[{ required: true, message: '请选择课程' }]}
          >
            <Select placeholder="请选择课程">
              {allTableList?.map((item: any, index: any) => (
                <Select.Option key={index} value={item.id}>
                  {item.courseName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Condition>
        <Condition r-if={pageType == 'other'}>
          <Form.Item
            name="name"
            label="节点名称"
            rules={[{ required: true, message: '请输入节点名称' }]}
          >
            <Input maxLength={75} showCount></Input>
          </Form.Item>
        </Condition>
      </Form>
    </Drawer>
  );
};

export default FlowDrawer;
