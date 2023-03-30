import { useDrawModel } from '@/pages/teacher-web/model';
import { Button, Checkbox, Drawer, Form, Input, InputNumber, Space } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { useModel } from 'umi';
import styles from './style.less';
import style from '@/pages/chat-page/components/message-box/style.less';

const FlowTestDrawer: React.FC<any> = (props: any) => {
  const { cref } = props;
  const [visible, setVisible] = useState<any>(false);
  const [chatHistory, setChatHistory] = useState<any>([]);
  //客户信息
  const [customerInfo, setCustomerInfo] = useState<any>('');
  const [customerInfoVisible, setCustomerInfoVisible] = useState<any>(false);
  //开始结束按钮
  const [startBtn, setStartBtn] = useState<any>('start');

  const { courseCustomInfo, dialogueBegin, dialogueSend, dialogueFinish, flowTestLoading } =
    useDrawModel();

  const { courseInfo } = useModel('course', (model: any) => ({
    courseInfo: model.courseInfo,
  }));

  const onCancel = () => {
    setVisible(false);
  };

  const open = async () => {
    await courseCustomInfo({ id: courseInfo?.id }).then((res) => {
      if (res) {
        setCustomerInfo(res?.data?.customerInfo);
      }
    });
    setVisible(true);
  };

  const startBtnClick = async () => {
    if (startBtn == 'end') {
      await dialogueFinish({ courseId: courseInfo?.id, sessionid: '' });
      setStartBtn('start');
    } else if (startBtn == 'start') {
      await dialogueBegin({ courseId: courseInfo?.id }).then((res) => {
        if (res) {
          setChatHistory([...chatHistory, res?.data]);
        }
      });
      setStartBtn('end');
    }
  };

  useImperativeHandle(cref, () => ({
    open,
  }));

  return (
    <Drawer
      title={'流程测试'}
      placement="right"
      onClose={onCancel}
      visible={visible}
      footer={
        <div className={styles['chatBox']}>
          <Input.TextArea
            className={styles['textarea']}
            autoSize={{ minRows: 6, maxRows: 6 }}
            maxLength={200}
            placeholder={'输入文本，按回车发送'}
          />
          <Button
            loading={flowTestLoading}
            onClick={startBtnClick}
            className={styles['submitBtn']}
            type={'primary'}
            danger={startBtn == 'end' ? true : false}
          >
            {startBtn == 'end' ? '结束对话' : '开始对话'}
          </Button>
        </div>
      }
      footerStyle={{ padding: '0' }}
      bodyStyle={{ padding: '24px 16px' }}
    >
      <div
        className={styles['customerInfo']}
        style={{ display: customerInfoVisible ? '' : 'flex' }}
      >
        {/* {!customerInfoVisible && countLength(customerInfo) > 46
          ? customerInfo.substring(0, 43) + '...'
          : customerInfo} */}
        <span className={customerInfoVisible ? '' : styles['text']}>{customerInfo}</span>
        <a
          className={styles['switch']}
          onClick={() => {
            setCustomerInfoVisible(!customerInfoVisible);
          }}
        >
          {customerInfoVisible ? '收起' : '展开'}
        </a>
      </div>

      <div style={{ marginTop: '24px' }}>{/* <MessageBox list={chatHistory}></MessageBox> */}</div>
    </Drawer>
  );
};

export default FlowTestDrawer;
