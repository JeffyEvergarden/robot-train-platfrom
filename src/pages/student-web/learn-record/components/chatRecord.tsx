import { useState, useImperativeHandle, useRef } from 'react';
import { Modal } from 'antd';
import MessageBox from '@/pages/chat-page/components/message-box';
import RightDetail from './rightDetail';
import styles from './index.less';
import { recordData } from '@/pages/chat-page/test';
import { useLearnModel } from './../model';

export default (props: any) => {
  const { cref } = props;

  const messageRef: any = useRef<any>({});

  const { scoreRequest } = useLearnModel();

  const [visible, setVisible] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});
  const [disCountList, setDisCourseList] = useState<any>([1, 2, 3]);
  const [scoreData, setScoreData] = useState<any>({});

  useImperativeHandle(cref, () => ({
    open: (record: any) => {
      setVisible(true);
      setRowData(record);
      getScore(record);
      setTimeout(() => messageRef?.current?.init(recordData), 500);
    },
    close: onClose,
  }));

  const onClose = () => {
    setVisible(false);
  };

  const getScore = async (record: any) => {
    let params = {
      courseId: record?.courseId,
    };
    let res = await scoreRequest(params);
    setScoreData(res?.data);
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
        <div className={styles.messageBox}>
          <div className={styles.detailTitle}>通话详情</div>
          <div style={{ padding: '16px', overflowY: 'auto', height: '620px' }}>
            <MessageBox cref={messageRef} />
          </div>
        </div>
        <div className={styles.rightDetailBox}>
          <div className={styles.detailTitle}>扣分详情</div>
          <div style={{ padding: '16px', overflowY: 'auto', height: '620px' }}>
            <RightDetail
              disCountList={scoreData?.pointsDeductionList || []}
              scoreData={scoreData}
            />
          </div>
          <div className={styles.detailTop}>合计扣分：{scoreData?.deductScore}</div>
        </div>
      </div>
    </Modal>
  );
};
