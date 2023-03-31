import { useState, useImperativeHandle, useRef } from 'react';
import { Modal } from 'antd';
import MessageBox from '@/pages/chat-page/components/message-box';
import styles from './index.less';
import { recordData } from '@/pages/chat-page/test';

export default (props: any) => {
  const { cref } = props;

  const messageRef: any = useRef<any>({});

  const [visible, setVisible] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});

  useImperativeHandle(cref, () => ({
    open: (record: any) => {
      setVisible(true);
      setRowData(record);
      setTimeout(() => messageRef?.current?.init(recordData), 500);
    },
    close: onClose,
  }));

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={'详情'}
      width={1100}
      centered
      onCancel={onClose}
      visible={visible}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <div style={{ width: '100px' }}>全程会话录音</div>
          {/* <AudioPlay
          musicSrc={
            process.env.mock
              ? '/aichat/mp3/bluebird.mp3'
              : `${config.basePath}/robot/sound/getRecord?callId=${callId}`
          }
        /> */}
          {/* <AudioPlay musicSrc={soundInfo} /> */}
        </div>
      }
      destroyOnClose
    >
      <div className={styles.contentBox}>
        <MessageBox cref={messageRef} />
      </div>
    </Modal>
  );
};
