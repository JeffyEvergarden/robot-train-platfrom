import { useEffect, useState } from 'react';
import { Row, Col, Form, InputNumber, Button, message, Checkbox } from 'antd';
import { useRuleManageModel } from './../model';
import styles from './../index.less';

import config from '@/config';
const successCode = config.successCode;

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

export default () => {
  const [form] = Form.useForm();

  const { loading, gradeConfig, scoreSave } = useRuleManageModel();

  const [totalRate, setTotalNum] = useState<any>(0);

  useEffect(() => {
    getGradeConfig();
  }, []);

  const getGradeConfig = async () => {
    let res = await gradeConfig({});
    form.setFieldsValue({
      ...res?.data,
    });
    let data = res?.data;
    let actionRate = data?.actionRate ? Number(data?.actionRate) : 0;
    let serviceRate = data?.serviceRate ? Number(data?.serviceRate) : 0;
    let dialogueRate = data?.dialogueRate ? Number(data?.dialogueRate) : 0;
    let totalNum = actionRate + serviceRate + dialogueRate;
    setTotalNum(totalNum);
  };

  const onChange = () => {
    let formVal = form.getFieldsValue(true);
    let actionRate = formVal?.actionRate ? Number(formVal?.actionRate) : 0;
    let serviceRate = formVal?.serviceRate ? Number(formVal?.serviceRate) : 0;
    let dialogueRate = formVal?.dialogueRate ? Number(formVal?.dialogueRate) : 0;
    let totalNum = actionRate + serviceRate + dialogueRate;
    setTotalNum(totalNum);
  };

  const save = async () => {
    let formVal = await form.validateFields();
    let params = {
      ...formVal,
    };
    let res = await scoreSave(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '成功');
      getGradeConfig();
    } else {
      message.error(res?.resultDesc || '失败');
    }
  };

  return (
    <Form form={form} {...layout}>
      <Row gutter={12}>
        <Col span={24}>
          <Form.Item name="actionRate" valuePropName="checked">
            <Checkbox>语速检测</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <span className={styles.commonTips}>
            检测学员每分钟回复字数，超过或者低于预设值，则代表语速过快或过慢
          </span>
        </Col>
        <Col span={24}>
          <Form.Item style={{ marginBottom: 0 }}>
            <span style={{ display: 'inline-block' }}>语速检测:</span>
            <Form.Item style={{ display: 'inline-block', padding: '0 5px' }}>
              <InputNumber />
            </Form.Item>
            <span
              style={{
                display: 'inline-block',
                width: 'auto',
                lineHeight: '32px',
                textAlign: 'left',
              }}
            >
              字/每分钟
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                lineHeight: '32px',
                textAlign: 'center',
              }}
            >
              ~
            </span>
            <Form.Item style={{ display: 'inline-block', padding: '0 5px' }}>
              <InputNumber />
            </Form.Item>
            <span
              style={{
                display: 'inline-block',
                width: 'auto',
                lineHeight: '32px',
                textAlign: 'left',
              }}
            >
              字/每分钟
            </span>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item name="actionRate1" valuePropName="checked">
            <Checkbox>语气词检测</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <span className={styles.commonTips}>
            检测学员整通通话是否使用语气词过多，根据触发单个关键词累加，累加超过预设重复次数则扣分并重新计算次数
          </span>
        </Col>
      </Row>
    </Form>
  );
};
